"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { PawPrint, LayoutDashboard, BookOpen, Trophy, Settings, LogOut } from "lucide-react"

const NAV = [
  { label: "Dashboard",    href: "/dashboard",              Icon: LayoutDashboard },
  { label: "My Courses",   href: "/dashboard/courses",      Icon: BookOpen        },
  { label: "Achievements", href: "/dashboard/achievements", Icon: Trophy          },
  { label: "Settings",     href: "/dashboard/settings",     Icon: Settings        },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-60 flex-col bg-white border-r border-gray-100 shrink-0">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <PawPrint size={16} className="text-white" />
          </div>
          <span className="font-sora font-bold text-gray-900">PandaLearn</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ label, href, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
