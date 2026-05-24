"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Eye as EyeIcon, BarChart3 } from "lucide-react"

// ── Types & constants ─────────────────────────────────────────────────────────

type Domain = "nlp" | "cv" | "data"
const ORDER: Domain[] = ["nlp", "cv", "data"]

// SVG canvas geometry
const CX = 200, CY = 185       // central AI hub
const DOMAIN_GEO = {
  nlp:  { cx: 200, cy: 52,  cp1: [175, 145] as [number,number], cp2: [225, 95] as [number,number] },
  cv:   { cx: 332, cy: 262, cp1: [248, 178] as [number,number], cp2: [308, 240] as [number,number] },
  data: { cx: 68,  cy: 262, cp1: [152, 178] as [number,number], cp2: [92,  240] as [number,number] },
}

const DOMAIN_META = {
  nlp: {
    label: "Natural Language Processing",
    short: "NLP",
    color: "#60A5FA",     // blue-400
    glow:  "#2563EB",
    dark:  "#1E3A5F",
    Icon:  MessageSquare,
    stat:  { val: 47, unit: "K predictions/sec — search, translation, chatbots" },
    desc:  "AI that reads, understands, and generates human language at scale.",
    tasks: ["Translate between 100+ languages instantly", "Answer questions from raw text", "Detect tone, sentiment & intent", "Summarise long documents", "Power voice assistants"],
    apps:  [
      { name: "Google Translate", cat: "Translation" },
      { name: "ChatGPT",          cat: "Generation"  },
      { name: "Gmail Suggestions",cat: "Completion"  },
      { name: "Alexa / Siri",     cat: "Voice"       },
    ],
  },
  cv: {
    label: "Computer Vision",
    short: "CV",
    color: "#34D399",     // emerald-400
    glow:  "#059669",
    dark:  "#0A3325",
    Icon:  EyeIcon,
    stat:  { val: 28, unit: "K scans/sec — cameras, medical imaging, vehicles" },
    desc:  "AI that interprets images and video the way the human eye and brain do.",
    tasks: ["Detect objects, faces, and scenes", "Read medical X-rays & MRI scans", "Guide self-driving vehicle cameras", "Perform real-time quality control", "Reconstruct 3D scenes from photos"],
    apps:  [
      { name: "Face ID",         cat: "Biometrics" },
      { name: "Tesla Autopilot", cat: "Vehicles"   },
      { name: "Google Photos",   cat: "Search"     },
      { name: "AI Radiology",    cat: "Healthcare" },
    ],
  },
  data: {
    label: "Data & Statistics",
    short: "Data",
    color: "#FB923C",     // orange-400
    glow:  "#EA580C",
    dark:  "#431407",
    Icon:  BarChart3,
    stat:  { val: 92, unit: "K inferences/sec — recommendations, finance, forecasting" },
    desc:  "AI that discovers hidden patterns in numbers to predict, rank, and recommend.",
    tasks: ["Recommend movies, songs, products", "Forecast weather and stock prices", "Flag fraudulent transactions in real-time", "Score credit risk from spending patterns", "Personalise ads to individual users"],
    apps:  [
      { name: "Netflix",     cat: "Recommendation" },
      { name: "Spotify",     cat: "Discovery"      },
      { name: "PayPal Fraud",cat: "Security"       },
      { name: "Google Ads",  cat: "Targeting"      },
    ],
  },
}

// ── Bezier helpers ────────────────────────────────────────────────────────────

function cubicPt(
  x0: number, y0: number, cx1: number, cy1: number,
  cx2: number, cy2: number, x3: number, y3: number, t: number
): [number, number] {
  const mt = 1 - t
  return [
    mt*mt*mt*x0 + 3*mt*mt*t*cx1 + 3*mt*t*t*cx2 + t*t*t*x3,
    mt*mt*mt*y0 + 3*mt*mt*t*cy1 + 3*mt*t*t*cy2 + t*t*t*y3,
  ]
}

function bezierKeyframes(g: typeof DOMAIN_GEO["nlp"], steps = 12) {
  const pts = Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1)
    return cubicPt(CX, CY, g.cp1[0], g.cp1[1], g.cp2[0], g.cp2[1], g.cx, g.cy, t)
  })
  return { xs: pts.map(p => p[0]), ys: pts.map(p => p[1]) }
}

