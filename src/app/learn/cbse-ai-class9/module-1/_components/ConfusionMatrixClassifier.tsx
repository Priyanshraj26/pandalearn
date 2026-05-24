"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight } from "lucide-react"

// ── Data ─────────────────────────────────────────────────────────────────────

type Class = "TP" | "FP" | "TN" | "FN"

interface Card {
  id:         string
  context:    string
  scenario:   string
  prediction: string
  actual:     string
  correct:    Class
  explanation:string
}

const CARDS: Card[] = [
  {
    id: "tp1",
    context: "Cancer Screening AI",
    scenario: "A 52-year-old patient has breast cancer. The AI scan analysis shows: CANCER DETECTED.",
    prediction: "POSITIVE (Cancer present)",
    actual: "POSITIVE (Cancer is present)",
    correct: "TP",
    explanation: "True Positive: the cancer IS there, and the AI correctly detected it. The best possible outcome in medical AI.",
  },
  {
    id: "tp2",
    context: "Email Spam Filter",
    scenario: "An email offers fake lottery winnings of ₹10 lakh. The filter marks it: SPAM.",
    prediction: "POSITIVE (It is spam)",
    actual: "POSITIVE (It is spam)",
    correct: "TP",
    explanation: "True Positive: it really is spam, and the filter correctly caught it. No one sees the scam email.",
  },
  {
    id: "tp3",
    context: "Fraud Detection AI",
    scenario: "A stolen credit card is used to buy electronics worth ₹80,000 online. AI flags: FRAUD DETECTED.",
    prediction: "POSITIVE (Fraudulent)",
    actual: "POSITIVE (Fraudulent)",
    correct: "TP",
    explanation: "True Positive: the transaction IS fraudulent, and the AI correctly blocked it before damage was done.",
  },
  {
    id: "fp1",
    context: "Email Spam Filter",
    scenario: "Your teacher emails you study notes and exam tips. The filter marks it: SPAM.",
    prediction: "POSITIVE (It is spam)",
    actual: "NEGATIVE (It is NOT spam)",
    correct: "FP",
    explanation: "False Positive (Type I Error / False Alarm): the email is NOT spam, but the filter incorrectly flagged it. You missed important class notes.",
  },
  {
    id: "fp2",
    context: "Cancer Screening AI",
    scenario: "A healthy 45-year-old goes for a routine scan. The AI shows: CANCER DETECTED.",
    prediction: "POSITIVE (Cancer present)",
    actual: "NEGATIVE (No cancer)",
    correct: "FP",
    explanation: "False Positive: no cancer exists, but the AI raised a false alarm. This causes severe anxiety, expensive follow-up tests, and unnecessary treatment.",
  },
  {
    id: "fp3",
    context: "Fraud Detection AI",
    scenario: "You use your card while travelling abroad on holiday. Bank AI flags: FRAUD DETECTED. Card blocked.",
    prediction: "POSITIVE (Fraudulent)",
    actual: "NEGATIVE (Legitimate purchase)",
    correct: "FP",
    explanation: "False Positive: your purchase was real, but the AI blocked it. You're stuck abroad with a frozen card. Annoying — but recoverable.",
  },
  {
    id: "tn1",
    context: "Cancer Screening AI",
    scenario: "A healthy 35-year-old with no cancer markers gets scanned. AI result: NO CANCER DETECTED.",
    prediction: "NEGATIVE (No cancer)",
    actual: "NEGATIVE (No cancer)",
    correct: "TN",
    explanation: "True Negative: the patient is healthy, and the AI correctly says so. No alarm, no error. Exactly what should happen.",
  },
  {
    id: "tn2",
    context: "Email Spam Filter",
    scenario: "Your school newsletter arrives with exam timetables. Filter says: SAFE — delivered to inbox.",
    prediction: "NEGATIVE (Not spam)",
    actual: "NEGATIVE (Not spam)",
    correct: "TN",
    explanation: "True Negative: it's a genuine email, and the filter correctly delivers it. No false alarms, no disruption.",
  },
  {
    id: "tn3",
    context: "Fraud Detection AI",
    scenario: "You buy groceries from your usual supermarket every Friday. AI says: TRANSACTION APPROVED.",
    prediction: "NEGATIVE (Legitimate)",
    actual: "NEGATIVE (Legitimate)",
    correct: "TN",
    explanation: "True Negative: your normal purchase is approved without friction. The AI correctly recognises your spending pattern.",
  },
  {
    id: "fn1",
    context: "Cancer Screening AI",
    scenario: "A patient has early-stage lung cancer. The AI analysis shows: NO CANCER DETECTED.",
    prediction: "NEGATIVE (No cancer)",
    actual: "POSITIVE (Cancer is present)",
    correct: "FN",
    explanation: "False Negative (Type II Error — MOST DANGEROUS): cancer IS there, but the AI missed it. The patient goes untreated until it is too late. In medicine, this is the worst kind of error.",
  },
  {
    id: "fn2",
    context: "Email Spam Filter",
    scenario: "A phishing email pretending to be your bank asks for your password. Filter says: SAFE — delivered to inbox.",
    prediction: "NEGATIVE (Not spam)",
    actual: "POSITIVE (It is spam/phishing)",
    correct: "FN",
    explanation: "False Negative: the phishing attack slipped through undetected. The user might click the link and have their account stolen.",
  },
  {
    id: "fn3",
    context: "Fraud Detection AI",
    scenario: "A scammer has your card details and makes purchases. AI says: TRANSACTION APPROVED.",
    prediction: "NEGATIVE (Legitimate)",
    actual: "POSITIVE (Fraudulent)",
    correct: "FN",
    explanation: "False Negative: the fraud went undetected. Money is stolen before anyone notices. The later this is caught, the harder to recover.",
  },
]

