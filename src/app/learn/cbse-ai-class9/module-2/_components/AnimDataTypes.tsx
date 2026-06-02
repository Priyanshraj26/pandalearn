"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table2, Image as ImageIcon, Mic, MessageSquare, BarChart2, Database } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type MainType = "structured" | "unstructured"
type SourceType = "primary" | "secondary"

// ── Data ──────────────────────────────────────────────────────────────────────

const TYPES = {
  structured: {
    label: "Structured Data",
    short: "Structured",
    color: "#22D3EE",   // cyan-400
    glow:  "#0891B2",
    dark:  "#0A2636",
    Icon:  Table2,
    desc:  "Data organised into fixed rows and columns with a defined schema  like a spreadsheet or database table. Machines can directly read and process it.",
    fact:  "20% of all data is structured  but it powers most traditional business analytics.",
    examples: [
      { label: "Student marks in a spreadsheet",   cat: "Education" },
      { label: "Hospital patient records (CSV)",   cat: "Healthcare" },
      { label: "Weather station sensor readings",  cat: "Environment" },
      { label: "Bank transaction history",         cat: "Finance" },
    ],
    sources: {
      primary: {
        color: "#34D399",
        desc: "You collect it directly  surveys, forms, sensors.",
        examples: ["Filling a Google Form", "Weighing scale reading", "Attendance register"],
      },
      secondary: {
        color: "#60A5FA",
        desc: "Someone else collected it  government, NGOs, research bodies.",
        examples: ["NITI Aayog open data", "Census of India", "WHO health statistics"],
      },
    },
  },
  unstructured: {
    label: "Unstructured Data",
    short: "Unstructured",
    color: "#FB923C",   // orange-400
    glow:  "#EA580C",
    dark:  "#2D1200",
    Icon:  ImageIcon,
    desc:  "Data with no predefined format or schema. Humans understand it intuitively, but machines need special AI techniques (NLP, Computer Vision) to make sense of it.",
    fact:  "80% of all data in the world is unstructured  images, audio, video, text posts.",
    examples: [
      { label: "Photos from a hospital X-ray scan", cat: "Healthcare" },
      { label: "Voice recordings of lectures",      cat: "Education" },
      { label: "Twitter/Instagram posts",           cat: "Social" },
      { label: "CCTV footage from traffic signals", cat: "Transport" },
    ],
    sources: {
      primary: {
        color: "#34D399",
        desc: "You create it directly  photos, voice recordings, handwritten notes.",
        examples: ["Selfie you click", "Voice note you record", "Essay you write"],
      },
      secondary: {
        color: "#60A5FA",
        desc: "Created by others and sourced for your analysis.",
        examples: ["News article archive", "YouTube video dataset", "Wikipedia text corpus"],
      },
    },
  },
}

// SVG geometry  two hexagonal node clusters
const CX = 200
const NODE_GEO = {
  hub:         { cx: 200, cy: 170, r: 32 },
  structured:  { cx: 90,  cy: 100, r: 28 },
  unstructured:{ cx: 310, cy: 100, r: 28 },
  table:       { cx: 50,  cy: 220, r: 18 },
  database:    { cx: 115, cy: 255, r: 18 },
  sensor:      { cx: 58,  cy: 155, r: 18 },
  image:       { cx: 345, cy: 220, r: 18 },
  audio:       { cx: 280, cy: 255, r: 18 },
  text:        { cx: 352, cy: 155, r: 18 },
}

const SUB_ICONS = [
  { key: "table",    Icon: Table2,       parent: "structured",   color: "#22D3EE", label: "Tables"   },
  { key: "database", Icon: Database,     parent: "structured",   color: "#22D3EE", label: "DB"       },
  { key: "sensor",   Icon: BarChart2,    parent: "structured",   color: "#22D3EE", label: "Sensors"  },
  { key: "image",    Icon: ImageIcon,    parent: "unstructured", color: "#FB923C", label: "Images"   },
  { key: "audio",    Icon: Mic,          parent: "unstructured", color: "#FB923C", label: "Audio"    },
  { key: "text",     Icon: MessageSquare,parent: "unstructured", color: "#FB923C", label: "Text"     },
]

// Pre-compute bezier particles: hub → node
function midPt(x1: number, y1: number, x2: number, y2: number, t: number) {
  return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]
}

