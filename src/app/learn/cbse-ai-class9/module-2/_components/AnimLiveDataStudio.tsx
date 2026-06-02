"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, RotateCcw, BarChart2, TrendingUp, PieChart, ScatterChart } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type ChartType = "bar" | "line" | "pie" | "scatter"

interface Row { id: number; label: string; val1: string; val2: string }

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_ROWS: Row[] = [
  { id: 1, label: "Maths",   val1: "78", val2: "82" },
  { id: 2, label: "Science", val1: "92", val2: "88" },
  { id: 3, label: "English", val1: "65", val2: "70" },
  { id: 4, label: "Hindi",   val1: "85", val2: "79" },
  { id: 5, label: "SST",     val1: "72", val2: "75" },
]

let rowCounter = 10

const CHART_META: Record<ChartType, { label: string; Icon: React.ElementType; color: string; desc: string }> = {
  bar:     { label: "Bar Chart",    Icon: BarChart2,    color: "#7C3AED", desc: "Compare categories"      },
  line:    { label: "Line Chart",   Icon: TrendingUp,   color: "#2563EB", desc: "Show trend over sequence" },
  pie:     { label: "Pie Chart",    Icon: PieChart,     color: "#F97316", desc: "Parts of a whole"        },
  scatter: { label: "Scatter Plot", Icon: ScatterChart, color: "#059669", desc: "Correlation between 2 vars"},
}

// ── SVG Chart components ──────────────────────────────────────────────────────

const W = 360, H = 200, PAD_X = 48, PAD_Y = 16, BASE_Y = 180

function parseRows(rows: Row[]) {
  return rows.map(r => ({
    label: r.label || "?",
    v1:    parseFloat(r.val1) || 0,
    v2:    parseFloat(r.val2) || 0,
  })).filter(r => r.label)
}

function BarChart({ rows, color }: { rows: Row[]; color: string }) {
  const data = parseRows(rows)
  if (!data.length) return null
  const max = Math.max(...data.map(d => d.v1), 1)
  const chartW = W - PAD_X * 2
  const barW   = Math.min(44, chartW / data.length - 6)
  const gap    = (chartW - barW * data.length) / Math.max(data.length - 1, 1)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-48">
      {[0, 25, 50, 75, 100].map(pct => {
        const v = (pct / 100) * max
        const y = BASE_Y - (pct / 100) * (BASE_Y - PAD_Y)
        return (
          <g key={pct}>
            <line x1={PAD_X} y1={y} x2={W - PAD_X} y2={y} stroke="#E5E7EB" strokeWidth={0.7} strokeDasharray="3,3" />
            <text x={PAD_X - 4} y={y + 3} textAnchor="end" fontSize={7.5} fill="#9CA3AF">{Math.round(v)}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const x = PAD_X + i * (barW + gap)
        const bh = ((d.v1 / max) * (BASE_Y - PAD_Y))
        return (
          <g key={i}>
            <motion.rect x={x} y={BASE_Y - bh} width={barW} height={bh} rx={3}
              fill={color} fillOpacity={0.85}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${x + barW / 2}px ${BASE_Y}px` }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
            />
            <text x={x + barW / 2} y={BASE_Y - bh - 5} textAnchor="middle" fontSize={8} fill={color} fontWeight="700">{d.v1}</text>
            <text x={x + barW / 2} y={BASE_Y + 12} textAnchor="middle" fontSize={7.5} fill="#6B7280">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LineChart({ rows, color }: { rows: Row[]; color: string }) {
  const data = parseRows(rows)
  if (data.length < 2) return null
  const max    = Math.max(...data.map(d => d.v1), 1)
  const chartW = W - PAD_X * 2
  const pts    = data.map((d, i) => ({
    x: PAD_X + (i / (data.length - 1)) * chartW,
    y: BASE_Y - (d.v1 / max) * (BASE_Y - PAD_Y),
    label: d.label, v: d.v1,
  }))
  const path  = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const area  = `${path} L ${pts[pts.length - 1].x} ${BASE_Y} L ${pts[0].x} ${BASE_Y} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-48">
      <defs>
        <linearGradient id="lds-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map(pct => {
        const y = BASE_Y - (pct / 100) * (BASE_Y - PAD_Y)
        const v = (pct / 100) * max
        return (
          <g key={pct}>
            <line x1={PAD_X} y1={y} x2={W - PAD_X} y2={y} stroke="#E5E7EB" strokeWidth={0.7} strokeDasharray="3,3" />
            <text x={PAD_X - 4} y={y + 3} textAnchor="end" fontSize={7.5} fill="#9CA3AF">{Math.round(v)}</text>
          </g>
        )
      })}
      <motion.path d={area} fill="url(#lds-area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
      <motion.path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeOut" }}
      />
      {pts.map((p, i) => (
        <g key={i}>
          <motion.circle cx={p.x} cy={p.y} r={4} fill={color}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.8 }}
          />
          <text x={p.x} y={p.y - 9} textAnchor="middle" fontSize={8} fill={color} fontWeight="700">{p.v}</text>
          <text x={p.x} y={BASE_Y + 12} textAnchor="middle" fontSize={7.5} fill="#6B7280">{p.label}</text>
        </g>
      ))}
    </svg>
  )
}

