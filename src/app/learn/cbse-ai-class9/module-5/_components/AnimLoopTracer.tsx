"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, SkipForward, RotateCcw, ChevronRight } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type ProgramKey = "for_count" | "while_sum" | "if_grade" | "for_pattern"

interface Step {
  line:      number
  highlight: number[]
  vars:      Record<string, string | number>
  output:    string[]
  note:      string
}

interface Program {
  key:     ProgramKey
  label:   string
  color:   string
  desc:    string
  code:    string[]
  steps:   Step[]
  concept: string
}

// ── Programs ──────────────────────────────────────────────────────────────────

const PROGRAMS: Record<ProgramKey, Program> = {
  for_count: {
    key: "for_count", label: "for loop", color: "#22D3EE",
    desc: "Print numbers 1 to 5",
    concept: "A for loop runs a fixed number of times. Python's range(1, 6) generates 1, 2, 3, 4, 5.",
    code: [
      "for i in range(1, 6):",
      "    print(i)",
      "",
      "# Output: 1 2 3 4 5",
    ],
    steps: [
      { line: 0, highlight: [0], vars: { i: "" },  output: [],                    note: "range(1,6) starts: i will go through 1, 2, 3, 4, 5" },
      { line: 0, highlight: [0], vars: { i: 1 },    output: [],                    note: "Iteration 1: i = 1" },
      { line: 1, highlight: [1], vars: { i: 1 },    output: ["1"],                 note: "print(i) → prints 1" },
      { line: 0, highlight: [0], vars: { i: 2 },    output: ["1"],                 note: "Iteration 2: i = 2" },
      { line: 1, highlight: [1], vars: { i: 2 },    output: ["1", "2"],            note: "print(i) → prints 2" },
      { line: 0, highlight: [0], vars: { i: 3 },    output: ["1", "2"],            note: "Iteration 3: i = 3" },
      { line: 1, highlight: [1], vars: { i: 3 },    output: ["1", "2", "3"],       note: "print(i) → prints 3" },
      { line: 0, highlight: [0], vars: { i: 4 },    output: ["1", "2", "3"],       note: "Iteration 4: i = 4" },
      { line: 1, highlight: [1], vars: { i: 4 },    output: ["1", "2", "3", "4"], note: "print(i) → prints 4" },
      { line: 0, highlight: [0], vars: { i: 5 },    output: ["1", "2", "3", "4"], note: "Iteration 5: i = 5" },
      { line: 1, highlight: [1], vars: { i: 5 },    output: ["1", "2", "3", "4", "5"], note: "print(i) → prints 5" },
      { line: 3, highlight: [],  vars: { i: 5 },    output: ["1", "2", "3", "4", "5"], note: "Loop ends  range(1,6) exhausted. Done!" },
    ],
  },
  while_sum: {
    key: "while_sum", label: "while loop", color: "#F97316",
    desc: "Sum numbers 1 to 5 using while",
    concept: "A while loop continues as long as its condition is True. Here we accumulate a running total.",
    code: [
      "total = 0",
      "i = 1",
      "while i <= 5:",
      "    total = total + i",
      "    i = i + 1",
      "print(total)",
    ],
    steps: [
      { line: 0, highlight: [0], vars: { total: 0, i: "" }, output: [],    note: "total = 0  (initialise accumulator)" },
      { line: 1, highlight: [1], vars: { total: 0, i: 1 },   output: [],    note: "i = 1  (initialise counter)" },
      { line: 2, highlight: [2], vars: { total: 0, i: 1 },   output: [],    note: "Check: i <= 5 → 1 <= 5 → True → enter loop" },
      { line: 3, highlight: [3], vars: { total: 1, i: 1 },   output: [],    note: "total = 0 + 1 = 1" },
      { line: 4, highlight: [4], vars: { total: 1, i: 2 },   output: [],    note: "i = 1 + 1 = 2" },
      { line: 2, highlight: [2], vars: { total: 1, i: 2 },   output: [],    note: "Check: 2 <= 5 → True → continue" },
      { line: 3, highlight: [3], vars: { total: 3, i: 2 },   output: [],    note: "total = 1 + 2 = 3" },
      { line: 4, highlight: [4], vars: { total: 3, i: 3 },   output: [],    note: "i = 2 + 1 = 3" },
      { line: 2, highlight: [2], vars: { total: 3, i: 3 },   output: [],    note: "Check: 3 <= 5 → True → continue" },
      { line: 3, highlight: [3], vars: { total: 6, i: 3 },   output: [],    note: "total = 3 + 3 = 6" },
      { line: 4, highlight: [4], vars: { total: 6, i: 4 },   output: [],    note: "i = 3 + 1 = 4" },
      { line: 2, highlight: [2], vars: { total: 6, i: 4 },   output: [],    note: "Check: 4 <= 5 → True → continue" },
      { line: 3, highlight: [3], vars: { total: 10, i: 4 },  output: [],    note: "total = 6 + 4 = 10" },
      { line: 4, highlight: [4], vars: { total: 10, i: 5 },  output: [],    note: "i = 4 + 1 = 5" },
      { line: 2, highlight: [2], vars: { total: 10, i: 5 },  output: [],    note: "Check: 5 <= 5 → True → continue" },
      { line: 3, highlight: [3], vars: { total: 15, i: 5 },  output: [],    note: "total = 10 + 5 = 15" },
      { line: 4, highlight: [4], vars: { total: 15, i: 6 },  output: [],    note: "i = 5 + 1 = 6" },
      { line: 2, highlight: [2], vars: { total: 15, i: 6 },  output: [],    note: "Check: 6 <= 5 → False → exit loop" },
      { line: 5, highlight: [5], vars: { total: 15, i: 6 },  output: ["15"], note: "print(total) → 15. Sum of 1+2+3+4+5 = 15 ✓" },
    ],
  },
  if_grade: {
    key: "if_grade", label: "if / elif / else", color: "#8B5CF6",
    desc: "Determine a student's grade",
    concept: "if/elif/else checks conditions top to bottom. The FIRST True condition executes  rest are skipped.",
    code: [
      "marks = 74",
      "if marks >= 90:",
      '    grade = "A"',
      "elif marks >= 75:",
      '    grade = "B"',
      "elif marks >= 60:",
      '    grade = "C"',
      "else:",
      '    grade = "F"',
      "print(grade)",
    ],
    steps: [
      { line: 0,  highlight: [0],  vars: { marks: 74, grade: "" }, output: [],     note: "marks = 74 (student's score)" },
      { line: 1,  highlight: [1],  vars: { marks: 74, grade: "" }, output: [],     note: "Check: 74 >= 90 → False → skip" },
      { line: 3,  highlight: [3],  vars: { marks: 74, grade: "" }, output: [],     note: "Check: 74 >= 75 → False → skip" },
      { line: 5,  highlight: [5],  vars: { marks: 74, grade: "" }, output: [],     note: "Check: 74 >= 60 → True → enter this block" },
      { line: 6,  highlight: [6],  vars: { marks: 74, grade: "C" }, output: [],     note: 'grade = "C"  condition matched, other elifs skipped' },
      { line: 9,  highlight: [9],  vars: { marks: 74, grade: "C" }, output: ["C"],  note: 'print(grade) → "C"' },
    ],
  },
  for_pattern: {
    key: "for_pattern", label: "Nested for", color: "#10B981",
    desc: "Print a star triangle pattern",
    concept: "Nested loops: the outer loop runs N times; for each outer step, the inner loop completes fully.",
    code: [
      "for i in range(1, 5):",
      "    for j in range(i):",
      "        print('*', end=' ')",
      "    print()",
    ],
    steps: [
      { line: 0, highlight: [0], vars: { i: 1, j: "" }, output: [],                          note: "Outer loop: i = 1" },
      { line: 1, highlight: [1], vars: { i: 1, j: 0 },   output: [],                          note: "Inner loop: range(1) → j = 0 once" },
      { line: 2, highlight: [2], vars: { i: 1, j: 0 },   output: ["*"],                       note: "print('*', end=' ') → * (no newline yet)" },
      { line: 3, highlight: [3], vars: { i: 1, j: 0 },   output: ["*", "↵"],                  note: "print() → newline. Row 1 done: *" },
      { line: 0, highlight: [0], vars: { i: 2, j: "" }, output: ["*", "↵"],                  note: "Outer loop: i = 2" },
      { line: 1, highlight: [1], vars: { i: 2, j: 0 },   output: ["*", "↵"],                  note: "Inner loop: range(2) → j = 0" },
      { line: 2, highlight: [2], vars: { i: 2, j: 0 },   output: ["*", "↵", "*"],             note: "print('*') → first star of row 2" },
      { line: 1, highlight: [1], vars: { i: 2, j: 1 },   output: ["*", "↵", "*"],             note: "Inner loop: j = 1" },
      { line: 2, highlight: [2], vars: { i: 2, j: 1 },   output: ["*", "↵", "*", "*"],        note: "print('*') → second star of row 2" },
      { line: 3, highlight: [3], vars: { i: 2, j: 1 },   output: ["*", "↵", "*", "*", "↵"],   note: "print() → newline. Row 2 done: * *" },
      { line: 0, highlight: [0], vars: { i: 3, j: "" }, output: ["*", "↵", "*", "*", "↵"],   note: "Outer loop: i = 3 (continues similarly…)" },
      { line: 3, highlight: [],  vars: { i: 4, j: 3 },   output: ["*","↵","*","*","↵","*","*","*","↵","*","*","*","*","↵"], note: "All done! Triangle printed. Pattern: 1,2,3,4 stars per row." },
    ],
  },
}

