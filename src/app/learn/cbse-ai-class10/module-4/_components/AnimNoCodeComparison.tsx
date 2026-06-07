"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const APPROACHES = [
  {
    id: "full-code",
    label: "Full-Code",
    color: "#3B82F6",
    icon: "💻",
    who: "Data scientists, ML engineers, programmers",
    time: "Weeks to months",
    flexibility: 95,
    cost: "High — needs skilled developers",
    tools: "Python, TensorFlow, PyTorch, scikit-learn",
    pros: ["Maximum flexibility and control", "Can build any model architecture", "Full customisation of every parameter", "Best for cutting-edge research"],
    cons: ["Requires deep coding knowledge", "Slower development cycle", "Higher cost and learning curve", "More prone to coding errors"],
  },
  {
    id: "low-code",
    label: "Low-Code",
    color: "#F97316",
    icon: "🔧",
    who: "Developers with some AI knowledge, power users",
    time: "Days to weeks",
    flexibility: 60,
    cost: "Medium — needs some technical skill",
    tools: "AWS SageMaker, DataRobot, H2O.ai",
    pros: ["Faster than full-code", "Visual + code hybrid approach", "Good balance of speed and control", "Templates for common use cases"],
    cons: ["Still requires some programming", "Less flexible than full-code", "Platform lock-in risk", "Limited for novel architectures"],
  },
  {
    id: "no-code",
    label: "No-Code",
    color: "#10B981",
    icon: "🎨",
    who: "Anyone — doctors, teachers, architects, musicians, students",
    time: "Hours to days",
    flexibility: 25,
    cost: "Low — no programming needed",
    tools: "Teachable Machine, Orange, Lobe AI, AutoML",
    pros: ["No coding required at all", "Visual drag-and-drop interface", "Real-time preview of results", "Democratises AI for everyone"],
    cons: ["Limited flexibility", "Automation bias risk", "Security concerns with cloud tools", "Cannot build complex custom models"],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimNoCodeComparison() {
  const [active, setActive] = useState(2) // Default to No-Code
  const approach = APPROACHES[active]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Visual comparison ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">Coding Spectrum</p>

        <div className="flex gap-4 w-full max-w-md">
          {APPROACHES.map((a, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={a.id}
                onClick={() => setActive(i)}
                className="flex-1 rounded-2xl border p-4 text-center transition-all"
                style={{
                  borderColor: isActive ? a.color : "rgba(255,255,255,0.08)",
                  background: isActive ? a.color + "15" : "rgba(255,255,255,0.03)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-3xl block mb-2">{a.icon}</span>
                <p className="text-xs font-bold mb-2" style={{ color: isActive ? a.color : "rgba(255,255,255,0.5)" }}>
                  {a.label}
                </p>

                {/* Code visualization */}
                <div className="space-y-1">
                  {a.id === "full-code" && (
                    <>
                      {[...Array(5)].map((_, j) => (
                        <div
                          key={j}
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${50 + Math.random() * 50}%`,
                            background: isActive ? a.color + "60" : "rgba(255,255,255,0.08)",
                            marginLeft: j > 0 && j < 4 ? "12px" : "0",
                          }}
                        />
                      ))}
                    </>
                  )}
                  {a.id === "low-code" && (
                    <>
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${60 + Math.random() * 30}%`,
                            background: j % 2 === 0
                              ? (isActive ? a.color + "60" : "rgba(255,255,255,0.08)")
                              : (isActive ? a.color + "30" : "rgba(255,255,255,0.04)"),
                          }}
                        />
                      ))}
                      <div className="flex gap-1 mt-1">
                        {[...Array(2)].map((_, j) => (
                          <div
                            key={j}
                            className="h-4 rounded flex-1"
                            style={{
                              background: isActive ? a.color + "20" : "rgba(255,255,255,0.04)",
                              border: `1px solid ${isActive ? a.color + "30" : "rgba(255,255,255,0.06)"}`,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {a.id === "no-code" && (
                    <div className="space-y-1">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="h-5 rounded-lg flex items-center justify-center"
                          style={{
                            background: isActive ? a.color + "15" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isActive ? a.color + "30" : "rgba(255,255,255,0.06)"}`,
                          }}
                        >
                          <div
                            className="w-3 h-1 rounded-full"
                            style={{ background: isActive ? a.color + "50" : "rgba(255,255,255,0.1)" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Flexibility bar */}
        <div className="w-full max-w-md mt-6">
          <div className="flex items-center justify-between text-[10px] text-white/30 mb-2">
            <span>Flexibility</span>
            <span>{approach.flexibility}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: approach.color }}
              animate={{ width: `${approach.flexibility}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* ── Right: Details ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={approach.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Approach {active + 1} of 3</p>
            <h3 className="font-sora font-bold text-sm mb-1" style={{ color: approach.color }}>
              {approach.icon} {approach.label}
            </h3>

            <div className="space-y-2.5 mt-3">
              {[
                ["Who Uses It", approach.who],
                ["Time to Build", approach.time],
                ["Cost", approach.cost],
                ["Common Tools", approach.tools],
              ].map(([label, value]) => (
                <div key={label} className="text-[11px]">
                  <span className="font-bold text-gray-700">{label}: </span>
                  <span className="text-gray-500">{value}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5">
                <p className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Pros</p>
                <div className="space-y-1">
                  {approach.pros.map((p, i) => (
                    <motion.p
                      key={p}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="text-[10px] text-emerald-700 flex items-start gap-1"
                    >
                      <span className="text-emerald-500 shrink-0">+</span> {p}
                    </motion.p>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-2.5">
                <p className="text-[9px] font-bold text-red-700 uppercase tracking-wider mb-1">Cons</p>
                <div className="space-y-1">
                  {approach.cons.map((c, i) => (
                    <motion.p
                      key={c}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="text-[10px] text-red-700 flex items-start gap-1"
                    >
                      <span className="text-red-500 shrink-0">−</span> {c}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Takeaway</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            No-Code AI <strong className="text-gray-700">democratises AI</strong> — making it accessible
            to anyone regardless of their programming background.
          </p>
        </div>
      </div>
    </div>
  )
}
