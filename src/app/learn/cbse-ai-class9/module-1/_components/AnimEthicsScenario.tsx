"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Eye, AlertTriangle, User, Building2, Laptop, Landmark, GraduationCap } from "lucide-react"

// ─── Data ────────────────────────────────────────────────────────────────────

const SCENARIO = {
  title:   "The AI Hiring Tool",
  context: "A large company uses an AI system to screen job applications. The AI was trained on 10 years of the company's past hiring decisions. It automatically rejects applications before a human ever sees them.",
  twist:   "Later investigation reveals: the AI consistently rejects applicants from certain regions, schools, and women with career gaps — because historical hires were mostly men from elite colleges.",
  realCase:"This is based on a real 2018 incident at Amazon, where they scrapped an AI recruiting tool after discovering it was biased against women.",
}

const STAKEHOLDERS = [
  {
    id:      "applicant",
    name:    "Job Applicant",
    Icon:    User,
    color:   "#7C3AED",
    bg:      "#F5F3FF",
    border:  "#DDD6FE",
    concerns:[
      "My application was rejected — but I never found out why.",
      "No human ever saw my CV. Is that fair?",
      "I can't appeal or challenge the decision.",
      "The AI may have discriminated against me without knowing it.",
    ],
    rights:  "Right to explanation, right to challenge automated decisions.",
  },
  {
    id:      "company",
    name:    "Company HR",
    Icon:    Building2,
    color:   "#2563EB",
    bg:      "#EFF6FF",
    border:  "#BFDBFE",
    concerns:[
      "We saved hundreds of hours screening applications.",
      "We didn't intend to discriminate — the AI just mirrored our past data.",
      "How were we supposed to know the training data was biased?",
      "Now we face a lawsuit and public backlash.",
    ],
    rights:  "Responsibility to audit AI systems before deploying them.",
  },
  {
    id:      "developer",
    name:    "AI Developer",
    Icon:    Laptop,
    color:   "#059669",
    bg:      "#ECFDF5",
    border:  "#A7F3D0",
    concerns:[
      "We built exactly what the client asked for.",
      "The bias was in the historical data — not in our algorithm.",
      "We should have done a bias audit before deployment.",
      "Fairness in AI is hard — there is no single 'fair' metric.",
    ],
    rights:  "Ethical obligation to test for bias and inform clients of risks.",
  },
  {
    id:      "govt",
    name:    "Government",
    Icon:    Landmark,
    color:   "#D97706",
    bg:      "#FFF7ED",
    border:  "#FDE68A",
    concerns:[
      "Existing anti-discrimination laws don't cover automated AI decisions.",
      "Millions of people are affected — we need regulation now.",
      "Who is liable: the company, the developer, or the AI?",
      "We must balance innovation with protecting citizens' rights.",
    ],
    rights:  "Legislative power to enforce AI transparency and accountability.",
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function AnimEthicsScenario() {
  const [selected,    setSelected]    = useState<string | null>(null)
  const [revealTwist, setRevealTwist] = useState(false)
  const [phase,       setPhase]       = useState<"explore" | "reality" | "action">("explore")
  const [openWho,     setOpenWho]     = useState<string | null>(null)

  const activeStakeholder = STAKEHOLDERS.find(s => s.id === selected)

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">

      {/* header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gray-50 border-b border-gray-200">
        <AlertTriangle size={15} className="text-amber-500" />
        <div>
          <p className="font-sora font-bold text-gray-900 text-sm">Ethics Scenario Roleplay</p>
          <p className="text-xs text-gray-500 mt-0.5">Step into a stakeholder&apos;s shoes — like the CBSE Balloon Debate activity</p>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Phase tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          {(["explore", "reality", "action"] as const).map(p => (
            <button
              key={p}
              onClick={() => { setPhase(p); if (p === "reality") setRevealTwist(true) }}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                phase === p ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {p === "explore" ? "Explore" : p === "reality" ? "Reality Check" : "What Can We Do?"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── Phase 1: Explore perspectives ── */}
          {phase === "explore" && (
            <motion.div key="explore" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

              {/* scenario card */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1.5">The Scenario</p>
                <p className="font-sora font-bold text-gray-900 text-sm mb-2">{SCENARIO.title}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{SCENARIO.context}</p>
              </div>

              {/* stakeholder selector */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Choose a perspective to explore:</p>
                <div className="grid grid-cols-2 gap-2">
                  {STAKEHOLDERS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s.id === selected ? null : s.id)}
                      className="rounded-xl p-3 text-left border-2 transition-all"
                      style={
                        selected === s.id
                          ? { borderColor: s.color, background: s.bg }
                          : { borderColor: "#E5E7EB", background: "#FFFFFF" }
                      }
                    >
                      <div className="flex items-center justify-between mb-1">
                        <s.Icon size={18} style={{ color: s.color }} />
                        {selected === s.id && (
                          <Eye size={13} style={{ color: s.color }} />
                        )}
                      </div>
                      <p className="font-semibold text-gray-900 text-xs">{s.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* concerns panel */}
              <AnimatePresence>
                {activeStakeholder && (
                  <motion.div
                    key={activeStakeholder.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="rounded-xl border-2 p-4"
                    style={{ borderColor: activeStakeholder.border, background: activeStakeholder.bg }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider mb-2"
                      style={{ color: activeStakeholder.color }}
                    >
                      {activeStakeholder.name}&apos;s Perspective
                    </p>
                    <ul className="space-y-2">
                      {activeStakeholder.concerns.map((c, i) => (
                        <motion.li
                          key={c}
                          initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="text-xs text-gray-700 flex items-start gap-2"
                        >
                          <span className="shrink-0 mt-0.5 text-base leading-none" style={{ color: activeStakeholder.color }}>›</span>
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                    <div
                      className="mt-3 pt-3 text-[10px] font-semibold leading-snug"
                      style={{ borderTopColor: activeStakeholder.border, borderTopWidth: 1, color: activeStakeholder.color }}
                    >
                      ⚖ {activeStakeholder.rights}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Phase 2: Reality check ── */}
          {phase === "reality" && (
            <motion.div key="reality" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1.5">The Twist</p>
                <p className="text-xs text-gray-700 leading-relaxed">{SCENARIO.twist}</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Real-World Parallel</p>
                <p className="text-xs text-gray-700 leading-relaxed">{SCENARIO.realCase}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700">What kind of bias is this?</p>
                {[
                  { type: "Historical Bias",     desc: "The training data reflects past discrimination, which the AI amplifies.",    isCorrect: true  },
                  { type: "Measurement Bias",    desc: "The AI measures the wrong thing — prestige of college instead of skill.",    isCorrect: true  },
                  { type: "Representation Bias", desc: "Women and certain groups were underrepresented in past hires.",              isCorrect: true  },
                  { type: "Random Noise",        desc: "The errors are random with no pattern.",                                     isCorrect: false },
                ].map(({ type, desc, isCorrect }) => (
                  <div
                    key={type}
                    className={`rounded-xl px-4 py-2.5 border-2 flex items-start gap-2.5 ${
                      isCorrect
                        ? "bg-rose-50 border-rose-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className={`text-xs mt-0.5 font-bold shrink-0 ${isCorrect ? "text-rose-500" : "text-gray-300"}`}>
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    <div>
                      <p className={`text-xs font-semibold ${isCorrect ? "text-rose-700" : "text-gray-400"}`}>{type}</p>
                      <p className={`text-[11px] mt-0.5 ${isCorrect ? "text-gray-600" : "text-gray-400"}`}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Phase 3: What can we do? ── */}
          {phase === "action" && (
            <motion.div key="action" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">

              <p className="text-xs text-gray-600 leading-relaxed">
                Knowing bias exists isn&apos;t enough — we need <strong>systemic solutions</strong>.
                Here&apos;s what each stakeholder can do differently:
              </p>

              {[
                {
                  who: "AI Developers",
                  Icon: Laptop,
                  color: "#059669",
                  actions: ["Audit training data for historical bias before use", "Test model outcomes across demographic groups", "Use fairness metrics (equal opportunity, calibration)", "Document limitations and share them with clients"],
                },
                {
                  who: "Companies",
                  Icon: Building2,
                  color: "#2563EB",
                  actions: ["Never let AI make the final hiring decision alone", "Audit AI tools periodically for discriminatory patterns", "Allow applicants to appeal automated rejections", "Train HR teams on AI limitations"],
                },
                {
                  who: "Government",
                  Icon: Landmark,
                  color: "#D97706",
                  actions: ["Mandate AI transparency and explainability by law", "Require bias audits before AI deployment in hiring", "Create a 'right to explanation' for AI decisions", "Fund research into fair AI systems"],
                },
                {
                  who: "You (Students)",
                  Icon: GraduationCap,
                  color: "#7C3AED",
                  actions: ["Ask: 'Who collected this data? Is it representative?'", "Understand that AI inherits human biases from data", "Advocate for transparent, explainable AI systems", "Use the 4Ws canvas to think about ethics early in AI projects"],
                },
              ].map(({ who, Icon, color, actions }) => {
                const isOpen = openWho === who
                return (
                  <div key={who} className="rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setOpenWho(isOpen ? null : who)}
                      className="w-full flex items-center gap-2.5 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Icon size={16} style={{ color }} />
                      <span className="font-semibold text-gray-900 text-xs flex-1 text-left">{who} should:</span>
                      <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.18 }}>
                        <ChevronRight size={14} className="text-gray-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <ul className="px-4 pb-3 pt-2 space-y-1.5">
                            {actions.map((a, i) => (
                              <motion.li
                                key={a}
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                className="text-xs text-gray-700 flex items-start gap-2"
                              >
                                <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: color }} />
                                {a}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-violet-700 mb-1">CBSE Learning Outcome</p>
                <p className="text-xs text-violet-600 leading-relaxed">
                  Gain awareness about AI bias and AI access, and describe the potential ethical
                  considerations of AI. (CBSE 417 · Unit 1 · Learning Outcome 7)
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
