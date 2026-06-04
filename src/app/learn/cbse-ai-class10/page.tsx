import Link from "next/link"
import {
  Brain, Layers, BarChart3, Wrench, Eye, MessageSquare,
  ArrowRight, Clock, Lock, BookOpen, Zap, Award, Target,
  CheckCircle, FileText,
} from "lucide-react"

const UNITS = [
  {
    num:      1,
    title:    "AI Project Cycle & Ethical Frameworks",
    theory:   15, practical: 25,
    marks:    8,
    desc:     "Revisit the AI Project Cycle, explore AI domains, and learn ethical frameworks including bioethics.",
    topics:   ["AI Project Cycle", "AI Domains", "Ethical Frameworks", "Bioethics"],
    unlocked: true,
    Icon:     Brain,
  },
  {
    num:      2,
    title:    "Advanced Concepts of Modeling in AI",
    theory:   25, practical: 28,
    marks:    10,
    desc:     "Dive deep into Machine Learning types, classification, regression, clustering, and neural networks.",
    topics:   ["AI vs ML vs DL", "Supervised Learning", "Unsupervised Learning", "Neural Networks"],
    unlocked: true,
    Icon:     Layers,
  },
  {
    num:      3,
    title:    "Evaluating Models",
    theory:   15, practical: 20,
    marks:    8,
    desc:     "Learn train-test split, confusion matrix, precision, recall, F1 score, and ethical evaluation.",
    topics:   ["Train-Test Split", "Confusion Matrix", "Precision & Recall", "F1 Score"],
    unlocked: false,
    Icon:     BarChart3,
  },
  {
    num:      4,
    title:    "No-Code AI for Statistical Data",
    theory:   10, practical: 15,
    marks:    6,
    desc:     "Discover no-code AI tools and walk through a statistical data project with Orange Data Mining.",
    topics:   ["No-Code vs Low-Code", "Orange Data Mining", "Palmer Penguins", "AI Project Cycle"],
    unlocked: false,
    Icon:     Wrench,
  },
  {
    num:      5,
    title:    "Computer Vision",
    theory:   20, practical: 30,
    marks:    10,
    desc:     "Understand how computers see — pixels, convolution, CNNs, and build models with no-code tools.",
    topics:   ["Pixels & RGB", "CV Applications", "Convolution & CNN", "Teachable Machine"],
    unlocked: false,
    Icon:     Eye,
  },
  {
    num:      6,
    title:    "Natural Language Processing",
    theory:   15, practical: 27,
    marks:    8,
    desc:     "Learn how AI understands human language — NLP stages, chatbots, TF-IDF, and sentiment analysis.",
    topics:   ["NLP Stages", "Text Processing", "TF-IDF", "Sentiment Analysis"],
    unlocked: false,
    Icon:     MessageSquare,
  },
]

const HIGHLIGHTS = [
  { Icon: BookOpen, label: "6 Units",        sub: "Complete CBSE 417 syllabus"    },
  { Icon: Clock,    label: "~245 Hours",     sub: "Theory + Practical combined"   },
  { Icon: Zap,      label: "AI-Native Tools", sub: "Sandbox, animations, quizzes"  },
  { Icon: Award,    label: "50 Theory Marks", sub: "CBSE board exam aligned"       },
]

const EXAM_PARTS = [
  { part: "Part A", name: "Employability Skills",      marks: 10, color: "bg-violet-100 text-violet-700" },
  { part: "Part B", name: "Subject Specific (Theory)", marks: 40, color: "bg-blue-100   text-blue-700"   },
  { part: "Part C", name: "Practical Work",            marks: 35, color: "bg-teal-100   text-teal-700"   },
  { part: "Part D", name: "Project Work / Portfolio",  marks: 15, color: "bg-orange-100 text-orange-700" },
]

