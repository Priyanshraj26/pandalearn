"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Image as ImageIcon, Mic, Video, Code2, Sparkles } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type GenAIType = "text" | "image" | "audio" | "video" | "code"
type InfoTab   = "types" | "how"

// ── Node geometry (5-node radial, r=100 around 200,155) ───────────────────────

const NODE_GEO: Record<GenAIType, { cx: number; cy: number }> = {
  text:  { cx: 200, cy: 55  },   // top     (270°)
  image: { cx: 295, cy: 124 },   // upper-right (342°)
  audio: { cx: 259, cy: 241 },   // lower-right (54°)
  video: { cx: 141, cy: 241 },   // lower-left  (126°)
  code:  { cx: 105, cy: 124 },   // upper-left  (198°)
}
const HUB = { cx: 200, cy: 155 }
const ORDER: GenAIType[] = ["text", "image", "audio", "video", "code"]

// ── Metadata ──────────────────────────────────────────────────────────────────

const TYPES: Record<GenAIType, {
  label: string; color: string; dark: string; glow: string
  Icon: React.ElementType
  tagline: string
  desc:    string
  how:     string
  apps: { name: string; cat: string }[]
}> = {
  text: {
    label: "Text Generation", color: "#22D3EE", dark: "#0A2636", glow: "#0891B2",
    Icon: MessageSquare,
    tagline: "Write, summarise, translate, converse",
    desc: "AI that generates human-like text  articles, emails, code explanations, stories, and conversations. It learns from trillions of words on the internet.",
    how: "Large Language Models (LLMs) predict the most likely next word given all previous words, using transformer neural networks with billions of parameters.",
    apps: [
      { name: "ChatGPT",       cat: "Conversation"   },
      { name: "Google Gemini", cat: "Multimodal"     },
      { name: "Claude",        cat: "Analysis"       },
      { name: "Grammarly AI",  cat: "Writing assist" },
    ],
  },
  image: {
    label: "Image Generation", color: "#F97316", dark: "#2D1200", glow: "#EA580C",
    Icon: ImageIcon,
    tagline: "Create art, photos, designs from text",
    desc: "AI that creates photorealistic or artistic images from text descriptions. It learns from millions of labelled image-text pairs.",
    how: "Diffusion models start with random noise and gradually remove it to reveal an image guided by the text prompt. DALL-E, Midjourney and Stable Diffusion all use this approach.",
    apps: [
      { name: "DALL-E 3",       cat: "OpenAI"         },
      { name: "Midjourney",     cat: "Art creation"   },
      { name: "Stable Diffusion", cat: "Open source" },
      { name: "Adobe Firefly",  cat: "Design"         },
    ],
  },
  audio: {
    label: "Audio Generation", color: "#8B5CF6", dark: "#1A0A3D", glow: "#7C3AED",
    Icon: Mic,
    tagline: "Clone voices, compose music, transcribe speech",
    desc: "AI that generates realistic speech from text (text-to-speech), clones specific voices, and even composes music from text descriptions.",
    how: "Audio AI is trained on thousands of hours of speech and music. It learns the patterns of pitch, timing, and timbre to produce natural-sounding output.",
    apps: [
      { name: "ElevenLabs",  cat: "Voice cloning"   },
      { name: "Suno",        cat: "Music generation" },
      { name: "Whisper",     cat: "Transcription"    },
      { name: "Google TTS",  cat: "Voice synthesis"  },
    ],
  },
  video: {
    label: "Video Generation", color: "#EF4444", dark: "#2D0707", glow: "#DC2626",
    Icon: Video,
    tagline: "Generate, extend, or edit video from text",
    desc: "The newest form of GenAI  creates short videos from text prompts or extends/edits existing footage. The most compute-intensive type of GenAI.",
    how: "Video diffusion models generate sequences of image frames that flow coherently over time. Training requires enormous datasets of video footage and very large computational resources.",
    apps: [
      { name: "Sora (OpenAI)", cat: "Text-to-video"  },
      { name: "Runway",        cat: "Video editing"  },
      { name: "Pika Labs",     cat: "Short clips"    },
      { name: "Kling (Kuaishou)", cat: "Cinematic"   },
    ],
  },
  code: {
    label: "Code Generation", color: "#10B981", dark: "#0A2D1F", glow: "#059669",
    Icon: Code2,
    tagline: "Write, complete, debug, explain code",
    desc: "AI that writes functional code from natural language descriptions, auto-completes code as you type, identifies bugs, and explains existing code.",
    how: "Code LLMs are pre-trained on billions of lines of code from GitHub, Stack Overflow, and documentation. They learn syntax, patterns, and logic across dozens of programming languages.",
    apps: [
      { name: "GitHub Copilot", cat: "Code completion" },
      { name: "Cursor",         cat: "AI code editor"  },
      { name: "Replit AI",      cat: "Learning"        },
      { name: "Claude Code",    cat: "Engineering"     },
    ],
  },
}

