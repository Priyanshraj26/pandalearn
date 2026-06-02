"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Trash2, Copy, CheckCircle2, XCircle, RefreshCw, Sparkles } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type IssueType = "missing" | "outlier" | "duplicate" | "clean"

interface DataRow {
  id: number
  name: string
  age: string | null
  studyHours: number | null
  score: number | null
  city: string | null
  issueType: IssueType
  issueDesc: string
  dupOf?: number
}

// ── Dataset ───────────────────────────────────────────────────────────────────

const INITIAL_ROWS: DataRow[] = [
  { id: 1,  name: "Aarav",    age: "14",  studyHours: 3,   score: 78,  city: "Delhi",     issueType: "clean",     issueDesc: "" },
  { id: 2,  name: "Priya",    age: null,  studyHours: 5,   score: 88,  city: "Mumbai",    issueType: "missing",   issueDesc: "Age is missing. This is a missing value (null)." },
  { id: 3,  name: "Rohan",    age: "15",  studyHours: 2,   score: 62,  city: "Chennai",   issueType: "clean",     issueDesc: "" },
  { id: 4,  name: "Sneha",    age: "14",  studyHours: 200, score: 91,  city: "Bangalore", issueType: "outlier",   issueDesc: "200 study hours is impossible in a week (168 hrs max). This is an outlier." },
  { id: 5,  name: "Dev",      age: "13",  studyHours: 4,   score: null,city: "Pune",      issueType: "missing",   issueDesc: "Score is missing. Rows with missing target values must be handled." },
  { id: 6,  name: "Kavya",    age: "15",  studyHours: 6,   score: 94,  city: "Hyderabad", issueType: "clean",     issueDesc: "" },
  { id: 7,  name: "Arjun",    age: "14",  studyHours: 3,   score: 78,  city: "Delhi",     issueType: "duplicate", issueDesc: "Exact duplicate of row 1 (Aarav). Duplicates skew training data.", dupOf: 1 },
  { id: 8,  name: "Meera",    age: "16",  studyHours: null,score: 83,  city: "Jaipur",    issueType: "missing",   issueDesc: "Study hours is missing. A key feature  must be imputed or removed." },
  { id: 9,  name: "Raj",      age: "14",  studyHours: -5,  score: 70,  city: "Kolkata",   issueType: "outlier",   issueDesc: "-5 study hours is impossible. Negative values here are data entry errors (outlier)." },
  { id: 10, name: "Ananya",   age: "15",  studyHours: 4,   score: 85,  city: "Surat",     issueType: "clean",     issueDesc: "" },
  { id: 11, name: "Kabir",    age: "15",  studyHours: 3,   score: 72,  city: "Lucknow",   issueType: "clean",     issueDesc: "" },
  { id: 12, name: "Ira",      age: "999", studyHours: 4,   score: 80,  city: "Bhopal",    issueType: "outlier",   issueDesc: "Age 999 is impossible. This is an outlier  a data entry mistake." },
  { id: 13, name: "Rahul",    age: "14",  studyHours: 5,   score: 88,  city: "Mumbai",    issueType: "duplicate", issueDesc: "Near-duplicate of row 2 (Priya)  same city, score, hours. Likely entered twice.", dupOf: 2 },
  { id: 14, name: "Tara",     age: "14",  studyHours: 2,   score: null,city: null,        issueType: "missing",   issueDesc: "Score AND city are missing. Multiple missing values in one row." },
  { id: 15, name: "Vikram",   age: "15",  studyHours: 3,   score: 75,  city: "Nagpur",    issueType: "clean",     issueDesc: "" },
]

