"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Eye as EyeIcon, BarChart3 } from "lucide-react"

type Domain = "nlp" | "cv" | "data"
const ORDER: Domain[] = ["nlp", "cv", "data"]

const DOMAIN_META = {
  nlp: {
    label: "Natural Language Processing",
    short: "NLP",
    tagline: "Teaching machines to read & speak",
    color: "#60A5FA",
    colorMid: "#3B82F6",
    colorDark: "#1D4ED8",
    glow: "rgba(96,165,250,0.22)",
    Icon: MessageSquare,
    stat: { val: 47, note: "K queries / sec" },
    desc: "AI that reads, understands, and generates human language at massive scale.",
    tasks: [
      "Translate 100+ languages instantly",
      "Answer questions from raw text",
      "Detect tone, sentiment & intent",
      "Summarise long documents",
      "Power voice assistants",
    ],
    apps: [
      { name: "Google Translate", cat: "Translation"  },
      { name: "ChatGPT",          cat: "Generation"   },
      { name: "Gmail Smart Reply",cat: "Completion"   },
      { name: "Alexa / Siri",     cat: "Voice AI"     },
    ],
  },
  cv: {
    label: "Computer Vision",
    short: "CV",
    tagline: "Giving machines the ability to see",
    color: "#34D399",
    colorMid: "#10B981",
    colorDark: "#065F46",
    glow: "rgba(52,211,153,0.22)",
    Icon: EyeIcon,
    stat: { val: 28, note: "K frames / sec" },
    desc: "AI that interprets images and video the way the human eye and brain do.",
    tasks: [
      "Detect objects, faces & scenes",
      "Read medical X-rays & MRI scans",
      "Guide self-driving car cameras",
      "Real-time quality control",
      "Reconstruct 3D scenes from photos",
    ],
    apps: [
      { name: "Face ID",          cat: "Biometrics" },
      { name: "Tesla Autopilot",  cat: "Vehicles"   },
      { name: "Google Photos",    cat: "Search"     },
      { name: "AI Radiology",     cat: "Healthcare" },
    ],
  },
  data: {
    label: "Data & Statistics",
    short: "Data",
    tagline: "Finding patterns hidden in numbers",
    color: "#FB923C",
    colorMid: "#F97316",
    colorDark: "#9A3412",
    glow: "rgba(251,146,60,0.22)",
    Icon: BarChart3,
    stat: { val: 92, note: "K inferences / sec" },
    desc: "AI that discovers hidden patterns in numbers to predict, rank, and recommend.",
    tasks: [
      "Recommend movies, songs & products",
      "Forecast weather & stock prices",
      "Flag fraudulent transactions",
      "Score credit risk in real-time",
      "Personalise ads to each user",
    ],
    apps: [
      { name: "Netflix",       cat: "Recommendation" },
      { name: "Spotify",       cat: "Discovery"      },
      { name: "PayPal Fraud",  cat: "Security"       },
      { name: "Google Ads",    cat: "Targeting"      },
    ],
  },
}

