"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lock, ChevronLeft, ChevronRight, Award } from "lucide-react"

const UNITS = [
  { num: 1, title: "AI Reflection, Project Cycle & Ethics", dur: "~55h", marks: "10M", unlocked: true  },
  { num: 2, title: "Data Literacy",                          dur: "~50h", marks: "10M", unlocked: true  },
  { num: 3, title: "Math for AI: Statistics & Probability",  dur: "~25h", marks: "7M",  unlocked: true  },
  { num: 4, title: "Introduction to Generative AI",          dur: "~20h", marks: "5M",  unlocked: true  },
  { num: 5, title: "Introduction to Python",                 dur: "~10h", marks: "8M",  unlocked: true  },
]

export default function AISidebar() {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex flex-col bg-white border-r border-gray-200 sticky top-13.25 shrink-0 overflow-hidden"
      style={{
        height: "calc(100vh - 53px)",
        width: open ? 280 : 60,
        transition: "width 0.25s ease",
      }}
    >
      {/* CBSE badge + progress  visible only when open */}
      <div
        className="border-b border-gray-100 overflow-hidden"
        style={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, transition: "opacity 0.2s ease" }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-2.5 py-1">
              <Award size={11} className="text-orange-500" />
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide">CBSE 417</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">Class IX · 2026–27</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Progress</p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: "0%" }} />
          </div>
          <p className="text-xs text-gray-400">0 of 5 units complete</p>
        </div>
      </div>

      {/* Unit list */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
        {UNITS.map((u) => {
          const active = pathname === `/learn/cbse-ai-class9/module-${u.num}`

          return u.unlocked ? (
            <Link
              key={u.num}
              href={`/learn/cbse-ai-class9/module-${u.num}`}
              title={open ? undefined : u.title}
              className={`flex items-center rounded-xl text-sm transition-colors ${
                open ? "gap-3 px-3 py-2.5" : "justify-center px-2 py-2.5"
              } ${
                active
                  ? "bg-orange-50 text-orange-700"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  active ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"
                }`}
              >
                {u.num}
              </span>
              {open && (
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="font-medium truncate leading-tight">{u.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{u.dur} · {u.marks}</p>
                </div>
              )}
            </Link>
          ) : (
            <div
              key={u.num}
              title={open ? undefined : u.title}
              className={`flex items-center rounded-xl text-sm text-gray-400 cursor-not-allowed ${
                open ? "gap-3 px-3 py-2.5" : "justify-center px-2 py-2.5"
              }`}
            >
              <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold shrink-0">
                {u.num}
              </span>
              {open && (
                <>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="font-medium truncate leading-tight">{u.title}</p>
                    <p className="text-[11px] text-gray-300 mt-0.5">{u.dur} · {u.marks}</p>
                  </div>
                  <Lock size={11} className="shrink-0 text-gray-300" />
                </>
              )}
            </div>
          )
        })}
      </nav>

      {/* Collapse / expand toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 border-t border-gray-100 py-3 text-xs font-medium text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors ${
          open ? "px-4" : "justify-center px-0"
        }`}
      >
        {open ? (
          <><ChevronLeft size={14} /><span>Collapse</span></>
        ) : (
          <ChevronRight size={14} />
        )}
      </button>
    </aside>
  )
}
