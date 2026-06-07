"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const SAMPLE_SENTENCE = "The cats are sitting on the mat and the dogs are playing"

const STOP_WORDS = new Set(["the", "are", "on", "and", "is", "a", "an", "in", "of", "to", "for", "it", "at", "by", "with"])

const STAGES = [
  {
    id: "raw",
    label: "Raw Text",
    color: "#6B7280",
    desc: "The original sentence as written — with capitalisation, punctuation, and all words intact.",
  },
  {
    id: "tokenize",
    label: "Tokenization",
    color: "#3B82F6",
    desc: "Split the sentence into individual words (tokens). Each word becomes a separate unit for processing.",
  },
  {
    id: "stopwords",
    label: "Stop Word Removal",
    color: "#F97316",
    desc: "Remove common words (the, is, are, on, and) that don't carry much meaning. Focus on content words.",
  },
  {
    id: "stemming",
    label: "Stemming",
    color: "#7C3AED",
    desc: "Reduce words to their root form. 'cats' → 'cat', 'sitting' → 'sit', 'playing' → 'play'. This normalises similar words.",
  },
]

function stem(word: string): string {
  const stems: Record<string, string> = {
    cats: "cat", sitting: "sit", dogs: "dog", playing: "play",
    running: "run", walking: "walk", eating: "eat",
  }
  return stems[word] || word
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimNLPStages() {
  const [stageIdx, setStageIdx] = useState(0)
  const stage = STAGES[stageIdx]

  const tokens = useMemo(() =>
    SAMPLE_SENTENCE.toLowerCase().split(/\s+/), []
  )

  const processedTokens = useMemo(() => {
    switch (stageIdx) {
      case 0: return [SAMPLE_SENTENCE]
      case 1: return tokens
      case 2: return tokens.filter(t => !STOP_WORDS.has(t))
      case 3: return tokens.filter(t => !STOP_WORDS.has(t)).map(t => stem(t))
      default: return tokens
    }
  }, [stageIdx, tokens])

  const removedCount = stageIdx === 2 ? tokens.length - processedTokens.length : 0

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Visualization ── */}
      <div className="bg-[#060A12] p-6 flex flex-col items-center justify-center">
        {/* Stage selector */}
        <div className="flex gap-2 mb-6">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStageIdx(i)}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
              style={{
                background: i === stageIdx ? s.color : "rgba(255,255,255,0.06)",
                color: i === stageIdx ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${i === stageIdx ? s.color : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>

        {/* Token display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stageIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2 justify-center max-w-md"
          >
            {processedTokens.map((token, i) => (
              <motion.span
                key={`${stageIdx}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-mono font-bold"
                style={{
                  background: stage.color + "18",
                  border: `1px solid ${stage.color}40`,
                  color: stage.color,
                }}
              >
                {token}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-6">
          <div className="text-center">
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Tokens</p>
            <p className="text-lg font-bold font-sora" style={{ color: stage.color }}>{processedTokens.length}</p>
          </div>
          {stageIdx === 2 && (
            <div className="text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Removed</p>
              <p className="text-lg font-bold font-sora text-red-400">{removedCount}</p>
            </div>
          )}
        </div>

        {/* Step navigation */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setStageIdx(Math.max(0, stageIdx - 1))}
            disabled={stageIdx === 0}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ← Prev
          </button>
          <button
            onClick={() => setStageIdx(Math.min(STAGES.length - 1, stageIdx + 1))}
            disabled={stageIdx === STAGES.length - 1}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-30"
            style={{ background: stage.color, color: "#fff", border: `1px solid ${stage.color}` }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stage {stageIdx + 1} of {STAGES.length}</p>
            <h3 className="font-sora font-bold text-sm mb-2" style={{ color: stage.color }}>{stage.label}</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{stage.desc}</p>

            {stageIdx === 1 && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 mb-4">
                <p className="text-[10px] font-bold text-blue-700 mb-1">What Changed</p>
                <p className="text-[11px] text-blue-600">
                  Sentence split into {tokens.length} individual tokens. Each word is now a separate unit.
                </p>
              </div>
            )}

            {stageIdx === 2 && (
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 mb-4">
                <p className="text-[10px] font-bold text-orange-700 mb-1">Removed Stop Words</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {tokens.filter(t => STOP_WORDS.has(t)).map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 line-through">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {stageIdx === 3 && (
              <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 mb-4">
                <p className="text-[10px] font-bold text-violet-700 mb-1">Stemming Results</p>
                <div className="space-y-1 mt-1.5">
                  {tokens.filter(t => !STOP_WORDS.has(t)).map((t, i) => {
                    const s = stem(t)
                    const changed = s !== t
                    return (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <span className={changed ? "text-gray-400 line-through" : "text-gray-600"}>{t}</span>
                        {changed && (
                          <>
                            <span className="text-violet-400">→</span>
                            <span className="font-bold text-violet-700">{s}</span>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">NLP Pipeline</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Raw → Tokenize → Stop words → Stem</strong>.
            Each stage cleans and normalises text so AI can focus on meaningful patterns.
          </p>
        </div>
      </div>
    </div>
  )
}
