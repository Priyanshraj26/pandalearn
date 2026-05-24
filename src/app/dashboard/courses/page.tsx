import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getDashboardData } from "@/lib/db/user"
import Link from "next/link"
import {
  Brain, Network,
  ArrowRight, CheckCircle, Lock, Play, BookOpen, Flame,
} from "lucide-react"

// ── Catalog data ──────────────────────────────────────────────────────────────

type Subject = {
  id: string
  key: string          // matches moduleProgress.subject in DB
  label: string
  description: string
  Icon: React.ElementType
  iconBg: string
  iconText: string
  total: number
  href: string
  modules: string[]
}

const ENGINEERING: Subject[] = [
  {
    id: "networks", key: "Computer Networks",
    label: "Computer Networks",
    description: "OSI model, TCP/IP, IP addressing, routing, DNS, HTTP/S — every layer animated.",
    Icon: Network, iconBg: "bg-violet-100", iconText: "text-violet-600",
    total: 6, href: "/learn/computer-networks",
    modules: [
      "Introduction to Networks", "OSI & TCP/IP Models", "Data Link Layer",
      "Network Layer & IP Addressing", "Transport Layer: TCP & UDP", "Application Layer Protocols",
    ],
  },
]

const SCHOOL: Subject[] = [
  {
    id: "ai", key: "What is AI",
    label: "CBSE AI — Class IX",
    description: "CBSE Subject 417 — AI project cycle, ethics, data literacy, gen AI, and Python.",
    Icon: Brain, iconBg: "bg-orange-100", iconText: "text-orange-600",
    total: 5, href: "/learn/cbse-ai-class9",
    modules: [
      "AI Reflection, Project Cycle & Ethics",
      "Data Literacy",
      "Math for AI: Statistics & Probability",
      "Introduction to Generative AI",
      "Introduction to Python",
    ],
  },
]

const CATALOG: Record<string, Subject[]> = { engineering: ENGINEERING, school: SCHOOL }

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CoursesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")
  const userId = session!.user!.id

  let dashData = null
  try { dashData = await getDashboardData(userId) } catch {}

  const su = session!.user!
  const user = dashData?.user ?? {
    name: su.name,
    xp: (su as { xp?: number }).xp ?? 0,
    level: (su as { level?: number }).level ?? 1,
    streak: (su as { streak?: number }).streak ?? 0,
    track: (su as { track?: string | null }).track ?? null,
  }

  // Build a map: subject key → number of completed modules
  const progressMap = Object.fromEntries(
    (dashData?.courseProgress ?? []).map((p) => [p.subject, p._count.id])
  )

  const trackId  = user.track ?? null
  const subjects = trackId ? (CATALOG[trackId] ?? []) : []
  const totalModules    = subjects.reduce((s, c) => s + c.total, 0)
  const completedTotal  = subjects.reduce((s, c) => s + Math.min(progressMap[c.key] ?? 0, c.total), 0)

  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-sora text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500 text-sm mt-1">
            {trackId
              ? `${trackId === "engineering" ? "Engineering" : "School"} Track · ${completedTotal} / ${totalModules} modules completed`
              : "Choose a track to begin your learning journey"}
          </p>
        </div>
        {trackId && user.streak > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-sm font-semibold text-orange-600">
            <Flame size={14} />
            {user.streak} day streak
          </div>
        )}
      </div>

      {/* No track selected */}
      {!trackId && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-violet-600" />
          </div>
          <h2 className="font-sora font-bold text-gray-900 text-lg mb-2">No track selected</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Choose between the School (Grade 9–12) or Engineering track to unlock your personalised curriculum.
          </p>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            Choose your track <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Subject cards */}
      {subjects.map((subject) => {
        const done    = Math.min(progressMap[subject.key] ?? 0, subject.total)
        const pct     = Math.round((done / subject.total) * 100)
        const current = done < subject.total ? done : subject.total - 1  // next module index

        return (
          <div key={subject.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">

            {/* Card header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${subject.iconBg} flex items-center justify-center shrink-0`}>
                  <subject.Icon size={20} className={subject.iconText} />
                </div>
                <div>
                  <h2 className="font-sora font-bold text-gray-900">{subject.label}</h2>
                  <p className="text-gray-500 text-xs mt-0.5 max-w-md">{subject.description}</p>
                </div>
              </div>

              <Link
                href={done === 0 ? subject.href : `${subject.href}/module-${current + 1}`}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-xl transition-colors shrink-0 ml-4"
              >
                {done === 0 ? (
                  <><Play size={12} className="fill-white" /> Start</>
                ) : done === subject.total ? (
                  <><CheckCircle size={12} /> Review</>
                ) : (
                  <><Play size={12} className="fill-white" /> Continue</>
                )}
              </Link>
            </div>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span>{done} / {subject.total} modules</span>
                <span>{pct}% complete</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Module grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {subject.modules.slice(0, 8).map((mod, idx) => {
                const isCompleted  = idx < done
                const isCurrent    = idx === done && done < subject.total
                const isLocked     = idx > done

                return (
                  <div
                    key={mod}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      isCompleted
                        ? "bg-violet-50 border-violet-100 text-violet-700"
                        : isCurrent
                          ? "bg-orange-50 border-orange-200 text-orange-700"
                          : "bg-gray-50 border-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={11} className="shrink-0 text-violet-500" />
                    ) : isCurrent ? (
                      <Play size={11} className="shrink-0 fill-orange-500 text-orange-500" />
                    ) : (
                      <Lock size={11} className="shrink-0 opacity-40" />
                    )}
                    <span className="truncate">{mod}</span>
                  </div>
                )
              })}
            </div>

            {subject.total > 8 && (
              <p className="text-xs text-gray-400 mt-2.5 pl-1">
                +{subject.total - 8} more modules
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
