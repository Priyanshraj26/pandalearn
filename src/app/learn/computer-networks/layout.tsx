import Link from "next/link"
import { PawPrint, ChevronLeft, Lock } from "lucide-react"

const MODULES = [
  { num: 1, title: "Introduction to Networks",       dur: "~3h", unlocked: true  },
  { num: 2, title: "OSI & TCP/IP Models",            dur: "~5h", unlocked: false },
  { num: 3, title: "Data Link Layer",                dur: "~4h", unlocked: false },
  { num: 4, title: "Network Layer & IP Addressing",  dur: "~6h", unlocked: false },
  { num: 5, title: "Transport Layer: TCP & UDP",     dur: "~6h", unlocked: false },
  { num: 6, title: "Application Layer Protocols",    dur: "~6h", unlocked: false },
  { num: 7, title: "Network Infrastructure",         dur: "~5h", unlocked: false },
  { num: 8, title: "Security & Modern Patterns",     dur: "~5h", unlocked: false },
]

export default function CNLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── top bar ── */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 h-[53px]">
        <Link
          href="/engineering-track"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={15} /> Engineering Track
        </Link>
        <span className="text-gray-200">|</span>
        <span className="text-sm font-semibold text-gray-900">Computer Networks</span>
        <div className="ml-auto">
          <Link href="/">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <PawPrint size={13} className="text-white" />
            </div>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">

        {/* ── sidebar ── */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-white border-r border-gray-200 sticky top-[53px] h-[calc(100vh-53px)] overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Progress</p>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: "12.5%" }} />
            </div>
            <p className="text-xs text-gray-400">1 of 8 modules complete</p>
          </div>

          <nav className="flex-1 p-3 space-y-0.5">
            {MODULES.map(m => (
              m.unlocked ? (
                <Link
                  key={m.num}
                  href={`/learn/computer-networks/module-${m.num}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors group"
                >
                  <span className="w-6 h-6 rounded-md bg-violet-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {m.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{m.title}</p>
                    <p className="text-xs text-gray-400">{m.dur}</p>
                  </div>
                </Link>
              ) : (
                <div
                  key={m.num}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 cursor-not-allowed"
                >
                  <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {m.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{m.title}</p>
                    <p className="text-xs text-gray-300">{m.dur}</p>
                  </div>
                  <Lock size={12} className="shrink-0 text-gray-300" />
                </div>
              )
            ))}
          </nav>
        </aside>

        {/* ── main ── */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
