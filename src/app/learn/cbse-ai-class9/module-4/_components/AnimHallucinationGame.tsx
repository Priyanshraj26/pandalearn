"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, RefreshCw, Lightbulb, AlertTriangle, Brain } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab         = "hallucination" | "realvsfake"
type HAnswer     = "real" | "hallucinated"
type RVFAnswer   = "ai" | "human"

interface HallucinationClaim {
  id:       number
  claim:    string
  category: string
  answer:   HAnswer
  explanation: string
  whyAIGetsItWrong: string
}

interface RealVsFakeItem {
  id:      number
  title:   string
  content: string
  source:  string
  answer:  RVFAnswer
  clue:    string
  explain: string
}

// ── Hallucination data ─────────────────────────────────────────────────────────

const CLAIMS: HallucinationClaim[] = [
  {
    id: 1,
    category: "History",
    claim: "Albert Einstein failed mathematics in school and was considered a poor student.",
    answer: "hallucinated",
    explanation: "FALSE  This is one of the most widespread myths. Einstein excelled at mathematics and physics from an early age. He scored the highest marks in his physics class in Switzerland.",
    whyAIGetsItWrong: "AIs trained on internet text frequently reproduce popular myths because false stories spread widely online. The AI has seen this false claim thousands of times and treats repetition as truth.",
  },
  {
    id: 2,
    category: "Science",
    claim: "The human body has 206 bones in adulthood.",
    answer: "real",
    explanation: "TRUE  Adult humans have 206 bones. Babies are born with around 270–300 bones, but many fuse together as we grow.",
    whyAIGetsItWrong: "This fact is well-documented and consistent across sources  AI gets this right.",
  },
  {
    id: 3,
    category: "Technology",
    claim: "ChatGPT was developed by Google DeepMind and launched in 2022.",
    answer: "hallucinated",
    explanation: "FALSE  ChatGPT was developed by OpenAI, not Google DeepMind. OpenAI is a separate company. Google has its own AI assistant (Gemini). ChatGPT was launched in November 2022  that part is correct.",
    whyAIGetsItWrong: "AIs sometimes confuse similar entities (large AI labs) when generating text about a topic. This is called 'entity confusion'  a common type of hallucination.",
  },
  {
    id: 4,
    category: "Geography",
    claim: "The Great Wall of China is visible from space with the naked eye.",
    answer: "hallucinated",
    explanation: "FALSE  This is a famous myth. The Great Wall is very long but only about 5–8 metres wide. Astronauts  including Chinese astronaut Yang Liwei  have confirmed it is NOT visible from space with the naked eye.",
    whyAIGetsItWrong: "This myth has been repeated so often in textbooks and pop-culture for decades that AI systems learned it as a 'fact'. Widely repeated falsehoods are a major source of AI hallucinations.",
  },
  {
    id: 5,
    category: "Science",
    claim: "Water boils at 100°C at sea level (standard atmospheric pressure).",
    answer: "real",
    explanation: "TRUE  Water boils at 100°C (212°F) at 1 atmosphere of pressure (sea level). At higher altitudes, lower atmospheric pressure means water boils at lower temperatures.",
    whyAIGetsItWrong: "This is a well-established physical constant  AI systems reliably get this correct.",
  },
  {
    id: 6,
    category: "India",
    claim: "India's Chandrayaan-3 mission in 2023 made India the first country ever to land a spacecraft near the Moon's south pole.",
    answer: "real",
    explanation: "TRUE  Chandrayaan-3 landed near the lunar south pole on 23 August 2023, making India the first country to successfully land a spacecraft in that region. This was a landmark achievement for ISRO.",
    whyAIGetsItWrong: "This is accurate  AI systems trained on data past July 2023 get this fact correct.",
  },
  {
    id: 7,
    category: "Technology",
    claim: "Python programming language was named after the snake python because its creator loved reptiles.",
    answer: "hallucinated",
    explanation: "FALSE  Python was named after the British comedy TV show 'Monty Python's Flying Circus'. Creator Guido van Rossum was reading the show's scripts during development and wanted a short, fun name.",
    whyAIGetsItWrong: "The snake logo makes the snake-origin story seem plausible, and AI systems may generate it because it 'fits' the snake association. This is called 'plausible confabulation'.",
  },
  {
    id: 8,
    category: "Health",
    claim: "Humans use only 10% of their brain at any given time.",
    answer: "hallucinated",
    explanation: "FALSE  This is a completely debunked neuroscience myth. Brain imaging studies show virtually all areas of the brain are active at various times. We use essentially all of our brain.",
    whyAIGetsItWrong: "This myth has appeared in countless self-help books and movies (like the film 'Lucy'). AI trained on the internet absorbed this myth alongside real facts and sometimes repeats it as truth.",
  },
]

