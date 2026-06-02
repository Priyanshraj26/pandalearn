"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, BarChart2, Brain } from "lucide-react"

// ── Types & Data ──────────────────────────────────────────────────────────────

type TrendType = "upward" | "downward" | "stable" | "seasonal"
type Dataset   = "internet" | "temperature" | "malaria" | "phones"

interface DataPoint { year: string; value: number; event?: string }
interface DatasetMeta {
  label:      string
  unit:       string
  color:      string
  data:       DataPoint[]
  actualTrend: TrendType
  trendDesc:  string
  keyEvents:  { idx: number; label: string }[]
  aiApplication: string
  interpretation: string
}

const DATASETS: Record<Dataset, DatasetMeta> = {
  internet: {
    label: "Internet Users in India",
    unit:  "Million users",
    color: "#22D3EE",
    data: [
      { year: "2015", value: 354 },
      { year: "2016", value: 432 },
      { year: "2017", value: 481 },
      { year: "2018", value: 560, event: "Jio launched  cheap data" },
      { year: "2019", value: 624 },
      { year: "2020", value: 749, event: "COVID: digital acceleration" },
      { year: "2021", value: 825 },
      { year: "2022", value: 900 },
      { year: "2023", value: 950 },
    ],
    actualTrend: "upward",
    trendDesc: "Strong and consistent upward trend  India's internet user base nearly tripled in 8 years.",
    keyEvents: [{ idx: 3, label: "Jio Revolution" }, { idx: 5, label: "COVID-19 Boost" }],
    aiApplication: "AI recommendation engines (YouTube, Netflix, Amazon) use this growth trend to prioritise India as a key market and train models on Indian user behavior.",
    interpretation: "Upward trend accelerated at two key moments: the Jio telecom revolution (2018) and the COVID-19 pandemic (2020). Both events brought millions of first-time internet users online.",
  },
  temperature: {
    label: "Average Annual Temperature  Delhi (°C)",
    unit:  "°C above 1900 baseline",
    color: "#F97316",
    data: [
      { year: "1990", value: 0.3 },
      { year: "1995", value: 0.5 },
      { year: "2000", value: 0.7 },
      { year: "2005", value: 0.8 },
      { year: "2010", value: 1.0, event: "Hottest decade begins" },
      { year: "2015", value: 1.2 },
      { year: "2018", value: 1.4 },
      { year: "2020", value: 1.3 },
      { year: "2023", value: 1.7, event: "Record highs in India" },
    ],
    actualTrend: "upward",
    trendDesc: "Steady upward temperature trend  Delhi is 1.4°C warmer than the 1900 baseline, consistent with global warming.",
    keyEvents: [{ idx: 4, label: "Hottest decade" }, { idx: 8, label: "Record highs" }],
    aiApplication: "Climate AI models use decades of temperature trend data to forecast future temperatures, predict heat waves, and model crop yield impacts for farmers.",
    interpretation: "The upward trend is gradual but consistent  approximately +0.2°C per decade. This is a classic climate change signal that AI models use to project future temperatures.",
  },
  malaria: {
    label: "Malaria Cases in India",
    unit:  "Cases (millions)",
    color: "#10B981",
    data: [
      { year: "2000", value: 2.0 },
      { year: "2005", value: 1.8 },
      { year: "2010", value: 1.6, event: "National vector control programme" },
      { year: "2015", value: 1.1 },
      { year: "2017", value: 0.88 },
      { year: "2019", value: 0.34, event: "India nears WHO target" },
      { year: "2020", value: 0.19 },
      { year: "2021", value: 0.15 },
      { year: "2022", value: 0.14 },
    ],
    actualTrend: "downward",
    trendDesc: "Strong downward trend  malaria cases in India dropped by 93% from 2000 to 2022 due to national health programmes.",
    keyEvents: [{ idx: 2, label: "Vector Control" }, { idx: 5, label: "WHO Target" }],
    aiApplication: "Epidemiological AI uses disease trend data to identify which interventions worked and predict where outbreaks are most likely to occur next  enabling proactive health policy.",
    interpretation: "This downward trend shows the impact of sustained public health policy. The steepest drops came after 2015 when precision health campaigns used data to target high-risk areas.",
  },
  phones: {
    label: "Smartphone Shipments  India",
    unit:  "Million units",
    color: "#8B5CF6",
    data: [
      { year: "2016Q1", value: 25 },
      { year: "2016Q3", value: 33, event: "Demonetisation: digital push" },
      { year: "2017Q1", value: 28 },
      { year: "2017Q3", value: 40 },
      { year: "2018Q1", value: 31 },
      { year: "2018Q3", value: 46 },
      { year: "2019Q1", value: 33 },
      { year: "2019Q3", value: 50, event: "Q3 always peaks (Diwali)" },
    ],
    actualTrend: "seasonal",
    trendDesc: "Seasonal trend  smartphone sales peak every Q3 (festival season: Navratri, Dussehra, Diwali) and dip every Q1.",
    keyEvents: [{ idx: 1, label: "Demonetisation" }, { idx: 7, label: "Festival Peak" }],
    aiApplication: "Retail AI systems use seasonal trend data to predict demand 6 months in advance  ensuring the right inventory is available for festival sales, avoiding stockouts.",
    interpretation: "The consistent Q3 spike reveals a seasonal pattern tied to India's festival calendar. Overlaid on this seasonal cycle is a slow upward overall trend  both signals are useful for AI forecasting.",
  },
}

