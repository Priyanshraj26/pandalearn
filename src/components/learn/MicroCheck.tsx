"use client"

import { useState } from "react"
import { CheckCircle, XCircle, HelpCircle, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  question:    string
  options:     string[]
  correct:     number
  explanation: string
}

export default function MicroCheck({ question, options, correct, explanation }: Props) {
  const [open,     setOpen]     = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  return (
    <div className="rounded-2xl border-2 border-violet-100 overflow-hidden">

      {/* ── header / toggle ── */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-violet-50/40 transition-colors"
      >
        <div className="w-7 h-7 rounded-full border border-violet-200 flex items-center justify-center shrink-0">
          <HelpCircle size={14} className="text-violet-600" />
        </div>
        <span className="text-xs font-bold text-violet-600 uppercase tracking-widest flex-1">
          Quick Check
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-violet-400" />
        </motion.div>
      </button>

      {/* ── collapsible body ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-4">
              <p className="text-sm font-medium text-gray-800">{question}</p>

              <div className="space-y-2">
                {options.map((opt, i) => {
                  let cls =
                    "border border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50 cursor-pointer"
                  if (answered) {
                    if (i === correct)      cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800 cursor-default"
                    else if (i === selected) cls = "border-2 border-rose-400   bg-rose-50   text-rose-700   cursor-default"
                    else                    cls = "border border-gray-100 bg-gray-50 text-gray-400 cursor-default"
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
                  className={`p-3 rounded-xl flex items-start gap-2 ${
                    selected === correct
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-rose-50 border border-rose-200"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
