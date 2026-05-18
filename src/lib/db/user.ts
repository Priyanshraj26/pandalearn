import { prisma } from "@/lib/prisma"

/** Safe user fields returned to the dashboard - no password hash. */
const USER_SELECT = {
  id: true, name: true, email: true, image: true,
  xp: true, level: true, streak: true, gems: true,
  track: true, createdAt: true,
} as const

export async function getUserStats(userId: string) {
  return prisma.user.findUnique({ where: { id: userId }, select: USER_SELECT })
}

export async function getRecentActivity(userId: string, limit = 10) {
  return prisma.activityLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  })
}

export async function getCourseProgress(userId: string) {
  return prisma.moduleProgress.groupBy({
    by: ["subject", "track"],
    where: { userId },
    _count: { id: true },
    _sum:   { xpEarned: true },
  })
}

export async function getUserAchievements(userId: string) {
  return prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { earnedAt: "desc" },
  })
}

/** Single call that fetches everything needed for the dashboard. */
export async function getDashboardData(userId: string) {
  const [user, activity, courseProgress, achievements] = await Promise.all([
    getUserStats(userId),
    getRecentActivity(userId),
    getCourseProgress(userId),
    getUserAchievements(userId),
  ])
  return { user, activity, courseProgress, achievements }
}