// Pre-compute keyframes for each domain's bezier path
const KF = {
  nlp:  bezierKeyframes(DOMAIN_GEO.nlp),
  cv:   bezierKeyframes(DOMAIN_GEO.cv),
  data: bezierKeyframes(DOMAIN_GEO.data),
}

// ── Hexagon helper ────────────────────────────────────────────────────────────

function hexPts(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6  // pointy-top
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(" ")
}

// ── Particle component ────────────────────────────────────────────────────────

function Particle({
  domain, idx, speed,
}: { domain: Domain; idx: number; speed: number }) {
  const kf   = KF[domain]
  const meta = DOMAIN_META[domain]
  const delay = (idx * 0.72) / speed   // stagger the 3 particles

  const opacity = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0]

  return (
    <motion.circle
      r={3.5}
      fill={meta.color}
      filter="url(#particle-blur)"
      animate={{
        cx: kf.xs,
        cy: kf.ys,
        opacity,
      }}
      transition={{
        duration: 2 / speed,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimAIDomains() {
  const [active, setActive]   = useState<Domain>("nlp")
  const [speed,  setSpeed]    = useState(1)
  const [counter, setCounter] = useState(DOMAIN_META.nlp.stat.val)
  const [autoPlay, setAutoPlay] = useState(true)

  // auto-cycle between domains
  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setActive(prev => {
        const idx = ORDER.indexOf(prev)
        return ORDER[(idx + 1) % ORDER.length]
      })
    }, 4500)
    return () => clearInterval(id)
  }, [autoPlay])

  // animate counter toward target value
  useEffect(() => {
    const target = DOMAIN_META[active].stat.val
    let current  = counter
    const step   = (target - current) / 20
    const id     = setInterval(() => {
      current += step
      if (Math.abs(current - target) < 0.5) {
        setCounter(target)
        clearInterval(id)
      } else {
        setCounter(Math.round(current))
      }
    }, 40)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const handleDomainClick = useCallback((d: Domain) => {
    setAutoPlay(false)
    setActive(d)
  }, [])

  const meta = DOMAIN_META[active]
  const geo  = DOMAIN_GEO[active]

  return (
    <div className="grid md:grid-cols-2">

      {/* ── SVG Canvas ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex items-center justify-center min-h-72 overflow-hidden">

        {/* radial gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, #0D1829 0%, #060A12 100%)" }}
        />

        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" aria-hidden>
          <defs>
            <pattern id="adots2" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#60A5FA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adots2)" />
        </svg>

        {/* main SVG */}
        <svg
          viewBox="0 0 400 370"
          className="relative z-10 w-full max-w-xs px-4"
        >
          <defs>
            {/* glow filter for particles */}
            <filter id="particle-blur" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* glow filter for active hex */}
            <filter id="hex-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* subtle glow for center hub */}
            <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── bezier connection paths (background layer) ── */}
          {ORDER.map(key => {
            const g  = DOMAIN_GEO[key]
            const m  = DOMAIN_META[key]
            const ia = key === active
            const d  = `M ${CX} ${CY} C ${g.cp1[0]} ${g.cp1[1]}, ${g.cp2[0]} ${g.cp2[1]}, ${g.cx} ${g.cy}`
            return (
              <motion.path
                key={key}
                d={d}
                fill="none"
                animate={{
                  stroke:      ia ? m.color : "#1E293B",
                  strokeWidth: ia ? 1.5     : 1,
                  opacity:     ia ? 0.7     : 0.25,
                }}
                transition={{ duration: 0.4 }}
              />
            )
          })}

          {/* ── particles along active domain path ── */}
          <AnimatePresence>
            {[0, 1, 2].map(i => (
              <Particle key={`${active}-${i}`} domain={active} idx={i} speed={speed} />
            ))}
          </AnimatePresence>

          {/* ── central AI hub ── */}
          {/* outer pulse ring */}
          <motion.circle
            cx={CX} cy={CY} r={34}
            fill="none" stroke={meta.color} strokeWidth={1}
            animate={{ r: [34, 60, 34], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* second slower pulse */}
          <motion.circle
            cx={CX} cy={CY} r={34}
            fill="none" stroke={meta.color} strokeWidth={0.5}
            animate={{ r: [34, 80, 34], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          {/* hub fill */}
          <motion.circle
            cx={CX} cy={CY} r={34}
            animate={{ fill: meta.dark, stroke: meta.color, strokeWidth: 2 }}
            transition={{ duration: 0.4 }}
            filter="url(#hub-glow)"
          />
          {/* hub border ring */}
          <motion.circle
            cx={CX} cy={CY} r={34}
            fill="none"
            animate={{ stroke: meta.color, strokeWidth: 2 }}
            transition={{ duration: 0.4 }}
          />
          {/* hub text */}
          <text
            x={CX} y={CY - 6}
            textAnchor="middle" dominantBaseline="middle"
            fill="#F1F5F9" fontSize={9} fontWeight="800" letterSpacing="0.12em"
          >
            AI
          </text>
          <text
            x={CX} y={CY + 7}
            textAnchor="middle" dominantBaseline="middle"
            fill="#64748B" fontSize={7} fontWeight="600"
          >
            CORE
          </text>

          {/* ── domain nodes ── */}
          {ORDER.map(key => {
            const g  = DOMAIN_GEO[key]
            const m  = DOMAIN_META[key]
            const ia = key === active
            return (
              <motion.g
                key={key}
                style={{ cursor: "pointer" }}
                onClick={() => handleDomainClick(key)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {/* glow halo when active */}
                {ia && (
                  <motion.polygon
                    points={hexPts(g.cx, g.cy, 34)}
                    fill={m.color} fillOpacity={0.08}
                    filter="url(#hex-glow)"
                    animate={{ fillOpacity: [0.08, 0.2, 0.08] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* hexagon background */}
                <motion.polygon
                  points={hexPts(g.cx, g.cy, 28)}
                  animate={{
                    fill:   ia ? m.dark   : "#0D1829",
                    stroke: ia ? m.color  : "#1E293B",
                    strokeWidth: ia ? 2 : 1.5,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* domain label */}
                <text
                  x={g.cx} y={g.cy}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={ia ? m.color : "#475569"}
                  fontSize={8} fontWeight="800"
                >
                  {m.short}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Speed control overlay */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          <span className="text-[10px] text-slate-500">Speed</span>
          <select
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 rounded px-1.5 py-0.5"
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col">

        {/* domain toggle tabs */}
        <div className="flex border-b border-gray-100">
          {ORDER.map(key => {
            const m  = DOMAIN_META[key]
            const ia = key === active
            return (
              <button
                key={key}
                onClick={() => handleDomainClick(key)}
                className="flex-1 py-2.5 text-xs font-bold transition-all relative"
                style={ia ? { color: m.color } : { color: "#94A3B8" }}
              >
                {m.short}
                {ia && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: m.color }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {/* header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <meta.Icon size={16} style={{ color: meta.color }} />
                  <h3 className="font-sora font-bold text-gray-900 text-sm leading-tight">{meta.label}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{meta.desc}</p>
              </div>

              {/* live counter */}
              <div className="rounded-xl px-3.5 py-2.5 flex items-center justify-between bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Global activity
                  </p>
                  <p className="text-[11px] leading-snug mt-0.5 text-gray-500">
                    {meta.stat.unit}
                  </p>
                </div>
                <motion.span
                  key={`${active}-${counter}`}
                  initial={{ scale: 1.15 }} animate={{ scale: 1 }}
                  className="text-2xl font-bold font-sora shrink-0"
                  style={{ color: meta.color }}
                >
                  {counter}K
                </motion.span>
              </div>

              {/* tasks */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: meta.color }}>
                  What it enables
                </p>
                <ul className="space-y-1.5">
                  {meta.tasks.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="shrink-0 mt-0.5 font-bold" style={{ color: meta.color }}>›</span>
                      {t}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* real apps */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Real examples</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {meta.apps.map(({ name, cat }) => (
                    <div
                      key={name}
                      className="rounded-lg px-2.5 py-1.5 border border-gray-100 bg-gray-50"
                    >
                      <p className="text-[11px] font-semibold leading-tight text-gray-800">{name}</p>
                      <p className="text-[10px] leading-tight text-gray-400 mt-0.5">{cat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* auto-play hint */}
              {autoPlay ? (
                <p className="text-[10px] text-gray-300 text-center italic">auto-cycling · click a tab to pause</p>
              ) : (
                <button
                  onClick={() => setAutoPlay(true)}
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
