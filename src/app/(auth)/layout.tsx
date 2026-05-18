import { PawPrint, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fafafa" }}>

      {/* ── Navbar ── */}
      <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <PawPrint size={15} className="text-white" />
            </div>
            <span className="font-sora text-sm font-bold text-gray-900 leading-none">
              Panda<span className="text-violet-600">Learn</span>
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-full leading-none ml-0.5">
              Beta
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold text-white bg-orange-500 hover:bg-orange-400 rounded-lg shadow-sm transition-all"
            >
              Start Free
              <ArrowRight size={12} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  )
}
