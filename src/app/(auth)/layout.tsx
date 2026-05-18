import { PawPrint } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-violet-600 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <PawPrint size={20} className="text-white" />
          </div>
          <span className="font-sora text-xl font-bold text-white">PandaLearn</span>
        </Link>

        <div>
          <h2 className="font-sora text-4xl font-bold text-white leading-tight mb-8">
            Learn by doing.<br />See every concept<br />come alive.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Interactive Modules", value: "50+" },
              { label: "Learning Tracks",     value: "2"   },
              { label: "Students",            value: "10K+"},
              { label: "AI-Powered",          value: "100%"},
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <div className="font-sora text-2xl font-bold text-white">{s.value}</div>
                <div className="text-violet-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-violet-200 text-sm">© 2025 PandaLearn</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <PawPrint size={16} className="text-white" />
            </div>
            <span className="font-sora text-lg font-bold text-gray-900">PandaLearn</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
