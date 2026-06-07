"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const TOTAL_POINTS = 20
const GRID_COLS = 5
const GRID_ROWS = 4

const INFO = {
  overfit: {
    title: "⚠ Overfitting Risk",
    desc: "Too much training data, too little testing. Model memorises training data but fails on new, unseen data — like studying only the answer key.",
    color: "#EF4444",
  },
  balanced: {
    title: "✓ Balanced Split",
    desc: "A healthy 70-85% training / 15-30% testing ratio. Model learns well and is tested fairly on unseen data.",
    color: "#10B981",
  },
  underfit: {
    title: "⚠ Underfitting Risk",
    desc: "Too little training data. Model can't learn enough patterns — like studying for only 5 minutes before an exam.",
    color: "#F59E0B",
  },
}

function getSplitState(trainPct: number) {
  if (trainPct > 85) return "overfit"
  if (trainPct < 60) return "underfit"
  return "balanced"
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimTrainTestSplit() {
  const [trainPct, setTrainPct] = useState(80)

  const trainCount = Math.round((trainPct / 100) * TOTAL_POINTS)
  const testCount = TOTAL_POINTS - trainCount
  const state = getSplitState(trainPct)
  const info = INFO[state]

  const accuracy = useMemo(() => {
    if (state === "balanced") return Math.round(78 + Math.random() * 12)
    if (state === "overfit") return Math.round(60 + Math.random() * 10)
    return Math.round(45 + Math.random() * 15)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainPct])

  const dots = useMemo(() => {
    const arr: { x: number; y: number; isTrain: boolean }[] = []
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const idx = r * GRID_COLS + c
        arr.push({
          x: 50 + c * 70,
          y: 40 + r * 60,
          isTrain: idx < trainCount,
        })
      }
    }
    return arr
  }, [trainCount])

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: SVG Canvas ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full max-w-md">
          {/* Grid dots */}
          {dots.map((d, i) => (
            <motion.circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={16}
              fill={d.isTrain ? "#3B82F6" : "#F97316"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 20 }}
              opacity={0.9}
            />
          ))}

          {/* Labels */}
          {dots.map((d, i) => (
            <text
              key={`lbl-${i}`}
              x={d.x}
              y={d.y + 4}
              textAnchor="middle"
              className="text-[9px] font-bold pointer-events-none"
              fill="#fff"
            >
              {i + 1}
            </text>
          ))}

          {/* Legend */}
          <circle cx="60" cy="280" r={6} fill="#3B82F6" />
          <text x="72" y="284" fill="#94A3B8" className="text-[10px]">Training</text>
          <circle cx="160" cy="280" r={6} fill="#F97316" />
          <text x="172" y="284" fill="#94A3B8" className="text-[10px]">Testing</text>
        </svg>

        {/* Slider */}
        <div className="w-full max-w-sm mt-4">
          <div className="flex items-center justify-between text-[10px] text-white/40 mb-2">
            <span>More Testing ←</span>
            <span>→ More Training</span>
          </div>
          <input
            type="range"
            min={10}
            max={95}
            value={trainPct}
            onChange={(e) => setTrainPct(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-bold text-blue-400">Train: {trainPct}%</span>
            <span className="text-xs font-bold text-orange-400">Test: {100 - trainPct}%</span>
          </div>
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Split Analysis</p>
            <h3 className="font-sora font-bold text-sm mb-2" style={{ color: info.color }}>{info.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{info.desc}</p>

            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3 border border-blue-100">
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Training Set</p>
                  <p className="text-lg font-bold text-blue-700 font-sora">{trainCount}</p>
                </div>
                <p className="text-[10px] text-blue-500 font-medium">{trainPct}% of data</p>
              </div>
              <div className="flex items-center justify-between bg-orange-50 rounded-xl p-3 border border-orange-100">
                <div>
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Test Set</p>
                  <p className="text-lg font-bold text-orange-700 font-sora">{testCount}</p>
                </div>
                <p className="text-[10px] text-orange-500 font-medium">{100 - trainPct}% of data</p>
              </div>
            </div>

            {/* Simulated accuracy */}
            <div className="p-3 rounded-xl border" style={{ borderColor: info.color + "30", background: info.color + "08" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: info.color }}>
                Estimated Model Accuracy
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: info.color }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-sm font-bold font-sora" style={{ color: info.color }}>{accuracy}%</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom tips */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Best Practice</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            The standard split is <strong className="text-gray-700">80% training / 20% testing</strong>.
            This gives the model enough data to learn patterns while keeping enough unseen data for fair evaluation.
          </p>
        </div>
      </div>
    </div>
  )
}
