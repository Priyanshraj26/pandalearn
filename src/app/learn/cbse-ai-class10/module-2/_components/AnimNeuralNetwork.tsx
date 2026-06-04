"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const INPUTS = [
  { id: "jacket",   label: "Have Jacket?",   weight: 0.5 },
  { id: "umbrella", label: "Have Umbrella?",  weight: 0.3 },
  { id: "sunny",    label: "Is it Sunny?",    weight: 0.4 },
  { id: "forecast", label: "Forecast OK?",    weight: 0.3 },
]

const BIAS = 1
const BIAS_WEIGHT = -1.0
const THRESHOLD = 0

const PRESETS = [
  {
    name: "Scenario A: Nice day, well prepared",
    values: { jacket: 1, umbrella: 1, sunny: 1, forecast: 1 },
  },
  {
    name: "Scenario B: No jacket, has umbrella, not sunny",
    values: { jacket: 0, umbrella: 1, sunny: 0, forecast: 1 },
  },
  {
    name: "Scenario C: Only jacket, cloudy forecast",
    values: { jacket: 1, umbrella: 0, sunny: 0, forecast: 0 },
  },
]

// ── Architecture positions ───────────────────────────────────────────────────

const LAYER_X = [60, 200, 340]

function nodeY(layerSize: number, index: number, totalHeight: number = 240, offset: number = 40) {
  const spacing = totalHeight / (layerSize + 1)
  return offset + spacing * (index + 1)
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimNeuralNetwork() {
  const [inputValues, setInputValues] = useState<Record<string, number>>({
    jacket: 1, umbrella: 1, sunny: 1, forecast: 1,
  })
  const [phase, setPhase] = useState<"input" | "compute" | "result">("input")
  const [animating, setAnimating] = useState(false)

  const sum = INPUTS.reduce((acc, inp) => acc + inputValues[inp.id] * inp.weight, 0) + BIAS * BIAS_WEIGHT
  const output = sum > THRESHOLD
  const decision = output ? "Go to the park! 🌳" : "Stay home! 🏠"

  const compute = useCallback(() => {
    setPhase("compute")
    setAnimating(true)
    setTimeout(() => {
      setPhase("result")
      setAnimating(false)
    }, 2000)
  }, [])

  function reset() {
    setPhase("input")
    setAnimating(false)
  }

  function applyPreset(preset: typeof PRESETS[0]) {
    setInputValues(preset.values)
    setPhase("input")
    setAnimating(false)
  }

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Network Visualization ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">

        <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto flex-1">
          <defs>
            <filter id="nn-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Layer labels */}
          <text x={LAYER_X[0]} y="25" textAnchor="middle" fill="#9CA3AF" className="text-[8px] font-bold">INPUT</text>
          <text x={LAYER_X[1]} y="25" textAnchor="middle" fill="#9CA3AF" className="text-[8px] font-bold">WEIGHTS</text>
          <text x={LAYER_X[2]} y="25" textAnchor="middle" fill="#9CA3AF" className="text-[8px] font-bold">OUTPUT</text>

          {/* Connections: input → sum node */}
          {INPUTS.map((inp, i) => {
            const y1 = nodeY(INPUTS.length, i)
            const isActive = inputValues[inp.id] === 1
            return (
              <g key={inp.id}>
                <line
                  x1={LAYER_X[0] + 20} y1={y1}
                  x2={LAYER_X[1] - 20} y2={nodeY(1, 0, 240, 40)}
                  stroke={isActive ? "#3B82F6" : "#374151"}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  opacity={isActive ? 0.6 : 0.2}
                />
                {/* Weight label */}
                <text
                  x={LAYER_X[0] + 50}
                  y={y1 + (nodeY(1, 0, 240, 40) - y1) * 0.3 - 4}
                  fill={isActive ? "#60A5FA" : "#4B5563"}
                  className="text-[7px]"
                  textAnchor="middle"
                >
                  w={inp.weight}
                </text>

                {/* Signal particle */}
                {(phase === "compute" || phase === "result") && isActive && (
                  <circle r="3" fill="#3B82F6" filter="url(#nn-glow)">
                    <animateMotion
                      dur="1s"
                      fill="freeze"
                      path={`M ${LAYER_X[0] + 20} ${y1} L ${LAYER_X[1] - 20} ${nodeY(1, 0, 240, 40)}`}
                    />
                  </circle>
                )}
              </g>
            )
          })}

          {/* Bias connection */}
          <line
            x1={LAYER_X[1]} y1={nodeY(1, 0, 240, 40) + 28}
            x2={LAYER_X[1]} y2={nodeY(1, 0, 240, 40) + 16}
            stroke="#F59E0B60" strokeWidth="1"
          />
          <rect x={LAYER_X[1] - 18} y={nodeY(1, 0, 240, 40) + 28} width="36" height="18" rx="4" fill="#F59E0B15" stroke="#F59E0B40" strokeWidth="0.8" />
          <text x={LAYER_X[1]} y={nodeY(1, 0, 240, 40) + 40} textAnchor="middle" fill="#F59E0B" className="text-[7px] font-bold">Bias: 1</text>

          {/* Sum → Output connection */}
          <line
            x1={LAYER_X[1] + 20} y1={nodeY(1, 0, 240, 40)}
            x2={LAYER_X[2] - 20} y2={nodeY(1, 0, 240, 40)}
            stroke={phase === "result" ? (output ? "#10B981" : "#EF4444") : "#37415150"}
            strokeWidth={phase === "result" ? 2 : 1}
          />
          {phase === "result" && (
            <circle r="3" fill={output ? "#10B981" : "#EF4444"} filter="url(#nn-glow)">
              <animateMotion
                dur="0.8s"
                fill="freeze"
                path={`M ${LAYER_X[1] + 20} ${nodeY(1, 0, 240, 40)} L ${LAYER_X[2] - 20} ${nodeY(1, 0, 240, 40)}`}
              />
            </circle>
          )}

          {/* Input nodes */}
          {INPUTS.map((inp, i) => {
            const y = nodeY(INPUTS.length, i)
            const val = inputValues[inp.id]
            return (
              <g key={inp.id} onClick={() => phase === "input" && setInputValues(prev => ({ ...prev, [inp.id]: prev[inp.id] === 1 ? 0 : 1 }))} style={{ cursor: phase === "input" ? "pointer" : "default" }}>
                <circle cx={LAYER_X[0]} cy={y} r="16" fill={val ? "#3B82F620" : "#1F293720"} stroke={val ? "#3B82F6" : "#4B5563"} strokeWidth="1.5" />
                <text x={LAYER_X[0]} y={y + 1} textAnchor="middle" fill={val ? "#60A5FA" : "#6B7280"} className="text-[9px] font-bold pointer-events-none">
                  {val}
                </text>
                <text x={LAYER_X[0]} y={y - 22} textAnchor="middle" fill="#9CA3AF" className="text-[7px] pointer-events-none">
                  {inp.label}
                </text>
              </g>
            )
          })}

          {/* Sum node */}
          <circle cx={LAYER_X[1]} cy={nodeY(1, 0, 240, 40)} r="16" fill="#F9731620" stroke="#F97316" strokeWidth="1.5" />
          <text x={LAYER_X[1]} y={nodeY(1, 0, 240, 40) + 1} textAnchor="middle" fill="#F97316" className="text-[9px] font-bold">
            Σ
          </text>
          {phase !== "input" && (
            <text x={LAYER_X[1]} y={nodeY(1, 0, 240, 40) - 22} textAnchor="middle" fill="#F97316" className="text-[8px]">
              sum = {sum.toFixed(1)}
            </text>
          )}

          {/* Output node */}
          <circle
            cx={LAYER_X[2]} cy={nodeY(1, 0, 240, 40)} r="18"
            fill={phase === "result" ? (output ? "#10B98120" : "#EF444420") : "#1F293720"}
            stroke={phase === "result" ? (output ? "#10B981" : "#EF4444") : "#4B5563"}
            strokeWidth="1.5"
          />
          <text
            x={LAYER_X[2]} y={nodeY(1, 0, 240, 40) + 1}
            textAnchor="middle"
            fill={phase === "result" ? (output ? "#10B981" : "#EF4444") : "#6B7280"}
            className="text-[9px] font-bold"
          >
            {phase === "result" ? (output ? "Yes" : "No") : "?"}
          </text>
        </svg>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {phase === "input" ? (
            <button
              onClick={compute}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 text-white hover:bg-orange-400 transition-colors"
            >
              ⚡ Compute Output
            </button>
          ) : (
            <button
              onClick={reset}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            >
              ↻ Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Neural Network</p>
        <h3 className="font-sora font-bold text-sm text-gray-900 mb-2">Should I Go to the Park?</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          Click input nodes to toggle values (0/1), then press <strong>Compute</strong> to see
          how the neural network calculates a decision using weights, bias, and a threshold.
        </p>

        <div className="space-y-2 mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Formula</p>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-[11px] text-gray-700">
            <p>Output = Σ(input × weight) + bias</p>
            <p className="mt-1">If Output {">"} 0 → <span className="text-emerald-600 font-bold">Go!</span></p>
            <p>If Output ≤ 0 → <span className="text-rose-600 font-bold">Stay</span></p>
          </div>
        </div>

        {phase === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl border mb-4 ${output ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}
          >
            <p className={`text-sm font-bold ${output ? "text-emerald-700" : "text-rose-700"}`}>{decision}</p>
            <p className="text-xs text-gray-600 mt-1">Sum = {sum.toFixed(1)} {">"} threshold (0) = {output.toString()}</p>
          </motion.div>
        )}

        {/* Presets */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Try Presets</p>
          <div className="space-y-1.5">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-orange-50 hover:text-orange-700 transition-colors border border-transparent hover:border-orange-200"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