const ORDER: ProgramKey[] = ["for_count", "while_sum", "if_grade", "for_pattern"]

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimLoopTracer() {
  const [progKey, setProgKey] = useState<ProgramKey>("for_count")
  const [stepIdx, setStepIdx] = useState(0)
  const [running, setRunning] = useState(false)

  const prog = PROGRAMS[progKey]
  const step = prog.steps[stepIdx]
  const isLast = stepIdx === prog.steps.length - 1

  const advance = useCallback(() => {
    if (!isLast) setStepIdx(s => s + 1)
  }, [isLast])

  const runAll = useCallback(async () => {
    setRunning(true)
    for (let i = stepIdx + 1; i < prog.steps.length; i++) {
      await new Promise(r => setTimeout(r, 420))
      setStepIdx(i)
    }
    setRunning(false)
  }, [stepIdx, prog.steps.length])

  const reset = (key?: ProgramKey) => {
    setProgKey(key ?? progKey)
    setStepIdx(0)
    setRunning(false)
  }

  return (
    <div className="grid md:grid-cols-[1fr_260px] min-h-100">

      {/* ── Code canvas ────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="lt-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#lt-dots)" />
        </svg>

        {/* Program selector */}
        <div className="relative z-10 flex gap-1.5 p-3 border-b border-white/5 flex-wrap">
          {ORDER.map(key => {
            const p = PROGRAMS[key]
            return (
              <button key={key}
                onClick={() => reset(key)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap"
                style={progKey === key
                  ? { background: p.color + "20", color: p.color, border: `1px solid ${p.color}40` }
                  : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
                }
              >
                {p.label}
              </button>
            )
          })}
        </div>

        {/* Code editor area */}
        <div className="relative z-10 flex-1 p-4 font-mono text-sm overflow-auto">
          <p className="text-[10px] text-slate-500 mb-2 font-sans">{prog.desc}</p>
          {prog.code.map((line, i) => {
            const isHighlighted = step.highlight.includes(i)
            const isExec = step.line === i
            return (
              <motion.div key={i}
                className="flex items-center gap-3 rounded-lg px-2 py-1 transition-all"
                animate={{
                  background: isHighlighted ? prog.color + "18" : "transparent",
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Line number */}
                <span className="text-slate-600 text-[10px] w-4 shrink-0 text-right select-none">
                  {i + 1}
                </span>

                {/* Execution arrow */}
                <span className="w-3 shrink-0">
                  {isExec && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                      style={{ color: prog.color }}
                      className="font-bold text-xs"
                    >
                      ▶
                    </motion.span>
                  )}
                </span>

                {/* Code line */}
                <span className={`text-xs leading-relaxed ${line === "" ? "text-transparent" : ""}`}
                  style={{ color: isHighlighted ? "#F1F5F9" : "#64748B" }}
                >
                  {line || " "}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center gap-2 p-3 border-t border-white/5">
          <button onClick={() => advance()} disabled={running || isLast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all disabled:opacity-40"
            style={{ background: prog.color + "20", color: prog.color, border: `1px solid ${prog.color}40` }}
          >
            <ChevronRight size={12} /> Step
          </button>
          <button onClick={runAll} disabled={running || isLast}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all disabled:opacity-40"
            style={{ background: prog.color }}
          >
            <Play size={12} /> Run All
          </button>
          <button onClick={() => reset()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-white/10 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <RotateCcw size={11} /> Reset
          </button>
          <span className="ml-auto text-[9px] text-slate-600">
            Step {stepIdx + 1} / {prog.steps.length}
          </span>
        </div>
      </div>

      {/* ── Tracer panel ───────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">

        {/* Step note */}
        <AnimatePresence mode="wait">
          <motion.div key={stepIdx}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            <div className="rounded-xl p-3 border" style={{ borderColor: prog.color + "40", background: prog.color + "08" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: prog.color }}>
                Step {stepIdx + 1}
              </p>
              <p className="text-xs text-gray-700 leading-snug">{step.note}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Variable memory boxes */}
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Variable State</p>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(step.vars).map(([name, val]) => (
              <motion.div key={name}
                className="rounded-xl border-2 p-2 text-center"
                animate={{
                  borderColor: prog.color + "50",
                  background:  prog.color + "08",
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{name}</p>
                <motion.p key={`${name}-${val}`}
                  initial={{ scale: 1.3, color: prog.color }} animate={{ scale: 1 }}
                  className="text-base font-bold font-sora mt-0.5"
                  style={{ color: String(val) === "" ? "#94A3B8" : prog.color }}
                >
                  {String(val)}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Output window */}
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Output</p>
          <div className="rounded-xl bg-gray-900 border border-gray-700 p-2.5 min-h-10 font-mono">
            <AnimatePresence>
              {step.output.length === 0 ? (
                <p className="text-[10px] text-gray-600 italic"> no output yet </p>
              ) : (
                <div className="flex flex-wrap gap-x-1">
                  {step.output.map((o, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-xs font-mono"
                      style={{ color: o === "↵" ? "#475569" : prog.color }}
                    >
                      {o === "↵" ? "⏎" : o + " "}
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Concept box */}
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-3 mt-auto">
          <p className="text-[10px] font-bold text-violet-700 mb-0.5">Concept</p>
          <p className="text-[10px] text-violet-700 leading-snug">{prog.concept}</p>
        </div>

        {isLast && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-center"
          >
            <p className="text-xs font-bold text-emerald-700">Program complete!</p>
            <button onClick={() => reset()}
              className="text-[10px] text-emerald-600 hover:text-emerald-800 mt-0.5 transition-colors"
            >
              Run again →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
