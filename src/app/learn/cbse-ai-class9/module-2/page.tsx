import { Database, BarChart3, Shield, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimDataTypes from "./_components/AnimDataTypes"
import AnimDataCleaning from "./_components/AnimDataCleaning"
import AnimChartSelector from "./_components/AnimChartSelector"
import AnimDataPrivacy from "./_components/AnimDataPrivacy"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "Which of the following is an example of STRUCTURED data?",
    options: [
      "A voice recording of a lecture",
      "A photo of a hospital patient",
      "A student's marks in a spreadsheet",
      "A WhatsApp message thread",
    ],
    correct: 2,
    explanation: "Structured data has a fixed schema — rows and columns. A marks spreadsheet has clearly defined columns (Name, Subject, Marks). Voice recordings and photos are unstructured; they have no fixed format.",
  },
  {
    question: "An AI company uses survey responses to train their model themselves. This data is best described as…",
    options: [
      "Secondary structured data",
      "Primary unstructured data",
      "Primary structured data",
      "Secondary unstructured data",
    ],
    correct: 2,
    explanation: "The company collected the data directly (primary) through a structured survey form (structured — fixed questions and answer options).",
  },
  {
    question: "Which of the following is the BEST definition of an outlier in a dataset?",
    options: [
      "A row where all values are null",
      "A row that is duplicated exactly",
      "A value that is impossibly far from the expected range",
      "A column that has too many categories",
    ],
    correct: 2,
    explanation: "An outlier is a data point that deviates significantly from other observations — like a student studying 200 hours in a week, or an age of 999. They can be data entry errors or genuine anomalies.",
  },
  {
    question: "A researcher is comparing the test scores of 5 students. Which chart type is MOST appropriate?",
    options: ["Line chart", "Pie chart", "Bar chart", "Histogram"],
    correct: 2,
    explanation: "A Bar Chart is ideal for comparing distinct categories (here: 5 students). Each bar represents one student's score, making comparisons clear and direct.",
  },
  {
    question: "Which chart type would you use to show whether more study hours lead to higher scores?",
    options: ["Pie chart", "Bar chart", "Scatter plot", "Histogram"],
    correct: 2,
    explanation: "A Scatter Plot places two numerical variables on x and y axes — study hours on x and score on y. The pattern of dots reveals the correlation (relationship) between the two variables.",
  },
  {
    question: "What is the purpose of a Histogram?",
    options: [
      "To compare sales of different products",
      "To show parts of a whole as percentages",
      "To show a trend over time",
      "To show how frequently values fall within ranges (bins)",
    ],
    correct: 3,
    explanation: "A Histogram groups continuous data into intervals (bins) and counts how many values fall in each bin. It reveals the distribution shape — is data concentrated around a central value, or spread out?",
  },
  {
    question: "In data cleaning, 'imputation' means…",
    options: [
      "Removing all duplicate rows",
      "Replacing missing values with estimated values (e.g., mean)",
      "Deleting outlier rows",
      "Sorting data alphabetically",
    ],
    correct: 1,
    explanation: "Imputation is the process of filling in missing values with an estimated substitute — commonly the mean, median, or mode of the column. It lets you keep the row instead of discarding it.",
  },
  {
    question: "India's Personal Data Protection Bill (PDPB) gives citizens the right to…",
    options: [
      "Use any app without sharing any data",
      "Access, correct, and erase their personal data from platforms",
      "Sue any company that uses AI",
      "Prevent companies from using any analytics",
    ],
    correct: 1,
    explanation: "PDPB grants data principals (citizens) key rights: Right to Access (know what data a company holds), Right to Correction, Right to Erasure ('Right to be Forgotten'), and Right to Grievance Redressal.",
  },
  {
    question: "Which of the following represents a data QUALITY issue called 'duplicate'?",
    options: [
      "A student's score is recorded as -20",
      "A student's age field is empty",
      "The same student's row appears twice in the dataset",
      "A student's city is 'Mumbai' instead of 'Bombay'",
    ],
    correct: 2,
    explanation: "A duplicate is when the exact same record (or a near-identical one) appears more than once in a dataset. It inflates the data and causes the model to over-learn from those examples.",
  },
  {
    question: "Which statement about data literacy is most accurate?",
    options: [
      "Data literacy means you can write Python programs",
      "Data literacy means understanding, reading, and interpreting data to make informed decisions",
      "Data literacy only matters for data scientists",
      "Data literacy means memorising statistics formulas",
    ],
    correct: 1,
    explanation: "Data literacy is the ability to read, understand, analyse, and communicate with data. It is a critical 21st-century skill for everyone — not just programmers — because data shapes decisions in health, education, government, and business.",
  },
]