function PieChart_({ rows, color }: { rows: Row[]; color: string }) {
  const data  = parseRows(rows).filter(d => d.v1 > 0)
  if (!data.length) return null
  const total = data.reduce((s, d) => s + d.v1, 0)
  const PALETTE = [color, "#F97316", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6"]
  const cx = 120, cy = 100, r = 75
  let cum = -90
  return (
    <svg viewBox="0 0 360 200" className="w-full max-h-48">
      {data.map((d, i) => {
        const pct   = d.v1 / total
        const sweep = pct * 360
        const startA = cum; cum += sweep
        const sr = startA * Math.PI / 180, er = (startA + sweep) * Math.PI / 180
        const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr)
        const x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er)
        const midA = (startA + sweep / 2) * Math.PI / 180
        const lx = cx + r * 0.65 * Math.cos(midA), ly = cy + r * 0.65 * Math.sin(midA)
        const col = PALETTE[i % PALETTE.length]
        return (
          <motion.g key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }} style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
              fill={col} fillOpacity={0.85} stroke="#fff" strokeWidth={1.5} />
            {pct > 0.07 && (
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#fff" fontWeight="700">
                {Math.round(pct * 100)}%
              </text>
            )}
          </motion.g>
        )
      })}
      <g>
        {data.map((d, i) => (
          <g key={i}>
            <rect x={250} y={20 + i * 22} width={10} height={10} rx={2} fill={PALETTE[i % PALETTE.length]} fillOpacity={0.85} />
            <text x={265} y={29 + i * 22} fontSize={9} fill="#374151">{d.label} ({d.v1})</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

function ScatterPlot({ rows, color }: { rows: Row[]; color: string }) {
  const data   = parseRows(rows).filter(d => d.v1 > 0 && d.v2 > 0)
  if (data.length < 2) return null
  const maxX   = Math.max(...data.map(d => d.v1), 1)
  const maxY   = Math.max(...data.map(d => d.v2), 1)
  const chartW = W - PAD_X * 2
  const chartH = BASE_Y - PAD_Y
  const toX = (v: number) => PAD_X + (v / maxX) * chartW
  const toY = (v: number) => BASE_Y - (v / maxY) * chartH

  // Simple trend line
  const n    = data.length
  const sumX = data.reduce((s, d) => s + d.v1, 0)
  const sumY = data.reduce((s, d) => s + d.v2, 0)
  const sumXY= data.reduce((s, d) => s + d.v1 * d.v2, 0)
  const sumX2= data.reduce((s, d) => s + d.v1 * d.v1, 0)
  const slope  = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX) || 0
  const intercept = (sumY - slope * sumX) / n
  const trendY1 = intercept + slope * Math.min(...data.map(d => d.v1))
  const trendY2 = intercept + slope * Math.max(...data.map(d => d.v1))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-48">
      {[0, 25, 50, 75, 100].map(pct => {
        const y = BASE_Y - (pct / 100) * chartH
        const v = (pct / 100) * maxY
        return (
          <g key={pct}>
            <line x1={PAD_X} y1={y} x2={W - PAD_X} y2={y} stroke="#E5E7EB" strokeWidth={0.7} strokeDasharray="3,3" />
            <text x={PAD_X - 4} y={y + 3} textAnchor="end" fontSize={7.5} fill="#9CA3AF">{Math.round(v)}</text>
          </g>
        )
      })}
      <motion.line
        x1={toX(Math.min(...data.map(d => d.v1)))} y1={toY(trendY1)}
        x2={toX(Math.max(...data.map(d => d.v1)))} y2={toY(trendY2)}
        stroke={color} strokeWidth={1.5} strokeDasharray="5,3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
      />
      {data.map((d, i) => (
        <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.3 }}
          style={{ transformOrigin: `${toX(d.v1)}px ${toY(d.v2)}px` }}
        >
          <circle cx={toX(d.v1)} cy={toY(d.v2)} r={5} fill={color} fillOpacity={0.8} stroke="#fff" strokeWidth={1} />
          <text x={toX(d.v1)} y={toY(d.v2) - 8} textAnchor="middle" fontSize={7.5} fill="#6B7280">{d.label}</text>
        </motion.g>
      ))}
      <text x={W / 2} y={H - 2} textAnchor="middle" fontSize={8} fill="#9CA3AF">Value 1 (x-axis)</text>
      <text x={12} y={BASE_Y - chartH / 2} textAnchor="middle" fontSize={8} fill="#9CA3AF"
        transform={`rotate(-90, 12, ${BASE_Y - chartH / 2})`}
      >Value 2</text>
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimLiveDataStudio() {
  const [rows,      setRows]     = useState<Row[]>(DEFAULT_ROWS)
  const [chartType, setChart]    = useState<ChartType>("bar")
  const [col1,      setCol1]     = useState("Subject")
  const [col2,      setCol2]     = useState("Term 1 %")
  const [col3,      setCol3]     = useState("Term 2 %")

  const color = CHART_META[chartType].color

  const addRow = () => {
    if (rows.length >= 8) return
    setRows(r => [...r, { id: ++rowCounter, label: "", val1: "", val2: "" }])
  }

  const removeRow = (id: number) => setRows(r => r.filter(row => row.id !== id))

  const updateRow = (id: number, field: keyof Row, value: string) =>
    setRows(r => r.map(row => row.id === id ? { ...row, [field]: value } : row))

  const reset = () => { setRows(DEFAULT_ROWS); setCol1("Subject"); setCol2("Term 1 %"); setCol3("Term 2 %") }

  const validRows = useMemo(() => rows.filter(r => r.label && r.val1), [rows])

  const renderChart = () => {
    if (validRows.length < 2) return (
      <div className="flex flex-col items-center justify-center h-32 gap-2 opacity-50">
        <BarChart2 size={28} className="text-slate-500" />
        <p className="text-[10px] text-slate-500">Add at least 2 rows with values to see a chart</p>
      </div>
    )
    switch (chartType) {
      case "bar":     return <BarChart rows={validRows} color={color} />
      case "line":    return <LineChart rows={validRows} color={color} />
      case "pie":     return <PieChart_ rows={validRows} color={color} />
      case "scatter": return <ScatterPlot rows={validRows} color={color} />
    }
  }

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Chart canvas ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col min-h-80 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="lds-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#lds-dots)" />
        </svg>

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Chart type selector */}
          <div className="flex border-b border-white/5">
            {(Object.entries(CHART_META) as [ChartType, typeof CHART_META[ChartType]][]).map(([key, m]) => (
              <button key={key}
                onClick={() => setChart(key)}
                className="flex-1 py-2 flex flex-col items-center gap-0.5 transition-all relative"
                style={chartType === key ? { color: m.color } : { color: "#475569" }}
              >
                <m.Icon size={13} />
                <span className="text-[8px] font-bold">{m.label.split(" ")[0]}</span>
                {chartType === key && (
                  <motion.div layoutId="lds-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: m.color }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Live chart */}
          <div className="flex-1 flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.div key={chartType} className="w-full"
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              >
                <div className="bg-white rounded-2xl p-3 shadow-xl">
                  {renderChart()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Chart tip */}
          <div className="px-4 pb-3">
            <p className="text-[9px] text-center italic"
              style={{ color: color + "80" }}
            >
              {CHART_META[chartType].desc}  chart updates live as you type
            </p>
          </div>
        </div>
      </div>

      {/* ── Data table panel ────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col">

        {/* Column header editors */}
        <div className="border-b border-gray-100 px-4 py-3 space-y-2">
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Your Dataset</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { val: col1, set: setCol1, ph: "Label column" },
              { val: col2, set: setCol2, ph: "Value 1 (x)" },
              { val: col3, set: setCol3, ph: "Value 2 (y)" },
            ].map(({ val, set, ph }, i) => (
              <input key={i} value={val} onChange={e => set(e.target.value)}
                placeholder={ph}
                className="text-[10px] font-bold border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-violet-400 bg-gray-50 text-gray-700"
              />
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5">
          {rows.map((row, idx) => (
            <motion.div key={row.id} layout
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid gap-1 items-center"
              style={{ gridTemplateColumns: "24px 1fr 1fr 1fr 24px" }}
            >
              <span className="text-[9px] text-gray-400 text-center font-mono">{idx + 1}</span>
              <input value={row.label} onChange={e => updateRow(row.id, "label", e.target.value)}
                placeholder={col1}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-violet-400 bg-white"
              />
              <input value={row.val1} onChange={e => updateRow(row.id, "val1", e.target.value)}
                type="number" placeholder={col2}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-violet-400 bg-white text-center"
              />
              <input value={row.val2} onChange={e => updateRow(row.id, "val2", e.target.value)}
                type="number" placeholder={col3}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-violet-400 bg-white text-center"
              />
              <button onClick={() => removeRow(row.id)} disabled={rows.length <= 2}
                className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-20"
              >
                <Trash2 size={12} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="border-t border-gray-100 p-3 flex items-center gap-2">
          <button onClick={addRow} disabled={rows.length >= 8}
            className="flex items-center gap-1.5 text-[10px] font-bold text-violet-600 hover:text-violet-800 transition-colors disabled:opacity-40"
          >
            <Plus size={12} /> Add row
          </button>
          <button onClick={reset}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 hover:text-gray-600 transition-colors ml-auto"
          >
            <RotateCcw size={10} /> Reset
          </button>
        </div>

        {/* Insight */}
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-orange-50 border border-orange-100 p-2.5">
            <p className="text-[10px] font-bold text-orange-700 mb-1">Try this:</p>
            <p className="text-[10px] text-orange-700 leading-snug">
              Switch to <strong>Scatter Plot</strong> to see if Term 1 and Term 2 scores are correlated. If the dots trend upward, students who scored well in Term 1 also scored well in Term 2.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