function Particle({ x1, y1, x2, y2, color, delay }: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number
}) {
  const pts = Array.from({ length: 10 }, (_, i) => midPt(x1, y1, x2, y2, i / 9))
  return (
    <motion.circle
      r={2.5}
      fill={color}
      filter="url(#dt-particle)"
      animate={{
        cx: pts.map(p => p[0]),
        cy: pts.map(p => p[1]),
        opacity: [0, 0, 0.9, 1, 1, 1, 1, 0.9, 0.5, 0],
      }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimDataTypes() {
  const [active, setActive]   = useState<MainType>("structured")
  const [source, setSource]   = useState<SourceType>("primary")
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setActive(prev => prev === "structured" ? "unstructured" : "structured")
    }, 4500)
    return () => clearInterval(id)
  }, [autoPlay])

  const meta = TYPES[active]
  const srcMeta = meta.sources[source]

  const handleClick = (t: MainType) => { setAutoPlay(false); setActive(t) }

  return (
    <div className="grid md:grid-cols-2">

      {/* ── SVG Canvas ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex items-center justify-center min-h-80 overflow-hidden">

        {/* depth radial */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, #0C1929 0%, #060A12 100%)" }} />

        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden>
          <defs>
            <pattern id="dt-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#CBD5E1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dt-dots)" />
        </svg>

        <svg viewBox="0 0 400 320" className="relative z-10 w-full max-w-xs px-3">
          <defs>
            <filter id="dt-particle" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="dt-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Connection lines: hub → main nodes */}
          {(["structured", "unstructured"] as MainType[]).map(key => {
            const g = NODE_GEO[key]
            const m = TYPES[key]
            const ia = key === active
            return (
              <motion.line key={key}
                x1={NODE_GEO.hub.cx} y1={NODE_GEO.hub.cy}
                x2={g.cx} y2={g.cy}
                animate={{ stroke: ia ? m.color : "#1E293B", strokeWidth: ia ? 2 : 1, opacity: ia ? 0.7 : 0.2 }}
                transition={{ duration: 0.4 }}
              />
            )
          })}

          {/* Connection lines: main node → sub-nodes */}
          {SUB_ICONS.map(s => {
            const parent = NODE_GEO[s.parent as MainType]
            const sub = NODE_GEO[s.key as keyof typeof NODE_GEO]
            const ia = s.parent === active
            return (
              <motion.line key={s.key}
                x1={parent.cx} y1={parent.cy}
                x2={sub.cx} y2={sub.cy}
                animate={{ stroke: ia ? s.color : "#1E293B", strokeWidth: ia ? 1.5 : 1, opacity: ia ? 0.5 : 0.15 }}
                transition={{ duration: 0.4 }}
              />
            )
          })}

          {/* Particles from hub to active main node */}
          {[0, 1, 2].map(i => {
            const g = NODE_GEO[active]
            return (
              <Particle key={`${active}-${i}`}
                x1={NODE_GEO.hub.cx} y1={NODE_GEO.hub.cy}
                x2={g.cx} y2={g.cy}
                color={TYPES[active].color}
                delay={i * 0.6}
              />
            )
          })}

          {/* Particles from active main to sub-nodes */}
          {SUB_ICONS.filter(s => s.parent === active).map((s, i) => {
            const parent = NODE_GEO[s.parent as MainType]
            const sub = NODE_GEO[s.key as keyof typeof NODE_GEO]
            return (
              <Particle key={`sub-${s.key}`}
                x1={parent.cx} y1={parent.cy}
                x2={sub.cx} y2={sub.cy}
                color={s.color}
                delay={i * 0.45 + 0.3}
              />
            )
          })}

          {/* Hub */}
          <motion.circle cx={CX} cy={170} r={32}
            fill="none" stroke={TYPES[active].color} strokeWidth={1}
            animate={{ r: [32, 56, 32], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx={CX} cy={170} r={32} fill="#0D1829" />
          <motion.circle cx={CX} cy={170} r={32} fill="none"
            animate={{ stroke: TYPES[active].color, strokeWidth: 2 }}
            transition={{ duration: 0.4 }}
          />
          <text x={CX} y={165} textAnchor="middle" dominantBaseline="middle" fill="#F1F5F9" fontSize={8} fontWeight="800" letterSpacing="0.1em">DATA</text>
          <text x={CX} y={177} textAnchor="middle" dominantBaseline="middle" fill="#64748B" fontSize={6.5} fontWeight="600">LITERACY</text>

          {/* Main type nodes */}
          {(["structured", "unstructured"] as MainType[]).map(key => {
            const g = NODE_GEO[key]
            const m = TYPES[key]
            const ia = key === active
            return (
              <motion.g key={key} style={{ cursor: "pointer" }}
                onClick={() => handleClick(key)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {ia && (
                  <motion.circle cx={g.cx} cy={g.cy} r={g.r}
                    fill={m.color} fillOpacity={0.07} filter="url(#dt-glow)"
                    animate={{ fillOpacity: [0.07, 0.2, 0.07] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <motion.circle cx={g.cx} cy={g.cy} r={g.r}
                  animate={{ fill: ia ? m.dark : "#0D1829", stroke: ia ? m.color : "#1E293B", strokeWidth: ia ? 2 : 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <text x={g.cx} y={g.cy - 3} textAnchor="middle" dominantBaseline="middle"
                  fill={ia ? m.color : "#475569"} fontSize={7} fontWeight="800"
                >
                  {m.short.split(" ")[0]}
                </text>
                <text x={g.cx} y={g.cy + 7} textAnchor="middle" dominantBaseline="middle"
                  fill={ia ? "#CBD5E1" : "#334155"} fontSize={6} fontWeight="600"
                >
                  {m.short.split(" ")[1] || ""}
                </text>
              </motion.g>
            )
          })}

          {/* Sub-nodes */}
          {SUB_ICONS.map(s => {
            const n = NODE_GEO[s.key as keyof typeof NODE_GEO]
            const ia = s.parent === active
            return (
              <motion.g key={s.key}
                animate={{ opacity: ia ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
              >
                <motion.circle cx={n.cx} cy={n.cy} r={n.r}
                  animate={{ fill: ia ? "#0D1829" : "#060A12", stroke: ia ? s.color : "#1E293B", strokeWidth: ia ? 1.5 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <text x={n.cx} y={n.cy + 1} textAnchor="middle" dominantBaseline="middle"
                  fill={ia ? s.color : "#334155"} fontSize={6.5} fontWeight="700"
                >
                  {s.label}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Legend label */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-center gap-4">
          {(["structured", "unstructured"] as MainType[]).map(k => (
            <button key={k}
              onClick={() => handleClick(k)}
              className="flex items-center gap-1.5 text-[10px] font-semibold transition-opacity"
              style={{ color: k === active ? TYPES[k].color : "#475569", opacity: k === active ? 1 : 0.5 }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: TYPES[k].color }} />
              {TYPES[k].short}
            </button>
          ))}
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col">

        {/* Type tabs */}
        <div className="flex border-b border-gray-100">
          {(["structured", "unstructured"] as MainType[]).map(key => {
            const m = TYPES[key]
            const ia = key === active
            return (
              <button key={key}
                onClick={() => handleClick(key)}
                className="flex-1 py-2.5 text-xs font-bold transition-all relative"
                style={ia ? { color: m.color } : { color: "#94A3B8" }}
              >
                {m.short}
                {ia && (
                  <motion.div layoutId="dt-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: m.color }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <meta.Icon size={15} style={{ color: meta.color }} />
                  <h3 className="font-sora font-bold text-gray-900 text-sm leading-tight">{meta.label}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{meta.desc}</p>
              </div>

              {/* Fact badge */}
              <div className="rounded-xl px-3 py-2 text-xs leading-snug" style={{ background: meta.color + "15", color: meta.glow }}>
                <span className="font-bold">Did you know? </span>{meta.fact}
              </div>

              {/* Primary / Secondary toggle */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: meta.color }}>Data Source</p>
                <div className="flex rounded-lg overflow-hidden border border-gray-100 text-xs font-bold">
                  {(["primary", "secondary"] as SourceType[]).map(s => (
                    <button key={s}
                      onClick={() => setSource(s)}
                      className="flex-1 py-1.5 transition-all capitalize"
                      style={s === source
                        ? { background: meta.sources[s].color + "22", color: meta.sources[s].color }
                        : { color: "#9CA3AF" }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={`${active}-${source}`}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <p className="text-xs text-gray-600 mb-2">{srcMeta.desc}</p>
                    <ul className="space-y-1">
                      {srcMeta.examples.map(ex => (
                        <li key={ex} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1" style={{ background: srcMeta.color }} />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Real examples */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Real-world examples</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {meta.examples.map(({ label, cat }) => (
                    <div key={label} className="rounded-lg px-2.5 py-1.5 border border-gray-100 bg-gray-50">
                      <p className="text-[10px] font-semibold text-gray-800 leading-tight">{label}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{cat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {autoPlay ? (
                <p className="text-[10px] text-gray-300 text-center italic">auto-cycling · click a tab to pause</p>
              ) : (
                <button onClick={() => setAutoPlay(true)}
                  className="w-full text-[10px] text-gray-400 hover:text-gray-600 text-center italic transition-colors"
                >
                  resume auto-cycle ›
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
