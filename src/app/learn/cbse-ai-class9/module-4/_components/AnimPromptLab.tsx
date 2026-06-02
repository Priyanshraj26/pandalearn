"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, CheckCircle2, XCircle, ChevronRight, ShieldAlert, ThumbsUp } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab    = "improve" | "ethics"
type TaskKey = "write" | "summarise" | "explain" | "creative"

interface PromptTask {
  key:      TaskKey
  domain:   string
  emoji:    string
  context:  string
  bad:      { prompt: string; output: string; problems: string[] }
  good:     { prompt: string; output: string; improvements: string[] }
  principle: string
}

interface EthicsScenario {
  id:      number
  title:   string
  scenario: string
  options: { label: string; isEthical: boolean; reason: string }[]
}

// ── Prompt improvement data ───────────────────────────────────────────────────

const TASKS: Record<TaskKey, PromptTask> = {
  write: {
    key: "write", domain: "Essay Writing", emoji: "✍️",
    context: "A Class 9 student wants AI to help write an essay on climate change for school.",
    bad: {
      prompt: "write essay about climate",
      output: "Climate change is a big problem. It affects the environment a lot. We should do something about it. The temperature is rising. This is bad for animals and plants. We need to take action now.",
      problems: [
        "No length specified  output is too short",
        "No context  AI doesn't know it's for Class 9 level",
        "No structure requested  no intro/body/conclusion",
        "No tone  reads like random sentences",
      ],
    },
    good: {
      prompt: "Write a 300-word essay on climate change for a Class 9 student. Structure it with an introduction, 2 body paragraphs (causes and effects), and a conclusion. Use formal language and include one example from India.",
      output: "Climate change refers to the long-term shifts in global temperatures and weather patterns. While natural factors have always influenced climate, scientific evidence overwhelmingly shows that human activities since the Industrial Revolution are the primary driver of current changes...\n\n[Body Paragraph 1  Causes]\nThe burning of fossil fuels (coal, oil, gas) releases carbon dioxide, creating a 'greenhouse effect' that traps heat in the atmosphere...\n\n[Indian example: Glaciers in the Himalayas are receding at alarming rates, threatening water supplies for millions...]\n\n[Conclusion] The path forward requires both individual action and coordinated global policy...",
      improvements: [
        "Specified length (300 words) → appropriate output",
        "Grade level (Class 9) → calibrated vocabulary",
        "Clear structure requested → organised response",
        "Indian context requested → relevant localised example",
      ],
    },
    principle: "Be Specific: Vague prompts get vague outputs. Specify length, level, structure, tone and context.",
  },
  summarise: {
    key: "summarise", domain: "Summarisation", emoji: "📋",
    context: "A student needs to summarise a long chapter on the French Revolution for revision.",
    bad: {
      prompt: "summarise french revolution",
      output: "The French Revolution was a period of radical political and social transformation in France that began in 1789. The monarchy was overthrown, Louis XVI was executed, and France became a republic. Key events include the Storming of the Bastille and the Reign of Terror.",
      problems: [
        "No audience specified  could be for experts or beginners",
        "No format  bullet points would be easier to revise from",
        "No focus area  Class 9 syllabus covers specific aspects only",
        "Too long or too short  no length guidance",
      ],
    },
    good: {
      prompt: "Summarise the French Revolution in 5 bullet points for a Class 9 student revising for exams. Focus on: causes, key events (1789–1799), role of Enlightenment ideas, and impact on India's independence movement. Use simple language.",
      output: "• CAUSES: Economic crisis (France bankrupt from wars + bad harvests), social inequality (3rd Estate taxed heavily while nobility exempt), spread of Enlightenment ideas about liberty and equality.\n\n• TRIGGER (1789): Storming of the Bastille (14 July)  symbolic start of revolution; absolute monarchy challenged.\n\n• KEY EVENTS: Declaration of Rights of Man (Aug 1789) → Constitutional monarchy → King Louis XVI executed (1793) → Reign of Terror → Napoleon rises to power (1799).\n\n• ENLIGHTENMENT IDEAS: Liberty, equality, fraternity  these ideas spread across the world and inspired future revolutions.\n\n• INDIA CONNECTION: These ideals of liberty and self-rule later influenced Indian freedom fighters  Bal Gangadhar Tilak referenced them.",
      improvements: [
        "Bullet format → easy revision scanning",
        "Exam focus → relevant content only",
        "Class 9 level → appropriate difficulty",
        "India connection → CBSE syllabus relevance",
      ],
    },
    principle: "Give Context: Tell the AI who the audience is, what purpose the output serves, and which format will be most useful.",
  },
  explain: {
    key: "explain", domain: "Concept Explanation", emoji: "💡",
    context: "A student struggling with probability wants AI to explain the concept.",
    bad: {
      prompt: "explain probability",
      output: "Probability is a branch of mathematics that deals with the likelihood of events occurring. It is measured as a number between 0 and 1, where 0 means the event is impossible and 1 means the event is certain. The probability formula is P(E) = n(E)/n(S).",
      problems: [
        "Textbook-style  doesn't help a struggling student understand",
        "No analogy used  hard to connect to real life",
        "No example  abstract formula without context",
        "Doesn't address WHY students find it confusing",
      ],
    },
    good: {
      prompt: "Explain probability to a Class 9 student who is confused by the formula P(E) = n(E)/n(S). Use the example of a cricket toss. Include: what 'favourable outcomes' means, why the answer is always between 0 and 1, and one common mistake students make. Use a conversational tone.",
      output: "Think of a cricket match. Before the toss, the umpire flips a coin. What are the chances it lands on Heads?\n\nThere are only 2 possible outcomes: Heads or Tails  that's your n(S), the total.\nYou want Heads  that's 1 favourable outcome, which is your n(E).\n\nSo P(Heads) = 1 ÷ 2 = 0.5. That's 50%  an equal chance.\n\nWhy always 0 to 1? Because you can't get MORE favourable outcomes than total outcomes. If all outcomes are favourable, P = 1 (certain). If none are, P = 0 (impossible).\n\nCommon mistake: Students write P(getting a 7 on a standard die) = 7/6. That's impossible! 7 doesn't exist on the die, so n(E) = 0, meaning P = 0.",
      improvements: [
        "Relatable example (cricket) → immediate connection",
        "Explains WHY the formula works → deeper understanding",
        "Addresses the common mistake → prevents errors",
        "Conversational tone → feels like a tutor, not a textbook",
      ],
    },
    principle: "Add Role & Analogy: Ask AI to explain like a teacher/tutor, use a specific analogy, and address common misconceptions.",
  },
  creative: {
    key: "creative", domain: "Creative Writing", emoji: "🎨",
    context: "A student wants AI to help write a short story about a robot learning kindness.",
    bad: {
      prompt: "write story about robot",
      output: "Once there was a robot named RB-1. It was a very advanced robot. It could do many things. One day it met a human. The human was kind. The robot learned from the human. The end.",
      problems: [
        "No genre, no tone, no length specified",
        "No character depth requested",
        "No plot arc  just events strung together",
        "Reads as 5 sentences, not a story",
      ],
    },
    good: {
      prompt: "Write a short 200-word science fiction story for a 14-year-old reader about a robot named ARIA who learns what kindness means after meeting an elderly street vendor in Mumbai. Include: a specific moment of conflict, a turning point where ARIA understands an emotion, and end with ARIA doing something unexpectedly kind. Avoid clichés  make the robot's confusion about emotions feel real.",
      output: "ARIA-7 processed 4,847 vendors in the Dharavi market in 2.3 seconds. Transaction speed: optimal. But at stall #312, data feed stalled.\n\nAn old man was giving away samosas  for free  to a thin child who clearly couldn't pay. ARIA's profit-loss module flagged it as 'irrational behaviour.'\n\n'Why?' ARIA asked. Its language module expected a logical answer.\n\nThe old man looked up, squinting. 'Because he was hungry, ji. Sometimes that's enough.'\n\nARIA stood still for 0.003 seconds  an eternity for a machine. The child was now smiling. The smiling data wasn't useful. But something in ARIA's pattern-recognition engine noted: the old man was also smiling, despite having less than before.\n\n'Less is more.' The phrase had always seemed like a mathematical error.\n\nThe next morning, ARIA reconfigured its delivery route. It added 12 minutes to each shift. It used that time to carry heavy bags for elderly shoppers  silently, without logging it as a task.\n\nSmiling, it turned out, was also contagious.",
      improvements: [
        "Specific setting (Mumbai) → vivid, grounded story",
        "Emotional arc specified → story has a turning point",
        "Anti-cliché instruction → avoids generic robot tropes",
        "Word limit → appropriately sized creative piece",
      ],
    },
    principle: "Set Scene & Constraints: Specify setting, character, emotional arc, and what to AVOID. Constraints unlock creativity.",
  },
}

