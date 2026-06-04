"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_CATEGORIES = [
  {
    id: "sector",
    label: "Sector-Based",
    color: "#3B82F6",
    description: "Designed for specific industries — healthcare, finance, education, defence. Tailored rules that address the unique ethical challenges of each sector.",
    frameworks: [
      { name: "Healthcare AI Ethics", desc: "Ensures patient data privacy, informed consent, and equitable access to AI-powered diagnostics.", icon: "🏥" },
      { name: "Financial AI Ethics", desc: "Prevents algorithmic bias in lending, ensures transparency in automated trading decisions.", icon: "🏦" },
      { name: "Education AI Ethics", desc: "Protects student data, ensures fair assessment, prevents surveillance overreach.", icon: "🎓" },
    ],
  },
  {
    id: "value",
    label: "Value-Based",
    color: "#7C3AED",
    description: "Grounded in fundamental ethical principles — not industry-specific but universal. These guide moral reasoning across all AI applications.",
    frameworks: [
      { name: "Utility-Based", desc: "Actions are judged by outcomes: the greatest good for the greatest number. Focus on maximising overall benefit.", icon: "⚖️" },
      { name: "Rights-Based", desc: "Prioritises human rights and dignity above all else. No AI outcome can justify violating fundamental rights.", icon: "🛡️" },
      { name: "Virtue-Based", desc: "Focuses on the moral character of the decision-maker. AI should align with societal virtues like honesty and fairness.", icon: "✨" },
    ],
  },
]

const AI_CASE = {
  title: "AI in Hiring: The Amazon Case (2018)",
  scenario: "Amazon built an AI tool to screen job applicants. It was trained on 10 years of hiring data — which was predominantly male. The AI learned to penalise resumes containing the word 'women's' and downgraded graduates of all-women's colleges.",
  questions: [
    {
      framework: "Utility-Based",
      question: "Does this AI create the greatest good for the greatest number?",
      answer: "No — it benefits the company's speed but harms qualified female candidates. Net harm outweighs efficiency gains.",
    },
    {
      framework: "Rights-Based",
      question: "Does this AI protect the fundamental rights of all applicants?",
      answer: "No — it violates the right to equal opportunity and non-discrimination. Gender should never influence hiring.",
    },
    {
      framework: "Virtue-Based",
      question: "Would a virtuous decision-maker deploy this tool?",
      answer: "No — a fair and honest person would recognise the bias and refuse to deploy it until the training data is corrected.",
    },
  ],
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimEthicalFrameworks() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [caseStep, setCaseStep] = useState(-1) // -1 = not started
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])

  const cat = FRAMEWORK_CATEGORIES[activeCategory]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: SVG Canvas ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">
        <div className="flex gap-2 mb-6">
          {FRAMEWORK_CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setActiveCategory(i); setCaseStep(-1); setRevealed([false, false, false]) }}
              className="relative px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                color: i === activeCategory ? "#fff" : c.color,
                background: i === activeCategory ? c.color : c.color + "18",
                border: `1px solid ${i === activeCategory ? c.color : c.color + "30"}`,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {/* Framework cards */}
            <div className="space-y-3 mb-6">
              {cat.frameworks.map((fw, i) => (
                <motion.div
                  key={fw.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.35 }}
                  className="flex items-start gap-3 p-4 rounded-xl border"
                  style={{ borderColor: cat.color + "30", background: cat.color + "0A" }}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{fw.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{fw.name}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{fw.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Case study in-canvas */}
            {caseStep >= 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5"
              >
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Apply the Framework</p>
                <p className="text-sm text-white/80 font-semibold mb-1">{AI_CASE.questions[caseStep].framework}</p>
                <p className="text-xs text-white/60 mb-3">{AI_CASE.questions[caseStep].question}</p>
                {revealed[caseStep] ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <p className="text-xs text-emerald-300 leading-relaxed">{AI_CASE.questions[caseStep].answer}</p>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setRevealed(prev => { const n = [...prev]; n[caseStep] = true; return n })}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors"
                  >
                    Reveal Analysis
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Framework Type</p>
        <h3 className="font-sora font-bold text-gray-900 text-sm mb-2" style={{ color: cat.color }}>
          {cat.label} Frameworks
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-6">{cat.description}</p>

        <div className="border-t border-gray-100 pt-4 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Case Study</p>
          <p className="text-xs font-semibold text-gray-800 mb-1">{AI_CASE.title}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{AI_CASE.scenario}</p>

          <div className="space-y-1.5">
            {AI_CASE.questions.map((q, i) => (
              <button
                key={q.framework}
                onClick={() => setCaseStep(i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  caseStep === i
                    ? "bg-orange-50 text-orange-700 border border-orange-200"
                    : "text-gray-600 hover:bg-gray-50 border border-transparent"
                }`}
              >
                {i + 1}. {q.framework}
                {revealed[i] && <span className="ml-1 text-emerald-500">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
