"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bug, CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Lightbulb } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type BugType = "logic" | "syntax" | "runtime" | "infinite"

interface BugChallenge {
  id:         number
  title:      string
  bugType:    BugType
  bugLabel:   string
  desc:       string
  code:       string[]
  bugLine:    number          // 0-indexed line with the bug
  options:    string[]        // fix options (one correct)
  correct:    number          // index of correct option
  fixedCode:  string[]        // corrected version
  explain:    string
  hint:       string
}

// ── Bug challenges ────────────────────────────────────────────────────────────

const BUGS: BugChallenge[] = [
  {
    id: 1,
    title: "The Infinite Loop",
    bugType: "infinite",
    bugLabel: "Infinite Loop",
    desc: "This program should print numbers 1 to 5 using a while loop. But it runs forever. Find the bug.",
    code: [
      "i = 1",
      "while i <= 5:",
      "    print(i)",
      "# Bug: counter never changes!",
    ],
    bugLine: 2,
    options: [
      "Change while i <= 5 to while i < 5",
      "Add i = i + 1 after print(i)",
      "Change i = 1 to i = 0",
      "Remove the while loop entirely",
    ],
    correct: 1,
    fixedCode: [
      "i = 1",
      "while i <= 5:",
      "    print(i)",
      "    i = i + 1   ← added",
    ],
    explain: "The while loop condition (i <= 5) is never False because i never changes. The fix is to increment i inside the loop. This is the most common beginner mistake with while loops.",
    hint: "What happens to i inside the loop body?",
  },
  {
    id: 2,
    title: "Off-by-One Error",
    bugType: "logic",
    bugLabel: "Logic Error",
    desc: "This should print numbers 1 to 10. It prints 1 to 9 instead. Which line is wrong?",
    code: [
      "for i in range(1, 10):",
      "    print(i)",
    ],
    bugLine: 0,
    options: [
      "Change print(i) to print(i + 1)",
      "Change range(1, 10) to range(1, 11)",
      "Change range(1, 10) to range(0, 10)",
      "Add a break statement",
    ],
    correct: 1,
    fixedCode: [
      "for i in range(1, 11):  ← stop is exclusive",
      "    print(i)",
    ],
    explain: "range(start, stop) is exclusive of the stop value. range(1, 10) gives 1 through 9. To include 10, use range(1, 11). This is called an 'off-by-one' error  extremely common in real-world code.",
    hint: "Remember: range(a, b) includes a but NOT b.",
  },
  {
    id: 3,
    title: "Wrong Area Formula",
    bugType: "logic",
    bugLabel: "Logic Error",
    desc: "This calculates the area of a rectangle. The output is wrong. Spot the mistake.",
    code: [
      "length = 8",
      "width  = 5",
      "area = length + width",
      "print('Area:', area)",
    ],
    bugLine: 2,
    options: [
      "Change length + width to length - width",
      "Change length + width to length * width",
      "Change length + width to length / width",
      "Change length + width to length ** width",
    ],
    correct: 1,
    fixedCode: [
      "length = 8",
      "width  = 5",
      "area = length * width   ← * not +",
      "print('Area:', area)    # Output: 40",
    ],
    explain: "Area of a rectangle = length × width (multiplication). Using + gives the perimeter of two sides (13), not the area (40). Always double-check your formulas  wrong operators are a silent logic error.",
    hint: "What is the formula for the area of a rectangle?",
  },
  {
    id: 4,
    title: "Grade Check Gone Wrong",
    bugType: "logic",
    bugLabel: "Logic Error",
    desc: "A student scores 95. This should print 'A' but prints 'B'. Find the bug.",
    code: [
      "marks = 95",
      "if marks > 90:",
      '    grade = "A"',
      "elif marks >= 90:",
      '    grade = "B"',
      "print(grade)",
    ],
    bugLine: 1,
    options: [
      "Change marks > 90 to marks >= 90",
      "Change marks > 90 to marks >= 91",
      "Change marks > 90 to marks == 95",
      "Remove the elif block",
    ],
    correct: 0,
    fixedCode: [
      "marks = 95",
      "if marks >= 90:   ← was: marks > 90",
      '    grade = "A"   # 95 >= 90 → True ✓',
      "elif marks >= 75:",
      '    grade = "B"',
      "print(grade)      # Output: A",
    ],
    explain: "The original used marks > 90 (strictly greater), so 90 would fall through to the elif and get grade B. The fix is marks >= 90 (greater than or equal). Boundary conditions like this are a classic source of bugs in grading systems.",
    hint: "What happens when marks is exactly 90? Should that be A or B?",
  },
  {
    id: 5,
    title: "List Index Out of Range",
    bugType: "runtime",
    bugLabel: "Runtime Error",
    desc: "This tries to print the last item of a list. It crashes with IndexError. Why?",
    code: [
      'fruits = ["apple", "banana", "mango"]',
      "last = fruits[3]",
      "print(last)",
    ],
    bugLine: 1,
    options: [
      "Change fruits[3] to fruits[2]",
      "Change fruits[3] to fruits[-1]",
      "Both A and B would fix it",
      "Remove the print statement",
    ],
    correct: 2,
    fixedCode: [
      'fruits = ["apple", "banana", "mango"]',
      "last = fruits[2]    # OR fruits[-1]",
      "print(last)         # Output: mango",
    ],
    explain: "The list has 3 items at indices 0, 1, 2. fruits[3] doesn't exist  Python raises IndexError. Either fruits[2] (positive index of last item) or fruits[-1] (negative index meaning 'last') work. fruits[-1] is more Pythonic when you just want the last item.",
    hint: "A list of 3 items has indices 0, 1, and 2. What is index 3?",
  },
  {
    id: 6,
    title: "Average Calculation Error",
    bugType: "logic",
    bugLabel: "Logic Error",
    desc: "This should print the average of 3 exam scores. It prints 225.0 instead of 75.0. Fix it.",
    code: [
      "s1, s2, s3 = 80, 70, 75",
      "average = s1 + s2 + s3 / 3",
      "print('Average:', average)",
    ],
    bugLine: 1,
    options: [
      "Change s1 + s2 + s3 / 3 to (s1 + s2 + s3) / 3",
      "Change s1 + s2 + s3 / 3 to s1 + s2 + s3 // 3",
      "Change the values to s1, s2, s3 = 75, 75, 75",
      "Divide by 3.0 instead of 3",
    ],
    correct: 0,
    fixedCode: [
      "s1, s2, s3 = 80, 70, 75",
      "average = (s1 + s2 + s3) / 3  ← brackets!",
      "print('Average:', average)     # Output: 75.0",
    ],
    explain: "Python operator precedence: division happens BEFORE addition, just like in maths. So s1 + s2 + s3/3 = 80 + 70 + 25 = 175, not 225. You must use brackets: (s1 + s2 + s3) / 3. Operator precedence bugs are extremely common.",
    hint: "In maths: does 3 + 6 + 9 / 3 = 6 or 15?",
  },
  {
    id: 7,
    title: "The Broken Condition",
    bugType: "syntax",
    bugLabel: "Syntax / Logic",
    desc: "This should check if a number is even. It says every number is even. Find the bug.",
    code: [
      "n = 7",
      "if n % 2 = 0:",
      '    print("Even")',
      "else:",
      '    print("Odd")',
    ],
    bugLine: 1,
    options: [
      "Change n % 2 = 0 to n % 2 == 0",
      "Change n % 2 to n // 2",
      "Change if to while",
      "Change n = 7 to n = 8",
    ],
    correct: 0,
    fixedCode: [
      "n = 7",
      "if n % 2 == 0:   ← == not =",
      '    print("Even")',
      "else:",
      '    print("Odd")  # Output: Odd',
    ],
    explain: "= is assignment (n = 7 means 'store 7 in n'). == is comparison (n == 0 means 'is n equal to 0?'). Using = inside an if condition is a SyntaxError in Python. This is the single most common beginner mistake in programming.",
    hint: "Is = and == the same in Python?",
  },
  {
    id: 8,
    title: "Sum List Bug",
    bugType: "logic",
    bugLabel: "Logic Error",
    desc: "This should sum a list. It always outputs 0. The accumulator is never updated.",
    code: [
      "nums = [10, 20, 30, 40]",
      "total = 0",
      "for n in nums:",
      "    total = n",
      "print(total)",
    ],
    bugLine: 3,
    options: [
      "Change total = n to total = total + n",
      "Change total = n to total = total - n",
      "Change total = 0 to total = 1",
      "Change for n in nums to for n in range(4)",
    ],
    correct: 0,
    fixedCode: [
      "nums = [10, 20, 30, 40]",
      "total = 0",
      "for n in nums:",
      "    total = total + n  ← += n also works",
      "print(total)           # Output: 100",
    ],
    explain: "total = n replaces total with the current value of n each iteration  it doesn't accumulate. total = total + n adds n to the running total. The shorthand total += n does the same thing. Accumulators are fundamental to loops.",
    hint: "Does total = n add to total, or replace total?",
  },
]

