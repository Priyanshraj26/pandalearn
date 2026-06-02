"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Flag, Trophy, RotateCcw } from "lucide-react"

// ── Types & Data ──────────────────────────────────────────────────────────────

type Side = "pro" | "con"
type Phase = "pick" | "debate" | "verdict"

interface DebateTopic {
  id:    number
  theme: string
  context: string
  color:  string
  proLabel: string
  conLabel: string
  arguments: {
    pro: { point: string; evidence: string }[]
    con: { point: string; evidence: string }[]
  }
  insight: string
}

const TOPICS: DebateTopic[] = [
  {
    id: 1,
    theme: "AI in Healthcare",
    context: "An AI system can screen chest X-rays for tuberculosis. The government wants to deploy it across 600 rural districts where there are no radiologists.",
    color: "#EF4444",
    proLabel: "Team: Deploy the AI",
    conLabel: "Team: Not Yet Ready",
    arguments: {
      pro: [
        { point: "Reaches where doctors can't",       evidence: "India has 1 radiologist per 1 lakh people in rural areas. AI can fill the gap immediately." },
        { point: "Faster than human diagnosis",       evidence: "AI screens one X-ray in 0.4 seconds vs 4–6 minutes for a specialist." },
        { point: "Reduces cost dramatically",         evidence: "AI screening costs ₹50 per patient vs ₹800 for specialist consultation." },
        { point: "Consistent accuracy, no fatigue",   evidence: "Radiologists miss ~4% of TB cases at end of a long shift; AI performance doesn't degrade." },
        { point: "Proven real-world results",         evidence: "WHO-backed trials in India showed 90%+ sensitivity for detecting TB with AI." },
      ],
      con: [
        { point: "False negatives kill people",       evidence: "If the AI misses 10% of TB cases, that's 200,000 patients per year going undiagnosed in India." },
        { point: "Not trained on Indian X-ray data",  evidence: "Most AI models are trained on Western hospital data and perform worse on Indian patient demographics." },
        { point: "Patients can't challenge AI decisions", evidence: "A rural patient has no way to appeal or understand why AI cleared them when they're actually sick." },
        { point: "Replaces the pipeline for doctors", evidence: "If AI is deployed, fewer doctors will be trained for rural postings  making the shortage permanent." },
        { point: "What happens when AI is wrong?",    evidence: "No legal framework exists for AI medical liability in India. Who is accountable for a missed diagnosis?" },
      ],
    },
    insight: "The WHO now recommends AI-assisted TB screening as a *supplement* to human review  not a replacement. The correct answer is often hybrid: AI triages cases, human confirms borderline ones.",
  },
  {
    id: 2,
    theme: "AI in Hiring",
    context: "A major corporation wants to use an AI tool to screen 50,000 job applications and shortlist 500 candidates for interviews  instead of having HR read every CV.",
    color: "#F97316",
    proLabel: "Team: Use AI Hiring",
    conLabel: "Team: Human HR Only",
    arguments: {
      pro: [
        { point: "Eliminates human fatigue bias",      evidence: "HR managers make worse decisions on the 200th CV than the 1st. AI applies the same criteria to all 50,000." },
        { point: "Dramatically faster process",        evidence: "Screening 50,000 CVs manually takes 6 months. AI completes it in 2 hours." },
        { point: "Can detect hidden talent",           evidence: "AI can find skilled candidates from tier-2 colleges that biased humans might overlook due to brand preference." },
        { point: "Structured, auditable criteria",     evidence: "AI decisions can be logged and reviewed for patterns  harder with subjective human gut instinct." },
        { point: "Scales for any company size",        evidence: "Small companies with no HR team can use AI to compete for talent with large corporations." },
      ],
      con: [
        { point: "Encodes historical discrimination",  evidence: "Amazon's 2018 AI hiring tool penalised CVs that contained the word 'women's'  it learned from biased past data." },
        { point: "Optimises for the wrong metrics",   evidence: "AI trained on 'successful employees' replicates who already succeeded  not who could succeed with opportunity." },
        { point: "Filters out creative/diverse paths", evidence: "Non-linear career paths, gaps for caregiving, or unusual educational histories get penalised by pattern-matching AI." },
        { point: "Candidates can't understand rejections", evidence: "A rejected candidate has no way to understand or appeal an algorithmic decision  violating transparency principles." },
        { point: "Legal liability is unresolved",      evidence: "Several countries are passing laws making unexplainable AI hiring decisions illegal. Companies face regulatory risk." },
      ],
    },
    insight: "Most leading companies now use AI for initial keyword matching only  with mandatory human review before any rejection. The EU AI Act classifies AI hiring tools as 'High Risk' requiring transparency.",
  },
  {
    id: 3,
    theme: "AI & Jobs",
    context: "A logistics company is considering replacing its 300 truck drivers with self-driving AI vehicles over the next 5 years. The AI trucks are 30% cheaper and never need breaks.",
    color: "#8B5CF6",
    proLabel: "Team: Automate with AI",
    conLabel: "Team: Protect Jobs",
    arguments: {
      pro: [
        { point: "Dramatically reduces delivery costs",   evidence: "30% cost saving across millions of deliveries annually can lower prices for consumers." },
        { point: "Eliminates road fatigue accidents",     evidence: "80% of truck accidents involve driver fatigue. Autonomous trucks don't need sleep." },
        { point: "24/7 operations without overtime",      evidence: "AI trucks can operate continuously, cutting delivery times and improving supply chains." },
        { point: "New jobs in AI operations created",     evidence: "History shows automation creates new job categories  remote monitoring, fleet management, AI maintenance." },
        { point: "Environmental benefits",                evidence: "Optimised AI routes reduce fuel consumption by 15–20% compared to human-driven routes." },
      ],
      con: [
        { point: "300 families lose income immediately",  evidence: "This is not a statistic  these are real people with mortgages, children, and no alternative income." },
        { point: "New jobs require different skills",     evidence: "A 50-year-old truck driver cannot quickly retrain as an AI systems engineer. Retraining is not instant." },
        { point: "Technology is not yet safe",            evidence: "Current autonomous trucks still require safety drivers. Fully driverless freight is 10+ years from mainstream." },
        { point: "Concentrates wealth in fewer hands",    evidence: "Automation profits go to company shareholders, not the displaced workers or their communities." },
        { point: "Systematic risk of mass unemployment",  evidence: "3.5 million truck drivers in the US alone. Automation without social safety nets creates economic crises." },
      ],
    },
    insight: "Economists call this the 'Lump of Labour Fallacy'  history shows technology creates new jobs, but the *transition period* causes real hardship. Policy solutions like UBI and retraining funds are the real debate.",
  },
]

