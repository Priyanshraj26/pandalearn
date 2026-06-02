import { Lightbulb, Sparkles, Shield, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import LessonProgressStrip from "@/app/learn/cbse-ai-class9/module-1/_components/LessonProgressStrip"
import AnimGenAITypes from "./_components/AnimGenAITypes"
import AnimHallucinationGame from "./_components/AnimHallucinationGame"
import AnimPromptLab from "./_components/AnimPromptLab"

// â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const QUIZ: QuizQuestion[] = [
  {
    question: "What is the key difference between Generative AI and Conventional AI?",
    options: [
      "Generative AI is faster than conventional AI",
      "Generative AI creates new content (text, images, audio); conventional AI classifies or predicts from input",
      "Conventional AI requires more data than generative AI",
      "Generative AI can only work with text, not images",
    ],
    correct: 1,
    explanation: "Conventional AI takes an input and produces a label or decision (e.g. spam/not-spam). Generative AI takes an input and creates new, original content â€” an essay, an image, a piece of music â€” that didn't exist before.",
  },
  {
    question: "Which technology do tools like DALL-E and Midjourney use to generate images from text?",
    options: ["Recurrent Neural Networks (RNN)", "Diffusion Models", "Decision Trees", "Bayesian Networks"],
    correct: 1,
    explanation: "Image generation tools like DALL-E 3, Midjourney, and Stable Diffusion use Diffusion Models â€” they start with random noise and gradually refine it into a coherent image guided by the text prompt.",
  },
  {
    question: "An AI confidently states that Albert Einstein failed mathematics in school. This is an example of:",
    options: ["A factual error by the student", "AI Hallucination â€” generating plausible but false information", "A correct historical fact", "A programming bug"],
    correct: 1,
    explanation: "AI Hallucination is when a model generates text that sounds plausible and confident but is factually wrong. Einstein actually excelled at mathematics. AIs hallucinate because they predict likely-sounding text, not verified facts.",
  },
  {
    question: "Which of the following is the MOST effective way to improve a bad AI prompt?",
    options: [
      "Make the prompt shorter",
      "Add more punctuation",
      "Add context, specify audience, format, length, and what to avoid",
      "Use all capital letters",
    ],
    correct: 2,
    explanation: "Good prompts include: who the audience is, what format is needed (bullets, essay, table), the length, the tone, and constraints on what NOT to include. Vague short prompts produce generic outputs; specific detailed prompts produce targeted, useful outputs.",
  },
  {
    question: "A student submits an essay written entirely by ChatGPT as their own work. Which ethical principle is violated?",
    options: [
      "Data Privacy",
      "Academic integrity â€” passing off AI work as your own is dishonest",
      "Copyright of the AI company",
      "No principle is violated â€” AI output is free to use",
    ],
    correct: 1,
    explanation: "Submitting AI-generated work as your own violates academic integrity. You claim credit for work you did not do and miss the actual learning. Most schools now have AI-use policies requiring disclosure.",
  },
  {
    question: "Which type of Generative AI would you use to create a background music track for a school video project?",
    options: ["Text Generation AI", "Code Generation AI", "Audio Generation AI", "Computer Vision AI"],
    correct: 2,
    explanation: "Audio Generation AI (tools like Suno, ElevenLabs) generates music and speech from text descriptions. For background music, you would describe the mood, genre, and tempo to an audio AI.",
  },
  {
    question: "What is a deepfake?",
    options: [
      "A very deep neural network for image recognition",
      "A type of data storage technology",
      "AI-generated realistic fake video or audio of a real person saying or doing something they never did",
      "A method to detect AI-generated content",
    ],
    correct: 2,
    explanation: "A deepfake uses AI (specifically Generative Adversarial Networks or diffusion models) to create hyperrealistic fake video/audio of real people. Creating or sharing deepfakes of real people without consent is unethical and potentially illegal under India's IT Act.",
  },
  {
    question: "A prompt says: 'Explain photosynthesis to a Class 9 student using a factory analogy in 150 words.' What technique does this demonstrate?",
    options: [
      "Jailbreaking the AI",
      "Prompt engineering â€” using context, analogy, audience, and length to improve output",
      "Reducing AI bias",
      "Training a new AI model",
    ],
    correct: 1,
    explanation: "This is prompt engineering â€” deliberately crafting the prompt with: audience (Class 9), analogy instruction, and length constraint. Each element guides the AI to produce a more useful, targeted response compared to simply asking 'explain photosynthesis'.",
  },
  {
    question: "Which of these is a LIMITATION of Generative AI?",
    options: [
      "It can generate text in multiple languages",
      "It can produce images from text descriptions",
      "It can confidently state false information (hallucination) with no indication of uncertainty",
      "It can be used to write code",
    ],
    correct: 2,
    explanation: "Hallucination â€” generating convincing but false information with no uncertainty signal â€” is one of the most serious limitations of current GenAI systems. Unlike a human expert who says 'I'm not sure', AI often presents wrong facts with the same confident tone as correct ones.",
  },
  {
    question: "India's IT Act / DPDP Act is most relevant to GenAI in which scenario?",
    options: [
      "A student uses GenAI to help understand a maths concept",
      "An AI tool generates background music for a school event",
      "Someone creates and shares a non-consensual deepfake image of a real classmate",
      "A teacher uses AI to generate quiz questions",
    ],
    correct: 2,
    explanation: "Creating non-consensual fake images of real identifiable people (deepfakes) violates both ethical norms and legal provisions under India's IT Act (Section 66D â€” identity impersonation using computer resources) and the DPDP Act (personal data misuse). Sharing amplifies the harm.",
  },
]

