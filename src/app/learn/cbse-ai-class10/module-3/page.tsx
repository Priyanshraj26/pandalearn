import { BarChart3, TrendingUp, ShieldCheck, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimTrainTestSplit from "./_components/AnimTrainTestSplit"
import AnimConfusionMatrixDeep from "./_components/AnimConfusionMatrixDeep"
import LessonProgressStrip from "./_components/LessonProgressStrip"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "Why is it important to evaluate a machine learning model?",
    options: [
      "To make the model run faster",
      "To ensure the model generalises well to new, unseen data",
      "To reduce the size of the training data",
      "To make the model more complex",
    ],
    correct: 1,
    explanation: "Evaluation ensures the model doesn't just memorise training data but can actually perform well on new, real-world data it hasn't seen before.",
  },
  {
    question: "In an 80/20 train-test split with 1000 data points, how many are used for testing?",
    options: ["80", "200", "800", "100"],
    correct: 1,
    explanation: "20% of 1000 = 200 data points are kept aside for testing. The remaining 800 are used for training the model.",
  },
  {
    question: "A model has 99% accuracy on training data but 55% on test data. This indicates:",
    options: ["Underfitting", "Overfitting", "A perfect model", "Reinforcement learning"],
    correct: 1,
    explanation: "High training accuracy but low test accuracy is the classic sign of overfitting — the model memorised the training data instead of learning general patterns.",
  },
  {
    question: "In a confusion matrix, a False Negative (FN) means:",
    options: [
      "Predicted positive, actually positive",
      "Predicted negative, actually negative",
      "Predicted positive, actually negative",
      "Predicted negative, actually positive",
    ],
    correct: 3,
    explanation: "A False Negative occurs when the model incorrectly predicts 'negative' for a case that is actually 'positive' — like saying a sick patient is healthy.",
  },
  {
    question: "A model predicts 100 patients as infected. 80 actually are infected, 20 are not. What is the precision?",
    options: ["80%", "20%", "100%", "50%"],
    correct: 0,
    explanation: "Precision = TP / (TP + FP) = 80 / (80 + 20) = 80%. Of all positive predictions, 80% were actually correct.",
  },
  {
    question: "There are 100 actual infected patients. The model correctly identifies 90 of them. What is the recall?",
    options: ["100%", "10%", "90%", "80%"],
    correct: 2,
    explanation: "Recall = TP / (TP + FN) = 90 / (90 + 10) = 90%. Of all actual positives, the model caught 90%.",
  },
  {
    question: "In a cancer screening system, which metric should be prioritised?",
    options: ["Precision", "Recall", "Accuracy", "F1 Score"],
    correct: 1,
    explanation: "In cancer screening, missing an actual case (False Negative) is far more dangerous than a false alarm (False Positive). High recall minimises missed cases.",
  },
  {
    question: "The F1 Score is the:",
    options: [
      "Average of precision and recall",
      "Harmonic mean of precision and recall",
      "Product of precision and recall",
      "Difference between precision and recall",
    ],
    correct: 1,
    explanation: "F1 = 2 × (Precision × Recall) / (Precision + Recall). The harmonic mean penalises extreme values — both precision and recall must be high for a good F1.",
  },
  {
    question: "A spam filter flags important emails as spam. This is an example of:",
    options: ["True Positive", "True Negative", "False Positive", "False Negative"],
    correct: 2,
    explanation: "The filter predicts 'spam' (positive) but the email is actually important (not spam = negative). Predicted positive, actually negative = False Positive.",
  },
  {
    question: "Ethical AI evaluation includes:",
    options: [
      "Only checking model accuracy",
      "Checking for bias in training data, transparency, and accountability",
      "Making models as complex as possible",
      "Using only one metric for evaluation",
    ],
    correct: 1,
    explanation: "Ethical evaluation goes beyond accuracy — it examines whether the training data contains biases, whether model decisions are transparent, and who is accountable for AI system outcomes.",
  },
]

