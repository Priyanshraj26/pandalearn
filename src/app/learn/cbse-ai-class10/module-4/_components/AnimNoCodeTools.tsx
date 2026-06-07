"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: "azure-ml",
    name: "Azure Machine Learning",
    developer: "Microsoft",
    year: "July 2014",
    color: "#0078D4",
    emoji: "☁️",
    capabilities: ["Drag-and-drop ML pipeline designer", "AutoML for model selection", "Enterprise-grade deployment", "Integration with Azure cloud"],
    bestFor: "Enterprise-level ML projects with large datasets and team collaboration",
    difficulty: 3, // out of 5
  },
  {
    id: "automl",
    name: "Google Cloud AutoML",
    developer: "Google",
    year: "January 2018",
    color: "#4285F4",
    emoji: "🤖",
    capabilities: ["Auto-trains custom ML models", "Vision, NLP, and tabular data support", "Transfer learning built-in", "No ML expertise needed"],
    bestFor: "Custom model training when you have your own data but no ML expertise",
    difficulty: 2,
  },
  {
    id: "orange",
    name: "Orange Data Mining",
    developer: "University of Ljubljana",
    year: "October 1996",
    color: "#E67E22",
    emoji: "🍊",
    capabilities: ["Visual data analysis widgets", "Interactive data visualisation", "Open-source and free", "Educational tool for learning ML"],
    bestFor: "Learning ML concepts, academic research, and visual data exploration",
    difficulty: 1,
  },
  {
    id: "lobe",
    name: "Lobe AI",
    developer: "Microsoft",
    year: "2015",
    color: "#7C3AED",
    emoji: "📸",
    capabilities: ["Specialised in image classification", "Simple label-and-train workflow", "Export to TensorFlow or ONNX", "Works completely offline"],
    bestFor: "Quick image classification projects — label images and get a model",
    difficulty: 1,
  },
  {
    id: "teachable-machine",
    name: "Teachable Machine",
    developer: "Google",
    year: "November 2017",
    color: "#34A853",
    emoji: "🎓",
    capabilities: ["Webcam-based model training", "Image, sound, and pose recognition", "Runs entirely in the browser", "Share models via URL"],
    bestFor: "Quick webcam-based prototypes — train a model in minutes",
    difficulty: 1,
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimNoCodeTools() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!paused) {
        setActive(prev => (prev + 1) % TOOLS.length)
      }
    }, 5000)
  }, [paused])

  useEffect(() => {
    startCycle()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startCycle])

  const handleClick = useCallback((i: number) => {
    setActive(i)
    setPaused(true)
    // Resume after 15s of inactivity
    setTimeout(() => setPaused(false), 15000)
  }, [])

  const tool = TOOLS[active]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Tool Grid ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-5">5 No-Code AI Platforms</p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {TOOLS.map((t, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={t.id}
                onClick={() => handleClick(i)}
                className="rounded-xl border p-4 text-left transition-all"
                style={{
                  borderColor: isActive ? t.color : "rgba(255,255,255,0.06)",
                  background: isActive ? t.color + "12" : "rgba(255,255,255,0.02)",
                  gridColumn: i === 4 ? "span 2" : undefined,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={isActive ? { boxShadow: `0 0 20px ${t.color}20` } : { boxShadow: "none" }}
              >
                <span className="text-2xl block mb-1.5">{t.emoji}</span>
                <p className="text-xs font-bold truncate" style={{ color: isActive ? t.color : "rgba(255,255,255,0.5)" }}>
                  {t.name}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: isActive ? t.color + "80" : "rgba(255,255,255,0.25)" }}>
                  {t.developer}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Auto-cycle indicator */}
        <div className="flex items-center gap-2 mt-4">
          {TOOLS.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === active ? TOOLS[active].color : "rgba(255,255,255,0.15)",
                transform: i === active ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
          {paused && (
            <span className="text-[9px] text-white/20 ml-2">⏸ paused</span>
          )}
        </div>
      </div>

      {/* ── Right: Tool Details ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tool {active + 1} of 5</p>
            <h3 className="font-sora font-bold text-sm mb-0.5" style={{ color: tool.color }}>
              {tool.emoji} {tool.name}
            </h3>
            <p className="text-[11px] text-gray-400 mb-3">{tool.developer} · Est. {tool.year}</p>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Capabilities</p>
            <div className="space-y-1.5 mb-4">
              {tool.capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 text-xs text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tool.color }} />
                  {cap}
                </motion.div>
              ))}
            </div>

            <div className="p-3 rounded-xl border mb-4" style={{ borderColor: tool.color + "30", background: tool.color + "08" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: tool.color }}>Best For</p>
              <p className="text-xs" style={{ color: tool.color }}>{tool.bestFor}</p>
            </div>

            {/* Difficulty gauge */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Difficulty Level</p>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(level => (
                <div
                  key={level}
                  className="h-3 flex-1 rounded-full transition-all"
                  style={{
                    background: level <= tool.difficulty ? tool.color : "#E5E7EB",
                    opacity: level <= tool.difficulty ? 1 : 0.4,
                  }}
                />
              ))}
              <span className="text-[10px] font-bold text-gray-500 ml-1.5">
                {tool.difficulty <= 1 ? "Easy" : tool.difficulty <= 2 ? "Moderate" : "Advanced"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Click to Explore</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Click any tool card to pause auto-cycling and explore details. Auto-cycling resumes after 15 seconds.
          </p>
        </div>
      </div>
    </div>
  )
}
