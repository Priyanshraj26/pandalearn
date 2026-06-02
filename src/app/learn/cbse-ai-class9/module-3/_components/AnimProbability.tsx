"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, SkipForward, RefreshCw, Zap, Brain } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Experiment = "coin" | "dice" | "spinner"
type EventType  = "certain" | "impossible" | "equally_likely" | "complementary"

interface ExperimentMeta {
  label:     string
  color:     string
  outcomes:  string[]
  outcomeLabels: string[]
  theoretical: number[]
  emoji:     string
  formula:   string
  context:   string
}

// ── Experiment definitions ────────────────────────────────────────────────────

const EXPERIMENTS: Record<Experiment, ExperimentMeta> = {
  coin: {
    label:    "Coin Flip",
    color:    "#F59E0B",
    outcomes: ["H", "T"],
    outcomeLabels: ["Heads", "Tails"],
    theoretical: [0.5, 0.5],
    emoji:    "🪙",
    formula:  "P(Heads) = 1/2 = 0.5",
    context:  "Cricket toss! The coin is unbiased  each outcome is equally likely.",
  },
  dice: {
    label:    "Dice Roll",
    color:    "#EF4444",
    outcomes: ["1", "2", "3", "4", "5", "6"],
    outcomeLabels: ["One", "Two", "Three", "Four", "Five", "Six"],
    theoretical: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6],
    emoji:    "🎲",
    formula:  "P(any face) = 1/6 ≈ 0.167",
    context:  "A fair 6-sided die  each face has equal probability of landing up.",
  },
  spinner: {
    label:    "Spinner",
    color:    "#8B5CF6",
    outcomes: ["Red", "Blue", "Green"],
    outcomeLabels: ["Red (½)", "Blue (¼)", "Green (¼)"],
    theoretical: [0.5, 0.25, 0.25],
    emoji:    "🎡",
    formula:  "P(Red)=½, P(Blue)=¼, P(Green)=¼",
    context:  "An unequal spinner  Red takes half the circle, Blue and Green each take a quarter.",
  },
}

const OUTCOME_COLORS: Record<string, string> = {
  H: "#F59E0B", T: "#78716C",
  "1": "#EF4444", "2": "#F97316", "3": "#F59E0B", "4": "#10B981", "5": "#22D3EE", "6": "#8B5CF6",
  Red: "#EF4444", Blue: "#3B82F6", Green: "#10B981",
}

const EVENT_TYPES: { key: EventType; label: string; color: string; desc: string; example: string }[] = [
  {
    key: "certain", label: "Certain Event", color: "#10B981",
    desc: "Will definitely happen. Probability = 1",
    example: "P(Sun rising tomorrow) = 1",
  },
  {
    key: "impossible", label: "Impossible Event", color: "#EF4444",
    desc: "Cannot happen. Probability = 0",
    example: "P(Rolling 7 on a 6-sided die) = 0",
  },
  {
    key: "equally_likely", label: "Equally Likely", color: "#3B82F6",
    desc: "All outcomes have the same probability",
    example: "P(Heads) = P(Tails) = ½",
  },
  {
    key: "complementary", label: "Complementary", color: "#8B5CF6",
    desc: "Two events where one MUST happen. P(A) + P(A') = 1",
    example: "P(Rain) + P(No Rain) = 1",
  },
]

// ── Pseudo-random using index ─────────────────────────────────────────────────

function seededRoll(exp: Experiment, salt: number): number {
  const meta = EXPERIMENTS[exp]
  // Use a deterministic but varied sequence from index
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
  const p = primes[salt % primes.length]
  const hash = ((salt * p + 17) * 31 + salt * 7) % 1000
  const r = hash / 1000

  let cumulative = 0
  for (let i = 0; i < meta.theoretical.length; i++) {
    cumulative += meta.theoretical[i]
    if (r < cumulative) return i
  }
  return meta.theoretical.length - 1
}

// ── Coin animation ────────────────────────────────────────────────────────────