const CLASS_META: Record<Class, { label: string; color: string; bg: string; border: string; short: string }> = {
  TP: { label: "True Positive",  color: "#059669", bg: "#ECFDF5", border: "#6EE7B7", short: "TP — Correct alarm"    },
  FP: { label: "False Positive", color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5", short: "FP — False alarm"     },
  TN: { label: "True Negative",  color: "#0284C7", bg: "#F0F9FF", border: "#7DD3FC", short: "TN — Correctly quiet" },
  FN: { label: "False Negative", color: "#D97706", bg: "#FFFBEB", border: "#FCD34D", short: "FN — Missed it!"      },
}

const BUTTONS: Class[] = ["TP", "FP", "TN", "FN"]

// ── Matrix cell ───────────────────────────────────────────────────────────────

function MatrixCell({ count, label, color, bg }: { count: number; label: string; color: string; bg: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-2 rounded-xl border-2 min-h-[56px]"
      animate={{ borderColor: count > 0 ? color : "#E5E7EB", background: count > 0 ? bg : "#FAFAFA" }}
      transition={{ duration: 0.4 }}
    >
      <motion.span
        key={count}
        initial={{ scale: 1.6 }} animate={{ scale: 1 }}
        className="text-xl font-bold font-sora"
        style={{ color: count > 0 ? color : "#D1D5DB" }}
      >
        {count}
      </motion.span>
      <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: count > 0 ? color : "#9CA3AF" }}>
        {label}
      </span>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ConfusionMatrixClassifier() {
  const [idx,       setIdx]     = useState(0)
  const [chosen,    setChosen]  = useState<Class | null>(null)
  const [revealed,  setRevealed]= useState(false)
  const [score,     setScore]   = useState<Record<Class, number>>({ TP: 0, FP: 0, TN: 0, FN: 0 })
  const [correct,   setCorrect] = useState(0)
  const [done,      setDone]    = useState(false)

  const card    = CARDS[idx]
  const total   = CARDS.length
  const pct     = Math.round((idx / total) * 100)
  const isRight = chosen === card.correct

  function handleChoice(cls: Class) {
    if (revealed) return
    setChosen(cls)
    setRevealed(true)
    setScore(prev => ({ ...prev, [card.correct]: prev[card.correct] + 1 }))
    if (cls === card.correct) setCorrect(c => c + 1)
  }

  function handleNext() {
    if (idx >= total - 1) { setDone(true); return }
    setIdx(i => i + 1)
    setChosen(null)
    setRevealed(false)
  }

  function handleReset() {
    setIdx(0); setChosen(null); setRevealed(false)
    setScore({ TP: 0, FP: 0, TN: 0, FN: 0 })
    setCorrect(0); setDone(false)
  }

  // ── Done screen ──
  if (done) {
    const pctScore = Math.round((correct / total) * 100)
    return (
      <div className="rounded-3xl border-2 border-amber-100 bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
          <Trophy size={18} className="text-amber-500" />
          <span className="font-sora font-bold text-sm text-amber-800">Confusion Matrix Complete!</span>
        </div>
        <div className="p-6 space-y-6">
          {/* score */}
          <div className="text-center">
            <p className="text-5xl font-bold font-sora" style={{ color: pctScore >= 70 ? "#059669" : "#D97706" }}>
              {correct}/{total}
            </p>
            <p className="text-sm text-gray-500 mt-1">{pctScore}% accuracy</p>
            <p className="text-xs text-gray-400 mt-1">
              {pctScore >= 80 ? "Excellent! You understand evaluation metrics well." : pctScore >= 60 ? "Good effort — review the FN cases again." : "Keep practising — focus on when the AI 'misses' something."}
            </p>
          </div>

          {/* matrix */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">
              Your Classification Record
            </p>
            <div className="max-w-xs mx-auto">
              {/* header row */}
              <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                <div />
                <p className="text-[9px] font-bold text-center text-gray-400 uppercase tracking-wider col-span-2">← Actual →</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div />
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Positive</span>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">Negative</span>

                <span className="text-[9px] font-bold text-gray-500 uppercase writing-mode-vertical self-center">
                  Predicted +
                </span>
                <MatrixCell count={score.TP} label="TP" color={CLASS_META.TP.color} bg={CLASS_META.TP.bg} />
                <MatrixCell count={score.FP} label="FP" color={CLASS_META.FP.color} bg={CLASS_META.FP.bg} />

                <span className="text-[9px] font-bold text-gray-500 uppercase self-center">Predicted −</span>
                <MatrixCell count={score.FN} label="FN" color={CLASS_META.FN.color} bg={CLASS_META.FN.bg} />
                <MatrixCell count={score.TN} label="TN" color={CLASS_META.TN.color} bg={CLASS_META.TN.bg} />
              </div>
            </div>
          </div>

          {/* key insight */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-bold text-gray-700 mb-1">Key insight for this activity:</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              In <strong>cancer screening</strong>, False Negatives are the most dangerous — the disease is missed and goes untreated.
              In <strong>spam filters</strong>, False Positives are more annoying — genuine emails are blocked.
              The right balance depends entirely on <em>what mistake is more costly</em> in your context.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
          >
            <RotateCcw size={14} />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border-2 border-amber-100 bg-white overflow-hidden shadow-sm">

      {/* ── Header ── */}
      <div className="px-5 py-3.5 bg-amber-50 border-b border-amber-100 flex items-center justify-between gap-4">
        <div>
          <p className="font-sora font-bold text-sm text-amber-800">Confusion Matrix Classifier</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Classify each scenario as TP / FP / TN / FN · {idx + 1} of {total}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-20 h-1.5 bg-amber-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-400 rounded-full"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-xs font-bold text-amber-600">{correct} ✓</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_220px]">

        {/* ── Main card area ── */}
        <div className="p-5 space-y-4">

          {/* context badge */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wide">
              {card.context}
            </span>
            <span className="text-[10px] text-gray-400">Card {idx + 1} of {total}</span>
          </div>

          {/* scenario */}
          <AnimatePresence mode="wait">
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed font-medium">{card.scenario}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                  <p className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">AI Predicted</p>
                  <p className="text-xs font-semibold text-blue-800">{card.prediction}</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl px-3 py-2">
                  <p className="text-[9px] font-bold text-purple-500 uppercase tracking-wider mb-0.5">Actual Reality</p>
                  <p className="text-xs font-semibold text-purple-800">{card.actual}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* choice buttons */}
          <div className="grid grid-cols-2 gap-2">
            {BUTTONS.map(cls => {
              const m = CLASS_META[cls]
              const isChosen  = chosen === cls
              const isCorrect = cls === card.correct

              let style: React.CSSProperties = { borderColor: "#E5E7EB", color: "#6B7280", background: "#F9FAFB" }
              if (revealed) {
                if (isCorrect) style = { borderColor: m.color, color: m.color, background: m.bg }
                else if (isChosen) style = { borderColor: "#DC2626", color: "#DC2626", background: "#FEF2F2" }
              } else if (isChosen) {
                style = { borderColor: m.color, color: m.color, background: m.bg }
              }

              return (
                <motion.button
                  key={cls}
                  onClick={() => handleChoice(cls)}
                  whileTap={!revealed ? { scale: 0.96 } : undefined}
                  disabled={revealed}
                  className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all disabled:cursor-default"
                  style={style}
                >
                  <span>{m.label}</span>
                  {revealed && isCorrect && <CheckCircle2 size={14} />}
                  {revealed && isChosen && !isCorrect && <XCircle size={14} />}
                </motion.button>
              )
            })}
          </div>

          {/* feedback */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl p-4 border-2"
                style={{
                  borderColor: isRight ? "#6EE7B7" : "#FCA5A5",
                  background:  isRight ? "#ECFDF5"  : "#FEF2F2",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isRight
                    ? <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    : <XCircle      size={14} className="text-rose-500    shrink-0" />
                  }
                  <p className="text-xs font-bold" style={{ color: isRight ? "#059669" : "#DC2626" }}>
                    {isRight ? `Correct! This is ${CLASS_META[card.correct].label}.` : `Not quite — this is ${CLASS_META[card.correct].label}.`}
                  </p>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{card.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {revealed && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors ml-auto"
            >
              {idx >= total - 1 ? "See Results" : "Next Card"}
              <ChevronRight size={14} />
            </motion.button>
          )}
        </div>

        {/* ── Live confusion matrix sidebar ── */}
        <div className="lg:border-l border-t lg:border-t-0 border-gray-100 p-4 bg-gray-50/50">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">
            Live Matrix
          </p>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div />
            <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wide">Positive</span>
            <span className="text-[8px] font-bold text-blue-600 uppercase tracking-wide">Negative</span>

            <span className="text-[8px] font-bold text-gray-400 self-center text-right pr-1 leading-tight">Pred +</span>
            <MatrixCell count={score.TP} label="TP" color={CLASS_META.TP.color} bg={CLASS_META.TP.bg} />
            <MatrixCell count={score.FP} label="FP" color={CLASS_META.FP.color} bg={CLASS_META.FP.bg} />

            <span className="text-[8px] font-bold text-gray-400 self-center text-right pr-1 leading-tight">Pred −</span>
            <MatrixCell count={score.FN} label="FN" color={CLASS_META.FN.color} bg={CLASS_META.FN.bg} />
            <MatrixCell count={score.TN} label="TN" color={CLASS_META.TN.color} bg={CLASS_META.TN.bg} />
          </div>

          <div className="mt-4 space-y-1.5">
            {BUTTONS.map(cls => (
              <div key={cls} className="flex items-center justify-between text-[10px]">
                <span className="font-semibold" style={{ color: CLASS_META[cls].color }}>{cls}</span>
                <div className="flex-1 mx-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: CLASS_META[cls].color }}
                    animate={{ width: `${(score[cls] / Math.max(total, 1)) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="font-bold text-gray-500 w-4 text-right">{score[cls]}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-[9px] text-gray-400 leading-relaxed">
              <strong className="text-gray-500">FN in medicine</strong> = most dangerous (missed disease). <strong className="text-gray-500">FP in spam</strong> = most annoying (good email blocked).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
