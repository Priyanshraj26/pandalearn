import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimAIDomains from "../_components/AnimAIDomains"
import AIDomainsGames from "../_components/AIDomainsGames"
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

export default function Lesson1() {
  return (
    <LessonShell>
      <ObjectivesCard
        objectives={[
          "Define Artificial Intelligence in your own words.",
          "Identify the three domains of AI: NLP, Computer Vision, and Data Statistics.",
          "Give real-world examples of each domain from everyday apps.",
          "Explain how AI is different from regular programming.",
        ]}
      />

      <section className="space-y-6">
        <SectionHeading n="01" title="What is AI? The Three Realms" lesson="Lesson 1 of 3" />

        <ConceptCard number="1.1" title="What is Artificial Intelligence?" tag="Definition">
          <p>
            <strong>Artificial Intelligence (AI)</strong> is the ability of a computer system to perform tasks
            that normally require human intelligence  such as understanding language, recognising images,
            making decisions, and predicting future events.
          </p>
          <p className="mt-2">
            AI is not magic. At its core, AI is <strong>pattern recognition at scale</strong>  a system
            that finds regularities in data and uses them to make useful predictions or decisions.
          </p>
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { label: "Human task",  ex: "Reading an X-ray"        },
              { label: "AI does it",  ex: "Detects cancer in 0.1s"  },
              { label: "How?",        ex: "Trained on 100,000 scans" },
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
              { year: "1950", event: "Alan Turing proposes the 'Turing Test'  can a machine think?" },
              { year: "1956", event: "The term 'Artificial Intelligence' is coined at Dartmouth College." },
              { year: "1997", event: "IBM Deep Blue defeats world chess champion Garry Kasparov." },
              { year: "2012", event: "Deep learning revolution  AlexNet wins ImageNet by a huge margin." },
              { year: "2016", event: "AlphaGo defeats Go world champion  a game considered too complex for computers." },
              { year: "2022", event: "ChatGPT launches  100 million users in 2 months. Generative AI enters the mainstream." },
            ].map(({ year, event }) => (
              <div key={year} className="flex items-start gap-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 bg-gray-100 text-gray-600">{year}</span>
                <p className="text-xs text-gray-700 leading-relaxed">{event}</p>
              </div>
            ))}
          </div>
        </ConceptCard>

        <ConceptCard number="1.3" title="The Three Domains of AI" tag="Key Concept">
          <p>The CBSE AI curriculum organises AI into three intersecting domains. Real-world AI systems often combine all three.</p>
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { domain: "NLP",             desc: "Understand & generate human language"   },
              { domain: "Computer Vision", desc: "Interpret images, video & spatial data" },
              { domain: "Data Statistics", desc: "Find patterns in numbers & predictions" },
            ].map(({ domain, desc }) => (
              <div key={domain} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="font-bold text-xs text-gray-800">{domain}</p>
                <p className="text-[11px] mt-1 text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </ConceptCard>

        <AnimFrame id="anim-ai-domains" title="Interactive: The Three Domains of AI" description="Click a domain to explore it · auto-cycles every 4 seconds">
          <AnimAIDomains />
        </AnimFrame>

        <AIDomainsGames />

        <MicroCheck
          question="Netflix recommending movies uses which AI domain?"
          options={["Natural Language Processing", "Computer Vision", "Data Statistics & Pattern Recognition", "Robotics"]}
          correct={2}
          explanation="Netflix analyses your watch history, ratings, viewing times, and compares them with similar users  all numerical pattern analysis. This is Data Statistics-based AI."
        />

        <MicroCheck
          question="Google Translate converting Hindi to English uses which AI domain?"
          options={["Data Statistics", "Computer Vision", "Natural Language Processing", "Sensor Fusion"]}
          correct={2}
          explanation="Translation requires understanding the structure, meaning, and grammar of human language  which is exactly what NLP (Natural Language Processing) does."
        />
      </section>
    </LessonShell>
  )
}