// ── Particle ──────────────────────────────────────────────────────────────────

function Particle({ type, idx, speed = 1 }: { type: GenAIType; idx: number; speed?: number }) {
  const g = NODE_GEO[type]
  const meta = TYPES[type]
  const steps = 10
  const pts = Array.from({ length: steps }, (_, i) => ({
    x: HUB.cx + (g.cx - HUB.cx) * (i / (steps - 1)),
    y: HUB.cy + (g.cy - HUB.cy) * (i / (steps - 1)),
  }))
  return (
    <motion.circle r={3} fill={meta.color} filter="url(#gen-particle)"
      animate={{
        cx: pts.map(p => p.x),
        cy: pts.map(p => p.y),
        opacity: [0, 0, 1, 1, 1, 1, 1, 1, 0.4, 0],
      }}
      transition={{ duration: 1.8 / speed, repeat: Infinity, ease: "linear", delay: idx * 0.6 }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimGenAITypes() {
  const [active, setActive]     = useState<GenAIType>("text")
  const [autoPlay, setAutoPlay] = useState(true)
  const [infoTab, setInfoTab]   = useState<InfoTab>("types")

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setActive(prev => {
        const i = ORDER.indexOf(prev)
        return ORDER[(i + 1) % ORDER.length]
      })
    }, 4000)
    return () => clearInterval(id)
  }, [autoPlay])

  const handleClick = useCallback((t: GenAIType) => {
    setAutoPlay(false)
    setActive(t)
  }, [])

  const meta = TYPES[active]

  return (
    <div className="grid md:grid-cols-2">

      {/* ── SVG Canvas ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex items-center justify-center min-h-80 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, #0C1929 0%, #060A12 100%)" }} />

        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden>
          <defs>
            <pattern id="gen-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#CBD5E1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gen-dots)" />
        </svg>

        <svg viewBox="0 0 400 310" className="relative z-10 w-full max-w-xs px-4">
          <defs>
            <filter id="gen-particle" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="gen-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="gen-hub" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Connection spokes */}
          {ORDER.map(key => {
            const g = NODE_GEO[key]; const m = TYPES[key]; const ia = key === active
            return (
              <motion.line key={key}
                x1={HUB.cx} y1={HUB.cy} x2={g.cx} y2={g.cy}
                animate={{ stroke: ia ? m.color : "#1E293B", strokeWidth: ia ? 1.5 : 1, opacity: ia ? 0.65 : 0.2 }}
                transition={{ duration: 0.4 }}
              />
            )
          })}

          {/* Particles along active spoke */}
          <AnimatePresence>
            {[0, 1, 2].map(i => (
              <Particle key={`${active}-${i}`} type={active} idx={i} />
            ))}
          </AnimatePresence>

          {/* Hub pulse rings */}
          <motion.circle cx={HUB.cx} cy={HUB.cy} r={36}
            fill="none" stroke={meta.color} strokeWidth={1}
            animate={{ r: [36, 62, 36], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx={HUB.cx} cy={HUB.cy} r={36}
            fill="none" stroke={meta.color} strokeWidth={0.5}
            animate={{ r: [36, 85, 36], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          {/* Hub body */}
          <motion.circle cx={HUB.cx} cy={HUB.cy} r={36}
            animate={{ fill: meta.dark, stroke: meta.color, strokeWidth: 2 }}
            transition={{ duration: 0.4 }} filter="url(#gen-hub)"
          />
          <circle cx={HUB.cx} cy={HUB.cy} r={36} fill="none"
            stroke={meta.color} strokeWidth={2}
          />
          <text x={HUB.cx} y={HUB.cy - 6} textAnchor="middle" dominantBaseline="middle"
            fill="#F1F5F9" fontSize={9} fontWeight="800" letterSpacing="0.12em"
          >GEN</text>
          <text x={HUB.cx} y={HUB.cy + 7} textAnchor="middle" dominantBaseline="middle"
            fill="#64748B" fontSize={7} fontWeight="600"
          >AI</text>

          {/* Type nodes */}
          {ORDER.map(key => {
            const g = NODE_GEO[key]; const m = TYPES[key]; const ia = key === active
            return (
              <motion.g key={key}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(key)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
              >
                {ia && (
                  <motion.circle cx={g.cx} cy={g.cy} r={30}
                    fill={m.color} fillOpacity={0.08} filter="url(#gen-glow)"
                    animate={{ fillOpacity: [0.08, 0.22, 0.08] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <motion.circle cx={g.cx} cy={g.cy} r={26}
                  animate={{ fill: ia ? m.dark : "#0D1829", stroke: ia ? m.color : "#1E293B", strokeWidth: ia ? 2 : 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <text x={g.cx} y={g.cy - 4} textAnchor="middle" dominantBaseline="middle"
                  fill={ia ? m.color : "#475569"} fontSize={7} fontWeight="800"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </text>
                <text x={g.cx} y={g.cy + 6} textAnchor="middle" dominantBaseline="middle"
                  fill={ia ? "#94A3B8" : "#334155"} fontSize={6}
                >
                  {["text","code"].includes(key) ? "LLM" : key === "image" ? "Diffusion" : key === "video" ? "Video DM" : "Audio AI"}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Auto-play hint */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-center">
          {autoPlay ? (
            <p className="text-[10px] text-slate-600 italic">auto-cycling · click a node to pause</p>
          ) : (
            <button onClick={() => setAutoPlay(true)}
              className="text-[10px] text-slate-500 hover:text-slate-300 italic transition-colors"
            >
              resume auto-cycle ›
            </button>
          )}
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col">

        {/* Type tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {ORDER.map(key => {
            const m = TYPES[key]; const ia = key === active
            return (
              <button key={key}
                onClick={() => handleClick(key)}
                className="flex-1 py-2.5 text-[10px] font-bold transition-all relative shrink-0 whitespace-nowrap px-1"
                style={ia ? { color: m.color } : { color: "#94A3B8" }}
              >
                {m.label.split(" ")[0]}
                {ia && (
                  <motion.div layoutId="gen-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: m.color }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Info tab toggle */}
        <div className="flex border-b border-gray-50 bg-gray-50">
          {([
            { key: "types" as InfoTab, label: "What is it?" },
            { key: "how"   as InfoTab, label: "How it works" },
          ]).map(t => (
            <button key={t.key}
              onClick={() => setInfoTab(t.key)}
              className="flex-1 py-1.5 text-[10px] font-bold transition-all"
              style={infoTab === t.key ? { color: meta.color } : { color: "#9CA3AF" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div key={`${active}-${infoTab}`}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-3.5"
            >
              {infoTab === "types" ? (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <meta.Icon size={15} style={{ color: meta.color }} />
                      <h3 className="font-sora font-bold text-gray-900 text-sm">{meta.label}</h3>
                    </div>
                    <p className="text-[10px] text-amber-700 font-semibold italic">{meta.tagline}</p>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{meta.desc}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: meta.color }}>
                      Real tools
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {meta.apps.map(({ name, cat }) => (
                        <div key={name} className="rounded-lg px-2.5 py-1.5 border border-gray-100 bg-gray-50">
                          <p className="text-[11px] font-semibold text-gray-800 leading-tight">{name}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{cat}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: meta.color }}>
                      Technical Mechanism
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">{meta.how}</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 space-y-2">
                    <p className="text-[10px] font-bold text-gray-700">Generative vs Conventional AI</p>
                    {[
                      { aspect: "Goal",     gen: "Create new content",           conv: "Classify or predict from input" },
                      { aspect: "Output",   gen: "Text, image, audio, video",     conv: "A label, score, or decision"   },
                      { aspect: "Example",  gen: "Write an essay on climate",     conv: "Is this email spam? Yes/No"    },
                      { aspect: "Training", gen: "Self-supervised on huge data",  conv: "Supervised on labelled data"   },
                    ].map(row => (
                      <div key={row.aspect} className="grid grid-cols-3 gap-1 text-[9px]">
                        <span className="font-bold text-gray-500">{row.aspect}</span>
                        <span className="text-emerald-700 leading-snug">{row.gen}</span>
                        <span className="text-blue-700 leading-snug">{row.conv}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-1 text-[9px] border-t border-gray-200 pt-1.5">
                      <span></span>
                      <span className="font-bold text-emerald-600">GenAI ↑</span>
                      <span className="font-bold text-blue-600">Conventional ↑</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
