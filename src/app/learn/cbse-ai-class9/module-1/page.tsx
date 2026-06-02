import { Brain, FlaskConical, Shield, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import ObjectivesCard from "@/components/learn/ObjectivesCard"

function CBSEAccordion() {
  const outcomes = [
    "Identify and appreciate AI and describe its applications in daily life.",
    "Recognise the three domains of AI: Computer Vision, Data Statistics, and NLP.",
    "Identify the AI Project Cycle framework (Problem Scoping → Data → Modeling → Evaluation → Deployment).",
    "Learn problem scoping and the 4Ws Problem Canvas.",
    "Brainstorm ethical issues around a selected AI problem.",
    "Understand AI bias and AI access and describe potential ethical considerations.",
    "Analyse advantages and disadvantages of Artificial Intelligence.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 1  Official Learning Outcomes</span>
        <ChevronDown size={14} className="text-violet-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-5 py-4 bg-white space-y-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Learning Outcomes</p>
          <ul className="space-y-1.5">
            {outcomes.map((o, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-violet-100 text-violet-600 text-[9px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Theory Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">30h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Practical Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">25h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Max Marks</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">10M</p>
          </div>
        </div>
      </div>
    </details>
  )
}

// â”€â”€ Lesson map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "1",
      accent: "#3B82F6", bg: "#EFF6FF", textColor: "text-blue-700",
      title: "What is AI? The Three Realms",
      time: "~45 min",
      topics: ["AI Definition", "History", "NLP · CV · Data"],
      feature: "3-domain interactive explorer",
    },
    {
      n: "02", href: "2",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "The AI Project Cycle",
      time: "~90 min",
      topics: ["6-Step Cycle", "4Ws Canvas", "Model Types", "Confusion Matrix"],
      feature: "AI Project Sandbox — 8 steps",
    },
    {
      n: "03", href: "3",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "AI Ethics, Bias &amp; Access",
      time: "~45 min",
      topics: ["AI Ethics", "Bias Types", "Digital Divide"],
      feature: "Ethics Roleplay + Balloon Debate",
    },
  ]

  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">3 Lessons — click to begin</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {lessons.map(l => (
          <a
            key={l.n}
            href={l.href}
            className="block rounded-2xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5 group"
            style={{ borderColor: l.accent + "44", background: l.bg }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center font-sora font-bold text-white text-xs shrink-0"
                style={{ background: l.accent }}
              >
                {l.n}
              </span>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${l.textColor}`}>Lesson {l.n}</p>
                <p className="text-[11px] text-gray-400">{l.time}</p>
              </div>
            </div>
            <p className="font-sora font-bold text-gray-900 text-xs leading-snug mb-2.5">{l.title}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {l.topics.map(t => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-[10px] font-semibold ${l.textColor}`}>✦ {l.feature}</p>
              <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: l.accent }}
              >
                Start →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

// â”€â”€ Section heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Module1Page() {
  return (
    <div className="px-6 lg:px-10">

      {/* â”€â”€ Hero banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Brain size={200} className="absolute -right-10 -top-8 text-orange-500 opacity-[0.07]" />
          <Shield size={72} className="absolute right-44 top-6 text-violet-400 opacity-[0.06] rotate-6" />
          <FlaskConical size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 1 of 5
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 10 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            AI Reflection, Project Cycle & Ethics
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Three lessons packed into one module: discover the three realms of AI,
            learn the six-step AI Project Cycle by building your own mini AI project in the interactive Sandbox,
            and think critically about ethics, bias, and who benefits  or suffers  from AI.
          </p>
        </div>
      </div>

      {/* â”€â”€ CBSE syllabus accordion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mt-6">
        <CBSEAccordion />
      </div>

      {/* â”€â”€ Module body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="py-10 space-y-16">

        {/* â”€â”€ Lesson roadmap â”€â”€ */}
        <LessonMap />

        {/* â”€â”€ Learning objectives â”€â”€ */}
        <ObjectivesCard
          objectives={[
            "Identify AI in everyday life and describe its three domains: NLP, Computer Vision, and Data Statistics.",
            "Explain the 6-step AI Project Cycle and apply it using the interactive Project Sandbox.",
            "Fill in a 4Ws Problem Canvas to scope a real-world AI problem.",
            "Distinguish between rule-based and learning-based AI models.",
            "Define TP, FP, TN, FN and explain why evaluation matters.",
            "Identify types of AI bias and describe ethical considerations of AI deployment.",
          ]}
        />

        {/* ── Start CTA ── */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 p-6 text-center">
          <p className="text-sm text-gray-500 mb-3">Ready? Lessons open one at a time so you can focus fully on each topic.</p>
          <a href="1"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all"
          >
            Start Lesson 1 →
          </a>
        </div>

      </div>
    </div>
  )
}