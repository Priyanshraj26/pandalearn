import { FlaskConical, BarChart2, Dices, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import LessonProgressStrip from "@/app/learn/cbse-ai-class9/module-1/_components/LessonProgressStrip"
import AnimMathPatterns from "./_components/AnimMathPatterns"
import AnimStatsCasino from "./_components/AnimStatsCasino"
import AnimProbability from "./_components/AnimProbability"
import AnimCarSpotter from "./_components/AnimCarSpotter"

// â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const QUIZ: QuizQuestion[] = [
  {
    question: "In the sequence 3, 6, 12, 24, ___, 96, what is the missing number?",
    options: ["36", "42", "48", "52"],
    correct: 2,
    explanation: "This is a geometric sequence â€” each term is multiplied by 2. 3â†’6â†’12â†’24â†’48â†’96. The missing number is 24 Ã 2 = 48.",
  },
  {
    question: "Which branch of mathematics helps AI models make predictions using past data patterns?",
    options: ["Geometry", "Statistics", "Trigonometry", "Set Theory"],
    correct: 1,
    explanation: "Statistics enables AI to find patterns, calculate averages, measure spread, and make data-driven predictions. It is one of the four pillars of Math for AI (along with Probability, Linear Algebra, and Calculus).",
  },
  {
    question: "A class of 10 students scored: 55, 60, 70, 65, 80, 75, 70, 90, 65, 70. What is the MODE?",
    options: ["65", "70", "71", "75"],
    correct: 1,
    explanation: "The mode is the value that appears most frequently. 70 appears three times (positions 3, 7, 10), more than any other value. Mode = 70.",
  },
  {
    question: "For the data set 12, 15, 18, 21, 24, what is the MEDIAN?",
    options: ["15", "17", "18", "21"],
    correct: 2,
    explanation: "The median is the middle value of sorted data. With 5 values, the middle is the 3rd value. Sorted: 12, 15, 18, 21, 24. Median = 18.",
  },
  {
    question: "What is the RANGE of the data: 42, 58, 35, 71, 49?",
    options: ["29", "36", "51", "71"],
    correct: 1,
    explanation: "Range = Maximum âˆ’ Minimum = 71 âˆ’ 35 = 36. Range measures the spread of data â€” how widely the values are distributed.",
  },
  {
    question: "A fair coin is flipped. What is the probability of getting TAILS?",
    options: ["0", "1/4", "1/2", "1"],
    correct: 2,
    explanation: "A fair coin has 2 equally likely outcomes: Heads and Tails. P(Tails) = Favourable outcomes / Total outcomes = 1/2 = 0.5.",
  },
  {
    question: "A bag contains 3 red, 2 blue, and 5 green marbles. What is P(Green)?",
    options: ["1/5", "1/3", "1/2", "2/5"],
    correct: 2,
    explanation: "Total marbles = 3 + 2 + 5 = 10. Favourable (green) = 5. P(Green) = 5/10 = 1/2. More green marbles means higher probability.",
  },
  {
    question: "The probability of rolling a 7 on a standard 6-sided die isâ€¦",
    options: ["1/6", "1/7", "0", "1"],
    correct: 2,
    explanation: "A standard die has faces 1â€“6. It is IMPOSSIBLE to roll a 7. P(impossible event) = 0. This is an impossible event.",
  },
  {
    question: "If P(Rain tomorrow) = 0.3, what is P(No Rain tomorrow)?",
    options: ["0.3", "0.5", "0.7", "1.0"],
    correct: 2,
    explanation: "Rain and No Rain are complementary events â€” exactly one must happen. P(A) + P(A') = 1. So P(No Rain) = 1 âˆ’ 0.3 = 0.7.",
  },
  {
    question: "An AI medical model outputs a confidence of 0.92 for 'tumour detected'. What does this mean?",
    options: [
      "The AI found 92 tumours",
      "The AI is 92% confident based on learned patterns that a tumour is present",
      "The model is wrong 92% of the time",
      "92 doctors reviewed the scan",
    ],
    correct: 1,
    explanation: "AI confidence scores are probabilities â€” P(tumour | input features) = 0.92. The model has learned from thousands of scans and estimates a 92% probability based on the image patterns. This is applied probability.",
  },
]

