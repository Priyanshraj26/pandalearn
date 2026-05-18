import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getDashboardData } from "@/lib/db/user"
import XPLevelCard from "@/components/dashboard/XPLevelCard"
import MyCoursesPanel from "@/components/dashboard/MyCoursesPanel"
import RecentActivityFeed from "@/components/dashboard/RecentActivityFeed"
import AchievementsGrid from "@/components/dashboard/AchievementsGrid"

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sora text-2xl font-bold text-gray-900">
          Welcome back, {(user.name ?? "Learner").split(" ")[0]}!
        </h1>
        <p className="text-gray-500 text-sm mt-1">Keep the streak going.</p>
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
