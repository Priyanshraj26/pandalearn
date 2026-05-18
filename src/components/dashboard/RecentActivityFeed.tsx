import { BookOpen, CheckCircle, Star, Zap, Flame } from "lucide-react"

interface ActivityLog {
  id: string
  type: string
  title: string
  description: string | null
  xpGained: number
  createdAt: Date
}

interface Props {
  activity: ActivityLog[]
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  module_complete: <BookOpen   size={15} className="text-violet-600" />,
  quiz_pass:       <CheckCircle size={15} className="text-green-600" />,
  achievement:     <Star        size={15} className="text-orange-500" />,
  level_up:        <Zap         size={15} className="text-violet-600" />,
  streak:          <Flame       size={15} className="text-orange-500" />,
}

const TYPE_LABEL: Record<string, string> = {
  module_complete: "Completed a module",
  quiz_pass:       "Passed a quiz",
  achievement:     "Earned an achievement",
  level_up:        "Levelled up",
  streak:          "Streak milestone",
}

function relativeDate(d: Date) {
  const ms   = Date.now() - new Date(d).getTime()
  if (ms < 86_400_000)  return "Today"
  if (ms < 172_800_000) return "Yesterday"
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export default function RecentActivityFeed({ activity }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="font-sora font-bold text-gray-900 mb-4">Recent Activity</h2>

      {activity.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <BookOpen size={32} className="text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No activity yet - start a module!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activity.map((a) => (
            <div key={a.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                {TYPE_ICON[a.type] ?? <Star size={15} className="text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{a.title}</p>
                <p className="text-xs text-gray-400">{relativeDate(a.createdAt)}</p>
              </div>
              {a.xpGained > 0 && (
                <span className="text-xs font-semibold text-violet-600 shrink-0">
                  +{a.xpGained} XP
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
