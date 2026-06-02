"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type StepKey = "scope" | "acquire" | "explore" | "model" | "evaluate" | "deploy"

const STEPS: {
  key:      StepKey
  num:      string
  title:    string
  short:    string
  color:    string
  border:   string
  desc:     string
  bullets:  string[]
  question: string
  cx:       number
  cy:       number
}[] = [
  {
    key:    "scope",
    num:    "01",
    title:  "Problem Scoping",
    short:  "Scope",
    color:  "#7C3AED",
    border: "#6D28D9",
    desc:   "Define exactly what problem AI needs to solve. A poorly scoped problem = a useless model.",
    bullets: ["Use the 4Ws Canvas (Who, What, Where, When)", "Set clear goals and success criteria", "List stakeholders involved", "Think about ethical implications early"],
    question: "What problem do we need to solve?",
    cx: 200, cy: 52,
  },
  {
    key:    "acquire",
    num:    "02",
    title:  "Data Acquisition",
    short:  "Data",
    color:  "#2563EB",
    border: "#1D4ED8",
    desc:   "Gather the data your model needs. No data = no AI. Bad data = bad AI.",
    bullets: ["Identify data types: structured vs unstructured", "Find reliable data sources", "Decide collection frequency", "Handle missing / noisy data"],
    question: "What data do we need and where will we get it?",
    cx: 335, cy: 137,
  },
  {
    key:    "explore",
    num:    "03",
    title:  "Data Exploration",
    short:  "Explore",
    color:  "#0891B2",
    border: "#0E7490",
    desc:   "Visualise and understand patterns in your data before training any model.",
    bullets: ["Choose the right graph (bar, pie, scatter, line)", "Spot outliers and anomalies", "Understand feature relationships", "Create data dashboards"],
    question: "What patterns hide in our data?",
    cx: 335, cy: 255,
  },
  {
    key:    "model",
    num:    "04",
    title:  "Modeling",
    short:  "Model",
    color:  "#059669",
    border: "#047857",
    desc:   "Build the AI. Two main approaches: follow rules (explicit) or learn from examples (implicit).",
    bullets: ["Rule-based: humans write the rules", "Learning-based: AI learns patterns from data", "Choose model type based on your data", "Train → test → refine"],
    question: "How will the AI make decisions?",
    cx: 200, cy: 330,
  },
  {
    key:    "evaluate",
    num:    "05",
    title:  "Evaluation",
    short:  "Eval",
    color:  "#D97706",
    border: "#B45309",
    desc:   "Test how well your model performs. Numbers tell the truth  feelings don't.",
    bullets: ["True Positive / False Positive", "True Negative / False Negative", "Accuracy, Precision, Recall", "Is it good enough to deploy?"],
    question: "How accurate is the model?",
    cx: 65,  cy: 255,
  },
  {
    key:    "deploy",
    num:    "06",
    title:  "Deployment",
    short:  "Deploy",
    color:  "#DC2626",
    border: "#B91C1C",
    desc:   "Release the AI into the real world and monitor it continuously.",
    bullets: ["Choose: mobile app, web, API, embedded device", "Monitor for performance drift", "Collect feedback from real users", "Cycle back to improve → iterative!"],
    question: "How do users access the AI?",
    cx: 65,  cy: 137,
  },
]

function arrowPts(x1: number, y1: number, x2: number, y2: number, size = 8): string {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 0.01) return "0,0 0,0 0,0"
  const ux = dx / len, uy = dy / len
  const px = -uy, py = ux
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const tip = `${(mx + ux * size * 0.55).toFixed(1)},${(my + uy * size * 0.55).toFixed(1)}`
  const bl  = `${(mx - ux * size * 0.45 + px * size * 0.45).toFixed(1)},${(my - uy * size * 0.45 + py * size * 0.45).toFixed(1)}`
  const br  = `${(mx - ux * size * 0.45 - px * size * 0.45).toFixed(1)},${(my - uy * size * 0.45 - py * size * 0.45).toFixed(1)}`
  return `${tip} ${bl} ${br}`
}

const ARROWS: [StepKey, StepKey][] = [
  ["scope",    "acquire"],
  ["acquire",  "explore"],
  ["explore",  "model"  ],
  ["model",    "evaluate"],
  ["evaluate", "deploy" ],
  ["deploy",   "scope"  ],
]

