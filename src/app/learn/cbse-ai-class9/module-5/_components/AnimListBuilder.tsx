"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, RotateCcw, ChevronLeft, ChevronRight, ArrowUpDown, Play } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type OpKey = "append" | "insert" | "remove" | "pop" | "index" | "slice" | "sort"
type Tab   = "visual" | "code"

interface ListItem { id: number; value: string | number }

const OP_META: Record<OpKey, { label: string; color: string; syntax: string; desc: string }> = {
  append: { label: "append()",  color: "#22D3EE", syntax: "my_list.append(x)",       desc: "Add x to the END of the list."                              },
  insert: { label: "insert()",  color: "#8B5CF6", syntax: "my_list.insert(i, x)",    desc: "Insert x at position i. Existing items shift right."       },
  remove: { label: "remove()",  color: "#EF4444", syntax: "my_list.remove(x)",       desc: "Remove the FIRST occurrence of value x."                   },
  pop:    { label: "pop()",     color: "#F97316", syntax: "my_list.pop(i)",           desc: "Remove and return item at index i (default: last item)."   },
  index:  { label: "index()",   color: "#10B981", syntax: "my_list.index(x)",        desc: "Return the index of the FIRST occurrence of x."            },
  slice:  { label: "slice [:]", color: "#F59E0B", syntax: "my_list[start:end]",      desc: "Return a sub-list from start (inclusive) to end (exclusive)." },
  sort:   { label: "sort()",    color: "#D97706", syntax: "my_list.sort()",          desc: "Sort the list IN PLACE in ascending order."               },
}

let nextId = 100

// ── Box component ─────────────────────────────────────────────────────────────

