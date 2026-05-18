import { Flame, Gem } from "lucide-react"
import { xpProgress } from "@/lib/xp"
import AnimatedNumber from "@/components/ui/AnimatedNumber"

interface Props {
  xp: number
  level: number
  streak: number
  gems: number
}

export default function XPLevelCard({ xp, level, streak, gems }: Props) {
  const prog = xpProgress(xp)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Current Level</p>
          <p className="font-sora text-5xl font-bold text-violet-600">{level}</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
          <span className="font-sora text-2xl font-bold text-violet-600">{level}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span><AnimatedNumber end={prog.current} /> XP this level</span>
          <span>{prog.required.toLocaleString()} XP needed</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${prog.percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{prog.percent}% to level {level + 1}</p>
      </div>

      <div className="flex gap-3 pt-1">
        <div className="flex-1 flex items-center gap-2.5 bg-orange-50 rounded-xl p-3">
          <Flame size={18} className="text-orange-500 shrink-0" />
          <div>
            <p className="font-sora font-bold text-gray-900 leading-none">{streak}</p>
            <p className="text-xs text-gray-500 mt-0.5">day streak</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2.5 bg-teal-50 rounded-xl p-3">
          <Gem size={18} className="text-teal-500 shrink-0" />
          <div>
            <p className="font-sora font-bold text-gray-900 leading-none">{gems}</p>
            <p className="text-xs text-gray-500 mt-0.5">gems</p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-0.5">Total XP earned</p>
        <p className="font-sora font-bold text-gray-900 text-lg">
          <AnimatedNumber end={xp} /> XP
        </p>
      </div>
    </div>
  )
}
