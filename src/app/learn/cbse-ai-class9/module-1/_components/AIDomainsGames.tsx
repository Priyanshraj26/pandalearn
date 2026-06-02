"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, MessageSquare, BarChart3, RotateCcw, ChevronRight, Sparkles, Pencil } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// QUICK DRAW  Computer Vision game
// ─────────────────────────────────────────────────────────────────────────────

const DRAW_PROMPTS: { prompt: string; emoji: string; results: [string, number][] }[] = [
  {
    prompt: "Draw a sun",  emoji: "☀️",
    results: [["Sun", 0.84], ["Moon", 0.07], ["Star", 0.05], ["Cloud", 0.03], ["Flower", 0.01]],
  },
  {
    prompt: "Draw a cat",  emoji: "🐱",
    results: [["Cat", 0.79], ["Dog", 0.11], ["Rabbit", 0.06], ["Tiger", 0.03], ["Fox", 0.01]],
  },
  {
    prompt: "Draw a house", emoji: "🏠",
    results: [["House", 0.88], ["Church", 0.05], ["Castle", 0.04], ["Bridge", 0.02], ["Tower", 0.01]],
  },
  {
    prompt: "Draw a car",  emoji: "🚗",
    results: [["Car", 0.76], ["Bus", 0.12], ["Truck", 0.07], ["Train", 0.03], ["Boat", 0.02]],
  },
  {
    prompt: "Draw a tree", emoji: "🌳",
    results: [["Tree", 0.82], ["Plant", 0.08], ["Flower", 0.06], ["Cactus", 0.03], ["Mushroom", 0.01]],
  },
]

