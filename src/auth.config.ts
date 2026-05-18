import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: { signIn: "/login", error: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (nextUrl.pathname.startsWith("/dashboard")) return isLoggedIn
      return true
    },
  },
} satisfies NextAuthConfig
