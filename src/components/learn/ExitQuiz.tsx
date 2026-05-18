"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, BookOpen } from "lucide-react"

export interface QuizQuestion {
  question:    string
  options:     string[]
  correct:     number
  explanation: string
}

interface Props {
  moduleName:     string
  questions:      QuizQuestion[]
  passThreshold:  number
  onPass?:        () => void
}

type Stage = "intro" | "active" | "review"

export default function ExitQuiz({ moduleName, questions, passThreshold, onPass }: Props) {
  const [stage,   setStage]   = useState<Stage>("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [picked,  setPicked]  = useState<number | null>(null)

  const score  = answers.filter((a, i) => a === questions[i].correct).length
  const passed = score >= passThreshold
  const q      = questions[current]

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    setAnswers(prev => { const n = [...prev]; n[current] = i; return n })
  }

  function next() {
    setPicked(null)
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
    } else {
      setStage("review")
      if (passed && onPass) onPass()
    }
  }

  function retry() {
    setStage("intro")
    setCurrent(0)
    setAnswers(Array(questions.length).fill(null))
    setPicked(null)
  }

  // ── Intro ─────────────────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
          <BookOpen size={24} className="text-violet-600" />
        </div>
        <h3 className="font-sora text-xl font-bold text-gray-900 mb-1">Module Exit Quiz</h3>
        <p className="text-gray-500 text-sm mb-1">{moduleName}</p>
        <p className="text-gray-400 text-sm mb-6">
          {questions.length} questions · Pass mark: {passThreshold}/{questions.length}
        </p>
        <button
          onClick={() => setStage("active")}
          className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-500 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    )
  }

  // ── Review ────────────────────────────────────────────────────────────────
  if (stage === "review") {
    return (
      <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
        <div className={`p-6 text-center ${passed ? "bg-emerald-50" : "bg-rose-50"}`}>
          {passed
            ? <Trophy  size={36} className="text-emerald-500 mx-auto mb-3" />
            : <XCircle size={36} className="text-rose-400   mx-auto mb-3" />
          }
          <h3 className="font-sora text-2xl font-bold text-gray-900 mb-1">
            {passed ? "Module Complete!" : "Not quite — keep going!"}
          </h3>
          <p className="text-4xl font-bold text-gray-900 mb-1 tabular-nums">
            {score}
            <span className="text-gray-400 text-xl">/{questions.length}</span>
          </p>
          <p className={`text-sm font-semibold ${passed ? "text-emerald-600" : "text-rose-600"}`}>
            {passed ? `Passed! (required ${passThreshold})` : `Need ${passThreshold} to unlock next module`}
          </p>
        </div>

        <div className="p-5 space-y-2 max-h-96 overflow-y-auto">
          {questions.map((q, i) => {
            const ok = answers[i] === q.correct
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl text-sm ${ok ? "bg-emerald-50" : "bg-rose-50"}`}
              >
                {ok
                  ? <CheckCircle size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                  : <XCircle    size={15} className="text-rose-500   mt-0.5 shrink-0" />
                }
                <div className="min-w-0">
                  <p className="text-gray-700 mb-0.5">{q.question}</p>
                  {!ok && (
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Correct: </span>{q.options[q.correct]}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-5 pt-0 flex gap-3">
          <button
            onClick={retry}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={14} /> Retry
          </button>
          {passed && (
            <button className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-500 transition-colors">
              Next Module →
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── Active question ───────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
      {/* progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-violet-500 transition-all duration-300"
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Question {current + 1} of {questions.length}
          </span>
          <span className="text-xs text-gray-400">{questions.length - current - 1} remaining</span>
        </div>

        <p className="text-base font-medium text-gray-900 mb-5 leading-relaxed">{q.question}</p>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            let cls =
              "border border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50 cursor-pointer"
            if (picked !== null) {
              if (i === q.correct)  cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800 cursor-default"
              else if (i === picked) cls = "border-2 border-rose-400   bg-rose-50   text-rose-700   cursor-default"
              else                  cls = "border border-gray-100 bg-gray-50 text-gray-400 cursor-default"
            }
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={picked !== null}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${cls}`}
              >
                <span className="font-bold text-violet-600 mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {picked !== null && (
          <>
            <div
              className={`mt-4 p-3.5 rounded-xl flex items-start gap-2.5 ${
                picked === q.correct
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-rose-50 border border-rose-200"
              }`}
            >
              {picked === q.correct
                ? <CheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                : <XCircle    size={15} className="text-rose-500   shrink-0 mt-0.5" />
              }
              <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
            </div>
            <button
              onClick={next}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-500 transition-colors"
            >
              {current + 1 === questions.length ? "See Results" : "Next Question"}
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
