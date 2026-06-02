import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import AnimEthicsScenario from "../_components/AnimEthicsScenario"
import AnimBalloonDebate from "../_components/AnimBalloonDebate"
import LessonShell from "../_components/LessonShell"

const QUIZ: QuizQuestion[] = [
  {
    question: "Which of the three domains of AI focuses on understanding and generating human language?",
    options: ["Computer Vision", "Natural Language Processing", "Data Statistics", "Robotics"],
    correct: 1,
    explanation: "NLP enables AI to understand, interpret, and generate human language — powering tools like Google Translate, ChatGPT, and smart assistants.",
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
    explanation: "The 4Ws are: Who is affected, What is the problem, Where does it occur, and When does it happen.",
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
    question: "An AI hiring tool trained on mostly-male historical data later rejects female applicants unfairly. What kind of bias is this?",
    options: ["Measurement Bias", "Sampling Bias", "Historical Bias", "Random Error"],
    correct: 2,
    explanation: "Historical Bias occurs when past human decisions (e.g., hiring mostly men) are baked into the training data. The AI learns to repeat historical discrimination.",
  },
  {
    question: "In the AI Project Cycle, which step comes immediately AFTER Evaluation?",
    options: ["Problem Scoping", "Data Acquisition", "Modeling", "Deployment"],
    correct: 3,
    explanation: "The cycle is: Scope → Data Acquisition → Data Exploration → Modeling → Evaluation → Deployment. After evaluation confirms the model is good enough, you deploy it.",
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
    explanation: "AI learns from human-generated data, which can contain historical biases. The AI then amplifies those biases at scale — making ethics a concern from the very first step.",
  },
]

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

export default function Lesson3() {
  return (
    <LessonShell>
      <section className="space-y-6">
        <SectionHeading n="03" title="AI Ethics, Bias &amp; Access" lesson="Lesson 3 of 3" />

        <ConceptCard number="3.1" title="What is AI Ethics?" tag="Definition">
          <p>
            <strong>AI Ethics</strong> is the field concerned with the moral principles and social
            implications of AI systems — ensuring they are fair, transparent, accountable, and beneficial
            to all of humanity, not just a privileged few.
          </p>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {[
              ["Fairness",       "AI outcomes should not discriminate based on race, gender, age, or region."],
              ["Transparency",   "People affected by AI decisions should be able to understand and challenge them."],
              ["Accountability", "Someone must be responsible when AI causes harm."],
              ["Privacy",        "AI should not collect or misuse personal data without consent."],
            ].map(([p, d]) => (
              <div key={p} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-bold text-gray-800">{p}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{d}</p>
              </div>
            ))}
          </div>
        </ConceptCard>

        <ConceptCard number="3.2" title="AI Bias: When AI Learns Our Prejudices" tag="Warning">
          <p>AI bias occurs when a model produces systematically unfair results for certain groups. Bias almost always originates in the <strong>training data</strong>.</p>
          <div className="mt-3 space-y-2">
            {[
              { type: "Historical Bias",     ex: "A hiring AI trained on past decisions (mostly male hires) continues to prefer male candidates." },
              { type: "Representation Bias", ex: "A facial recognition system trained mostly on light-skinned faces performs poorly on dark-skinned faces." },
              { type: "Measurement Bias",    ex: "Using 'zip code' as a loan-risk feature indirectly discriminates by neighbourhood." },
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
            The <strong>digital divide</strong> means that wealthier countries, urban areas, and educated
            populations gain disproportionately from AI, while others are left behind — or actively harmed.
          </p>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
              <p className="text-xs font-bold text-violet-700 mb-1.5">Who benefits most?</p>
              <ul className="space-y-1">
                {["Tech-savvy urban users", "English-speaking populations", "People with fast internet", "Data-rich organisations"].map(i => (
                  <li key={i} className="text-[11px] text-violet-800 flex items-start gap-1.5"><span>+</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-xs font-bold text-gray-600 mb-1.5">Who is left behind?</p>
              <ul className="space-y-1">
                {["Rural communities with low connectivity", "Non-English speakers", "Older adults unfamiliar with technology", "Low-income populations"].map(i => (
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
                  "Increases accessibility (e.g., real-time translation)",
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

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-bold text-violet-700">
              Roleplay Activity
            </span>
            <span className="text-xs text-gray-400">CBSE Ethics Awareness — stakeholder perspectives on an AI hiring incident</span>
          </div>
          <AnimEthicsScenario />
        </div>

        <ConceptCard number="3.5" title="The Balloon Debate — Arguing Both Sides of AI" tag="Example">
          <p>
            The CBSE Balloon Debate asks you to argue <em>either</em> for or against AI on a specific
            real-world topic. The goal is to understand that every technology has genuine benefits AND
            genuine harms that must both be taken seriously.
          </p>
          <div className="mt-3 grid sm:grid-cols-3 gap-2">
            {[
              { topic: "Healthcare AI", q: "Should AI diagnose diseases in rural India?",  color: "#EF4444" },
              { topic: "AI in Hiring",  q: "Should AI screen job applications?",           color: "#F97316" },
              { topic: "AI & Jobs",     q: "Should trucks be automated with AI?",          color: "#8B5CF6" },
            ].map(d => (
              <div key={d.topic} className="rounded-xl p-2.5 border text-center" style={{ borderColor: d.color + "30", background: d.color + "06" }}>
                <p className="text-[11px] font-bold mb-0.5" style={{ color: d.color }}>{d.topic}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{d.q}</p>
              </div>
            ))}
          </div>
        </ConceptCard>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700">
              Balloon Debate
            </span>
            <span className="text-xs text-gray-400">CBSE Activity — choose your team, reveal arguments, cast your verdict</span>
          </div>
          <AnimBalloonDebate />
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

      <ExitQuiz
        moduleName="Unit 1: AI Reflection, Project Cycle & Ethics"
        questions={QUIZ}
        passThreshold={7}
      />
    </LessonShell>
  )
}
