"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, RefreshCw, Car, Trophy, Cloud, Stethoscope } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Context = "cars" | "scores" | "weather" | "health"

interface ContextMeta {
  label:      string
  unit:       string
  Icon:       React.ElementType
  color:      string
  description: string
  preset:     number[]
  aiUseCase:  string
}

// ── Data contexts ─────────────────────────────────────────────────────────────

const CONTEXTS: Record<Context, ContextMeta> = {
  cars: {
    label:       "Car Spotting",
    unit:        "cars/hr",
    Icon:        Car,
    color:       "#22D3EE",
    description: "CBSE Activity: Count cars passing a school gate each hour. What can the data tell us?",
    preset:      [12, 8, 15, 22, 18, 9, 14, 25, 11, 20],
    aiUseCase:   "Traffic AI uses statistics on vehicle counts to time traffic signals optimally.",
  },
  scores: {
    label:       "Exam Scores",
    unit:        "marks",
    Icon:        Trophy,
    color:       "#F97316",
    description: "Class IX Math test results. Use statistics to understand class performance.",
    preset:      [72, 85, 91, 68, 74, 88, 62, 95, 70, 83],
    aiUseCase:   "AI tutors use mean & distribution of scores to personalise content difficulty per student.",
  },
  weather: {
    label:       "Temperature",
    unit:        "°C",
    Icon:        Cloud,
    color:       "#8B5CF6",
    description: "Daily high temperatures (°C) for a city over 10 days. Spot the pattern.",
    preset:      [28, 31, 29, 34, 36, 33, 30, 27, 32, 35],
    aiUseCase:   "Weather forecasting AI uses statistical patterns in historical temperature data to predict future highs.",
  },
  health: {
    label:       "Heart Rate",
    unit:        "bpm",
    Icon:        Stethoscope,
    color:       "#EF4444",
    description: "Resting heart rate (bpm) of 10 patients before exercise. Used in health AI.",
    preset:      [68, 72, 65, 78, 80, 71, 69, 85, 74, 76],
    aiUseCase:   "Health AI uses mean and range of vital signs to flag abnormal readings for doctors.",
  },
}

// ── Statistics helpers ────────────────────────────────────────────────────────

function calcMean(data: number[]): number {
  if (data.length === 0) return 0
  return data.reduce((a, b) => a + b, 0) / data.length
}

