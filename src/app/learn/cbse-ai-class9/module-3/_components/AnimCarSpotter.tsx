"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, CheckCircle2, BarChart2, ChevronRight } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type CarColor = "red" | "blue" | "white" | "black" | "silver" | "yellow"
type Phase = "intro" | "spotting" | "tabulation" | "analysis"

// ── Config ────────────────────────────────────────────────────────────────────

const COLOR_META: Record<CarColor, { label: string; fill: string; stroke: string; text: string }> = {
  red:    { label: "Red",    fill: "#EF4444", stroke: "#B91C1C", text: "text-red-600"    },
  blue:   { label: "Blue",   fill: "#3B82F6", stroke: "#1D4ED8", text: "text-blue-600"   },
  white:  { label: "White",  fill: "#F3F4F6", stroke: "#9CA3AF", text: "text-gray-500"   },
  black:  { label: "Black",  fill: "#1F2937", stroke: "#111827", text: "text-gray-800"   },
  silver: { label: "Silver", fill: "#9CA3AF", stroke: "#6B7280", text: "text-gray-600"   },
  yellow: { label: "Yellow", fill: "#FCD34D", stroke: "#D97706", text: "text-yellow-600" },
}

// Fixed sequence of 20 cars  reproducible, balanced
const CAR_SEQUENCE: CarColor[] = [
  "red","blue","white","black","silver","red","blue","yellow",
  "white","red","silver","black","blue","red","yellow","white",
  "blue","silver","black","red",
]

const TOTAL = CAR_SEQUENCE.length

// ── Car SVG ───────────────────────────────────────────────────────────────────

function CarSVG({ color, dir = 1 }: { color: CarColor; dir?: number }) {
  const { fill, stroke } = COLOR_META[color]
  const flip = dir === -1 ? "scale(-1,1)" : undefined
  return (
    <svg viewBox="0 0 80 40" width={100} height={50} style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      {/* body */}
      <rect x="4" y="16" width="72" height="18" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {/* roof */}
      <path d="M18 16 L22 6 L58 6 L62 16 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {/* windows */}
      <rect x="23" y="7" width="14" height="8" rx="1.5" fill="#BAE6FD" opacity="0.8" />
      <rect x="39" y="7" width="14" height="8" rx="1.5" fill="#BAE6FD" opacity="0.8" />
      {/* wheels */}
      <circle cx="18" cy="34" r="6" fill="#1F2937" stroke="#374151" strokeWidth="1" />
      <circle cx="18" cy="34" r="3" fill="#6B7280" />
      <circle cx="62" cy="34" r="6" fill="#1F2937" stroke="#374151" strokeWidth="1" />
      <circle cx="62" cy="34" r="3" fill="#6B7280" />
      {/* headlights */}
      <rect x="74" y="21" width="4" height="5" rx="1" fill="#FEF9C3" />
      <rect x="74" y="27" width="4" height="5" rx="1" fill="#FEF9C3" />
    </svg>
  )
}

// ── Stats helpers ─────────────────────────────────────────────────────────────

function calcStats(tally: Record<CarColor, number>) {
  const colors = Object.keys(tally) as CarColor[]
  const values = colors.map(c => tally[c])
  const total  = values.reduce((s, v) => s + v, 0)
  const mode   = colors.reduce((a, b) => tally[a] >= tally[b] ? a : b)
  const sorted = [...values].sort((a, b) => a - b)
  const mid    = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
  const mean   = (total / values.length).toFixed(1)
  const range  = Math.max(...values) - Math.min(...values)
  return { total, mode, median, mean, range, sorted }
}

// ── Analysis questions ────────────────────────────────────────────────────────

interface Question {
  q:       string
  options: string[]
  correct: number
  explain: string
  getAnswer: (tally: Record<CarColor, number>) => number
}

const QUESTIONS: Question[] = [
  {
    q: "Which car colour appeared MOST often? (The Mode)",
    options: [], correct: 0,
    explain: "The MODE is the value that appears most frequently in a dataset. In data science, mode helps AI systems identify the most common category.",
    getAnswer: (t) => {
      const mode = (Object.keys(t) as CarColor[]).reduce((a, b) => t[a] >= t[b] ? a : b)
      return Object.keys(t).indexOf(mode)
    },
  },
  {
    q: "What is the RANGE of car colour frequencies?",
    options: [], correct: 0,
    explain: "Range = Maximum frequency − Minimum frequency. Range tells us how spread out the data is.",
    getAnswer: (t) => {
      const vals = Object.values(t)
      return Math.max(...vals) - Math.min(...vals)
    },
  },
  {
    q: "What was the TOTAL number of cars recorded?",
    options: [], correct: 0,
    explain: `We recorded all ${TOTAL} cars. The total is the sum of all frequencies in the tally.`,
    getAnswer: () => TOTAL,
  },
]