export default function AI10OverviewPage() {
  return (
    <div>

      {/* ── Hero ───────────────────────────────────────────────────────────────── */}
      <div className="relative bg-[#0d0d0d] px-6 lg:px-10 py-12 overflow-hidden mx-4 lg:mx-6 mt-4 rounded-2xl">

        {/* Decorative icons */}
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Brain   size={240} className="absolute -right-12 -top-8 text-orange-500 opacity-[0.05]" />
          <Layers  size={80}  className="absolute right-52 top-6 text-orange-400 opacity-[0.06] rotate-12" />
          <Eye     size={64}  className="absolute right-32 bottom-4 text-violet-400 opacity-[0.06]" />
          <MessageSquare size={72} className="absolute right-8 bottom-6 text-orange-400 opacity-[0.05]" />
        </div>

        {/* CBSE badge row */}
        <div className="flex items-center gap-3 mb-5 relative z-10">
          <div className="flex items-center gap-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full px-3 py-1.5">
            <Award size={12} className="text-orange-400" />
            <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">CBSE · Sub. Code 417</span>
          </div>
          <span className="text-xs text-white/40 font-medium">Session 2026–2027</span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="font-sora text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
            Artificial Intelligence
          </h1>
          <p className="text-white/50 text-sm font-medium mb-4">Class X · Total 100 Marks (Theory 50 + Practical 50)</p>

          <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-8 max-w-xl">
            The complete Class X CBSE AI syllabus — from ethical frameworks and advanced ML models
            to computer vision and NLP — brought to life with interactive animations,
            hands-on activities, and concept-level quizzes.
          </p>

          <Link
            href="/learn/cbse-ai-class10/module-1"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            Start Unit 1 <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── Highlights strip ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200">
          {HIGHLIGHTS.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-4 first:pl-0 last:pr-0">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Curriculum ───────────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-10 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sora font-bold text-gray-900 text-lg">Part B — Subject Specific Skills</h2>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            6 units · 245 hours
          </span>
        </div>

        <div className="space-y-3">
          {UNITS.map((u) => {
            const { Icon } = u
            return u.unlocked ? (
              <Link
                key={u.num}
                href={`/learn/cbse-ai-class10/module-${u.num}`}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unit {u.num}</span>
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                      Unlocked
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors text-sm mb-1">{u.title}</p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{u.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {u.topics.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="text-xs text-gray-400">{u.theory + u.practical}h total</p>
                  <p className="text-sm font-bold text-orange-600 mt-0.5">{u.marks}M</p>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-orange-400 transition-colors mt-2 ml-auto" />
                </div>
              </Link>
            ) : (
              <div
                key={u.num}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200 cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unit {u.num}</span>
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 border border-gray-200">
                      Coming soon
                    </span>
                  </div>
                  <p className="font-semibold text-gray-400 text-sm mb-1">{u.title}</p>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{u.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {u.topics.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Lock size={16} className="text-gray-300 shrink-0 mt-1" />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Exam Pattern ─────────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-10 pb-10">
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <FileText size={15} className="text-gray-500" />
            <h2 className="font-sora font-bold text-gray-900 text-sm">Exam Pattern — Total 100 Marks</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {EXAM_PARTS.map(({ part, name, marks, color }) => (
              <div key={part} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color}`}>{part}</span>
                  <span className="text-sm text-gray-700">{name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{marks} marks</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's unique */}
        <div className="mt-6 bg-gradient-to-br from-orange-50 to-violet-50 rounded-2xl p-6 border border-orange-100">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Why PandaLearn for CBSE AI Class X?</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ["Ethical Framework Explorer", "Interactively compare sector-based and value-based frameworks with real AI case studies."],
              ["ML Model Playground", "Visualise supervised, unsupervised, and reinforcement learning with animated data flows."],
              ["CNN Layer Visualiser", "Watch data transform through convolution, ReLU, pooling, and FC layers in real-time."],
              ["TF-IDF Calculator", "Step through term frequency and inverse document frequency with live calculations."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
