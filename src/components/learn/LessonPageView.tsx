"use client"

import { Suspense, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LessonMeta {
  num:   string
  label: string
  time?: string
  color: string
}

interface Props {
  lessons:  LessonMeta[]
  slots:    React.ReactNode[]   // one per lesson, same order as lessons
  quiz?:    React.ReactNode     // shown after the last lesson's content
}

// ── Inner component (uses useSearchParams → must be inside Suspense) ──────────

function Inner({ lessons, slots, quiz }: Props) {
  const searchParams  = useSearchParams()
  const router        = useRouter()
  const pathname      = usePathname()

  const raw     = searchParams.get("lesson")
  const idx     = raw ? Math.min(Math.max(parseInt(raw) - 1, 0), lessons.length - 1) : 0
  const isLast  = idx === lessons.length - 1
  const lesson  = lessons[idx]

  const goTo = useCallback((i: number) => {
    router.push(`${pathname}?lesson=${i + 1}`, { scroll: false })
    // scroll to top of content area
    requestAnimationFrame(() =>
      document.getElementById("lesson-content-top")?.scrollIntoView({ behavior: "smooth", block: "start" })
    )
  }, [router, pathname])

  return (
    <div>
      {/* ── Sticky lesson navigation strip ─────────────────────────────────── */}
      <div className="sticky top-[53px] z-30 bg-white/98 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="px-6 lg:px-10">
          <div className="flex items-stretch h-11 gap-1">

            {lessons.map((l, i) => {
              const isActive = i === idx
              const isDone   = i < idx
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all"
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
                      style={isActive ? { background: l.color, color: "#fff" } : { background: "#E5E7EB", color: "#9CA3AF" }}
                    >
                      {l.num}
                    </span>
                  )}
                  <span className="hidden sm:inline">{l.label}</span>
                  <span className="sm:hidden">L{i + 1}</span>

                  {/* active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="lesson-tab-bar"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: l.color }}
                    />
                  )}
                </button>
              )
            })}

            {/* progress */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">
                {Math.round(((idx + 1) / lessons.length) * 100)}% complete
              </span>
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: lesson.color }}
                  animate={{ width: `${((idx + 1) / lessons.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lesson content ──────────────────────────────────────────────────── */}
      <div id="lesson-content-top" className="scroll-mt-24" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="px-6 lg:px-10"
        >
          <div className="py-10 space-y-16">
            {slots[idx]}
            {isLast && quiz}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom navigation ────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-10 pb-16">
        <div className="flex items-center justify-between border-t border-gray-100 pt-8">

          {/* Back */}
          <div>
            {idx > 0 && (
              <button
                onClick={() => goTo(idx - 1)}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 transition-all group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Previous</p>
                  <p className="text-sm font-semibold leading-tight">{lessons[idx - 1].label}</p>
                </div>
              </button>
            )}
          </div>

          {/* Lesson indicator */}
          <div className="flex gap-1.5">
            {lessons.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={i === idx ? { background: lesson.color, transform: "scale(1.3)" } : { background: "#E5E7EB" }}
              />
            ))}
          </div>

          {/* Next */}
          <div>
            {!isLast ? (
              <button
                onClick={() => goTo(idx + 1)}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90 group"
                style={{ background: lessons[idx + 1].color }}
              >
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">Next Lesson</p>
                  <p className="text-sm font-semibold leading-tight">{lessons[idx + 1].label}</p>
                </div>
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm px-2">
                <CheckCircle2 size={16} />
                <span>Complete the quiz above!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Public export  wraps Inner in Suspense ───────────────────────────────────

export default function LessonPageView(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="sticky top-[53px] z-30 bg-white border-b border-gray-100 h-11 animate-pulse" />
      }
    >
      <Inner {...props} />
    </Suspense>
  )
}
