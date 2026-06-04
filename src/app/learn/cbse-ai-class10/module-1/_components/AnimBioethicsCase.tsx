"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    id: "autonomy",
    label: "Autonomy",
    icon: "🧭",
    color: "#3B82F6",
    short: "Respect individual choice and informed consent.",
    detail: "Every person has the right to make their own informed decisions about their health and data. AI systems must provide transparent information and never override patient consent.",
    caseApply: "Patients must be informed that an AI algorithm is being used and should be able to opt for human-only review. Data labels should only be released with explicit consent.",
  },
  {
    id: "nonmaleficence",
    label: "Do Not Harm",
    icon: "🛑",
    color: "#EF4444",
    short: "Avoid causing harm; choose the path of least harm.",
    detail: "Harm to anyone — human or non-human — must be avoided at all costs. If no harmless option exists, the path of least harm must always be chosen.",
    caseApply: "The AI algorithm must be trained on datasets that equitably reduce harm for ALL groups. Patients from any region or race who are less ill should not receive more intensive care than those who actually need it.",
  },
  {
    id: "beneficence",
    label: "Maximum Benefit",
    icon: "🌟",
    color: "#10B981",
    short: "Go beyond avoiding harm — actively do good.",
    detail: "Our actions should not only avoid harm but also focus on providing the maximum benefit possible. The solution should be held to clinical practice standards, not merely technological ethics standards.",
    caseApply: "The AI should not only avoid harming patients from underrepresented groups but should actively provide benefits to ALL patients. A better, unbiased training dataset must be found.",
  },
  {
    id: "justice",
    label: "Justice",
    icon: "⚖️",
    color: "#7C3AED",
    short: "Distribute benefits and burdens fairly across all.",
    detail: "All benefits and burdens of a particular choice must be distributed in a justified manner across all people, irrespective of their background, race, gender, or socioeconomic status.",
    caseApply: "Solution development requires in-depth knowledge of social structures (racism, sexism) and must actively work against those structures. The AI must be aware of social determinants of healthcare.",
  },
]

const CASE_STUDY = {
  title: "Healthcare AI: Biased Resource Allocation",
  scenario: "A hospital deploys an AI algorithm to allocate healthcare resources. The algorithm was trained primarily on data from patients in eastern regions. When deployed across all regions, patients from western areas who are equally or more ill receive fewer resources than eastern patients.",
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimBioethicsCase() {
  const [activePrinciple, setActivePrinciple] = useState(0)
  const [appliedPrinciples, setAppliedPrinciples] = useState<boolean[]>([false, false, false, false])

  const p = PRINCIPLES[activePrinciple]
  const allApplied = appliedPrinciples.every(Boolean)

  function applyPrinciple() {
    setAppliedPrinciples(prev => {
      const n = [...prev]
      n[activePrinciple] = true
      return n
    })
  }

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Canvas ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">

        {/* Case scenario header */}
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 mb-6">
          <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Case Study</p>
          <p className="text-sm font-bold text-white mb-1">{CASE_STUDY.title}</p>
          <p className="text-xs text-white/60 leading-relaxed">{CASE_STUDY.scenario}</p>
        </div>

        {/* 4 principle circles */}
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 400 280" className="w-full max-w-md">
            <defs>
              {PRINCIPLES.map(pr => (
                <radialGradient key={pr.id} id={`grad-${pr.id}`}>
                  <stop offset="0%" stopColor={pr.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={pr.color} stopOpacity="0.05" />
                </radialGradient>
              ))}
            </defs>
            {/* Center hub */}
            <circle cx="200" cy="140" r="30" fill="#080C14" stroke="#F9731640" strokeWidth="1.5" />
            <text x="200" y="136" textAnchor="middle" className="fill-white text-[8px] font-bold">Bio-</text>
            <text x="200" y="148" textAnchor="middle" className="fill-white text-[8px] font-bold">ethics</text>

            {/* Principle nodes */}
            {PRINCIPLES.map((pr, i) => {
              const angles = [Math.PI * 1.25, Math.PI * 1.75, Math.PI * 0.25, Math.PI * 0.75]
              const cx = 200 + Math.cos(angles[i]) * 100
              const cy = 140 + Math.sin(angles[i]) * 80
              const isActive = i === activePrinciple
              const isApplied = appliedPrinciples[i]

              return (
                <g key={pr.id} onClick={() => setActivePrinciple(i)} style={{ cursor: "pointer" }}>
                  {/* Connection line */}
                  <line x1="200" y1="140" x2={cx} y2={cy} stroke={pr.color + "30"} strokeWidth="1" />

                  {/* Node */}
                  {isActive && (
                    <circle cx={cx} cy={cy} r="44" fill={`url(#grad-${pr.id})`}>
                      <animate attributeName="r" values="40;48;40" dur="3s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={cx} cy={cy}
                    r={isActive ? 32 : 28}
                    fill={isApplied ? pr.color + "40" : "#0D1117"}
                    stroke={isActive ? pr.color : pr.color + "50"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  <text x={cx} y={cy - 6} textAnchor="middle" className="fill-white text-lg pointer-events-none">
                    {pr.icon}
                  </text>
                  <text x={cx} y={cy + 12} textAnchor="middle" fill={pr.color} className="text-[7px] font-bold pointer-events-none">
                    {pr.label}
                  </text>
                  {isApplied && (
                    <text x={cx + 22} y={cy - 18} className="fill-emerald-400 text-[14px]">✓</text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Completion message */}
        {allApplied && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center"
          >
            <p className="text-sm font-bold text-emerald-300">All 4 Bioethics Principles Applied! ✨</p>
            <p className="text-xs text-emerald-200/70 mt-1">Following these principles helps avoid unintended consequences of AI solutions.</p>
          </motion.div>
        )}
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Principle {activePrinciple + 1} of 4</p>
                <p className="font-sora font-bold text-sm" style={{ color: p.color }}>{p.label}</p>
              </div>
            </div>

            <p className="text-xs font-semibold text-gray-800 mb-2">{p.short}</p>
            <p className="text-[11px] text-gray-600 leading-relaxed mb-4">{p.detail}</p>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Apply to Case Study</p>
              {appliedPrinciples[activePrinciple] ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-xs text-emerald-800 leading-relaxed">{p.caseApply}</p>
                </div>
              ) : (
                <button
                  onClick={applyPrinciple}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-white transition-colors"
                  style={{ background: p.color }}
                >
                  Apply {p.label} Principle
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Principle nav */}
        <div className="flex gap-1.5 pt-4 mt-auto border-t border-gray-100">
          {PRINCIPLES.map((pr, i) => (
            <button
              key={pr.id}
              onClick={() => setActivePrinciple(i)}
              className="flex-1 h-8 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1"
              style={{
                background: i === activePrinciple ? pr.color + "15" : "#F3F4F6",
                color: i === activePrinciple ? pr.color : "#9CA3AF",
                border: `1px solid ${i === activePrinciple ? pr.color + "40" : "transparent"}`,
              }}
            >
              {appliedPrinciples[i] && <span className="text-emerald-500">✓</span>}
              {pr.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
