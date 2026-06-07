import { MessageSquare, Hash, Bot, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimNLPStages from "./_components/AnimNLPStages"
import AnimTFIDF from "./_components/AnimTFIDF"
import AnimSentimentAnalysis from "./_components/AnimSentimentAnalysis"
import LessonProgressStrip from "./_components/LessonProgressStrip"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "What is Natural Language Processing (NLP)?",
    options: [
      "A way to make computers physically speak",
      "Enabling computers to understand, interpret, and generate human language",
      "A programming language for AI",
      "A type of computer hardware",
    ],
    correct: 1,
    explanation: "NLP is a branch of AI focused on the interaction between computers and human language — enabling machines to read, understand, and derive meaning from text and speech.",
  },
  {
    question: "The first step in NLP text processing is usually:",
    options: ["Stemming", "TF-IDF calculation", "Tokenization", "Translation"],
    correct: 2,
    explanation: "Tokenization is typically the first step — splitting raw text into individual tokens (words, phrases, or characters) that can then be processed further.",
  },
  {
    question: "Stop words are:",
    options: [
      "Words that cause errors in NLP",
      "Common words (the, is, and) removed because they carry little meaning",
      "Technical programming terms",
      "Words that stop the algorithm",
    ],
    correct: 1,
    explanation: "Stop words like 'the', 'is', 'and', 'a' are extremely common but carry little semantic meaning. Removing them helps NLP focus on content-rich words.",
  },
  {
    question: "Stemming reduces 'running' to:",
    options: ["running", "runs", "run", "runner"],
    correct: 2,
    explanation: "Stemming reduces words to their root form: 'running' → 'run', 'cats' → 'cat', 'played' → 'play'. This normalises different forms of the same word.",
  },
  {
    question: "In TF-IDF, a high TF-IDF score means the term is:",
    options: [
      "Common across all documents",
      "Important in this specific document but rare in others",
      "A stop word",
      "Misspelled",
    ],
    correct: 1,
    explanation: "TF-IDF = TF × IDF. A high score means the term appears frequently in THIS document (high TF) but rarely in other documents (high IDF) — making it distinctive and important.",
  },
  {
    question: "If a term appears in ALL documents, its IDF will be:",
    options: ["Very high", "Zero (log₁₀(1) = 0)", "Negative", "Infinity"],
    correct: 1,
    explanation: "IDF = log₁₀(N/docs_with_term). If a term appears in all N documents, IDF = log₁₀(N/N) = log₁₀(1) = 0. Common terms get zero IDF, zeroing out their TF-IDF.",
  },
  {
    question: "TF (Term Frequency) is calculated as:",
    options: [
      "Number of documents containing the term",
      "Count of term in document / total terms in document",
      "Total terms in all documents",
      "Inverse of document frequency",
    ],
    correct: 1,
    explanation: "TF = (number of times term appears in document) / (total number of terms in document). It measures how frequently a term occurs within a single document.",
  },
  {
    question: "A rule-based chatbot differs from an AI chatbot because:",
    options: [
      "Rule-based uses pre-defined if-then rules; AI learns from data",
      "Rule-based is more intelligent",
      "AI chatbots don't use language",
      "There is no difference",
    ],
    correct: 0,
    explanation: "Rule-based chatbots follow pre-defined if-then rules and can only handle anticipated inputs. AI chatbots learn from data and can handle a wider range of conversations.",
  },
  {
    question: "Sentiment Analysis classifies text into:",
    options: [
      "Languages (English, Hindi, French)",
      "Positive, negative, or neutral",
      "Long or short",
      "Formal or informal",
    ],
    correct: 1,
    explanation: "Sentiment analysis determines the emotional tone of text — classifying it as positive (happy, good), negative (sad, bad), or neutral (no strong opinion).",
  },
  {
    question: "Which of these is NOT an NLP application?",
    options: [
      "Google Translate",
      "Siri / Alexa voice assistants",
      "Face recognition in photos",
      "Spam email detection",
    ],
    correct: 2,
    explanation: "Face recognition is a Computer Vision (CV) application, not NLP. The others — translation, voice assistants, and spam detection — all process human language.",
  },
]

// ── CBSE Syllabus accordion ────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Define NLP and explain its importance in AI.",
    "Describe the NLP pipeline: tokenization, stop word removal, stemming/lemmatization.",
    "Explain the Bag of Words model.",
    "Calculate TF, IDF, and TF-IDF for given documents.",
    "Differentiate between rule-based and AI chatbots.",
    "Understand sentiment analysis and its applications.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 6 — Official Learning Outcomes</span>
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
            <p className="text-sm font-bold text-gray-900 mt-0.5">27h</p>
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
      title: "NLP Fundamentals",
      time: "~40 min",
      topics: ["Tokenization", "Stop Words", "Stemming", "Bag of Words"],
      feature: "Interactive NLP pipeline walkthrough",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "TF-IDF",
      time: "~45 min",
      topics: ["Term Frequency", "IDF", "TF-IDF Score"],
      feature: "WOW: Live TF-IDF calculator",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "NLP Applications",
      time: "~35 min",
      topics: ["Chatbots", "Sentiment Analysis", "Translation"],
      feature: "Interactive sentiment analyser",
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

