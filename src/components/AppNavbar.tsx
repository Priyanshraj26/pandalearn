import Link from "next/link"
import { auth } from "@/auth"
import { PawPrint, ChevronLeft, Star, LogOut } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type DashboardProps = {
  variant: "dashboard"
}

type LearnProps = {
  variant: "learn"
  backHref: string
  backLabel: string
  courseTitle: string
}

type Props = DashboardProps | LearnProps

// ── Helpers ───────────────────────────────────────────────────────────────────

function Avatar({ name, email }: { name?: string | null; email?: string | null }) {
  const initials = (name ?? email ?? "?")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default async function AppNavbar(props: Props) {
  const session = await auth()
  const user = session?.user as
    | (typeof session.user & { xp?: number; level?: number })
    | null
    | undefined

  const isDashboard = props.variant === "dashboard"

  return (
    <header className="sticky top-0 z-40 h-13.25 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-3">

      {/* ── Left ── */}
      {isDashboard ? (
        /* Logo - only shown on mobile; desktop sidebar already has it */
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <PawPrint size={13} className="text-white" />
          </div>
          <span className="font-sora font-bold text-sm text-gray-900">PandaLearn</span>
        </Link>
      ) : (
        /* Learn context: back link + separator + course title */
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href={(props as LearnProps).backHref}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors shrink-0"
          >
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">{(props as LearnProps).backLabel}</span>
          </Link>
          <span className="text-gray-200 shrink-0">|</span>
          <span className="text-sm font-semibold text-gray-900 truncate">
            {(props as LearnProps).courseTitle}
          </span>
        </div>
      )}

      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── Right ── */}
      <div className="flex items-center gap-2.5">

        {user ? (
          <>
            {/* XP pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 rounded-full">
              <Star size={12} className="text-violet-600 fill-violet-600" />
              <span className="text-xs font-semibold text-violet-700">
                {(user.xp ?? 0).toLocaleString()} XP
              </span>
            </div>

            {/* Avatar - links to dashboard */}
            <Link href="/dashboard" title="Go to dashboard">
              <Avatar name={user.name} email={user.email} />
            </Link>
          </>
        ) : (
          /* Not logged in - only shown in learn context */
          !isDashboard && (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Sign in
            </Link>
          )
        )}

        {/* Learn context: logo link back to home */}
        {!isDashboard && (
          <Link href="/" className="ml-1">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <PawPrint size={13} className="text-white" />
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}
