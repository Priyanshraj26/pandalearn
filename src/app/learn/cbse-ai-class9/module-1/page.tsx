import { Brain, FlaskConical, Shield, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimAIDomains from "./_components/AnimAIDomains"
import AnimProjectCycle from "./_components/AnimProjectCycle"
import AnimModelLearning from "./_components/AnimModelLearning"
import AnimProjectSandbox from "./_components/AnimProjectSandbox"
import AnimEthicsScenario from "./_components/AnimEthicsScenario"
import LessonProgressStrip from "./_components/LessonProgressStrip"
import AIDomainsGames from "./_components/AIDomainsGames"
import Canvas4Ws from "./_components/Canvas4Ws"
import ConfusionMatrixClassifier from "./_components/ConfusionMatrixClassifier"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "Which of the three domains of AI focuses on understanding and generating human language?",
    options: ["Computer Vision", "Natural Language Processing", "Data Statistics", "Robotics"],
    correct: 1,
    explanation: "NLP (Natural Language Processing) enables AI to understand, interpret, and generate human language — powering tools like Google Translate, ChatGPT, and smart assistants.",
  },
  {
    question: "What is the FIRST step of the AI Project Cycle?",
    options: ["Data Acquisition", "Modeling", "Problem Scoping", "Deployment"],
    correct: 2,
    explanation: "Problem Scoping is always the first step. You must clearly define WHAT problem you are solving before collecting any data or building any model.",
  },
  {
    question: "The '4Ws Problem Canvas' asks: Who, What, Where, and…",
    options: ["Why", "When", "Which", "Whose"],
    correct: 1,
    explanation: "The 4Ws are: Who is affected, What is the problem, Where does it occur, and When does it happen. This canvas is a CBSE AI curriculum activity for problem scoping.",
  },
  {
    question: "A spam filter marks a genuine email as spam. This is called a…",
    options: ["True Positive", "True Negative", "False Positive", "False Negative"],
    correct: 2,
    explanation: "A False Positive means the model predicted POSITIVE (spam) but the actual label was NEGATIVE (not spam). It incorrectly fired an alarm.",
  },
  {
    question: "A cancer detection AI misses a real cancer case. This is called a…",
    options: ["True Positive", "True Negative", "False Positive", "False Negative"],
    correct: 3,
    explanation: "A False Negative means the model predicted NEGATIVE (no cancer) but the actual label was POSITIVE (has cancer). In healthcare, false negatives are the most dangerous error.",
  },
  {
    question: "Which type of AI model writes its own rules by learning from labelled examples?",
    options: ["Rule-based model", "Learning-based model", "Expert system", "Decision tree written by humans"],
    correct: 1,
    explanation: "A learning-based (or ML-based) model finds patterns in training data automatically. A rule-based model uses if-then rules that humans explicitly write.",
  },
  {
    question: "Netflix recommending movies you might like is an example of which AI domain?",
    options: ["Natural Language Processing", "Computer Vision", "Data Statistics & Patterns", "Robotics"],
    correct: 2,
    explanation: "Recommendation systems analyse numerical data — your watch history, ratings, viewing time — to predict which movies you'll enjoy. This is Data/Statistics-based AI.",
  },
  {
    question: "An AI hiring tool trained on 10 years of hiring data (mostly males) later rejects female applicants unfairly. What kind of bias is this?",
    options: ["Measurement Bias", "Sampling Bias", "Historical Bias", "Random Error"],
    correct: 2,
    explanation: "Historical Bias occurs when past human decisions (e.g., hiring mostly men) are baked into the training data. The AI learns to repeat historical discrimination.",
  },
  {
    question: "In the AI Project Cycle, which step comes immediately AFTER Evaluation?",
    options: ["Problem Scoping", "Data Acquisition", "Modeling", "Deployment"],
    correct: 3,
    explanation: "The cycle is: Scope → Data Acquisition → Data Exploration → Modeling → Evaluation → Deployment. After evaluation confirms the model is good enough, you deploy it — but can always loop back.",
  },
  {
    question: "Which statement about AI Ethics is most accurate?",
    options: [
      "AI is always objective because it uses maths",
      "Ethical issues only arise during deployment, not during design",
      "AI can inherit and amplify human biases from training data",
      "Only governments need to worry about AI ethics",
    ],
    correct: 2,
    explanation: "AI learns from human-generated data, which can contain historical biases. The AI then amplifies those biases at scale — making ethics a concern from the very start of the project cycle.",
  },
]

// ── CBSE Syllabus accordion (server component) ────────────────────────────────

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
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 1 — Official Learning Outcomes</span>
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

