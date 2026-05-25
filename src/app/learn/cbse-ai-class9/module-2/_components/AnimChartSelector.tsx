"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart2, TrendingUp, PieChart, ScatterChart, AlignLeft } from "lucide-react"

// ── Types & Data ──────────────────────────────────────────────────────────────

type ChartKey = "bar" | "line" | "pie" | "scatter" | "histogram"

interface Scenario {
  id: number
  question: string
  data:     string
  best:     ChartKey
  why:      string
  wrong:    Partial<Record<ChartKey, string>>
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    question: "Compare the marks scored by 5 students in a Maths test",
    data:     "Aarav: 78, Priya: 88, Rohan: 62, Sneha: 91, Dev: 75",
    best:     "bar",
    why:      "A Bar Chart is perfect for comparing values across distinct categories (students). Each bar shows one student's mark clearly.",
    wrong: {
      pie:      "Pie charts show proportions of a whole, not comparisons between individuals.",
      line:     "Line charts show change over time — there's no time axis here, just 5 students.",
      scatter:  "Scatter plots need two numerical variables per data point (e.g. height vs weight).",
    },
  },
  {
    id: 2,
    question: "Track how India's internet users grew from 2015 to 2023",
    data:     "2015: 354M, 2016: 432M, 2017: 481M, 2018: 560M, 2019: 624M, 2020: 749M, 2021: 825M, 2022: 900M, 2023: 950M",
    best:     "line",
    why:      "A Line Chart is ideal for showing a trend over time. The connected line makes the growth pattern immediately visible.",
    wrong: {
      bar:      "Bar charts can work for time data but don't emphasise the continuous trend as clearly as a line.",
      pie:      "Pie charts cannot show change over time — they show parts of a whole at one moment.",
      scatter:  "Scatter plots don't connect data points to show a trend.",
    },
  },
  {
    id: 3,
    question: "Show what percentage of screen time is spent on each app category",
    data:     "Social Media: 35%, Video: 28%, Games: 18%, Study: 12%, Other: 7%",
    best:     "pie",
    why:      "A Pie Chart shows the proportion of each part relative to the whole (100%). Perfect when you want to visualise a share or percentage breakdown.",
    wrong: {
      bar:      "A bar chart would work, but pie charts are more intuitive for percentage-of-total comparisons.",
      line:     "There is no time dimension — a line chart would be misleading.",
      histogram:"Histograms show frequency distributions of continuous data, not category percentages.",
    },
  },
  {
    id: 4,
    question: "Explore if more study hours leads to higher test scores",
    data:     "6 data points: (2h, 62%), (3h, 72%), (4h, 80%), (5h, 88%), (1h, 55%), (6h, 94%)",
    best:     "scatter",
    why:      "A Scatter Plot places each student as a dot using two numeric values (x = hours, y = score). The pattern of dots reveals the correlation — do more hours mean higher scores?",
    wrong: {
      bar:      "Bar charts compare categories, not relationships between two continuous variables.",
      line:     "A line chart assumes the x-axis follows a fixed time/order. Here we want to see spread.",
      pie:      "Pie charts cannot represent two variables simultaneously.",
    },
  },
  {
    id: 5,
    question: "Understand the distribution of students' daily study time",
    data:     "Ranges: 0-1h: 8 students, 1-2h: 15 students, 2-3h: 22 students, 3-4h: 18 students, 4-5h: 10 students, 5+h: 5 students",
    best:     "histogram",
    why:      "A Histogram groups continuous data into intervals (bins) and shows how many values fall in each bin. It reveals the shape of the distribution — most students study 2-3 hours.",
    wrong: {
      bar:      "Bar charts have gaps between bars and are for discrete categories, not continuous ranges.",
      pie:      "Pie charts can't show the shape of a distribution across intervals.",
      line:     "Line charts are for trends over time, not frequency distributions.",
    },
  },
]

const CHART_META: Record<ChartKey, {
  label: string; color: string; Icon: React.ElementType; best: string
}> = {
  bar:       { label: "Bar Chart",       color: "#7C3AED", Icon: BarChart2,    best: "Comparing categories"      },
  line:      { label: "Line Chart",      color: "#2563EB", Icon: TrendingUp,   best: "Showing trends over time"  },
  pie:       { label: "Pie Chart",       color: "#F97316", Icon: PieChart,     best: "Parts of a whole (%)"      },
  scatter:   { label: "Scatter Plot",    color: "#059669", Icon: ScatterChart, best: "Correlation between 2 vars"},
  histogram: { label: "Histogram",       color: "#D97706", Icon: AlignLeft,    best: "Frequency distribution"    },
}

