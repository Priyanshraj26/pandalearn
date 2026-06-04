import { Brain, Shield, Scale, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimEthicalFrameworks from "./_components/AnimEthicalFrameworks"
import AnimBioethicsCase from "./_components/AnimBioethicsCase"
import LessonProgressStrip from "./_components/LessonProgressStrip"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "What is the purpose of defining the problem statement during the Problem Scoping stage in an AI project cycle?",
    options: ["To collect data", "To understand the aim and objective of the project", "To train the model", "To process data"],
    correct: 1,
    explanation: "Problem Scoping is about clearly understanding what you want to solve. Without a clear problem statement, data collection and modeling will be directionless.",
  },
  {
    question: "In how many domains can AI models be broadly categorised based on the type of data fed into them?",
    options: ["Two domains", "Four domains", "Three domains", "Five domains"],
    correct: 2,
    explanation: "AI models are broadly categorised into three domains: Statistical Data, Computer Vision, and Natural Language Processing — based on the type of data they process.",
  },
  {
    question: "What do frameworks provide in the context of problem-solving?",
    options: ["Random solutions", "Step-by-step guidance", "Legal advice", "Ethical justifications"],
    correct: 1,
    explanation: "Frameworks provide structured, step-by-step guidance for approaching and solving complex problems systematically.",
  },
  {
    question: "How are Ethical Frameworks for AI categorised?",
    options: ["Into legal and illegal frameworks", "Into sector-based and value-based frameworks", "Into historical and contemporary frameworks", "Into theoretical and practical frameworks"],
    correct: 1,
    explanation: "Ethical frameworks for AI are categorised into sector-based (industry-specific like healthcare, finance) and value-based (principle-driven like utility, rights, virtue).",
  },
  {
    question: "What is the central focus of virtue-based value-based frameworks?",
    options: ["Maximising utility", "Protecting human rights", "Aligning actions with ethical principles and beliefs", "Ensuring compliance with legal regulations"],
    correct: 2,
    explanation: "Virtue-based frameworks focus on the moral character of the decision-maker and whether actions align with ethical principles like honesty, fairness, and integrity.",
  },
  {
    question: "Which best describes rights-based value-based frameworks?",
    options: [
      "Prioritising human rights and dignity, valuing human life over other considerations",
      "Evaluating actions based on maximising overall good and minimising harm",
      "Centering on the character of the decision-maker",
      "Focusing on achieving outcomes that offer the greatest benefit",
    ],
    correct: 0,
    explanation: "Rights-based frameworks prioritise fundamental human rights and dignity above all else — no AI outcome can justify violating these rights.",
  },
  {
    question: "What is the primary domain of application for Bioethics?",
    options: ["Agriculture", "Healthcare and life sciences", "Information technology", "Environmental conservation"],
    correct: 1,
    explanation: "Bioethics originated in healthcare and life sciences, providing ethical principles (autonomy, non-maleficence, beneficence, justice) for medical and biological decisions.",
  },
  {
    question: "Which bioethics principle states that harm must be avoided at all costs?",
    options: ["Autonomy", "Non-maleficence (Do Not Harm)", "Beneficence", "Justice"],
    correct: 1,
    explanation: "Non-maleficence (Do Not Harm) is the principle that harm to anyone must be avoided at all costs. If no choice is available, the path of least harm must be chosen.",
  },
  {
    question: "What is the main goal of Computer Vision projects?",
    options: [
      "Translating audio data into visual descriptions",
      "Converting digital data into analogue signals",
      "Teaching machines to understand textual information",
      "Converting digital visual data into computer-readable language",
    ],
    correct: 3,
    explanation: "Computer Vision converts digital visual data (images, video) into a format that computers can understand and process — enabling object detection, face recognition, etc.",
  },
  {
    question: "The 'Justice' principle of bioethics requires that AI benefits and burdens are distributed how?",
    options: [
      "Only to those who can afford it",
      "Fairly across all people irrespective of background",
      "Based on social status",
      "Only within the healthcare sector",
    ],
    correct: 1,
    explanation: "The Justice principle requires that all benefits and burdens be distributed fairly and equitably across all people, regardless of race, gender, or socioeconomic status.",
  },
]