// ── Lesson map ────────────────────────────────────────────────────────────────

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "#lesson-01",
      accent: "#6B7280", bg: "#F9FAFB", textColor: "text-gray-600",
      title: "What is AI? The Three Realms",
      time: "~45 min",
      topics: ["AI Definition", "History", "NLP · CV · Data"],
      feature: "3-domain interactive explorer",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "The AI Project Cycle",
      time: "~90 min",
      topics: ["6-Step Cycle", "4Ws Canvas", "Model Types", "Confusion Matrix"],
      feature: "AI Project Sandbox — 8 steps",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "AI Ethics, Bias & Access",
      time: "~45 min",
      topics: ["AI Ethics", "Bias Types", "Digital Divide"],
      feature: "Ethics Roleplay scenario",
    },
  ]

  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Module Roadmap</p>
      <div className="grid sm:grid-cols-3 gap-3">
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

export default function Module1Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
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
              <Clock size={11} /> ~55 hours
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
            and think critically about ethics, bias, and who benefits — or suffers — from AI.
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
            "Identify AI in everyday life and describe its three domains: NLP, Computer Vision, and Data Statistics.",
            "Explain the 6-step AI Project Cycle and apply it using the interactive Project Sandbox.",
            "Fill in a 4Ws Problem Canvas to scope a real-world AI problem.",
            "Distinguish between rule-based and learning-based AI models.",
            "Define TP, FP, TN, FN and explain why evaluation matters.",
            "Identify types of AI bias and describe ethical considerations of AI deployment.",
          ]}
        />

        {/* ════════════════════════════════════════════════════════
            LESSON 1: What is AI? The Three Realms
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="What is AI? The Three Realms" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="What is Artificial Intelligence?" tag="Definition">
            <p>
              <strong>Artificial Intelligence (AI)</strong> is the ability of a computer system to perform tasks
              that normally require human intelligence — such as understanding language, recognising images,
              making decisions, and predicting future events.
            </p>
            <p className="mt-2">
              AI is not magic. At its core, AI is <strong>pattern recognition at scale</strong> — a system
              that finds regularities in data and uses them to make useful predictions or decisions.
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {[
                { label: "Human task",  ex: "Reading an X-ray"       },
                { label: "AI does it",  ex: "Detects cancer in 0.1s"  },
                { label: "How?",        ex: "Trained on 100,000 scans"},
              ].map(({ label, ex }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="text-xs text-gray-800 font-medium mt-1">{ex}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.2" title="A Brief History of AI" tag="Key Concept">
            <div className="space-y-2">
              {[
                { year: "1950", event: "Alan Turing proposes the 'Turing Test' — can a machine think?",                          color: "bg-gray-100 text-gray-600" },
                { year: "1956", event: "The term 'Artificial Intelligence' is coined at Dartmouth College.",                      color: "bg-gray-100 text-gray-600" },
                { year: "1997", event: "IBM Deep Blue defeats world chess champion Garry Kasparov.",                               color: "bg-gray-100 text-gray-600" },
                { year: "2012", event: "Deep learning revolution — AlexNet wins ImageNet by a huge margin.",                      color: "bg-gray-100 text-gray-600" },
                { year: "2016", event: "AlphaGo defeats Go world champion — a game considered too complex for computers.",        color: "bg-gray-100 text-gray-600" },
                { year: "2022", event: "ChatGPT launches — 100 million users in 2 months. Generative AI enters the mainstream.", color: "bg-gray-100 text-gray-600" },
              ].map(({ year, event, color }) => (
                <div key={year} className="flex items-start gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${color}`}>{year}</span>
                  <p className="text-xs text-gray-700 leading-relaxed">{event}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.3" title="The Three Domains of AI" tag="Key Concept">
            <p>
              The CBSE AI curriculum organises AI into three intersecting domains. Real-world AI systems
              often combine all three.
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {[
                { domain: "NLP",             color: "bg-gray-50 border-gray-200 text-gray-800", desc: "Understand & generate human language"   },
                { domain: "Computer Vision", color: "bg-gray-50 border-gray-200 text-gray-800", desc: "Interpret images, video & spatial data" },
                { domain: "Data Statistics", color: "bg-gray-50 border-gray-200 text-gray-800", desc: "Find patterns in numbers & predictions" },
              ].map(({ domain, color, desc }) => (
                <div key={domain} className={`rounded-xl border p-3 ${color}`}>
                  <p className="font-bold text-xs">{domain}</p>
                  <p className="text-[11px] mt-1 opacity-80">{desc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Animation: interactive 3-realm explorer */}
          <AnimFrame id="anim-ai-domains" title="Interactive: The Three Domains of AI" description="Click a domain to explore it · auto-cycles every 4 seconds">
            <AnimAIDomains />
          </AnimFrame>

          {/* ── Phase 1 NEW: AI Domains mini-games ── */}
          <AIDomainsGames />

          <MicroCheck
            question="Netflix recommending movies uses which AI domain?"
            options={["Natural Language Processing", "Computer Vision", "Data Statistics & Pattern Recognition", "Robotics"]}
            correct={2}
            explanation="Netflix analyses your watch history, ratings, viewing times, and compares them with similar users — all numerical pattern analysis. This is Data Statistics-based AI."
          />

          <MicroCheck
            question="Google Translate converting Hindi to English uses which AI domain?"
            options={["Data Statistics", "Computer Vision", "Natural Language Processing", "Sensor Fusion"]}
            correct={2}
            explanation="Translation requires understanding the structure, meaning, and grammar of human language — which is exactly what NLP (Natural Language Processing) does."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 2: The AI Project Cycle
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="The AI Project Cycle" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="The 6-Step AI Project Cycle" tag="Key Concept">
            <p>
              Every AI project — from a classroom experiment to a hospital diagnostic system — follows the
              same iterative cycle. The key word is <strong>iterative</strong>: you can always loop back
              to an earlier step when new information arrives.
            </p>
            <div className="mt-3 space-y-1.5">
              {[
                ["01 Problem Scoping",    "Define the problem using the 4Ws canvas. Set clear goals."],
                ["02 Data Acquisition",  "Gather the right data from reliable sources."],
                ["03 Data Exploration",  "Visualise and understand patterns in your data."],
                ["04 Modeling",          "Build the AI — rule-based or learning-based."],
                ["05 Evaluation",        "Test accuracy using TP, FP, TN, FN metrics."],
                ["06 Deployment",        "Release to real users. Monitor continuously."],
              ].map(([step, desc]) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-gray-400 w-28 shrink-0 pt-0.5">{step}</span>
                  <span className="text-xs text-gray-700">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Animation: 6-step cycle */}
          <AnimFrame id="anim-project-cycle" title="Interactive: The AI Project Cycle" description="Click any step to learn more · auto-cycles · click to pause">
            <AnimProjectCycle />
          </AnimFrame>

          <ConceptCard number="2.2" title="Problem Scoping: The 4Ws Canvas" tag="Key Concept">
            <p>
              Before any data collection or model building, you must deeply understand the problem.
              The <strong>4Ws Problem Canvas</strong> is a structured tool for this.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                { w: "WHO",   q: "Who is affected by this problem?",    ex: "Patients in rural areas without hospital access" },
                { w: "WHAT",  q: "What exactly is the problem?",        ex: "Late diagnosis of diseases due to lack of doctors" },
                { w: "WHERE", q: "Where does this problem occur?",      ex: "Districts with fewer than 1 doctor per 1,000 people" },
                { w: "WHEN",  q: "When and how often does it occur?",   ex: "Especially during monsoon when travel is difficult" },
              ].map(({ w, q, ex }) => (
                <div key={w} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <p className="text-sm font-bold text-violet-600 mb-1">{w}</p>
                  <p className="text-xs font-semibold text-gray-800">{q}</p>
                  <p className="text-xs text-gray-500 mt-1 italic">{ex}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* ── Phase 1 NEW: interactive 4Ws canvas ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 border border-violet-200 text-xs font-bold text-violet-700">
                Interactive Activity
              </span>
              <span className="text-xs text-gray-400">Fill in your own 4Ws for any project theme</span>
            </div>
            <Canvas4Ws />
          </div>

          <ConceptCard number="2.3" title="Modeling: Rule-Based vs. Learning-Based" tag="Key Concept">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2 font-bold text-gray-600 border border-gray-200">Aspect</th>
                    <th className="text-left px-3 py-2 font-bold text-gray-700 border border-gray-200">Rule-Based</th>
                    <th className="text-left px-3 py-2 font-bold text-gray-700 border border-gray-200">Learning-Based</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["How it works",    "Humans write explicit IF-THEN rules",              "AI discovers patterns from labelled data"],
                    ["Needs data?",     "No — just expert knowledge",                       "Yes — large datasets required"],
                    ["Flexibility",     "Brittle — fails on new scenarios",                 "Adapts to new data naturally"],
                    ["Explainability",  "Fully explainable",                                "Often a 'black box'"],
                    ["Example",         "Email spam filter based on keywords",              "Gmail's neural spam classifier"],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="border border-gray-200">
                      <td className="px-3 py-2 font-semibold text-gray-700">{a}</td>
                      <td className="px-3 py-2 text-gray-600">{b}</td>
                      <td className="px-3 py-2 text-gray-600">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ConceptCard>

          {/* Animation: neural network signal flow */}
          <AnimFrame id="anim-model-learning" title="Interactive: How a Learning-Based Model Processes Data" description="Watch signals propagate from raw features through hidden layers to a final prediction">
            <AnimModelLearning />
          </AnimFrame>

          <MicroCheck
            question="In a learning-based AI model, what is the main role of hidden layers?"
            options={["Store the original training data unchanged", "Detect patterns and combine features into complex representations", "Output the final class probabilities directly", "Clean and normalise the raw input data"]}
            correct={1}
            explanation="Hidden layers are where learning happens. Earlier layers detect simple patterns (e.g., whether a single feature exceeds a threshold), while deeper layers combine those into increasingly complex features — enabling the output layer to make an accurate prediction."
          />

          <ConceptCard number="2.4" title="Evaluation: The Confusion Matrix" tag="Key Concept">
            <p>
              After training, you must test your model honestly. The <strong>Confusion Matrix</strong>
              breaks down results into four categories:
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { term: "True Positive (TP)",  color: "bg-gray-50 border-gray-200 text-gray-700",  desc: "Model predicted POSITIVE. Actual label is POSITIVE. Correct." },
                { term: "False Positive (FP)", color: "bg-gray-50 border-gray-200 text-gray-700",  desc: "Model predicted POSITIVE. Actual label is NEGATIVE. False alarm." },
                { term: "False Negative (FN)", color: "bg-gray-50 border-gray-200 text-gray-700",  desc: "Model predicted NEGATIVE. Actual label is POSITIVE. Missed it — most dangerous in medicine!" },
                { term: "True Negative (TN)",  color: "bg-gray-50 border-gray-200 text-gray-700",  desc: "Model predicted NEGATIVE. Actual label is NEGATIVE. Correct." },
              ].map(({ term, color, desc }) => (
                <div key={term} className={`rounded-xl border p-3 ${color}`}>
                  <p className="font-bold text-xs">{term}</p>
                  <p className="text-[11px] mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* ── Phase 1 NEW: hands-on confusion matrix classifier ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-xs font-bold text-amber-700">
                Hands-On Activity
              </span>
              <span className="text-xs text-gray-400">Classify 12 real-world scenarios as TP / FP / TN / FN</span>
            </div>
            <ConfusionMatrixClassifier />
          </div>

          {/* THE WOW FEATURE: AI Project Sandbox */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700">
                Interactive Activity
              </span>
              <span className="text-xs text-gray-400">Mirrors the CBSE AI Project Cycle Activity</span>
            </div>
            <AnimProjectSandbox />
          </div>

          <MicroCheck
            question="What is the FIRST step of the AI Project Cycle?"
            options={["Data Acquisition", "Deployment", "Problem Scoping", "Modeling"]}
            correct={2}
            explanation="Problem Scoping always comes first. If you start collecting data before scoping the problem, you'll likely collect the wrong data."
          />

          <MicroCheck
            question="An AI model predicts that a patient does NOT have cancer, but they actually do. This is a…"
            options={["True Positive", "False Positive", "True Negative", "False Negative"]}
            correct={3}
            explanation="The model predicted NEGATIVE (no cancer) but reality was POSITIVE (has cancer). This is a False Negative — and in healthcare, it's the most dangerous type of error."
          />

          <MicroCheck
            question="Which type of model learns from thousands of labelled examples without humans writing explicit rules?"
            options={["Rule-based model", "Decision flowchart", "Learning-based (ML) model", "Expert system"]}
            correct={2}
            explanation="A learning-based (machine learning) model automatically discovers patterns in training data. Humans don't write the rules — the model learns them."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 3: AI Ethics, Bias & Access
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="AI Ethics, Bias & Access" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="What is AI Ethics?" tag="Definition">
            <p>
              <strong>AI Ethics</strong> is the field concerned with the moral principles and social
              implications of AI systems — ensuring they are fair, transparent, accountable, and beneficial
              to all of humanity, not just a privileged few.
            </p>
            <p className="mt-2">
              Ethics in AI is not optional — it must be considered from the very first step of Problem
              Scoping, not bolted on at deployment.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {[
                ["Fairness",        "AI outcomes should not discriminate based on race, gender, age, or region."],
                ["Transparency",    "People affected by AI decisions should be able to understand and challenge them."],
                ["Accountability",  "Someone must be responsible when AI causes harm."],
                ["Privacy",         "AI should not collect or misuse personal data without consent."],
              ].map(([p, d]) => (
                <div key={p} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-800">{p}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="3.2" title="AI Bias: When AI Learns Our Prejudices" tag="Warning">
            <p>
              AI bias occurs when a model produces systematically unfair or incorrect results for
              certain groups. Bias almost always originates in the <strong>training data</strong>.
            </p>
            <div className="mt-3 space-y-2">
              {[
                { type: "Historical Bias",     ex: "A hiring AI trained on past decisions (mostly male hires) continues to prefer male candidates." },
                { type: "Representation Bias", ex: "A facial recognition system trained mostly on light-skinned faces performs poorly on dark-skinned faces." },
                { type: "Measurement Bias",    ex: "Using 'zip code' as a loan-risk feature indirectly discriminates by neighbourhood (which correlates with race)." },
              ].map(({ type, ex }) => (
                <div key={type} className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold text-xs shrink-0 mt-0.5">!</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{type}</p>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{ex}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="3.3" title="AI Access: The Digital Divide" tag="Key Concept">
            <p>
              AI benefits are not equally distributed. The <strong>digital divide</strong> means that
              wealthier countries, urban areas, and educated populations gain disproportionately from AI,
              while others are left behind — or actively harmed.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
                <p className="text-xs font-bold text-violet-700 mb-1.5">Who benefits most?</p>
                <ul className="space-y-1">
                  {["Tech-savvy urban users","English-speaking populations","People with fast internet","Data-rich organisations"].map(i => (
                    <li key={i} className="text-[11px] text-violet-800 flex items-start gap-1.5"><span>+</span>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-xs font-bold text-gray-600 mb-1.5">Who is left behind?</p>
                <ul className="space-y-1">
                  {["Rural communities with low connectivity","Non-English speakers","Older adults unfamiliar with technology","Low-income populations"].map(i => (
                    <li key={i} className="text-[11px] text-gray-600 flex items-start gap-1.5"><span>−</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="3.4" title="Advantages and Disadvantages of AI" tag="Remember">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Advantages</p>
                <ul className="space-y-1.5">
                  {[
                    "Solves problems at superhuman speed and scale",
                    "Works 24/7 without fatigue or emotional bias",
                    "Enables new medical diagnoses and scientific discoveries",
                    "Increases accessibility (e.g., real-time translation for deaf users)",
                    "Automates dangerous or repetitive work",
                  ].map(a => <li key={a} className="text-xs text-gray-700 flex items-start gap-1.5"><span className="text-violet-500 shrink-0 mt-0.5">+</span>{a}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Disadvantages</p>
                <ul className="space-y-1.5">
                  {[
                    "Can amplify human biases at massive scale",
                    "Creates job displacement in certain sectors",
                    "Lacks common sense and emotional intelligence",
                    "Can be weaponised for surveillance or deepfakes",
                    "Opaque 'black box' models are hard to audit",
                  ].map(d => <li key={d} className="text-xs text-gray-700 flex items-start gap-1.5"><span className="text-gray-400 shrink-0 mt-0.5">−</span>{d}</li>)}
                </ul>
              </div>
            </div>
          </ConceptCard>

          {/* Ethics Scenario Roleplay */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-bold text-violet-700">
                Roleplay Activity
              </span>
              <span className="text-xs text-gray-400">Inspired by the CBSE Balloon Debate & Ethics Awareness activities</span>
            </div>
            <AnimEthicsScenario />
          </div>

          <MicroCheck
            question="An AI trained on historical medical data mostly from male patients performs worse for female patients. What is the primary cause?"
            options={["The algorithm is faulty", "Representation Bias — females are underrepresented in training data", "The hardware is too slow", "The evaluation metrics are wrong"]}
            correct={1}
            explanation="Representation Bias occurs when certain groups are underrepresented in training data. The model learns mostly from male patient data and therefore performs worse for female patients."
          />

          <MicroCheck
            question="Which principle of AI ethics means people should be able to understand and challenge AI decisions?"
            options={["Fairness", "Privacy", "Transparency", "Efficiency"]}
            correct={2}
            explanation="Transparency means AI systems (especially those making important decisions about loans, hiring, or healthcare) should be explainable and open to challenge by those affected."
          />
        </section>

        {/* ── Exit Quiz ────────────────────────────────────────────────────────── */}
        <section>
          <ExitQuiz
            moduleName="Unit 1: AI Reflection, Project Cycle & Ethics"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