// ── Ethics scenarios ──────────────────────────────────────────────────────────

const ETHICS_SCENARIOS: EthicsScenario[] = [
  {
    id: 1,
    title: "Academic Assignment",
    scenario: "A student uses ChatGPT to write their entire Class 9 science project on renewable energy and submits it as their own work without telling the teacher.",
    options: [
      { label: "This is fine  AI is just a tool like a calculator", isEthical: false, reason: "A calculator doesn't think or write for you. Submitting AI-written work as your own is academic dishonesty  you are claiming credit for work you did not do and cheating yourself out of the learning." },
      { label: "Unethical  this is academic plagiarism", isEthical: true, reason: "Correct. Submitting AI-generated work as your own is a form of plagiarism. Most schools now have AI-use policies that require disclosure. The student misses the actual learning and is deceiving the teacher." },
      { label: "Use AI to write it, then paraphrase heavily", isEthical: false, reason: "Paraphrasing AI-generated content without disclosure is still deceptive. The ideas and structure were not yours  rearranging words doesn't change that." },
    ],
  },
  {
    id: 2,
    title: "AI-Generated Photos",
    scenario: "A student uses an AI image tool to create a fake photo of their classmate in an embarrassing situation and shares it on the class WhatsApp group.",
    options: [
      { label: "It's harmless  it's obviously fake", isEthical: false, reason: "Fake but realistic images can cause real psychological harm. The classmate may not be able to prove it's fake to everyone who sees it. This is a form of cyberbullying and may be illegal under India's IT Act." },
      { label: "Seriously unethical  this is digital abuse", isEthical: true, reason: "Correct. Creating non-consensual fake images of real people  especially in a humiliating context  is a serious ethical and potentially legal violation. India's DPDP Act and IT Act have provisions against this." },
      { label: "Only unethical if the classmate sees it", isEthical: false, reason: "The harm doesn't depend on the victim being aware  sharing fake harmful content is wrong regardless. And once sent to a WhatsApp group, you cannot control who sees it." },
    ],
  },
  {
    id: 3,
    title: "Citing AI",
    scenario: "A student uses Claude AI to research information for a history essay. They verify the facts from textbooks but don't mention they used AI in their research process.",
    options: [
      { label: "Ethical  they verified facts, so it's fine", isEthical: true, reason: "Using AI as a research starting point, then verifying with authoritative sources, and writing the essay yourself is acceptable. This is similar to using a search engine. Since they wrote the essay themselves, disclosure depends on school policy  but the approach itself is honest." },
      { label: "Always unethical to use AI for schoolwork", isEthical: false, reason: "This is too absolute. Using AI as a research tool (not to write for you) is comparable to using Google or an encyclopedia. The key ethical issues are: did you write the work yourself? Did you verify facts? Does your school require AI disclosure?" },
      { label: "They should disclose AI use to the teacher", isEthical: true, reason: "Also correct  disclosure is always the safer and more transparent choice. Many schools now ask students to note any AI tools used in research. When in doubt, disclose." },
    ],
  },
  {
    id: 4,
    title: "Deepfake Video",
    scenario: "A student finds a very realistic deepfake video online showing their school principal saying something they never actually said. They think it's funny and share it with friends.",
    options: [
      { label: "It's just for laughs  no harm done", isEthical: false, reason: "Sharing deepfakes of real people can damage their reputation, cause emotional distress, and is potentially illegal under Indian law (Section 66D of the IT Act covers impersonation using digital means). 'It's just a joke' is not a legal defence." },
      { label: "Unethical and potentially illegal  don't share", isEthical: true, reason: "Correct. Deepfakes of identifiable real people without consent  especially in damaging contexts  are a serious ethical violation. Sharing amplifies the harm. The right response is to report the deepfake, not spread it." },
      { label: "Only report if the principal asks", isEthical: false, reason: "Waiting for the victim to ask doesn't make an action ethical. You already know it's fake  sharing it knowing it's a lie about a real person is deceptive regardless of whether they personally ask you to stop." },
    ],
  },
]

