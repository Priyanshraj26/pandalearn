import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      Google({
        clientId:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ] : []),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true, name: true, email: true, image: true,
            password: true, xp: true, level: true, streak: true, track: true,
          },
        })
        if (!user?.password) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return {
          id: user.id, name: user.name, email: user.email, image: user.image,
          xp: user.xp, level: user.level, streak: user.streak, track: user.track,
        }
      },
    }),
  ],
  callbacks: {
    authorized: authConfig.callbacks!.authorized!,
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any
        token.xp     = u.xp     ?? 0
        token.level  = u.level  ?? 1
        token.streak = u.streak ?? 0
        token.track  = u.track  ?? null
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id     = token.id     as string
        session.user.xp     = token.xp     as number
        session.user.level  = token.level  as number
        session.user.streak = token.streak as number
        session.user.track  = token.track  as string | null
      }
      return session
    },
  },
})
