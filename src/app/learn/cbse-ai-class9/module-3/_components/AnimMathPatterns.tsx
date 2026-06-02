"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, RefreshCw, Lightbulb, Brain } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "numbers" | "pictures"

interface NumberChallenge {
  id:         number
  label:      string
  color:      string
  sequence:   (number | "?")[]
  missingIdx: number
  answer:     number
  options:    number[]
  rule:       string
  ruleShort:  string
  aiLink:     string
}

interface PictureChallenge {
  id:      number
  label:   string
  color:   string
  premise: string
  shapes:  PictureShape[][]
  answer:  string
  options: string[]
  reason:  string
  aiLink:  string
}

type ShapeType = "circle" | "square" | "triangle" | "star" | "diamond" | "pentagon"
interface PictureShape { type: ShapeType; size: number; fill: string; count: number }

// ── Number Pattern Data ───────────────────────────────────────────────────────

const NUMBER_CHALLENGES: NumberChallenge[] = [
  {
    id: 1, label: "Arithmetic", color: "#22D3EE",
    sequence: [3, 8, 13, "?", 23, 28],
    missingIdx: 3, answer: 18,
    options: [15, 16, 18, 20],
    rule: "Each term increases by +5",
    ruleShort: "+5 each step",
    aiLink: "Linear regression in AI finds this constant 'slope' to predict values  the same principle as an arithmetic sequence.",
  },
  {
    id: 2, label: "Geometric", color: "#F97316",
    sequence: [2, "?", 18, 54, 162],
    missingIdx: 1, answer: 6,
    options: [4, 5, 6, 8],
    rule: "Each term is multiplied by ×3",
    ruleShort: "×3 each step",
    aiLink: "Exponential growth patterns describe how AI model errors shrink during training  each gradient descent step reduces error by a factor.",
  },
  {
    id: 3, label: "Fibonacci", color: "#8B5CF6",
    sequence: [1, 1, 2, 3, 5, "?", 13, 21],
    missingIdx: 5, answer: 8,
    options: [7, 8, 9, 10],
    rule: "Each term = sum of the two before it",
    ruleShort: "aₙ = aₙ₋₁ + aₙ₋₂",
    aiLink: "Fibonacci patterns appear in nature (flower petals, spirals). Teaching AI to recognise them is a classic Computer Vision training challenge.",
  },
  {
    id: 4, label: "Square Numbers", color: "#10B981",
    sequence: [1, 4, 9, 16, "?", 36],
    missingIdx: 4, answer: 25,
    options: [22, 24, 25, 27],
    rule: "Each term = n² (perfect squares)",
    ruleShort: "1², 2², 3², 4², …",
    aiLink: "Squared errors power the most common AI loss function  Mean Squared Error (MSE)  used to train regression models.",
  },
  {
    id: 5, label: "Alternating", color: "#F59E0B",
    sequence: [2, 6, 4, 12, 6, 18, "?", 24],
    missingIdx: 6, answer: 8,
    options: [7, 8, 9, 10],
    rule: "Two interleaved sequences: +2 and ×3 alternating",
    ruleShort: "Odd positions: +2 · Even positions: ×3",
    aiLink: "AI detects multi-layered patterns like this using deep neural networks  each layer extracts a different level of pattern.",
  },
]

// ── Picture Analogy Data ──────────────────────────────────────────────────────