function ListBox({
  item, idx, total, highlight, removed,
}: {
  item: ListItem; idx: number; total: number
  highlight: boolean; removed: boolean
}) {
  return (
    <motion.div
      layout
      key={item.id}
      initial={{ scale: 0.5, opacity: 0, y: -20 }}
      animate={{
        scale:   removed ? 0.5 : 1,
        opacity: removed ? 0 : highlight ? 1 : 0.75,
        y:       removed ? -24 : 0,
        background: highlight ? OP_META["append"].color + "22" : "#F9FAFB",
        borderColor: highlight ? OP_META["append"].color : "#E5E7EB",
      }}
      exit={{ scale: 0.4, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative flex flex-col items-center border-2 rounded-xl min-w-14 px-3 py-2 text-center"
    >
      {/* Value */}
      <span className="text-sm font-bold font-sora text-gray-900">{item.value}</span>
      {/* Index badge */}
      <span className="text-[9px] font-bold text-gray-400 mt-0.5">
        [{idx}]
        {idx === 0        && <span className="text-emerald-500 ml-0.5">first</span>}
        {idx === total - 1 && <span className="text-violet-500 ml-0.5">last</span>}
      </span>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimListBuilder() {
  const [items, setItems]       = useState<ListItem[]>([
    { id: 1, value: "Arjun"   },
    { id: 2, value: "Priya"   },
    { id: 3, value: "Rohan"   },
    { id: 4, value: "Sneha"   },
  ])
  const [op, setOp]             = useState<OpKey>("append")
  const [input1, setInput1]     = useState("")
  const [input2, setInput2]     = useState("")
  const [highlight, setHL]      = useState<number | null>(null)
  const [result, setResult]     = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [tab, setTab]           = useState<Tab>("visual")
  const [lastCode, setLastCode] = useState<string>("")

  const flash = useCallback((idx: number) => {
    setHL(idx)
    setTimeout(() => setHL(null), 1200)
  }, [])

  const run = () => {
    setError(null)
    setResult(null)

    try {
      if (op === "append") {
        if (!input1.trim()) { setError("Enter a value to append."); return }
        const newItem = { id: ++nextId, value: input1.trim() }
        setItems(prev => [...prev, newItem])
        setLastCode(`my_list.append("${input1.trim()}")`)
        setResult(`"${input1.trim()}" added to the end. Length is now ${items.length + 1}.`)
        setTimeout(() => flash(items.length), 50)

      } else if (op === "insert") {
        const idx = parseInt(input1)
        if (isNaN(idx)) { setError("Enter an integer index."); return }
        if (!input2.trim()) { setError("Enter a value to insert."); return }
        if (idx < 0 || idx > items.length) { setError(`Index must be 0 – ${items.length}.`); return }
        const newItem = { id: ++nextId, value: input2.trim() }
        setItems(prev => { const n = [...prev]; n.splice(idx, 0, newItem); return n })
        setLastCode(`my_list.insert(${idx}, "${input2.trim()}")`)
        setResult(`"${input2.trim()}" inserted at index ${idx}.`)
        setTimeout(() => flash(idx), 50)

      } else if (op === "remove") {
        const idx = items.findIndex(i => String(i.value) === input1.trim())
        if (idx === -1) { setError(`"${input1.trim()}" not found in the list.`); return }
        flash(idx)
        setTimeout(() => {
          setItems(prev => prev.filter((_, i) => i !== idx))
          setResult(`First occurrence of "${input1.trim()}" (index ${idx}) removed.`)
        }, 700)
        setLastCode(`my_list.remove("${input1.trim()}")`)

      } else if (op === "pop") {
        const idx = input1.trim() === "" ? items.length - 1 : parseInt(input1)
        if (isNaN(idx)) { setError("Enter an integer index (or leave blank for last)."); return }
        if (idx < 0 || idx >= items.length) { setError(`Index must be 0 – ${items.length - 1}.`); return }
        const popped = items[idx].value
        flash(idx)
        setTimeout(() => {
          setItems(prev => prev.filter((_, i) => i !== idx))
          setResult(`Popped: "${popped}" (was at index ${idx}).`)
        }, 700)
        setLastCode(`my_list.pop(${input1.trim() || ""})`)

      } else if (op === "index") {
        const idx = items.findIndex(i => String(i.value) === input1.trim())
        if (idx === -1) { setError(`"${input1.trim()}" not found.`); return }
        flash(idx)
        setLastCode(`my_list.index("${input1.trim()}")`)
        setResult(`"${input1.trim()}" is at index ${idx}.`)

      } else if (op === "slice") {
        const start = parseInt(input1) || 0
        const end   = parseInt(input2) || items.length
        if (end <= start) { setError("End must be greater than start."); return }
        const sliced = items.slice(start, end).map(i => `"${i.value}"`).join(", ")
        setLastCode(`my_list[${start}:${end}]`)
        setResult(`Result: [${sliced}]`)
        items.slice(start, end).forEach((_, i) => setTimeout(() => flash(start + i), i * 150))

      } else if (op === "sort") {
        setItems(prev => [...prev].sort((a, b) => String(a.value).localeCompare(String(b.value))))
        setLastCode(`my_list.sort()`)
        setResult("List sorted alphabetically in place.")
        items.forEach((_, i) => setTimeout(() => flash(i), i * 80))
      }
    } catch {
      setError("Something went wrong  check your inputs.")
    }
  }

  const currentMeta = OP_META[op]

  const showInput1 = ["append", "remove", "index", "insert", "pop", "slice"].includes(op)
  const showInput2 = ["insert", "slice"].includes(op)
  const label1 = op === "insert" ? "Index (i)" : op === "slice" ? "Start" : op === "pop" ? "Index (blank = last)" : "Value"
  const label2 = op === "insert" ? "Value (x)" : "End"

  return (
    <div className="grid md:grid-cols-[1fr_260px]">

      {/* ── Visual canvas ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex flex-col min-h-80 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs><pattern id="lb-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#94A3B8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#lb-dots)" />
        </svg>

        {/* List display */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 gap-4">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">my_list</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-slate-600 font-mono text-lg font-bold">[</span>
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <ListBox
                    key={item.id}
                    item={item}
                    idx={idx}
                    total={items.length}
                    highlight={highlight === idx}
                    removed={false}
                  />
                ))}
              </AnimatePresence>
              <span className="text-slate-600 font-mono text-lg font-bold">]</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-2">
              Length: <span className="font-bold text-slate-300">{items.length}</span>
              {items.length === 0 && <span className="text-red-400 ml-1">(empty list)</span>}
            </p>
          </div>

          {/* Code preview */}
          {lastCode && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 font-mono text-xs text-center"
              style={{ color: currentMeta.color }}
            >
              &gt;&gt;&gt; {lastCode}
            </motion.div>
          )}

          {/* Result / error */}
          <AnimatePresence>
            {result && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-emerald-400 text-center font-medium"
              >{result}</motion.p>
            )}
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-red-400 text-center"
              >{error}</motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Reset */}
        <div className="relative z-10 flex items-center justify-center p-3 border-t border-white/5">
          <button
            onClick={() => {
              setItems([
                { id: ++nextId, value: "Arjun"  },
                { id: ++nextId, value: "Priya"  },
                { id: ++nextId, value: "Rohan"  },
                { id: ++nextId, value: "Sneha"  },
              ])
              setResult(null); setError(null); setLastCode("")
            }}
            className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            <RotateCcw size={11} /> Reset list
          </button>
        </div>
      </div>

      {/* ── Controls panel ──────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-3 overflow-y-auto">

        {/* Operation selector */}
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Operation</p>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.entries(OP_META) as [OpKey, typeof OP_META[OpKey]][]).map(([key, m]) => (
              <button key={key}
                onClick={() => { setOp(key); setInput1(""); setInput2(""); setResult(null); setError(null) }}
                className="py-1.5 rounded-lg text-[10px] font-bold text-left px-2.5 transition-all border-2"
                style={op === key
                  ? { borderColor: m.color, background: m.color + "15", color: m.color }
                  : { borderColor: "#E5E7EB", background: "#F9FAFB", color: "#6B7280" }
                }
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Syntax box */}
        <div className="rounded-xl border p-2.5" style={{ borderColor: currentMeta.color + "40", background: currentMeta.color + "08" }}>
          <p className="font-mono text-xs font-bold" style={{ color: currentMeta.color }}>{currentMeta.syntax}</p>
          <p className="text-[10px] text-gray-600 mt-0.5 leading-snug">{currentMeta.desc}</p>
        </div>

        {/* Inputs */}
        {showInput1 && (
          <div>
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block mb-1">{label1}</label>
            <input
              value={input1}
              onChange={e => setInput1(e.target.value)}
              onKeyDown={e => e.key === "Enter" && run()}
              placeholder={op === "slice" ? "0" : "e.g. Sneha"}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-100 bg-white"
            />
          </div>
        )}
        {showInput2 && (
          <div>
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block mb-1">{label2}</label>
            <input
              value={input2}
              onChange={e => setInput2(e.target.value)}
              onKeyDown={e => e.key === "Enter" && run()}
              placeholder={op === "slice" ? `${items.length}` : "e.g. Vikram"}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-100 bg-white"
            />
          </div>
        )}

        <button onClick={run}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: currentMeta.color }}
        >
          <Play size={13} /> Run {currentMeta.label}
        </button>

        {/* Index reference */}
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
          <p className="text-[10px] font-bold text-gray-600 mb-1.5">Current indices</p>
          <div className="flex flex-wrap gap-1">
            {items.map((item, i) => (
              <div key={item.id} className="text-[9px] bg-white border border-gray-200 rounded-lg px-1.5 py-0.5 text-center">
                <p className="font-bold text-gray-700">[{i}]</p>
                <p className="text-gray-500">{String(item.value)}</p>
              </div>
            ))}
            {items.length === 0 && <p className="text-[10px] text-gray-400 italic">List is empty</p>}
          </div>
        </div>

        {/* Key fact */}
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-2.5 mt-auto">
          <p className="text-[10px] font-bold text-violet-700 mb-0.5">Python indexing</p>
          <p className="text-[10px] text-violet-700 leading-snug">
            Lists start at index <strong>[0]</strong>. The last item is index <strong>[{Math.max(0, items.length - 1)}]</strong> or <strong>[-1]</strong>. Negative indices count from the end.
          </p>
        </div>
      </div>
    </div>
  )
}