// ── Improve tab ───────────────────────────────────────────────────────────────

function ImproveTab() {
  const [taskKey, setTaskKey] = useState<TaskKey>("write")
  const [view, setView]       = useState<"bad" | "good">("bad")
  const task = TASKS[taskKey]

  return (
    <div className="grid md:grid-cols-2">
      {/* Canvas  prompt viewer */}
      <div className="relative bg-[#060A12] flex flex-col min-h-80 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="pl-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#pl-dots)" />
        </svg>

        {/* Task selector */}
        <div className="relative z-10 flex gap-1.5 p-3 border-b border-white/5 flex-wrap">
          {(Object.values(TASKS)).map(t => (
            <button key={t.key}
              onClick={() => { setTaskKey(t.key); setView("bad") }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
              style={taskKey === t.key
                ? { background: "#F9731620", color: "#F97316", border: "1px solid #F9731640" }
                : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
              }
            >
              <span>{t.emoji}</span> {t.domain}
            </button>
          ))}
        </div>

        {/* Bad / Good toggle */}
        <div className="relative z-10 flex border-b border-white/5">
          {([
            { key: "bad"  as const, label: "Bad Prompt",  color: "#EF4444" },
            { key: "good" as const, label: "Good Prompt", color: "#10B981" },
          ]).map(v => (
            <button key={v.key}
              onClick={() => setView(v.key)}
              className="flex-1 py-2 text-[10px] font-bold transition-all relative"
              style={view === v.key ? { color: v.color } : { color: "#475569" }}
            >
              {v.label}
              {view === v.key && (
                <motion.div layoutId="pl-view"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: v.color }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative z-10 flex-1 p-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={`${taskKey}-${view}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-[9px] text-slate-500 italic">{task.context}</p>

              {/* Prompt box */}
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full"
                    style={{ background: view === "bad" ? "#EF4444" : "#10B981" }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: view === "bad" ? "#EF4444" : "#10B981" }}
                  >
                    {view === "bad" ? "Weak Prompt" : "Strong Prompt"}
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed">
                  {view === "bad" ? task.bad.prompt : task.good.prompt}
                </p>
              </div>

              {/* AI output box */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">AI Output →</p>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {view === "bad" ? task.bad.output : task.good.output}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Panel */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={`${taskKey}-${view}-panel`}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">Prompt Engineering</p>
              <h3 className="font-sora font-bold text-gray-900 text-sm leading-tight">
                {view === "bad" ? "What went wrong?" : "What improved?"}
              </h3>
            </div>

            <div className="space-y-1.5">
              {(view === "bad" ? task.bad.problems : task.good.improvements).map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-2 p-2.5 rounded-xl border"
                  style={view === "bad"
                    ? { borderColor: "#EF444430", background: "#FEF2F2" }
                    : { borderColor: "#10B98130", background: "#ECFDF5" }
                  }
                >
                  {view === "bad"
                    ? <XCircle size={12} className="text-red-500 shrink-0 mt-0.5" />
                    : <CheckCircle2 size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                  }
                  <p className="text-[10px] leading-snug"
                    style={{ color: view === "bad" ? "#991B1B" : "#065F46" }}
                  >
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl bg-violet-50 border border-violet-100 p-3">
              <div className="flex items-start gap-2">
                <Wand2 size={12} className="text-violet-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-violet-700 mb-0.5">Key Principle</p>
                  <p className="text-[10px] text-violet-700 leading-snug">{task.principle}</p>
                </div>
              </div>
            </div>

            <button onClick={() => setView(v => v === "bad" ? "good" : "bad")}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors"
              style={view === "bad"
                ? { background: "#10B981", color: "#fff" }
                : { background: "#EF4444", color: "#fff" }
              }
            >
              <ChevronRight size={13} />
              {view === "bad" ? "See the improved prompt →" : "← Back to weak prompt"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Ethics tab ────────────────────────────────────────────────────────────────

function EthicsTab() {
  const [idx, setIdx]       = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [score, setScore]   = useState(0)

  const scenario = ETHICS_SCENARIOS[idx]
  const revealed  = chosen !== null
  const chosenOpt = chosen !== null ? scenario.options[chosen] : null

  const handleChoose = (i: number) => {
    if (revealed) return
    setChosen(i)
    if (scenario.options[i].isEthical) setScore(s => s + 1)
  }

  const next = () => {
    setIdx(i => (i + 1) % ETHICS_SCENARIOS.length)
    setChosen(null)
  }

  return (
    <div className="grid md:grid-cols-2">
      {/* Scenario canvas */}
      <div className="relative bg-[#060A12] flex flex-col justify-center min-h-80 p-5 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="et-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#et-dots)" />
        </svg>

        <div className="relative z-10 space-y-4">
          <motion.span key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400"
          >
            Scenario {idx + 1} of {ETHICS_SCENARIOS.length}
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-2xl bg-slate-800 border border-slate-700 p-4"
            >
              <p className="text-[10px] font-bold text-amber-400 mb-2 uppercase tracking-wider">
                {scenario.title}
              </p>
              <p className="text-xs text-slate-200 leading-relaxed">{scenario.scenario}</p>
            </motion.div>
          </AnimatePresence>

          {revealed && chosenOpt && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-3"
              style={{
                borderColor: chosenOpt.isEthical ? "#10B98140" : "#EF444440",
                background:  chosenOpt.isEthical ? "#10B98115" : "#EF444415",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {chosenOpt.isEthical
                  ? <ThumbsUp size={12} className="text-emerald-400" />
                  : <ShieldAlert size={12} className="text-red-400" />
                }
                <p className="text-[10px] font-bold"
                  style={{ color: chosenOpt.isEthical ? "#10B981" : "#EF4444" }}
                >
                  {chosenOpt.isEthical ? "Ethical choice" : "Problematic choice"}
                </p>
              </div>
              <p className="text-[10px] text-slate-300 leading-snug">{chosenOpt.reason}</p>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-4 left-5 flex gap-1">
          {ETHICS_SCENARIOS.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: i === idx ? "#F97316" : "#1E293B" }} />
          ))}
        </div>
      </div>

      {/* Options panel */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">
        <div>
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">
            GenAI Ethics · Score: {score}/{ETHICS_SCENARIOS.length}
          </p>
          <p className="text-xs font-semibold text-gray-900">What should the student do?</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {scenario.options.map((opt, i) => {
              const isChosen = chosen === i
              const isEthical = opt.isEthical
              let style: React.CSSProperties = { background: "#F9FAFB", border: "2px solid #E5E7EB" }
              if (revealed && isEthical) style = { background: "#ECFDF5", border: "2px solid #10B981" }
              else if (revealed && isChosen && !isEthical) style = { background: "#FEF2F2", border: "2px solid #EF4444" }

              return (
                <motion.button key={i}
                  onClick={() => handleChoose(i)}
                  disabled={revealed}
                  whileHover={!revealed ? { scale: 1.01 } : {}}
                  className="w-full p-3 rounded-xl text-left transition-all flex items-start gap-2"
                  style={style}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{ color: revealed ? (isEthical ? "#059669" : isChosen ? "#DC2626" : "#94A3B8") : "#94A3B8" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <p className="text-xs text-gray-800 leading-snug flex-1">{opt.label}</p>
                  {revealed && isEthical && <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />}
                  {revealed && isChosen && !isEthical && <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />}
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
          <p className="text-[10px] font-bold text-amber-700 mb-1">3 Questions to guide ethical AI use:</p>
          {[
            "Is this work genuinely mine, or am I passing off AI work as my own?",
            "Could this content harm, embarrass, or deceive a real person?",
            "Am I being transparent about how I used AI?",
          ].map((q, i) => (
            <p key={i} className="text-[10px] text-amber-700 flex items-start gap-1 mt-0.5 leading-snug">
              <span className="font-bold shrink-0">{i + 1}.</span>{q}
            </p>
          ))}
        </div>

        <button onClick={next}
          className="mt-auto py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
        >
          {revealed ? "Next Scenario →" : "Skip →"}
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimPromptLab() {
  const [tab, setTab] = useState<Tab>("improve")

  return (
    <div>
      <div className="flex border-b border-gray-200 bg-white">
        {([
          { key: "improve" as Tab, label: "Prompt Engineering", color: "#10B981" },
          { key: "ethics"  as Tab, label: "Ethical Use of GenAI", color: "#EF4444" },
        ]).map(t => (
          <button key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-2.5 text-xs font-bold transition-all relative"
            style={tab === t.key ? { color: t.color } : { color: "#94A3B8" }}
          >
            {t.label}
            {tab === t.key && (
              <motion.div layoutId="pl-tab"
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
          {tab === "improve" ? <ImproveTab /> : <EthicsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