// ── CBSE Syllabus accordion ────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Outline the six stages of the AI Project Cycle.",
    "Elucidate the AI domains and their applications.",
    "Describe what are frameworks and ethical frameworks.",
    "Classify ethical frameworks based on sectors and value addition.",
    "Explore the bioethical framework and its principles in detail.",
    "Practice the application of an ethical framework for AI.",
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
            <p className="text-sm font-bold text-gray-900 mt-0.5">15h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Practical Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">25h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Max Marks</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">8M</p>
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
      title: "AI Project Cycle & Domains",
      time: "~30 min",
      topics: ["6-Step Cycle", "3 AI Domains", "Real Examples"],
      feature: "Domain application explorer",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "Ethical Frameworks for AI",
      time: "~60 min",
      topics: ["Sector-Based", "Value-Based", "Case Analysis"],
      feature: "Interactive framework explorer",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "Bioethics & AI Case Study",
      time: "~45 min",
      topics: ["4 Principles", "Healthcare AI", "Bias in Data"],
      feature: "Bioethics case study simulator",
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
          <Scale size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 1 of 6
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~40 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 8 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Revisiting AI Project Cycle & Ethical Frameworks
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Three lessons: revisit the AI Project Cycle and three AI domains,
            explore the world of ethical frameworks (sector-based and value-based),
            and apply bioethics principles to a real AI case study.
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
            "Outline the six stages of the AI Project Cycle and explain each stage.",
            "Describe the three domains of AI (Statistical Data, Computer Vision, NLP) and their applications.",
            "Explain the need for ethical frameworks in AI development.",
            "Classify ethical frameworks into sector-based and value-based categories.",
            "Describe the four principles of bioethics: Autonomy, Non-maleficence, Beneficence, and Justice.",
            "Apply bioethics principles to analyse an AI case study and identify potential harms.",
          ]}
        />

        {/* ════════════════════════════════════════════════════════
            LESSON 1: AI Project Cycle & Domains
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="AI Project Cycle & Domains" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="The AI Project Cycle — Revisited" tag="Key Concept">
            <p>
              The AI Project Cycle is the systematic framework used to develop any AI project.
              It consists of <strong>six stages</strong> that work in a cyclical, iterative manner:
            </p>
            <div className="mt-3 space-y-1.5">
              {[
                ["01 Problem Scoping",   "Define the problem using the 4Ws canvas. Set clear goals and objectives."],
                ["02 Data Acquisition",  "Collect relevant data from reliable and authentic sources."],
                ["03 Data Exploration",  "Visualise data through graphs, charts, and maps to find patterns."],
                ["04 Modeling",          "Research and select appropriate AI models for the problem."],
                ["05 Evaluation",        "Test the model on new data to check accuracy and efficiency."],
                ["06 Deployment",        "Deploy the model for real-world use with continuous monitoring."],
              ].map(([step, desc]) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-gray-400 w-28 shrink-0 pt-0.5">{step}</span>
                  <span className="text-xs text-gray-700">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.2" title="The Three Domains of AI" tag="Key Concept">
            <p>
              Based on the type of data an AI model processes, AI can be broadly categorised
              into three domains:
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {[
                { domain: "Statistical Data", desc: "Collects, maintains, and derives meaning from numerical datasets. E.g., price comparison websites, recommendation systems.", color: "bg-blue-50 border-blue-200 text-blue-800" },
                { domain: "Computer Vision",  desc: "Converts digital visual data into computer-readable language. E.g., face recognition, self-driving cars, medical imaging.", color: "bg-green-50 border-green-200 text-green-800" },
                { domain: "NLP",              desc: "Deals with interaction between computers and humans using natural language. E.g., Google Translate, voice assistants.", color: "bg-purple-50 border-purple-200 text-purple-800" },
              ].map(({ domain, desc, color }) => (
                <div key={domain} className={`rounded-xl border p-3 ${color}`}>
                  <p className="font-bold text-xs">{domain}</p>
                  <p className="text-[11px] mt-1 opacity-80">{desc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <MicroCheck
            question="In Statistical Data domain, what is the primary function of the system in relation to data?"
            options={["Generating large datasets", "Analysing data to extract insights", "Converting data into images", "Distributing data across networks"]}
            correct={1}
            explanation="Statistical Data systems collect numerous data, maintain datasets, and derive meaning/sense out of them to help make informed decisions."
          />

          <MicroCheck
            question="What is the primary focus of NLP?"
            options={["Analysing computer languages", "Interacting between computers and humans using artificial language", "Dealing with the interaction between computers and humans using natural language", "Enhancing human-to-human communication"]}
            correct={2}
            explanation="NLP (Natural Language Processing) deals specifically with the interaction between computers and humans using natural (human) language — not artificial or programming languages."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 2: Ethical Frameworks for AI
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="Ethical Frameworks for AI" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="What Are Frameworks?" tag="Definition">
            <p>
              A <strong>framework</strong> is a structured approach that provides step-by-step
              guidance for problem-solving. In the context of AI, <strong>ethical frameworks</strong> help
              developers, organisations, and policymakers make morally sound decisions when building
              and deploying AI systems.
            </p>
            <p className="mt-2">
              Ethical frameworks are essential because AI systems can have unintended consequences —
              bias, discrimination, privacy violations — that require principled guidance to prevent.
            </p>
          </ConceptCard>

          <ConceptCard number="2.2" title="Types of Ethical Frameworks" tag="Key Concept">
            <p>Ethical frameworks for AI are categorised into two main types:</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1.5">Sector-Based Frameworks</p>
                <p className="text-[11px] text-blue-900/70">Designed for specific industries — healthcare, finance, education, defence. Address the unique ethical challenges of each sector.</p>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
                <p className="text-xs font-bold text-violet-700 mb-1.5">Value-Based Frameworks</p>
                <p className="text-[11px] text-violet-900/70">Grounded in fundamental ethical principles — utility-based (greatest good), rights-based (human dignity), virtue-based (moral character).</p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="2.3" title="Value-Based Frameworks in Detail" tag="Key Concept">
            <div className="space-y-3">
              {[
                { type: "Utility-Based", desc: "Actions are judged by outcomes — focus on maximising overall good and minimising harm for the greatest number of people.", icon: "⚖️" },
                { type: "Rights-Based", desc: "Prioritises human rights and dignity. No AI outcome can justify violating fundamental rights — values human life above efficiency.", icon: "🛡️" },
                { type: "Virtue-Based", desc: "Centres on the moral character of the decision-maker. Actions should align with ethical principles and personal or societal virtues.", icon: "✨" },
              ].map(({ type, desc, icon }) => (
                <div key={type} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{type}</p>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Interactive: Ethical Frameworks Explorer */}
          <AnimFrame id="anim-ethical-frameworks" title="Interactive: Ethical Frameworks Explorer" description="Compare sector-based vs value-based frameworks · Apply them to a real AI case study">
            <AnimEthicalFrameworks />
          </AnimFrame>

          <MicroCheck
            question="How are Ethical Frameworks for AI categorised?"
            options={["Into legal and illegal frameworks", "Into sector-based and value-based frameworks", "Into historical and contemporary frameworks", "Into theoretical and practical frameworks"]}
            correct={1}
            explanation="Ethical frameworks for AI are divided into sector-based (tailored for specific industries) and value-based (grounded in universal ethical principles like utility, rights, and virtue)."
          />

          <MicroCheck
            question="What is the central focus of virtue-based frameworks?"
            options={["Maximising utility", "Protecting human rights", "Aligning actions with ethical principles and beliefs", "Ensuring compliance with legal regulations"]}
            correct={2}
            explanation="Virtue-based frameworks focus on the moral character of the decision-maker — whether their actions align with ethical virtues like honesty, fairness, and integrity."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 3: Bioethics & Case Study
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Bioethics & AI Case Study" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="What is Bioethics?" tag="Definition">
            <p>
              <strong>Bioethics</strong> is a branch of ethics focused on healthcare and life sciences.
              It provides a structured framework of four principles that guide moral decision-making
              in medical and biological contexts — and increasingly in AI applications that affect human health and wellbeing.
            </p>
          </ConceptCard>

          <ConceptCard number="3.2" title="The Four Principles of Bioethics" tag="Key Concept">
            <div className="mt-2 grid sm:grid-cols-2 gap-3">
              {[
                { principle: "Autonomy", desc: "Respect individual choice and informed consent. Every person has the right to make their own decisions about their health and data.", color: "bg-blue-50 border-blue-200 text-blue-700" },
                { principle: "Non-maleficence", desc: "Do not harm. If no harmless option exists, always choose the path of least harm. AI training data must equitably reduce harm for ALL groups.", color: "bg-rose-50 border-rose-200 text-rose-700" },
                { principle: "Beneficence", desc: "Go beyond avoiding harm — actively provide maximum benefit. AI solutions should be held to clinical practice standards, not just tech ethics.", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                { principle: "Justice", desc: "Distribute benefits and burdens fairly. Solutions must be aware of social determinants and actively work against discrimination.", color: "bg-violet-50 border-violet-200 text-violet-700" },
              ].map(({ principle, desc, color }) => (
                <div key={principle} className={`rounded-xl border p-3 ${color}`}>
                  <p className="font-bold text-xs">{principle}</p>
                  <p className="text-[11px] mt-1 leading-snug opacity-80">{desc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Interactive: Bioethics Case Study */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 border border-violet-200 text-xs font-bold text-violet-700">
                Interactive Activity
              </span>
              <span className="text-xs text-gray-400">Apply all 4 bioethics principles to a real AI case</span>
            </div>
            <AnimBioethicsCase />
          </div>

          <ConceptCard number="3.3" title="Factors Influencing Ethical Decisions" tag="Remember">
            <p>Our ethical decisions are influenced by many factors, often unconsciously:</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {[
                ["Personal Values", "Our upbringing, culture, and life experiences shape our moral compass."],
                ["Social Norms", "What society considers acceptable influences our choices and judgement."],
                ["Legal Requirements", "Laws and regulations set boundaries for acceptable behaviour."],
                ["Professional Codes", "Industry-specific ethical codes guide professional conduct."],
                ["Empathy & Compassion", "Our ability to understand others' feelings affects ethical reasoning."],
                ["Cognitive Biases", "Unconscious biases can distort our decision-making without awareness."],
              ].map(([factor, desc]) => (
                <div key={factor} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-800">{factor}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <MicroCheck
            question="What is the primary domain of application for Bioethics?"
            options={["Agriculture", "Healthcare and life sciences", "Information technology", "Environmental conservation"]}
            correct={1}
            explanation="Bioethics originated in and is primarily applied to healthcare and life sciences, providing ethical principles for medical decisions — now increasingly relevant to AI in healthcare."
          />

          <MicroCheck
            question="Which bioethics principle requires that ALL benefits and burdens be distributed fairly, irrespective of background?"
            options={["Autonomy", "Non-maleficence", "Beneficence", "Justice"]}
            correct={3}
            explanation="Justice requires that benefits and burdens of AI be distributed fairly across all people, regardless of race, gender, or socioeconomic status. It requires awareness of social structures like racism and sexism."
          />
        </section>

        {/* ── Exit Quiz ────────────────────────────────────────────────────────── */}
        <section>
          <ExitQuiz
            moduleName="Unit 1: Revisiting AI Project Cycle & Ethical Frameworks"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