// ── SVG podium scene ──────────────────────────────────────────────────────────

function PodiumScene({ topic, proRound, conRound, activeSide }: {
  topic: DebateTopic; proRound: number; conRound: number; activeSide: Side | null
}) {
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-sm mx-auto">
      <defs>
        <filter id="bd-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Stage floor */}
      <rect x={30} y={170} width={340} height={8} rx={4} fill="#1E293B" />

      {/* PRO podium (left) */}
      <motion.g animate={{ opacity: activeSide === "con" ? 0.4 : 1 }} transition={{ duration: 0.3 }}>
        <rect x={50} y={130} width={70} height={42} rx={6} fill="#10B98115" stroke="#10B981" strokeWidth={1.5} />
        <text x={85} y={157} textAnchor="middle" fill="#10B981" fontSize={7.5} fontWeight="700">FOR AI</text>
        {/* speaker figure */}
        <circle cx={85} cy={108} r={10} fill="#10B98130" stroke="#10B981" strokeWidth={1.5} />
        <text x={85} y={112} textAnchor="middle" fill="#10B981" fontSize={9} fontWeight="800">🙋</text>
        {/* argument count */}
        <motion.g animate={{ opacity: proRound > 0 ? 1 : 0.3 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} cx={58 + i * 14} cy={92} r={4}
              fill={i < proRound ? "#10B981" : "#1E293B"}
              stroke={i < proRound ? "#10B981" : "#334155"}
              strokeWidth={1}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* CON podium (right) */}
      <motion.g animate={{ opacity: activeSide === "pro" ? 0.4 : 1 }} transition={{ duration: 0.3 }}>
        <rect x={280} y={130} width={70} height={42} rx={6} fill="#EF444415" stroke="#EF4444" strokeWidth={1.5} />
        <text x={315} y={157} textAnchor="middle" fill="#EF4444" fontSize={7.5} fontWeight="700">AGAINST AI</text>
        <circle cx={315} cy={108} r={10} fill="#EF444430" stroke="#EF4444" strokeWidth={1.5} />
        <text x={315} y={112} textAnchor="middle" fill="#EF4444" fontSize={9} fontWeight="800">🙋</text>
        <motion.g animate={{ opacity: conRound > 0 ? 1 : 0.3 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} cx={288 + i * 14} cy={92} r={4}
              fill={i < conRound ? "#EF4444" : "#1E293B"}
              stroke={i < conRound ? "#EF4444" : "#334155"}
              strokeWidth={1}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* Centre: topic badge */}
      <rect x={155} y={130} width={90} height={42} rx={8} fill="#0D1829" stroke={topic.color} strokeWidth={1.5} />
      <text x={200} y={148} textAnchor="middle" fill={topic.color} fontSize={7} fontWeight="800" letterSpacing="0.08em">DEBATE</text>
      <text x={200} y={162} textAnchor="middle" fill="#475569" fontSize={6} fontWeight="600">TOPIC {topic.id} / 3</text>

      {/* Speech bubble when active */}
      <AnimatePresence>
        {activeSide && (
          <motion.g
            key={activeSide}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{ transformOrigin: activeSide === "pro" ? "85px 70px" : "315px 70px" }}
          >
            <rect
              x={activeSide === "pro" ? 30 : 260} y={48}
              width={110} height={28} rx={8}
              fill={activeSide === "pro" ? "#10B98115" : "#EF444415"}
              stroke={activeSide === "pro" ? "#10B981" : "#EF4444"}
              strokeWidth={1}
            />
            <polygon
              points={activeSide === "pro" ? "80,76 90,76 85,84" : "310,76 320,76 315,84"}
              fill={activeSide === "pro" ? "#10B98115" : "#EF444415"}
              stroke={activeSide === "pro" ? "#10B981" : "#EF4444"}
              strokeWidth={1}
            />
            <text
              x={activeSide === "pro" ? 85 : 315} y={67}
              textAnchor="middle" fill={activeSide === "pro" ? "#10B981" : "#EF4444"}
              fontSize={6.5} fontWeight="700"
            >
              {activeSide === "pro" ? "AI helps!" : "AI harms!"}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimBalloonDebate() {
  const [topicIdx, setTopicIdx] = useState(0)
  const [phase, setPhase]       = useState<Phase>("pick")
  const [mySide, setMySide]     = useState<Side | null>(null)
  const [proRound, setProRound] = useState(0)
  const [conRound, setConRound] = useState(0)
  const [activeArg, setActiveArg] = useState<{ side: Side; idx: number } | null>(null)
  const [verdict, setVerdict]   = useState<Side | null>(null)

  const topic = TOPICS[topicIdx]

  const nextTopic = () => {
    setTopicIdx(i => (i + 1) % TOPICS.length)
    resetDebate()
  }

  const prevTopic = () => {
    setTopicIdx(i => (i - 1 + TOPICS.length) % TOPICS.length)
    resetDebate()
  }

  const resetDebate = () => {
    setPhase("pick")
    setMySide(null)
    setProRound(0)
    setConRound(0)
    setActiveArg(null)
    setVerdict(null)
  }

  const startDebate = (side: Side) => {
    setMySide(side)
    setPhase("debate")
    setActiveArg({ side: "pro", idx: 0 })
    setProRound(1)
  }

  const revealArg = (side: Side, idx: number) => {
    setActiveArg({ side, idx })
    if (side === "pro") setProRound(r => Math.max(r, idx + 1))
    else setConRound(r => Math.max(r, idx + 1))
  }

  const allProDone = proRound >= topic.arguments.pro.length
  const allConDone = conRound >= topic.arguments.con.length
  const allDone    = allProDone && allConDone

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Visual stage ─────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col items-center justify-between min-h-80 p-5 overflow-hidden">

        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="bbd-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#bbd-dots)" />
        </svg>

        <div className="relative z-10 w-full flex flex-col items-center gap-4">
          {/* Topic badge + nav */}
          <div className="flex items-center gap-2 w-full justify-between">
            <button onClick={prevTopic} className="p-1.5 rounded-lg border border-white/10 text-slate-500 hover:text-slate-300 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <motion.span key={topic.id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: topic.color + "20", color: topic.color, border: `1px solid ${topic.color}40` }}
            >
              {topic.theme}
            </motion.span>
            <button onClick={nextTopic} className="p-1.5 rounded-lg border border-white/10 text-slate-500 hover:text-slate-300 transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Podium scene */}
          <PodiumScene
            topic={topic}
            proRound={proRound}
            conRound={conRound}
            activeSide={activeArg?.side ?? null}
          />

          {/* Phase indicators */}
          {phase === "debate" && (
            <div className="flex gap-2 text-[9px]">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />FOR: {proRound}/5
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />AGAINST: {conRound}/5
              </span>
            </div>
          )}
        </div>

        {/* Topic counters */}
        <div className="relative z-10 flex gap-1.5 mt-auto pt-2">
          {TOPICS.map((_, i) => (
            <button key={i} onClick={() => { setTopicIdx(i); resetDebate() }}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: i === topicIdx ? topic.color : "#1E293B" }}
            />
          ))}
        </div>
      </div>

      {/* ── Debate panel ─────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* PHASE: pick side */}
          {phase === "pick" && (
            <motion.div key="pick"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="p-4 flex flex-col gap-4 flex-1"
            >
              <div>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">CBSE Balloon Debate</p>
                <h3 className="font-sora font-bold text-gray-900 text-sm leading-tight">{topic.theme}</h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{topic.context}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Choose your team</p>
                <div className="space-y-2">
                  <button onClick={() => startDebate("pro")}
                    className="w-full p-3 rounded-xl border-2 text-left transition-all hover:shadow-sm"
                    style={{ borderColor: "#10B98140", background: "#10B98106" }}
                  >
                    <p className="text-xs font-bold text-emerald-600">{topic.proLabel}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">You will argue AI is beneficial for this scenario</p>
                  </button>
                  <button onClick={() => startDebate("con")}
                    className="w-full p-3 rounded-xl border-2 text-left transition-all hover:shadow-sm"
                    style={{ borderColor: "#EF444440", background: "#EF444406" }}
                  >
                    <p className="text-xs font-bold text-red-600">{topic.conLabel}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">You will argue AI is harmful for this scenario</p>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-gray-300 italic text-center mt-auto">
                Both sides will argue  then you cast the final verdict
              </p>
            </motion.div>
          )}

          {/* PHASE: debate */}
          {phase === "debate" && !allDone && (
            <motion.div key="debate"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="p-4 flex flex-col gap-3 flex-1"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Arguments</p>
                <button onClick={resetDebate} className="text-[10px] text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  <RotateCcw size={10} /> Reset
                </button>
              </div>

              {/* PRO arguments */}
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">
                  {topic.proLabel} ({proRound}/{topic.arguments.pro.length})
                </p>
                <div className="space-y-1.5">
                  {topic.arguments.pro.map((arg, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {i < proRound ? (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2.5"
                          style={{ opacity: activeArg?.side === "pro" && activeArg?.idx === i ? 1 : 0.75 }}
                        >
                          <p className="text-[10px] font-bold text-emerald-700">{arg.point}</p>
                          {activeArg?.side === "pro" && activeArg?.idx === i && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="text-[10px] text-emerald-600 mt-0.5 leading-snug"
                            >
                              {arg.evidence}
                            </motion.p>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => revealArg("pro", i)}
                          disabled={i > proRound}
                          className="w-full p-2 rounded-xl border border-dashed border-emerald-200 text-[10px] text-emerald-400 hover:bg-emerald-50 transition-colors disabled:opacity-30 text-left"
                        >
                          {i === proRound ? `→ Reveal argument ${i + 1}` : `Argument ${i + 1} (locked)`}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CON arguments */}
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1.5">
                  {topic.conLabel} ({conRound}/{topic.arguments.con.length})
                </p>
                <div className="space-y-1.5">
                  {topic.arguments.con.map((arg, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {i < conRound ? (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-2.5"
                          style={{ opacity: activeArg?.side === "con" && activeArg?.idx === i ? 1 : 0.75 }}
                        >
                          <p className="text-[10px] font-bold text-red-700">{arg.point}</p>
                          {activeArg?.side === "con" && activeArg?.idx === i && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="text-[10px] text-red-600 mt-0.5 leading-snug"
                            >
                              {arg.evidence}
                            </motion.p>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => { revealArg("con", i); setActiveArg({ side: "con", idx: i }) }}
                          disabled={i > conRound}
                          className="w-full p-2 rounded-xl border border-dashed border-red-200 text-[10px] text-red-400 hover:bg-red-50 transition-colors disabled:opacity-30 text-left"
                        >
                          {i === conRound ? `→ Reveal argument ${i + 1}` : `Argument ${i + 1} (locked)`}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {allProDone && !allConDone && (
                <p className="text-[10px] text-amber-600 text-center italic">Now reveal all the AGAINST arguments ↑</p>
              )}
            </motion.div>
          )}

          {/* PHASE: verdict (all arguments revealed) */}
          {(phase === "debate" && allDone) || phase === "verdict" ? (
            <motion.div key="verdict"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="p-4 flex flex-col gap-3 flex-1"
            >
              {!verdict ? (
                <>
                  <div>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">Cast Your Verdict</p>
                    <p className="text-xs font-semibold text-gray-900">All arguments heard. Which team made the stronger case?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setVerdict("pro")}
                      className="p-3 rounded-xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition-colors flex flex-col items-center gap-1"
                    >
                      <Trophy size={18} className="text-emerald-600" />
                      <p className="text-xs font-bold text-emerald-700">FOR AI wins</p>
                    </button>
                    <button onClick={() => setVerdict("con")}
                      className="p-3 rounded-xl border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-colors flex flex-col items-center gap-1"
                    >
                      <Flag size={18} className="text-red-600" />
                      <p className="text-xs font-bold text-red-700">AGAINST wins</p>
                    </button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-3">
                  <div className="rounded-xl p-3 border-2 text-center"
                    style={{ borderColor: verdict === "pro" ? "#10B981" : "#EF4444", background: verdict === "pro" ? "#ECFDF5" : "#FEF2F2" }}>
                    <p className="font-sora font-bold text-sm" style={{ color: verdict === "pro" ? "#059669" : "#DC2626" }}>
                      You sided with: {verdict === "pro" ? topic.proLabel : topic.conLabel}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Your team: {mySide === verdict ? "you argued this side" : "the opposition argued this side"}</p>
                  </div>
                  <div className="rounded-xl bg-violet-50 border border-violet-100 p-3">
                    <p className="text-[10px] font-bold text-violet-700 uppercase tracking-wider mb-1">Expert Insight</p>
                    <p className="text-[11px] text-violet-700 leading-relaxed">{topic.insight}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[10px] font-bold text-gray-500 mb-1">CBSE Learning Outcome</p>
                    <p className="text-[10px] text-gray-600 leading-snug">
                      "Analyse advantages and disadvantages of Artificial Intelligence"  CBSE 417 Unit 1, Balloon Debate Activity
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={resetDebate}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Debate Again
                    </button>
                    <button onClick={nextTopic}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
                    >
                      Next Topic →
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