// ── SVG Chart Renderers ───────────────────────────────────────────────────────

function BarChartSVG() {
  const bars = [78, 88, 62, 91, 75]
  const names = ["Aarav", "Priya", "Rohan", "Sneha", "Dev"]
  const max = 100
  const W = 360, H = 200
  const barW = 44, gap = 22, baseY = 170
  const total = bars.length * barW + (bars.length - 1) * gap
  const startX = (W - total) / 2

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-52">
      {/* grid lines */}
      {[0, 25, 50, 75, 100].map(v => {
        const y = baseY - (v / max) * 150
        return (
          <g key={v}>
            <line x1={startX - 8} y1={y} x2={startX + total + 8} y2={y} stroke="#E5E7EB" strokeWidth={0.8} strokeDasharray="3,3" />
            <text x={startX - 12} y={y + 3} textAnchor="end" fontSize={8} fill="#9CA3AF">{v}</text>
          </g>
        )
      })}
      {bars.map((val, i) => {
        const x = startX + i * (barW + gap)
        const barH = (val / max) * 150
        return (
          <g key={i}>
            <motion.rect
              x={x} y={baseY - barH} width={barW} height={barH}
              rx={4} fill="#7C3AED" fillOpacity={0.85}
              initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: `${x + barW / 2}px ${baseY}px` }}
            />
            <text x={x + barW / 2} y={baseY - barH - 5} textAnchor="middle" fontSize={8.5} fill="#7C3AED" fontWeight="700">{val}</text>
            <text x={x + barW / 2} y={baseY + 12} textAnchor="middle" fontSize={7.5} fill="#6B7280">{names[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LineChartSVG() {
  const years = [2015, 2017, 2019, 2021, 2023]
  const vals  = [354, 481, 624, 825, 950]
  const W = 360, H = 200, padX = 40, padY = 20, baseY = 180, chartH = 140
  const maxV = 1000
  const pts = vals.map((v, i) => ({
    x: padX + (i / (vals.length - 1)) * (W - padX * 2),
    y: baseY - (v / maxV) * chartH,
  }))
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-52">
      <defs>
        <linearGradient id="line-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {[0, 250, 500, 750, 1000].map(v => {
        const y = baseY - (v / maxV) * chartH
        return (
          <g key={v}>
            <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="#E5E7EB" strokeWidth={0.8} strokeDasharray="3,3" />
            <text x={padX - 4} y={y + 3} textAnchor="end" fontSize={7} fill="#9CA3AF">{v}M</text>
          </g>
        )
      })}
      <motion.path d={areaD} fill="url(#line-area)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      />
      <motion.path d={pathD} fill="none" stroke="#2563EB" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {pts.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r={4} fill="#2563EB"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i + 0.8 }}
        >
          <title>{years[i]}: {vals[i]}M users</title>
        </motion.circle>
      ))}
      {years.map((y, i) => (
        <text key={y} x={pts[i].x} y={baseY + 12} textAnchor="middle" fontSize={7.5} fill="#6B7280">{y}</text>
      ))}
    </svg>
  )
}

function PieChartSVG() {
  const slices = [
    { label: "Social", val: 35, color: "#7C3AED" },
    { label: "Video",  val: 28, color: "#F97316" },
    { label: "Games",  val: 18, color: "#2563EB" },
    { label: "Study",  val: 12, color: "#059669" },
    { label: "Other",  val: 7,  color: "#D97706" },
  ]
  const cx = 130, cy = 100, r = 80
  let cumAngle = -90
  return (
    <svg viewBox="0 0 360 200" className="w-full max-h-52">
      {slices.map((s, i) => {
        const startAngle = cumAngle
        const sweep = (s.val / 100) * 360
        cumAngle += sweep
        const midAngle = startAngle + sweep / 2
        const sr = startAngle * Math.PI / 180
        const er = (startAngle + sweep) * Math.PI / 180
        const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr)
        const x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er)
        const largeArc = sweep > 180 ? 1 : 0
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
        const mr = midAngle * Math.PI / 180
        const lx = cx + (r * 0.65) * Math.cos(mr), ly = cy + (r * 0.65) * Math.sin(mr)
        return (
          <motion.g key={i}
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <path d={d} fill={s.color} fillOpacity={0.85} stroke="#fff" strokeWidth={1.5} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#fff" fontWeight="700">{s.val}%</text>
          </motion.g>
        )
      })}
      {/* Legend */}
      {slices.map((s, i) => (
        <g key={s.label}>
          <rect x={265} y={20 + i * 22} width={10} height={10} rx={2} fill={s.color} fillOpacity={0.85} />
          <text x={280} y={29 + i * 22} fontSize={9} fill="#374151">{s.label} ({s.val}%)</text>
        </g>
      ))}
    </svg>
  )
}

