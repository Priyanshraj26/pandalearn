import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getDashboardData } from "@/lib/db/user"
import Link from "next/link"
import { ArrowRight, Brain, Network } from "lucide-react"
import XPLevelCard from "@/components/dashboard/XPLevelCard"
import MyCoursesPanel from "@/components/dashboard/MyCoursesPanel"
import RecentActivityFeed from "@/components/dashboard/RecentActivityFeed"
import AchievementsGrid from "@/components/dashboard/AchievementsGrid"

const TRACK_CTA: Record<string, { label: string; sub: string; href: string; Icon: React.ElementType; color: string }> = {
  school: {
    label: "CBSE AI — Class IX",
    sub: "Unit 1: AI Reflection, Project Cycle & Ethics",
    href: "/learn/cbse-ai-class9/module-1",
    Icon: Brain,
    color: "bg-orange-500",
  },
  engineering: {
    label: "Computer Networks",
    sub: "Module 1: Introduction to Networks",
    href: "/learn/computer-networks/module-1",
    Icon: Network,
    color: "bg-violet-600",
  },
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  let dashData = null
  try {
    dashData = await getDashboardData(session.user.id)
  } catch {
    // DB not yet provisioned - fall back to session data
  }

  const user = dashData?.user ?? {
    name:      session.user.name,
    xp:        session.user.xp     ?? 0,
    level:     session.user.level  ?? 1,
    streak:    session.user.streak ?? 0,
    gems:      0,
    track:     session.user.track  ?? null,
    createdAt: new Date(),
  }

  const cta = user.track ? TRACK_CTA[user.track] ?? null : null

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-sora text-2xl font-bold text-gray-900">
            Welcome back, {(user.name ?? "Learner").split(" ")[0]}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">Keep the streak going.</p>
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 hover:border-violet-300 hover:shadow-sm rounded-xl transition-all group shrink-0"
          >
            <div className={`w-8 h-8 rounded-lg ${cta.color} flex items-center justify-center shrink-0`}>
              <cta.Icon size={15} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">{cta.label}</p>
              <p className="text-[11px] text-gray-400">{cta.sub}</p>
            </div>
            <ArrowRight size={14} className="text-gray-300 group-hover:text-violet-500 transition-colors ml-1" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <XPLevelCard
            xp={user.xp}
            level={user.level}
            streak={user.streak}
            gems={user.gems ?? 0}
          />
        </div>
        <div className="lg:col-span-2">
          <MyCoursesPanel
            track={user.track}
            courseProgress={dashData?.courseProgress ?? []}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityFeed activity={dashData?.activity ?? []} />
        <AchievementsGrid   achievements={dashData?.achievements ?? []} />
      </div>
    </div>
  )
}