export default function AnimAIDomains() {
  const [active, setActive]     = useState<Domain>("nlp")
  const [counter, setCounter]   = useState(DOMAIN_META.nlp.stat.val)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setActive(prev => ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length])
    }, 4500)
    return () => clearInterval(id)
  }, [autoPlay])

  useEffect(() => {
    const target = DOMAIN_META[active].stat.val
    let cur = counter
    const step = (target - cur) / 18
    const id = setInterval(() => {
      cur += step
      if (Math.abs(cur - target) < 0.5) { setCounter(target); clearInterval(id) }
      else setCounter(Math.round(cur))
    }, 35)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const pick = useCallback((d: Domain) => { setAutoPlay(false); setActive(d) }, [])

  const meta = DOMAIN_META[active]

  return (
    <div className="bg-[#07090F] select-none overflow-hidden">

      {/* ── Top selector bar ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-3">
        {ORDER.map((key, ki) => {
          const m  = DOMAIN_META[key]
          const ia = key === active
          return (
            <motion.button
              key={key}
              onClick={() => pick(key)}
              className="relative flex flex-col items-center gap-2 py-5 px-2 overflow-hidden border-b"
              style={{ borderColor: ia ? `${m.color}50` : "#111827" }}
              whileTap={{ scale: 0.97 }}
            >
              {/* gradient fill when active */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: ia ? 1 : 0 }}
                style={{
                  background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${m.glow}, transparent 70%)`,
                }}
              />

              {/* divider between cards */}
              {ki < 2 && <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-[#1a2035]" />}

              {/* icon bubble */}
              <motion.div
                animate={{
                  background: ia ? `${m.color}22` : "#111827",
                  borderColor: ia ? `${m.color}55` : "#1e2d42",
                  boxShadow: ia ? `0 0 18px ${m.glow}` : "none",
                }}
                transition={{ duration: 0.35 }}
                className="relative w-11 h-11 rounded-2xl border flex items-center justify-center"
              >
                <m.Icon size={20} style={{ color: ia ? m.color : "#334155" }} />
              </motion.div>

              <div className="relative z-10 text-center">
                <p
                  className="text-xs font-bold tracking-wide"
                  style={{ color: ia ? m.color : "#4B5563" }}
                >
                  {m.short}
                </p>
                <p className="text-[9px] text-slate-600 mt-0.5 leading-tight hidden sm:block max-w-25">
                  {m.tagline}
                </p>
              </div>

              {/* active underline */}
              {ia && (
                <motion.div
                  layoutId="domain-line"
                  className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* ── Detail panel ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="grid sm:grid-cols-[1fr_1fr] gap-0"
        >
          {/* Left column ─ description + tasks */}
          <div className="p-5 space-y-4 border-r border-[#111827]">

            {/* domain header */}
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: `${meta.color}18`,
                  border: `1px solid ${meta.color}35`,
                  boxShadow: `0 0 12px ${meta.glow}`,
                }}
              >
                <meta.Icon size={17} style={{ color: meta.color }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-snug">{meta.label}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{meta.desc}</p>
              </div>
            </div>

            {/* live stat pill */}
            <motion.div
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{
                background: `${meta.color}0C`,
                border: `1px solid ${meta.color}25`,
              }}
            >
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Global activity</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{meta.stat.note}</p>
              </div>
              <div className="flex items-end gap-0.5">
                <motion.span
                  key={`${active}-${counter}`}
                  initial={{ scale: 1.25, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold font-sora"
                  style={{ color: meta.color, textShadow: `0 0 20px ${meta.glow}` }}
                >
                  {counter}
                </motion.span>
                <span className="text-base font-bold pb-0.5 ml-0.5" style={{ color: meta.color }}>K</span>
              </div>
            </motion.div>

            {/* tasks */}
            <div>
              <p
                className="text-[9px] font-bold uppercase tracking-widest mb-3"
                style={{ color: meta.color }}
              >
                What it enables
              </p>
              <ul className="space-y-2">
                {meta.tasks.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}30` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                    </div>
                    <span className="text-xs text-slate-300">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column ─ real-world apps */}
          <div className="p-5 space-y-3 flex flex-col">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Real-world examples</p>

            <div className="flex-1 grid grid-rows-4 gap-2">
              {meta.apps.map(({ name, cat }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                  style={{
                    background: `${meta.color}09`,
                    border: `1px solid ${meta.color}1E`,
                  }}
                >
                  {/* letter avatar */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: `${meta.color}22`,
                      color: meta.color,
                      boxShadow: `0 0 8px ${meta.glow}`,
                    }}
                  >
                    {name[0]}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-200 leading-tight truncate">{name}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{cat}</p>
                  </div>

                  <span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: `${meta.color}1A`, color: meta.color }}
                  >
                    LIVE
                  </span>
                </motion.div>
              ))}
            </div>

            {/* progress dots / autoplay */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1.5 items-center">
                {ORDER.map(k => (
                  <motion.div
                    key={k}
                    animate={{
                      width: k === active ? 18 : 5,
                      background: k === active ? meta.color : "#1E293B",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
              {autoPlay ? (
                <span className="text-[9px] text-slate-700">auto-cycling · click to pause</span>
              ) : (
                <button
                  onClick={() => setAutoPlay(true)}
                  className="text-[9px] text-slate-600 hover:text-slate-400 transition-colors"
                >
                  resume ›
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
