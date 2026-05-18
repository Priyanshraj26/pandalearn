import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: { signIn: "/login", error: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (nextUrl.pathname.startsWith("/dashboard")) return isLoggedIn
      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup"))
        return Response.redirect(new URL("/dashboard", nextUrl))
      return true
    },
  },
} satisfies NextAuthConfig