// ── Real vs Fake data ─────────────────────────────────────────────────────────

const RVF_ITEMS: RealVsFakeItem[] = [
  {
    id: 1,
    title: "Breaking News Article",
    content: '"Indian scientists have discovered a new species of frog in the Western Ghats with unique bioluminescent properties that glow blue under moonlight. The discovery was published in Nature journal."',
    source: "Appears to be from a science news website",
    answer: "ai",
    clue: "Look for: overly dramatic language, no specific researcher names, no institution mentioned",
    explain: "This article was AI-generated. Real scientific news includes specific researcher names, institutional affiliations, and a DOI link to the paper. The 'blue moonlight glow' detail is sensationalised and not scientifically precise.",
  },
  {
    id: 2,
    title: "Historical Quote",
    content: '"The true sign of intelligence is not knowledge but imagination."  Albert Einstein',
    source: "Widely shared on social media",
    answer: "ai",
    clue: "Famous quotes attributed to Einstein are often misattributed or fabricated by AI",
    explain: "This quote is widely misattributed to Einstein but there is no verified source connecting it to him. AI systems frequently generate plausible-sounding quotes from famous figures  a form of hallucination researchers call 'attribution fabrication'.",
  },
  {
    id: 3,
    title: "Wikipedia Excerpt",
    content: '"The Indian Constitution was adopted on 26 November 1949 and came into effect on 26 January 1950. It is the longest written constitution of any sovereign country in the world, containing 448 articles."',
    source: "Wikipedia, Indian Constitution article",
    answer: "human",
    clue: "Specific verifiable dates and well-known facts that are consistent with real sources",
    explain: "This excerpt is accurate and consistent with verified historical records. Constitution Day is observed on 26 November. The 448 articles figure is a verifiable fact. Real Wikipedia content has citations  check those too.",
  },
  {
    id: 4,
    title: "Research Paper Abstract",
    content: '"Our study of 10,000 participants across 7 Indian cities demonstrates that daily screen time exceeding 6 hours is associated with a 34% increase in reported anxiety symptoms in adolescents aged 13–17."',
    source: "Journal abstract snippet",
    answer: "human",
    clue: "Specific sample size, specific percentage, age range  concrete verifiable claims",
    explain: "This reads like a genuine research abstract. Real studies provide specific numbers, sample sizes, and methodology. Unlike AI-generated summaries, authentic abstracts use hedged language ('associated with' not 'causes') and precise statistical claims.",
  },
]

// ── Claim card ────────────────────────────────────────────────────────────────

