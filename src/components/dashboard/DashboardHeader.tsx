import { Star } from "lucide-react"

interface Props {
  user: {
    name?: string | null
    email?: string | null
    xp?: number
    level?: number
  }
}

export default function DashboardHeader({ user }: Props) {
  const initials = (user.name ?? user.email ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 rounded-full">
          <Star size={14} className="text-violet-600 fill-violet-600" />
          <span className="text-sm font-semibold text-violet-700">
            {(user.xp ?? 0).toLocaleString()} XP
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{initials}</span>
        </div>
      </div>
    </header>
  )
}
