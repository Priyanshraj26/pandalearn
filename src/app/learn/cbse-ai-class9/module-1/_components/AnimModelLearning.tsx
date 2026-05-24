"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Network geometry ──────────────────────────────────────────────────────────

const LAYERS = [
  { id: "input",   label: "Input",     sublabel: "Raw Features",    x: 58,  color: "#60A5FA", glow: "#3B82F6", dark: "#1E3A5F" },
  { id: "hidden1", label: "Layer 1",   sublabel: "Pattern Detect",  x: 158, color: "#A78BFA", glow: "#8B5CF6", dark: "#2E1065" },
  { id: "hidden2", label: "Layer 2",   sublabel: "Deep Features",   x: 258, color: "#C084FC", glow: "#A855F7", dark: "#3B0764" },
  { id: "output",  label: "Output",    sublabel: "Prediction",      x: 345, color: "#34D399", glow: "#10B981", dark: "#064E3B" },
] as const

type LayerId = typeof LAYERS[number]["id"]

const NODE_Y: Record<LayerId, number[]> = {
  input:   [90, 140, 190],
  hidden1: [62, 99, 136, 173, 210],
  hidden2: [90, 140, 190],
  output:  [115, 165],
}

const LAYER_ORDER: LayerId[] = ["input", "hidden1", "hidden2", "output"]

const PHASE_COUNT = 4

const PHASE_INFO: {
  title:     string
  sublabel:  string
  desc:      string
  highlight: string
  layerIdx:  number
}[] = [
  {
    layerIdx:  0,
    title:     "Input Layer",
    sublabel:  "3 nodes · raw numbers",
    desc:      "Raw numerical features enter the network. Each node holds one measurement. The model doesn't understand words — only numbers.",
    highlight: "3 input features",
  },
  {
    layerIdx:  1,
    title:     "Hidden Layer 1",
    sublabel:  "5 neurons · pattern detection",
    desc:      "Neurons detect simple patterns: \"Is the symptom score above a threshold? Is age combined with blood pressure a risk signal?\"",
    highlight: "5 neurons, simple patterns",
  },
  {
    layerIdx:  2,
    title:     "Hidden Layer 2",
    sublabel:  "3 neurons · deep features",
    desc:      "Combines simpler activations into complex features. \"High age + elevated BP + high symptoms = likely disease candidate.\"",
    highlight: "3 neurons, combined features",
  },
  {
    layerIdx:  3,
    title:     "Output Layer",
    sublabel:  "2 neurons · final prediction",
    desc:      "Two neurons output probabilities that must sum to 100%. The neuron with the highest score wins — that is the model's prediction.",
    highlight: "2 neurons → final prediction",
  },
]

const FEATURES    = ["Symptom Score", "Patient Age", "Blood Pressure"]
const OUT_LABELS  = ["Disease: YES", "Disease: NO"]
const OUT_PCTS    = [87, 13]

// ── Signal particle ───────────────────────────────────────────────────────────

