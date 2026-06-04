"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    color: "#3B82F6",
    radius: 140,
    description: "The broadest field — any technique that enables computers to mimic human intelligence. Includes rule-based systems, expert systems, and more.",
    examples: ["Siri / Alexa", "Chess engines", "Rule-based spam filters", "Recommendation systems"],
    keyDiff: "AI can include hand-coded rules — no learning required.",
  },
  {
    id: "ml",
    label: "Machine Learning",
    color: "#F97316",
    radius: 100,
    description: "A subset of AI where systems learn from data automatically without being explicitly programmed. The machine improves with more data.",
    examples: ["Email spam classifier", "Netflix recommendations", "Fraud detection", "Medical diagnosis"],
    keyDiff: "ML learns from data — rules are discovered, not programmed.",
  },
  {
    id: "dl",
    label: "Deep Learning",
    color: "#7C3AED",
    radius: 60,
    description: "A subset of ML using neural networks with multiple hidden layers. Excels at processing unstructured data like images, audio, and text.",
    examples: ["ChatGPT", "Self-driving cars", "Face recognition", "Language translation"],
    keyDiff: "DL uses deep neural networks — works best with massive datasets.",
  },
]

const TERMINOLOGIES = [
  { term: "Features", desc: "Input characteristics the model uses to make predictions (e.g., weight, color, size)." },
  { term: "Labels", desc: "The target output the model tries to predict (e.g., 'cat' or 'dog')." },
  { term: "Training Data", desc: "Labeled data used to teach the model to recognise patterns." },
  { term: "Test Data", desc: "Unseen data used to evaluate how well the model generalises." },
  { term: "Model", desc: "The learned mathematical function that maps features to labels." },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimAIMLDL() {
  const [active, setActive] = useState(0)
  const layer = LAYERS[active]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: SVG Canvas ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        <svg viewBox="0 0 400 320" className="w-full max-w-md">
          <defs>
            {LAYERS.map(l => (
              <radialGradient key={l.id} id={`aiml-grad-${l.id}`}>
                <stop offset="0%" stopColor={l.color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={l.color} stopOpacity="0.02" />
              </radialGradient>
            ))}
          </defs>

          {/* Concentric circles */}
          {LAYERS.map((l, i) => {
            const isActive = i === active
            return (
              <g key={l.id} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                <circle
                  cx="200" cy="160" r={l.radius}
                  fill={`url(#aiml-grad-${l.id})`}
                  stroke={l.color}
                  strokeWidth={isActive ? 2.5 : 1}
                  strokeDasharray={isActive ? "none" : "4 4"}
                  opacity={isActive ? 1 : 0.6}
                />
                {isActive && (
                  <circle cx="200" cy="160" r={l.radius + 6} fill="none" stroke={l.color} strokeWidth="0.5" opacity="0.4">
                    <animate attributeName="r" values={`${l.radius + 4};${l.radius + 12};${l.radius + 4}`} dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Label */}
                <text
                  x="200"
                  y={160 - l.radius + 18}
                  textAnchor="middle"
                  fill={l.color}
                  className="text-[9px] font-bold pointer-events-none"
                  opacity={isActive ? 1 : 0.6}
                >
                  {l.label}
                </text>
              </g>
            )
          })}

          {/* Center icon */}
          <text x="200" y="165" textAnchor="middle" className="text-[28px] pointer-events-none">🧠</text>
        </svg>

        {/* Tab navigation */}
        <div className="flex gap-2 mt-4">
          {LAYERS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActive(i)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: i === active ? l.color : l.color + "18",
                color: i === active ? "#fff" : l.color,
                border: `1px solid ${i === active ? l.color : l.color + "30"}`,
              }}
            >
              {l.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Layer {active + 1} of 3</p>
            <h3 className="font-sora font-bold text-sm mb-2" style={{ color: layer.color }}>{layer.label}</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{layer.description}</p>

            <div className="mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Difference</p>
              <div className="p-3 rounded-xl border" style={{ borderColor: layer.color + "30", background: layer.color + "08" }}>
                <p className="text-xs font-semibold" style={{ color: layer.color }}>{layer.keyDiff}</p>
              </div>
            </div>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Real-World Examples</p>
            <div className="space-y-1.5">
              {layer.examples.map((ex, i) => (
                <motion.div
                  key={ex}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 text-xs text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: layer.color }} />
                  {ex}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Terminology quick-ref */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Terms</p>
          <div className="space-y-1">
            {TERMINOLOGIES.slice(0, 3).map(t => (
              <div key={t.term} className="text-[11px]">
                <span className="font-bold text-gray-700">{t.term}: </span>
                <span className="text-gray-500">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
