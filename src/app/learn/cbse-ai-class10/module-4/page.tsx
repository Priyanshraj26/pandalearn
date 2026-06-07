import { Wrench, Blocks, Laptop, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimNoCodeComparison from "./_components/AnimNoCodeComparison"
import AnimNoCodeTools from "./_components/AnimNoCodeTools"
import LessonProgressStrip from "./_components/LessonProgressStrip"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "What is No-Code AI?",
    options: [
      "AI that writes its own code",
      "Building AI models without writing code, using visual drag-and-drop",
      "A programming language for AI",
      "AI that only works offline",
    ],
    correct: 1,
    explanation: "No-Code AI allows anyone to build AI models using visual interfaces with drag-and-drop tools, without needing to write a single line of code.",
  },
  {
    question: "Which of the following is a DISADVANTAGE of No-Code AI?",
    options: [
      "Anyone can use it without coding",
      "Visual interface with real-time preview",
      "Limited flexibility and customisation",
      "Faster development time",
    ],
    correct: 2,
    explanation: "While No-Code AI is accessible to everyone, it offers limited flexibility — you cannot build complex custom architectures or have fine-grained control over the model.",
  },
  {
    question: "Automation bias refers to:",
    options: [
      "AI systems that run automatically",
      "The tendency to favour automated decisions over contradictory human judgement",
      "Bias in automated testing",
      "Errors in code automation",
    ],
    correct: 1,
    explanation: "Automation bias is the tendency to trust and favour AI/automated decisions even when human judgement or evidence suggests otherwise — a key ethical concern in No-Code AI.",
  },
  {
    question: "Orange Data Mining was developed by:",
    options: [
      "Google",
      "Microsoft",
      "University of Ljubljana, Slovenia",
      "Amazon",
    ],
    correct: 2,
    explanation: "Orange Data Mining was developed by the University of Ljubljana in Slovenia, first released in October 1996. It's one of the oldest visual data mining tools.",
  },
  {
    question: "Which tool is best for quick webcam-based image classification?",
    options: [
      "Azure Machine Learning",
      "Orange Data Mining",
      "Teachable Machine",
      "AutoML",
    ],
    correct: 2,
    explanation: "Google's Teachable Machine lets you train image, sound, and pose classification models directly in your browser using your webcam — perfect for quick prototypes.",
  },
  {
    question: "The main difference between Full-Code and No-Code AI is:",
    options: [
      "Full-Code is faster to develop",
      "No-Code offers more flexibility",
      "Full-Code requires programming while No-Code uses visual interfaces",
      "No-Code is only for experts",
    ],
    correct: 2,
    explanation: "Full-Code requires writing programs in Python/TensorFlow etc., while No-Code uses drag-and-drop visual interfaces accessible to anyone regardless of coding skill.",
  },
  {
    question: "Which No-Code tool works completely offline for image classification?",
    options: [
      "Google Cloud AutoML",
      "Lobe AI",
      "Teachable Machine",
      "Azure Machine Learning",
    ],
    correct: 1,
    explanation: "Lobe AI by Microsoft works entirely offline — you label images locally, train the model on your machine, and export it without ever connecting to the cloud.",
  },
  {
    question: "In the AI Project Cycle with No-Code tools, which stage is handled differently?",
    options: [
      "Problem Scoping — no difference",
      "Data Acquisition — still need to collect data",
      "Modelling — tools handle the coding part automatically",
      "Deployment — must always be manual",
    ],
    correct: 2,
    explanation: "The AI Project Cycle remains the same 6 stages, but the Modelling stage is where No-Code tools shine — they handle all the coding, algorithm selection, and training automatically.",
  },
  {
    question: "Kayla the zoo dietitian uses No-Code AI to:",
    options: [
      "Write code for animal tracking",
      "Predict animal dietary needs without programming",
      "Build a website for the zoo",
      "Train animals using AI",
    ],
    correct: 1,
    explanation: "Kayla demonstrates how non-technical professionals (like zoo dietitians) can use No-Code AI to solve domain-specific problems — predicting animal dietary needs without knowing how to code.",
  },
  {
    question: "Which statement about No-Code AI security is TRUE?",
    options: [
      "No-Code AI is always more secure than Full-Code",
      "Cloud-based No-Code tools may raise data privacy concerns",
      "No-Code AI has no security issues",
      "Security is only a concern with Full-Code AI",
    ],
    correct: 1,
    explanation: "Cloud-based No-Code tools require uploading your data to external servers, which raises legitimate data privacy and security concerns — especially with sensitive data.",
  },
]

