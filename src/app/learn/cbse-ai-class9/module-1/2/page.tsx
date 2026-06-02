import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import AnimProjectCycle from "../_components/AnimProjectCycle"
import AnimModelLearning from "../_components/AnimModelLearning"
import AnimProjectSandbox from "../_components/AnimProjectSandbox"
import Canvas4Ws from "../_components/Canvas4Ws"
import ConfusionMatrixClassifier from "../_components/ConfusionMatrixClassifier"
import LessonShell from "../_components/LessonShell"

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

export default function Lesson2() {
  return (
    <LessonShell>
      <section className="space-y-6">
        <SectionHeading n="02" title="The AI Project Cycle" lesson="Lesson 2 of 3" />

        <ConceptCard number="2.1" title="The 6-Step AI Project Cycle" tag="Key Concept">
          <p>
            Every AI project  from a classroom experiment to a hospital diagnostic system  follows the
            same iterative cycle. The key word is <strong>iterative</strong>: you can always loop back
            to an earlier step when new information arrives.
          </p>
          <div className="mt-3 space-y-1.5">
            {[
              ["01 Problem Scoping",   "Define the problem using the 4Ws canvas. Set clear goals."],
              ["02 Data Acquisition",  "Gather the right data from reliable sources."],
              ["03 Data Exploration",  "Visualise and understand patterns in your data."],
              ["04 Modeling",          "Build the AI  rule-based or learning-based."],
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
              { w: "WHO",   q: "Who is affected by this problem?",   ex: "Patients in rural areas without hospital access" },
              { w: "WHAT",  q: "What exactly is the problem?",       ex: "Late diagnosis of diseases due to lack of doctors" },
              { w: "WHERE", q: "Where does this problem occur?",     ex: "Districts with fewer than 1 doctor per 1,000 people" },
              { w: "WHEN",  q: "When and how often does it occur?",  ex: "Especially during monsoon when travel is difficult" },
            ].map(({ w, q, ex }) => (
              <div key={w} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-sm font-bold text-violet-600 mb-1">{w}</p>
                <p className="text-xs font-semibold text-gray-800">{q}</p>
                <p className="text-xs text-gray-500 mt-1 italic">{ex}</p>
              </div>
            ))}
          </div>
        </ConceptCard>

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
                  ["How it works",   "Humans write explicit IF-THEN rules",           "AI discovers patterns from labelled data"],
                  ["Needs data?",    "No  just expert knowledge",                    "Yes  large datasets required"],
                  ["Flexibility",    "Brittle  fails on new scenarios",              "Adapts to new data naturally"],
                  ["Explainability", "Fully explainable",                             "Often a 'black box'"],
                  ["Example",        "Email spam filter based on keywords",           "Gmail's neural spam classifier"],
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

        <AnimFrame id="anim-model-learning" title="Interactive: How a Learning-Based Model Processes Data" description="Watch signals propagate from raw features through hidden layers to a final prediction">
          <AnimModelLearning />
        </AnimFrame>

        <MicroCheck
          question="In a learning-based AI model, what is the main role of hidden layers?"
          options={["Store the original training data unchanged", "Detect patterns and combine features into complex representations", "Output the final class probabilities directly", "Clean and normalise the raw input data"]}
          correct={1}
          explanation="Hidden layers are where learning happens. Earlier layers detect simple patterns, while deeper layers combine those into increasingly complex features  enabling the output layer to make an accurate prediction."
        />

        <ConceptCard number="2.4" title="Evaluation: The Confusion Matrix" tag="Key Concept">
          <p>After training, you must test your model honestly. The <strong>Confusion Matrix</strong> breaks down results into four categories:</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { term: "True Positive (TP)",  desc: "Predicted POSITIVE. Actual is POSITIVE. Correct." },
              { term: "False Positive (FP)", desc: "Predicted POSITIVE. Actual is NEGATIVE. False alarm." },
              { term: "False Negative (FN)", desc: "Predicted NEGATIVE. Actual is POSITIVE. Missed  most dangerous in medicine!" },
              { term: "True Negative (TN)",  desc: "Predicted NEGATIVE. Actual is NEGATIVE. Correct." },
            ].map(({ term, desc }) => (
              <div key={term} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="font-bold text-xs text-gray-800">{term}</p>
                <p className="text-[11px] mt-1 leading-snug text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </ConceptCard>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-xs font-bold text-amber-700">
              Hands-On Activity
            </span>
            <span className="text-xs text-gray-400">Classify 12 real-world scenarios as TP / FP / TN / FN</span>
          </div>
          <ConfusionMatrixClassifier />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700">
              WOW Activity
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
          question="An AI model predicts a patient does NOT have cancer, but they actually do. This is a…"
          options={["True Positive", "False Positive", "True Negative", "False Negative"]}
          correct={3}
          explanation="The model predicted NEGATIVE (no cancer) but reality was POSITIVE (has cancer). This is a False Negative  and in healthcare, it's the most dangerous type of error."
        />

        <MicroCheck
          question="Which type of model learns from thousands of labelled examples without humans writing explicit rules?"
          options={["Rule-based model", "Decision flowchart", "Learning-based (ML) model", "Expert system"]}
          correct={2}
          explanation="A learning-based (machine learning) model automatically discovers patterns in training data. Humans don't write the rules  the model learns them."
        />
      </section>
    </LessonShell>
  )
}
