import { Lock } from "lucide-react"

interface Achievement {
  id: string
  earnedAt: Date
  achievement: {
    id: string
    title: string
    description: string
    iconName: string
    xpReward: number
  }
}

interface Props {
  achievements: Achievement[]
}

const LOCKED: { name: string; description: string }[] = [
  { name: "First Module",  description: "Complete your first module"    },
  { name: "Week Warrior",  description: "Maintain a 7-day streak"       },
  { name: "Quiz Master",   description: "Pass 10 quizzes"               },
  { name: "XP Hunter",     description: "Earn 1,000 XP"                 },
]

export default function AchievementsGrid({ achievements }: Props) {
  const hasEarned = achievements.length > 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sora font-bold text-gray-900">Achievements</h2>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
          {achievements.length} earned
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {hasEarned
          ? achievements.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-violet-50">
                <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0 text-lg">
                  {a.achievement.iconName}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{a.achievement.title}</p>
                  <p className="text-xs text-violet-600">+{a.achievement.xpReward} XP</p>
                </div>
              </div>
            ))
          : LOCKED.map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 opacity-60">
                <div className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
                  <Lock size={15} className="text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">{a.name}</p>
                  <p className="text-xs text-gray-400 truncate">{a.description}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