const PICTURE_CHALLENGES: PictureChallenge[] = [
  {
    id: 1, label: "Size Rule", color: "#22D3EE",
    premise: "Small shape → Large shape. What completes the analogy?",
    shapes: [
      [{ type: "circle",  size: 14, fill: "#22D3EE", count: 1 }],
      [{ type: "circle",  size: 28, fill: "#22D3EE", count: 1 }],
      [{ type: "square",  size: 14, fill: "#F97316", count: 1 }],
      // answer: large square
    ],
    answer: "Large Square",
    options: ["Large Square", "Small Square", "Large Circle", "Small Triangle"],
    reason: "The rule is: the shape doubles in size. Small circle → Large circle. Small square → Large square.",
    aiLink: "Scale invariance  AI models must recognise objects at different sizes (e.g. a cat far away vs up close). This is why CNNs use pooling layers.",
  },
  {
    id: 2, label: "Count Rule", color: "#F97316",
    premise: "1 shape → 3 shapes. What completes the analogy?",
    shapes: [
      [{ type: "triangle", size: 16, fill: "#8B5CF6", count: 1 }],
      [{ type: "triangle", size: 16, fill: "#8B5CF6", count: 3 }],
      [{ type: "star",     size: 16, fill: "#F97316", count: 1 }],
      // answer: 3 stars
    ],
    answer: "3 Stars",
    options: ["3 Stars", "1 Star", "3 Triangles", "2 Stars"],
    reason: "The rule is: triple the count. 1 triangle → 3 triangles. 1 star → 3 stars.",
    aiLink: "Counting objects in an image is a Computer Vision task. AI models called detectors (YOLO, Faster R-CNN) count objects by finding repeated patterns.",
  },
  {
    id: 3, label: "Colour Rule", color: "#8B5CF6",
    premise: "Filled shape → Outline only. What comes next?",
    shapes: [
      [{ type: "diamond", size: 18, fill: "#22D3EE", count: 1 }],
      [{ type: "diamond", size: 18, fill: "none",    count: 1 }],
      [{ type: "pentagon",size: 18, fill: "#F97316", count: 1 }],
      // answer: outlined pentagon
    ],
    answer: "Outline Pentagon",
    options: ["Outline Pentagon", "Filled Pentagon", "Outline Diamond", "Outline Circle"],
    reason: "The rule is: remove the fill (keep only the outline). Filled diamond → Outline diamond. Filled pentagon → Outline pentagon.",
    aiLink: "Edge detection in Computer Vision works exactly like this  AI strips away colour/fill to find just the outlines (edges) of objects in images.",
  },
]

// ── SVG Shape renderer ────────────────────────────────────────────────────────