// â”€â”€ CBSE Accordion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CBSEAccordion() {
  const outcomes = [
    "Analyse data in the form of numbers and images to find patterns and relations.",
    "Understand the uses of mathematics in AI: Statistics, Probability, Linear Algebra, Calculus.",
    "Identify and extend number patterns (arithmetic, geometric, Fibonacci).",
    "Solve picture analogy problems by finding rules between sets of images.",
    "Define statistics and apply it to real-life scenarios (disaster, sports, health, weather).",
    "Calculate mean, median, mode, and range from a data set.",
    "Understand probability, calculate P(event), and identify types of events.",
    "Connect probability to AI confidence scores and model prediction uncertainty.",
  ]
  return (
    <details className="group rounded-2xl border border-emerald-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-emerald-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-emerald-500 shrink-0" />
        <span className="text-xs font-bold text-emerald-700 flex-1">CBSE 417 Â· Unit 3 â€” Official Learning Outcomes</span>
        <ChevronDown size={14} className="text-emerald-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-5 py-4 bg-white space-y-4">
        <ul className="space-y-1.5">
          {outcomes.map((o, i) => (
            <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
              <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 text-[9px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {o}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          {[["Theory Hours", "12h"], ["Practical Hours", "13h"], ["Max Marks", "7M"]].map(([l, v]) => (
            <div key={l} className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{l}</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </details>
  )
}

// â”€â”€ Lesson map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "#lesson-01",
      accent: "#F59E0B", bg: "#FFFBEB", textColor: "text-amber-700",
      title: "Importance of Math for AI",
      time: "~30 min",
      topics: ["4 Pillars of Math", "Number Patterns", "Picture Analogy"],
      feature: "Pattern challenge: Numbers + Images",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#10B981", bg: "#ECFDF5", textColor: "text-emerald-700",
      title: "Statistics in Real Life",
      time: "~45 min",
      topics: ["Mean Â· Median Â· Mode Â· Range", "Car Spotting Activity", "Real-world applications"],
      feature: "Statistics Lab â€” live calculations",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#8B5CF6", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "Probability",
      time: "~45 min",
      topics: ["P(event) formula", "Types of events", "Coin Â· Dice Â· Spinner", "AI confidence scores"],
      feature: "Probability Simulator â€” Law of Large Numbers",
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
              >{l.n}</span>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${l.textColor}`}>Lesson {l.n}</p>
                <p className="text-[11px] text-gray-400">{l.time}</p>
              </div>
            </div>
            <p className="font-sora font-bold text-gray-900 text-xs leading-snug mb-2.5">{l.title}</p>
            <div className="flex flex-wrap gap-1 mb-2.5">
              {l.topics.map(t => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">{t}</span>
              ))}
            </div>
            <p className={`text-[10px] font-semibold ${l.textColor}`}>âœ¦ {l.feature}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ n, title, lesson }: { n: string; title: string; lesson: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-sora font-bold text-white text-sm shrink-0">
        {n}
      </span>
      <div>
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">{lesson}</p>
        <h2 className="font-sora font-bold text-gray-900 text-lg leading-tight">{title}</h2>
      </div>
    </div>
  )
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Module3Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* Hero */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <FlaskConical size={200} className="absolute -right-10 -top-8 text-emerald-500 opacity-[0.07]" />
          <BarChart2 size={72} className="absolute right-44 top-6 text-amber-400 opacity-[0.06] rotate-6" />
          <Dices size={60} className="absolute right-28 bottom-4 text-violet-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 3 of 5
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40"><Target size={11} /> 7 marks Â· CBSE 417</span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Math for AI: Statistics &amp; Probability
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Every AI prediction is rooted in mathematics. This module connects the patterns you find in
            number sequences and images to how machine learning models actually work â€” then dives into
            statistics and probability, the two engines powering every AI confidence score and prediction.
          </p>
        </div>
      </div>

      <div className="mt-6"><CBSEAccordion /></div>

      <div className="py-10 space-y-16">

        <LessonMap />

        <ObjectivesCard
          objectives={[
            "Explain how mathematics (statistics, probability, linear algebra, calculus) underpins AI.",
            "Identify and extend arithmetic, geometric, and Fibonacci number sequences.",
            "Solve picture analogy problems by identifying the transformation rule.",
            "Calculate mean, median, mode, and range from a real-world dataset.",
            "Apply the probability formula P(E) = favourable outcomes Ã· total outcomes.",
            "Classify events as certain, impossible, equally likely, or complementary.",
            "Explain how AI uses probability as confidence scores in predictions.",
          ]}
        />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            LESSON 1 â€” Importance of Math for AI
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="Importance of Math for AI" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="The Four Pillars of Math for AI" tag="Key Concept">
            <p>
              Artificial Intelligence is not magic â€” it is applied mathematics. Four branches of math
              are especially critical for understanding how AI systems work:
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                { pillar: "Statistics",     color: "#10B981", role: "Find patterns and measure spread in data",        ex: "Calculating average exam score, detecting outliers" },
                { pillar: "Probability",    color: "#8B5CF6", role: "Quantify uncertainty and confidence",             ex: "AI cancer detector: 87% probability of tumour"      },
                { pillar: "Linear Algebra", color: "#3B82F6", role: "Represent images and text as number arrays",      ex: "A 28Ã28 pixel image = a matrix of 784 numbers"      },
                { pillar: "Calculus",       color: "#EF4444", role: "Optimise models to minimise prediction error",    ex: "Gradient descent: find the lowest point of error"   },
              ].map(d => (
                <div key={d.pillar} className="rounded-xl p-3 border" style={{ borderColor: d.color + "30", background: d.color + "06" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: d.color }}>{d.pillar}</p>
                  <p className="text-[10px] text-gray-600 leading-snug">{d.role}</p>
                  <p className="text-[9px] text-gray-400 mt-1 italic">{d.ex}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.2" title="Number Patterns" tag="Key Concept">
            <p>
              A <strong>pattern</strong> is a sequence that follows a consistent rule. Recognising patterns
              is how the human brain â€” and AI â€” learns to generalise from examples.
            </p>
            <div className="mt-3 space-y-2">
              {[
                { type: "Arithmetic",    color: "#22D3EE", ex: "5, 10, 15, 20, 25â€¦",   rule: "Add a fixed number (common difference)",     aiLink: "Linear regression" },
                { type: "Geometric",     color: "#F97316", ex: "2, 6, 18, 54, 162â€¦",   rule: "Multiply by a fixed number (common ratio)",  aiLink: "Exponential growth in neural networks" },
                { type: "Fibonacci",     color: "#8B5CF6", ex: "1, 1, 2, 3, 5, 8, 13â€¦",rule: "Each term = sum of the two preceding terms", aiLink: "Used in algorithm design and nature modelling" },
                { type: "Square Numbers",color: "#10B981", ex: "1, 4, 9, 16, 25, 36â€¦", rule: "nth term = nÂ²",                               aiLink: "Squared errors in ML loss functions (MSE)" },
              ].map(d => (
                <div key={d.type} className="flex items-start gap-3">
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5"
                    style={{ background: d.color + "20", color: d.color }}
                  >{d.type}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-gray-700">{d.ex}</p>
                    <p className="text-[10px] text-gray-500 leading-snug mt-0.5">{d.rule}</p>
                    <p className="text-[9px] font-semibold mt-0.5" style={{ color: d.color }}>AI: {d.aiLink}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.3" title="Picture Analogy â€” Visual Pattern Recognition" tag="Example">
            <p>
              A <strong>picture analogy</strong> asks: <em>&quot;A is to B as C is to ?&quot;</em> You must
              find the transformation rule applied to Aâ†’B and apply it to C to get the answer.
            </p>
            <div className="mt-3 rounded-xl bg-gray-50 border border-gray-100 p-3">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Example</p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg border-2 border-blue-300 bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">sm â‹</div>
                  <p className="text-[9px] text-gray-400 mt-1">A</p>
                </div>
                <span className="text-gray-300 text-sm">â†’</span>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg border-2 border-blue-400 bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">lg â‹</div>
                  <p className="text-[9px] text-gray-400 mt-1">B</p>
                </div>
                <span className="text-gray-300 text-sm">,</span>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg border-2 border-orange-300 bg-orange-50 flex items-center justify-center text-xs font-bold text-orange-600">sm â–¡</div>
                  <p className="text-[9px] text-gray-400 mt-1">C</p>
                </div>
                <span className="text-gray-300 text-sm">â†’</span>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg border-2 border-orange-400 bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">lg â–¡</div>
                  <p className="text-[9px] text-gray-400 mt-1">?</p>
                </div>
                <div className="text-[10px] text-gray-500 leading-snug ml-2">
                  Rule: small â†’ large<br />Answer: Large Square
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              This type of reasoning is tested in AI aptitude and is core to how Computer Vision models
              understand spatial and visual transformations.
            </p>
          </ConceptCard>

          {/* Animation */}
          <AnimFrame
            id="anim-frame-6"
              title="Pattern Challenge â€” Numbers &amp; Picture Analogy"
            description="Two tabs: identify missing numbers in sequences, then solve visual analogy puzzles. Each reveals how AI uses the same pattern logic."
          >
            <AnimMathPatterns />
          </AnimFrame>

          <MicroCheck
            question="In the sequence 2, 4, 8, 16, ___, 64, what is the missing number?"
            options={["24", "28", "32", "36"]}
            correct={2}
            explanation="This is a geometric sequence with common ratio Ã2. Each term doubles: 2â†’4â†’8â†’16â†’32â†’64. The missing number is 32."
          />
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            LESSON 2 â€” Statistics in Real Life
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="Statistics in Real Life" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="What is Statistics?" tag="Definition">
            <p>
              <strong>Statistics</strong> is the science of collecting, organising, analysing, interpreting,
              and presenting data. It transforms raw numbers into knowledge that informs decisions.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                { field: "Disaster Management", ex: "Flood prediction from rainfall statistics over 50 years" },
                { field: "Sports",              ex: "Player performance averages, win probability models"     },
                { field: "Disease Prediction",  ex: "Infection rate tracking, R-number in epidemics"         },
                { field: "Weather Forecast",    ex: "Temperature averages, extreme event frequency"          },
              ].map(d => (
                <div key={d.field} className="flex items-start gap-2 rounded-xl bg-gray-50 border border-gray-100 p-2.5">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 bg-emerald-400" />
                  <div>
                    <p className="text-[11px] font-semibold text-gray-800">{d.field}</p>
                    <p className="text-[10px] text-gray-500 leading-snug">{d.ex}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="2.2" title="Measures of Central Tendency" tag="Formula">
            <p>
              Three measures describe the &quot;centre&quot; of a dataset, each with different strengths:
            </p>
            <div className="mt-3 space-y-2.5">
              {[
                {
                  label: "Mean (Average)", color: "#F59E0B",
                  formula: "Mean = Sum of all values Ã· Number of values",
                  ex: "Scores: 60, 70, 80 â†’ Mean = (60+70+80)/3 = 70",
                  note: "Sensitive to outliers. One very high value pulls the mean up.",
                },
                {
                  label: "Median", color: "#10B981",
                  formula: "Sort data â†’ take the middle value",
                  ex: "56, 60, 70, 75, 88 â†’ Median = 70 (3rd of 5)",
                  note: "Unaffected by outliers. Best for income, house prices.",
                },
                {
                  label: "Mode", color: "#8B5CF6",
                  formula: "Value that appears most frequently",
                  ex: "4, 7, 7, 9, 12, 7 â†’ Mode = 7 (appears 3 times)",
                  note: "Can have no mode, one mode, or multiple modes.",
                },
              ].map(d => (
                <div key={d.label} className="rounded-xl border p-3" style={{ borderColor: d.color + "40", background: d.color + "06" }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold" style={{ color: d.color }}>{d.label}</p>
                  </div>
                  <p className="text-[10px] font-mono text-gray-700 bg-white/60 rounded-lg px-2 py-1 mb-1">{d.formula}</p>
                  <p className="text-[10px] text-gray-600 italic">{d.ex}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{d.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-100 p-2.5">
              <p className="text-[11px] font-bold text-amber-700 mb-0.5">Range â€” Measure of Spread</p>
              <p className="text-[10px] text-amber-700">Range = Maximum âˆ’ Minimum. Tells you how spread out the data is. Large range = high variability.</p>
            </div>
          </ConceptCard>

          {/* CBSE Car Spotting & Statistics Activity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                Interactive Activity
              </span>
              <span className="text-xs text-gray-400">CBSE Car Spotting &amp; Statistics Lab â€” add data, compute statistics live</span>
            </div>
            <AnimFrame
              id="anim-frame-7"
              title="Statistics Lab â€” Live Calculator (CBSE Car Spotting Activity)"
              description="Switch between datasets, add your own values, and watch mean, median, mode and range update live. Click any stat card to see the formula."
            >
              <AnimStatsCasino />
            </AnimFrame>
          </div>

          {/* Car Spotter â€” CBSE flagship activity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
                CBSE Activity
              </span>
              <span className="text-xs text-gray-400">Car Spotting &amp; Tabulating â€” collect real data, then analyse it</span>
            </div>
            <AnimFrame
              id="anim-car-spotter"
              title="Car Spotting &amp; Tabulating â€” CBSE Statistics Activity"
              description="Spot 20 cars and click the matching colour. Build a live frequency table, then calculate mean, mode and range from your own data."
            >
              <AnimCarSpotter />
            </AnimFrame>
          </div>

          <MicroCheck
            question="A teacher records marks: 55, 60, 70, 65, 80, 75, 70, 90, 65, 70. What is the MEAN?"
            options={["68.0", "70.0", "70.5", "72.5"]}
            correct={1}
            explanation="Mean = Sum Ã· Count. Sum = 55+60+70+65+80+75+70+90+65+70 = 700. Count = 10. Mean = 700 Ã· 10 = 70."
          />

          <MicroCheck
            question="Why is MEDIAN often preferred over MEAN for measuring typical house prices?"
            options={[
              "Median is easier to calculate",
              "Mean is affected by a few very expensive houses, pulling the average up unfairly",
              "Median always equals the most common price",
              "Mean only works for small datasets",
            ]}
            correct={1}
            explanation="A few extremely expensive houses (outliers) drag the mean upward, making it seem like the 'average' house is more expensive than most people can afford. The median â€” the middle value when prices are sorted â€” is unaffected by those outliers and better represents the typical buyer's experience."
          />
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            LESSON 3 â€” Probability
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Probability" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="What is Probability?" tag="Definition">
            <p>
              <strong>Probability</strong> measures the likelihood that a specific event will occur.
              It is always a number between 0 (impossible) and 1 (certain).
            </p>
            <div className="mt-3 rounded-xl bg-gray-900 border border-gray-700 p-3 font-mono text-center">
              <p className="text-emerald-400 text-sm font-bold">P(Event) = Favourable Outcomes / Total Outcomes</p>
              <p className="text-slate-400 text-xs mt-1">0 â‰¤ P(E) â‰¤ 1</p>
            </div>
            <div className="mt-3 grid sm:grid-cols-3 gap-2">
              {[
                { ex: "Rolling a 3 on a die",   calc: "P = 1/6 â‰ˆ 0.167", color: "#EF4444" },
                { ex: "Getting Heads on a coin", calc: "P = 1/2 = 0.5",   color: "#F59E0B" },
                { ex: "Drawing a red card",      calc: "P = 26/52 = 0.5", color: "#EF4444" },
              ].map(d => (
                <div key={d.ex} className="rounded-xl bg-gray-50 border border-gray-100 p-2.5 text-center">
                  <p className="text-[10px] text-gray-600 leading-tight mb-1">{d.ex}</p>
                  <p className="text-[11px] font-mono font-bold" style={{ color: d.color }}>{d.calc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="3.2" title="Types of Events" tag="Key Concept">
            <div className="mt-1 space-y-2">
              {[
                { type: "Certain Event",      color: "#10B981", prob: "P = 1",         ex: "The Sun will rise tomorrow"              },
                { type: "Impossible Event",   color: "#EF4444", prob: "P = 0",         ex: "Rolling a 7 on a standard 6-sided die"   },
                { type: "Equally Likely",     color: "#3B82F6", prob: "Equal P each",  ex: "Heads or Tails on a fair coin"           },
                { type: "Complementary",      color: "#8B5CF6", prob: "P(A)+P(A')=1", ex: "P(Rain) + P(No Rain) = 1"               },
              ].map(d => (
                <div key={d.type} className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-2.5">
                  <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 whitespace-nowrap"
                    style={{ background: d.color + "20", color: d.color }}
                  >{d.prob}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{d.type}</p>
                    <p className="text-[10px] text-gray-500 leading-snug">{d.ex}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="3.3" title="Probability in Real Life &amp; AI" tag="Example">
            <div className="space-y-2">
              {[
                { field: "Sports",           ex: "Win probability in cricket based on run rate and wickets remaining" },
                { field: "Weather Forecast", ex: '"70% chance of rain" = P(rain) = 0.7 based on historical patterns'  },
                { field: "Traffic",          ex: "P(congestion at 9 AM) estimated from weeks of sensor data"          },
                { field: "AI Diagnosis",     ex: "Medical AI: P(diabetes | blood_glucose=140, BMI=32) = 0.88"         },
              ].map(d => (
                <div key={d.field} className="flex items-start gap-2">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 bg-violet-400" />
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{d.field}: </span>
                    <span className="text-xs text-gray-500">{d.ex}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-violet-50 border border-violet-100 p-3">
              <p className="text-xs font-bold text-violet-700 mb-1">Probability â†’ AI Confidence Scores</p>
              <p className="text-xs text-violet-700 leading-relaxed">
                When an AI model says &quot;92% confidence&quot;, it is outputting a probability P = 0.92.
                The model was trained on thousands of examples and learned the probability distribution
                of outcomes from input features â€” this is called <strong>probabilistic inference</strong>.
              </p>
            </div>
          </ConceptCard>

          {/* CBSE Probability Experiment Activity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-bold text-violet-700">
                WOW Experiment
              </span>
              <span className="text-xs text-gray-400">CBSE Activity â€” coin, dice &amp; spinner probability experiments</span>
            </div>
            <AnimFrame
              id="anim-frame-8"
              title="Probability Simulator â€” Law of Large Numbers"
              description="Run coin flips, dice rolls, or a spinner. Watch empirical probability converge toward theoretical probability as trials increase. Explore event types in the second tab."
            >
              <AnimProbability />
            </AnimFrame>
          </div>

          <MicroCheck
            question="A bag has 4 red balls and 6 blue balls. What is P(Red)?"
            options={["1/4", "2/5", "1/2", "3/5"]}
            correct={1}
            explanation="Total balls = 4 + 6 = 10. Favourable outcomes (red) = 4. P(Red) = 4/10 = 2/5 = 0.4. There are fewer red balls than blue, so P(Red) < 0.5."
          />

          <MicroCheck
            question="After flipping a coin 10 times you get 7 Heads and 3 Tails. Why is this NOT surprising?"
            options={[
              "The coin must be biased",
              "With only 10 trials, random variation is expected â€” 50/50 only emerges over many trials",
              "Heads is always more likely than Tails",
              "Probability only works with large even numbers",
            ]}
            correct={1}
            explanation="The Law of Large Numbers says empirical probability approaches theoretical probability as the number of trials grows. With just 10 flips, 7H/3T is perfectly normal random variation. Try 1,000 flips â€” you'll get close to 500/500."
          />
        </section>

        {/* Exit Quiz */}
        <ExitQuiz
          moduleName="Unit 3: Math for AI â€” Statistics & Probability"
          questions={QUIZ}
          passThreshold={7}
        />
      </div>
    </div>
    </>
  )
}
