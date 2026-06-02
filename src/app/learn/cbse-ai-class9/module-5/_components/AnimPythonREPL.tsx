"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, ChevronRight, RotateCcw, Terminal } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type ProgramKey = "simple_interest" | "grade_checker" | "sum_list" | "pattern"

interface ExecStep {
  lineHighlight: number
  vars:          Record<string, string | number>
  output:        string[]
  note:          string
  inputPrompt?:  string
}

interface Program {
  key:      ProgramKey
  label:    string
  emoji:    string
  color:    string
  desc:     string
  code:     string[]
  inputs:   { label: string; placeholder: string; key: string }[]
  buildSteps: (inputs: Record<string, string>) => ExecStep[]
}

// ── Program definitions ───────────────────────────────────────────────────────

const PROGRAMS: Program[] = [
  {
    key: "simple_interest", label: "Simple Interest", emoji: "💰", color: "#22D3EE",
    desc: "Calculate Simple Interest: SI = (P × R × T) / 100",
    code: [
      "P = float(input('Principal: '))",
      "R = float(input('Rate %: '))",
      "T = float(input('Time (years): '))",
      "SI = (P * R * T) / 100",
      "print('Simple Interest =', SI)",
    ],
    inputs: [
      { label: "Principal (₹)", placeholder: "2000", key: "P" },
      { label: "Rate (%)",      placeholder: "4.5",  key: "R" },
      { label: "Time (years)",  placeholder: "10",   key: "T" },
    ],
    buildSteps: ({ P, R, T }) => {
      const p = parseFloat(P) || 2000
      const r = parseFloat(R) || 4.5
      const t = parseFloat(T) || 10
      const si = (p * r * t) / 100
      return [
        { lineHighlight: 0, vars: { P: "", R: "", T: "", SI: "" }, output: [],                     note: `input() gets P from the user. P = ${p}` },
        { lineHighlight: 0, vars: { P: p, R: "", T: "", SI: "" },   output: [],                     note: `P = ${p} stored as a float.` },
        { lineHighlight: 1, vars: { P: p, R: r, T: "", SI: "" },     output: [],                     note: `R = ${r}` },
        { lineHighlight: 2, vars: { P: p, R: r, T: t, SI: "" },       output: [],                     note: `T = ${t}` },
        { lineHighlight: 3, vars: { P: p, R: r, T: t, SI: si },        output: [],                     note: `SI = (${p} × ${r} × ${t}) / 100 = ${si}` },
        { lineHighlight: 4, vars: { P: p, R: r, T: t, SI: si },        output: [`Simple Interest = ${si}`], note: `print() outputs the result.` },
      ]
    },
  },
  {
    key: "grade_checker", label: "Grade Checker", emoji: "🎓", color: "#8B5CF6",
    desc: "Check a student's grade using if/elif/else",
    code: [
      "marks = int(input('Enter marks: '))",
      "if marks >= 90:",
      '    grade = "A"',
      "elif marks >= 75:",
      '    grade = "B"',
      "elif marks >= 60:",
      '    grade = "C"',
      "else:",
      '    grade = "F"',
      "print('Grade:', grade)",
    ],
    inputs: [{ label: "Marks (0–100)", placeholder: "74", key: "marks" }],
    buildSteps: ({ marks }) => {
      const m = parseInt(marks) || 74
      let grade = "F"
      if (m >= 90) grade = "A"
      else if (m >= 75) grade = "B"
      else if (m >= 60) grade = "C"

      const steps: ExecStep[] = [
        { lineHighlight: 0, vars: { marks: "", grade: "" }, output: [], note: `input() reads marks. marks = ${m}` },
        { lineHighlight: 0, vars: { marks: m,   grade: "" }, output: [], note: `int() converts string "${marks}" → integer ${m}` },
        { lineHighlight: 1, vars: { marks: m,   grade: "" }, output: [], note: `Check: ${m} >= 90 → ${m >= 90 ? "True → execute block" : "False → skip"}` },
      ]
      if (m >= 90) {
        steps.push({ lineHighlight: 2, vars: { marks: m, grade: "A" }, output: [], note: `grade = "A"` })
      } else {
        steps.push({ lineHighlight: 3, vars: { marks: m, grade: "" }, output: [], note: `Check: ${m} >= 75 → ${m >= 75 ? "True → execute block" : "False → skip"}` })
        if (m >= 75) {
          steps.push({ lineHighlight: 4, vars: { marks: m, grade: "B" }, output: [], note: `grade = "B"` })
        } else {
          steps.push({ lineHighlight: 5, vars: { marks: m, grade: "" }, output: [], note: `Check: ${m} >= 60 → ${m >= 60 ? "True → execute block" : "False → skip"}` })
          if (m >= 60) {
            steps.push({ lineHighlight: 6, vars: { marks: m, grade: "C" }, output: [], note: `grade = "C"` })
          } else {
            steps.push({ lineHighlight: 7, vars: { marks: m, grade: "" }, output: [], note: `All conditions False → else block` })
            steps.push({ lineHighlight: 8, vars: { marks: m, grade: "F" }, output: [], note: `grade = "F"` })
          }
        }
      }
      steps.push({ lineHighlight: 9, vars: { marks: m, grade }, output: [`Grade: ${grade}`], note: `print('Grade:', "${grade}")` })
      return steps
    },
  },
  {
    key: "sum_list", label: "Sum of a List", emoji: "📋", color: "#10B981",
    desc: "Find the sum of all numbers in a list using a for loop",
    code: [
      "numbers = [10, 20, 30, 40, 50]",
      "total = 0",
      "for n in numbers:",
      "    total = total + n",
      "print('Sum:', total)",
    ],
    inputs: [],
    buildSteps: () => {
      const nums = [10, 20, 30, 40, 50]
      const steps: ExecStep[] = [
        { lineHighlight: 0, vars: { numbers: "[10,20,30,40,50]", total: "", n: "" }, output: [], note: "numbers = [10, 20, 30, 40, 50]  create the list" },
        { lineHighlight: 1, vars: { numbers: "[10,20,30,40,50]", total: 0,   n: "" }, output: [], note: "total = 0  accumulator starts at 0" },
      ]
      let running = 0
      for (const num of nums) {
        running += num
        steps.push({ lineHighlight: 2, vars: { numbers: "[10,20,30,40,50]", total: running - num, n: num }, output: [], note: `Loop iteration: n = ${num}` })
        steps.push({ lineHighlight: 3, vars: { numbers: "[10,20,30,40,50]", total: running, n: num },        output: [], note: `total = ${running - num} + ${num} = ${running}` })
      }
      steps.push({ lineHighlight: 4, vars: { numbers: "[10,20,30,40,50]", total: 150, n: 50 }, output: ["Sum: 150"], note: "Loop ends. print('Sum:', 150)" })
      return steps
    },
  },
  {
    key: "pattern", label: "Number Pattern", emoji: "⭐", color: "#F97316",
    desc: "Print a right-angled number triangle",
    code: [
      "n = int(input('Rows: '))",
      "for i in range(1, n+1):",
      "    for j in range(1, i+1):",
      "        print(j, end=' ')",
      "    print()",
    ],
    inputs: [{ label: "Rows", placeholder: "4", key: "n" }],
    buildSteps: ({ n: nStr }) => {
      const n = Math.min(parseInt(nStr) || 4, 5)
      const steps: ExecStep[] = [
        { lineHighlight: 0, vars: { n, i: "", j: "" }, output: [], note: `n = ${n} rows` },
      ]
      const out: string[] = []
      for (let i = 1; i <= n; i++) {
        steps.push({ lineHighlight: 1, vars: { n, i, j: "" }, output: [...out], note: `Outer loop: i = ${i}` })
        const row: string[] = []
        for (let j = 1; j <= i; j++) {
          row.push(String(j))
          steps.push({ lineHighlight: 3, vars: { n, i, j }, output: [...out, row.join(" ")], note: `print(${j}, end=' ')` })
        }
        out.push(row.join(" "))
        steps.push({ lineHighlight: 4, vars: { n, i, j: i }, output: [...out], note: `print() → newline. Row ${i} complete: ${row.join(" ")}` })
      }
      return steps
    },
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimPythonREPL() {
  const [progIdx, setProgIdx]       = useState(0)
  const [inputs, setInputs]         = useState<Record<string, string>>({})
  const [steps, setSteps]           = useState<ExecStep[] | null>(null)
  const [stepIdx, setStepIdx]       = useState(0)
  const [running, setRunning]       = useState(false)
  const [inputPhase, setInputPhase] = useState(true)

  const prog = PROGRAMS[progIdx]
  const step = steps?.[stepIdx]

  const compile = useCallback(() => {
    const built = prog.buildSteps(inputs)
    setSteps(built)
    setStepIdx(0)
    setInputPhase(false)
  }, [prog, inputs])

  const advance = useCallback(() => {
    if (!steps) return
    if (stepIdx < steps.length - 1) setStepIdx(s => s + 1)
  }, [steps, stepIdx])

  const runAll = useCallback(async () => {
    if (!steps) return
    setRunning(true)
    for (let i = stepIdx + 1; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 380))
      setStepIdx(i)
    }
    setRunning(false)
  }, [steps, stepIdx])

  const reset = (idx?: number) => {
    const p = PROGRAMS[idx ?? progIdx]
    setProgIdx(idx ?? progIdx)
    setInputs({})
    setSteps(null)
    setStepIdx(0)
    setRunning(false)
    setInputPhase(true)
    void p
  }

  const isLast = steps ? stepIdx === steps.length - 1 : false

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100">

      {/* ── Code canvas ────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="repl-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#repl-dots)" />
        </svg>

        {/* Program tabs */}
        <div className="relative z-10 flex gap-1.5 p-3 border-b border-white/5 flex-wrap">
          {PROGRAMS.map((p, i) => (
            <button key={p.key}
              onClick={() => reset(i)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap"
              style={progIdx === i
                ? { background: p.color + "20", color: p.color, border: `1px solid ${p.color}40` }
                : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
              }
            >
              <span>{p.emoji}</span> {p.label}
            </button>
          ))}
        </div>

        {/* Code lines */}
        <div className="relative z-10 flex-1 p-4 font-mono overflow-auto">
          <p className="text-[9px] text-slate-500 italic mb-2 font-sans">{prog.desc}</p>
          {prog.code.map((line, i) => {
            const isActive = step?.lineHighlight === i
            return (
              <motion.div key={i}
                animate={{ background: isActive ? prog.color + "18" : "transparent" }}
                className="flex items-center gap-2.5 rounded px-2 py-0.5"
              >
                <span className="text-[9px] text-slate-600 w-4 text-right select-none shrink-0">{i + 1}</span>
                <span className="shrink-0 w-3">
                  {isActive && (
                    <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-bold" style={{ color: prog.color }}
                    >▶</motion.span>
                  )}
                </span>
                <span className="text-xs leading-relaxed"
                  style={{ color: isActive ? "#F1F5F9" : line.startsWith("#") ? "#475569" : "#64748B" }}
                >
                  {line || " "}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Output console */}
        {steps && step && step.output.length > 0 && (
          <div className="relative z-10 border-t border-white/5 px-4 py-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Terminal size={10} className="text-slate-500" />
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Output</p>
            </div>
            <div className="font-mono space-y-0.5">
              {step.output.map((line, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                  className="text-xs" style={{ color: prog.color }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="relative z-10 flex items-center gap-2 p-3 border-t border-white/5">
          {steps ? (
            <>
              <button onClick={advance} disabled={running || isLast}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all disabled:opacity-40"
                style={{ background: prog.color + "20", color: prog.color, border: `1px solid ${prog.color}40` }}
              >
                <ChevronRight size={12} /> Step
              </button>
              <button onClick={runAll} disabled={running || isLast}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white disabled:opacity-40"
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
                {stepIdx + 1} / {steps.length}
              </span>
            </>
          ) : (
            <button onClick={compile}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold text-white"
              style={{ background: prog.color }}
            >
              <Play size={12} /> Run Program
            </button>
          )}
        </div>
      </div>

      {/* ── Execution panel ─────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">

        {inputPhase ? (
          /* Input form */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3 flex-1">
            <div>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">Set Inputs</p>
              <p className="text-xs font-semibold text-gray-900">{prog.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{prog.desc}</p>
            </div>

            {prog.inputs.length > 0 ? (
              prog.inputs.map(inp => (
                <div key={inp.key}>
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block mb-1">
                    {inp.label}
                  </label>
                  <input
                    value={inputs[inp.key] || ""}
                    onChange={e => setInputs(p => ({ ...p, [inp.key]: e.target.value }))}
                    placeholder={inp.placeholder}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-100"
                  />
                  <p className="text-[9px] text-gray-400 mt-0.5">Default: {inp.placeholder}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                <p className="text-xs text-gray-500">This program uses a hardcoded list  no inputs needed.</p>
              </div>
            )}

            <button onClick={compile}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white mt-auto"
              style={{ background: prog.color }}
            >
              <Play size={13} /> Run &amp; Trace
            </button>
          </motion.div>

        ) : step ? (
          /* Execution view */
          <motion.div key={stepIdx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 flex-1"
          >
            {/* Step callout */}
            <div className="rounded-xl p-3 border" style={{ borderColor: prog.color + "40", background: prog.color + "08" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: prog.color }}>
                Step {stepIdx + 1} of {steps?.length}
              </p>
              <p className="text-xs text-gray-700 leading-snug">{step.note}</p>
            </div>

            {/* Memory boxes */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Memory</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(step.vars).map(([name, val]) => (
                  <motion.div key={name}
                    className="rounded-xl border-2 p-2 text-center"
                    animate={{ borderColor: prog.color + "50", background: prog.color + "08" }}
                  >
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{name}</p>
                    <motion.p key={`${name}-${val}`}
                      initial={{ scale: 1.25 }} animate={{ scale: 1 }}
                      className="text-sm font-bold font-sora mt-0.5 truncate"
                      style={{ color: String(val) === "" ? "#D1D5DB" : prog.color }}
                      title={String(val)}
                    >
                      {String(val)}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Output console */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Console</p>
              <div className="rounded-xl bg-gray-900 border border-gray-700 p-2.5 min-h-12 font-mono">
                {step.output.length === 0
                  ? <p className="text-[10px] text-gray-600 italic"> no output yet </p>
                  : step.output.map((line, i) => (
                    <motion.p key={i}
                      initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                      className="text-xs" style={{ color: prog.color }}
                    >
                      {line}
                    </motion.p>
                  ))
                }
              </div>
            </div>

            {isLast && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center"
              >
                <p className="text-xs font-bold text-emerald-700">Program finished!</p>
                <button onClick={() => reset()}
                  className="text-[10px] text-emerald-600 mt-0.5 hover:text-emerald-800 transition-colors"
                >
                  Change inputs & run again →
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
