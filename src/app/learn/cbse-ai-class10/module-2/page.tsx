import { Layers, Brain, Cpu, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimAIMLDL from "./_components/AnimAIMLDL"
import AnimMLModelTypes from "./_components/AnimMLModelTypes"
import AnimNeuralNetwork from "./_components/AnimNeuralNetwork"
import LessonProgressStrip from "./_components/LessonProgressStrip"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "In which type of machine learning is the data labeled with the desired output?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
    correct: 0,
    explanation: "Supervised Learning uses labeled data — both input features and output labels are provided during training, so the model can learn the mapping between them.",
  },
  {
    question: "An email spam filter that learns to identify spam emails based on labeled examples is an application of:",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Transfer Learning"],
    correct: 0,
    explanation: "Spam filters learn from emails labeled as 'spam' or 'not spam' — this is supervised learning since both features and labels are provided.",
  },
  {
    question: "A machine learning algorithm that groups similar customer purchases into clusters for recommendation systems uses:",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Neural Networks"],
    correct: 1,
    explanation: "Grouping similar items without predefined labels is clustering — a form of unsupervised learning that discovers natural patterns in data.",
  },
  {
    question: "An AI agent playing a game and learning from its rewards and penalties is an example of:",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Evolutionary Learning"],
    correct: 2,
    explanation: "When an agent learns through trial and error, receiving rewards for correct actions and penalties for wrong ones, it's reinforcement learning.",
  },
  {
    question: "Which of the following statements is NOT true about supervised learning?",
    options: [
      "Requires labeled data for training",
      "Used for classification and regression tasks",
      "Can be less efficient for large datasets",
      "Often used in image recognition applications",
    ],
    correct: 2,
    explanation: "Supervised learning is actually very efficient with large labeled datasets — that's when it performs best. It does require labeled data and is used for both classification and regression.",
  },
  {
    question: "In an unsupervised learning scenario, the goal is to:",
    options: [
      "Predict a specific output based on labeled data",
      "Identify patterns and relationships within unlabeled data",
      "Train an AI agent through rewards and penalties",
      "Develop complex neural network architectures",
    ],
    correct: 1,
    explanation: "Unsupervised learning's core goal is to discover hidden patterns, similarities, and relationships within unlabeled data — without any predefined target output.",
  },
  {
    question: "Clustering algorithms are commonly used in unsupervised learning for:",
    options: ["Spam filtering", "Image classification", "Stock price prediction", "Grouping similar data points"],
    correct: 3,
    explanation: "Clustering groups similar data points together based on shared characteristics — like grouping customers by purchase behaviour or grouping similar documents.",
  },
  {
    question: "Which relationship is correct?",
    options: [
      "ML is a superset of AI",
      "DL is a superset of ML",
      "AI ⊃ ML ⊃ DL (AI contains ML which contains DL)",
      "AI, ML, and DL are completely separate fields",
    ],
    correct: 2,
    explanation: "Deep Learning is a subset of Machine Learning, which is itself a subset of Artificial Intelligence. AI is the broadest field, ML is a specific approach within AI, and DL is a specialised technique within ML.",
  },
  {
    question: "In a classification model, the output is:",
    options: [
      "A continuous numerical value",
      "A category or class label",
      "A probability distribution only",
      "Always binary (yes/no)",
    ],
    correct: 1,
    explanation: "Classification models predict discrete categories or class labels (e.g., 'cat' vs 'dog', 'spam' vs 'not spam'). Regression models predict continuous values.",
  },
  {
    question: "In a neural network, what role does the 'bias' play?",
    options: [
      "It reduces the number of inputs",
      "It always makes the output positive",
      "It shifts the activation function so the model can fit data better",
      "It removes noise from the training data",
    ],
    correct: 2,
    explanation: "Bias is an additional parameter that allows the neural network to shift the activation function left or right — enabling better fitting to the data by adjusting the decision boundary.",
  },
]