function ShapeIcon({ type, size, fill, stroke = "#64748B" }: {
  type: ShapeType; size: number; fill: string; stroke?: string
}) {
  const s = size
  const cx = s / 2, cy = s / 2, r = s / 2 - 2
  const isOutline = fill === "none"
  const strokeWidth = isOutline ? 2 : 1

  switch (type) {
    case "circle":
      return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={cx} cy={cy} r={r} fill={fill} stroke={isOutline ? stroke : fill} strokeWidth={strokeWidth} opacity={isOutline ? 1 : 0.85} />
      </svg>

    case "square":
      return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <rect x={2} y={2} width={s - 4} height={s - 4} rx={3}
          fill={fill} stroke={isOutline ? stroke : fill} strokeWidth={strokeWidth} opacity={isOutline ? 1 : 0.85} />
      </svg>

    case "triangle": {
      const pts = `${cx},2 ${s - 2},${s - 2} 2,${s - 2}`
      return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <polygon points={pts} fill={fill} stroke={isOutline ? stroke : fill} strokeWidth={strokeWidth} opacity={isOutline ? 1 : 0.85} />
      </svg>
    }

    case "star": {
      const outerR = r, innerR = r * 0.42
      const pts = Array.from({ length: 10 }, (_, i) => {
        const angle = (i * Math.PI) / 5 - Math.PI / 2
        const rad = i % 2 === 0 ? outerR : innerR
        return `${(cx + rad * Math.cos(angle)).toFixed(1)},${(cy + rad * Math.sin(angle)).toFixed(1)}`
      }).join(" ")
      return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <polygon points={pts} fill={fill} stroke={isOutline ? stroke : fill} strokeWidth={strokeWidth} opacity={isOutline ? 1 : 0.85} />
      </svg>
    }

    case "diamond": {
      const pts = `${cx},2 ${s - 2},${cy} ${cx},${s - 2} 2,${cy}`
      return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <polygon points={pts} fill={fill} stroke={isOutline ? stroke : fill} strokeWidth={strokeWidth} opacity={isOutline ? 1 : 0.85} />
      </svg>
    }

    case "pentagon": {
      const pts = Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
        return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`
      }).join(" ")
      return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <polygon points={pts} fill={fill} stroke={isOutline ? stroke : fill} strokeWidth={strokeWidth} opacity={isOutline ? 1 : 0.85} />
      </svg>
    }
  }
}

function ShapeSet({ shapes }: { shapes: PictureShape[] }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {shapes.map((s, i) => (
        Array.from({ length: s.count }, (_, j) => (
          <ShapeIcon key={`${i}-${j}`} type={s.type} size={s.size * 2} fill={s.fill} stroke="#94A3B8" />
        ))
      ))}
    </div>
  )
}

// ── Number Sequence Canvas ────────────────────────────────────────────────────

function SequenceViz({ challenge, revealed, chosen }: {
  challenge: NumberChallenge; revealed: boolean; chosen: number | null
}) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {challenge.sequence.map((val, idx) => {
        const isMissing = val === "?"
        const isCorrect = revealed && isMissing && chosen === challenge.answer
        const isWrong   = revealed && isMissing && chosen !== null && chosen !== challenge.answer

        return (
          <motion.div key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center gap-1"
          >
            <motion.div
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center font-sora font-bold text-lg"
              animate={isMissing
                ? isCorrect ? {
                    borderColor: "#10B981", background: "#10B98120",
                    scale: [1, 1.15, 1],
                  } : isWrong ? {
                    borderColor: "#EF4444", background: "#EF444420",
                  } : {
                    borderColor: challenge.color,
                    background: challenge.color + "20",
                    scale: [1, 1.05, 1],
                  }
                : {
                    borderColor: challenge.color + "40",
                    background: "#0D1829",
                  }
              }
              transition={{ duration: 0.4 }}
            >
              {isMissing ? (
                <span style={{ color: isCorrect ? "#10B981" : isWrong ? "#EF4444" : challenge.color }}>
                  {revealed ? (isCorrect ? chosen : challenge.answer) : "?"}
                </span>
              ) : (
                <span style={{ color: challenge.color }}>{val}</span>
              )}
            </motion.div>
            <span className="text-[9px] text-slate-600 font-medium">n={idx + 1}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Number Tab ────────────────────────────────────────────────────────────────

function NumberPatternTab() {
  const [idx, setIdx]       = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [revealed, setReveal] = useState(false)
  const [score, setScore]   = useState(0)

  const ch = NUMBER_CHALLENGES[idx]
  const correct = chosen === ch.answer

  const handleChoose = (opt: number) => {
    if (revealed) return
    setChosen(opt)
    setReveal(true)
    if (opt === ch.answer) setScore(s => s + 1)
  }

  const next = () => {
    setIdx(i => (i + 1) % NUMBER_CHALLENGES.length)
    setChosen(null)
    setReveal(false)
  }

  return (
    <div className="grid md:grid-cols-2">
      {/* Canvas */}
      <div className="relative bg-[#060A12] flex flex-col items-center justify-center min-h-80 gap-6 p-6 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="np-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#np-dots)" />
        </svg>

        <div className="relative z-10 w-full space-y-4">
          <div className="text-center">
            <motion.span
              key={ch.id}
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: ch.color + "25", color: ch.color }}
            >
              {ch.label} Pattern
            </motion.span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={ch.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <SequenceViz challenge={ch} revealed={revealed} chosen={chosen} />
            </motion.div>
          </AnimatePresence>

          {/* Rule badge after reveal */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <span className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  Rule: {ch.ruleShort}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Score + progress */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-1">
            {NUMBER_CHALLENGES.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === idx ? ch.color : i < idx ? "#10B981" : "#1E293B" }} />
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400">Score: {score}/{NUMBER_CHALLENGES.length}</span>
        </div>
      </div>

      {/* Panel */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3">
        <AnimatePresence mode="wait">
          <motion.div key={ch.id}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">
                Challenge {idx + 1} of {NUMBER_CHALLENGES.length}
              </p>
              <p className="text-xs font-semibold text-gray-900 leading-relaxed">
                Find the missing number in the sequence.
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">What is the value of <span style={{ color: ch.color }} className="font-bold">?</span></p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-2">
              {ch.options.map(opt => {
                const isChosen  = chosen === opt
                const isBest    = opt === ch.answer
                let style: React.CSSProperties = { background: "#F9FAFB", border: "2px solid #E5E7EB", color: "#374151" }
                if (revealed && isBest)               style = { background: "#ECFDF5", border: "2px solid #10B981", color: "#065F46" }
                else if (revealed && isChosen && !isBest) style = { background: "#FEF2F2", border: "2px solid #EF4444", color: "#991B1B" }
                else if (!revealed && isChosen)       style = { background: ch.color + "15", border: `2px solid ${ch.color}`, color: ch.color }

                return (
                  <motion.button key={opt}
                    onClick={() => handleChoose(opt)}
                    disabled={revealed}
                    whileHover={!revealed ? { scale: 1.02 } : {}}
                    whileTap={!revealed ? { scale: 0.97 } : {}}
                    className="py-3 rounded-xl font-sora font-bold text-lg transition-all flex items-center justify-center gap-2"
                    style={style}
                  >
                    {opt}
                    {revealed && isBest && <CheckCircle2 size={14} className="text-emerald-600" />}
                    {revealed && isChosen && !isBest && <XCircle size={14} className="text-red-500" />}
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className={`rounded-xl p-3 text-xs border ${correct ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                    <p className="font-bold mb-0.5">{correct ? "Correct!" : `Answer: ${ch.answer}`}</p>
                    <p>{ch.rule}</p>
                  </div>
                  <div className="rounded-xl p-2.5 bg-violet-50 border border-violet-100 flex items-start gap-2">
                    <Brain size={12} className="text-violet-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-violet-700 leading-snug">{ch.aiLink}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={next}
              className="mt-auto py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
            >
              {revealed ? "Next Pattern →" : "Skip →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Picture Analogy Tab ───────────────────────────────────────────────────────

function PictureAnalogyTab() {
  const [idx, setIdx]         = useState(0)
  const [chosen, setChosen]   = useState<string | null>(null)
  const [revealed, setReveal] = useState(false)
  const [score, setScore]     = useState(0)

  const ch = PICTURE_CHALLENGES[idx]
  const correct = chosen === ch.answer

  const handleChoose = (opt: string) => {
    if (revealed) return
    setChosen(opt)
    setReveal(true)
    if (opt === ch.answer) setScore(s => s + 1)
  }

  const next = () => {
    setIdx(i => (i + 1) % PICTURE_CHALLENGES.length)
    setChosen(null)
    setReveal(false)
  }

  const answerShapeSet = () => {
    const s = ch.shapes[2][0]
    const newFill = ch.id === 3 ? "none" : s.fill
    const newCount = ch.id === 2 ? 3 : s.count
    return [{ ...s, fill: newFill, count: newCount }]
  }

  return (
    <div className="grid md:grid-cols-2">
      {/* Canvas */}
      <div className="relative bg-[#060A12] flex flex-col items-center justify-center min-h-80 gap-4 p-6 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="pa-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#pa-dots)" />
        </svg>

        <div className="relative z-10 w-full">
          <div className="text-center mb-4">
            <motion.span key={ch.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: ch.color + "25", color: ch.color }}
            >
              {ch.label}
            </motion.span>
          </div>

          {/* Analogy grid: A → B, C → ? */}
          <AnimatePresence mode="wait">
            <motion.div key={ch.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3 max-w-60 mx-auto"
            >
              {[0, 1, 2].map(i => (
                <motion.div key={i}
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="h-20 flex items-center justify-center rounded-xl border"
                  style={{ borderColor: ch.color + "40", background: ch.color + "08" }}
                >
                  <ShapeSet shapes={ch.shapes[i]} />
                </motion.div>
              ))}

              {/* Answer box */}
              <motion.div
                className="h-20 flex items-center justify-center rounded-xl border-2"
                style={{
                  borderColor: revealed ? (correct ? "#10B981" : "#EF4444") : ch.color,
                  background:  revealed ? (correct ? "#10B98115" : "#EF444415") : ch.color + "10",
                }}
                animate={!revealed ? { borderColor: [ch.color, ch.color + "80", ch.color], } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {revealed ? (
                  <ShapeSet shapes={answerShapeSet()} />
                ) : (
                  <span className="text-2xl font-bold" style={{ color: ch.color }}>?</span>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow labels */}
          <div className="flex justify-center gap-2 mt-3">
            {["A", "B", "C", "?"].map((l, i) => (
              <div key={l} className="w-16 text-center text-[9px] font-bold text-slate-600">{l}</div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-1">
            {PICTURE_CHALLENGES.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === idx ? ch.color : i < idx ? "#10B981" : "#1E293B" }} />
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400">Score: {score}/{PICTURE_CHALLENGES.length}</span>
        </div>
      </div>

      {/* Panel */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3">
        <AnimatePresence mode="wait">
          <motion.div key={ch.id}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">
                Analogy {idx + 1} of {PICTURE_CHALLENGES.length}
              </p>
              <p className="text-xs font-semibold text-gray-900 leading-relaxed">{ch.premise}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">A is to B, as C is to <strong>?</strong></p>
            </div>

            <div className="space-y-1.5">
              {ch.options.map(opt => {
                const isChosen = chosen === opt
                const isBest   = opt === ch.answer
                let style: React.CSSProperties = { background: "#F9FAFB", border: "2px solid #E5E7EB", color: "#374151" }
                if (revealed && isBest)               style = { background: "#ECFDF5", border: "2px solid #10B981", color: "#065F46" }
                else if (revealed && isChosen && !isBest) style = { background: "#FEF2F2", border: "2px solid #EF4444", color: "#991B1B" }

                return (
                  <motion.button key={opt}
                    onClick={() => handleChoose(opt)}
                    disabled={revealed}
                    whileHover={!revealed ? { scale: 1.01 } : {}}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between"
                    style={style}
                  >
                    {opt}
                    <span>
                      {revealed && isBest && <CheckCircle2 size={13} className="text-emerald-600" />}
                      {revealed && isChosen && !isBest && <XCircle size={13} className="text-red-500" />}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className={`rounded-xl p-3 text-xs border ${correct ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                    <p className="font-bold mb-0.5">{correct ? "Correct!" : `Answer: ${ch.answer}`}</p>
                    <p>{ch.reason}</p>
                  </div>
                  <div className="rounded-xl p-2.5 bg-violet-50 border border-violet-100 flex items-start gap-2">
                    <Brain size={12} className="text-violet-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-violet-700 leading-snug">{ch.aiLink}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={next}
              className="mt-auto py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
            >
              {revealed ? "Next Analogy →" : "Skip →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimMathPatterns() {
  const [tab, setTab] = useState<Tab>("numbers")

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 bg-white">
        {([
          { key: "numbers" as Tab, label: "Number Patterns",   color: "#F97316" },
          { key: "pictures" as Tab, label: "Picture Analogy",  color: "#8B5CF6" },
        ]).map(t => (
          <button key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-2.5 text-xs font-bold transition-all relative"
            style={tab === t.key ? { color: t.color } : { color: "#94A3B8" }}
          >
            {t.label}
            {tab === t.key && (
              <motion.div layoutId="mp-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: t.color }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {tab === "numbers" ? <NumberPatternTab /> : <PictureAnalogyTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
