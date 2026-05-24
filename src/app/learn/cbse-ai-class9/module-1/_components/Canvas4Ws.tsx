"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, RotateCcw, CheckCircle2, Copy, Check } from "lucide-react"

type Theme = "health" | "edu" | "env" | "traffic"
type W     = "who" | "what" | "where" | "when"

// ── Data ─────────────────────────────────────────────────────────────────────

const THEMES: Record<Theme, { label: string; icon: string; color: string; bg: string; border: string }> = {
  health:  { label: "Healthcare",  icon: "🏥", color: "#EF4444", bg: "#FEF2F2", border: "#FCA5A5" },
  edu:     { label: "Education",   icon: "📚", color: "#7C3AED", bg: "#F5F3FF", border: "#C4B5FD" },
  env:     { label: "Environment", icon: "🌱", color: "#059669", bg: "#ECFDF5", border: "#6EE7B7" },
  traffic: { label: "Transport",   icon: "🚌", color: "#2563EB", bg: "#EFF6FF", border: "#93C5FD" },
}

const HINTS: Record<Theme, Record<W, string>> = {
  health: {
    who:   "Patients in rural areas without hospital access",
    what:  "Late disease diagnosis due to lack of doctors nearby",
    where: "Districts with fewer than 1 doctor per 10,000 people",
    when:  "During monsoon season when travel is most difficult",
  },
  edu: {
    who:   "School students aged 10–16 in government schools",
    what:  "No personalised learning support for different learning paces",
    where: "Classrooms with 40+ students and limited teacher time",
    when:  "Year-round, but worsening during high-stakes exam months",
  },
  env: {
    who:   "Residents of industrial and metro city areas",
    what:  "Air quality spikes with zero advance warning for residents",
    where: "Cities near factories, highways, and construction zones",
    when:  "Winter months when cold air traps pollution near ground level",
  },
  traffic: {
    who:   "Daily commuters and delivery workers in metro cities",
    what:  "Hours lost daily to unpredictable traffic congestion",
    where: "Major intersections and highway on-ramps at peak times",
    when:  "Every weekday during 8–10 am and 5–8 pm rush hours",
  },
}

const WS: { key: W; label: string; question: string; color: string; bg: string }[] = [
  { key: "who",   label: "WHO",   question: "Who is affected by this problem?",   color: "#7C3AED", bg: "#F5F3FF" },
  { key: "what",  label: "WHAT",  question: "What exactly is the problem?",        color: "#F97316", bg: "#FFF7ED" },
  { key: "where", label: "WHERE", question: "Where does this problem occur?",      color: "#2563EB", bg: "#EFF6FF" },
  { key: "when",  label: "WHEN",  question: "When and how often does it happen?",  color: "#059669", bg: "#ECFDF5" },
]

function buildStatement(theme: Theme, a: Record<W, string>): string {
  const who   = a.who.trim()   || "Affected communities"
  const what  = a.what.trim()  || "face a critical challenge"
  const where = a.where.trim() || "in their region"
  const when  = a.when.trim()  || "on a recurring basis"
  const t = THEMES[theme]
  return (
    `In the domain of ${t.label.toLowerCase()}, ${who} face a problem: ${what.charAt(0).toLowerCase()}${what.slice(1)}. ` +
    `This happens ${where.charAt(0).toLowerCase()}${where.slice(1)}, specifically ${when.charAt(0).toLowerCase()}${when.slice(1)}. ` +
    `An AI solution could help by detecting patterns early, predicting needs, and triggering the right automated response at scale.`
  )
}

// ── TypedText ─────────────────────────────────────────────────────────────────

