"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react"

// ── Scenario data ─────────────────────────────────────────────────────────────

interface Scenario {
  symptoms: string
  predicted: "Infected" | "Not Infected"
  actual: "Infected" | "Not Infected"
  type: "TP" | "TN" | "FP" | "FN"
}

const SCENARIOS: Scenario[] = [
  { symptoms: "Fever, cough, night sweats",     predicted: "Infected",     actual: "Infected",     type: "TP" },
  { symptoms: "Mild headache only",              predicted: "Not Infected", actual: "Not Infected", type: "TN" },
  { symptoms: "Fatigue and weight loss",          predicted: "Infected",     actual: "Not Infected", type: "FP" },
  { symptoms: "Persistent cough, fatigue",        predicted: "Not Infected", actual: "Infected",     type: "FN" },
  { symptoms: "High fever, breathlessness",       predicted: "Infected",     actual: "Infected",     type: "TP" },
  { symptoms: "Slight cold, runny nose",          predicted: "Not Infected", actual: "Not Infected", type: "TN" },
  { symptoms: "Chest pain, cough",                predicted: "Infected",     actual: "Infected",     type: "TP" },
  { symptoms: "Seasonal allergy symptoms",        predicted: "Infected",     actual: "Not Infected", type: "FP" },
  { symptoms: "Chronic fatigue, appetite loss",   predicted: "Not Infected", actual: "Infected",     type: "FN" },
  { symptoms: "No symptoms, routine check",       predicted: "Not Infected", actual: "Not Infected", type: "TN" },
  { symptoms: "Fever, body ache, cough",          predicted: "Infected",     actual: "Infected",     type: "TP" },
  { symptoms: "Mild cough, no fever",             predicted: "Not Infected", actual: "Not Infected", type: "TN" },
]

const TYPE_LABELS: Record<string, { label: string; full: string; color: string; bg: string }> = {
  TP: { label: "TP", full: "True Positive",  color: "#10B981", bg: "#ECFDF5" },
  TN: { label: "TN", full: "True Negative",  color: "#3B82F6", bg: "#EFF6FF" },
  FP: { label: "FP", full: "False Positive", color: "#F59E0B", bg: "#FFFBEB" },
  FN: { label: "FN", full: "False Negative", color: "#EF4444", bg: "#FEF2F2" },
}