function QuickDrawGame() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const drawing     = useRef(false)
  const [promptIdx, setPromptIdx]  = useState(0)
  const [phase,     setPhase]      = useState<"draw" | "analyzing" | "result">("draw")
  const [bars,      setBars]       = useState<[string, number][]>([])
  const [score,     setScore]      = useState(0)
  const [hasDrawn,  setHasDrawn]   = useState(false)

  const prompt = DRAW_PROMPTS[promptIdx]

  // set up canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#1F2937"
    ctx.lineWidth   = 4
    ctx.lineCap     = "round"
    ctx.lineJoin    = "round"
    setHasDrawn(false)

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width  / rect.width
      const scaleY = canvas.height / rect.height
      const src = "touches" in e ? e.touches[0] : e
      return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY }
    }

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      drawing.current = true
      const { x, y } = getPos(e)
      ctx.beginPath(); ctx.moveTo(x, y)
    }
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return
      e.preventDefault()
      setHasDrawn(true)
      const { x, y } = getPos(e)
      ctx.lineTo(x, y); ctx.stroke()
    }
    const stop = () => { drawing.current = false }

    canvas.addEventListener("mousedown",  start)
    canvas.addEventListener("mousemove",  move)
    canvas.addEventListener("mouseup",    stop)
    canvas.addEventListener("mouseleave", stop)
    canvas.addEventListener("touchstart", start, { passive: false })
    canvas.addEventListener("touchmove",  move,  { passive: false })
    canvas.addEventListener("touchend",   stop)
    return () => {
      canvas.removeEventListener("mousedown",  start)
      canvas.removeEventListener("mousemove",  move)
      canvas.removeEventListener("mouseup",    stop)
      canvas.removeEventListener("mouseleave", stop)
      canvas.removeEventListener("touchstart", start)
      canvas.removeEventListener("touchmove",  move)
      canvas.removeEventListener("touchend",   stop)
    }
  }, [promptIdx])

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  function classify() {
    setPhase("analyzing")
    setBars([])
    // animate bars in one by one after a delay
    setTimeout(() => {
      setPhase("result")
      setBars(prompt.results)
      setScore(s => s + 1)
    }, 2200)
  }

  function nextPrompt() {
    if (promptIdx >= DRAW_PROMPTS.length - 1) {
      setPromptIdx(0)
    } else {
      setPromptIdx(p => p + 1)
    }
    setPhase("draw")
    setBars([])
  }

  return (
    <div className="space-y-4">
      {/* prompt */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{prompt.emoji}</span>
          <div>
            <p className="font-sora font-bold text-gray-900">{prompt.prompt}</p>
            <p className="text-xs text-gray-400">in the box below, then click Classify</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-emerald-600">{score} classified</span>
          <span className="text-[10px] text-gray-300">|</span>
          <span className="text-[10px] text-gray-400">{promptIdx + 1}/{DRAW_PROMPTS.length}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* drawing canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={280} height={200}
            className="w-full border-2 border-dashed border-gray-300 rounded-2xl bg-white cursor-crosshair touch-none"
            style={{ aspectRatio: "1.4" }}
          />
          {!hasDrawn && phase === "draw" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center gap-1 text-gray-300">
                <Pencil size={20} />
                <span className="text-xs">Draw here</span>
              </div>
            </div>
          )}
          {phase === "analyzing" && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"
                />
                <p className="text-xs font-semibold text-gray-600">CV model analysing…</p>
              </div>
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={clearCanvas}
              disabled={phase !== "draw"}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-all"
            >
              <RotateCcw size={10} /> Clear
            </button>
            <button
              onClick={classify}
              disabled={!hasDrawn || phase !== "draw"}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold disabled:opacity-40 transition-all"
            >
              {phase === "analyzing" ? "Analysing…" : "Classify it!"}
            </button>
          </div>
        </div>

        {/* results */}
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {phase === "result" ? "CV Model Confidence Scores" : "Confidence scores appear here"}
            </p>
            {phase === "draw" && (
              <div className="space-y-2">
                {["???", "???", "???", "???", "???"].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-gray-200 w-16 shrink-0"></span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full" />
                    <span className="text-xs text-gray-200 w-8 text-right">%</span>
                  </div>
                ))}
              </div>
            )}
            {phase === "analyzing" && (
              <div className="space-y-2">
                {prompt.results.map(([label]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-16 shrink-0 truncate">{label}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-200 rounded-full"
                        animate={{ width: ["0%", "40%", "20%", "50%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-xs text-gray-300 w-8 text-right">…</span>
                  </div>
                ))}
              </div>
            )}
            {phase === "result" && (
              <div className="space-y-2">
                {bars.map(([label, conf], i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <span className={`text-xs w-16 shrink-0 truncate font-medium ${i === 0 ? "text-emerald-700" : "text-gray-500"}`}>
                      {label}
                    </span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: i === 0 ? "#059669" : "#D1D5DB" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${conf * 100}%` }}
                        transition={{ delay: i * 0.08 + 0.1, duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className={`text-xs w-10 text-right font-bold ${i === 0 ? "text-emerald-600" : "text-gray-400"}`}>
                      {Math.round(conf * 100)}%
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {phase === "result" && (
            <div className="space-y-2 mt-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                <p className="text-xs text-emerald-700 font-medium">
                  AI identified: <strong>{bars[0]?.[0]}</strong> with {Math.round((bars[0]?.[1] ?? 0) * 100)}% confidence
                </p>
              </div>
              <button
                onClick={nextPrompt}
                className="flex items-center gap-2 w-full justify-center px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
              >
                Next prompt <ChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>How CV really works:</strong> The AI analyses thousands of pixel patterns  edges, curves, corners, shapes  and compares them against patterns it learned from millions of labelled drawings. Each confidence score is a probability from the final layer of a neural network.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SENTENCE COMPLETION  NLP game
// ─────────────────────────────────────────────────────────────────────────────

const NLP_ROUNDS: { sentence: string; blank: string; options: string[]; correct: number; reason: string }[] = [
  {
    sentence: "The doctor gave the patient a ___",
    blank: "___",
    options: ["prescription", "spaceship", "mountain", "cloud"],
    correct: 0,
    reason: "NLP models learn that 'doctor', 'patient', and 'gave' strongly predict medical words. 'Prescription' fits the context of healthcare with 94% confidence.",
  },
  {
    sentence: "The student opened her laptop to ___ for the exam",
    blank: "___",
    options: ["study", "swim", "fly", "cook"],
    correct: 0,
    reason: "Words like 'student', 'laptop', and 'exam' co-occur with 'study' far more often in text data than with any other option. The NLP model uses this statistical pattern.",
  },
  {
    sentence: "She was so happy when she heard the ___ news",
    blank: "___",
    options: ["good", "purple", "heavy", "loud"],
    correct: 0,
    reason: "'Happy' and 'good news' co-occur constantly in human language. NLP models learn this emotional co-relation from billions of sentences. 'Good' gets 91% confidence.",
  },
  {
    sentence: "The pilot landed the ___ safely at the airport",
    blank: "___",
    options: ["plane", "bicycle", "submarine", "tent"],
    correct: 0,
    reason: "'Pilot', 'landed', and 'airport' all point to aviation. The NLP model has seen thousands of sentences like this and learns that 'plane' fits with 97% confidence.",
  },
  {
    sentence: "After the rain stopped, a beautiful ___ appeared in the sky",
    blank: "___",
    options: ["rainbow", "sandwich", "keyboard", "hammer"],
    correct: 0,
    reason: "'Rain stopped' + 'sky' is a classic context for 'rainbow' in training data. This is called semantic co-occurrence  words that tend to appear together in similar situations.",
  },
]

function SentenceGame() {
  const [round,    setRound]    = useState(0)
  const [chosen,   setChosen]   = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score,    setScore]    = useState(0)

  const r = NLP_ROUNDS[round]

  function handlePick(i: number) {
    if (revealed) return
    setChosen(i)
    setRevealed(true)
    if (i === r.correct) setScore(s => s + 1)
  }

  function nextRound() {
    if (round >= NLP_ROUNDS.length - 1) { setRound(0); setScore(0) }
    else setRound(r => r + 1)
    setChosen(null); setRevealed(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          What word does the NLP model predict?
        </p>
        <span className="text-xs font-bold text-blue-600">{score}/{round + (revealed ? 1 : 0)} correct · {round + 1}/{NLP_ROUNDS.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {/* sentence display */}
          <div className="bg-gray-900 rounded-2xl p-5 text-center">
            <p className="text-white text-lg font-semibold leading-relaxed font-sora">
              {r.sentence.replace("___", "")}
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: revealed ? 0 : Infinity }}
                className="inline-block px-3 py-0.5 rounded-lg bg-blue-500 text-white font-bold mx-1"
              >
                {chosen !== null && revealed ? r.options[chosen] : "___"}
              </motion.span>
            </p>
            <p className="text-white/30 text-xs mt-2">Pick the word the AI model would choose</p>
          </div>

          {/* options */}
          <div className="grid grid-cols-2 gap-2">
            {r.options.map((opt, i) => {
              let style: React.CSSProperties = { borderColor: "#E5E7EB", color: "#374151", background: "#FAFAFA" }
              if (revealed) {
                if (i === r.correct) style = { borderColor: "#059669", color: "#065F46", background: "#ECFDF5" }
                else if (i === chosen) style = { borderColor: "#DC2626", color: "#991B1B", background: "#FEF2F2" }
              } else if (i === chosen) {
                style = { borderColor: "#2563EB", color: "#1D4ED8", background: "#EFF6FF" }
              }
              return (
                <button
                  key={opt}
                  onClick={() => handlePick(i)}
                  disabled={revealed}
                  className="px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all disabled:cursor-default"
                  style={style}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* feedback */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-blue-50 border border-blue-200 p-3"
            >
              <p className="text-xs font-bold text-blue-700 mb-1">How the NLP model decided:</p>
              <p className="text-xs text-blue-800 leading-relaxed">{r.reason}</p>
            </motion.div>
          )}

          {revealed && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={nextRound}
              className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
            >
              {round >= NLP_ROUNDS.length - 1 ? "Restart" : "Next Sentence"}
              <ChevronRight size={14} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>How NLP really works:</strong> The model was trained on billions of sentences. It learns that certain words appear near each other constantly  this is called "contextual co-occurrence". ChatGPT and Google Translate use the same core idea, just at a much larger scale.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN DETECTIVE  Data Statistics game
// ─────────────────────────────────────────────────────────────────────────────

const PATTERNS: {
  sequence: (number | "?")[]
  options: number[]
  correct: number
  type: string
  explain: string
}[] = [
  {
    sequence: [2, 4, 8, 16, "?"],
    options: [24, 32, 20, 28],
    correct: 32,
    type: "Geometric sequence (×2)",
    explain: "Each number is doubled: 2 → 4 → 8 → 16 → 32. An AI spots this by computing ratios between consecutive terms.",
  },
  {
    sequence: [1, 1, 2, 3, 5, "?"],
    options: [8, 7, 6, 9],
    correct: 8,
    type: "Fibonacci sequence",
    explain: "Each number = sum of the two before it: 3+5=8. This pattern appears in nature, stock markets, and art. AI detects it by testing multiple formula types.",
  },
  {
    sequence: [100, 90, 81, 73, "?"],
    options: [66, 65, 64, 70],
    correct: 66,
    type: "Decreasing by reducing gaps",
    explain: "Gaps: −10, −9, −8, −7… so next gap is −7. This kind of decelerating decrease appears in population models and economic forecasts.",
  },
  {
    sequence: [3, 6, 12, 24, "?"],
    options: [28, 48, 36, 30],
    correct: 48,
    type: "Geometric sequence (×2)",
    explain: "Each number is doubled again: 24×2=48. Geometric growth appears in viral spread, compound interest, and population growth.",
  },
  {
    sequence: [10, 8, 11, 9, 12, "?"],
    options: [10, 13, 11, 8],
    correct: 10,
    type: "Alternating pattern",
    explain: "Alternating: −2, +3, −2, +3, −2 → 12−2=10. AI detects alternating patterns by checking if even and odd positions follow separate rules.",
  },
]

function PatternGame() {
  const [round,    setRound]    = useState(0)
  const [chosen,   setChosen]   = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score,    setScore]    = useState(0)

  const p = PATTERNS[round]

  function handlePick(val: number) {
    if (revealed) return
    setChosen(val)
    setRevealed(true)
    if (val === p.correct) setScore(s => s + 1)
  }

  function nextRound() {
    if (round >= PATTERNS.length - 1) { setRound(0); setScore(0) }
    else setRound(r => r + 1)
    setChosen(null); setRevealed(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          What comes next in the sequence?
        </p>
        <span className="text-xs font-bold text-orange-600">{score}/{round + (revealed ? 1 : 0)} correct · {round + 1}/{PATTERNS.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {/* sequence display */}
          <div className="bg-gray-900 rounded-2xl p-5">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {p.sequence.map((num, i) => (
                <div key={i} className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold font-sora"
                    style={
                      num === "?"
                        ? { background: "#F97316", color: "#fff" }
                        : { background: "#1E293B", color: "#F1F5F9" }
                    }
                  >
                    {num === "?" ? (chosen !== null && revealed ? chosen : "?") : num}
                  </motion.div>
                  {i < p.sequence.length - 1 && (
                    <span className="text-white/30 text-sm font-light">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs text-center mt-3">Find the pattern · Pick the missing number</p>
          </div>

          {/* options */}
          <div className="grid grid-cols-4 gap-2">
            {p.options.map(opt => {
              let style: React.CSSProperties = { borderColor: "#E5E7EB", color: "#374151", background: "#FAFAFA" }
              if (revealed) {
                if (opt === p.correct) style = { borderColor: "#059669", color: "#065F46", background: "#ECFDF5" }
                else if (opt === chosen) style = { borderColor: "#DC2626", color: "#991B1B", background: "#FEF2F2" }
              } else if (opt === chosen) {
                style = { borderColor: "#F97316", color: "#C2410C", background: "#FFF7ED" }
              }
              return (
                <button
                  key={opt}
                  onClick={() => handlePick(opt)}
                  disabled={revealed}
                  className="py-3 rounded-xl border-2 text-sm font-bold transition-all disabled:cursor-default font-sora"
                  style={style}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* feedback */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-orange-50 border border-orange-200 p-3"
            >
              <p className="text-xs font-bold text-orange-700 mb-1">
                Pattern: <span className="text-orange-600">{p.type}</span>
                {chosen === p.correct ? "  You spotted it!" : `  Answer: ${p.correct}`}
              </p>
              <p className="text-xs text-orange-800 leading-relaxed">{p.explain}</p>
            </motion.div>
          )}

          {revealed && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={nextRound}
              className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
            >
              {round >= PATTERNS.length - 1 ? "Restart" : "Next Pattern"}
              <ChevronRight size={14} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
        <p className="text-xs text-orange-700 leading-relaxed">
          <strong>How Data AI really works:</strong> AI models test dozens of mathematical formulae against the data  arithmetic, geometric, logarithmic, polynomial  and select whichever fits with the highest statistical confidence. Netflix and Spotify do the same with your taste patterns.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

type GameTab = "cv" | "nlp" | "data"

const TABS: { key: GameTab; label: string; short: string; Icon: typeof Eye; color: string; bg: string; border: string }[] = [
  { key: "cv",   label: "Quick Draw",        short: "CV",   Icon: Eye,           color: "#059669", bg: "#ECFDF5", border: "#6EE7B7" },
  { key: "nlp",  label: "Finish the Sentence", short: "NLP",  Icon: MessageSquare, color: "#2563EB", bg: "#EFF6FF", border: "#93C5FD" },
  { key: "data", label: "Pattern Detective", short: "Data", Icon: BarChart3,     color: "#F97316", bg: "#FFF7ED", border: "#FED7AA" },
]

export default function AIDomainsGames() {
  const [active, setActive] = useState<GameTab>("cv")
  const tab = TABS.find(t => t.key === active)!

  return (
    <div className="rounded-3xl border-2 overflow-hidden shadow-sm" style={{ borderColor: tab.border, background: "#fff" }}>

      {/* ── header ── */}
      <div
        className="px-5 py-4 border-b flex items-center justify-between gap-3"
        style={{ background: tab.bg, borderColor: tab.border }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: tab.color }}>
            <tab.Icon size={16} className="text-white" />
          </div>
          <div>
            <p className="font-sora font-bold text-sm" style={{ color: tab.color }}>
              Try It: {tab.label}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: tab.color + "aa" }}>
              {tab.key === "cv" ? "Computer Vision" : tab.key === "nlp" ? "Natural Language Processing" : "Data & Statistics"} · hands-on mini-game
            </p>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
          style={{ borderColor: tab.border, color: tab.color, background: "#fff" }}
        >
          CBSE Activity
        </span>
      </div>

      {/* ── tab selector ── */}
      <div className="flex border-b border-gray-100">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all relative"
            style={active === t.key ? { color: t.color } : { color: "#94A3B8" }}
          >
            <t.Icon size={12} />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.short}</span>
            {active === t.key && (
              <motion.div
                layoutId="game-tab-line"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: t.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── game area ── */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
          >
            {active === "cv"   && <QuickDrawGame />}
            {active === "nlp"  && <SentenceGame  />}
            {active === "data" && <PatternGame   />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