function ScatterSVG() {
  const pts = [
    { x: 1, y: 55 }, { x: 2, y: 62 }, { x: 3, y: 72 },
    { x: 4, y: 80 }, { x: 5, y: 88 }, { x: 6, y: 94 },
  ]
  const W = 360, H = 200, padX = 45, padY = 20, baseY = 175
  const chartW = W - padX * 2, chartH = 145
  const toX = (v: number) => padX + ((v - 1) / 5) * chartW
  const toY = (v: number) => baseY - ((v - 40) / 60) * chartH
  const trendX1 = toX(1), trendY1 = toY(49), trendX2 = toX(6), trendY2 = toY(97)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-52">
      {[50, 60, 70, 80, 90, 100].map(v => {
        const y = toY(v)
        return (
          <g key={v}>
            <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="#E5E7EB" strokeWidth={0.8} strokeDasharray="3,3" />
            <text x={padX - 4} y={y + 3} textAnchor="end" fontSize={7} fill="#9CA3AF">{v}%</text>
          </g>
        )
      })}
      {[1, 2, 3, 4, 5, 6].map(v => (
        <text key={v} x={toX(v)} y={baseY + 12} textAnchor="middle" fontSize={7.5} fill="#6B7280">{v}h</text>
      ))}
      <motion.line
        x1={trendX1} y1={trendY1} x2={trendX2} y2={trendY2}
        stroke="#059669" strokeWidth={1.5} strokeDasharray="5,3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
      />
      {pts.map((p, i) => (
        <motion.circle key={i} cx={toX(p.x)} cy={toY(p.y)} r={5.5}
          fill="#059669" fillOpacity={0.8} stroke="#fff" strokeWidth={1}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.3 }}
        />
      ))}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={8} fill="#6B7280">Study Hours per Day (x)</text>
      <text x={10} y={baseY - chartH / 2} textAnchor="middle" fontSize={8} fill="#6B7280"
        transform={`rotate(-90, 10, ${baseY - chartH / 2})`}
      >Score (%)</text>
    </svg>
  )
}