// ── CBSE Syllabus accordion ────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Differentiate between AI, Machine Learning, and Deep Learning.",
    "Explain common ML terminologies: features, labels, training data, test data.",
    "Describe supervised learning and its sub-types: classification and regression.",
    "Describe unsupervised learning and clustering with real-world examples.",
    "Explain reinforcement learning and its trial-and-error approach.",
    "Understand the basics of neural networks: weights, bias, threshold, layers.",
    "Apply neural network logic to a simple decision-making scenario.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 2 — Official Learning Outcomes</span>
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
            <p className="text-sm font-bold text-gray-900 mt-0.5">25h</p>
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
      accent: "#3B82F6", bg: "#EFF6FF", textColor: "text-blue-700",
      title: "AI, Machine Learning & Deep Learning",
      time: "~40 min",
      topics: ["AI vs ML vs DL", "Key Terms", "Nested Relationship"],
      feature: "Interactive AI ⊃ ML ⊃ DL visualiser",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "ML Model Types",
      time: "~60 min",
      topics: ["Supervised", "Unsupervised", "Reinforcement"],
      feature: "WOW: ML model classifier playground",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "Neural Networks",
      time: "~45 min",
      topics: ["Weights", "Bias", "Threshold", "Layers"],
      feature: "Live neural network calculator",
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

