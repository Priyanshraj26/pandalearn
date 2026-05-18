"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lock, ChevronLeft, ChevronRight } from "lucide-react"

const MODULES = [
  { num: 1, title: "Introduction to Networks",      dur: "~3h", unlocked: true  },
  { num: 2, title: "OSI & TCP/IP Models",           dur: "~5h", unlocked: true  },
  { num: 3, title: "Data Link Layer",               dur: "~4h", unlocked: true  },
  { num: 4, title: "Network Layer & IP Addressing", dur: "~6h", unlocked: true  },
  { num: 5, title: "Transport Layer: TCP & UDP",    dur: "~6h", unlocked: true  },
  { num: 6, title: "Application Layer Protocols",   dur: "~6h", unlocked: false },
  { num: 7, title: "Network Infrastructure",        dur: "~5h", unlocked: false },
  { num: 8, title: "Security & Modern Patterns",    dur: "~5h", unlocked: false },
]

export default function CNSidebar() {
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
      {/* Progress - visible only when open */}
      <div
        className="border-b border-gray-100 overflow-hidden"
        style={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div className="p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Progress
          </p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-violet-500 rounded-full" style={{ width: "12.5%" }} />
          </div>
          <p className="text-xs text-gray-400">1 of 8 modules complete</p>
        </div>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
        {MODULES.map((m) => {
          const active = pathname === `/learn/computer-networks/module-${m.num}`

          return m.unlocked ? (
            <Link
              key={m.num}
              href={`/learn/computer-networks/module-${m.num}`}
              title={open ? undefined : m.title}
              className={`flex items-center rounded-xl text-sm transition-colors ${
                open ? "gap-3 px-3 py-2.5" : "justify-center px-2 py-2.5"
              } ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  active ? "bg-violet-600 text-white" : "bg-violet-100 text-violet-600"
                }`}
              >
                {m.num}
              </span>
              {open && (
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="font-medium truncate leading-tight">{m.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{m.dur}</p>
                </div>
              )}
            </Link>
          ) : (
            <div
              key={m.num}
              title={open ? undefined : m.title}
              className={`flex items-center rounded-xl text-sm text-gray-400 cursor-not-allowed ${
                open ? "gap-3 px-3 py-2.5" : "justify-center px-2 py-2.5"
              }`}
            >
              <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold shrink-0">
                {m.num}
              </span>
              {open && (
                <>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="font-medium truncate leading-tight">{m.title}</p>
                    <p className="text-[11px] text-gray-300 mt-0.5">{m.dur}</p>
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
        className={`flex items-center gap-2 border-t border-gray-100 py-3 text-xs font-medium text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors ${
          open ? "px-4" : "justify-center px-0"
        }`}
      >
        {open ? (
          <>
            <ChevronLeft size={14} />
            <span>Collapse</span>
          </>
        ) : (
          <ChevronRight size={14} />
        )}
      </button>
    </aside>
  )
}
