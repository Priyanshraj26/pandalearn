"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const router  = useRouter()
  const [form,    setForm]    = useState({ name: "", email: "", password: "", track: "" })
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? "Registration failed")
      setLoading(false)
      return
    }

    await signIn("credentials", { email: form.email, password: form.password, redirect: false })
    router.push("/dashboard")
  }

  return (
    <>
      <h1 className="font-sora text-3xl font-bold text-gray-900 mb-2">Create account</h1>
      <p className="text-gray-500 mb-8">Start learning for free — no credit card needed</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            placeholder="Aryan Sharma"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            placeholder="Min. 8 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Learning track</label>
          <select
            value={form.track}
            onChange={(e) => set("track", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm bg-white"
          >
            <option value="">Select a track…</option>
            <option value="school">School (Grade 9–12)</option>
            <option value="engineering">Engineering + Interview Prep</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-violet-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </>
  )
}
