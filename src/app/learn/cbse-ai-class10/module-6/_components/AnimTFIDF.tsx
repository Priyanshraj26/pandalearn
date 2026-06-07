"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const PRESETS = [
  {
    name: "Animals",
    docs: [
      "the cat sat on the mat",
      "the dog chased the cat",
      "the bird flew over the mat",
    ],
  },
  {
    name: "Weather",
    docs: [
      "it is sunny and warm today",
      "it is rainy and cold today",
      "today is sunny but cold",
    ],
  },
]

const STOP_WORDS = new Set(["the", "a", "an", "is", "on", "and", "it", "but", "in", "of", "to"])

function tokenize(doc: string): string[] {
  return doc.toLowerCase().split(/\s+/).filter(w => !STOP_WORDS.has(w))
}

function computeTFIDF(docs: string[]) {
  const tokenizedDocs = docs.map(tokenize)
  const allTerms = [...new Set(tokenizedDocs.flat())]
  const N = docs.length

  // IDF
  const idf: Record<string, number> = {}
  allTerms.forEach(term => {
    const docsWithTerm = tokenizedDocs.filter(d => d.includes(term)).length
    idf[term] = Math.log10(N / docsWithTerm)
  })

  // TF per doc
  const tfPerDoc = tokenizedDocs.map(tokens => {
    const tf: Record<string, number> = {}
    allTerms.forEach(term => {
      const count = tokens.filter(t => t === term).length
      tf[term] = tokens.length > 0 ? count / tokens.length : 0
    })
    return tf
  })

  // TF-IDF per doc
  const tfidfPerDoc = tfPerDoc.map(tf => {
    const tfidf: Record<string, number> = {}
    allTerms.forEach(term => {
      tfidf[term] = tf[term] * idf[term]
    })
    return tfidf
  })

  return { allTerms, idf, tfPerDoc, tfidfPerDoc, tokenizedDocs }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimTFIDF() {
  const [presetIdx, setPresetIdx] = useState(0)
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"tf" | "idf" | "tfidf">("tfidf")

  const docs = PRESETS[presetIdx].docs
  const { allTerms, idf, tfPerDoc, tfidfPerDoc } = useMemo(() => computeTFIDF(docs), [docs])

  const maxTFIDF = useMemo(() => {
    let max = 0
    tfidfPerDoc.forEach(d => Object.values(d).forEach(v => { if (v > max) max = v }))
    return max || 1
  }, [tfidfPerDoc])

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Tables ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => { setPresetIdx(i); setSelectedTerm(null) }}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
                style={{
                  background: i === presetIdx ? "#F97316" : "rgba(255,255,255,0.06)",
                  color: i === presetIdx ? "#fff" : "rgba(255,255,255,0.4)",
                  border: `1px solid ${i === presetIdx ? "#F97316" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            {(["tf", "idf", "tfidf"] as const).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase transition-all"
                style={{
                  background: viewMode === m ? "#7C3AED" : "rgba(255,255,255,0.04)",
                  color: viewMode === m ? "#fff" : "rgba(255,255,255,0.3)",
                  border: `1px solid ${viewMode === m ? "#7C3AED" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Documents display */}
        <div className="space-y-2 mb-4">
          {docs.map((doc, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-[9px] text-white/30 font-bold mr-2">Doc {i + 1}</span>
              <span className="text-xs text-white/60 font-mono">{doc}</span>
            </div>
          ))}
        </div>

        {/* TF-IDF table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-2 text-white/30 font-bold uppercase tracking-wider">Term</th>
                {viewMode === "idf" ? (
                  <th className="text-center py-2 px-2 text-white/30 font-bold uppercase tracking-wider">IDF</th>
                ) : (
                  docs.map((_, i) => (
                    <th key={i} className="text-center py-2 px-2 text-white/30 font-bold uppercase tracking-wider">
                      Doc {i + 1}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {allTerms.map(term => {
                const isSelected = selectedTerm === term
                return (
                  <tr
                    key={term}
                    onClick={() => setSelectedTerm(isSelected ? null : term)}
                    className="border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5"
                    style={{ background: isSelected ? "rgba(249,115,22,0.1)" : undefined }}
                  >
                    <td className="py-1.5 px-2 font-mono font-bold" style={{ color: isSelected ? "#F97316" : "#93C5FD" }}>
                      {term}
                    </td>
                    {viewMode === "idf" ? (
                      <td className="text-center py-1.5 px-2 font-mono text-white/60">
                        {idf[term].toFixed(3)}
                      </td>
                    ) : viewMode === "tf" ? (
                      tfPerDoc.map((tf, i) => (
                        <td key={i} className="text-center py-1.5 px-2 font-mono text-white/60">
                          {tf[term].toFixed(3)}
                        </td>
                      ))
                    ) : (
                      tfidfPerDoc.map((tfidf, i) => {
                        const val = tfidf[term]
                        const intensity = val / maxTFIDF
                        return (
                          <td key={i} className="text-center py-1.5 px-2">
                            <span
                              className="inline-block px-1.5 py-0.5 rounded font-mono font-bold"
                              style={{
                                background: val > 0 ? `rgba(249,115,22,${intensity * 0.4})` : "transparent",
                                color: val > 0 ? "#FDBA74" : "rgba(255,255,255,0.2)",
                              }}
                            >
                              {val.toFixed(3)}
                            </span>
                          </td>
                        )
                      })
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          {selectedTerm ? (
            <motion.div
              key={selectedTerm}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Term Analysis</p>
              <h3 className="font-sora font-bold text-sm text-orange-600 mb-3">&quot;{selectedTerm}&quot;</h3>

              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-700 mb-1">IDF = log₁₀(N / docs_with_term)</p>
                  <p className="text-sm font-bold font-mono text-blue-700">{idf[selectedTerm].toFixed(4)}</p>
                  <p className="text-[10px] text-blue-500 mt-1">
                    Appears in {docs.filter((_, i) => tfPerDoc[i][selectedTerm] > 0).length} of {docs.length} docs
                  </p>
                </div>

                {tfPerDoc.map((tf, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-bold text-gray-500">Doc {i + 1}</p>
                      <p className="text-[10px] font-mono text-gray-600">
                        TF: {tf[selectedTerm].toFixed(3)} | TF-IDF: {tfidfPerDoc[i][selectedTerm].toFixed(4)}
                      </p>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-orange-500 rounded-full"
                        animate={{ width: `${Math.min(100, (tfidfPerDoc[i][selectedTerm] / maxTFIDF) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <p className="text-4xl mb-3">📊</p>
              <p className="text-sm font-sora font-bold text-gray-700 mb-1">Click a Term</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Click any term in the table to see its TF, IDF, and TF-IDF values with detailed breakdowns.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Formulas</p>
          <div className="space-y-1.5 text-[10px] font-mono text-gray-500">
            <p><strong className="text-gray-700">TF</strong> = count(term) / total_terms</p>
            <p><strong className="text-gray-700">IDF</strong> = log₁₀(N / docs_with_term)</p>
            <p><strong className="text-gray-700">TF-IDF</strong> = TF × IDF</p>
          </div>
        </div>
      </div>
    </div>
  )
}