export default function AnimProjectCycle() {
  const [active, setActive] = useState<StepKey>("scope")
  const [auto,   setAuto]   = useState(true)

  useEffect(() => {
    if (!auto) return
    const keys = STEPS.map(s => s.key)
    const id = setInterval(() => {
      setActive(prev => {
        const idx = keys.indexOf(prev)
        return keys[(idx + 1) % keys.length]
      })
    }, 3200)
    return () => clearInterval(id)
  }, [auto])

  const step = STEPS.find(s => s.key === active)!

  return (
    <div className="grid md:grid-cols-2">

      {/* ── SVG canvas ── */}
      <div className="relative bg-[#080C14] flex items-center justify-center min-h-80 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden>
          <defs>
            <pattern id="pcdots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#475569" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pcdots)" />
        </svg>

        <svg viewBox="0 0 400 382" className="relative z-10 w-full max-w-92.5 px-4">

          {/* ── arrows between steps ── */}
          {ARROWS.map(([a, b]) => {
            const sa = STEPS.find(s => s.key === a)!
            const sb = STEPS.find(s => s.key === b)!
            const isActive = a === active || b === active
            const dx = sb.cx - sa.cx, dy = sb.cy - sa.cy
            const len = Math.sqrt(dx * dx + dy * dy)
            const nx = dx / len, ny = dy / len
            const R = 28
            const x1 = sa.cx + nx * R, y1 = sa.cy + ny * R
            const x2 = sb.cx - nx * R, y2 = sb.cy - ny * R
            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
            return (
              <motion.g key={`${a}-${b}`}>
                <motion.line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  animate={{ stroke: isActive ? step.color : "#1E293B", opacity: isActive ? 0.7 : 0.25 }}
                  transition={{ duration: 0.35 }}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {/* arrowhead */}
                <motion.polygon
                  points={arrowPts(x1, y1, x2, y2, 8)}
                  animate={{ fill: isActive ? step.color : "#334155", opacity: isActive ? 0.9 : 0.3 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.g>
            )
          })}

          {/* ── step nodes ── */}
          {STEPS.map(s => {
            const isActive = s.key === active
            return (
              <motion.g
                key={s.key}
                style={{ cursor: "pointer" }}
                onClick={() => { setAuto(false); setActive(s.key) }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                {isActive && (
                  <motion.circle
                    cx={s.cx} cy={s.cy} r={28}
                    fill="none" stroke={s.color} strokeWidth={2}
                    animate={{ r: [28, 46, 28], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                )}
                <motion.circle
                  cx={s.cx} cy={s.cy} r={28}
                  animate={{
                    fill:        isActive ? "#0F172A"  : "#0D1220",
                    stroke:      isActive ? s.color    : "#1E293B",
                    strokeWidth: isActive ? 2.5        : 1.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <text
                  x={s.cx} y={s.cy - 6}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={isActive ? s.color : "#475569"}
                  fontSize={9} fontWeight="700"
                >
                  {s.num}
                </text>
                <text
                  x={s.cx} y={s.cy + 7}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={isActive ? "#E2E8F0" : "#64748B"}
                  fontSize={7.5} fontWeight="600"
                >
                  {s.short}
                </text>
              </motion.g>
            )
          })}

          {/* ── centre label ── */}
          <circle cx={200} cy={191} r={28} fill="#0D1220" stroke="#1E293B" strokeWidth={1.5} />
          <text x={200} y={186} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={8} fontWeight="700">AI</text>
          <text x={200} y={197} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={7}>Project</text>
          <text x={200} y={206} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={7}>Cycle</text>
        </svg>
      </div>

      {/* ── info panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col gap-3 overflow-y-auto">

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 flex-1"
          >
            {/* step badge + title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: step.color + "22", color: step.color }}
                >
                  Step {step.num}
                </span>
                {auto ? (
                  <span className="text-[10px] text-gray-400 italic">auto-cycling · click to pause</span>
                ) : (
                  <button
                    onClick={() => setAuto(true)}
                    className="text-[10px] font-semibold transition-colors"
                    style={{ color: step.color }}
                  >
                    ▶ resume
                  </button>
                )}
              </div>
              <h3 className="font-sora font-bold text-gray-900 text-sm leading-tight">{step.title}</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{step.desc}</p>
            </div>

            {/* key question */}
            <div
              className="rounded-xl px-3 py-2.5 text-xs font-semibold italic leading-snug"
              style={{ background: step.color + "15", color: step.color }}
            >
              "{step.question}"
            </div>

            {/* bullets */}
            <ul className="space-y-1.5 flex-1">
              {step.bullets.map(b => (
                <li key={b} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: step.color }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* step mini-nav */}
            <div className="flex gap-1 pt-2 border-t border-gray-100 flex-wrap">
              {STEPS.map(s => (
                <button
                  key={s.key}
                  onClick={() => { setAuto(false); setActive(s.key) }}
                  className="w-7 h-7 rounded-md text-[10px] font-bold transition-colors"
                  style={
                    s.key === active
                      ? { background: step.color, color: "#fff" }
                      : { background: "#F1F5F9", color: "#94A3B8" }
                  }
                >
                  {s.num}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
