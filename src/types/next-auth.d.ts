import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    xp?: number
    level?: number
    streak?: number
    track?: string | null
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      xp: number
      level: number
      streak: number
      track: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    xp?: number
    level?: number
    streak?: number
    track?: string | null
  }
}
