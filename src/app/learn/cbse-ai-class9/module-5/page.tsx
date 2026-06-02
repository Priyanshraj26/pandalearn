import { Code2, Terminal, List, Clock, Target, ChevronDown, BookOpen, Cpu } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import LessonProgressStrip from "@/app/learn/cbse-ai-class9/module-1/_components/LessonProgressStrip"
import AnimVariables from "./_components/AnimVariables"
import AnimDebugArena from "./_components/AnimDebugArena"
import AnimLoopTracer from "./_components/AnimLoopTracer"
import AnimListBuilder from "./_components/AnimListBuilder"
import AnimPythonREPL from "./_components/AnimPythonREPL"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "What is the output of: print(type(3.14))?",
    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
    correct: 1,
    explanation: "3.14 is a decimal number  Python stores it as a float (floating-point number). type() returns the data type of a value. Output: <class 'float'>.",
  },
  {
    question: "What does int('25') return?",
    options: ["'25'", "25", "25.0", "Error"],
    correct: 1,
    explanation: "int() converts a string to an integer. int('25') returns the integer 25. This is called type conversion (casting). int('25.5') would raise an error  use int(float('25.5')) instead.",
  },
  {
    question: "What is the output of: print(17 % 5)?",
    options: ["3", "2", "3.4", "12"],
    correct: 1,
    explanation: "% is the modulo (remainder) operator. 17 ÷ 5 = 3 remainder 2. So 17 % 5 = 2. Modulo is very useful in programming for checking even/odd, cycling through indices, etc.",
  },
  {
    question: "How many times does this loop print? for i in range(3, 8):",
    options: ["3", "4", "5", "8"],
    correct: 2,
    explanation: "range(3, 8) generates: 3, 4, 5, 6, 7  that is 5 values. range(start, stop) is inclusive of start and exclusive of stop. The loop body runs exactly 5 times.",
  },
  {
    question: "What is the output?\nmarks = 82\nif marks >= 90:\n    print('A')\nelif marks >= 75:\n    print('B')\nelse:\n    print('C')",
    options: ["A", "B", "C", "No output"],
    correct: 1,
    explanation: "marks = 82. First check: 82 >= 90 → False, skip. Second check: 82 >= 75 → True → print('B'). Once a condition is True, the rest of the elif/else chain is skipped.",
  },
  {
    question: "What does my_list.append(5) do?",
    options: [
      "Inserts 5 at the beginning of the list",
      "Adds 5 to the end of the list",
      "Returns the index of 5",
      "Removes 5 from the list",
    ],
    correct: 1,
    explanation: "append() always adds the new element to the END of the list. To insert at a specific position, use insert(index, value). append() does not return anything useful  it modifies the list in place.",
  },
  {
    question: "A list is: names = ['Aarav', 'Priya', 'Rohan']. What does names[1] return?",
    options: ["'Aarav'", "'Priya'", "'Rohan'", "Error"],
    correct: 1,
    explanation: "Python lists use zero-based indexing. names[0] = 'Aarav', names[1] = 'Priya', names[2] = 'Rohan'. Remember: the first element is always at index 0, not 1.",
  },
  {
    question: "What is the output of this while loop?\nn = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1",
    options: ["1 2 3 4", "1 2 3", "0 1 2 3", "Infinite loop"],
    correct: 1,
    explanation: "n starts at 1. Loop runs while n ≤ 3. Iteration 1: print(1), n becomes 2. Iteration 2: print(2), n becomes 3. Iteration 3: print(3), n becomes 4. Check: 4 ≤ 3 → False → exit. Output: 1, 2, 3.",
  },
  {
    question: "What will my_list.pop() do if called on [10, 20, 30, 40]?",
    options: [
      "Remove and return 10",
      "Remove and return 40",
      "Remove and return 20",
      "Return 40 without removing",
    ],
    correct: 1,
    explanation: "pop() with no argument removes and returns the LAST element. So pop() on [10, 20, 30, 40] returns 40 and the list becomes [10, 20, 30]. Use pop(0) to remove the first element.",
  },
  {
    question: "What is the output of: print(10 // 3)?",
    options: ["3.33", "3", "4", "1"],
    correct: 1,
    explanation: "// is the floor division (integer division) operator  it divides and rounds down to the nearest integer. 10 // 3 = 3 (not 3.33). The remainder is discarded. Compare: 10 / 3 = 3.333... (regular division).",
  },
]