// â”€â”€ CBSE Accordion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CBSEAccordion() {
  const outcomes = [
    "Define Generative AI and distinguish it from Conventional AI.",
    "Classify different types of Generative AI: text, image, audio, video, code.",
    "Explain how Generative AI works â€” how LLMs predict text, how diffusion models create images.",
    "Describe real-world applications of Generative AI tools.",
    "Identify benefits of using Generative AI (speed, accessibility, creativity).",
    "Understand limitations: hallucinations, deepfakes, copyright, bias.",
    "Apply basic prompt engineering principles to get better AI outputs.",
    "Recognise and apply ethical principles to the use of Generative AI.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 Â· Unit 4 â€” Official Learning Outcomes</span>
        <ChevronDown size={14} className="text-violet-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-5 py-4 bg-white space-y-4">
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
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          {[["Theory Hours", "8h"], ["Practical Hours", "12h"], ["Max Marks", "5M"]].map(([l, v]) => (
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

// â”€â”€ Lesson Map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "#lesson-01",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "What is Generative AI?",
      time: "~30 min",
      topics: ["GenAI vs Conventional AI", "5 Types of GenAI", "How LLMs & Diffusion work", "Real tools"],
      feature: "5-type interactive explorer",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#EF4444", bg: "#FEF2F2", textColor: "text-red-700",
      title: "Applications, Hallucinations & Deepfakes",
      time: "~45 min",
      topics: ["Benefits of GenAI", "Hallucinations", "Deepfakes", "Real vs AI-generated"],
      feature: "WOW: Spot the Hallucination game",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#10B981", bg: "#ECFDF5", textColor: "text-emerald-700",
      title: "Prompt Engineering & Ethical Use",
      time: "~45 min",
      topics: ["What is prompt engineering?", "Bad vs good prompts", "GenAI ethics", "Academic integrity"],
      feature: "Prompt Lab + Ethics scenarios",
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

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Module4Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* Hero */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Sparkles size={200} className="absolute -right-10 -top-8 text-violet-500 opacity-[0.07]" />
          <Lightbulb size={72} className="absolute right-44 top-6 text-orange-400 opacity-[0.06] rotate-6" />
          <Shield size={60} className="absolute right-28 bottom-4 text-red-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 4 of 5
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40"><Target size={11} /> 5 marks Â· CBSE 417</span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Introduction to Generative AI
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            ChatGPT, DALL-E, Suno, GitHub Copilot â€” Generative AI is reshaping every creative and technical
            field. This module explains how it actually works, shows you its genuine limitations
            (hallucinations, deepfakes), teaches you to write better prompts, and asks the hard questions
            about when and how it should be used ethically.
          </p>
        </div>
      </div>

      <div className="mt-6"><CBSEAccordion /></div>

      <div className="py-10 space-y-16">

        <LessonMap />

        <ObjectivesCard
          objectives={[
            "Define Generative AI and explain how it differs from conventional AI.",
            "Identify and give examples of the 5 types of GenAI: text, image, audio, video, code.",
            "Explain how Large Language Models (LLMs) generate text using prediction.",
            "Identify AI hallucinations and distinguish AI-generated content from human-created content.",
            "Describe the benefits and limitations of using Generative AI tools.",
            "Write better prompts using context, audience, format and constraint techniques.",
            "Apply ethical guidelines to the use of GenAI in school and daily life.",
          ]}
        />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            LESSON 1 â€” What is Generative AI?
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="What is Generative AI?" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="Generative AI vs Conventional AI" tag="Definition">
            <p>
              <strong>Conventional AI</strong> takes an input and produces a classification or prediction â€”
              yes/no, a category, a number. <strong>Generative AI</strong> takes an input and creates
              entirely new content that did not previously exist.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2 font-bold text-gray-600 border border-gray-200">Aspect</th>
                    <th className="text-left px-3 py-2 font-bold text-violet-600 border border-gray-200">Generative AI</th>
                    <th className="text-left px-3 py-2 font-bold text-blue-600 border border-gray-200">Conventional AI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Goal",     "Create new content",                    "Classify / predict"],
                    ["Output",   "Text, image, audio, video, code",       "Label, score, decision"],
                    ["Input",    "A prompt or description",               "Structured data or features"],
                    ["Example",  "Write me a poem about the monsoon",     "Is this email spam? â†’ Yes/No"],
                    ["Training", "Self-supervised on enormous datasets",  "Supervised on labelled examples"],
                  ].map(([a, b, c]) => (
                    <tr key={a} className="border border-gray-200">
                      <td className="px-3 py-2 font-semibold text-gray-700">{a}</td>
                      <td className="px-3 py-2 text-violet-700">{b}</td>
                      <td className="px-3 py-2 text-blue-700">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ConceptCard>

          <ConceptCard number="1.2" title="5 Types of Generative AI" tag="Key Concept">
            <p>
              Generative AI creates five main types of content. Each uses different underlying architecture
              and is trained on different data:
            </p>
            <div className="mt-3 space-y-2">
              {[
                { type: "Text",  color: "#22D3EE", how: "Large Language Models (LLMs) predict the next word given all previous words",  tools: "ChatGPT, Gemini, Claude"           },
                { type: "Image", color: "#F97316", how: "Diffusion Models start from noise and remove it guided by a text prompt",        tools: "DALL-E 3, Midjourney, Stable Diffusion" },
                { type: "Audio", color: "#8B5CF6", how: "Audio AI learns from thousands of hours of speech and music recordings",         tools: "ElevenLabs, Suno, Whisper"         },
                { type: "Video", color: "#EF4444", how: "Video Diffusion Models generate sequences of coherent frames over time",         tools: "Sora, Runway, Pika Labs"           },
                { type: "Code",  color: "#10B981", how: "Code LLMs trained on billions of lines of code across dozens of languages",      tools: "GitHub Copilot, Cursor, Replit AI" },
              ].map(d => (
                <div key={d.type} className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-2.5">
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 w-12 text-center"
                    style={{ background: d.color + "20", color: d.color }}
                  >{d.type}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-800 leading-snug">{d.how}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Tools: {d.tools}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="1.3" title="How Do LLMs Generate Text?" tag="Key Concept">
            <p>
              A <strong>Large Language Model (LLM)</strong> is trained on trillions of words from the
              internet. It learns statistical patterns â€” which words follow which. When you give it a prompt,
              it predicts the most likely next word, then the next, and so on.
            </p>
            <div className="mt-3 rounded-xl bg-gray-900 border border-gray-700 p-3">
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-2">Prediction in action</p>
              <div className="space-y-1.5 text-xs font-mono">
                {[
                  { input: `"The capital of France is ___"`,           pred: `â†’ "Paris"  (high probability)`         },
                  { input: `"2 + 2 = ___"`,                            pred: `â†’ "4"      (very high probability)`    },
                  { input: `"My favourite colour is ___"`,             pred: `â†’ "blue"   (many possibilities)`       },
                  { input: `"Marie Curie was born in ___"`,            pred: `â†’ "Warsaw" (learned from many sources)`},
                ].map(({ input, pred }) => (
                  <div key={input} className="flex items-start gap-3">
                    <span className="text-slate-400 shrink-0">{input}</span>
                    <span className="text-emerald-400">{pred}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              The model doesn&apos;t &quot;know&quot; facts â€” it predicts plausible text based on patterns. This is
              why it can generate confident-sounding but completely incorrect information.
            </p>
          </ConceptCard>

          <AnimFrame
            id="anim-frame-9"
              title="Generative AI Explorer â€” 5 Types"
            description="Click each type node to explore how it works. Toggle between 'What is it?' and 'How it works' for technical detail. Auto-cycles every 4 seconds."
          >
            <AnimGenAITypes />
          </AnimFrame>

          <MicroCheck
            question="ChatGPT generates a full essay from a text prompt. Which type of AI is this?"
            options={["Conventional AI â€” it classifies text", "Generative AI â€” it creates new content from a prompt", "Computer Vision AI", "Reinforcement Learning"]}
            correct={1}
            explanation="Generative AI creates new content (the essay) from a prompt. Conventional AI would instead classify the prompt or predict a label â€” it would NOT produce an entire new document."
          />

          <MicroCheck
            question="DALL-E creates an image from the prompt 'a cat reading a book on the moon'. What model type does it use?"
            options={["Recurrent Neural Network", "Decision Tree", "Diffusion Model", "Linear Regression"]}
            correct={2}
            explanation="DALL-E 3, Midjourney and Stable Diffusion all use Diffusion Models â€” they start with random noise and iteratively remove it, guided by the text prompt, until a coherent image emerges."
          />
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            LESSON 2 â€” Applications, Hallucinations & Deepfakes
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="Applications, Hallucinations &amp; Deepfakes" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="Benefits of Generative AI" tag="Key Concept">
            <div className="mt-1 grid sm:grid-cols-2 gap-3">
              {[
                { benefit: "Massively productive",   desc: "Drafts a 500-word email in 3 seconds; summarises a 50-page report in 30 seconds"           },
                { benefit: "Democratises creativity", desc: "Anyone can create professional-quality images, music or code without years of training"    },
                { benefit: "Personalised learning",  desc: "AI tutors explain concepts at the right level for each student, in their preferred language" },
                { benefit: "Accessible for all",     desc: "Screen readers, real-time translation, voice-to-text help people with disabilities"         },
                { benefit: "Scientific acceleration",desc: "AlphaFold (DeepMind) predicted the structure of 200 million proteins in weeks â€” accelerating drug discovery by decades" },
                { benefit: "24/7 availability",      desc: "AI assistants help at midnight, on holidays, in any language â€” when no human expert is available" },
              ].map(d => (
                <div key={d.benefit} className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">+</span>
                  <div>
                    <p className="text-[11px] font-bold text-emerald-800">{d.benefit}</p>
                    <p className="text-[10px] text-emerald-700 leading-snug">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="2.2" title="Limitations â€” Hallucinations" tag="Warning">
            <p>
              <strong>AI Hallucination</strong> is when a Generative AI model produces text that sounds
              confident and plausible but is factually wrong. Unlike a human expert who says
              &quot;I&apos;m not sure&quot;, the AI gives wrong answers with the same confident tone as correct ones.
            </p>
            <div className="mt-3 space-y-2">
              {[
                { cause: "Trained on wrong data",       ex: "If myths are repeated millions of times online, AI learns them as 'facts'"         },
                { cause: "Predicts, doesn't verify",   ex: "LLMs predict plausible text â€” they have no internal fact-checker"                 },
                { cause: "No uncertainty signal",      ex: "AI says 'Einstein failed maths' with the same confidence as '2+2=4'"              },
                { cause: "Entity confusion",           ex: "AI mixes up similar people, places or organisations when generating descriptions"  },
              ].map(d => (
                <div key={d.cause} className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 p-2.5">
                  <span className="text-red-500 font-bold text-xs shrink-0 mt-0.5">!</span>
                  <div>
                    <p className="text-[11px] font-bold text-red-800">{d.cause}</p>
                    <p className="text-[10px] text-red-700 leading-snug">{d.ex}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2">
              <p className="text-xs font-bold text-amber-800">Rule: Always verify AI-generated facts with authoritative sources (textbooks, government data, peer-reviewed research) before using them.</p>
            </div>
          </ConceptCard>

          <ConceptCard number="2.3" title="Limitations â€” Deepfakes &amp; Copyright" tag="Warning">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-red-700 mb-1">Deepfakes</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A <strong>deepfake</strong> is a hyperrealistic AI-generated video or audio of a real person
                  saying or doing something they never actually did. Creating or sharing deepfakes of real
                  people without consent is unethical and illegal under India&apos;s IT Act (Section 66D â€” online impersonation).
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                {[
                  { label: "Political deepfakes",   ex: "Fake videos of politicians making false statements to influence elections"           },
                  { label: "Harassment deepfakes",  ex: "Non-consensual fake images of classmates or public figures â€” a form of cyberbullying" },
                  { label: "Fraud deepfakes",       ex: "Voice clones of family members used in phone scams â€” 'I'm in trouble, send money'"   },
                  { label: "Copyright violations",  ex: "AI generating music in the style of a living artist without permission or royalties"  },
                ].map(d => (
                  <div key={d.label} className="rounded-xl border border-red-100 bg-red-50 p-2.5">
                    <p className="text-[10px] font-bold text-red-700">{d.label}</p>
                    <p className="text-[9px] text-red-600 mt-0.5 leading-snug">{d.ex}</p>
                  </div>
                ))}
              </div>
            </div>
          </ConceptCard>

          {/* WOW Feature */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                WOW Activity
              </span>
              <span className="text-xs text-gray-400">CBSE Activity â€” Guess the Real vs AI-generated Â· Spot the Hallucination</span>
            </div>
            <AnimFrame
              id="anim-frame-10"
              title="Hallucination Game â€” Spot the Fake &amp; Real vs AI-Generated"
              description="Tab 1: Mark each claim as Real Fact or AI Hallucination. Tab 2: Identify which content was written by a human vs generated by AI."
            >
              <AnimHallucinationGame />
            </AnimFrame>
          </div>

          <MicroCheck
            question="An AI states: 'Python was named after the snake python because its creator loved reptiles.' This is best described as:"
            options={["A factual AI output", "An AI hallucination â€” plausible but wrong", "A programming error", "A data privacy violation"]}
            correct={1}
            explanation="Python was named after the British comedy show 'Monty Python's Flying Circus' â€” not the snake. The snake is only on the logo. The AI generated a plausible-sounding but false explanation â€” a classic hallucination driven by the obvious snake-language association."
          />

          <MicroCheck
            question="A classmate creates a realistic fake video of you using AI and shares it. Under Indian law, this could be a violation of:"
            options={["Consumer Protection Act", "IT Act Section 66D (online identity impersonation) and DPDP Act", "Only school rules", "No laws â€” digital content is unregulated"]}
            correct={1}
            explanation="India's IT Act Section 66D covers online impersonation using computer resources, which includes AI-generated deepfakes. The DPDP Act covers misuse of personal data (your face/image). Creating non-consensual deepfakes can result in criminal charges."
          />
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            LESSON 3 â€” Prompt Engineering & Ethical Use
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Prompt Engineering &amp; Ethical Use" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="What is Prompt Engineering?" tag="Key Concept">
            <p>
              <strong>Prompt engineering</strong> is the skill of crafting effective instructions for an AI
              system to get better, more useful, more targeted outputs. The same task can produce
              radically different results depending on how the prompt is written.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                { principle: "Be Specific",       icon: "ðŸŽ¯", ex: "Add length, level, format, tone â€” not just the topic"           },
                { principle: "Give Context",      icon: "ðŸ“", ex: "Who is the audience? What is this for? What do you already know?" },
                { principle: "Set Constraints",   icon: "âš™ï¸", ex: "Tell AI what NOT to include; specify style restrictions"         },
                { principle: "Assign a Role",     icon: "ðŸŽ­", ex: "\"Explain as a teacher to a Class 9 student\" â†’ better output"   },
                { principle: "Use Examples",      icon: "ðŸ“‹", ex: "Show the format you want: \"Output like this: [example]\"" },
                { principle: "Iterate & Refine",  icon: "ðŸ”„", ex: "If the first output isn't right, ask for improvements step by step" },
              ].map(d => (
                <div key={d.principle} className="flex items-start gap-2 rounded-xl bg-gray-50 border border-gray-100 p-2.5">
                  <span className="text-base shrink-0">{d.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800">{d.principle}</p>
                    <p className="text-[10px] text-gray-500 leading-snug">{d.ex}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Prompt Lab */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                Interactive Lab
              </span>
              <span className="text-xs text-gray-400">Compare bad vs good prompts Â· GenAI ethics scenarios</span>
            </div>
            <AnimFrame
              id="anim-frame-11"
              title="Prompt Lab â€” Engineering &amp; Ethical Use"
              description="Tab 1: Compare weak vs strong prompts across 4 domains and see the difference in output. Tab 2: Navigate 4 real-world GenAI ethical dilemmas."
            >
              <AnimPromptLab />
            </AnimFrame>
          </div>

          <ConceptCard number="3.2" title="Ethical Use of Generative AI" tag="Warning">
            <p>
              Generative AI is powerful â€” and that power requires ethical responsibility. The key
              questions to ask before using GenAI for any task:
            </p>
            <div className="mt-3 space-y-2">
              {[
                {
                  q: "Honesty â€” Am I being transparent?",
                  rules: [
                    "Disclose AI use where required (school assignments, professional work)",
                    "Don't pass AI-generated work off as entirely your own",
                    "Label AI-generated images, videos, or audio as such",
                  ],
                  color: "#7C3AED",
                },
                {
                  q: "Consent â€” Did I get permission?",
                  rules: [
                    "Never generate fake images or videos of real people without consent",
                    "Don't train AI on others' private data without permission",
                    "Respect copyright â€” AI-generated music in an artist's style may violate their rights",
                  ],
                  color: "#EF4444",
                },
                {
                  q: "Accuracy â€” Did I verify the output?",
                  rules: [
                    "Always fact-check AI outputs against authoritative sources",
                    "Never submit AI-generated research as verified facts without checking",
                    "Be especially careful with medical, legal, or safety-critical information",
                  ],
                  color: "#F59E0B",
                },
              ].map(d => (
                <div key={d.q} className="rounded-xl border p-3" style={{ borderColor: d.color + "30", background: d.color + "06" }}>
                  <p className="text-xs font-bold mb-1.5" style={{ color: d.color }}>{d.q}</p>
                  <ul className="space-y-1">
                    {d.rules.map(r => (
                      <li key={r} className="text-[10px] text-gray-700 flex items-start gap-1.5">
                        <span className="shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ background: d.color }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="3.3" title="GAN Paint â€” Hands-On GenAI Tool" tag="Example">
            <p>
              CBSE recommends exploring <strong>GAN Paint</strong> (MIT Media Lab) â€” a generative AI
              tool where you paint features onto a photo of a building using AI. You can add or remove
              doors, windows, trees, clouds by simply brushing over the image.
            </p>
            <div className="mt-3 rounded-xl bg-violet-50 border border-violet-100 p-3">
              <p className="text-[10px] font-bold text-violet-700 mb-1">What GAN Paint demonstrates:</p>
              <ul className="space-y-1">
                {[
                  "Generative Adversarial Networks (GANs) â€” the generator creates, the discriminator judges",
                  "AI has learned what 'belongs' in a scene (trees outside, not inside)",
                  "Real-time interactive generation â€” each brush stroke triggers AI inference",
                  "Limitations: AI refuses to generate 'impossible' combinations (door inside a tree)",
                ].map(p => (
                  <li key={p} className="text-[10px] text-violet-700 flex items-start gap-1.5">
                    <span className="shrink-0 font-bold">â€º</span>{p}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-violet-600 mt-2 font-semibold">
                Try it: gandissect.csail.mit.edu â€” works in any browser
              </p>
            </div>
          </ConceptCard>

          <MicroCheck
            question="A student writes: 'Explain photosynthesis to a Class 9 student using a factory analogy in 150 words.' Which prompt engineering technique is demonstrated?"
            options={[
              "Jailbreaking the AI model",
              "Specifying audience, analogy, and length constraint for a targeted output",
              "Training a new AI model",
              "Reducing AI bias through careful phrasing",
            ]}
            correct={1}
            explanation="This prompt uses three techniques: audience context (Class 9 student â†’ appropriate vocabulary), specific analogy request (factory â†’ concrete mental model), and length constraint (150 words â†’ concise answer). Each element guides the AI to produce a more useful output than 'explain photosynthesis'."
          />

          <MicroCheck
            question="Which of the following GenAI uses is MOST ethically problematic?"
            options={[
              "Using ChatGPT to help brainstorm ideas for an essay, then writing it yourself",
              "Using AI to create a deepfake video of a classmate without their knowledge",
              "Using Suno to generate background music for a personal video project",
              "Using AI to help understand a difficult maths concept",
            ]}
            correct={1}
            explanation="Creating a non-consensual deepfake of a real identifiable person â€” especially a classmate â€” is a serious ethical violation (and potentially illegal under India's IT Act). All other uses listed are legitimate and ethical ways to use GenAI as a tool."
          />
        </section>

        {/* Exit Quiz */}
        <ExitQuiz
          moduleName="Unit 4: Introduction to Generative AI"
          questions={QUIZ}
          passThreshold={7}
        />
      </div>
    </div>
    </>
  )
}