// ── Tally bar ─────────────────────────────────────────────────────────────────

function TallyBar({ color, count, max }: { color: CarColor; count: number; max: number }) {
  const { label, fill, text } = COLOR_META[color]
  return (
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-bold w-12 shrink-0 ${text}`}>{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: fill }}
          initial={{ width: 0 }}
          animate={{ width: max > 0 ? `${(count / max) * 100}%` : "0%" }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
        />
      </div>
      <motion.span
        key={count}
        initial={{ scale: 1.4 }} animate={{ scale: 1 }}
        className="text-xs font-bold font-sora w-5 text-right shrink-0 text-gray-700"
      >
        {count}
      </motion.span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimCarSpotter() {
  const [phase,   setPhase]   = useState<Phase>("intro")
  const [carIdx,  setCarIdx]  = useState(0)
  const [tally,   setTally]   = useState<Record<CarColor, number>>({ red:0, blue:0, white:0, black:0, silver:0, yellow:0 })
  const [visible, setVisible] = useState(true)
  const [flash,   setFlash]   = useState<CarColor | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [qIdx,    setQIdx]    = useState(0)

  const currentCar = CAR_SEQUENCE[carIdx]
  const maxTally   = Math.max(...Object.values(tally))
  const stats      = calcStats(tally)
  const isDone     = carIdx >= TOTAL

  // Build dynamic question options
  const buildQuestions = useCallback(() => {
    const colors = Object.keys(tally) as CarColor[]
    const mode   = colors.reduce((a, b) => tally[a] >= tally[b] ? a : b)
    const vals   = Object.values(tally)
    const rng    = Math.max(...vals) - Math.min(...vals)
    return [
      {
        ...QUESTIONS[0],
        options: colors.map(c => COLOR_META[c].label),
        correct: colors.indexOf(mode),
      },
      {
        ...QUESTIONS[1],
        options: [String(rng - 1), String(rng), String(rng + 1), String(rng + 2)],
        correct: 1,
      },
      {
        ...QUESTIONS[2],
        options: [String(TOTAL - 3), String(TOTAL - 1), String(TOTAL), String(TOTAL + 2)],
        correct: 2,
      },
    ]
  }, [tally])

  const record = (color: CarColor) => {
    if (color !== currentCar || !visible || isDone) return
    setTally(t => ({ ...t, [color]: t[color] + 1 }))
    setFlash(color)
    setVisible(false)
    setTimeout(() => setFlash(null), 400)
    if (carIdx + 1 >= TOTAL) {
      setTimeout(() => setPhase("tabulation"), 600)
    } else {
      setTimeout(() => { setCarIdx(i => i + 1); setVisible(true) }, 800)
    }
  }

  const reset = () => {
    setPhase("intro")
    setCarIdx(0)
    setTally({ red:0, blue:0, white:0, black:0, silver:0, yellow:0 })
    setVisible(true)
    setFlash(null)
    setAnswers({})
    setQIdx(0)
  }

  const qs = phase === "analysis" ? buildQuestions() : []
  const currentQ = qs[qIdx]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100">

      {/* ── Scene / canvas ─────────────────────────────────────────────────── */}
      <div className="relative bg-[#0A0F1C] flex flex-col overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden>
          <defs><pattern id="cs-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#cs-dots)" />
        </svg>

        {/* ── INTRO ── */}
        {phase === "intro" && (
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-5 p-8 text-center">
            <div className="text-5xl">🚗</div>
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">CBSE Activity</p>
              <h3 className="font-sora font-bold text-white text-lg mb-2">Car Spotting &amp; Tabulating</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-72">
                {TOTAL} cars will drive past. Click the matching colour button for each car. We&apos;ll build a live tally, then calculate mean, median, mode, and range from <em>your</em> data.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {(Object.keys(COLOR_META) as CarColor[]).map(c => (
                <div key={c} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: COLOR_META[c].fill }} />
                  <span className="text-[10px] text-slate-300 font-medium">{COLOR_META[c].label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setPhase("spotting")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all"
            >
              <ChevronRight size={16} /> Start Spotting
            </button>
          </div>
        )}

        {/* ── SPOTTING ── */}
        {phase === "spotting" && (
          <div className="relative z-10 flex flex-col flex-1">
            {/* Road */}
            <div className="relative flex-1 flex items-center overflow-hidden" style={{ minHeight: 180 }}>
              {/* Sky gradient */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1E293B 0%, #0F172A 60%, #1C2A3A 100%)" }} />

              {/* Road surface */}
              <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "#374151" }}>
                {/* Lane markings */}
                <div className="absolute top-1/2 left-0 right-0 flex gap-6 px-4 -translate-y-1/2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 h-1.5 bg-yellow-400 rounded-full opacity-60" />
                  ))}
                </div>
                {/* Kerb lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
              </div>

              {/* Car + counter */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {visible && !isDone && (
                    <motion.div
                      key={carIdx}
                      initial={{ x: 320, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -320, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 28 }}
                      className="relative z-10"
                      style={{ marginBottom: 24 }}
                    >
                      <CarSVG color={currentCar} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress */}
              <div className="absolute top-3 right-4 text-[10px] font-bold text-slate-500">
                Car {Math.min(carIdx + 1, TOTAL)} / {TOTAL}
              </div>
              <div className="absolute top-3 left-4">
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden" style={{ width: 120 }}>
                  <motion.div className="h-full bg-orange-500 rounded-full"
                    animate={{ width: `${(carIdx / TOTAL) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Colour buttons */}
            <div className="relative z-10 grid grid-cols-3 gap-2 p-4 border-t border-white/5">
              {(Object.keys(COLOR_META) as CarColor[]).map(c => {
                const { label, fill, stroke } = COLOR_META[c]
                const isFlash = flash === c
                return (
                  <motion.button key={c}
                    onClick={() => record(c)}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}
                    animate={isFlash ? { scale: [1, 1.15, 1], background: fill } : {}}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 font-bold text-xs transition-all"
                    style={{
                      borderColor: stroke,
                      background:  isFlash ? fill + "40" : fill + "18",
                      color:       c === "white" || c === "yellow" ? "#374151" : "#F9FAFB",
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 shrink-0"
                      style={{ background: fill, borderColor: stroke }} />
                    {label}
                    <span className="ml-auto font-sora text-sm" style={{ color: fill }}>{tally[c]}</span>
                  </motion.button>
                )
              })}
            </div>

            <p className="relative z-10 text-[10px] text-slate-600 text-center pb-3 italic">
              Click the colour of the car when it appears
            </p>
          </div>
        )}

        {/* ── TABULATION ── */}
        {phase === "tabulation" && (
          <div className="relative z-10 flex flex-col flex-1 p-5 gap-4">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Phase 2  Tabulation</p>
              <h3 className="font-sora font-bold text-white text-base">Your Frequency Table</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Here&apos;s the data you collected from {TOTAL} cars:</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-900/60">
                    <th className="px-3 py-2 text-left font-bold text-slate-400 border-b border-slate-700">Colour</th>
                    <th className="px-3 py-2 text-center font-bold text-slate-400 border-b border-slate-700">Tally</th>
                    <th className="px-3 py-2 text-center font-bold text-slate-400 border-b border-slate-700">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(tally) as CarColor[]).map(c => (
                    <tr key={c} className="border-b border-slate-700/50">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: COLOR_META[c].fill }} />
                          <span className="text-slate-200">{COLOR_META[c].label}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400 font-mono tracking-wider">
                        {"| ".repeat(Math.floor(tally[c] / 5))}
                        {"|".repeat(tally[c] % 5)}
                      </td>
                      <td className="px-3 py-2 text-center font-bold font-sora" style={{ color: COLOR_META[c].fill }}>
                        {tally[c]}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40">
                    <td className="px-3 py-2 font-bold text-white">Total</td>
                    <td />
                    <td className="px-3 py-2 text-center font-bold text-orange-400 font-sora">{TOTAL}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={() => setPhase("analysis")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all mt-auto"
            >
              <BarChart2 size={15} /> Analyse the Data →
            </button>
          </div>
        )}

        {/* ── ANALYSIS ── */}
        {phase === "analysis" && (
          <div className="relative z-10 flex flex-col flex-1 p-5 gap-3 overflow-y-auto">
            <div>
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-1">Phase 3  Analysis</p>
              <h3 className="font-sora font-bold text-white text-base">Statistics from Your Data</h3>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Mean",   val: stats.mean,   color: "#22D3EE", desc: "Average frequency" },
                { label: "Mode",   val: COLOR_META[stats.mode].label, color: "#F97316", desc: "Most common colour" },
                { label: "Range",  val: stats.range,  color: "#EF4444", desc: "Max − Min frequency" },
                { label: "Total",  val: stats.total,  color: "#10B981", desc: "All cars counted" },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-slate-800/60 border border-slate-700 p-3 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: s.color }}>{s.label}</p>
                  <p className="text-lg font-bold font-sora" style={{ color: s.color }}>{String(s.val)}</p>
                  <p className="text-[9px] text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Questions */}
            {currentQ && qIdx < 3 && (
              <div className="rounded-xl bg-violet-900/30 border border-violet-700/50 p-3">
                <p className="text-[10px] font-bold text-violet-300 mb-1">Question {qIdx + 1} / 3</p>
                <p className="text-xs text-white font-semibold mb-2 leading-snug">{currentQ.q}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {currentQ.options.map((opt, i) => {
                    const answered = answers[qIdx] !== undefined
                    const isChosen = answers[qIdx] === i
                    const isRight  = i === currentQ.correct
                    let bg = "bg-slate-700/60 border-slate-600"
                    if (answered && isRight) bg = "bg-emerald-900/60 border-emerald-600"
                    else if (answered && isChosen) bg = "bg-red-900/60 border-red-600"
                    return (
                      <button key={i}
                        onClick={() => {
                          if (answers[qIdx] !== undefined) return
                          setAnswers(a => ({ ...a, [qIdx]: i }))
                        }}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium text-left transition-all ${bg}`}
                        style={{ color: answered && isRight ? "#6EE7B7" : answered && isChosen ? "#FCA5A5" : "#CBD5E1" }}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {answers[qIdx] !== undefined && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-2 rounded-lg bg-slate-800/60 text-[10px] text-slate-300 leading-snug"
                  >
                    {currentQ.explain}
                    {qIdx < 2 && (
                      <button onClick={() => setQIdx(q => q + 1)}
                        className="ml-2 text-orange-400 font-bold hover:text-orange-300"
                      >
                        Next →
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {qIdx >= 3 && (
              <div className="rounded-xl bg-emerald-900/30 border border-emerald-700/50 p-3 text-center">
                <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-1" />
                <p className="text-xs font-bold text-emerald-300">Activity Complete!</p>
                <p className="text-[10px] text-emerald-600 mt-0.5">You collected and analysed real data  exactly what AI engineers do.</p>
              </div>
            )}
          </div>
        )}

        {/* Reset */}
        {phase !== "intro" && (
          <button onClick={reset}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1 text-[9px] text-slate-600 hover:text-slate-400 transition-colors"
          >
            <RotateCcw size={10} /> restart
          </button>
        )}
      </div>

      {/* ── Live tally panel ────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3">
        <div>
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-0.5">Live Tally</p>
          <p className="text-xs text-gray-500">Frequencies update as you spot</p>
        </div>

        <div className="space-y-2.5 flex-1">
          {(Object.keys(tally) as CarColor[]).map(c => (
            <TallyBar key={c} color={c} count={tally[c]} max={maxTally || 1} />
          ))}
        </div>

        {/* Phase progress indicator */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex gap-1">
            {(["intro","spotting","tabulation","analysis"] as Phase[]).map((p, i) => (
              <div key={p} className="flex-1 h-1.5 rounded-full"
                style={{
                  background: ["intro","spotting","tabulation","analysis"].indexOf(phase) >= i
                    ? "#F97316" : "#E5E7EB"
                }}
              />
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-1 text-center capitalize">{phase}</p>
        </div>

        {/* Stats preview (shown from tabulation onwards) */}
        {(phase === "tabulation" || phase === "analysis") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl bg-violet-50 border border-violet-100 p-3 space-y-1"
          >
            <p className="text-[10px] font-bold text-violet-700 mb-1.5">Your Statistics</p>
            {[
              { l: "Mean",  v: stats.mean  },
              { l: "Mode",  v: COLOR_META[stats.mode].label },
              { l: "Range", v: stats.range },
            ].map(({ l, v }) => (
              <div key={l} className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-violet-600">{l}</p>
                <p className="text-[10px] font-bold text-violet-800">{String(v)}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