const ISSUE_META = {
  missing:   { color: "#F59E0B", bg: "#FEF9EE", label: "Missing Value", Icon: XCircle },
  outlier:   { color: "#EF4444", bg: "#FEF2F2", label: "Outlier",       Icon: AlertTriangle },
  duplicate: { color: "#8B5CF6", bg: "#F5F3FF", label: "Duplicate",     Icon: Copy },
  clean:     { color: "#10B981", bg: "#ECFDF5", label: "Clean",         Icon: CheckCircle2 },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function qualityScore(fixed: Set<number>, rows: DataRow[]) {
  const total = rows.filter(r => r.issueType !== "clean").length
  const done  = fixed.size
  const base  = Math.round((rows.filter(r => r.issueType === "clean").length / rows.length) * 100)
  const bonus = total > 0 ? Math.round((done / total) * (100 - base)) : 0
  return Math.min(100, base + bonus)
}

function QualityBar({ score }: { score: number }) {
  const color = score < 50 ? "#EF4444" : score < 80 ? "#F59E0B" : "#10B981"
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-gray-700">Data Quality Score</span>
        <motion.span
          key={score}
          initial={{ scale: 1.2 }} animate={{ scale: 1 }}
          className="text-sm font-bold font-sora"
          style={{ color }}
        >
          {score}%
        </motion.span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          animate={{ width: `${score}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimDataCleaning() {
  const [rows, setRows]         = useState<DataRow[]>(INITIAL_ROWS)
  const [fixed, setFixed]       = useState<Set<number>>(new Set())
  const [selected, setSelected] = useState<number | null>(null)
  const [phase, setPhase]       = useState<"explore" | "clean" | "done">("explore")

  const score     = qualityScore(fixed, rows)
  const remaining = rows.filter(r => r.issueType !== "clean" && !fixed.has(r.id)).length
  const selectedRow = rows.find(r => r.id === selected)

  const fixRow = useCallback((id: number) => {
    setFixed(prev => {
      const next = new Set(prev)
      next.add(id)
      if (next.size === rows.filter(r => r.issueType !== "clean").length) {
        setTimeout(() => setPhase("done"), 600)
      }
      return next
    })
    setSelected(null)
  }, [rows])

  const reset = () => {
    setFixed(new Set())
    setSelected(null)
    setPhase("explore")
  }

  const cols = ["#", "Name", "Age", "Study Hrs", "Score", "City"]

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100">

      {/* ── Table panel ────────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] overflow-hidden flex flex-col">

        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs>
            <pattern id="dc-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#94A3B8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dc-dots)" />
        </svg>

        {/* Header */}
        <div className="relative z-10 px-4 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Student Study Dataset</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{rows.length} rows · {remaining} issues remaining</p>
            </div>
            <button onClick={reset}
              className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded-lg border border-white/10 hover:border-white/20"
            >
              <RefreshCw size={10} /> Reset
            </button>
          </div>
          {phase === "explore" && (
            <p className="text-[10px] text-slate-500 italic">Click a highlighted row to inspect and fix the issue</p>
          )}
        </div>

        {/* Table */}
        <div className="relative z-10 flex-1 overflow-auto px-3 pb-3">
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                {cols.map(c => (
                  <th key={c} className="text-left py-2 px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-white/5 whitespace-nowrap">
                    {c}
                  </th>
                ))}
                <th className="py-2 px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const isFixed   = fixed.has(row.id)
                const isSel     = selected === row.id
                const isIssue   = row.issueType !== "clean"
                const imeta     = ISSUE_META[row.issueType]

                return (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => isIssue && !isFixed && setSelected(isSel ? null : row.id)}
                    className="border-b border-white/5 transition-colors"
                    style={{
                      cursor:     isIssue && !isFixed ? "pointer" : "default",
                      background: isSel ? imeta.color + "22"
                                : isFixed ? "#10B98111"
                                : isIssue ? imeta.color + "09"
                                : "transparent",
                    }}
                  >
                    <td className="py-1.5 px-2 text-slate-500">{row.id}</td>
                    <td className="py-1.5 px-2 text-slate-200 font-medium">{row.name}</td>

                    {/* Age */}
                    <td className="py-1.5 px-2">
                      <CellValue val={row.age} issue={row.issueType === "outlier" && row.age === "999"} isFixed={isFixed} />
                    </td>

                    {/* Study Hours */}
                    <td className="py-1.5 px-2">
                      <CellValue
                        val={row.studyHours !== null ? String(row.studyHours) : null}
                        issue={row.issueType === "outlier" && (row.studyHours === 200 || row.studyHours === -5)}
                        isFixed={isFixed}
                      />
                    </td>

                    {/* Score */}
                    <td className="py-1.5 px-2">
                      <CellValue val={row.score !== null ? String(row.score) : null} issue={false} isFixed={isFixed} />
                    </td>

                    {/* City */}
                    <td className="py-1.5 px-2">
                      <CellValue val={row.city} issue={false} isFixed={isFixed} />
                    </td>

                    {/* Status badge */}
                    <td className="py-1.5 px-2">
                      {isFixed ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          <CheckCircle2 size={8} /> Fixed
                        </span>
                      ) : isIssue ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: imeta.color + "22", color: imeta.color }}
                        >
                          <imeta.Icon size={8} /> {imeta.label}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                          <CheckCircle2 size={8} /> Clean
                        </span>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Info / action panel ─────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col p-4 gap-4">

        {/* Quality score */}
        <QualityBar score={score} />

        {/* Issue counters */}
        <div className="grid grid-cols-3 gap-1.5">
          {(["missing", "outlier", "duplicate"] as IssueType[]).map(t => {
            const m      = ISSUE_META[t]
            const total  = rows.filter(r => r.issueType === t).length
            const remain = rows.filter(r => r.issueType === t && !fixed.has(r.id)).length
            return (
              <div key={t} className="rounded-xl p-2 border text-center" style={{ borderColor: m.color + "40", background: m.bg }}>
                <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: m.color }}>{m.label}</p>
                <p className="text-base font-bold font-sora" style={{ color: m.color }}>{remain}</p>
                <p className="text-[9px] text-gray-400">of {total}</p>
              </div>
            )
          })}
        </div>

        {/* Selected row info */}
        <AnimatePresence mode="wait">
          {selectedRow && !fixed.has(selectedRow.id) ? (
            <motion.div key={selectedRow.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: ISSUE_META[selectedRow.issueType].color + "20", color: ISSUE_META[selectedRow.issueType].color }}
                  >
                    Row {selectedRow.id} · {ISSUE_META[selectedRow.issueType].label}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-800 mb-1">{selectedRow.name}&apos;s data has an issue:</p>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedRow.issueDesc}</p>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-xs text-gray-700 space-y-1">
                <p className="font-bold text-gray-800 text-[11px]">How to fix it?</p>
                {selectedRow.issueType === "missing" && (
                  <>
                    <p>Option 1: <span className="font-semibold text-amber-600">Remove the row</span> if too many values are missing.</p>
                    <p>Option 2: <span className="font-semibold text-blue-600">Impute</span>  fill in with mean/median/mode.</p>
                  </>
                )}
                {selectedRow.issueType === "outlier" && (
                  <>
                    <p>Option 1: <span className="font-semibold text-red-600">Remove the row</span> if it was a data entry error.</p>
                    <p>Option 2: <span className="font-semibold text-orange-600">Cap the value</span> to a realistic range.</p>
                  </>
                )}
                {selectedRow.issueType === "duplicate" && (
                  <>
                    <p>Action: <span className="font-semibold text-violet-600">Drop the duplicate</span>  keep only the original row.</p>
                    <p>Duplicates inflate training data and bias the model.</p>
                  </>
                )}
              </div>

              <button
                onClick={() => fixRow(selectedRow.id)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: ISSUE_META[selectedRow.issueType].color }}
              >
                <Trash2 size={13} />
                {selectedRow.issueType === "duplicate" ? "Drop Duplicate Row" : "Fix This Issue"}
              </button>
            </motion.div>

          ) : phase === "done" ? (
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center gap-3 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
              >
                <Sparkles size={36} className="text-emerald-500" />
              </motion.div>
              <h3 className="font-sora font-bold text-gray-900 text-sm">Dataset Cleaned!</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You identified and fixed all {rows.filter(r => r.issueType !== "clean").length} data quality issues.
                The dataset is now ready for AI training.
              </p>
              <div className="w-full rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                <p className="text-[11px] font-bold text-emerald-700 mb-1">Why this matters</p>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  "Garbage in, garbage out"  an AI trained on dirty data learns wrong patterns.
                  Data cleaning is the most time-consuming step in any real AI project (~80% of effort!).
                </p>
              </div>
              <button onClick={reset}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RefreshCw size={12} /> Try again
              </button>
            </motion.div>

          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex flex-col gap-3"
            >
              <div>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">Your Mission</p>
                <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                  This dataset has {rows.filter(r => r.issueType !== "clean").length} issues hiding in plain sight.
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Click a highlighted row to learn what&apos;s wrong and fix it. Raise the Data Quality Score to 100%.
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 space-y-2">
                {(["missing", "outlier", "duplicate"] as IssueType[]).map(t => {
                  const m = ISSUE_META[t]
                  return (
                    <div key={t} className="flex items-start gap-2">
                      <m.Icon size={12} style={{ color: m.color }} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold" style={{ color: m.color }}>{m.label}</p>
                        <p className="text-[10px] text-gray-500 leading-snug">
                          {t === "missing"   && "Null or empty cells  a feature value was not recorded."}
                          {t === "outlier"   && "Values impossibly large, small, or negative."}
                          {t === "duplicate" && "Identical or near-identical rows entered more than once."}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-[10px] text-gray-300 italic text-center">
                {remaining} issue{remaining !== 1 ? "s" : ""} remaining  click a coloured row to start
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Cell value renderer ───────────────────────────────────────────────────────

function CellValue({ val, issue, isFixed }: { val: string | null; issue: boolean; isFixed: boolean }) {
  if (val === null) {
    return <span className="text-amber-400 font-bold text-[10px]"> null </span>
  }
  if (issue && !isFixed) {
    return (
      <span className="text-red-400 font-bold bg-red-400/10 rounded px-1" title="Outlier value">
        {val} ⚠
      </span>
    )
  }
  return <span className="text-slate-300">{val}</span>
}
