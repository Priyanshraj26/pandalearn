"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const LESSONS = [
  { id: "lesson-01", num: "01", label: "How Computers See",  color: "#3B82F6" },
  { id: "lesson-02", num: "02", label: "CV Applications",    color: "#F97316" },
  { id: "lesson-03", num: "03", label: "CNNs",               color: "#7C3AED" },
]

export default function LessonProgressStrip() {
  const [activeId, setActiveId] = useState("lesson-01")

  useEffect(() => {
    const observers = LESSONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: "-15% 0px -70% 0px" },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const activeIdx = LESSONS.findIndex(l => l.id === activeId)
  const pct = Math.round(((activeIdx + 1) / LESSONS.length) * 100)

  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm shadow-gray-100/80">
      <div className="px-6 lg:px-10 py-0">
        <div className="flex items-center gap-2 h-11">
          {LESSONS.map(({ id, num, label, color }, i) => {
            const isActive = id === activeId
            const isDone   = i < activeIdx
            return (
              <div key={id} className="flex items-center gap-2">
                <a
                  href={`#${id}`}
                  className="relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors"
                  style={
                    isActive ? { color, background: color + "14" }
                    : isDone  ? { color: "#10B981" }
                    : { color: "#9CA3AF" }
                  }
                >
                  {isDone
                    ? <CheckCircle2 size={11} className="shrink-0" />
                    : (
                      <span
                        className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold shrink-0"
                        style={isActive ? { background: color, color: "#fff" } : { background: "#E5E7EB", color: "#9CA3AF" }}
                      >
                        {num}
                      </span>
                    )
                  }
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">L{i + 1}</span>
                </a>
                {i < LESSONS.length - 1 && (
                  <div
                    className="w-8 h-px transition-colors duration-500"
                    style={{ background: i < activeIdx ? "#10B98144" : "#E5E7EB" }}
                  />
                )}
              </div>
            )
          })}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">{pct}% complete</span>
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: LESSONS[activeIdx]?.color ?? "#7C3AED" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