export default function Module2Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Layers size={200} className="absolute -right-10 -top-8 text-orange-500 opacity-[0.07]" />
          <Brain size={72} className="absolute right-44 top-6 text-violet-400 opacity-[0.06] rotate-6" />
          <Cpu size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 2 of 6
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~53 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 10 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Advanced Concepts of Modeling in AI
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Three lessons: understand the hierarchy of AI, ML, and Deep Learning;
            master supervised, unsupervised, and reinforcement learning;
            and build your first neural network from scratch.
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
            "Differentiate between Artificial Intelligence, Machine Learning, and Deep Learning.",
            "Explain key ML terminologies: features, labels, training data, test data, and model.",
            "Describe the three families of ML models: supervised, unsupervised, and reinforcement learning.",
            "Identify classification and regression as sub-types of supervised learning.",
            "Explain clustering in unsupervised learning with real-world examples.",
            "Understand how neural networks compute decisions using weights, bias, and thresholds.",
            "Apply neural network logic to a simple real-world scenario.",
          ]}
        />

        {/* ════════════════════════════════════════════════════════
            LESSON 1: AI, Machine Learning & Deep Learning
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="AI, Machine Learning & Deep Learning" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="Artificial Intelligence (AI)" tag="Definition">
            <p>
              <strong>Artificial Intelligence</strong> is the broadest field — it encompasses any technique that
              enables computers to mimic human intelligence. This includes rule-based systems, expert systems,
              and machine learning. AI can include hand-coded rules — no learning from data is required.
            </p>
            <p className="mt-2">
              <strong>Key idea:</strong> If a computer can perform a task that normally requires human intelligence,
              it&apos;s AI — whether it learns from data or follows hard-coded rules.
            </p>
          </ConceptCard>

          <ConceptCard number="1.2" title="Machine Learning (ML)" tag="Definition">
            <p>
              <strong>Machine Learning</strong> is a subset of AI where systems learn from data automatically
              without being explicitly programmed. Instead of writing rules by hand, the machine discovers
              patterns from training data and improves with experience.
            </p>
            <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs font-bold text-blue-700 mb-1">Key Difference from AI</p>
              <p className="text-[11px] text-blue-800">ML learns rules from data — rules are discovered, not programmed.</p>
            </div>
          </ConceptCard>

          <ConceptCard number="1.3" title="Deep Learning (DL)" tag="Definition">
            <p>
              <strong>Deep Learning</strong> is a subset of ML that uses neural networks with multiple hidden
              layers. It excels at processing unstructured data like images, audio, and text.
              Deep learning works best with massive datasets and high computational power.
            </p>
            <div className="mt-2 p-3 bg-violet-50 rounded-xl border border-violet-200">
              <p className="text-xs font-bold text-violet-700 mb-1">Key Difference from ML</p>
              <p className="text-[11px] text-violet-800">DL uses deep neural networks with many layers — automatically extracts features from raw data.</p>
            </div>
          </ConceptCard>

          <ConceptCard number="1.4" title="Common ML Terminologies" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["Features", "Input characteristics the model uses to make predictions (e.g., weight, colour, size of a coin)."],
                ["Labels / Targets", "The output the model tries to predict (e.g., 'Euro', 'Dollar', 'Rupee')."],
                ["Training Data", "Labeled data used to teach the model. The model learns patterns from this data."],
                ["Test Data", "Unseen data used to evaluate how well the model generalises to new situations."],
                ["Model", "The learned mathematical function that maps features to labels after training."],
              ].map(([term, desc]) => (
                <div key={term} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-28 shrink-0">{term}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Interactive: AI ⊃ ML ⊃ DL */}
          <AnimFrame id="anim-ai-ml-dl" title="Interactive: AI ⊃ ML ⊃ DL" description="Explore the nested relationship between AI, Machine Learning, and Deep Learning">
            <AnimAIMLDL />
          </AnimFrame>

          <MicroCheck
            question="Which relationship between AI, ML, and DL is correct?"
            options={[
              "ML is a superset of AI",
              "DL is a superset of ML",
              "AI ⊃ ML ⊃ DL (AI contains ML, which contains DL)",
              "AI, ML, and DL are completely separate fields",
            ]}
            correct={2}
            explanation="Deep Learning is a subset of Machine Learning, which is itself a subset of Artificial Intelligence. Think of concentric circles: AI is the largest, ML sits inside AI, and DL sits inside ML."
          />
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 2: ML Model Types
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="ML Model Types" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="Supervised Learning" tag="Key Concept">
            <p>
              <strong>Supervised Learning</strong> trains on labeled data — both inputs (features) and outputs
              (labels) are provided. The model learns the mapping from inputs to outputs.
            </p>
            <p className="mt-2">
              <strong>Analogy:</strong> A teacher shows students many labeled examples: &quot;This is a cat, this is a dog.&quot;
              After enough examples, students can identify cats and dogs on their own.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">Classification</p>
                <p className="text-[11px] text-blue-800">Predicts a category/class. E.g., spam or not spam, cat or dog, disease or healthy.</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
                <p className="text-xs font-bold text-teal-700 mb-1">Regression</p>
                <p className="text-[11px] text-teal-800">Predicts a continuous number. E.g., house price, stock value, temperature tomorrow.</p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="2.2" title="Unsupervised Learning" tag="Key Concept">
            <p>
              <strong>Unsupervised Learning</strong> works with unlabeled data. The model discovers patterns,
              similarities, and groupings on its own — without any guidance or predefined answers.
            </p>
            <p className="mt-2">
              <strong>Analogy:</strong> A child learning to swim on their own without supervision — discovering
              techniques through self-exploration and experimentation.
            </p>
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <p className="text-xs font-bold text-emerald-700 mb-1">Clustering</p>
              <p className="text-[11px] text-emerald-800">
                Groups similar data points together. Example: a supermarket grouping customers into
                &quot;grocery shoppers&quot; and &quot;non-grocery shoppers&quot; based on purchase history — without
                anyone labeling the customers first.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard number="2.3" title="Reinforcement Learning" tag="Key Concept">
            <p>
              <strong>Reinforcement Learning</strong> enables computers to learn through repeated trial
              and error. The model receives rewards for correct actions and penalties for wrong ones —
              no labeled data is needed, just a reward signal.
            </p>
            <p className="mt-2">
              <strong>Analogy:</strong> You show an apple to a machine. It guesses &quot;cherry&quot; → negative
              feedback. Next time it guesses &quot;apple&quot; → positive feedback. Now it has learned!
            </p>
            <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl p-3">
              <p className="text-xs font-bold text-orange-700 mb-1">What Makes It Different?</p>
              <p className="text-[11px] text-orange-800">
                Unlike supervised and unsupervised learning, reinforcement learning doesn&apos;t need pre-existing
                data. It&apos;s ideal for large complex problem spaces and adaptive environments where
                the agent needs to respond to unforeseen situations.
              </p>
            </div>
          </ConceptCard>

          {/* Interactive: ML Model Types */}
          <AnimFrame id="anim-ml-models" title="Interactive: ML Model Types Playground" description="Explore supervised, unsupervised, and reinforcement learning with animated data flows and test yourself">
            <AnimMLModelTypes />
          </AnimFrame>

          <MicroCheck
            question="A Netflix-like platform recommending movies based on watch history (with no pre-defined labels) uses:"
            options={["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"]}
            correct={1}
            explanation="Netflix-style recommendations discover similar tastes and patterns from viewing history without predefined labels — this is unsupervised learning (specifically, collaborative filtering)."
          />

          <MicroCheck
            question="A bank flagging suspicious transactions where 'fraud' is NOT pre-defined uses:"
            options={["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Neural Networks"]}
            correct={1}
            explanation="When fraud isn't pre-defined, the model must identify outliers and anomalous transactions on its own — this is unsupervised learning using anomaly detection."
          />

          <ConceptCard number="2.4" title="Supervised vs Unsupervised vs Reinforcement" tag="Remember">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-2 px-3 font-bold text-gray-700">Aspect</th>
                    <th className="text-left py-2 px-3 font-bold text-blue-600">Supervised</th>
                    <th className="text-left py-2 px-3 font-bold text-emerald-600">Unsupervised</th>
                    <th className="text-left py-2 px-3 font-bold text-orange-600">Reinforcement</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Data</td>
                    <td className="py-2 px-3">Labeled</td>
                    <td className="py-2 px-3">Unlabeled</td>
                    <td className="py-2 px-3">No data — reward signal</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Goal</td>
                    <td className="py-2 px-3">Predict output</td>
                    <td className="py-2 px-3">Find patterns</td>
                    <td className="py-2 px-3">Maximise reward</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 font-medium text-gray-700">Example</td>
                    <td className="py-2 px-3">Spam filter</td>
                    <td className="py-2 px-3">Customer segmentation</td>
                    <td className="py-2 px-3">Game-playing AI</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-700">Sub-types</td>
                    <td className="py-2 px-3">Classification, Regression</td>
                    <td className="py-2 px-3">Clustering, Association</td>
                    <td className="py-2 px-3">Model-based, Model-free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptCard>
        </section>

        {/* ════════════════════════════════════════════════════════
            LESSON 3: Neural Networks
        ════════════════════════════════════════════════════════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Neural Networks" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="What is a Neural Network?" tag="Definition">
            <p>
              A <strong>neural network</strong> is a computing system inspired by the human brain.
              It consists of interconnected nodes (neurons) organised in layers that process
              information and learn patterns from data.
            </p>
            <p className="mt-2">
              Just like the human brain uses billions of neurons connected by synapses, an artificial
              neural network uses mathematical nodes connected by weighted edges to transform
              input data into meaningful output.
            </p>
          </ConceptCard>

          <ConceptCard number="3.2" title="Key Components" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["Input Layer", "Receives the raw data. Each node represents one feature (e.g., has jacket, has umbrella)."],
                ["Hidden Layer(s)", "Process information between input and output. Each node applies weights, sums inputs, and passes through an activation function."],
                ["Output Layer", "Produces the final result (e.g., 'Go to park' or 'Stay home')."],
                ["Weights", "Numbers that determine the importance of each connection. Learned during training."],
                ["Bias", "An additional value added to the weighted sum. Allows the model to shift the decision boundary."],
                ["Threshold", "The minimum value the weighted sum must exceed to produce a positive output."],
              ].map(([comp, desc]) => (
                <div key={comp} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-28 shrink-0">{comp}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="3.3" title="How a Neural Network Computes" tag="Formula">
            <p>Each neuron performs a simple calculation:</p>
            <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800">
              Output = Σ (input<sub>i</sub> × weight<sub>i</sub>) + bias
            </div>
            <p className="mt-3">
              If the output exceeds the <strong>threshold</strong>, the neuron &quot;fires&quot; (activates).
              Otherwise, it stays inactive. This simple mechanism, repeated across many neurons
              and layers, allows neural networks to learn incredibly complex patterns.
            </p>
          </ConceptCard>

          <ConceptCard number="3.4" title="The Park Decision — A Worked Example" tag="Example">
            <p>
              Imagine deciding whether to go to the park. Your inputs are: Do you have a jacket?
              An umbrella? Is it sunny? Is the forecast OK? Each input has a weight (importance)
              and there&apos;s a bias term.
            </p>
            <div className="mt-3 space-y-1.5">
              {[
                { input: "Have Jacket (1)", weight: "0.5", product: "0.5" },
                { input: "Have Umbrella (1)", weight: "0.3", product: "0.3" },
                { input: "Is Sunny (1)", weight: "0.4", product: "0.4" },
                { input: "Forecast OK (1)", weight: "0.3", product: "0.3" },
                { input: "Bias (1)", weight: "-1.0", product: "-1.0" },
              ].map(({ input, weight, product }) => (
                <div key={input} className="flex items-center gap-3 text-xs bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100">
                  <span className="w-36 text-gray-700">{input}</span>
                  <span className="text-gray-400">×</span>
                  <span className="w-12 text-center font-mono font-bold text-gray-800">{weight}</span>
                  <span className="text-gray-400">=</span>
                  <span className="w-12 text-center font-mono font-bold text-violet-600">{product}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-xs bg-violet-50 rounded-lg px-3 py-2 border border-violet-200 font-bold">
                <span className="w-36 text-violet-700">Total Sum</span>
                <span className="text-gray-400">=</span>
                <span className="w-12 text-center font-mono text-violet-700">0.5</span>
                <span className="text-violet-600">&gt; 0 (threshold) → Go to park! 🌳</span>
              </div>
            </div>
          </ConceptCard>

          {/* Interactive: Neural Network */}
          <AnimFrame id="anim-neural-net" title="Interactive: Neural Network Calculator" description="Toggle inputs and watch the network compute a decision using weights, bias, and threshold">
            <AnimNeuralNetwork />
          </AnimFrame>

          <MicroCheck
            question="In a neural network, what role does the 'bias' play?"
            options={[
              "It reduces the number of inputs",
              "It always makes the output positive",
              "It shifts the activation function so the model can fit data better",
              "It removes noise from training data",
            ]}
            correct={2}
            explanation="Bias is an additional parameter that shifts the activation function — it allows the neural network to adjust its decision boundary so it can fit the data better, even when all inputs are zero."
          />

          <MicroCheck
            question="In the park decision neural network, if the total weighted sum is -0.5 and the threshold is 0, the decision is:"
            options={[
              "Go to the park, because -0.5 is close to 0",
              "Stay home, because -0.5 is below the threshold of 0",
              "Cannot determine without more data",
              "The network needs retraining",
            ]}
            correct={1}
            explanation="Since -0.5 < 0 (the threshold), the output neuron does NOT fire, and the decision is 'Stay home'. The sum must exceed the threshold for a positive output."
          />
        </section>

        {/* ── Exit Quiz ────────────────────────────────────────────────────────── */}
        <section>
          <ExitQuiz
            moduleName="Unit 2: Advanced Concepts of Modeling in AI"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
