"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const GRID_SIZE = 8
const PRESETS = [
  {
    name: "Sunset",
    grid: (() => {
      const g: [number, number, number][][] = []
      for (let r = 0; r < GRID_SIZE; r++) {
        const row: [number, number, number][] = []
        for (let c = 0; c < GRID_SIZE; c++) {
          const rr = Math.round(255 - r * 15)
          const gg = Math.round(100 + c * 10 - r * 8)
          const bb = Math.round(50 + r * 20)
          row.push([Math.min(255, Math.max(0, rr)), Math.min(255, Math.max(0, gg)), Math.min(255, Math.max(0, bb))])
        }
        g.push(row)
      }
      return g
    })(),
  },
  {
    name: "Ocean",
    grid: (() => {
      const g: [number, number, number][][] = []
      for (let r = 0; r < GRID_SIZE; r++) {
        const row: [number, number, number][] = []
        for (let c = 0; c < GRID_SIZE; c++) {
          const rr = Math.round(10 + r * 5)
          const gg = Math.round(80 + c * 15 + r * 5)
          const bb = Math.round(150 + r * 10 + c * 3)
          row.push([Math.min(255, Math.max(0, rr)), Math.min(255, Math.max(0, gg)), Math.min(255, Math.max(0, bb))])
        }
        g.push(row)
      }
      return g
    })(),
  },
  {
    name: "Forest",
    grid: (() => {
      const g: [number, number, number][][] = []
      for (let r = 0; r < GRID_SIZE; r++) {
        const row: [number, number, number][] = []
        for (let c = 0; c < GRID_SIZE; c++) {
          const rr = Math.round(20 + c * 8)
          const gg = Math.round(80 + r * 15 + c * 5)
          const bb = Math.round(15 + r * 5)
          row.push([Math.min(255, Math.max(0, rr)), Math.min(255, Math.max(0, gg)), Math.min(255, Math.max(0, bb))])
        }
        g.push(row)
      }
      return g
    })(),
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimPixelsExplorer() {
  const [presetIdx, setPresetIdx] = useState(0)
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [showGrayscale, setShowGrayscale] = useState(false)

  const grid = PRESETS[presetIdx].grid

  const handlePixelClick = useCallback((r: number, c: number) => {
    setSelected(prev => (prev?.r === r && prev?.c === c) ? null : { r, c })
  }, [])

  const selectedPixel = selected ? grid[selected.r][selected.c] : null
  const grayscaleValue = selectedPixel
    ? Math.round(0.299 * selectedPixel[0] + 0.587 * selectedPixel[1] + 0.114 * selectedPixel[2])
    : null

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Pixel Grid ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 mb-4">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => { setPresetIdx(i); setSelected(null) }}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: i === presetIdx ? "#7C3AED" : "rgba(255,255,255,0.06)",
                color: i === presetIdx ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${i === presetIdx ? "#7C3AED" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Pixel grid */}
        <div
          className="grid gap-0.5 rounded-xl overflow-hidden border border-white/10 p-1"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {grid.map((row, r) =>
            row.map((pixel, c) => {
              const isSelected = selected?.r === r && selected?.c === c
              const [red, green, blue] = pixel
              const gray = Math.round(0.299 * red + 0.587 * green + 0.114 * blue)
              const bg = showGrayscale
                ? `rgb(${gray},${gray},${gray})`
                : `rgb(${red},${green},${blue})`

              return (
                <motion.button
                  key={`${r}-${c}`}
                  onClick={() => handlePixelClick(r, c)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm transition-all"
                  style={{
                    background: bg,
                    outline: isSelected ? "2px solid #fff" : "none",
                    outlineOffset: "1px",
                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                    zIndex: isSelected ? 10 : 1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              )
            })
          )}
        </div>

        {/* Grayscale toggle */}
        <button
          onClick={() => setShowGrayscale(g => !g)}
          className="mt-4 px-4 py-1.5 rounded-full text-xs font-bold transition-all"
          style={{
            background: showGrayscale ? "#6B7280" : "rgba(255,255,255,0.06)",
            color: showGrayscale ? "#fff" : "rgba(255,255,255,0.4)",
            border: `1px solid ${showGrayscale ? "#6B7280" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          {showGrayscale ? "🔲 Grayscale ON" : "🎨 Show Grayscale"}
        </button>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          {selected && selectedPixel ? (
            <motion.div
              key={`${selected.r}-${selected.c}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Pixel [{selected.r}, {selected.c}]
              </p>
              <h3 className="font-sora font-bold text-sm text-gray-900 mb-3">RGB Values</h3>

              {/* Color preview */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-xl border border-gray-200 shadow-sm"
                  style={{ background: `rgb(${selectedPixel[0]},${selectedPixel[1]},${selectedPixel[2]})` }}
                />
                {grayscaleValue !== null && (
                  <div
                    className="w-14 h-14 rounded-xl border border-gray-200 shadow-sm"
                    style={{ background: `rgb(${grayscaleValue},${grayscaleValue},${grayscaleValue})` }}
                  />
                )}
              </div>

              {/* RGB bars */}
              {[
                { label: "Red", value: selectedPixel[0], color: "#EF4444" },
                { label: "Green", value: selectedPixel[1], color: "#10B981" },
                { label: "Blue", value: selectedPixel[2], color: "#3B82F6" },
              ].map(ch => (
                <div key={ch.label} className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold" style={{ color: ch.color }}>{ch.label}</span>
                    <span className="font-mono font-bold text-gray-700">{ch.value}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: ch.color }}
                      animate={{ width: `${(ch.value / 255) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              ))}

              {/* Grayscale value */}
              {grayscaleValue !== null && (
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 mt-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Grayscale Value</p>
                  <p className="text-sm font-bold font-sora text-gray-800">{grayscaleValue}</p>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">
                    0.299×{selectedPixel[0]} + 0.587×{selectedPixel[1]} + 0.114×{selectedPixel[2]}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <p className="text-4xl mb-3">👆</p>
              <p className="text-sm font-sora font-bold text-gray-700 mb-1">Click a Pixel</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Click any pixel square to see its RGB colour values and grayscale conversion.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">How It Works</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Every digital image is a grid of <strong className="text-gray-700">pixels</strong>.
            Each pixel stores 3 numbers (R, G, B) from 0-255. Computers &quot;see&quot; images
            as matrices of these numbers.
          </p>
        </div>
      </div>
    </div>
  )
}