export default function Module6Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ── */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <MessageSquare size={200} className="absolute -right-10 -top-8 text-orange-500 opacity-[0.07]" />
          <Hash size={72} className="absolute right-44 top-6 text-violet-400 opacity-[0.06] rotate-6" />
          <Bot size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 6 of 6
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~42 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 8 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Natural Language Processing
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Three lessons: understand how AI processes human language through NLP stages,
            master the TF-IDF algorithm for measuring term importance, and explore applications
            like chatbots, sentiment analysis, and translation.
          </p>
        </div>
      </div>

      <div className="mt-6"><CBSEAccordion /></div>

      <div className="py-10 space-y-16">
        <LessonMap />

        <ObjectivesCard
          objectives={[
            "Define Natural Language Processing and explain why it's challenging for computers.",
            "Describe the NLP pipeline: tokenization → stop word removal → stemming/lemmatization.",
            "Explain the Bag of Words model and its limitations.",
            "Calculate Term Frequency (TF), Inverse Document Frequency (IDF), and TF-IDF.",
            "Differentiate between rule-based and AI-powered chatbots.",
            "Explain sentiment analysis and how it classifies text.",
            "Identify real-world NLP applications: translation, voice assistants, spam detection.",
          ]}
        />

        {/* ════ LESSON 1: NLP Fundamentals ════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="NLP Fundamentals" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="What is NLP?" tag="Definition">
            <p>
              <strong>Natural Language Processing</strong> is a branch of AI that helps computers
              understand, interpret, and generate human language. Unlike programming languages that
              follow strict rules, human language is ambiguous, contextual, and constantly evolving.
            </p>
            <p className="mt-2">
              NLP bridges the gap between human communication and computer understanding — enabling
              machines to read text, understand speech, and respond meaningfully.
            </p>
          </ConceptCard>

          <ConceptCard number="1.2" title="The NLP Pipeline" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["1. Tokenization", "Split text into individual words or tokens. \"The cat sat\" → [\"The\", \"cat\", \"sat\"]"],
                ["2. Stop Word Removal", "Remove common words (the, is, and, a) that don't carry meaning."],
                ["3. Stemming/Lemmatization", "Reduce words to their root form. \"running\" → \"run\", \"cats\" → \"cat\""],
                ["4. Feature Extraction", "Convert text into numerical representations the model can process."],
              ].map(([step, desc]) => (
                <div key={step} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-40 shrink-0">{step}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <AnimFrame id="anim-nlp-stages" title="Interactive: NLP Pipeline" description="Step through tokenization, stop word removal, and stemming on a sample sentence">
            <AnimNLPStages />
          </AnimFrame>

          <ConceptCard number="1.3" title="Bag of Words Model" tag="Key Concept">
            <p>
              The <strong>Bag of Words</strong> model represents text as a collection of word counts,
              ignoring grammar and word order. Each document becomes a vector of word frequencies.
            </p>
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs font-bold text-amber-700 mb-1">Limitation</p>
              <p className="text-[11px] text-amber-800">
                BoW ignores word order: &quot;dog bites man&quot; and &quot;man bites dog&quot; have the same
                representation — even though they mean completely different things!
              </p>
            </div>
          </ConceptCard>

          <MicroCheck
            question="The first step in NLP text processing is usually:"
            options={["Stemming", "Translation", "Tokenization", "TF-IDF"]}
            correct={2}
            explanation="Tokenization splits raw text into individual tokens (words) — it's the first step before any further processing like stop word removal or stemming can happen."
          />

          <MicroCheck
            question="Stemming reduces 'playing' to:"
            options={["playing", "plays", "play", "played"]}
            correct={2}
            explanation="Stemming reduces words to their root/base form: 'playing' → 'play', 'running' → 'run', 'cats' → 'cat'. This normalises different word forms."
          />
        </section>

        {/* ════ LESSON 2: TF-IDF ════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="TF-IDF" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="Term Frequency (TF)" tag="Formula">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800 mb-3">
              TF(t, d) = count of t in d / total terms in d
            </div>
            <p>
              <strong>Term Frequency</strong> measures how often a term appears in a single document.
              A higher TF means the term is more frequent in that document.
            </p>
          </ConceptCard>

          <ConceptCard number="2.2" title="Inverse Document Frequency (IDF)" tag="Formula">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800 mb-3">
              IDF(t) = log₁₀(total docs / docs containing t)
            </div>
            <p>
              <strong>IDF</strong> measures how rare or common a term is across all documents.
              Terms that appear everywhere get low IDF (less important), while rare terms get high IDF.
            </p>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs font-bold text-blue-700 mb-1">Key Insight</p>
              <p className="text-[11px] text-blue-800">
                If a term appears in ALL documents, IDF = log₁₀(1) = 0, making its TF-IDF zero.
                Common terms are automatically downweighted.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard number="2.3" title="TF-IDF Score" tag="Formula">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800 mb-3">
              TF-IDF(t, d) = TF(t, d) × IDF(t)
            </div>
            <p>
              <strong>TF-IDF</strong> combines both metrics. High TF-IDF means a term is frequent in
              this document BUT rare in others — making it <em>distinctive</em> for this document.
            </p>
          </ConceptCard>

          <AnimFrame id="anim-tfidf" title="Interactive: TF-IDF Calculator" description="See live TF, IDF, and TF-IDF calculations across multiple documents with heat-mapped values">
            <AnimTFIDF />
          </AnimFrame>

          <MicroCheck
            question="A high TF-IDF score for a term means:"
            options={[
              "The term appears in every document",
              "The term is important in this document but rare overall",
              "The term is a stop word",
              "The term is misspelled",
            ]}
            correct={1}
            explanation="TF-IDF = TF × IDF. High score = high frequency in THIS doc (high TF) AND rare across other docs (high IDF). This makes the term distinctive and important for that specific document."
          />

          <MicroCheck
            question="If a term appears in all 5 documents, its IDF is:"
            options={["5", "1", "0", "0.5"]}
            correct={2}
            explanation="IDF = log₁₀(5/5) = log₁₀(1) = 0. When a term appears in ALL documents, it's not distinctive for any single document, so IDF becomes zero."
          />
        </section>

        {/* ════ LESSON 3: Applications ════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="NLP Applications" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="Chatbots" tag="Key Concept">
            <div className="grid sm:grid-cols-2 gap-3 mt-1">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">Rule-Based Chatbots</p>
                <p className="text-[11px] text-blue-800">
                  Follow pre-defined if-then rules. Can only handle anticipated inputs.
                  Simple but limited. Example: FAQ bots.
                </p>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
                <p className="text-xs font-bold text-violet-700 mb-1">AI-Based Chatbots</p>
                <p className="text-[11px] text-violet-800">
                  Learn from data using NLP and ML. Can handle a wide range of conversations.
                  More flexible. Example: ChatGPT, Google Assistant.
                </p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="3.2" title="Sentiment Analysis" tag="Key Concept">
            <p>
              <strong>Sentiment Analysis</strong> determines the emotional tone of text — classifying
              it as <strong>positive</strong>, <strong>negative</strong>, or <strong>neutral</strong>.
            </p>
            <div className="mt-3 space-y-2">
              {[
                ["📱 Product Reviews", "\"This phone is amazing!\" → Positive"],
                ["🐦 Social Media", "\"Worst customer service ever\" → Negative"],
                ["📰 News Analysis", "\"Company reports quarterly earnings\" → Neutral"],
              ].map(([app, ex]) => (
                <div key={app} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-32 shrink-0">{app}</span>
                  <span className="text-xs text-gray-600">{ex}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <AnimFrame id="anim-sentiment" title="Interactive: Sentiment Analyser" description="Type any sentence and see real-time sentiment scoring with word-level contributions">
            <AnimSentimentAnalysis />
          </AnimFrame>

          <ConceptCard number="3.3" title="Other NLP Applications" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["🌐 Machine Translation", "Google Translate — converting text between languages using NLP models."],
                ["🗣️ Voice Assistants", "Siri, Alexa, Google Assistant — convert speech to text, process it, then respond."],
                ["📧 Spam Detection", "Email filters analyse text patterns to classify messages as spam or legitimate."],
                ["📝 Text Summarisation", "Automatically creating shorter summaries of long articles or documents."],
              ].map(([app, desc]) => (
                <div key={app} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-36 shrink-0">{app}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <MicroCheck
            question="A rule-based chatbot differs from an AI chatbot because:"
            options={[
              "Rule-based uses pre-defined if-then rules; AI learns from data",
              "Rule-based is more intelligent",
              "AI chatbots can't understand language",
              "There is no difference",
            ]}
            correct={0}
            explanation="Rule-based chatbots follow fixed if-then rules and can only handle anticipated inputs. AI chatbots use NLP and ML to learn from data and handle a much wider range of conversations."
          />

          <MicroCheck
            question="Which of these is NOT an NLP application?"
            options={["Google Translate", "Voice assistants", "Face recognition", "Spam detection"]}
            correct={2}
            explanation="Face recognition is Computer Vision (CV), not NLP. Translation, voice assistants, and spam detection all process human language — they're NLP applications."
          />
        </section>

        {/* ── Exit Quiz ── */}
        <section>
          <ExitQuiz
            moduleName="Unit 6: Natural Language Processing"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