// ── CBSE accordion ────────────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Define data literacy and recognise its importance in informed decision-making.",
    "Apply the Data Literacy Process Framework to analyse and interpret data.",
    "Differentiate between Data Privacy and Data Security.",
    "Identify potential risks associated with data breaches and unauthorised access.",
    "Classify different types of data (structured vs unstructured, primary vs secondary).",
    "Determine best methods to acquire, process, and interpret data.",
    "Use various types of graphs to visualise acquired data.",
  ]
  return (
    <details className="group rounded-2xl border border-orange-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-orange-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-orange-500 shrink-0" />
        <span className="text-xs font-bold text-orange-700 flex-1">CBSE 417 · Unit 2 — Official Learning Outcomes</span>
        <ChevronDown size={14} className="text-orange-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-5 py-4 bg-white space-y-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Learning Outcomes</p>
          <ul className="space-y-1.5">
            {outcomes.map((o, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-orange-100 text-orange-600 text-[9px] font-bold flex items-center justify-center mt-0.5">
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
            <p className="text-sm font-bold text-gray-900 mt-0.5">22h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Practical Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">28h</p>
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
      accent: "#0891B2", bg: "#ECFEFF", textColor: "text-cyan-700",
      title: "Basics of Data Literacy",
      time: "~30 min",
      topics: ["What is Data?", "Structured vs Unstructured", "Primary vs Secondary"],
      feature: "Interactive data taxonomy explorer",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#D97706", bg: "#FFFBEB", textColor: "text-amber-700",
      title: "Acquiring, Processing & Interpreting Data",
      time: "~60 min",
      topics: ["Data Acquisition", "Data Cleaning", "Outliers & Missing Values", "Data Interpretation"],
      feature: "Dataset Cleaner — WOW interactive activity",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#059669", bg: "#ECFDF5", textColor: "text-emerald-700",
      title: "Data Visualisation & Privacy",
      time: "~60 min",
      topics: ["Bar · Line · Pie · Scatter · Histogram", "Data Privacy", "PDPB India", "Cyber Security"],
      feature: "Chart Selector + Privacy Simulator",
    },
  ]

  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Module Roadmap</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {lessons.map(l => (
          <a key={l.n} href={l.href}
            className="block rounded-2xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ borderColor: l.accent + "44", background: l.bg }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center font-sora font-bold text-white text-xs shrink-0"
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

export default function Module2Page() {
  return (
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Database size={200} className="absolute -right-10 -top-8 text-cyan-500 opacity-[0.07]" />
          <BarChart3 size={72} className="absolute right-44 top-6 text-orange-400 opacity-[0.06] rotate-6" />
          <Shield size={60} className="absolute right-28 bottom-4 text-emerald-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 2 of 5
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~50 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 10 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Data Literacy
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Data is the fuel of AI. In this module you&apos;ll learn to read, collect, clean, and visualise data —
            then explore the critical questions around data privacy and security that shape what AI systems can and
            cannot ethically build.
          </p>
        </div>
      </div>

      {/* ── CBSE accordion ────────────────────────────────────────────────────── */}
      <div className="mt-6">
        <CBSEAccordion />
      </div>

      {/* ── Module body ───────────────────────────────────────────────────────── */}
      <div className="py-10 space-y-16">

        <LessonMap />

        <ObjectivesCard
          objectives={[
            "Explain what data literacy means and why it matters in the age of AI.",
            "Classify data as structured or unstructured, and primary or secondary.",
            "Identify missing values, outliers, and duplicates in a real dataset and apply fixes.",
            "Choose the correct chart type for a given data story (bar, line, pie, scatter, histogram).",
            "Describe data privacy risks and explain best practices for protecting personal data.",
            "Summarise key rights provided by India's Personal Data Protection Bill (PDPB).",
          ]}
        />

        {/* ════════════════════════════════════════════════════════
            LESSON 1 — Basics of Data Literacy
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="Basics of Data Literacy" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="What is Data Literacy?" tag="Definition">
            <p>
              <strong>Data literacy</strong> is the ability to read, understand, create, and communicate data
              as information. Just as reading literacy lets you decode written words, data literacy lets you
              decode numbers, charts, and datasets to make informed decisions.
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {[
                { label: "Read",       ex: "Understand what a graph or table says" },
                { label: "Analyse",    ex: "Find patterns, trends, and outliers"   },
                { label: "Communicate",ex: "Turn data into a clear story or action"},
              ].map(({ label, ex }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="text-xs text-gray-800 font-medium mt-1">{ex}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.2" title="Types of Data" tag="Key Concept">
            <p>
              Data comes in two fundamental forms that affect how AI can process it:
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                {
                  type: "Structured",
                  color: "#22D3EE",
                  desc: "Organised in rows and columns with a fixed schema. Directly readable by computers.",
                  ex:   "Spreadsheet of student marks, bank transaction CSV",
                },
                {
                  type: "Unstructured",
                  color: "#FB923C",
                  desc: "No fixed format. Requires AI techniques like NLP or Computer Vision to process.",
                  ex:   "X-ray images, audio recordings, social media posts",
                },
              ].map(d => (
                <div key={d.type} className="rounded-xl p-3 border" style={{ borderColor: d.color + "40", background: d.color + "08" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: d.color }}>{d.type} Data</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{d.desc}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5 italic">e.g. {d.ex}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              Data can also be classified by <strong>source</strong>: <strong>Primary data</strong> is collected
              directly by you (surveys, sensors, experiments). <strong>Secondary data</strong> was collected by
              someone else and is reused (government statistics, research datasets).
            </p>
          </ConceptCard>

          {/* Animation */}
          <AnimFrame
            title="Data Types Explorer"
            description="Click each node to explore structured vs unstructured data with primary and secondary source examples."
          >
            <AnimDataTypes />
          </AnimFrame>

          <MicroCheck
            question="A doctor records patient blood pressure every day in an Excel sheet. What type of data is this?"
            options={[
              "Unstructured primary data",
              "Structured primary data",
              "Structured secondary data",
              "Unstructured secondary data",
            ]}
            correct={1}
            explanation="The data is collected firsthand by the doctor (primary) and stored in a spreadsheet with fixed columns — Rows, Date, Patient ID, BP reading (structured)."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 2 — Acquiring, Processing & Interpreting Data
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="Acquiring, Processing & Interpreting Data" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="Data Acquisition — Finding Good Data" tag="Key Concept">
            <p>
              You can&apos;t build an AI model without data. <strong>Data acquisition</strong> is the process of
              identifying what data you need, finding reliable sources, and collecting it systematically.
            </p>
            <div className="mt-3 space-y-2">
              {[
                { step: "01", label: "Define your features",   desc: "What variables (columns) does your model need? (e.g. age, hours studied, score)" },
                { step: "02", label: "Find reliable sources",  desc: "Government portals (data.gov.in, NITI Aayog), research bodies, your own surveys" },
                { step: "03", label: "Decide frequency",       desc: "Is this a one-time collection or ongoing? Daily sensor readings vs. one census?" },
                { step: "04", label: "Consider volume",        desc: "AI needs sufficient data. A model trained on 10 rows will not generalise well." },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center">
                    {step}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="2.2" title="Data Preprocessing — Cleaning Your Data" tag="Critical Skill">
            <p>
              Real-world data is messy. Before training any AI model, you must clean it.
              The three most common data quality issues are:
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {[
                { type: "Missing Values", color: "#F59E0B", desc: "Null or empty cells. Fix by removing the row or imputing (filling with mean/median/mode).", ex: "Age column is blank" },
                { type: "Outliers",       color: "#EF4444", desc: "Values impossibly far from the expected range. Could be data entry errors or genuine anomalies.", ex: "Study hours = -5 or 200" },
                { type: "Duplicates",     color: "#8B5CF6", desc: "The same row entered more than once. Drop the extra copies — duplicates bias the model.", ex: "Same student row appears 3 times" },
              ].map(d => (
                <div key={d.type} className="rounded-xl p-3 border text-center" style={{ borderColor: d.color + "40", background: d.color + "08" }}>
                  <p className="text-[11px] font-bold mb-1" style={{ color: d.color }}>{d.type}</p>
                  <p className="text-[10px] text-gray-600 leading-snug">{d.desc}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5 italic">{d.ex}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2">
              <p className="text-xs text-amber-800 font-semibold">
                "Garbage in, garbage out" — an AI trained on dirty data learns wrong patterns and makes wrong predictions.
                Data cleaning typically takes 60–80% of a data scientist&apos;s time.
              </p>
            </div>
          </ConceptCard>

          {/* Animation: Data Cleaning */}
          <AnimFrame
            title="Dataset Cleaner — Interactive Activity"
            description="Find all the data quality issues hidden in this student dataset. Click a highlighted row to inspect the problem and fix it."
          >
            <AnimDataCleaning />
          </AnimFrame>

          <MicroCheck
            question="A row in a dataset has the value '999' in the 'Age' column. What type of data quality issue is this?"
            options={[
              "Duplicate",
              "Missing value",
              "Outlier",
              "Primary data error",
            ]}
            correct={2}
            explanation="Age 999 is an impossible value for a human being. It is an outlier — a value that is impossibly far from the realistic range. It was likely a data entry mistake (e.g., pressing 9 three times)."
          />

          <ConceptCard number="2.3" title="Data Interpretation — Reading Meaning from Data" tag="Key Concept">
            <p>
              <strong>Data interpretation</strong> is the process of reviewing data and arriving at relevant conclusions.
              There are two main types:
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                {
                  type:  "Qualitative Interpretation",
                  color: "#7C3AED",
                  points: [
                    "Reading patterns and trends visually",
                    "Drawing text-based conclusions",
                    '"Score improved after studying more"',
                    "Comparing categories without exact numbers",
                  ],
                },
                {
                  type:  "Quantitative Interpretation",
                  color: "#2563EB",
                  points: [
                    "Using numbers, statistics, formulas",
                    '"Average score increased by 12%"',
                    "Calculating mean, median, range",
                    "Statistical significance testing",
                  ],
                },
              ].map(d => (
                <div key={d.type} className="rounded-xl p-3 border" style={{ borderColor: d.color + "30", background: d.color + "06" }}>
                  <p className="text-xs font-bold mb-2" style={{ color: d.color }}>{d.type}</p>
                  <ul className="space-y-1">
                    {d.points.map((p, i) => (
                      <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1.5">
                        <span className="shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ background: d.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ConceptCard>

          <MicroCheck
            question="Which of the following is the BEST definition of 'data imputation'?"
            options={[
              "Deleting all rows with missing values",
              "Replacing missing values with estimated ones like mean or median",
              "Removing duplicate rows from a dataset",
              "Converting unstructured data to structured",
            ]}
            correct={1}
            explanation="Imputation means filling in missing values with reasonable estimates. Common methods: fill with the column's mean (for numerical data), median (for skewed data), or mode (for categorical data). This preserves the row instead of discarding it."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 3 — Data Visualisation & Privacy
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Data Visualisation & Privacy" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="Why Visualise Data?" tag="Key Concept">
            <p>
              A table of 1,000 numbers is hard to understand. A well-chosen chart reveals the same information in seconds.
              Data visualisation transforms raw numbers into a visual story that humans can understand and act on.
            </p>
            <div className="mt-3 grid sm:grid-cols-5 gap-2">
              {[
                { chart: "Bar",       use: "Compare categories",     color: "#7C3AED" },
                { chart: "Line",      use: "Show trends over time",   color: "#2563EB" },
                { chart: "Pie",       use: "Show parts of a whole",   color: "#F97316" },
                { chart: "Scatter",   use: "Find correlations",       color: "#059669" },
                { chart: "Histogram", use: "Show distributions",      color: "#D97706" },
              ].map(d => (
                <div key={d.chart} className="rounded-xl p-2.5 text-center border border-gray-100 bg-gray-50">
                  <p className="text-[11px] font-bold" style={{ color: d.color }}>{d.chart}</p>
                  <p className="text-[9px] text-gray-500 mt-0.5 leading-snug">{d.use}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Animation: Chart Selector */}
          <AnimFrame
            title="Chart Type Selector — Pick the Right Visualisation"
            description="Read each data scenario and choose the chart type that tells the story best. The correct chart will animate live."
          >
            <AnimChartSelector />
          </AnimFrame>

          <MicroCheck
            question="A line chart is most appropriate when you want to…"
            options={[
              "Compare the marks of 5 students",
              "Show what proportion of time is spent on each subject",
              "Show how a city's population changed between 2000 and 2020",
              "Find if height and weight are related",
            ]}
            correct={2}
            explanation="Line charts are for data that changes continuously over time. A city's population across 20 years is a classic time-series — the connected line makes the trend (growth, decline, fluctuation) immediately visible."
          />

          <ConceptCard number="3.2" title="Data Privacy & Security" tag="Critical Concept">
            <p>
              Every time you use an app, it collects data about you. <strong>Data privacy</strong> refers to
              your right to control how your personal information is collected and used.
              <strong> Data security</strong> refers to the technical measures that protect data from
              unauthorised access (hacking, breaches).
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Data Privacy",
                  color: "#7C3AED",
                  points: ["Who can access your data?", "How long is it stored?", "Is it sold to third parties?", "Do you consent to its use?"],
                },
                {
                  title: "Data Security",
                  color: "#EF4444",
                  points: ["Is data encrypted in transit?", "Are servers secured from hackers?", "What happens in a breach?", "Are backups maintained?"],
                },
              ].map(d => (
                <div key={d.title} className="rounded-xl p-3 border" style={{ borderColor: d.color + "30", background: d.color + "06" }}>
                  <p className="text-xs font-bold mb-2" style={{ color: d.color }}>{d.title}</p>
                  <ul className="space-y-1">
                    {d.points.map((p, i) => (
                      <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1.5">
                        <span className="shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ background: d.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Animation: Privacy Simulator */}
          <AnimFrame
            title="Data Privacy Simulator"
            description="Toggle app permissions to see what data flows out. Then experience a simulated breach and learn how to protect yourself."
          >
            <AnimDataPrivacy />
          </AnimFrame>

          <MicroCheck
            question="Which of the following is a best practice for data security?"
            options={[
              "Using the same password for all accounts so you don't forget it",
              "Sharing your OTP with a trusted friend",
              "Enabling two-factor authentication (2FA) on your accounts",
              "Accepting all app permissions to get full features",
            ]}
            correct={2}
            explanation="Two-factor authentication (2FA) adds a second layer of security — even if your password is stolen in a data breach, an attacker cannot log in without the second factor (OTP, fingerprint, authenticator app)."
          />

          <ConceptCard number="3.3" title="India's Personal Data Protection Bill (PDPB)" tag="Law & Policy">
            <p>
              India&apos;s <strong>Personal Data Protection Bill (PDPB)</strong> governs how organisations collect,
              store, and use personal data of Indian citizens. It is modelled on the EU&apos;s GDPR and gives citizens
              (called <em>data principals</em>) key rights:
            </p>
            <div className="mt-3 space-y-2">
              {[
                { right: "Right to Access",              desc: "Know exactly what personal data an organisation holds about you." },
                { right: "Right to Correction",          desc: "Have inaccurate or incomplete personal data corrected." },
                { right: "Right to Erasure",             desc: '"Right to be Forgotten" — request deletion of your data when no longer needed.' },
                { right: "Right to Data Portability",    desc: "Receive your personal data in a structured, readable format." },
                { right: "Right to Grievance Redressal", desc: "File a complaint against any organisation that misuses your data." },
              ].map(({ right, desc }) => (
                <div key={right} className="flex items-start gap-2.5">
                  <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600 text-[9px] font-bold mt-0.5 whitespace-nowrap">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{right}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <MicroCheck
            question="India's Personal Data Protection Bill (PDPB) gives citizens the 'Right to Erasure'. What does this mean?"
            options={[
              "Citizens can delete their social media posts",
              "Citizens can request organisations to delete their personal data",
              "Citizens can block any app from operating in India",
              "Citizens can erase their credit history",
            ]}
            correct={1}
            explanation="The Right to Erasure (also called the 'Right to be Forgotten') allows citizens to request that an organisation delete all personal data it holds about them — especially when it is no longer needed for the original purpose or when consent is withdrawn."
          />
        </section>

        {/* ── Exit Quiz ─────────────────────────────────────────────────────── */}
        <ExitQuiz
          moduleName="Unit 2: Data Literacy"
          questions={QUIZ}
          passThreshold={7}
        />
      </div>
    </div>
  )
}