function calcMedian(data: number[]): number {
  if (data.length === 0) return 0
  const sorted = [...data].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

function calcMode(data: number[]): number[] {
  if (data.length === 0) return []
  const freq: Record<number, number> = {}
  data.forEach(v => { freq[v] = (freq[v] || 0) + 1 })
  const maxFreq = Math.max(...Object.values(freq))
  if (maxFreq === 1) return []
  return Object.entries(freq)
    .filter(([, f]) => f === maxFreq)
    .map(([v]) => Number(v))
}

function calcRange(data: number[]): number {
  if (data.length < 2) return 0
  return Math.max(...data) - Math.min(...data)
}

// ── Bar Chart SVG ─────────────────────────────────────────────────────────────

function BarChart({ data, color, mean, median }: {
  data: number[]; color: string; mean: number; median: number
}) {
  if (data.length === 0) return (
    <div className="flex items-center justify-center h-full text-slate-600 text-xs">Add data to see chart</div>
  )
  const maxVal = Math.max(...data) * 1.15
  const W = 380, H = 180, padX = 30, padY = 20, barW = Math.max(14, Math.min(32, (W - padX * 2) / data.length - 4))
  const gap = (W - padX * 2 - barW * data.length) / (data.length - 1 || 1)
  const toY = (v: number) => H - padY - (v / maxVal) * (H - padY * 2)
  const meanY = toY(mean), medianY = toY(median)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(pct => {
        const v = maxVal * pct / 100
        const y = toY(v)
        return (
          <g key={pct}>
            <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="#1E293B" strokeWidth={0.8} />
            <text x={padX - 3} y={y + 3} textAnchor="end" fontSize={7} fill="#475569">
              {Math.round(v)}
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {data.map((val, i) => {
        const x = padX + i * (barW + gap)
        const barH = (val / maxVal) * (H - padY * 2)
        const y = H - padY - barH
        return (
          <motion.g key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <motion.rect
              x={x} y={H - padY} width={barW} height={0} rx={3}
              fill={color} fillOpacity={0.75}
              animate={{ y, height: barH }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
            />
            <motion.text x={x + barW / 2} y={H - padY + 10} textAnchor="middle" fontSize={7} fill="#475569"
              animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: i * 0.05 + 0.4 }}
            >
              {val}
            </motion.text>
          </motion.g>
        )
      })}

      {/* Mean line */}
      <line x1={padX} y1={meanY} x2={W - padX} y2={meanY}
        stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="5,3" />
      <rect x={W - padX - 30} y={meanY - 9} width={30} height={11} rx={3} fill="#F59E0B20" />
      <text x={W - padX - 15} y={meanY} textAnchor="middle" fontSize={7} fill="#F59E0B" fontWeight="700">mean</text>

      {/* Median line */}
      <line x1={padX} y1={medianY} x2={W - padX - 32} y2={medianY}
        stroke="#10B981" strokeWidth={1.5} strokeDasharray="5,3" />
      <rect x={padX} y={medianY - 9} width={36} height={11} rx={3} fill="#10B98120" />
      <text x={padX + 18} y={medianY} textAnchor="middle" fontSize={7} fill="#10B981" fontWeight="700">median</text>
    </svg>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, color, formula, meaning }: {
  label: string; value: string; color: string; formula: string; meaning: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(o => !o)}
      className="w-full rounded-xl border-2 p-2.5 text-left transition-all"
      style={{ borderColor: color + "40", background: open ? color + "10" : "#F9FAFB" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{label}</p>
        <motion.span
          key={value}
          initial={{ scale: 1.3 }} animate={{ scale: 1 }}
          className="font-sora font-bold text-sm"
          style={{ color }}
        >
          {value}
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
          >
            <p className="text-[9px] font-mono text-gray-500 mt-1">{formula}</p>
            <p className="text-[10px] text-gray-600 mt-0.5 leading-snug">{meaning}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimStatsCasino() {
  const [context, setContext] = useState<Context>("cars")
  const [data, setData]       = useState<number[]>(CONTEXTS.cars.preset)
  const [inputVal, setInput]  = useState("")

  const meta   = CONTEXTS[context]
  const mean   = calcMean(data)
  const median = calcMedian(data)
  const mode   = calcMode(data)
  const range  = calcRange(data)

  const switchContext = (c: Context) => {
    setContext(c)
    setData(CONTEXTS[c].preset)
    setInput("")
  }

  const addValue = useCallback(() => {
    const n = parseFloat(inputVal)
    if (!isNaN(n) && n >= 0 && n <= 999) {
      setData(d => [...d, n])
      setInput("")
    }
  }, [inputVal])

  const removeValue = (idx: number) => setData(d => d.filter((_, i) => i !== idx))

  const reset = () => { setData(meta.preset); setInput("") }

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100">

      {/* ── Chart canvas ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden">

        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="sc-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#sc-dots)" />
        </svg>

        {/* Context selector */}
        <div className="relative z-10 flex gap-2 p-3 border-b border-white/5 overflow-x-auto">
          {(Object.entries(CONTEXTS) as [Context, ContextMeta][]).map(([key, m]) => (
            <button key={key}
              onClick={() => switchContext(key)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0"
              style={context === key
                ? { background: m.color + "25", color: m.color, border: `1px solid ${m.color}40` }
                : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
              }
            >
              <m.Icon size={11} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-4 gap-4">
          <div>
            <p className="text-[10px] text-slate-500 mb-0.5">{meta.description}</p>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-4 border-t-2 border-dashed border-amber-400 inline-block" />Mean</span>
              <span className="flex items-center gap-1"><span className="w-4 border-t-2 border-dashed border-emerald-400 inline-block" />Median</span>
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div key={context} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full"
              >
                <BarChart data={data} color={meta.color} mean={mean} median={median} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Data pills */}
          <div className="flex flex-wrap gap-1.5">
            {data.map((v, i) => (
              <motion.button key={i}
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => removeValue(i)}
                className="group flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all"
                style={{ background: meta.color + "18", color: meta.color, border: `1px solid ${meta.color}30` }}
                title={`Remove ${v}`}
              >
                {v} {meta.unit}
                <Trash2 size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats panel ────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">

        {/* Stats */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Live Statistics ({data.length} values)
          </p>
          <div className="space-y-2">
            <StatCard
              label="Mean (Average)" color="#F59E0B"
              value={data.length ? mean.toFixed(1) : ""}
              formula="Sum ÷ Count"
              meaning="The arithmetic average. Sensitive to outliers  one very high value pulls the mean up."
            />
            <StatCard
              label="Median" color="#10B981"
              value={data.length ? median.toFixed(1) : ""}
              formula="Middle value when sorted"
              meaning="The exact centre of sorted data. Unaffected by outliers  used for house prices, salaries."
            />
            <StatCard
              label="Mode" color="#8B5CF6"
              value={mode.length > 0 ? mode.join(", ") : data.length ? "No repeat" : ""}
              formula="Most frequent value"
              meaning="The value that appears most often. Useful for categorical/count data  what's the most common score?"
            />
            <StatCard
              label="Range" color="#F97316"
              value={data.length >= 2 ? String(range) : ""}
              formula="Max − Min"
              meaning="Measures spread. A large range means data is widely distributed. A small range means it's clustered."
            />
          </div>
        </div>

        {/* Add value */}
        <div className="border-t border-gray-100 pt-3">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Add a value</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputVal}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addValue()}
              placeholder={`e.g. 18`}
              className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
            />
            <button onClick={addValue}
              className="p-2 rounded-xl text-white transition-colors"
              style={{ background: meta.color }}
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Click a value pill above to remove it</p>
        </div>

        {/* AI use-case */}
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-3">
          <p className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-1">AI Connection</p>
          <p className="text-[10px] text-violet-700 leading-snug">{meta.aiUseCase}</p>
        </div>

        <button onClick={reset}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw size={11} /> Reset to preset data
        </button>
      </div>
    </div>
  )
}