// ── CBSE Syllabus accordion ────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Understand why model evaluation is necessary beyond training accuracy.",
    "Explain the concept of train-test split and its typical ratio.",
    "Define overfitting and underfitting with examples.",
    "Construct and interpret a confusion matrix with TP, TN, FP, FN.",
    "Calculate Accuracy, Precision, Recall, and F1 Score from a confusion matrix.",
    "Determine when to prioritise Precision vs Recall for different applications.",
    "Apply ethical considerations to AI model evaluation.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 3 — Official Learning Outcomes</span>
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
            <p className="text-sm font-bold text-gray-900 mt-0.5">20h</p>
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
      title: "Why Evaluate? & Train-Test Split",
      time: "~35 min",
      topics: ["Model Evaluation", "Train-Test Split", "Overfitting"],
      feature: "Interactive train-test split visualiser",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "The Confusion Matrix",
      time: "~50 min",
      topics: ["TP", "TN", "FP", "FN"],
      feature: "WOW: Medical scenario classifier",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "Precision, Recall, F1 & Ethics",
      time: "~40 min",
      topics: ["Precision", "Recall", "F1 Score", "Ethics"],
      feature: "When to use which metric",
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

export default function Module3Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <BarChart3 size={200} className="absolute -right-10 -top-8 text-orange-500 opacity-[0.07]" />
          <TrendingUp size={72} className="absolute right-44 top-6 text-violet-400 opacity-[0.06] rotate-6" />
          <ShieldCheck size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 3 of 6
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~35 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 8 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Evaluating Models
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Three lessons: understand why model evaluation matters, master the confusion matrix
            with TP/TN/FP/FN through hands-on scenarios, and learn Precision, Recall, F1 Score
            and the ethical responsibilities of AI evaluation.
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
            "Explain why evaluating a model is essential before deployment.",
            "Describe the train-test split and common split ratios.",
            "Define overfitting and underfitting with practical examples.",
            "Construct a confusion matrix and classify outcomes as TP, TN, FP, or FN.",
            "Calculate Accuracy, Precision, Recall, and F1 Score from given data.",
            "Determine whether Precision or Recall is more important for a given scenario.",
            "Apply ethical thinking to AI model evaluation — bias, transparency, accountability.",
          ]}
        />

        {/* ════════════════════════════════════════════════════════
            LESSON 1: Why Evaluate? & Train-Test Split
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="Why Evaluate? & Train-Test Split" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="Why Model Evaluation Matters" tag="Key Concept">
            <p>
              Just because a model performs well on <strong>training data</strong> doesn&apos;t mean
              it will work well in the real world. A student who memorises answers without
              understanding concepts will fail on new questions — the same applies to AI models.
            </p>
            <p className="mt-2">
              <strong>Model evaluation</strong> tests the model on data it has never seen before,
              giving us an honest measure of how well it has actually learned.
            </p>
          </ConceptCard>

          <ConceptCard number="1.2" title="Train-Test Split" tag="Definition">
            <p>
              The dataset is divided into two parts: <strong>training data</strong> (used to teach the model)
              and <strong>test data</strong> (used to evaluate it). The model never sees the test data during training.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">Training Set (80%)</p>
                <p className="text-[11px] text-blue-800">
                  The model learns patterns from this data. More training data = better learning, up to a point.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <p className="text-xs font-bold text-orange-700 mb-1">Test Set (20%)</p>
                <p className="text-[11px] text-orange-800">
                  Reserved for evaluation only. Gives an unbiased estimate of real-world performance.
                </p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="1.3" title="Overfitting & Underfitting" tag="Warning">
            <div className="space-y-3 mt-1">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-xs font-bold text-red-700 mb-1">⚠ Overfitting</p>
                <p className="text-[11px] text-red-800">
                  Model memorises training data (including noise) instead of learning general patterns.
                  High accuracy on training data, poor accuracy on test data. Like studying only the answer key
                  and failing on a new exam.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-700 mb-1">⚠ Underfitting</p>
                <p className="text-[11px] text-amber-800">
                  Model is too simple to capture the underlying patterns in the data.
                  Poor accuracy on both training and test data. Like studying for only 5 minutes —
                  not enough to learn anything meaningful.
                </p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="1.4" title="Accuracy & Error" tag="Formula">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800">
                Accuracy = Correct Predictions / Total Predictions
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800">
                Error = 1 − Accuracy
              </div>
              <p className="text-xs text-gray-600">
                <strong>Example:</strong> If a model makes 100 predictions and gets 86 correct:
                Accuracy = 86/100 = 86%, Error = 14%.
              </p>
            </div>
          </ConceptCard>

          {/* Interactive: Train-Test Split */}
          <AnimFrame id="anim-train-test" title="Interactive: Train-Test Split" description="Adjust the slider to see how different split ratios affect model performance">
            <AnimTrainTestSplit />
          </AnimFrame>

          <MicroCheck
            question="What happens if you test a model on the same data it trained on?"
            options={[
              "You get a fair evaluation of model performance",
              "The model will likely show artificially high accuracy (overfitting)",
              "The model becomes more generalised",
              "The test data improves the model",
            ]}
            correct={1}
            explanation="Testing on training data gives misleading results because the model has already 'seen' all the answers. It's like giving a student the same exam they practiced on — the score won't reflect true understanding."
          />

          <MicroCheck
            question="If a model has 95% training accuracy but 52% test accuracy, the model is:"
            options={[
              "Underfitting — it hasn't learned enough",
              "Performing optimally",
              "Overfitting — it memorised training data",
              "Ready for deployment",
            ]}
            correct={2}
            explanation="A large gap between training accuracy (95%) and test accuracy (52%) is the hallmark of overfitting — the model memorised training patterns but can't generalise to new data."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 2: The Confusion Matrix
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="The Confusion Matrix" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="What is a Confusion Matrix?" tag="Definition">
            <p>
              A <strong>confusion matrix</strong> is a 2×2 table that shows how well a classification
              model performs by breaking down predictions into four categories. It gives a much deeper
              picture than accuracy alone.
            </p>
          </ConceptCard>

          <ConceptCard number="2.2" title="The Four Outcomes" tag="Key Concept">
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <p className="text-xs font-bold text-emerald-700 mb-1">✓ True Positive (TP)</p>
                <p className="text-[11px] text-emerald-800">Predicted positive, actually positive.</p>
                <p className="text-[10px] text-emerald-600 mt-1 italic">&quot;Predicted sick, IS sick&quot;</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">✓ True Negative (TN)</p>
                <p className="text-[11px] text-blue-800">Predicted negative, actually negative.</p>
                <p className="text-[10px] text-blue-600 mt-1 italic">&quot;Predicted healthy, IS healthy&quot;</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-700 mb-1">✗ False Positive (FP)</p>
                <p className="text-[11px] text-amber-800">Predicted positive, actually negative. Type I error.</p>
                <p className="text-[10px] text-amber-600 mt-1 italic">&quot;Predicted sick, IS healthy&quot; — false alarm</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-xs font-bold text-red-700 mb-1">✗ False Negative (FN)</p>
                <p className="text-[11px] text-red-800">Predicted negative, actually positive. Type II error.</p>
                <p className="text-[10px] text-red-600 mt-1 italic">&quot;Predicted healthy, IS sick&quot; — missed case</p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="2.3" title="Real-World Examples" tag="Example">
            <div className="space-y-2 mt-1">
              {[
                ["⚽ Football Prediction", "Predicted France wins, France wins → TP. Predicted France wins, France loses → FP."],
                ["🩺 Medical Screening", "Predicted infected, actually not → FP (false alarm). Predicted healthy, actually infected → FN (missed case)."],
                ["📧 Spam Filter", "Predicted spam, actually spam → TP. Important email flagged as spam → FP."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-40 shrink-0">{title}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Interactive: Confusion Matrix Deep */}
          <AnimFrame id="anim-confusion-matrix" title="Interactive: Confusion Matrix Classifier" description="Classify 12 medical scenarios as TP, TN, FP, or FN and watch the matrix build in real-time">
            <AnimConfusionMatrixDeep />
          </AnimFrame>

          <MicroCheck
            question="A model predicts a healthy patient as sick. This is a:"
            options={["True Positive", "True Negative", "False Positive", "False Negative"]}
            correct={2}
            explanation="The model predicted 'positive' (sick) but the patient is actually 'negative' (healthy). Predicted positive, actually negative = False Positive (a false alarm)."
          />

          <MicroCheck
            question="If TP = 80, TN = 15, FP = 5, FN = 10, what is the accuracy?"
            options={["80%", "86.4%", "93.5%", "75%"]}
            correct={1}
            explanation="Accuracy = (TP + TN) / (TP + TN + FP + FN) = (80 + 15) / (80 + 15 + 5 + 10) = 95/110 = 86.4%."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 3: Precision, Recall, F1 & Ethics
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Precision, Recall, F1 & Ethics" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="Precision" tag="Formula">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800 mb-3">
              Precision = TP / (TP + FP)
            </div>
            <p>
              <strong>Precision</strong> answers: &quot;Of all the items the model predicted as positive,
              how many were actually positive?&quot;
            </p>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs font-bold text-blue-700 mb-1">When Precision Matters Most</p>
              <p className="text-[11px] text-blue-800">
                <strong>Spam filter:</strong> If important emails get marked as spam (FP), that&apos;s very costly.
                High precision ensures that when the filter says &quot;spam,&quot; it&apos;s almost certainly spam.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard number="3.2" title="Recall (Sensitivity)" tag="Formula">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800 mb-3">
              Recall = TP / (TP + FN)
            </div>
            <p>
              <strong>Recall</strong> answers: &quot;Of all actual positive cases, how many did the model
              correctly identify?&quot;
            </p>
            <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl p-3">
              <p className="text-xs font-bold text-orange-700 mb-1">When Recall Matters Most</p>
              <p className="text-[11px] text-orange-800">
                <strong>Cancer detection:</strong> Missing a cancer case (FN) could be fatal.
                High recall ensures we catch as many actual cases as possible, even at the cost of some false alarms.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard number="3.3" title="F1 Score" tag="Formula">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800 mb-3">
              F1 = 2 × (Precision × Recall) / (Precision + Recall)
            </div>
            <p>
              The <strong>F1 Score</strong> is the harmonic mean of precision and recall. It provides a
              single metric that balances both. The harmonic mean penalises extreme values — if either
              precision or recall is very low, F1 will also be low.
            </p>
            <div className="mt-3 bg-violet-50 border border-violet-200 rounded-xl p-3">
              <p className="text-xs font-bold text-violet-700 mb-1">When to Use F1</p>
              <p className="text-[11px] text-violet-800">
                When you need a balance between precision and recall, especially with imbalanced datasets
                where accuracy alone can be misleading.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard number="3.4" title="Precision vs Recall — Comparison" tag="Remember">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-2 px-3 font-bold text-gray-700">Aspect</th>
                    <th className="text-left py-2 px-3 font-bold text-blue-600">Precision</th>
                    <th className="text-left py-2 px-3 font-bold text-orange-600">Recall</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Question</td>
                    <td className="py-2 px-3">How many positive predictions were correct?</td>
                    <td className="py-2 px-3">How many actual positives were found?</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Focus</td>
                    <td className="py-2 px-3">Minimise False Positives</td>
                    <td className="py-2 px-3">Minimise False Negatives</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Priority when</td>
                    <td className="py-2 px-3">False alarms are costly</td>
                    <td className="py-2 px-3">Missing cases is dangerous</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-700">Example</td>
                    <td className="py-2 px-3">Spam filter, search engines</td>
                    <td className="py-2 px-3">Cancer screening, fraud detection</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptCard>

          <MicroCheck
            question="Precision measures:"
            options={[
              "Of all actual positives, how many did the model find",
              "Of all positive predictions, how many were actually positive",
              "The total number of correct predictions",
              "The speed of model training",
            ]}
            correct={1}
            explanation="Precision = TP / (TP + FP). It measures the quality of positive predictions — 'When the model says positive, how often is it right?'"
          />

          <MicroCheck
            question="In cancer detection, which metric matters most?"
            options={["Precision", "Recall", "Accuracy", "Error rate"]}
            correct={1}
            explanation="In cancer detection, missing an actual cancer case (False Negative) could be fatal. Recall measures how many actual cases were caught — it should be as high as possible, even if it means more false alarms."
          />

          <ConceptCard number="3.5" title="Ethical Evaluation of AI Models" tag="Key Concept">
            <p>
              Evaluating a model isn&apos;t just about metrics — it&apos;s about <strong>fairness,
              transparency, and accountability</strong>. A model with high accuracy may still be
              harmful if it contains biases or makes opaque decisions.
            </p>
            <div className="space-y-2 mt-3">
              {[
                ["Bias in Training Data", "If the training data is skewed or unrepresentative, the model will learn and amplify those biases. Example: a hiring AI trained mostly on male CVs may unfairly reject female candidates."],
                ["Transparency", "Stakeholders should understand how the model makes decisions. Black-box models that can't explain their reasoning create trust issues."],
                ["Accountability", "Developers, organisations, and deployers must be held responsible for AI system outcomes — especially when those outcomes affect people's lives, health, or livelihoods."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-36 shrink-0">{title}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>
        </section>

        {/* ── Exit Quiz ────────────────────────────────────────────────────────── */}
        <section>
          <ExitQuiz
            moduleName="Unit 3: Evaluating Models"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
