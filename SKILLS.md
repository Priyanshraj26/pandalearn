# PandaLearn — Tech Stack & Skills Reference

## Frontend
| Technology | Version | Notes |
|---|---|---|
| Next.js | 16.2.6 | App Router, React 19, TypeScript, `src/` layout |
| Tailwind CSS | v4 | `@import "tailwindcss"`, `bg-linear-to-*` (not `bg-gradient-to-*`), `@theme inline {}` |
| Framer Motion / Motion | v12 | `whileInView`, `animate`, `useSpring`, `useInView` |
| lucide-react | v1.16.0 | Icon library |
| Fonts | — | Sora (headings via `--font-sora`) + DM Sans (body via `--font-dm`) |
| UI Primitives | — | shadcn/ui components backed by Radix UI |

## Auth
| Technology | Notes |
|---|---|
| NextAuth.js v5 (Auth.js) | `next-auth@5.0.0-beta.31` |
| Provider | Credentials (email + password) |
| Adapter | `@auth/prisma-adapter` |
| Session strategy | JWT (required for Credentials) |
| Route protection | `src/middleware.ts` re-exports `auth`; `authorized` callback gates `/dashboard/*` |
| Type augmentation | `src/types/next-auth.d.ts` adds `id`, `xp`, `level`, `streak`, `track` to Session + JWT |

## Backend / Database
| Technology | Notes |
|---|---|
| Prisma | v7.8.0, schema at `prisma/schema.prisma` |
| Database | PostgreSQL |
| Passwords | bcryptjs, 12 rounds |
| Data access layer | `src/lib/db/user.ts` — single `getDashboardData()` runs 4 queries in `Promise.all` |

## AI / Integrations
| Service | Status |
|---|---|
| Google Gemini | To be wired (AI tutor) |
| Razorpay | To be wired (payments) |
| Resend | Installed, to be wired (transactional email) |

---

## Project Structure

```
pandalearn/
├── prisma/
│   └── schema.prisma          # DB schema (User, Account, Session, ModuleProgress, Achievement…)
├── src/
│   ├── app/
│   │   ├── (auth)/            # Route group — shared auth layout
│   │   │   ├── layout.tsx     # Two-column: violet branding left + white form right
│   │   │   ├── login/         # /login
│   │   │   └── signup/        # /signup
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts   # NextAuth handlers
│   │   │   ├── auth/register/route.ts        # POST /api/auth/register
│   │   │   └── contact/route.ts
│   │   ├── dashboard/
│   │   │   ├── layout.tsx     # Server: auth() check + sidebar + header shell
│   │   │   └── page.tsx       # Server: getDashboardData() + 4 panels
│   │   ├── about/ blog/ careers/ contact/ cookies/ for-institutions/
│   │   ├── engineering-track/ school-track/ press/ privacy/ terms/
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardSidebar.tsx   # Client — usePathname for active state, signOut
│   │   │   ├── DashboardHeader.tsx    # XP pill + avatar initials
│   │   │   ├── XPLevelCard.tsx        # Level, XP bar, streak, gems
│   │   │   ├── MyCoursesPanel.tsx     # Per-subject progress bars
│   │   │   ├── RecentActivityFeed.tsx # Grouped activity with icons
│   │   │   └── AchievementsGrid.tsx   # Earned / locked badges
│   │   ├── landing/                   # All landing page section components
│   │   └── ui/
│   │       └── AnimatedNumber.tsx     # Shared IntersectionObserver count-up
│   ├── lib/
│   │   ├── prisma.ts          # Singleton PrismaClient
│   │   ├── xp.ts              # levelFromXP / xpForLevel / xpProgress
│   │   └── db/user.ts         # DAL: getDashboardData, getUserStats, etc.
│   ├── types/
│   │   └── next-auth.d.ts     # Session + JWT type augmentation
│   ├── auth.ts                # Single NextAuth config (handlers, auth, signIn, signOut)
│   └── middleware.ts          # Re-exports auth as middleware
└── .env.example               # DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL
```

---

## Key DRY Patterns

- **Single Prisma client** — `src/lib/prisma.ts` global singleton; imported everywhere
- **Centralized XP math** — `src/lib/xp.ts`; used in both dashboard and landing gamification
- **Single auth config** — `src/auth.ts`; middleware, API routes, and server components all import from here
- **Data access layer** — `src/lib/db/user.ts`; dashboard page calls one function, gets everything
- **Shared AnimatedNumber** — `src/components/ui/AnimatedNumber.tsx`; used in XPLevelCard + GamificationSection
- **Route group layout** — `src/app/(auth)/layout.tsx` shared by login + signup pages

---

## Environment Variables

See `.env.example`:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/pandalearn?schema=public"
AUTH_SECRET="replace-with-a-random-32+-char-secret"
NEXTAUTH_URL="http://localhost:3000"
```

Generate `AUTH_SECRET` with:
```bash
openssl rand -base64 32
```

---

## Setup Checklist

1. Copy `.env.example` → `.env.local` and fill in values
2. Run `npx prisma migrate dev --name init` to create DB tables
3. Run `npx prisma generate` to generate the Prisma client
4. `npm run dev` — app available at http://localhost:3000
