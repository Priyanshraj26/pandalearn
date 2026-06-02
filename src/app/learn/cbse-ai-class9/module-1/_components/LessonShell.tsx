"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

interface LessonMeta {
  num:   string
  label: string
  time:  string
  color: string
  href:  string
}

const LESSONS: LessonMeta[] = [
  { num: "01", label: "What is AI?",   time: "~45 min", color: "#3B82F6", href: "1" },
  { num: "02", label: "Project Cycle", time: "~90 min", color: "#F97316", href: "2" },
  { num: "03", label: "Ethics & Bias", time: "~45 min", color: "#7C3AED", href: "3" },
]

export default function LessonShell({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const seg       = pathname.split("/").pop() ?? "1"
  // Derive absolute module base path: /learn/cbse-ai-class9/module-1
  const basePath  = pathname.split("/").slice(0, -1).join("/")
  const activeIdx = Math.max(0, LESSONS.findIndex(l => l.href === seg))
  const lesson    = LESSONS[activeIdx]
  const prev      = LESSONS[activeIdx - 1]
  const next      = LESSONS[activeIdx + 1]
  const pct       = Math.round(((activeIdx + 1) / LESSONS.length) * 100)

  return (
    <div>
      {/* ── Sticky lesson nav strip ─────────────────────────────────────────── */}
      <div className="sticky top-[53px] z-30 bg-white/98 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="px-6 lg:px-10">
          <div className="flex items-center gap-1 h-11">

            {LESSONS.map((l, i) => {
              const isActive = i === activeIdx
              const isDone   = i < activeIdx
              return (
                <Link
                  key={l.href}
                  href={`${basePath}/${l.href}`}
                  className="relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all select-none"
                  style={
                    isActive ? { color: l.color, background: l.color + "14" }
                    : isDone  ? { color: "#10B981" }
                    : { color: "#9CA3AF" }
                  }
                >
                  {isDone ? (
                    <CheckCircle2 size={11} className="shrink-0" />
                  ) : (
                    <span
                      className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold shrink-0"
                      style={isActive
                        ? { background: l.color, color: "#fff" }
                        : { background: "#E5E7EB", color: "#9CA3AF" }}
                    >
                      {l.num}
                    </span>
                  )}
                  <span className="hidden sm:inline">{l.label}</span>
                  <span className="sm:hidden">L{i + 1}</span>

                  {isActive && (
                    <motion.span
                      layoutId="shell-tab-bar"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: l.color }}
                    />
                  )}
                </Link>
              )
            })}

            {/* progress */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">
                {pct}% complete
              </span>
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: lesson.color }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lesson content ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={seg}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="px-6 lg:px-10"
        >
          <div className="py-10 space-y-16">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom navigation ───────────────────────────────────────────────── */}
      <div className="px-6 lg:px-10 pb-16">
        <div className="flex items-center justify-between border-t border-gray-100 pt-8">

          {/* Back */}
          <div>
            {prev ? (
              <Link href={`${basePath}/${prev.href}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 transition-all group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Previous</p>
                  <p className="text-sm font-semibold leading-tight">{prev.label}</p>
                </div>
              </Link>
            ) : (
              <Link href={basePath}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 transition-all text-sm font-semibold"
              >
                <ChevronLeft size={16} /> Module overview
              </Link>
            )}
          </div>

          {/* Lesson dots */}
          <div className="flex gap-1.5">
            {LESSONS.map((l, i) => (
              <Link key={l.href} href={`${basePath}/${l.href}`}>
                <span
                  className="block w-2 h-2 rounded-full transition-all"
                  style={i === activeIdx
                    ? { background: l.color, transform: "scale(1.3)" }
                    : { background: "#E5E7EB" }}
                />
              </Link>
            ))}
          </div>

          {/* Next */}
          <div>
            {next ? (
              <Link href={`${basePath}/${next.href}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90 group"
                style={{ background: next.color }}
              >
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">Next Lesson</p>
                  <p className="text-sm font-semibold leading-tight">{next.label}</p>
                </div>
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm px-2">
                <CheckCircle2 size={16} />
                <span>All lessons done!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
