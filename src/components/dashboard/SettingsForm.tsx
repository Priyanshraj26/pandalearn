"use client"

import { useState } from "react"
import { User, BookOpen, Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

type Profile = {
  name: string | null
  email: string | null
  track: string | null
  board: string | null
  hasPassword: boolean
}

type Feedback = { type: "success" | "error"; message: string } | null

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
          <Icon size={16} className="text-violet-600" />
        </div>
        <h2 className="font-sora font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function FeedbackBanner({ state }: { state: Feedback }) {
  if (!state) return null
  return (
    <div
      className={`flex items-center gap-2 text-sm rounded-xl px-3 py-2 mt-3 border ${
        state.type === "success"
          ? "bg-green-50 border-green-100 text-green-700"
          : "bg-red-50 border-red-100 text-red-600"
      }`}
    >
      {state.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
      {state.message}
    </div>
  )
}

const inputCls =
  "w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all"

const labelCls = "text-sm font-medium text-gray-700 mb-1.5 block"

const saveBtnCls =
  "bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-semibold text-sm rounded-xl px-5 py-2.5 transition-colors flex items-center gap-2"

const TRACKS = [
  { value: "school", label: "School", desc: "Class 9–12 curriculum" },
  { value: "engineering", label: "Engineering", desc: "CS / engineering concepts" },
]

const BOARDS = [
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "state_board", label: "State Board" },
]

export default function SettingsForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name ?? "")
  const [profileFeedback, setProfileFeedback] = useState<Feedback>(null)
  const [profileSaving, setProfileSaving] = useState(false)

  const [track, setTrack] = useState<string | null>(profile.track)
  const [board, setBoard] = useState<string | null>(profile.board)
  const [prefFeedback, setPrefFeedback] = useState<Feedback>(null)
  const [prefSaving, setPrefSaving] = useState(false)

  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [pwFeedback, setPwFeedback] = useState<Feedback>(null)
  const [pwSaving, setPwSaving] = useState(false)

  async function patch(payload: Record<string, unknown>) {
    const res = await fetch("/api/user/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok, data: await res.json() }
  }

  async function saveProfile() {
    setProfileSaving(true)
    setProfileFeedback(null)
    try {
      const { ok, data } = await patch({ name })
      setProfileFeedback(
        ok ? { type: "success", message: "Profile updated." } : { type: "error", message: data.error ?? "Failed to save." }
      )
    } catch {
      setProfileFeedback({ type: "error", message: "Network error." })
    } finally {
      setProfileSaving(false)
    }
  }

  async function savePreferences() {
    setPrefSaving(true)
    setPrefFeedback(null)
    try {
      const { ok, data } = await patch({ track, board: track === "school" ? board : null })
      setPrefFeedback(
        ok ? { type: "success", message: "Preferences saved." } : { type: "error", message: data.error ?? "Failed to save." }
      )
    } catch {
      setPrefFeedback({ type: "error", message: "Network error." })
    } finally {
      setPrefSaving(false)
    }
  }

  async function savePassword() {
    if (newPw !== confirmPw) {
      setPwFeedback({ type: "error", message: "Passwords do not match." })
      return
    }
    if (newPw.length < 8) {
      setPwFeedback({ type: "error", message: "Password must be at least 8 characters." })
      return
    }
    setPwSaving(true)
    setPwFeedback(null)
    try {
      const { ok, data } = await patch({ currentPassword: currentPw, newPassword: newPw })
      if (ok) {
        setPwFeedback({ type: "success", message: "Password updated." })
        setCurrentPw("")
        setNewPw("")
        setConfirmPw("")
      } else {
        setPwFeedback({ type: "error", message: data.error ?? "Failed to update password." })
      }
    } catch {
      setPwFeedback({ type: "error", message: "Network error." })
    } finally {
      setPwSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <SectionCard title="Profile" icon={User}>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Display name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={profile.email ?? ""}
              disabled
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1.5">Email cannot be changed.</p>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={saveProfile}
            disabled={profileSaving || !name.trim()}
            className={saveBtnCls}
          >
            {profileSaving && <Loader2 size={14} className="animate-spin" />}
            Save profile
          </button>
        </div>
        <FeedbackBanner state={profileFeedback} />
      </SectionCard>

      {/* Learning preferences */}
      <SectionCard title="Learning Preferences" icon={BookOpen}>
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2.5">Learning track</p>
            <div className="grid grid-cols-2 gap-3">
              {TRACKS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTrack(opt.value)}
                  className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all ${
                    track === opt.value
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className={`text-sm font-semibold ${track === opt.value ? "text-violet-700" : "text-gray-700"}`}>
                    {opt.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${track === opt.value ? "text-violet-500" : "text-gray-400"}`}>
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {track === "school" && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2.5">Board</p>
              <div className="flex flex-wrap gap-2.5">
                {BOARDS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBoard(opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      board === opt.value
                        ? "border-violet-500 bg-violet-50 text-violet-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-5">
          <button onClick={savePreferences} disabled={prefSaving} className={saveBtnCls}>
            {prefSaving && <Loader2 size={14} className="animate-spin" />}
            Save preferences
          </button>
        </div>
        <FeedbackBanner state={prefFeedback} />
      </SectionCard>

      {/* Security - only for credential accounts */}
      {profile.hasPassword && (
        <SectionCard title="Security" icon={Shield}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Current password</label>
              <input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className={inputCls}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <div>
              <label className={labelCls}>New password</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className={inputCls}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className={labelCls}>Confirm new password</label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className={inputCls}
                placeholder="Repeat new password"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={savePassword}
              disabled={pwSaving || !currentPw || !newPw || !confirmPw}
              className={saveBtnCls}
            >
              {pwSaving && <Loader2 size={14} className="animate-spin" />}
              Update password
            </button>
          </div>
          <FeedbackBanner state={pwFeedback} />
        </SectionCard>
      )}
    </div>
  )
}