function ClaimCard({ claim, chosen, onChoose }: {
  claim: HallucinationClaim
  chosen: HAnswer | null
  onChoose: (id: number, ans: HAnswer) => void
}) {
  const revealed = chosen !== null
  const correct  = chosen === claim.answer

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border-2 p-3 transition-all"
      style={{
        borderColor: revealed
          ? correct ? "#10B981" : "#EF4444"
          : "#E5E7EB",
        background: revealed
          ? correct ? "#ECFDF5" : "#FEF2F2"
          : "#F9FAFB",
      }}
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-600">{claim.category}</span>
        {revealed && (
          <span className="shrink-0 ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={correct
              ? { background: "#10B98120", color: "#059669" }
              : { background: "#EF444420", color: "#DC2626" }
            }
          >
            {claim.answer === "real" ? "✓ REAL FACT" : "✗ AI HALLUCINATION"}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-800 leading-relaxed mb-2.5 font-medium">&ldquo;{claim.claim}&rdquo;</p>

      {!revealed ? (
        <div className="flex gap-2">
          <button
            onClick={() => onChoose(claim.id, "real")}
            className="flex-1 py-1.5 rounded-lg text-[10px] font-bold border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            ✓ Real Fact
          </button>
          <button
            onClick={() => onChoose(claim.id, "hallucinated")}
            className="flex-1 py-1.5 rounded-lg text-[10px] font-bold border-2 border-red-300 text-red-700 hover:bg-red-50 transition-colors"
          >
            ✗ Hallucinated
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
          <p className="text-[10px] text-gray-700 leading-snug">{claim.explanation}</p>
          {!correct && (
            <div className="flex items-start gap-1.5 rounded-lg bg-amber-50 border border-amber-200 p-2">
              <Brain size={10} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-700 leading-snug">{claim.whyAIGetsItWrong}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

// ── Hallucination tab ─────────────────────────────────────────────────────────

function HallucinationTab() {
  const [answers, setAnswers] = useState<Record<number, HAnswer>>({})
  const total   = CLAIMS.length
  const answered = Object.keys(answers).length
  const correct  = Object.entries(answers).filter(([id, ans]) => CLAIMS.find(c => c.id === Number(id))?.answer === ans).length

  const handleChoose = useCallback((id: number, ans: HAnswer) => {
    setAnswers(prev => ({ ...prev, [id]: ans }))
  }, [])

  const done = answered === total

  return (
    <div className="grid md:grid-cols-[1fr_260px]">
      {/* Claims list */}
      <div className="relative bg-[#060A12] overflow-y-auto min-h-80">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="hg-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hg-dots)" />
        </svg>

        <div className="relative z-10 p-4 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Spot the Hallucination
            </p>
            <span className="text-[10px] font-bold text-slate-400">{answered}/{total} answered</span>
          </div>
          {CLAIMS.map(claim => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              chosen={answers[claim.id] ?? null}
              onChoose={handleChoose}
            />
          ))}
        </div>
      </div>

      {/* Score panel */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-700">Your Score</p>
            <motion.span key={correct}
              initial={{ scale: 1.3 }} animate={{ scale: 1 }}
              className="text-lg font-bold font-sora text-emerald-600"
            >
              {correct}/{total}
            </motion.span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-emerald-500 rounded-full"
              animate={{ width: `${(correct / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 60 }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-emerald-700">Real Fact</p>
              <p className="text-[9px] text-emerald-600 leading-snug">Verified, consistent across sources</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-2">
            <XCircle size={12} className="text-red-500 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-red-700">Hallucination</p>
              <p className="text-[9px] text-red-600 leading-snug">AI generated but factually wrong</p>
            </div>
          </div>
        </div>

        {/* Why AI hallucinates */}
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-3">
          <p className="text-[10px] font-bold text-violet-700 mb-1">Why does AI hallucinate?</p>
          <ul className="space-y-1">
            {[
              "Trained on internet text  which contains myths and misinformation",
              "Predicts 'plausible' words, not verified facts",
              "No memory of source  can't say 'I read this in X'",
              "Overconfident  states falsehoods without uncertainty",
            ].map(r => (
              <li key={r} className="text-[9px] text-violet-700 flex items-start gap-1">
                <span className="shrink-0 mt-0.5 font-bold">›</span>{r}
              </li>
            ))}
          </ul>
        </div>

        {done && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-amber-50 border border-amber-200 p-3"
          >
            <p className="text-[10px] font-bold text-amber-700 mb-1">
              {correct >= 6 ? "Excellent AI detective!" : correct >= 4 ? "Good eye for hallucinations!" : "Keep practising  hallucinations are tricky!"}
            </p>
            <p className="text-[10px] text-amber-700">Always verify AI outputs with authoritative sources like textbooks, government data, and peer-reviewed research.</p>
          </motion.div>
        )}

        <button onClick={() => setAnswers({})}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors mt-auto"
        >
          <RefreshCw size={11} /> Reset game
        </button>
      </div>
    </div>
  )
}

// ── Real vs Fake tab ──────────────────────────────────────────────────────────

function RealVsFakeTab() {
  const [idx, setIdx]         = useState(0)
  const [chosen, setChosen]   = useState<RVFAnswer | null>(null)
  const [revealed, setReveal] = useState(false)
  const [score, setScore]     = useState(0)

  const item = RVF_ITEMS[idx]
  const correct = chosen === item.answer

  const handleChoose = (ans: RVFAnswer) => {
    if (revealed) return
    setChosen(ans)
    setReveal(true)
    if (ans === item.answer) setScore(s => s + 1)
  }

  const next = () => {
    setIdx(i => (i + 1) % RVF_ITEMS.length)
    setChosen(null)
    setReveal(false)
  }

  return (
    <div className="grid md:grid-cols-2">
      {/* Content preview */}
      <div className="relative bg-[#060A12] flex flex-col justify-center min-h-80 p-5 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="rvf-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#rvf-dots)" />
        </svg>

        <div className="relative z-10 space-y-3">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden"
          >
            <div className="bg-slate-900 px-3 py-2 border-b border-slate-700 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <p className="text-[10px] text-slate-400 font-medium">{item.title}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-200 leading-relaxed">{item.content}</p>
              <p className="text-[9px] text-slate-500 mt-2 italic">Source: {item.source}</p>
            </div>
          </motion.div>

          {!revealed && (
            <div className="rounded-xl bg-amber-950/40 border border-amber-800/40 p-2.5">
              <div className="flex items-start gap-1.5">
                <Lightbulb size={10} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[9px] text-amber-400 leading-snug italic">Clue: {item.clue}</p>
              </div>
            </div>
          )}

          {revealed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-xl border p-2.5"
              style={{
                borderColor: correct ? "#10B98140" : "#EF444440",
                background:  correct ? "#10B98110" : "#EF444410",
              }}
            >
              <p className="text-[10px] font-bold mb-0.5" style={{ color: correct ? "#10B981" : "#EF4444" }}>
                {correct ? "Correct!" : `It was ${item.answer === "ai" ? "AI-generated" : "written by a human"}`}
              </p>
              <p className="text-[10px] text-slate-300 leading-snug">{item.explain}</p>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-3 left-5 flex gap-1">
          {RVF_ITEMS.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{ background: i === idx ? "#F97316" : "#1E293B" }} />
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-4">
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">
                Item {idx + 1} of {RVF_ITEMS.length} · Score: {score}
              </p>
              <p className="text-xs font-semibold text-gray-900">Is this content AI-generated or written by a human?</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Read carefully  look for clues in the language, specificity, and source</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(["ai", "human"] as RVFAnswer[]).map(ans => {
                const isChosen = chosen === ans
                const isBest   = ans === item.answer
                let style: React.CSSProperties = { background: "#F9FAFB", border: "2px solid #E5E7EB" }
                if (revealed && isBest)               style = { background: "#ECFDF5", border: "2px solid #10B981" }
                else if (revealed && isChosen && !isBest) style = { background: "#FEF2F2", border: "2px solid #EF4444" }

                return (
                  <motion.button key={ans}
                    onClick={() => handleChoose(ans)}
                    disabled={revealed}
                    whileHover={!revealed ? { scale: 1.02 } : {}}
                    className="py-3 rounded-xl text-center transition-all"
                    style={style}
                  >
                    <p className="text-lg">{ans === "ai" ? "🤖" : "✍️"}</p>
                    <p className="text-xs font-bold text-gray-800 mt-1">{ans === "ai" ? "AI-generated" : "Human-written"}</p>
                    {revealed && isBest && <CheckCircle2 size={14} className="text-emerald-600 mx-auto mt-1" />}
                    {revealed && isChosen && !isBest && <XCircle size={14} className="text-red-500 mx-auto mt-1" />}
                  </motion.button>
                )
              })}
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 space-y-1.5">
              <p className="text-[10px] font-bold text-gray-600">Signs of AI-generated content:</p>
              {[
                "Overly fluent, no typos, perfect grammar",
                "Vague on sources, no specific citations",
                "Sensationalised or clickbait language",
                "Plausible but unverifiable specific stats",
              ].map(s => (
                <p key={s} className="text-[9px] text-gray-500 flex items-start gap-1.5">
                  <AlertTriangle size={9} className="text-amber-400 shrink-0 mt-0.5" />{s}
                </p>
              ))}
            </div>

            <button onClick={next}
              className="mt-auto py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
            >
              {revealed ? "Next Item →" : "Skip →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimHallucinationGame() {
  const [tab, setTab] = useState<Tab>("hallucination")

  return (
    <div>
      <div className="flex border-b border-gray-200 bg-white">
        {([
          { key: "hallucination" as Tab, label: "Spot the Hallucination",   color: "#EF4444" },
          { key: "realvsfake"    as Tab, label: "Real vs AI-Generated",     color: "#8B5CF6" },
        ]).map(t => (
          <button key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-2.5 text-xs font-bold transition-all relative"
            style={tab === t.key ? { color: t.color } : { color: "#94A3B8" }}
          >
            {t.label}
            {tab === t.key && (
              <motion.div layoutId="hg-tab"
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
          {tab === "hallucination" ? <HallucinationTab /> : <RealVsFakeTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
