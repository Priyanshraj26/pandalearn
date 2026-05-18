import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

interface CourseProgress {
  subject: string
  track: string
  _count: { id: number }
  _sum: { xpEarned: number | null }
}

interface Props {
  track: string | null | undefined
  courseProgress: CourseProgress[]
}

const TRACK_SUBJECTS: Record<string, { label: string; total: number; color: string }[]> = {
  school: [
    { label: "Mathematics",       total: 8,  color: "bg-blue-500"   },
    { label: "Computer Science",  total: 6,  color: "bg-violet-500" },
    { label: "Programming",       total: 7,  color: "bg-orange-500" },
    { label: "What is AI",        total: 5,  color: "bg-teal-500"   },
  ],
  engineering: [
    { label: "Data Structures & Algorithms", total: 20, color: "bg-violet-500" },
    { label: "Machine Learning",             total: 12, color: "bg-blue-500"   },
    { label: "Computer Networks",            total: 10, color: "bg-orange-500" },
    { label: "System Design",                total: 8,  color: "bg-teal-500"   },
  ],
}

export default function MyCoursesPanel({ track, courseProgress }: Props) {
  const subjects    = TRACK_SUBJECTS[track ?? ""] ?? []
  const progressMap = Object.fromEntries(courseProgress.map((p) => [p.subject, p._count.id]))

  if (!track) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
        <BookOpen size={32} className="text-gray-300 mb-3" />
        <p className="text-gray-500 text-sm mb-4">No track selected yet</p>
        <Link href="/dashboard/settings" className="text-sm font-medium text-violet-600 hover:underline">
          Choose your track
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-sora font-bold text-gray-900">
          {track === "school" ? "School Track" : "Engineering Track"}
        </h2>
        <Link
          href={`/${track}-track`}
          className="flex items-center gap-1 text-sm text-violet-600 hover:underline"
        >
          Explore <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-4">
        {subjects.map(({ label, total, color }) => {
          const done = progressMap[label] ?? 0
          const pct  = Math.round((done / total) * 100)
          return (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-400 text-xs">{done}/{total} modules</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