function TypedText({ text, color }: { text: string; color: string }) {
  const [shown, setShown] = useState("")
  const [done,  setDone]  = useState(false)

  useEffect(() => {
    setShown("")
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, 16)
    return () => clearInterval(id)
  }, [text])

  return (
    <p className="text-sm leading-relaxed font-medium" style={{ color }}>
      {shown}
      {!done && <span className="animate-pulse opacity-70">|</span>}
    </p>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Canvas4Ws() {
  const [theme,     setTheme]     = useState<Theme>("health")
  const [answers,   setAnswers]   = useState<Record<W, string>>({ who: "", what: "", where: "", when: "" })
  const [generated, setGenerated] = useState(false)
  const [statement, setStatement] = useState("")
  const [copied,    setCopied]    = useState(false)

  const allFilled = WS.every(w => answers[w.key].trim().length > 4)
  const filledCount = WS.filter(w => answers[w.key].trim().length > 4).length
  const t = THEMES[theme]

  function changeTheme(next: Theme) {
    setTheme(next)
    setAnswers({ who: "", what: "", where: "", when: "" })
    setGenerated(false)
    setStatement("")
  }

  function handleGenerate() {
    const s = buildStatement(theme, answers)
    setStatement(s)
    setGenerated(true)
  }

  function handleReset() {
    setAnswers({ who: "", what: "", where: "", when: "" })
    setGenerated(false)
    setStatement("")
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(statement).catch(() => null)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="rounded-3xl border-2 border-violet-100 bg-white overflow-hidden shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 bg-violet-50 border-b border-violet-100">
        <div>
          <p className="font-sora font-bold text-sm text-violet-800">4Ws Problem Canvas</p>
          <p className="text-xs text-violet-500 mt-0.5">
            Fill all four quadrants to generate your AI problem statement
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex gap-0.5">
            {WS.map(w => (
              <div
                key={w.key}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: answers[w.key].trim().length > 4 ? w.color : "#E5E7EB",
                  transform: answers[w.key].trim().length > 4 ? "scale(1.25)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-600">
            CBSE Activity · {filledCount}/4
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* ── Theme selector ── */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
            Choose a project theme
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, th]) => (
              <button
                key={key}
                onClick={() => changeTheme(key)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                style={
                  theme === key
                    ? { borderColor: th.color, background: th.bg, color: th.color }
                    : { borderColor: "#E5E7EB", background: "#F9FAFB", color: "#6B7280" }
                }
              >
                <span className="text-base leading-none">{th.icon}</span>
                <span className="text-[11px] font-bold leading-tight">{th.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 4Ws grid ── */}
        <div className="grid sm:grid-cols-2 gap-3">
          {WS.map(w => {
            const filled = answers[w.key].trim().length > 4
            return (
              <motion.div
                key={w.key}
                className="rounded-2xl border-2 p-4 transition-colors"
                animate={{
                  borderColor: filled ? w.color + "55" : "#E5E7EB",
                  backgroundColor: filled ? w.bg : "#FAFAFA",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: w.color }}
                  >
                    {w.label}
                  </span>
                  <AnimatePresence>
                    {filled && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      >
                        <CheckCircle2 size={14} style={{ color: w.color }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-[11px] text-gray-500 mb-2.5 leading-snug font-medium">
                  {w.question}
                </p>

                <textarea
                  value={answers[w.key]}
                  onChange={e => {
                    setAnswers(prev => ({ ...prev, [w.key]: e.target.value }))
                    setGenerated(false)
                  }}
                  placeholder={HINTS[theme][w.key]}
                  rows={3}
                  className="w-full text-xs text-gray-800 bg-transparent placeholder:text-gray-300 resize-none outline-none leading-relaxed"
                />
              </motion.div>
            )
          })}
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            onClick={handleGenerate}
            disabled={!allFilled}
            whileTap={allFilled ? { scale: 0.97 } : undefined}
            animate={allFilled && !generated ? { scale: [1, 1.025, 1] } : { scale: 1 }}
            transition={allFilled && !generated ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            style={allFilled ? { background: t.color, color: "#fff" } : { background: "#F3F4F6", color: "#9CA3AF" }}
          >
            <Sparkles size={14} />
            Generate Problem Statement
          </motion.button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <RotateCcw size={12} />
            Reset
          </button>

          {!allFilled && (
            <p className="text-xs text-gray-400 italic">
              {4 - filledCount} quadrant{4 - filledCount !== 1 ? "s" : ""} left to fill
            </p>
          )}
        </div>

        {/* ── Generated statement ── */}
        <AnimatePresence>
          {generated && statement && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-2xl border-2 p-5"
              style={{ borderColor: t.color + "44", background: t.bg }}
            >
              {/* statement header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{t.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: t.color }}>
                      Your AI Problem Statement
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{t.label} · CBSE AI Project Cycle</p>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-1.5 text-[10px] px-2.5 py-1.5 rounded-lg border font-semibold transition-all"
                  style={
                    copied
                      ? { borderColor: "#10B981", color: "#10B981", background: "#ECFDF5" }
                      : { borderColor: t.color + "55", color: t.color }
                  }
                >
                  {copied ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                </button>
              </div>

              {/* typed text */}
              <TypedText text={statement} color={t.color} />

              {/* next steps */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: t.color + "33" }}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Next steps in the AI Project Cycle
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Identify stakeholders", "Map data requirements", "Ethical considerations", "Data Acquisition"].map(step => (
                    <span
                      key={step}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: t.color + "20", color: t.color }}
                    >
                      → {step}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