// ── CBSE Syllabus accordion ────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Define No-Code AI and explain its purpose.",
    "Compare Full-Code, Low-Code, and No-Code approaches.",
    "List advantages and disadvantages of No-Code AI.",
    "Explain automation bias and its implications.",
    "Identify key No-Code AI tools and their capabilities.",
    "Apply the AI Project Cycle using No-Code tools.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 4 — Official Learning Outcomes</span>
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
            <p className="text-sm font-bold text-gray-900 mt-0.5">10h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Practical Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">15h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Max Marks</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">6M</p>
          </div>
        </div>
      </div>
    </details>
  )
}

// ── Lesson map ────────────────────────────────────────────────────────────────

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "#lesson-01",
      accent: "#3B82F6", bg: "#EFF6FF", textColor: "text-blue-700",
      title: "No-Code AI Introduction",
      time: "~30 min",
      topics: ["No-Code AI", "Full vs Low vs No", "Automation Bias"],
      feature: "Interactive coding spectrum comparison",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "Popular Tools & Use Cases",
      time: "~40 min",
      topics: ["Azure ML", "AutoML", "Orange", "Teachable Machine"],
      feature: "WOW: No-Code tools explorer",
    },
  ]

  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Module Roadmap</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {lessons.map(l => (
          <a
            key={l.n}
            href={l.href}
            className="block rounded-2xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
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
            <div className="flex flex-wrap gap-1 mb-2.5">
              {l.topics.map(t => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">
                  {t}
                </span>
              ))}
            </div>
            <p className={`text-[10px] font-semibold ${l.textColor}`}>✦ {l.feature}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({ n, title, lesson }: { n: string; title: string; lesson: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center shrink-0">
        <span className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-sora font-bold text-white text-sm">
          {n}
        </span>
      </div>
      <div>
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">{lesson}</p>
        <h2 className="font-sora font-bold text-gray-900 text-lg leading-tight">{title}</h2>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Module4Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Wrench size={200} className="absolute -right-10 -top-8 text-orange-500 opacity-[0.07]" />
          <Blocks size={72} className="absolute right-44 top-6 text-violet-400 opacity-[0.06] rotate-6" />
          <Laptop size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 4 of 6
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~25 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 6 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            No-Code AI for Statistical Data
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Two lessons: discover how No-Code AI democratises artificial intelligence for everyone,
            and explore five popular tools — from Orange Data Mining to Google&apos;s Teachable Machine.
          </p>
        </div>
      </div>

      {/* ── CBSE syllabus accordion ─────────────────────────────────────────── */}
      <div className="mt-6">
        <CBSEAccordion />
      </div>

      {/* ── Module body ─────────────────────────────────────────────────────── */}
      <div className="py-10 space-y-16">

        {/* ── Lesson roadmap ── */}
        <LessonMap />

        {/* ── Learning objectives ── */}
        <ObjectivesCard
          objectives={[
            "Define No-Code AI and explain why it matters for democratising technology.",
            "Compare Full-Code, Low-Code, and No-Code approaches with advantages and trade-offs.",
            "Identify and explain the risks of automation bias.",
            "Name five popular No-Code AI tools and describe their capabilities.",
            "Apply the AI Project Cycle using No-Code tools.",
            "Understand the Palmer Penguins case study with Orange Data Mining.",
          ]}
        />

        {/* ════════════════════════════════════════════════════════
            LESSON 1: No-Code AI Introduction
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="No-Code AI Introduction" lesson="Lesson 1 of 2" />

          <ConceptCard number="1.1" title="What is No-Code AI?" tag="Definition">
            <p>
              <strong>No-Code AI</strong> allows you to build artificial intelligence models
              without writing a single line of code. Instead of programming in Python or TensorFlow,
              you use visual drag-and-drop interfaces to design, train, and deploy AI models.
            </p>
            <p className="mt-2">
              <strong>Key idea:</strong> Just as word processors let anyone write documents without
              knowing HTML, No-Code AI lets anyone build AI models without knowing programming.
            </p>
          </ConceptCard>

          <ConceptCard number="1.2" title="No-Code vs Low-Code vs Full-Code" tag="Key Concept">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-2 px-3 font-bold text-gray-700">Aspect</th>
                    <th className="text-left py-2 px-3 font-bold text-blue-600">Full-Code</th>
                    <th className="text-left py-2 px-3 font-bold text-orange-600">Low-Code</th>
                    <th className="text-left py-2 px-3 font-bold text-emerald-600">No-Code</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Coding</td>
                    <td className="py-2 px-3">All code</td>
                    <td className="py-2 px-3">Some code</td>
                    <td className="py-2 px-3">Zero code</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Users</td>
                    <td className="py-2 px-3">Programmers</td>
                    <td className="py-2 px-3">Power users</td>
                    <td className="py-2 px-3">Anyone</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Flexibility</td>
                    <td className="py-2 px-3">Maximum</td>
                    <td className="py-2 px-3">Moderate</td>
                    <td className="py-2 px-3">Limited</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-700">Speed</td>
                    <td className="py-2 px-3">Weeks-months</td>
                    <td className="py-2 px-3">Days-weeks</td>
                    <td className="py-2 px-3">Hours-days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptCard>

          {/* Interactive: No-Code Comparison */}
          <AnimFrame id="anim-nocode-comparison" title="Interactive: Coding Spectrum" description="Compare Full-Code, Low-Code, and No-Code approaches side by side">
            <AnimNoCodeComparison />
          </AnimFrame>

          <ConceptCard number="1.3" title="Benefits of No-Code AI" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["Visual Interface", "Drag-and-drop components make AI model building intuitive and accessible."],
                ["Real-Time Preview", "See results as you build — no waiting for long compilation or training cycles."],
                ["Less Stress", "No coding errors, no debugging, no dependency issues — just focus on your problem."],
                ["Democratises AI", "Doctors, teachers, architects, musicians — anyone can now harness AI for their domain."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-32 shrink-0">{title}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.4" title="Disadvantages & Risks" tag="Warning">
            <div className="space-y-2 mt-1">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-700 mb-1">Limited Flexibility</p>
                <p className="text-[11px] text-amber-800">Cannot build complex custom architectures. You&apos;re limited to what the tool provides.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-xs font-bold text-red-700 mb-1">⚠ Automation Bias</p>
                <p className="text-[11px] text-red-800">
                  The tendency to favour automated AI decisions over contradictory human judgement.
                  When a tool gives a result, people tend to trust it blindly — even when their expertise says otherwise.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <p className="text-xs font-bold text-orange-700 mb-1">Security Concerns</p>
                <p className="text-[11px] text-orange-800">Cloud-based tools require uploading data to external servers, raising privacy issues with sensitive data.</p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="1.5" title="Kayla the Zoo Dietitian" tag="Example">
            <p>
              Kayla works at a zoo and needs to predict the dietary needs of different animals.
              She&apos;s not a programmer, but using No-Code AI she can:
            </p>
            <ol className="mt-2 space-y-1 text-xs text-gray-600 list-decimal list-inside">
              <li>Upload animal data (species, weight, age, activity level)</li>
              <li>Use a drag-and-drop tool to select features and labels</li>
              <li>Train a model that predicts optimal food portions</li>
              <li>Get results without writing a single line of code</li>
            </ol>
            <p className="mt-2 text-xs text-gray-600">
              This shows how <strong>domain experts</strong> can leverage AI directly — without needing
              a data science team.
            </p>
          </ConceptCard>

          <MicroCheck
            question="The main advantage of No-Code AI is:"
            options={[
              "Maximum flexibility and customisation",
              "Anyone can build AI without coding",
              "It's always more accurate than Full-Code",
              "It works without any data",
            ]}
            correct={1}
            explanation="The primary advantage of No-Code AI is accessibility — it lets anyone, regardless of their programming background, build and deploy AI models using visual interfaces."
          />

          <MicroCheck
            question="Which is NOT a disadvantage of No-Code AI?"
            options={[
              "Limited flexibility",
              "Automation bias",
              "Faster development time",
              "Security concerns with cloud tools",
            ]}
            correct={2}
            explanation="Faster development time is actually an ADVANTAGE of No-Code AI, not a disadvantage. The disadvantages include limited flexibility, automation bias, and security concerns."
          />

          <MicroCheck
            question="Automation bias means:"
            options={[
              "AI systems that run automatically",
              "Favouring automated decisions over contradictory human judgement",
              "Bias in automated testing frameworks",
              "Computers being faster than humans",
            ]}
            correct={1}
            explanation="Automation bias is the psychological tendency to trust and favour automated/AI decisions even when human expertise or evidence suggests the AI is wrong."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 2: Popular Tools & Use Cases
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="Popular Tools & Use Cases" lesson="Lesson 2 of 2" />

          <ConceptCard number="2.1" title="Five No-Code AI Platforms" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["Azure ML", "Microsoft · 2014 — Enterprise-grade drag-and-drop ML pipeline designer."],
                ["Google AutoML", "Google · 2018 — Auto-trains custom models for vision, NLP, and tabular data."],
                ["Orange Data Mining", "Univ. of Ljubljana · 1996 — Free, open-source visual data analysis tool."],
                ["Lobe AI", "Microsoft · 2015 — Image classification made easy, works offline."],
                ["Teachable Machine", "Google · 2017 — Train models in your browser using your webcam."],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-32 shrink-0">{name}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Interactive: No-Code Tools Explorer */}
          <AnimFrame id="anim-nocode-tools" title="Interactive: No-Code Tools Explorer" description="Explore 5 popular No-Code AI platforms with auto-cycling cards and detailed capabilities">
            <AnimNoCodeTools />
          </AnimFrame>

          <ConceptCard number="2.2" title="AI Project Cycle in No-Code" tag="Key Concept">
            <p>
              The AI Project Cycle remains the same 6 stages even with No-Code tools.
              The key difference is that the <strong>Modelling stage</strong> is handled automatically
              by the tool — you don&apos;t write code, the tool selects algorithms and trains for you.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["1. Problem Scoping", "Same — define the problem"],
                ["2. Data Acquisition", "Same — collect relevant data"],
                ["3. Data Exploration", "Visual tools help here too"],
                ["4. Modelling", "✨ Tool handles this automatically"],
                ["5. Evaluation", "Tool shows accuracy metrics"],
                ["6. Deployment", "One-click or API export"],
              ].map(([stage, note]) => (
                <div key={stage} className="bg-gray-50 rounded-lg p-2 border border-gray-200 text-center">
                  <p className="text-[10px] font-bold text-gray-700">{stage}</p>
                  <p className="text-[9px] text-gray-500 mt-0.5">{note}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="2.3" title="Palmer Penguins Case Study" tag="Example">
            <p>
              A classic No-Code AI project: classifying penguin species using Orange Data Mining.
            </p>
            <div className="mt-3 space-y-2">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">The Problem</p>
                <p className="text-[11px] text-blue-800">
                  Given measurements of a penguin (bill length, bill depth, flipper length, body mass),
                  predict its species: Adelie, Chinstrap, or Gentoo.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <p className="text-xs font-bold text-emerald-700 mb-1">The Solution</p>
                <p className="text-[11px] text-emerald-800">
                  Using Orange Data Mining: load the dataset → visualise features → drag a classifier widget →
                  connect to evaluation → see accuracy results. No code needed.
                </p>
              </div>
            </div>
          </ConceptCard>

          <MicroCheck
            question="Orange Data Mining was developed by:"
            options={[
              "Google",
              "Microsoft",
              "University of Ljubljana, Slovenia",
              "Amazon Web Services",
            ]}
            correct={2}
            explanation="Orange Data Mining was developed by the University of Ljubljana in Slovenia. First released in 1996, it's one of the oldest and most popular visual data analysis tools."
          />

          <MicroCheck
            question="Which tool is best for quick webcam-based image classification?"
            options={[
              "Azure Machine Learning",
              "Orange Data Mining",
              "Teachable Machine",
              "Google Cloud AutoML",
            ]}
            correct={2}
            explanation="Google's Teachable Machine allows you to train image, sound, and pose recognition models directly in your browser using your webcam — the fastest way to prototype an image classifier."
          />
        </section>

        {/* ── Exit Quiz ────────────────────────────────────────────────────────── */}
        <section>
          <ExitQuiz
            moduleName="Unit 4: No-Code AI for Statistical Data"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