function SignalParticle({
  x1, y1, x2, y2, color, delay, duration,
}: {
  x1: number; y1: number; x2: number; y2: number
  color: string; delay: number; duration: number
}) {
  return (
    <motion.circle
      r={2.8}
      fill={color}
      filter="url(#ml-particle)"
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0.2] }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimModelLearning() {
  const [phase,    setPhase]    = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => setPhase(p => (p + 1) % PHASE_COUNT), 2200)
    return () => clearInterval(id)
  }, [autoPlay])

  const info           = PHASE_INFO[phase]
  const activeLayerIdx = info.layerIdx
  // connections pointing TO the active layer are "active"
  const activeSrcIdx   = activeLayerIdx - 1  // -1 when input is active → no active connections

  return (
    <div className="grid md:grid-cols-2">

      {/* ── SVG Canvas ── */}
      <div className="relative bg-[#060A12] flex items-center justify-center overflow-hidden">

        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden>
          <defs>
            <pattern id="ml-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#A78BFA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ml-grid)" />
        </svg>

        {/* network SVG */}
        <svg viewBox="0 0 400 275" className="relative z-10 w-full max-w-sm">
          <defs>
            <filter id="ml-particle" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ml-node-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Layer column labels */}
          {LAYERS.map((l, li) => (
            <g key={l.id}>
              <motion.text
                x={l.x} y={22}
                textAnchor="middle"
                animate={{ fill: li === activeLayerIdx ? l.color : "#334155" }}
                transition={{ duration: 0.3 }}
                fontSize={7.5} fontWeight="800"
              >
                {l.label}
              </motion.text>
              <motion.text
                x={l.x} y={32}
                textAnchor="middle"
                animate={{ fill: li === activeLayerIdx ? l.color : "#1E293B", opacity: li === activeLayerIdx ? 0.8 : 0.5 }}
                transition={{ duration: 0.3 }}
                fontSize={6}
              >
                {l.sublabel}
              </motion.text>
            </g>
          ))}

          {/* Connections */}
          {LAYER_ORDER.slice(0, 3).flatMap((srcId, li) => {
            const dstId = LAYER_ORDER[li + 1]
            const srcL  = LAYERS[li]
            const dstL  = LAYERS[li + 1]
            const isOn  = li === activeSrcIdx
            return NODE_Y[srcId].flatMap((sy, si) =>
              NODE_Y[dstId].map((dy, di) => (
                <motion.line
                  key={`${srcId}-${si}-${dstId}-${di}`}
                  x1={srcL.x} y1={sy} x2={dstL.x} y2={dy}
                  animate={{
                    stroke:      isOn ? dstL.color : "#1E293B",
                    opacity:     isOn ? 0.5        : 0.1,
                    strokeWidth: isOn ? 0.9        : 0.5,
                  }}
                  transition={{ duration: 0.35 }}
                />
              ))
            )
          })}

          {/* Signal particles on active layer-pair */}
          {activeSrcIdx >= 0 && activeSrcIdx <= 2 && (() => {
            const srcId = LAYER_ORDER[activeSrcIdx]
            const dstId = LAYER_ORDER[activeSrcIdx + 1]
            const srcL  = LAYERS[activeSrcIdx]
            const dstL  = LAYERS[activeSrcIdx + 1]
            const sYs   = NODE_Y[srcId]
            const dYs   = NODE_Y[dstId]
            const lanes = [
              [sYs[0],                            dYs[0]                            ],
              [sYs[Math.floor(sYs.length / 2)],   dYs[Math.floor(dYs.length / 2)]  ],
              [sYs[sYs.length - 1],               dYs[dYs.length - 1]              ],
            ] as [number, number][]
            return lanes.map(([sy, dy], i) => (
              <SignalParticle
                key={`sig-${i}`}
                x1={srcL.x} y1={sy} x2={dstL.x} y2={dy}
                color={dstL.color} delay={i * 0.3} duration={0.72}
              />
            ))
          })()}

          {/* Nodes */}
          {LAYER_ORDER.flatMap((layerId, li) => {
            const layer    = LAYERS[li]
            const isActive = li === activeLayerIdx
            return NODE_Y[layerId].map((ny, ni) => (
              <motion.g key={`${layerId}-${ni}`}>
                {/* pulse halo */}
                {isActive && (
                  <motion.circle
                    cx={layer.x} cy={ny} r={10}
                    fill={layer.color} fillOpacity={0.08}
                    filter="url(#ml-node-glow)"
                    animate={{ r: [10, 18, 10], fillOpacity: [0.08, 0.22, 0.08] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: ni * 0.12 }}
                  />
                )}
                {/* node body */}
                <motion.circle
                  cx={layer.x} cy={ny} r={8}
                  animate={{
                    fill:        isActive ? layer.dark  : "#0D1829",
                    stroke:      isActive ? layer.color : "#1E293B",
                    strokeWidth: isActive ? 2           : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* inner dot when active */}
                {isActive && (
                  <motion.circle
                    cx={layer.x} cy={ny} r={2.5}
                    fill={layer.color}
                    animate={{ opacity: [0.5, 1, 0.5], r: [2, 3, 2] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: ni * 0.16 }}
                  />
                )}
              </motion.g>
            ))
          })}

          {/* Input feature ticks */}
          {NODE_Y.input.map((ny, i) => (
            <line key={`tick-${i}`} x1={46} y1={ny} x2={50} y2={ny} stroke="#1E3A5F" strokeWidth={1} />
          ))}

          {/* Output ticks */}
          {NODE_Y.output.map((ny, i) => (
            <line key={`otick-${i}`} x1={353} y1={ny} x2={357} y2={ny} stroke="#064E3B" strokeWidth={1} />
          ))}
        </svg>

        {/* Architecture label */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span className="text-[9px] text-slate-600 font-mono tracking-wider">3 → 5 → 3 → 2 · fully connected</span>
        </div>
      </div>

      {/* ── Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-4 flex flex-col gap-3">

        {/* Phase dots */}
        <div className="flex gap-2 justify-center pt-1">
          {LAYERS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { setAutoPlay(false); setPhase(i) }}
              className="rounded-full transition-all"
              style={{
                width:      i === phase ? 18 : 8,
                height:     8,
                background: i === phase ? l.color : "#E2E8F0",
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col gap-3"
          >
            {/* badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold self-start"
              style={{
                background: LAYERS[activeLayerIdx].color + "22",
                color:      LAYERS[activeLayerIdx].color,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: LAYERS[activeLayerIdx].color }}
              />
              {info.highlight}
            </div>

            <div>
              <h3 className="font-sora font-bold text-gray-900 text-sm">{info.title}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">{info.sublabel}</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{info.desc}</p>
            </div>

            {/* Phase 0: feature list */}
            {phase === 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Input features</p>
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: LAYERS[0].color }} />
                    <span className="text-xs text-gray-600">{f}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Phase 3: prediction output */}
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 space-y-2.5"
              >
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Prediction</p>
                {OUT_LABELS.map((label, i) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{label}</span>
                      <span className="font-bold text-emerald-700">{OUT_PCTS[i]}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${OUT_PCTS[i]}%` }}
                        transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: i === 0 ? "#34D399" : "#94A3B8" }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* auto-play toggle */}
        {autoPlay ? (
          <p className="text-[10px] text-gray-300 text-center italic">signal propagating · click dot to pause</p>
        ) : (
          <button
            onClick={() => setAutoPlay(true)}
            className="text-[10px] text-gray-400 hover:text-gray-600 text-center italic transition-colors"
          >
            resume animation ›
          </button>
        )}
      </div>
    </div>
  )
}
