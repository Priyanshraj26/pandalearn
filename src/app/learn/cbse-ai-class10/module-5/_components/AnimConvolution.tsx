"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const INPUT_MATRIX = [
  [1, 2, 0, 1, 3],
  [0, 1, 2, 3, 1],
  [3, 0, 1, 0, 2],
  [1, 2, 3, 1, 0],
  [0, 1, 0, 2, 1],
]

const KERNELS = [
  {
    name: "Edge Detect",
    values: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    desc: "Highlights edges by detecting sharp changes in pixel intensity. Center pixel gets high weight, neighbours get negative.",
  },
  {
    name: "Sharpen",
    values: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
    desc: "Makes images clearer by emphasising differences between a pixel and its neighbours.",
  },
  {
    name: "Blur",
    values: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    desc: "Averages surrounding pixel values, smoothing out noise and detail. Each position gets equal weight.",
  },
]

function convolve(input: number[][], kernel: number[][]): number[][] {
  const outSize = input.length - kernel.length + 1
  const result: number[][] = []
  for (let r = 0; r < outSize; r++) {
    const row: number[] = []
    for (let c = 0; c < outSize; c++) {
      let sum = 0
      for (let kr = 0; kr < kernel.length; kr++) {
        for (let kc = 0; kc < kernel.length; kc++) {
          sum += input[r + kr][c + kc] * kernel[kr][kc]
        }
      }
      row.push(sum)
    }
    result.push(row)
  }
  return result
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimConvolution() {
  const [kernelIdx, setKernelIdx] = useState(0)
  const [pos, setPos] = useState({ r: 0, c: 0 })

  const kernel = KERNELS[kernelIdx]
  const output = useMemo(() => convolve(INPUT_MATRIX, kernel.values), [kernel.values])
  const outSize = output.length

  // Current convolution calculation
  const calculation = useMemo(() => {
    const parts: { inputVal: number; kernelVal: number; product: number }[] = []
    let total = 0
    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const iv = INPUT_MATRIX[pos.r + kr][pos.c + kc]
        const kv = kernel.values[kr][kc]
        const prod = iv * kv
        parts.push({ inputVal: iv, kernelVal: kv, product: prod })
        total += prod
      }
    }
    return { parts, total }
  }, [pos, kernel.values])

  const maxAbs = Math.max(...output.flat().map(Math.abs), 1)

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Matrix Visualization ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        {/* Kernel selector */}
        <div className="flex gap-2 mb-5">
          {KERNELS.map((k, i) => (
            <button
              key={k.name}
              onClick={() => { setKernelIdx(i); setPos({ r: 0, c: 0 }) }}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: i === kernelIdx ? "#F97316" : "rgba(255,255,255,0.06)",
                color: i === kernelIdx ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${i === kernelIdx ? "#F97316" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {k.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {/* Input matrix */}
          <div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest text-center mb-2">Input (5×5)</p>
            <div className="grid grid-cols-5 gap-0.5">
              {INPUT_MATRIX.map((row, r) =>
                row.map((val, c) => {
                  const isHighlighted = r >= pos.r && r < pos.r + 3 && c >= pos.c && c < pos.c + 3
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="w-9 h-9 flex items-center justify-center text-xs font-mono font-bold rounded-sm transition-all"
                      style={{
                        background: isHighlighted ? "#3B82F630" : "rgba(255,255,255,0.04)",
                        border: isHighlighted ? "1px solid #3B82F660" : "1px solid rgba(255,255,255,0.06)",
                        color: isHighlighted ? "#93C5FD" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {val}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* × symbol */}
          <span className="text-white/20 text-lg font-bold">×</span>

          {/* Kernel */}
          <div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest text-center mb-2">Kernel (3×3)</p>
            <div className="grid grid-cols-3 gap-0.5">
              {kernel.values.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`k-${r}-${c}`}
                    className="w-9 h-9 flex items-center justify-center text-xs font-mono font-bold rounded-sm"
                    style={{
                      background: val > 0 ? "#F9731620" : val < 0 ? "#EF444420" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${val > 0 ? "#F9731640" : val < 0 ? "#EF444440" : "rgba(255,255,255,0.06)"}`,
                      color: val > 0 ? "#FDBA74" : val < 0 ? "#FCA5A5" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* = symbol */}
          <span className="text-white/20 text-lg font-bold">=</span>

          {/* Output feature map */}
          <div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest text-center mb-2">Output ({outSize}×{outSize})</p>
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${outSize}, 1fr)` }}>
              {output.map((row, r) =>
                row.map((val, c) => {
                  const isCurrent = r === pos.r && c === pos.c
                  const intensity = Math.abs(val) / maxAbs
                  return (
                    <motion.div
                      key={`o-${r}-${c}`}
                      className="w-9 h-9 flex items-center justify-center text-[10px] font-mono font-bold rounded-sm"
                      style={{
                        background: isCurrent
                          ? "#10B98140"
                          : `rgba(${val >= 0 ? "16,185,129" : "239,68,68"}, ${intensity * 0.3})`,
                        border: isCurrent ? "1px solid #10B98180" : "1px solid rgba(255,255,255,0.06)",
                        color: isCurrent ? "#6EE7B7" : val >= 0 ? "#86EFAC" : "#FCA5A5",
                      }}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {val}
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Position controls */}
        <div className="flex gap-2 mt-5">
          {Array.from({ length: outSize * outSize }, (_, i) => {
            const r = Math.floor(i / outSize)
            const c = i % outSize
            const isActive = pos.r === r && pos.c === c
            return (
              <button
                key={i}
                onClick={() => setPos({ r, c })}
                className="w-7 h-7 rounded-lg text-[9px] font-bold transition-all"
                style={{
                  background: isActive ? "#10B981" : "rgba(255,255,255,0.06)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.3)",
                  border: `1px solid ${isActive ? "#10B981" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                {r},{c}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Right: Calculation ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${pos.r}-${pos.c}-${kernelIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Position [{pos.r}, {pos.c}]</p>
            <h3 className="font-sora font-bold text-sm text-gray-900 mb-2">{kernel.name} Kernel</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{kernel.desc}</p>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Element-wise Multiply & Sum</p>
            <div className="space-y-1 mb-3">
              {calculation.parts.map((p, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono">
                  <span className="text-blue-500 w-5 text-right">{p.inputVal}</span>
                  <span className="text-gray-400">×</span>
                  <span className="text-orange-500 w-5 text-right">{p.kernelVal}</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-gray-700 w-6 text-right font-bold">{p.product}</span>
                  {i < calculation.parts.length - 1 && <span className="text-gray-300 ml-1">+</span>}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-emerald-700">Output Value</p>
                <p className="text-lg font-bold font-sora text-emerald-700">{calculation.total}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">How Convolution Works</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            The kernel <strong className="text-gray-700">slides</strong> over the input image.
            At each position, element-wise multiplication is performed and all products are summed
            to produce one output value.
          </p>
        </div>
      </div>
    </div>
  )
}
