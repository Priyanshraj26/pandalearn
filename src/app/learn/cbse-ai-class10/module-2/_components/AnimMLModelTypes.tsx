"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const ML_TYPES = [
  {
    id: "supervised",
    label: "Supervised Learning",
    color: "#3B82F6",
    icon: "🏷️",
    tagline: "Learn from labeled examples",
    description: "The model is trained on labeled data where both inputs (features) and outputs (labels) are provided. Like learning with a teacher who shows you the right answers.",
    analogy: "A child learning to identify fruits by a teacher pointing: 'This is an apple, this is a banana.'",
    subtypes: [
      { name: "Classification", desc: "Predicts a category/class. E.g., spam or not spam, cat or dog.", example: "Email spam filter" },
      { name: "Regression", desc: "Predicts a continuous number. E.g., house price, temperature.", example: "Predicting house prices" },
    ],
    cases: [
      { scenario: "Social media recognises your friend in a tagged photo album", answer: "Supervised — tagged photos are labels", correct: true },
      { scenario: "Grouping similar news articles together", answer: "Not supervised — no predefined labels", correct: false },
    ],
  },
  {
    id: "unsupervised",
    label: "Unsupervised Learning",
    color: "#10B981",
    icon: "🔍",
    tagline: "Discover hidden patterns",
    description: "The model works with unlabeled data and discovers patterns, similarities, and groupings on its own. Like exploring without a guide.",
    analogy: "A child learning to swim on their own without any supervision — discovering techniques through self-exploration.",
    subtypes: [
      { name: "Clustering", desc: "Groups similar data points together. E.g., customer segmentation.", example: "Grouping grocery shoppers" },
      { name: "Association", desc: "Finds relationships between items. E.g., 'people who buy X also buy Y.'", example: "Market basket analysis" },
    ],
    cases: [
      { scenario: "Netflix recommending movies based on watch history", answer: "Unsupervised — discovers similar tastes without labels", correct: true },
      { scenario: "Bank flagging suspicious transactions (fraud not pre-defined)", answer: "Unsupervised — identifies anomalies without labels", correct: true },
    ],
  },
  {
    id: "reinforcement",
    label: "Reinforcement Learning",
    color: "#F97316",
    icon: "🎮",
    tagline: "Learn by trial and error",
    description: "The model learns through repeated trial-and-error, receiving rewards for correct actions and penalties for wrong ones. No labeled data needed — just a reward signal.",
    analogy: "A child guessing fruits: guesses 'cherry' for an apple (negative feedback), then guesses 'apple' (positive feedback) — learns from the reward.",
    subtypes: [
      { name: "Model-Based", desc: "Agent builds a model of the environment to plan ahead.", example: "Chess AI (AlphaGo)" },
      { name: "Model-Free", desc: "Agent learns directly from experience without building an environment model.", example: "Self-parking car" },
    ],
    cases: [
      { scenario: "An AI agent learning to play a game by winning and losing", answer: "Reinforcement — learns through reward/penalty", correct: true },
      { scenario: "A robot learning to walk by falling and adjusting", answer: "Reinforcement — trial and error with feedback", correct: true },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimMLModelTypes() {
  const [activeType, setActiveType] = useState(0)
  const [caseResults, setCaseResults] = useState<Record<string, boolean | null>>({})

  const ml = ML_TYPES[activeType]

  function checkCase(typeId: string, caseIdx: number, isCorrect: boolean) {
    const key = `${typeId}-${caseIdx}`
    setCaseResults(prev => ({ ...prev, [key]: isCorrect }))
  }

  return (
    <div className="grid md:grid-cols-[1fr_300px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Canvas ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">

        {/* Type tabs */}
        <div className="flex gap-2 mb-6">
          {ML_TYPES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveType(i)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: i === activeType ? t.color : t.color + "15",
                color: i === activeType ? "#fff" : t.color,
                border: `1px solid ${i === activeType ? t.color : t.color + "25"}`,
              }}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={ml.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex-1 space-y-4"
          >
            {/* Data flow animation */}
            <div className="p-4 rounded-xl border" style={{ borderColor: ml.color + "30", background: ml.color + "08" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{ml.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{ml.label}</p>
                  <p className="text-xs text-white/50">{ml.tagline}</p>
                </div>
              </div>

              {/* Animated data flow */}
              <svg viewBox="0 0 360 80" className="w-full">
                {/* Input */}
                <rect x="10" y="20" width="70" height="40" rx="8" fill={ml.color + "20"} stroke={ml.color + "40"} strokeWidth="1" />
                <text x="45" y="43" textAnchor="middle" fill={ml.color} className="text-[8px] font-bold">Input Data</text>

                {/* Arrow 1 */}
                <line x1="85" y1="40" x2="130" y2="40" stroke={ml.color + "60"} strokeWidth="1" strokeDasharray="3 3">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
                </line>

                {/* Model box */}
                <rect x="135" y="15" width="90" height="50" rx="10" fill={ml.color + "15"} stroke={ml.color} strokeWidth="1.5" />
                <text x="180" y="38" textAnchor="middle" fill="#fff" className="text-[8px] font-bold">ML Model</text>
                <text x="180" y="50" textAnchor="middle" fill={ml.color} className="text-[7px]">{ml.label.split(" ")[0]}</text>

                {/* Arrow 2 */}
                <line x1="230" y1="40" x2="275" y2="40" stroke={ml.color + "60"} strokeWidth="1" strokeDasharray="3 3">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
                </line>

                {/* Output */}
                <rect x="280" y="20" width="70" height="40" rx="8" fill="#10B98120" stroke="#10B98140" strokeWidth="1" />
                <text x="315" y="43" textAnchor="middle" fill="#10B981" className="text-[8px] font-bold">Output</text>

                {/* Animated particle */}
                <circle r="3" fill={ml.color}>
                  <animateMotion dur="2s" repeatCount="indefinite" path="M 45 40 L 180 40 L 315 40" />
                </circle>
              </svg>
            </div>

            {/* Subtypes */}
            <div className="grid grid-cols-2 gap-3">
              {ml.subtypes.map((st, i) => (
                <motion.div
                  key={st.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="p-3 rounded-xl border"
                  style={{ borderColor: ml.color + "25", background: ml.color + "08" }}
                >
                  <p className="text-xs font-bold text-white mb-0.5">{st.name}</p>
                  <p className="text-[11px] text-white/50 leading-snug mb-1.5">{st.desc}</p>
                  <p className="text-[10px] font-semibold" style={{ color: ml.color }}>e.g. {st.example}</p>
                </motion.div>
              ))}
            </div>

            {/* Test yourself cases */}
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Test Yourself</p>
              {ml.cases.map((c, ci) => {
                const key = `${ml.id}-${ci}`
                const result = caseResults[key]
                return (
                  <div key={ci} className="mb-3 last:mb-0">
                    <p className="text-xs text-white/80 mb-2">{c.scenario}</p>
                    {result === undefined || result === null ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => checkCase(ml.id, ci, c.correct)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                        >
                          {ml.label.split(" ")[0]}
                        </button>
                        <button
                          onClick={() => checkCase(ml.id, ci, !c.correct)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 transition-colors"
                        >
                          Not {ml.label.split(" ")[0]}
                        </button>
                      </div>
                    ) : (
                      <div className={`p-2 rounded-lg text-xs ${result ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
                        {result ? "✓ Correct! " : "✗ Not quite. "}{c.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={ml.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ML Type {activeType + 1} of 3</p>
            <h3 className="font-sora font-bold text-sm mb-2" style={{ color: ml.color }}>{ml.label}</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{ml.description}</p>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 mb-4">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Analogy</p>
              <p className="text-xs text-amber-800 leading-relaxed">{ml.analogy}</p>
            </div>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sub-Categories</p>
            <div className="space-y-2">
              {ml.subtypes.map(st => (
                <div key={st.name} className="p-2.5 rounded-lg border border-gray-200 bg-gray-50">
                  <p className="text-xs font-bold text-gray-800">{st.name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{st.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ML Family Summary</p>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-600"><strong>Supervised</strong> — determine relationships through training</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-gray-600"><strong>Unsupervised</strong> — discover new patterns from data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-gray-600"><strong>Reinforcement</strong> — learn by rewarding actions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