const CHOICE_OPTIONS = [
  { key: "TP", label: "True Positive",  hint: "Predicted positive, IS positive" },
  { key: "TN", label: "True Negative",  hint: "Predicted negative, IS negative" },
  { key: "FP", label: "False Positive", hint: "Predicted positive, NOT positive" },
  { key: "FN", label: "False Negative", hint: "Predicted negative, IS positive" },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimConfusionMatrixDeep() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(SCENARIOS.length).fill(null))
  const [showFeedback, setShowFeedback] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const scenario = SCENARIOS[currentIdx]
  const currentAnswer = answers[currentIdx]

  // Count matrix values from answers
  const matrix = useMemo(() => {
    const m = { TP: 0, TN: 0, FP: 0, FN: 0 }
    answers.forEach((a, i) => {
      if (a !== null) {
        // Count by actual type (not student answer) only if correct
        const actual = SCENARIOS[i].type
        if (a === actual) m[actual]++
      }
    })
    return m
  }, [answers])

  // Count from actual scenario types for final results
  const actualCounts = useMemo(() => {
    const m = { TP: 0, TN: 0, FP: 0, FN: 0 }
    SCENARIOS.forEach(s => m[s.type]++)
    return m
  }, [])

  const correctCount = useMemo(() => answers.filter((a, i) => a === SCENARIOS[i].type).length, [answers])
  const allAnswered = answers.every(a => a !== null)

  // Metrics from actual scenario data
  const metrics = useMemo(() => {
    const { TP, TN, FP, FN } = actualCounts
    const accuracy = ((TP + TN) / (TP + TN + FP + FN)) * 100
    const precision = TP / (TP + FP) * 100
    const recall = TP / (TP + FN) * 100
    const f1 = 2 * (precision * recall) / (precision + recall)
    return { accuracy, precision, recall, f1 }
  }, [actualCounts])

  const handleChoice = useCallback((choice: string) => {
    const newAnswers = [...answers]
    newAnswers[currentIdx] = choice
    setAnswers(newAnswers)
    setShowFeedback(true)
  }, [answers, currentIdx])

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx(currentIdx + 1)
    } else {
      setShowResults(true)
    }
  }, [currentIdx])

  const handleReset = useCallback(() => {
    setCurrentIdx(0)
    setAnswers(Array(SCENARIOS.length).fill(null))
    setShowFeedback(false)
    setShowResults(false)
  }, [])

  // ── Results screen ──
  if (showResults) {
    return (
      <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Final Confusion Matrix</p>

          {/* 2×2 Matrix */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-0 max-w-xs w-full">
            {/* Header row */}
            <div />
            <div className="text-center py-2 px-3">
              <p className="text-[9px] text-white/30 uppercase tracking-wider">Predicted +</p>
            </div>
            <div className="text-center py-2 px-3">
              <p className="text-[9px] text-white/30 uppercase tracking-wider">Predicted −</p>
            </div>

            {/* Row 1: Actual Positive */}
            <div className="flex items-center pr-3">
              <p className="text-[9px] text-white/30 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">Actual +</p>
            </div>
            <motion.div
              className="border border-emerald-500/30 rounded-xl m-1 p-4 text-center"
              style={{ background: "#10B98118" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-2xl font-bold text-emerald-400 font-sora">{actualCounts.TP}</p>
              <p className="text-[10px] text-emerald-400/60 mt-1">TP</p>
            </motion.div>
            <motion.div
              className="border border-red-500/30 rounded-xl m-1 p-4 text-center"
              style={{ background: "#EF444418" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-2xl font-bold text-red-400 font-sora">{actualCounts.FN}</p>
              <p className="text-[10px] text-red-400/60 mt-1">FN</p>
            </motion.div>

            {/* Row 2: Actual Negative */}
            <div className="flex items-center pr-3">
              <p className="text-[9px] text-white/30 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">Actual −</p>
            </div>
            <motion.div
              className="border border-amber-500/30 rounded-xl m-1 p-4 text-center"
              style={{ background: "#F59E0B18" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-2xl font-bold text-amber-400 font-sora">{actualCounts.FP}</p>
              <p className="text-[10px] text-amber-400/60 mt-1">FP</p>
            </motion.div>
            <motion.div
              className="border border-blue-500/30 rounded-xl m-1 p-4 text-center"
              style={{ background: "#3B82F618" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-2xl font-bold text-blue-400 font-sora">{actualCounts.TN}</p>
              <p className="text-[10px] text-blue-400/60 mt-1">TN</p>
            </motion.div>
          </div>

          <motion.p
            className="text-xs text-white/30 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            You got {correctCount} / {SCENARIOS.length} classifications correct
          </motion.p>
        </div>

        {/* Right: Metrics */}
        <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Calculated Metrics</p>
          <h3 className="font-sora font-bold text-sm text-gray-900 mb-4">Model Performance</h3>

          <div className="space-y-3 flex-1">
            {[
              { label: "Accuracy", value: metrics.accuracy, color: "#10B981", formula: "(TP + TN) / Total" },
              { label: "Precision", value: metrics.precision, color: "#3B82F6", formula: "TP / (TP + FP)" },
              { label: "Recall", value: metrics.recall, color: "#F97316", formula: "TP / (TP + FN)" },
              { label: "F1 Score", value: metrics.f1, color: "#7C3AED", formula: "2 × (P × R) / (P + R)" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                className="p-3 rounded-xl border border-gray-100"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-bold" style={{ color: m.color }}>{m.label}</p>
                  <p className="text-sm font-bold font-sora" style={{ color: m.color }}>
                    {m.value.toFixed(1)}%
                  </p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.8 }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-mono">{m.formula}</p>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 mt-auto">
            <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 mb-3">
              <p className="text-[10px] font-bold text-violet-700 mb-1">Key Insight</p>
              <p className="text-[11px] text-violet-600 leading-relaxed">
                In medical diagnosis, <strong>Recall matters most</strong> — missing a sick patient (FN) is far worse than a false alarm (FP).
              </p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <RotateCcw size={12} /> Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main classification screen ──
  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Scenario + Matrix ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] text-white/40 font-bold">CASE {currentIdx + 1} / {SCENARIOS.length}</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              animate={{ width: `${((currentIdx + 1) / SCENARIOS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Scenario card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5"
          >
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Patient Symptoms</p>
            <p className="text-sm text-white/90 font-medium mb-4">{scenario.symptoms}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                <p className="text-[9px] text-blue-400/60 uppercase tracking-wider mb-0.5">AI Predicted</p>
                <p className="text-xs font-bold text-blue-400">{scenario.predicted}</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                <p className="text-[9px] text-orange-400/60 uppercase tracking-wider mb-0.5">Actually Was</p>
                <p className="text-xs font-bold text-orange-400">{scenario.actual}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Choice buttons */}
        {!showFeedback ? (
          <div className="grid grid-cols-2 gap-2">
            {CHOICE_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => handleChoice(opt.key)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-3 text-left transition-all"
              >
                <p className="text-xs font-bold text-white/90 mb-0.5">{opt.label}</p>
                <p className="text-[10px] text-white/40">{opt.hint}</p>
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1"
          >
            {currentAnswer === scenario.type ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-emerald-400 mb-1">Correct!</p>
                  <p className="text-[11px] text-emerald-300/70">
                    This is a <strong>{TYPE_LABELS[scenario.type].full}</strong> — the model predicted
                    &quot;{scenario.predicted}&quot; and the patient was actually &quot;{scenario.actual}&quot;.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-400 mb-1">Not quite — it&apos;s {TYPE_LABELS[scenario.type].full}</p>
                  <p className="text-[11px] text-red-300/70">
                    The model predicted &quot;{scenario.predicted}&quot; and the patient was actually &quot;{scenario.actual}&quot;,
                    making this a <strong>{scenario.type}</strong>.
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-2 mt-3 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              {currentIdx < SCENARIOS.length - 1 ? (
                <><span>Next Case</span><ArrowRight size={12} /></>
              ) : (
                <><span>See Results</span><ArrowRight size={12} /></>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Right: Live Matrix ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Live Confusion Matrix</p>
        <h3 className="font-sora font-bold text-sm text-gray-900 mb-3">Your Classifications</h3>

        {/* 2×2 mini-matrix */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(["TP", "FN", "FP", "TN"] as const).map(key => {
            const info = TYPE_LABELS[key]
            const count = answers.filter((a, i) => a === key && a === SCENARIOS[i].type).length
            return (
              <div
                key={key}
                className="rounded-xl p-3 text-center border"
                style={{ background: info.bg, borderColor: info.color + "30" }}
              >
                <p className="text-lg font-bold font-sora" style={{ color: info.color }}>{count}</p>
                <p className="text-[10px] font-bold" style={{ color: info.color }}>{info.label}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{info.full}</p>
              </div>
            )
          })}
        </div>

        {/* Score tracker */}
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-600">Score</p>
            <p className="text-sm font-bold text-gray-900 font-sora">{correctCount} / {answers.filter(a => a !== null).length}</p>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              animate={{ width: answers.filter(a => a !== null).length > 0 ? `${(correctCount / answers.filter(a => a !== null).length) * 100}%` : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Quick reference */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Quick Reference</p>
          <div className="space-y-1.5">
            {CHOICE_OPTIONS.map(opt => (
              <div key={opt.key} className="flex items-center gap-2 text-[11px]">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: TYPE_LABELS[opt.key].color }}
                />
                <span className="font-bold text-gray-700">{opt.key}:</span>
                <span className="text-gray-500">{opt.hint}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
