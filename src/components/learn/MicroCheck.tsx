"use client"

import { useState } from "react"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"

interface Props {
  question:    string
  options:     string[]
  correct:     number
  explanation: string
}

export default function MicroCheck({ question, options, correct, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  return (
    <div className="rounded-2xl border-2 border-violet-100 bg-violet-50/50 p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle size={14} className="text-violet-600" />
        </div>
        <div>
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-1">
            Quick Check
          </p>
          <p className="text-sm font-medium text-gray-800">{question}</p>
        </div>
      </div>

      <div className="space-y-2">
        {options.map((opt, i) => {
          let cls =
            "border border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50 cursor-pointer"
          if (answered) {
            if (i === correct)     cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800 cursor-default"
            else if (i === selected) cls = "border-2 border-rose-400   bg-rose-50   text-rose-700   cursor-default"
            else                   cls = "border border-gray-100 bg-gray-50 text-gray-400 cursor-default"
          }
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${cls}`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={`mt-3 p-3 rounded-xl flex items-start gap-2 ${
            selected === correct ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"
          }`}
        >
          {selected === correct
            ? <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
            : <XCircle    size={14} className="text-rose-500   shrink-0 mt-0.5" />
          }
          <p className="text-xs text-gray-700 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  )
}