const BUG_COLORS: Record<BugType, { color: string; bg: string; border: string }> = {
  logic:    { color: "#F97316", bg: "#FFF7ED", border: "#FDBA74" },
  syntax:   { color: "#EF4444", bg: "#FEF2F2", border: "#FCA5A5" },
  runtime:  { color: "#8B5CF6", bg: "#F5F3FF", border: "#C4B5FD" },
  infinite: { color: "#D97706", bg: "#FFFBEB", border: "#FCD34D" },
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimDebugArena() {
  const [idx,      setIdx]      = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showFixed, setFixed]   = useState(false)
  const [score,    setScore]    = useState(0)
  const [done,     setDone]     = useState<number[]>([])

  const bug = BUGS[idx]
  const bugColors = BUG_COLORS[bug.bugType]
  const correct = selected === bug.correct
  const allDone = done.length === BUGS.length

  const handleSelect = (i: number) => {
    if (revealed) return
    setSelected(i)
    setRevealed(true)
    if (i === bug.correct) setScore(s => s + 1)
    setDone(d => d.includes(idx) ? d : [...d, idx])
  }

  const next = useCallback(() => {
    if (idx < BUGS.length - 1) {
      setIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
      setShowHint(false)
      setFixed(false)
    }
  }, [idx])

  const restart = () => {
    setIdx(0); setSelected(null); setRevealed(false)
    setShowHint(false); setFixed(false); setScore(0); setDone([])
  }

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100">

      {/* ── Code canvas ────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="da-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#da-dots)" />
        </svg>

        {/* Header */}
        <div className="relative z-10 px-4 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Bug size={12} style={{ color: bugColors.color }} />
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: bugColors.color }}>
              {bug.bugLabel}
            </p>
            <span className="ml-auto text-[9px] text-slate-600">{idx + 1} / {BUGS.length}</span>
          </div>
          <h3 className="font-sora font-bold text-white text-sm">{bug.title}</h3>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{bug.desc}</p>
        </div>

        {/* Code */}
        <div className="relative z-10 flex-1 p-4 font-mono overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={`${idx}-${showFixed}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {(showFixed ? bug.fixedCode : bug.code).map((line, i) => {
                const isBugLine = !showFixed && i === bug.bugLine
                return (
                  <div key={i}
                    className="flex items-start gap-2.5 rounded-lg px-2 py-0.5 mb-0.5"
                    style={isBugLine ? { background: bugColors.color + "18" } : {}}
                  >
                    <span className="text-[9px] text-slate-600 w-4 text-right select-none shrink-0 mt-0.5">{i + 1}</span>
                    <span className="shrink-0 w-3 mt-0.5">
                      {isBugLine && <span style={{ color: bugColors.color }} className="text-xs">🐛</span>}
                      {showFixed && i === bug.bugLine && <span className="text-emerald-400 text-xs">✓</span>}
                    </span>
                    <span className="text-xs leading-relaxed whitespace-pre"
                      style={{
                        color: isBugLine ? "#FCA5A5"
                          : line.startsWith("#") ? "#475569"
                          : line.includes("← ") ? "#6EE7B7"
                          : "#94A3B8",
                      }}
                    >
                      {line}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="relative z-10 mx-4 mb-4 rounded-xl bg-amber-900/30 border border-amber-700/50 px-3 py-2 flex items-start gap-2"
            >
              <Lightbulb size={11} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-300 leading-snug">{bug.hint}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Answer panel ───────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">

        {/* Progress dots */}
        <div className="flex gap-1 flex-wrap">
          {BUGS.map((b, i) => (
            <div key={i}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{
                background: i === idx ? BUG_COLORS[b.bugType].color
                  : done.includes(i) ? "#10B981"
                  : "#E5E7EB",
              }}
            />
          ))}
          <span className="ml-auto text-xs font-bold font-sora text-emerald-600">{score}/{BUGS.length}</span>
        </div>

        {!allDone ? (
          <>
            {/* Fix options */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">How would you fix it?</p>
              <div className="space-y-1.5">
                {bug.options.map((opt, i) => {
                  const isChosen = selected === i
                  const isRight  = i === bug.correct
                  let cls = "bg-gray-50 border-gray-200 text-gray-700"
                  if (revealed && isRight)               cls = "bg-emerald-50 border-emerald-300 text-emerald-800"
                  else if (revealed && isChosen && !isRight) cls = "bg-red-50 border-red-300 text-red-700"
                  return (
                    <motion.button key={i}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      whileHover={!revealed ? { scale: 1.01 } : {}}
                      className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all text-xs ${cls}`}
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[9px] font-bold mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-snug flex-1">{opt}</span>
                      {revealed && isRight && <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />}
                      {revealed && isChosen && !isRight && <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Explanation after reveal */}
            <AnimatePresence>
              {revealed && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-3 border text-xs leading-relaxed ${correct ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}
                >
                  <p className="font-bold mb-1">{correct ? "Correct!" : "Not quite  here's why:"}</p>
                  <p>{bug.explain}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex gap-2 mt-auto">
              {!revealed && (
                <button onClick={() => setShowHint(h => !h)}
                  className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-500 hover:text-amber-700 transition-colors"
                >
                  <Lightbulb size={11} /> Hint
                </button>
              )}
              {revealed && (
                <button onClick={() => setFixed(f => !f)}
                  className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  <CheckCircle2 size={11} /> {showFixed ? "Show bug" : "Show fix"}
                </button>
              )}
              {revealed && idx < BUGS.length - 1 && (
                <button onClick={next}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-white px-3 py-1.5 rounded-lg ml-auto transition-all"
                  style={{ background: bugColors.color }}
                >
                  Next Bug <ChevronRight size={11} />
                </button>
              )}
            </div>
          </>
        ) : (
          /* All done */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-4"
          >
            <motion.div animate={{ rotate: [0, 15, -15, 10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8 }}
            >
              <Trophy size={40} className="text-orange-400 mx-auto" />
            </motion.div>
            <div>
              <h3 className="font-sora font-bold text-gray-900 text-base">Debug Arena Complete!</h3>
              <p className="text-xs text-gray-500 mt-1">You scored <span className="font-bold text-orange-500">{score}/{BUGS.length}</span></p>
            </div>
            <div className="rounded-xl bg-violet-50 border border-violet-100 p-3 w-full text-left">
              <p className="text-[10px] font-bold text-violet-700 mb-1">Bugs you mastered:</p>
              {[
                { t: "Infinite loops",      d: "Always change the loop variable" },
                { t: "Off-by-one errors",   d: "range(a, b) excludes b" },
                { t: "Operator precedence", d: "Use brackets for complex expressions" },
                { t: "= vs ==",             d: "Assign vs compare" },
                { t: "Accumulator pattern", d: "total = total + n, not total = n" },
              ].map(b => (
                <div key={b.t} className="flex items-start gap-1.5 mt-1">
                  <CheckCircle2 size={10} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-violet-700"><strong>{b.t}</strong>: {b.d}</p>
                </div>
              ))}
            </div>
            <button onClick={restart}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RotateCcw size={12} /> Try again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