// ── CBSE Accordion ────────────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Write and run basic Python programs using print() and input() functions.",
    "Use variables, data types (int, float, str, bool) and arithmetic/comparison operators.",
    "Implement conditional statements: if, elif, else.",
    "Write iteration using for loops (with range) and while loops.",
    "Create, index, slice, and manipulate Python lists.",
    "Convert between data types using int(), float(), str().",
  ]
  return (
    <details className="group rounded-2xl border border-emerald-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-emerald-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-emerald-500 shrink-0" />
        <span className="text-xs font-bold text-emerald-700 flex-1">CBSE 417 · Unit 5  Official Learning Outcomes</span>
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
          {[["Theory", "1h"], ["Practical", "9h"], ["Marks", "8M"]].map(([l, v]) => (
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

// ── Lesson map ────────────────────────────────────────────────────────────────

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "#lesson-01",
      accent: "#22D3EE", bg: "#ECFEFF", textColor: "text-cyan-700",
      title: "Variables, Data Types & Operators",
      time: "~30 min",
      topics: ["int, float, str, bool", "Arithmetic operators", "Type conversion", "input() & print()"],
      feature: "Visual variable assignment explorer",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#8B5CF6", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "Flow of Control  if / for / while",
      time: "~45 min",
      topics: ["if / elif / else", "for loop + range()", "while loop", "Nested loops"],
      feature: "Step-through loop tracer",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#10B981", bg: "#ECFDF5", textColor: "text-emerald-700",
      title: "Python Lists",
      time: "~30 min",
      topics: ["Create & index", "append / insert / remove / pop", "slice", "sort"],
      feature: "Interactive list operations builder",
    },
    {
      n: "04", href: "#lesson-04",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "Input / Output & Putting It Together",
      time: "~45 min",
      topics: ["input() with type conversion", "f-strings", "CBSE program examples", "Code tracer"],
      feature: "WOW: Live Python code tracer",
    },
  ]
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Module Roadmap</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            <div className="flex flex-wrap gap-1 mb-2">
              {l.topics.map(t => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">{t}</span>
              ))}
            </div>
            <p className={`text-[10px] font-semibold ${l.textColor}`}>✦ {l.feature}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ n, title, lesson }: { n: string; title: string; lesson: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-sora font-bold text-white text-sm shrink-0">{n}</span>
      <div>
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">{lesson}</p>
        <h2 className="font-sora font-bold text-gray-900 text-lg leading-tight">{title}</h2>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Module5Page() {
  return (
    <>
      <LessonProgressStrip />
      <div className="px-6 lg:px-10">

        {/* Hero */}
        <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
          <div aria-hidden className="pointer-events-none select-none absolute inset-0">
            <Code2 size={200} className="absolute -right-10 -top-8 text-emerald-500 opacity-[0.07]" />
            <Terminal size={72} className="absolute right-44 top-6 text-cyan-400 opacity-[0.06] rotate-3" />
            <Cpu size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
                Unit 5 of 5
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40"><Target size={11} /> 8 marks · CBSE 417</span>
            </div>
            <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
              Introduction to Python
            </h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
              Python is the world&apos;s most popular language for AI, data science, and automation.
              In this unit you&apos;ll write and run real Python programs  step through their execution
              line by line, see variables update in memory, and build a foundation for the practical
              AI work ahead.
            </p>
          </div>
        </div>

        <div className="mt-6"><CBSEAccordion /></div>

        <div className="py-10 space-y-16">

          <LessonMap />

          <ObjectivesCard
            objectives={[
              "Write Python programs using print() and input() with type conversion.",
              "Explain int, float, str, bool and apply arithmetic, comparison, and logical operators.",
              "Use if/elif/else to make decisions in a program.",
              "Write for loops using range() and while loops with conditions.",
              "Create, index, slice, and modify Python lists using built-in methods.",
              "Trace a program step-by-step, tracking variable values at each line.",
            ]}
          />

          {/* ════════════════════════════════════════════════════
              LESSON 1  Variables, Data Types & Operators
          ════════════════════════════════════════════════════ */}
          <section id="lesson-01" className="space-y-6 scroll-mt-20">
            <SectionHeading n="01" title="Variables, Data Types &amp; Operators" lesson="Lesson 1 of 4" />

            <ConceptCard number="1.1" title="Variables  Named Boxes in Memory" tag="Definition">
              <p>
                A <strong>variable</strong> is a named location in computer memory that stores a value.
                You create a variable by assigning it a value with <code>=</code>.
              </p>
              <div className="mt-3 rounded-xl bg-gray-900 border border-gray-700 p-3 font-mono text-xs space-y-1">
                {[
                  ["name   = \"Aarav\"",    "# str   text"],
                  ["age    = 14",           "# int   whole number"],
                  ["score  = 92.5",         "# float  decimal"],
                  ["passed = True",         "# bool  True or False"],
                ].map(([code, comment]) => (
                  <div key={code} className="flex gap-4">
                    <span className="text-cyan-300">{code}</span>
                    <span className="text-slate-500">{comment}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Variable names must start with a letter or underscore, contain no spaces, and be descriptive.
                Python is <strong>case-sensitive</strong>: <code>Age</code> and <code>age</code> are different variables.
              </p>
            </ConceptCard>

            <ConceptCard number="1.2" title="The 4 Core Data Types" tag="Key Concept">
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                {[
                  { t: "int",   color: "#22D3EE", desc: "Whole numbers  no decimal point",  ex: "age = 14",        ai: "Class labels, iteration counts, pixel values" },
                  { t: "float", color: "#F97316", desc: "Decimal numbers",                   ex: "prob = 0.87",     ai: "AI confidence scores, loss values, weights"   },
                  { t: "str",   color: "#8B5CF6", desc: "Text in quotes (single or double)", ex: 'city = "Delhi"',  ai: "NLP input, labels, file paths"                },
                  { t: "bool",  color: "#10B981", desc: "True or False only",                ex: "passed = True",   ai: "Model predictions, condition flags"           },
                ].map(d => (
                  <div key={d.t} className="rounded-xl border p-3" style={{ borderColor: d.color + "40", background: d.color + "08" }}>
                    <p className="font-mono text-xs font-bold mb-1" style={{ color: d.color }}>{d.t}</p>
                    <p className="text-[10px] text-gray-700">{d.desc}</p>
                    <p className="font-mono text-[10px] text-gray-500 mt-1">{d.ex}</p>
                    <p className="text-[9px] text-gray-400 mt-1">AI: {d.ai}</p>
                  </div>
                ))}
              </div>
            </ConceptCard>

            <ConceptCard number="1.3" title="Operators" tag="Key Concept">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Arithmetic</p>
                  <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                    {[["+ Add","5+3 → 8"],["- Sub","9-4 → 5"],["* Mul","3*4 → 12"],["/ Div","7/2 → 3.5"],["// Floor","7//2 → 3"],["% Mod","7%2 → 1"],["** Power","2**3 → 8"]].map(([op, ex]) => (
                      <div key={op} className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1">
                        <p className="text-[9px] font-bold text-violet-600">{op}</p>
                        <p className="text-[9px] text-gray-500">{ex}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Comparison  always return True or False</p>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {["== equal","!= not equal","> greater","< less",">= ≥","<= ≤"].map(op => (
                      <span key={op} className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">{op}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ConceptCard>

            <AnimFrame
              id="anim-variables"
              title="Variable Explorer  Types, Assignments & Operators"
              description="Click each data type to see examples, operations, and how AI uses them. Toggle between 'Types' and 'Operators' tabs."
            >
              <AnimVariables />
            </AnimFrame>

            <MicroCheck
              question="What is the output of: print(15 % 4)?"
              options={["3", "3.75", "1", "4"]}
              correct={0}
              explanation="% is the modulo (remainder) operator. 15 ÷ 4 = 3 remainder 3. So 15 % 4 = 3. Modulo is used in programming to check even/odd (n % 2 == 0 means even), wrap indices, and cycle values."
            />

            <MicroCheck
              question="What does int('42') return in Python?"
              options={["'42'", "42", "42.0", "Error  can't convert"]}
              correct={1}
              explanation="int() converts its argument to an integer. int('42') returns the integer 42 (not the string '42'). This is essential when using input(), which always returns a string  you must convert it if you need a number."
            />
          </section>

          {/* ════════════════════════════════════════════════════
              LESSON 2  Flow of Control
          ════════════════════════════════════════════════════ */}
          <section id="lesson-02" className="space-y-6 scroll-mt-20">
            <SectionHeading n="02" title="Flow of Control  if / for / while" lesson="Lesson 2 of 4" />

            <ConceptCard number="2.1" title="if / elif / else  Decision Making" tag="Key Concept">
              <p>
                Python executes conditions from top to bottom. The first condition that is
                <strong> True</strong> runs its block  all others are skipped.
              </p>
              <div className="mt-3 rounded-xl bg-gray-900 border border-gray-700 p-3 font-mono text-xs">
                <div className="space-y-0.5">
                  {[
                    { code: "marks = 74",          color: "#94A3B8" },
                    { code: "if marks >= 90:",      color: "#22D3EE" },
                    { code: '    grade = "A"',      color: "#64748B" },
                    { code: "elif marks >= 75:",    color: "#22D3EE" },
                    { code: '    grade = "B"',      color: "#64748B" },
                    { code: "elif marks >= 60:",    color: "#22D3EE" },
                    { code: '    grade = "C"  ← this runs (74 ≥ 60)', color: "#10B981" },
                    { code: "else:",                color: "#EF4444" },
                    { code: '    grade = "F"',      color: "#64748B" },
                  ].map(({ code, color }) => (
                    <div key={code} className="text-xs" style={{ color }}>{code}</div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Indentation is NOT optional in Python.</strong> Each block inside if/elif/else must be indented by 4 spaces (or 1 tab). Wrong indentation = IndentationError.
              </p>
            </ConceptCard>

            <ConceptCard number="2.2" title="for Loops  Fixed Iteration" tag="Key Concept">
              <p>
                A <strong>for loop</strong> iterates over a sequence a fixed number of times.
                <code> range(start, stop)</code> generates integers from <code>start</code> up to (but not including) <code>stop</code>.
              </p>
              <div className="mt-3 grid sm:grid-cols-3 gap-2 font-mono text-[10px]">
                {[
                  { call: "range(5)",    gen: "0, 1, 2, 3, 4",       note: "Default starts at 0"  },
                  { call: "range(1, 6)", gen: "1, 2, 3, 4, 5",       note: "Explicit start"       },
                  { call: "range(0, 10, 2)", gen: "0, 2, 4, 6, 8",   note: "Step = 2 (even nums)" },
                ].map(d => (
                  <div key={d.call} className="rounded-xl bg-gray-50 border border-gray-100 p-2">
                    <p className="font-bold text-violet-600">{d.call}</p>
                    <p className="text-gray-700 mt-0.5">{d.gen}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{d.note}</p>
                  </div>
                ))}
              </div>
            </ConceptCard>

            <ConceptCard number="2.3" title="while Loops  Conditional Iteration" tag="Key Concept">
              <p>
                A <strong>while loop</strong> runs as long as its condition remains <code>True</code>.
                Always ensure the condition eventually becomes <code>False</code>  otherwise you get an
                infinite loop that never ends.
              </p>
              <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2">
                <p className="text-xs font-bold text-amber-800">Common mistake  infinite loop:</p>
                <pre className="font-mono text-[10px] text-red-700 mt-1">{`i = 1\nwhile i <= 5:\n    print(i)\n    # forgot: i = i + 1  ← loop never ends!`}</pre>
              </div>
            </ConceptCard>

            <AnimFrame
              id="anim-loop-tracer"
              title="Loop Tracer  Step Through for / while / if / Nested Loops"
              description="Choose a program, click Step to execute one line at a time, and watch variables update in the memory panel. Click Run All to animate automatically."
            >
              <AnimLoopTracer />
            </AnimFrame>

            {/* Debug Arena */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                  Debug Arena
                </span>
                <span className="text-xs text-gray-400">8 broken programs  find the bug and fix it</span>
              </div>
              <AnimFrame
                id="anim-debug-arena"
                title="Debug Arena  Find &amp; Fix 8 Broken Programs"
                description="Each program has one intentional bug. Click the buggy line, select the fix. Covers: infinite loops, off-by-one errors, wrong operators, index errors, and more."
              >
                <AnimDebugArena />
              </AnimFrame>
            </div>

            <MicroCheck
              question="How many times does this loop run? for i in range(2, 9, 2):"
              options={["3", "4", "5", "7"]}
              correct={1}
              explanation="range(2, 9, 2) generates: 2, 4, 6, 8  stopping before 9. That is 4 values, so the loop runs 4 times. The step=2 means i increases by 2 each iteration."
            />

            <MicroCheck
              question="What happens if the while loop condition is always True and nothing inside changes it?"
              options={
                ["The loop runs exactly 10 times",
                "An infinite loop  the program never stops",
                "Python automatically breaks after 100 iterations",
                "A SyntaxError is raised"]
              }
              correct={1}
              explanation="An infinite loop runs forever because the exit condition is never reached. In Python you can press Ctrl+C to stop it. Always ensure the loop variable or condition is modified inside the loop so it eventually becomes False."
            />
          </section>

          {/* ════════════════════════════════════════════════════
              LESSON 3  Python Lists
          ════════════════════════════════════════════════════ */}
          <section id="lesson-03" className="space-y-6 scroll-mt-20">
            <SectionHeading n="03" title="Python Lists" lesson="Lesson 3 of 4" />

            <ConceptCard number="3.1" title="What is a List?" tag="Key Concept">
              <p>
                A <strong>list</strong> is an ordered, mutable (changeable) collection that can hold multiple
                values of any type. Lists are defined with square brackets <code>[ ]</code>.
              </p>
              <div className="mt-3 rounded-xl bg-gray-900 border border-gray-700 p-3 font-mono text-xs space-y-1.5">
                {[
                  'names  = ["Aarav", "Priya", "Rohan"]   # list of strings',
                  "marks  = [78, 92, 65, 88, 71]           # list of integers",
                  "mixed  = [\"Alice\", 14, True, 3.14]     # mixed types allowed",
                  "empty  = []                              # empty list",
                ].map(line => (
                  <div key={line} className="flex gap-3">
                    <span className="text-cyan-300">{line.split("#")[0]}</span>
                    {line.includes("#") && <span className="text-slate-500"># {line.split("#")[1]}</span>}
                  </div>
                ))}
              </div>
            </ConceptCard>

            <ConceptCard number="3.2" title="Indexing & Slicing" tag="Key Concept">
              <p>
                List items are accessed by their <strong>index</strong> (position). Python uses
                <strong> 0-based indexing</strong>  the first item is index 0.
                Negative indices count from the end: <code>-1</code> is always the last item.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full font-mono text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border border-gray-200">
                      <th className="px-3 py-1.5 font-bold text-gray-600 border border-gray-200">List</th>
                      {["\"Aarav\"","\"Priya\"","\"Rohan\"","\"Sneha\""].map(v => (
                        <th key={v} className="px-3 py-1.5 text-gray-800 border border-gray-200">{v}</th>
                      ))}
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="px-3 py-1 text-[10px] font-bold text-emerald-600 border border-gray-200">Positive index</td>
                      {[0,1,2,3].map(i => <td key={i} className="px-3 py-1 text-center text-emerald-700 font-bold border border-gray-200">[{i}]</td>)}
                    </tr>
                    <tr className="bg-violet-50">
                      <td className="px-3 py-1 text-[10px] font-bold text-violet-600 border border-gray-200">Negative index</td>
                      {[-4,-3,-2,-1].map(i => <td key={i} className="px-3 py-1 text-center text-violet-700 font-bold border border-gray-200">[{i}]</td>)}
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="mt-2 font-mono text-[10px] space-y-0.5 text-gray-600">
                <p>names[0] → &quot;Aarav&quot; &nbsp;&nbsp; names[-1] → &quot;Sneha&quot; &nbsp;&nbsp; names[1:3] → [&quot;Priya&quot;, &quot;Rohan&quot;]</p>
              </div>
            </ConceptCard>

            <AnimFrame
              id="anim-list-builder"
              title="List Operations Builder"
              description="Choose an operation, fill in the values, and click Run to see it applied live on the list. Try append, insert, remove, pop, index, slice, and sort."
            >
              <AnimListBuilder />
            </AnimFrame>

            <MicroCheck
              question="What does names.remove('Priya') do on the list ['Aarav', 'Priya', 'Rohan']?"
              options={[
                "Removes the item at index 1",
                "Removes the first occurrence of 'Priya' by value",
                "Returns the index of 'Priya'",
                "Raises an error",
              ]}
              correct={1}
              explanation="remove(value) finds and removes the FIRST occurrence of that value. It works by value, not by index. To remove by index, use pop(index). If the value doesn't exist, remove() raises a ValueError."
            />
          </section>

          {/* ════════════════════════════════════════════════════
              LESSON 4  Input/Output & Code Tracer
          ════════════════════════════════════════════════════ */}
          <section id="lesson-04" className="space-y-6 scroll-mt-20">
            <SectionHeading n="04" title="Input / Output &amp; Putting It Together" lesson="Lesson 4 of 4" />

            <ConceptCard number="4.1" title="input() and print()" tag="Key Concept">
              <p>
                <code>input()</code> reads text from the user and <strong>always returns a string</strong>.
                You must use <code>int()</code> or <code>float()</code> if you need a number.
              </p>
              <div className="mt-3 rounded-xl bg-gray-900 border border-gray-700 p-3 font-mono text-xs space-y-2">
                <p className="text-slate-500"># Reading and converting input</p>
                <p className="text-cyan-300">name  = input(&quot;Enter your name: &quot;)</p>
                <p className="text-cyan-300">age   = int(input(&quot;Enter your age: &quot;))</p>
                <p className="text-cyan-300">price = float(input(&quot;Enter price: &quot;))</p>
                <p className="text-slate-400 mt-2"># Printing with f-strings (Python 3.6+)</p>
                <p className="text-orange-300">print(f&quot;Hello {"{name}"}, you are {"{age}"} years old.&quot;)</p>
                <p className="text-slate-500"># Output: Hello Aarav, you are 14 years old.</p>
              </div>
            </ConceptCard>

            <ConceptCard number="4.2" title="CBSE Practical Programs  Quick Reference" tag="Example">
              <p className="text-xs text-gray-600 mb-3">
                The CBSE practical exam requires you to write programs from these categories. Study each pattern:
              </p>
              <div className="space-y-3">
                {[
                  {
                    cat: "PRINT programs", color: "#22D3EE",
                    programs: [
                      "Print personal info (Name, Class, School)",
                      "Print star patterns using nested loops",
                      "Find square of a number (7² = 49)",
                      "Find sum of two numbers (15 + 20)",
                      "Convert kilometres to metres",
                      "Print multiplication table of 5",
                      "Calculate Simple Interest (P=2000, R=4.5%, T=10)",
                    ],
                  },
                  {
                    cat: "INPUT programs", color: "#8B5CF6",
                    programs: [
                      "Area and Perimeter of a rectangle",
                      "Area of triangle (½ × base × height)",
                      "Average marks of 3 subjects",
                      "Discounted amount = price × (1 − discount%/100)",
                      "Surface Area and Volume of a Cuboid",
                    ],
                  },
                  {
                    cat: "IF / FOR / WHILE programs", color: "#F97316",
                    programs: [
                      "Check if a person can vote (age >= 18)",
                      "Check grade of a student (A/B/C/F)",
                      "Check positive, negative, or zero",
                      "Print first 10 natural numbers",
                      "Print first 10 even numbers",
                      "Print odd numbers from 1 to n",
                      "Sum of first 10 natural numbers",
                      "Sum of all numbers in a list",
                    ],
                  },
                  {
                    cat: "LIST programs", color: "#10B981",
                    programs: [
                      "Create a list of student names; print, delete, add, remove",
                      "Print elements using positive and negative indexing",
                      "Create list of first 10 even numbers; add 1 to each",
                      "Extend a list and sort in ascending order",
                    ],
                  },
                ].map(section => (
                  <details key={section.cat} className="group rounded-xl border overflow-hidden" style={{ borderColor: section.color + "40" }}>
                    <summary className="flex items-center gap-2 px-3 py-2 cursor-pointer [&::-webkit-details-marker]:hidden"
                      style={{ background: section.color + "10" }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: section.color }}>{section.cat}</span>
                      <ChevronDown size={12} className="ml-auto text-gray-400 group-open:rotate-180 transition-transform" style={{ color: section.color }} />
                    </summary>
                    <ul className="px-3 py-2 space-y-0.5 bg-white">
                      {section.programs.map(p => (
                        <li key={p} className="text-[10px] text-gray-600 flex items-start gap-2">
                          <span className="shrink-0 font-mono text-[8px] font-bold mt-0.5 px-1 rounded" style={{ background: section.color + "15", color: section.color }}>▶</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </ConceptCard>

            {/* WOW Feature */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
                  WOW Feature
                </span>
                <span className="text-xs text-gray-400">Live Python Code Tracer  step through 4 CBSE programs</span>
              </div>
              <AnimFrame
                id="anim-python-repl"
                title="Python Code Tracer  Live Execution with Memory Boxes"
                description="Pick a program, enter custom inputs, then step through execution line by line. Watch variables appear in memory boxes and output build in the console."
              >
                <AnimPythonREPL />
              </AnimFrame>
            </div>

            <MicroCheck
              question="What does the following code print?\nfor i in range(1, 4):\n    print(i * i)"
              options={["1 2 3", "1 4 9", "1 2 3 4", "2 4 6"]}
              correct={1}
              explanation="range(1, 4) generates 1, 2, 3. For each i, we print i*i: 1×1=1, 2×2=4, 3×3=9. Output: 1 then 4 then 9 on separate lines."
            />

            <MicroCheck
              question="x = input('Enter: ')  the user types 25. What is type(x)?"
              options={["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'number'>"]}
              correct={1}
              explanation="input() ALWAYS returns a string, regardless of what the user types. Even if the user types '25', x holds the string '25', not the integer 25. You must use int(x) or int(input('Enter: ')) to get an integer."
            />
          </section>

          {/* Exit Quiz */}
          <ExitQuiz
            moduleName="Unit 5: Introduction to Python"
            questions={QUIZ}
            passThreshold={7}
          />
        </div>
      </div>
    </>
  )
}
