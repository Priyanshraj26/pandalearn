"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    id: "input",
    label: "Input",
    color: "#3B82F6",
    emoji: "📷",
    shape: "28 × 28 × 3",
    desc: "Raw image data — each pixel has 3 colour channels (RGB). The network receives this as a 3D matrix of numbers.",
    detail: "A 28×28 colour image = 2,352 input values. Each value is 0-255.",
    visual: { w: 28, h: 28, channels: 3 },
  },
  {
    id: "conv",
    label: "Convolution",
    color: "#F97316",
    emoji: "🔍",
    shape: "26 × 26 × 32",
    desc: "Multiple 3×3 kernels slide over the image, detecting features like edges, corners, and textures. Each kernel produces one feature map.",
    detail: "32 different kernels = 32 feature maps. Each detects a different pattern.",
    visual: { w: 26, h: 26, channels: 32 },
  },
  {
    id: "relu",
    label: "ReLU",
    color: "#10B981",
    emoji: "⚡",
    shape: "26 × 26 × 32",
    desc: "Activation function: replaces all negative values with 0. Keeps positive values unchanged. Adds non-linearity so the network can learn complex patterns.",
    detail: "f(x) = max(0, x). Negative → 0, Positive → unchanged. Simple but powerful.",
    visual: { w: 26, h: 26, channels: 32 },
  },
  {
    id: "pool",
    label: "Max Pooling",
    color: "#F59E0B",
    emoji: "📐",
    shape: "13 × 13 × 32",
    desc: "Reduces dimensions by taking the maximum value in each 2×2 window. Keeps the strongest features while cutting data in half.",
    detail: "2×2 pooling with stride 2: 26×26 → 13×13. 75% fewer values, key patterns preserved.",
    visual: { w: 13, h: 13, channels: 32 },
  },
  {
    id: "fc",
    label: "Fully Connected",
    color: "#7C3AED",
    emoji: "🧠",
    shape: "1 × 1 × 128",
    desc: "Flattens the feature maps into a 1D vector and connects every neuron to every other. This layer learns which feature combinations predict each class.",
    detail: "All spatial info is collapsed. Each neuron considers all features together.",
    visual: { w: 1, h: 1, channels: 128 },
  },
  {
    id: "output",
    label: "Output",
    color: "#EF4444",
    emoji: "🎯",
    shape: "1 × 1 × 10",
    desc: "Final layer with one neuron per class. Uses softmax to convert raw scores into probabilities that sum to 100%.",
    detail: "10 classes = 10 neurons. Highest probability = predicted class.",
    visual: { w: 1, h: 1, channels: 10 },
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimCNNLayers() {
  const [active, setActive] = useState(0)
  const layer = LAYERS[active]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Layer Pipeline ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-5">CNN Architecture</p>

        {/* Pipeline flow */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {LAYERS.map((l, i) => {
            const isActive = i === active
            const isPast = i < active
            return (
              <div key={l.id} className="flex items-center gap-1.5">
                <motion.button
                  onClick={() => setActive(i)}
                  className="rounded-xl px-3 py-2.5 text-center transition-all min-w-16"
                  style={{
                    background: isActive ? l.color + "20" : isPast ? l.color + "08" : "rgba(255,255,255,0.03)",
                    border: `1.5px solid ${isActive ? l.color : isPast ? l.color + "30" : "rgba(255,255,255,0.06)"}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg block">{l.emoji}</span>
                  <p className="text-[9px] font-bold mt-1" style={{ color: isActive ? l.color : isPast ? l.color + "80" : "rgba(255,255,255,0.3)" }}>
                    {l.label}
                  </p>
                </motion.button>
                {i < LAYERS.length - 1 && (
                  <motion.div
                    className="w-4 h-0.5 rounded-full"
                    style={{ background: isPast ? LAYERS[i + 1].color + "40" : "rgba(255,255,255,0.06)" }}
                    animate={isActive ? { scaleX: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Data shape visualization */}
        <motion.div
          className="mt-8 flex flex-col items-center"
          key={layer.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="rounded-xl border flex items-center justify-center"
            style={{
              width: Math.max(60, Math.min(200, layer.visual.w * 5)),
              height: Math.max(40, Math.min(120, layer.visual.h * 3)),
              background: layer.color + "10",
              borderColor: layer.color + "30",
            }}
          >
            <span className="text-xs font-mono font-bold" style={{ color: layer.color }}>
              {layer.shape}
            </span>
          </div>
          <p className="text-[10px] text-white/30 mt-2">Data shape at this layer</p>
        </motion.div>

        {/* Step controls */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-30"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => setActive(Math.min(LAYERS.length - 1, active + 1))}
            disabled={active === LAYERS.length - 1}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-30"
            style={{
              background: layer.color,
              color: "#fff",
              border: `1px solid ${layer.color}`,
            }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* ── Right: Layer Details ── */}
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
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Layer {active + 1} of {LAYERS.length}</p>
            <h3 className="font-sora font-bold text-sm mb-1" style={{ color: layer.color }}>
              {layer.emoji} {layer.label}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{layer.desc}</p>

            <div className="p-3 rounded-xl border mb-4" style={{ borderColor: layer.color + "30", background: layer.color + "08" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: layer.color }}>Shape</p>
              <p className="text-sm font-bold font-mono" style={{ color: layer.color }}>{layer.shape}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 mb-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Technical Detail</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">{layer.detail}</p>
            </div>

            {/* Progress indicator */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pipeline Progress</p>
            <div className="flex gap-1">
              {LAYERS.map((l, i) => (
                <div
                  key={l.id}
                  className="flex-1 h-2 rounded-full transition-all"
                  style={{
                    background: i <= active ? l.color : "#E5E7EB",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">CNN Flow</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Input → Conv → ReLU → Pool → FC → Output</strong>.
            Each layer transforms data, extracting increasingly abstract features from raw pixels to final predictions.
          </p>
        </div>
      </div>
    </div>
  )
}