function CoinFlipAnim({ result, flipping }: { result: string | null; flipping: boolean }) {
  return (
    <div className="flex items-center justify-center w-20 h-20 mx-auto">
      <motion.div
        className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-sora font-bold text-lg"
        animate={flipping
          ? { rotateY: [0, 180, 360, 540, 720], scale: [1, 1.1, 1] }
          : { rotateY: 0 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          borderColor: "#F59E0B",
          background:  result === "H" ? "#F59E0B20" : result === "T" ? "#78716C20" : "#0D1829",
          color:        result === "H" ? "#F59E0B"   : result === "T" ? "#A8A29E"   : "#475569",
        }}
      >
        {flipping ? "?" : result ?? ""}
      </motion.div>
    </div>
  )
}

function DiceAnim({ result, rolling }: { result: string | null; rolling: boolean }) {
  const dotPositions: Record<string, [number, number][]> = {
    "1": [[50, 50]],
    "2": [[25, 25], [75, 75]],
    "3": [[25, 25], [50, 50], [75, 75]],
    "4": [[25, 25], [75, 25], [25, 75], [75, 75]],
    "5": [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    "6": [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
  }
  const dots = result ? dotPositions[result] || [] : []
  const color = result ? OUTCOME_COLORS[result] : "#475569"

  return (
    <div className="flex items-center justify-center w-20 h-20 mx-auto">
      <motion.div
        className="w-16 h-16 rounded-xl border-2 flex items-center justify-center relative"
        animate={rolling ? { rotate: [0, 45, -30, 20, 0], scale: [1, 1.15, 0.95, 1] } : { rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ borderColor: color + "60", background: color + "10" }}
      >
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          {dots.map(([cx, cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r={8} fill={color}
              initial={{ scale: 0 }} animate={{ scale: rolling ? 0 : 1 }}
              transition={{ delay: rolling ? 0 : 0.2 + i * 0.05 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}

function SpinnerAnim({ result, spinning }: { result: string | null; spinning: boolean }) {
  const sectors = [
    { label: "Red",   color: "#EF4444", startAngle: 0,   endAngle: 180 },
    { label: "Blue",  color: "#3B82F6", startAngle: 180, endAngle: 270 },
    { label: "Green", color: "#10B981", startAngle: 270, endAngle: 360 },
  ]
  const cx = 50, cy = 50, r = 45
  const needleAngle = result === "Red" ? 90 : result === "Blue" ? 225 : result === "Green" ? 315 : 0

  return (
    <div className="flex items-center justify-center w-24 h-24 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {sectors.map(s => {
          const sa = s.startAngle * Math.PI / 180
          const ea = s.endAngle   * Math.PI / 180
          const x1 = cx + r * Math.cos(sa), y1 = cy + r * Math.sin(sa)
          const x2 = cx + r * Math.cos(ea), y2 = cy + r * Math.sin(ea)
          const large = (s.endAngle - s.startAngle) > 180 ? 1 : 0
          return (
            <path key={s.label}
              d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
              fill={s.color} fillOpacity={0.8} stroke="#060A12" strokeWidth={0.8}
            />
          )
        })}
        {/* Needle */}
        <motion.line
          x1={cx} y1={cy} x2={cx} y2={cy - r + 8}
          stroke="white" strokeWidth={2.5} strokeLinecap="round"
          animate={{
            x2: cx + (r - 8) * Math.cos((needleAngle - 90) * Math.PI / 180),
            y2: cy + (r - 8) * Math.sin((needleAngle - 90) * Math.PI / 180),
            rotate: spinning ? [0, 360 * 3] : 0,
          }}
          transition={{ duration: spinning ? 0.6 : 0.4, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <circle cx={cx} cy={cy} r={4} fill="white" />
      </svg>
    </div>
  )
}

// ── Probability bar chart ─────────────────────────────────────────────────────

function ProbabilityBars({ meta, counts, total }: {
  meta: ExperimentMeta; counts: number[]; total: number
}) {
  return (
    <div className="space-y-2">
      {meta.outcomes.map((outcome, i) => {
        const theoretical = meta.theoretical[i]
        const empirical   = total > 0 ? counts[i] / total : 0
        const color       = OUTCOME_COLORS[outcome] || meta.color

        return (
          <div key={outcome}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-bold" style={{ color }}>
                {meta.outcomeLabels[i]}
              </span>
              <div className="flex gap-2 text-[9px]">
                <span className="text-slate-400">Theory: {(theoretical * 100).toFixed(0)}%</span>
                <span className="font-bold" style={{ color }}>
                  Actual: {total > 0 ? (empirical * 100).toFixed(1) : ""}%
                </span>
              </div>
            </div>

            {/* Empirical bar */}
            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                animate={{ width: `${empirical * 100}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              />
              {/* Theoretical marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/60"
                style={{ left: `${theoretical * 100}%` }}
                title={`Theoretical: ${(theoretical * 100).toFixed(0)}%`}
              />
            </div>
            <div className="flex justify-between text-[8px] text-slate-600 mt-0.5">
              <span>{counts[i]} times</span>
              <span className="text-white/20">|← theory</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimProbability() {
  const [exp, setExp]           = useState<Experiment>("coin")
  const [counts, setCounts]     = useState<number[]>([0, 0])
  const [total, setTotal]       = useState(0)
  const [lastResult, setResult] = useState<string | null>(null)
  const [animating, setAnim]    = useState(false)
  const [activeEvent, setEvent] = useState<EventType | null>(null)
  const rollCountRef            = useRef(0)

  const meta = EXPERIMENTS[exp]

  const switchExp = (e: Experiment) => {
    setExp(e)
    setCounts(new Array(EXPERIMENTS[e].outcomes.length).fill(0))
    setTotal(0)
    setResult(null)
    setAnim(false)
    rollCountRef.current = 0
  }

  const rollOnce = useCallback(() => {
    if (animating) return
    setAnim(true)
    const salt = rollCountRef.current++
    setTimeout(() => {
      const idx = seededRoll(exp, salt)
      setResult(meta.outcomes[idx])
      setCounts(prev => {
        const next = [...prev]
        next[idx] = (next[idx] || 0) + 1
        return next
      })
      setTotal(t => t + 1)
      setAnim(false)
    }, 600)
  }, [animating, exp, meta.outcomes])

  const rollMany = useCallback((n: number) => {
    if (animating) return
    const newCounts = [...counts]
    for (let i = 0; i < n; i++) {
      const salt = rollCountRef.current++
      const idx = seededRoll(exp, salt)
      newCounts[idx] = (newCounts[idx] || 0) + 1
    }
    setResult(meta.outcomes[newCounts.indexOf(Math.max(...newCounts))])
    setCounts(newCounts)
    setTotal(t => t + n)
  }, [animating, counts, exp, meta.outcomes])

  const reset = () => {
    setCounts(new Array(meta.outcomes.length).fill(0))
    setTotal(0)
    setResult(null)
    setAnim(false)
    rollCountRef.current = 0
  }

  const convergence = total >= 50
    ? "Converging to theory!"
    : total >= 20
    ? "Getting closer…"
    : total > 0
    ? "Need more trials to see the pattern"
    : ""

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Experiment canvas ───────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden min-h-80">

        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="pb-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#pb-dots)" />
        </svg>

        {/* Experiment selector */}
        <div className="relative z-10 flex gap-2 p-3 border-b border-white/5">
          {(["coin", "dice", "spinner"] as Experiment[]).map(e => {
            const m = EXPERIMENTS[e]
            return (
              <button key={e}
                onClick={() => switchExp(e)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                style={exp === e
                  ? { background: m.color + "25", color: m.color, border: `1px solid ${m.color}40` }
                  : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
                }
              >
                <span>{m.emoji}</span> {m.label}
              </button>
            )
          })}
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 p-5">

          {/* Animated experiment */}
          <AnimatePresence mode="wait">
            <motion.div key={exp} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {exp === "coin"    && <CoinFlipAnim   result={lastResult} flipping={animating} />}
              {exp === "dice"    && <DiceAnim        result={lastResult} rolling={animating}  />}
              {exp === "spinner" && <SpinnerAnim     result={lastResult} spinning={animating} />}
            </motion.div>
          </AnimatePresence>

          {/* Result display */}
          <AnimatePresence>
            {lastResult && !animating && (
              <motion.div key={lastResult + total}
                initial={{ opacity: 0, y: -8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                className="text-center"
              >
                <span className="text-base font-bold font-sora px-4 py-1.5 rounded-full"
                  style={{ background: (OUTCOME_COLORS[lastResult] || meta.color) + "20", color: OUTCOME_COLORS[lastResult] || meta.color }}
                >
                  {lastResult === "H" ? "Heads" : lastResult === "T" ? "Tails" : lastResult}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Roll buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={rollOnce}
              disabled={animating}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50"
              style={{ background: meta.color }}
            >
              <Play size={13} /> Roll 1
            </motion.button>
            <button onClick={() => rollMany(10)} disabled={animating}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border disabled:opacity-50"
              style={{ borderColor: meta.color + "50", color: meta.color, background: meta.color + "10" }}
            >
              <SkipForward size={12} /> ×10
            </button>
            <button onClick={() => rollMany(100)} disabled={animating}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border disabled:opacity-50"
              style={{ borderColor: meta.color + "50", color: meta.color, background: meta.color + "10" }}
            >
              <Zap size={12} /> ×100
            </button>
            <button onClick={reset} disabled={animating}
              className="p-2 rounded-xl border border-slate-700 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <RefreshCw size={13} />
            </button>
          </div>

          {/* Total + convergence */}
          <div className="text-center">
            <p className="text-2xl font-bold font-sora" style={{ color: meta.color }}>{total}</p>
            <p className="text-[10px] text-slate-500">total trials</p>
            {convergence && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[10px] text-amber-400 mt-0.5"
              >
                {convergence}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col overflow-y-auto">

        {/* Tab: Results vs Event Types */}
        <div className="flex border-b border-gray-100">
          {[
            { key: null,         label: "Results" },
            { key: "certain" as EventType, label: "Event Types" },
          ].map(t => (
            <button key={String(t.key)}
              onClick={() => setEvent(t.key)}
              className="flex-1 py-2.5 text-xs font-bold transition-all relative"
              style={activeEvent === t.key ? { color: meta.color } : { color: "#94A3B8" }}
            >
              {t.label}
              {activeEvent === t.key && (
                <motion.div layoutId="prob-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: meta.color }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3">

          {activeEvent === null ? (
            <>
              {/* Formula */}
              <div className="rounded-xl px-3 py-2 border text-xs font-mono leading-snug"
                style={{ borderColor: meta.color + "40", background: meta.color + "08", color: meta.color }}
              >
                <p className="font-bold mb-0.5" style={{ fontFamily: "inherit", fontSize: 10 }}>Formula</p>
                {meta.formula}
              </div>

              {/* Probability bars */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Theoretical vs Empirical
                </p>
                <AnimatePresence mode="wait">
                  <motion.div key={exp} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ProbabilityBars meta={meta} counts={counts} total={total} />
                  </motion.div>
                </AnimatePresence>
                <p className="text-[9px] text-gray-400 mt-2 text-center italic">
                  White marker = theoretical · coloured bar = actual · try 100+ rolls
                </p>
              </div>

              {/* Context */}
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-2.5">
                <p className="text-[10px] text-amber-800 leading-snug">{meta.context}</p>
              </div>

              {/* AI connection */}
              <div className="rounded-xl bg-violet-50 border border-violet-100 p-2.5 flex items-start gap-2">
                <Brain size={12} className="text-violet-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-violet-700 leading-snug">
                  AI outputs probabilities as confidence scores. A medical AI saying "87% chance of tumour"
                  uses the same mathematics  P(tumour | X-ray features).
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Types of Events</p>
              <div className="space-y-2">
                {EVENT_TYPES.map(et => (
                  <motion.button key={et.key}
                    onClick={() => setEvent(et.key === activeEvent ? null : et.key)}
                    className="w-full rounded-xl border-2 p-3 text-left transition-all"
                    style={activeEvent === et.key
                      ? { borderColor: et.color, background: et.color + "10" }
                      : { borderColor: et.color + "40", background: "#F9FAFB" }
                    }
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold" style={{ color: et.color }}>{et.label}</p>
                      <span className="text-[10px] text-gray-400">click to expand</span>
                    </div>
                    <AnimatePresence>
                      {activeEvent === et.key && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
                        >
                          <p className="text-[10px] text-gray-600 mt-1.5 leading-snug">{et.desc}</p>
                          <p className="text-[10px] font-mono mt-1" style={{ color: et.color }}>{et.example}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-2.5 mt-auto">
                <p className="text-[10px] font-bold text-blue-700 mb-1">Law of Large Numbers</p>
                <p className="text-[10px] text-blue-700 leading-snug">
                  As the number of trials increases, empirical probability approaches theoretical probability.
                  This is why AI models need <strong>large datasets</strong>  more data = more reliable patterns.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
