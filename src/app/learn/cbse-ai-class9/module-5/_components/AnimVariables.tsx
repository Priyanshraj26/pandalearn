"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Play } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type DataType = "int" | "float" | "str" | "bool"
type Tab = "types" | "ops"

interface TypeMeta {
  label:    string
  color:    string
  dark:     string
  examples: { val: string; meaning: string }[]
  ops:      string
  aiUse:    string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TYPES: Record<DataType, TypeMeta> = {
  int: {
    label: "Integer (int)", color: "#22D3EE", dark: "#0A2636",
    examples: [
      { val: "age = 14",          meaning: "Whole number  no decimal" },
      { val: "score = 95",        meaning: "Student's exam mark"        },
      { val: "year = 2025",       meaning: "A year is always whole"     },
      { val: "num_students = 40", meaning: "Count is always whole"      },
    ],
    ops: "age + 1  →  15\nscore * 2  →  190\nyear - 2000  →  25\nscore // 10  →  9   (floor divide)\nscore % 10  →  5   (remainder)",
    aiUse: "AI uses integers for: pixel coordinates, iteration counts, class labels (0, 1, 2), confusion matrix values (TP=45).",
  },
  float: {
    label: "Float (float)", color: "#F97316", dark: "#2D1200",
    examples: [
      { val: "temperature = 36.6",  meaning: "Decimal number"        },
      { val: "price = 199.99",      meaning: "Rupee amounts"         },
      { val: "probability = 0.87",  meaning: "AI confidence score"   },
      { val: "pi = 3.14159",        meaning: "Mathematical constant" },
    ],
    ops: "temperature + 1.5  →  38.1\nprobability * 100  →  87.0\nround(pi, 2)  →  3.14\nint(probability)  →  0  (truncates)",
    aiUse: "AI uses floats for: loss values (0.023), accuracy (0.96), probabilities (0.87), weights in neural networks.",
  },
  str: {
    label: "String (str)", color: "#8B5CF6", dark: "#1A0A3D",
    examples: [
      { val: 'name = "Aarav"',       meaning: "Text in quotes"         },
      { val: 'city = "Mumbai"',      meaning: "Single or double quotes" },
      { val: 'grade = "A+"',         meaning: "Even a letter is a string" },
      { val: 'msg = "Hello World"',  meaning: "Sentence  multiple words" },
    ],
    ops: 'name + " Kumar"  →  "Aarav Kumar"  (concatenation)\nname.upper()  →  "AARAV"\nname.lower()  →  "aarav"\nlen(name)  →  5\nname[0]  →  "A"  (indexing)',
    aiUse: 'AI uses strings for: processing text in NLP, labels ("spam", "not-spam"), file paths, reading CSV column headers.',
  },
  bool: {
    label: "Boolean (bool)", color: "#10B981", dark: "#0A2D1F",
    examples: [
      { val: "is_passed = True",     meaning: "Only two values: True or False" },
      { val: "is_raining = False",   meaning: "A binary condition"             },
      { val: "10 > 5  →  True",      meaning: "Comparison returns a bool"      },
      { val: '"a" == "b"  →  False', meaning: "Equality check"                 },
    ],
    ops: "True and False  →  False\nTrue or False   →  True\nnot True        →  False\n5 > 3           →  True\n\"AI\" == \"ai\"    →  False",
    aiUse: "AI uses booleans for: classification output (spam: True/False), feature flags (has_diabetes: True), condition checks in every algorithm.",
  },
}

// ── Arithmetic operations explorer ───────────────────────────────────────────

const ARITH_OPS = [
  { op: "+",  name: "Addition",       ex: "10 + 3",  result: "13", use: "Total score, sum of values"        },
  { op: "-",  name: "Subtraction",    ex: "10 - 3",  result: "7",  use: "Difference, remainder after payment" },
  { op: "*",  name: "Multiplication", ex: "10 * 3",  result: "30", use: "Area, scaling, repeated addition"   },
  { op: "/",  name: "Division",       ex: "10 / 3",  result: "3.333…", use: "Average = sum / count"         },
  { op: "//", name: "Floor Division", ex: "10 // 3", result: "3",  use: "Whole part only  e.g. pages used" },
  { op: "%",  name: "Modulus",        ex: "10 % 3",  result: "1",  use: "Remainder  even/odd check, cycles"},
  { op: "**", name: "Exponent",       ex: "2 ** 8",  result: "256",use: "Powers  e.g. 2^8 = 256 colours"  },
]

// ── Variable Box SVG ──────────────────────────────────────────────────────────

function VariableBoxScene({ dtype, example }: { dtype: DataType; example: { val: string; meaning: string } }) {
  const meta = TYPES[dtype]
  const parts = example.val.split("=").map(s => s.trim())
  const varName = parts[0]
  const varVal  = parts[1] || ""

  return (
    <svg viewBox="0 0 380 200" className="w-full max-h-44">
      {/* Memory label */}
      <text x={190} y={18} textAnchor="middle" fill="#475569" fontSize={8} fontWeight="600" letterSpacing="0.1em">
        COMPUTER MEMORY
      </text>

      {/* Memory container */}
      <rect x={20} y={28} width={340} height={148} rx={12} fill="#0D1829" stroke="#1E293B" strokeWidth={1.5} />

      {/* Variable name box (label) */}
      <rect x={40} y={60} width={120} height={56} rx={8} fill={meta.dark} stroke={meta.color} strokeWidth={2} />
      <text x={100} y={82} textAnchor="middle" fill={meta.color} fontSize={8} fontWeight="700" letterSpacing="0.08em">
        VARIABLE NAME
      </text>
      <motion.text key={varName} x={100} y={100}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        textAnchor="middle" fill="#F1F5F9" fontSize={13} fontWeight="800"
      >
        {varName}
      </motion.text>

      {/* Arrow */}
      <motion.path
        d="M 165 88 L 220 88"
        stroke={meta.color} strokeWidth={2} fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <polygon points="218,84 228,88 218,92" fill={meta.color} />
      <text x={192} y={83} textAnchor="middle" fill={meta.color} fontSize={7} fontWeight="700">stores</text>

      {/* Value box */}
      <rect x={230} y={60} width={110} height={56} rx={8} fill={meta.dark} stroke={meta.color} strokeWidth={2} />
      <text x={285} y={82} textAnchor="middle" fill={meta.color} fontSize={8} fontWeight="700" letterSpacing="0.08em">
        VALUE
      </text>
      <motion.text key={varVal} x={285} y={100}
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
        textAnchor="middle" fill="#F1F5F9" fontSize={12} fontWeight="800"
        style={{ transformOrigin: "285px 100px" }}
      >
        {varVal}
      </motion.text>

      {/* Type badge */}
      <rect x={230} y={124} width={110} height={22} rx={6} fill={meta.color + "20"} stroke={meta.color + "40"} strokeWidth={1} />
      <text x={285} y={138} textAnchor="middle" fill={meta.color} fontSize={8} fontWeight="700">
        type: {dtype}
      </text>

      {/* Meaning label */}
      <text x={190} y={165} textAnchor="middle" fill="#475569" fontSize={8}>
        {example.meaning}
      </text>

      {/* Assignment statement above */}
      <rect x={40} y={28} width={340} height={22} rx={6} fill="#060A12" />
      <text x={210} y={43} textAnchor="middle" fill="#64748B" fontSize={9} fontWeight="600" letterSpacing="0.06em">
        {example.val}
      </text>
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimVariables() {
  const [dtype, setDtype]   = useState<DataType>("int")
  const [exIdx, setExIdx]   = useState(0)
  const [tab, setTab]       = useState<Tab>("types")
  const [activeOp, setOp]   = useState(0)

  const meta = TYPES[dtype]
  const example = meta.examples[exIdx]

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Canvas ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col overflow-hidden min-h-80">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="av-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#av-dots)" />
        </svg>

        {/* Type selector */}
        <div className="relative z-10 flex gap-1.5 p-3 border-b border-white/5 flex-wrap">
          {(["int", "float", "str", "bool"] as DataType[]).map(t => {
            const m = TYPES[t]
            return (
              <button key={t}
                onClick={() => { setDtype(t); setExIdx(0) }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                style={dtype === t
                  ? { background: m.color + "20", color: m.color, border: `1px solid ${m.color}40` }
                  : { background: "#0D1829", color: "#475569", border: "1px solid #1E293B" }
                }
              >
                {t}
              </button>
            )
          })}
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 pb-4 pt-3 gap-4">
          <AnimatePresence mode="wait">
            <motion.div key={`${dtype}-${exIdx}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <VariableBoxScene dtype={dtype} example={example} />
            </motion.div>
          </AnimatePresence>

          {/* Example nav */}
          <div className="flex gap-1.5 justify-center">
            {meta.examples.map((ex, i) => (
              <button key={i}
                onClick={() => setExIdx(i)}
                className="px-2 py-0.5 rounded text-[9px] font-mono transition-all"
                style={i === exIdx
                  ? { background: meta.color + "25", color: meta.color, border: `1px solid ${meta.color}40` }
                  : { background: "#0D1829", color: "#334155", border: "1px solid #1E293B" }
                }
              >
                {ex.val.split("=")[1]?.trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col">

        {/* Tab toggle */}
        <div className="flex border-b border-gray-100">
          {([
            { key: "types" as Tab, label: "Data Type Info" },
            { key: "ops"   as Tab, label: "Operations"     },
          ]).map(t => (
            <button key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 py-2.5 text-xs font-bold transition-all relative"
              style={tab === t.key ? { color: meta.color } : { color: "#94A3B8" }}
            >
              {t.label}
              {tab === t.key && (
                <motion.div layoutId="av-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: meta.color }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div key={`${dtype}-${tab}`}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {tab === "types" ? (
                <>
                  <div>
                    <p className="text-xs font-bold font-sora text-gray-900">{meta.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Python type: <code className="font-mono bg-gray-100 px-1 rounded">{dtype}</code></p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: meta.color }}>Examples</p>
                    <div className="space-y-1.5">
                      {meta.examples.map((ex, i) => (
                        <button key={i}
                          onClick={() => setExIdx(i)}
                          className="w-full flex items-center gap-2 p-2 rounded-xl border text-left transition-all"
                          style={i === exIdx
                            ? { borderColor: meta.color + "50", background: meta.color + "08" }
                            : { borderColor: "#E5E7EB", background: "#F9FAFB" }
                          }
                        >
                          <code className="text-[11px] font-mono font-bold flex-1"
                            style={{ color: i === exIdx ? meta.color : "#374151" }}
                          >
                            {ex.val}
                          </code>
                          <span className="text-[9px] text-gray-400 shrink-0">{ex.meaning}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-violet-50 border border-violet-100 p-2.5">
                    <p className="text-[10px] font-bold text-violet-700 mb-0.5">Used in AI</p>
                    <p className="text-[10px] text-violet-700 leading-snug">{meta.aiUse}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: meta.color }}>
                    Operations on <code className="font-mono lowercase">{dtype}</code>
                  </p>
                  <div className="rounded-xl bg-gray-900 border border-gray-700 p-3">
                    <pre className="text-xs font-mono text-emerald-400 whitespace-pre leading-relaxed">
                      {meta.ops}
                    </pre>
                  </div>

                  {tab === "ops" && dtype !== "str" && (
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Arithmetic Operators</p>
                      <div className="space-y-1.5">
                        {ARITH_OPS.map((op, i) => (
                          <motion.button key={op.op}
                            onClick={() => setOp(i)}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.04 }}
                            className="w-full flex items-center gap-2 p-2 rounded-xl border text-left transition-all"
                            style={activeOp === i
                              ? { borderColor: meta.color + "50", background: meta.color + "08" }
                              : { borderColor: "#E5E7EB", background: "#F9FAFB" }
                            }
                          >
                            <code className="w-6 text-center font-mono font-bold text-sm"
                              style={{ color: meta.color }}
                            >{op.op}</code>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold text-gray-800">{op.name}</p>
                              <p className="text-[9px] text-gray-400 font-mono">{op.ex} = {op.result}</p>
                            </div>
                          </motion.button>
                        ))}
                        <div className="rounded-xl bg-amber-50 border border-amber-100 p-2">
                          <p className="text-[10px] text-amber-700 leading-snug">
                            {ARITH_OPS[activeOp].use}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