function HistogramSVG() {
  const bins = [
    { label: "0–1h",  count: 8  },
    { label: "1–2h",  count: 15 },
    { label: "2–3h",  count: 22 },
    { label: "3–4h",  count: 18 },
    { label: "4–5h",  count: 10 },
    { label: "5+h",   count: 5  },
  ]
  const W = 360, baseY = 170, barW = 44, gap = 2
  const total = bins.length * barW + (bins.length - 1) * gap
  const startX = (W - total) / 2
  const maxC = 25

  return (
    <svg viewBox="0 0 360 200" className="w-full max-h-52">
      {[0, 5, 10, 15, 20, 25].map(v => {
        const y = baseY - (v / maxC) * 140
        return (
          <g key={v}>
            <line x1={startX - 6} y1={y} x2={startX + total + 6} y2={y} stroke="#E5E7EB" strokeWidth={0.8} strokeDasharray="3,3" />
            <text x={startX - 10} y={y + 3} textAnchor="end" fontSize={7} fill="#9CA3AF">{v}</text>
          </g>
        )
      })}
      {bins.map((b, i) => {
        const x = startX + i * (barW + gap)
        const barH = (b.count / maxC) * 140
        return (
          <g key={i}>
            <motion.rect
              x={x} y={baseY - barH} width={barW} height={barH}
              fill="#D97706" fillOpacity={0.85}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${x + barW / 2}px ${baseY}px` }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            />
            <text x={x + barW / 2} y={baseY - barH - 5} textAnchor="middle" fontSize={8.5} fill="#D97706" fontWeight="700">{b.count}</text>
            <text x={x + barW / 2} y={baseY + 12} textAnchor="middle" fontSize={7} fill="#6B7280">{b.label}</text>
          </g>
        )
      })}
      <text x={W / 2} y={196} textAnchor="middle" fontSize={8} fill="#6B7280">Daily Study Hours</text>
    </svg>
  )
}

const CHART_SVG: Record<ChartKey, React.ReactNode> = {
  bar:       <BarChartSVG />,
  line:      <LineChartSVG />,
  pie:       <PieChartSVG />,
  scatter:   <ScatterSVG />,
  histogram: <HistogramSVG />,
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimChartSelector() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [chosen, setChosen]           = useState<ChartKey | null>(null)
  const [revealed, setRevealed]       = useState(false)

  const scenario = SCENARIOS[scenarioIdx]

  const next = () => {
    setScenarioIdx(i => (i + 1) % SCENARIOS.length)
    setChosen(null)
    setRevealed(false)
  }

  const handleChoose = (k: ChartKey) => {
    setChosen(k)
    setRevealed(true)
  }

  const correct = chosen === scenario.best
  const activeChart = revealed ? scenario.best : null

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Chart canvas ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col items-center justify-center min-h-80 overflow-hidden p-4">

        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs>
            <pattern id="cs-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#94A3B8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cs-dots)" />
        </svg>

        <div className="relative z-10 w-full">
          {/* Chart type label */}
          {activeChart && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="text-center mb-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: CHART_META[activeChart].color + "25", color: CHART_META[activeChart].color }}
              >
                {CHART_META[activeChart].label}
              </span>
            </motion.div>
          )}

          {/* Chart SVG */}
          <AnimatePresence mode="wait">
            {activeChart ? (
              <motion.div key={activeChart}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl p-3 shadow-xl"
              >
                {CHART_SVG[activeChart]}
              </motion.div>
            ) : (
              <motion.div key="placeholder"
                className="flex flex-col items-center justify-center gap-3 py-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BarChart2 size={28} className="text-slate-600" />
                </div>
                <p className="text-slate-500 text-xs text-center">Pick the right chart type →</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scenario counter */}
        <div className="absolute bottom-3 left-4 flex gap-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: i === scenarioIdx ? "#F97316" : "#1E293B" }}
            />
          ))}
        </div>
      </div>

      {/* ── Question & choices panel ────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">

        <AnimatePresence mode="wait">
          <motion.div key={scenarioIdx}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            {/* Scenario */}
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">
                Scenario {scenarioIdx + 1} of {SCENARIOS.length}
              </p>
              <p className="text-xs font-semibold text-gray-900 leading-relaxed">{scenario.question}</p>
              <p className="text-[10px] text-gray-400 mt-1 italic">Data: {scenario.data}</p>
            </div>

            {/* Chart choices */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Which chart fits best?</p>
              {(Object.entries(CHART_META) as [ChartKey, typeof CHART_META[ChartKey]][]).map(([key, m]) => {
                const isChosen  = chosen === key
                const isBest    = key === scenario.best
                const showResult = revealed

                let bg = "bg-gray-50 border-gray-200 text-gray-700"
                if (showResult && isBest)    bg = "bg-emerald-50 border-emerald-300 text-emerald-800"
                else if (showResult && isChosen && !isBest) bg = "bg-red-50 border-red-300 text-red-700"
                else if (!showResult && isChosen) bg = "bg-violet-50 border-violet-300 text-violet-700"

                return (
                  <motion.button key={key}
                    onClick={() => !revealed && handleChoose(key)}
                    disabled={revealed}
                    whileHover={!revealed ? { scale: 1.01 } : {}}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${bg}`}
                  >
                    <m.Icon size={15} className="shrink-0" style={{ color: m.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-tight">{m.label}</p>
                      <p className="text-[10px] opacity-70 leading-tight">{m.best}</p>
                    </div>
                    {showResult && isBest && <span className="text-emerald-600 text-base shrink-0">✓</span>}
                    {showResult && isChosen && !isBest && <span className="text-red-500 text-base shrink-0">✗</span>}
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-3 text-xs leading-relaxed border ${
                    correct
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}
                >
                  <p className="font-bold mb-1">{correct ? "Correct!" : `The best chart is a ${CHART_META[scenario.best].label}.`}</p>
                  <p>{scenario.why}</p>
                  {chosen && chosen !== scenario.best && scenario.wrong[chosen] && (
                    <p className="mt-1.5 text-amber-700">{scenario.wrong[chosen]}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={next}
              className="mt-auto py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
            >
              {revealed ? "Next Scenario →" : "Skip →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