const TREND_OPTIONS: { key: TrendType; label: string; color: string; Icon: React.ElementType; desc: string }[] = [
  { key: "upward",   label: "Upward Trend",   color: "#10B981", Icon: TrendingUp,   desc: "Values consistently increase over time" },
  { key: "downward", label: "Downward Trend", color: "#EF4444", Icon: TrendingDown, desc: "Values consistently decrease over time" },
  { key: "stable",   label: "Stable / Flat",  color: "#F59E0B", Icon: Minus,        desc: "Values remain roughly constant over time" },
  { key: "seasonal", label: "Seasonal",       color: "#8B5CF6", Icon: BarChart2,    desc: "Values repeat a cyclical pattern (e.g., yearly)" },
]

// ── Line chart SVG ────────────────────────────────────────────────────────────

function TrendChart({ meta, highlightIdx, onHover }: {
  meta: DatasetMeta; highlightIdx: number | null; onHover: (i: number | null) => void
}) {
  const W = 380, H = 180, padX = 42, padY = 18
  const vals = meta.data.map(d => d.value)
  const minV = Math.min(...vals) * 0.92
  const maxV = Math.max(...vals) * 1.08
  const toX = (i: number) => padX + (i / (meta.data.length - 1)) * (W - padX * 2)
  const toY = (v: number) => H - padY - ((v - minV) / (maxV - minV)) * (H - padY * 2)
  const pts = meta.data.map((d, i) => ({ x: toX(i), y: toY(d.value) }))
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H - padY} L ${pts[0].x} ${H - padY} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-44">
      <defs>
        <linearGradient id="ta-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={meta.color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={meta.color} stopOpacity={0.02} />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[0, 25, 50, 75, 100].map(pct => {
        const v = minV + (maxV - minV) * pct / 100
        const y = toY(v)
        return (
          <g key={pct}>
            <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="#1E293B" strokeWidth={0.8} />
            <text x={padX - 3} y={y + 3} textAnchor="end" fontSize={6.5} fill="#475569">
              {v.toFixed(v < 10 ? 1 : 0)}
            </text>
          </g>
        )
      })}

      {/* Area */}
      <motion.path d={areaD} fill="url(#ta-area)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      />

      {/* Line */}
      <motion.path d={pathD} fill="none" stroke={meta.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Key event markers */}
      {meta.keyEvents.map(ev => {
        const pt = pts[ev.idx]
        return (
          <g key={ev.idx}>
            <line x1={pt.x} y1={pt.y - 12} x2={pt.x} y2={H - padY}
              stroke={meta.color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5}
            />
            <circle cx={pt.x} cy={pt.y} r={5} fill={meta.color} stroke="#060A12" strokeWidth={1.5} />
          </g>
        )
      })}

      {/* Data points */}
      {pts.map((p, i) => {
        const isHighlighted = highlightIdx === i
        const isKey = meta.keyEvents.some(ev => ev.idx === i)
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={isHighlighted ? 6 : 3.5}
              fill={isHighlighted ? "#fff" : meta.color}
              stroke={isHighlighted ? meta.color : "#060A12"}
              strokeWidth={isHighlighted ? 2 : 1}
              className="cursor-pointer"
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
            />
          </g>
        )
      })}

      {/* X labels (every other) */}
      {meta.data.map((d, i) => (
        i % 2 === 0 && (
          <text key={i} x={pts[i].x} y={H - 4} textAnchor="middle" fontSize={6.5} fill="#475569">
            {d.year}
          </text>
        )
      ))}

      {/* Hover tooltip */}
      {highlightIdx !== null && (
        <g>
          <rect
            x={Math.min(pts[highlightIdx].x - 28, W - padX - 60)}
            y={pts[highlightIdx].y - 26}
            width={58} height={18} rx={4}
            fill="#0D1829" stroke={meta.color} strokeWidth={0.8}
          />
          <text
            x={Math.min(pts[highlightIdx].x - 28, W - padX - 60) + 29}
            y={pts[highlightIdx].y - 14}
            textAnchor="middle" fontSize={7} fill={meta.color} fontWeight="700"
          >
            {meta.data[highlightIdx].value} {meta.unit.split(" ")[0]}
          </text>
        </g>
      )}
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimTrendAnalysis() {
  const [dataset, setDataset]         = useState<Dataset>("internet")
  const [chosen, setChosen]           = useState<TrendType | null>(null)
  const [revealed, setRevealed]       = useState(false)
  const [hoverIdx, setHoverIdx]       = useState<number | null>(null)
  const [highlightEvent, setHighlight] = useState<number | null>(null)

  const meta = DATASETS[dataset]
  const correct = chosen === meta.actualTrend

  const handleAnswer = (t: TrendType) => {
    if (revealed) return
    setChosen(t)
    setRevealed(true)
  }

  const next = () => {
    const keys = Object.keys(DATASETS) as Dataset[]
    const next  = keys[(keys.indexOf(dataset) + 1) % keys.length]
    setDataset(next)
    setChosen(null)
    setRevealed(false)
    setHoverIdx(null)
    setHighlight(null)
  }

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Chart canvas ─────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden min-h-80">

        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="ta-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#ta-dots)" />
        </svg>

        {/* Dataset tabs */}
        <div className="relative z-10 flex gap-1.5 p-3 border-b border-white/5 overflow-x-auto">
          {(Object.entries(DATASETS) as [Dataset, DatasetMeta][]).map(([key, m]) => (
            <button key={key}
              onClick={() => { setDataset(key); setChosen(null); setRevealed(false); setHoverIdx(null) }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0"
              style={dataset === key
                ? { background: m.color + "20", color: m.color, border: `1px solid ${m.color}40` }
                : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
              }
            >
              {m.label.split(" ").slice(0, 3).join(" ")}
            </button>
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pb-3 pt-4 gap-3">
          {/* Dataset label */}
          <div>
            <motion.p key={dataset} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-wider" style={{ color: meta.color }}
            >
              {meta.label}
            </motion.p>
            <p className="text-[9px] text-slate-500">Unit: {meta.unit} · Hover data points for values</p>
          </div>

          {/* Chart */}
          <AnimatePresence mode="wait">
            <motion.div key={dataset} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TrendChart meta={meta} highlightIdx={hoverIdx} onHover={setHoverIdx} />
            </motion.div>
          </AnimatePresence>

          {/* Key event chips */}
          <div className="flex flex-wrap gap-1.5">
            {meta.keyEvents.map((ev, i) => (
              <button key={i}
                onMouseEnter={() => setHighlight(ev.idx)}
                onMouseLeave={() => setHighlight(null)}
                className="text-[9px] px-2 py-0.5 rounded-full transition-all"
                style={{ background: meta.color + "20", color: meta.color, border: `1px solid ${meta.color}30` }}
              >
                📌 {ev.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Analysis panel ───────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={dataset}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">Trend Analysis Activity</p>
              <p className="text-xs font-semibold text-gray-900 leading-relaxed">
                Study the chart carefully. What kind of trend does this data show?
              </p>
            </div>

            {/* Trend options */}
            <div className="space-y-1.5">
              {TREND_OPTIONS.map(opt => {
                const isChosen  = chosen === opt.key
                const isBest    = opt.key === meta.actualTrend
                let style: React.CSSProperties = { background: "#F9FAFB", border: "2px solid #E5E7EB" }
                if (revealed && isBest)               style = { background: "#ECFDF5", border: `2px solid ${opt.color}` }
                else if (revealed && isChosen && !isBest) style = { background: "#FEF2F2", border: "2px solid #EF4444" }
                else if (!revealed && isChosen)       style = { background: opt.color + "10", border: `2px solid ${opt.color}` }

                return (
                  <motion.button key={opt.key}
                    onClick={() => handleAnswer(opt.key)}
                    disabled={revealed}
                    whileHover={!revealed ? { scale: 1.01 } : {}}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={style}
                  >
                    <opt.Icon size={14} style={{ color: opt.color, flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900">{opt.label}</p>
                      <p className="text-[10px] text-gray-500">{opt.desc}</p>
                    </div>
                    {revealed && isBest   && <span className="text-emerald-600 text-base shrink-0">✓</span>}
                    {revealed && isChosen && !isBest && <span className="text-red-500 text-base shrink-0">✗</span>}
                  </motion.button>
                )
              })}
            </div>

            {/* Interpretation after reveal */}
            <AnimatePresence>
              {revealed && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className={`rounded-xl p-3 text-xs border leading-relaxed ${correct ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                    <p className="font-bold mb-1">{correct ? "Correct!" : `It's a ${TREND_OPTIONS.find(o => o.key === meta.actualTrend)?.label}`}</p>
                    <p>{meta.trendDesc}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[10px] font-bold text-gray-700 mb-1">Data Interpretation</p>
                    <p className="text-[10px] text-gray-600 leading-snug">{meta.interpretation}</p>
                  </div>
                  <div className="rounded-xl bg-violet-50 border border-violet-100 p-2.5 flex items-start gap-2">
                    <Brain size={12} className="text-violet-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-violet-700 leading-snug">{meta.aiApplication}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={next}
              className="mt-auto py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
            >
              {revealed ? "Next Dataset →" : "Skip →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
