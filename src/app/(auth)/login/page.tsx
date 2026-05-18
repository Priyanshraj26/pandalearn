"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Loader2 } from "lucide-react"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export default function LoginPage() {
  const router             = useRouter()
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleGoogle() {
    setGoogleLoading(true)
    await signIn("google", { callbackUrl: "/dashboard" })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", { email, password, redirect: false })
    if (res?.error) {
      setError("Invalid email or password.")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full" style={{ maxWidth: 420 }}>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/50 overflow-hidden">

        {/* Header stripe */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 shadow-md shadow-violet-600/30 mb-4">
            <span className="text-2xl leading-none select-none">🐼</span>
          </div>
          <h1 className="font-sora text-[1.35rem] font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-[13px] text-gray-400">
            Sign in to your PandaLearn account
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-5">

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px]">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full h-11 flex items-center justify-center gap-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-[13px] font-medium text-gray-700 transition-all shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer"
          >
            {googleLoading ? <Loader2 size={16} className="animate-spin text-gray-400" /> : <GoogleIcon />}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Email + password form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-600">
                Email address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full h-11 pl-9 pr-4 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10 rounded-xl text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[13px] font-medium text-gray-600">
                  Password
                </label>
                <button type="button" className="text-[12px] text-violet-600 hover:text-violet-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full h-11 pl-9 pr-10 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10 rounded-xl text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[13px] rounded-xl transition-all shadow-sm hover:-translate-y-px active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Signing in…</>
              ) : (
                <>Sign In <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[13px] text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
