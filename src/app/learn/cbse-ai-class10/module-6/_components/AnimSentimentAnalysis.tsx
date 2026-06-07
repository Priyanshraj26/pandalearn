"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────

const POSITIVE_WORDS: Record<string, number> = {
  good: 1, great: 2, excellent: 3, amazing: 3, wonderful: 2, love: 2, happy: 2,
  best: 2, fantastic: 3, awesome: 2, beautiful: 2, perfect: 3, brilliant: 2,
  enjoy: 1, fun: 1, nice: 1, liked: 1, incredible: 2, outstanding: 3, superb: 3,
}

const NEGATIVE_WORDS: Record<string, number> = {
  bad: -1, terrible: -3, awful: -3, horrible: -3, hate: -2, worst: -3, poor: -1,
  boring: -2, ugly: -2, disappointing: -2, sad: -1, angry: -2, annoying: -1,
  dislike: -1, fail: -2, useless: -2, broken: -2, pathetic: -3, dreadful: -3,
  mediocre: -1,
}

const SAMPLE_SENTENCES = [
  "This movie was absolutely amazing and wonderful",
  "The food was terrible and the service was awful",
  "It was an okay experience nothing special",
  "I love this product it is the best purchase ever",
  "Very disappointing and boring would not recommend",
]

function analyzeSentiment(text: string) {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/)
  let score = 0
  const contributing: { word: string; score: number; type: "positive" | "negative" | "neutral" }[] = []

  words.forEach(word => {
    if (POSITIVE_WORDS[word]) {
      score += POSITIVE_WORDS[word]
      contributing.push({ word, score: POSITIVE_WORDS[word], type: "positive" })
    } else if (NEGATIVE_WORDS[word]) {
      score += NEGATIVE_WORDS[word]
      contributing.push({ word, score: NEGATIVE_WORDS[word], type: "negative" })
    } else {
      contributing.push({ word, score: 0, type: "neutral" })
    }
  })

  const maxScore = 15
  const normalised = Math.max(-1, Math.min(1, score / maxScore))
  const label = normalised > 0.1 ? "Positive" : normalised < -0.1 ? "Negative" : "Neutral"
  const color = normalised > 0.1 ? "#10B981" : normalised < -0.1 ? "#EF4444" : "#6B7280"

  return { score, normalised, label, color, contributing, words }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnimSentimentAnalysis() {
  const [input, setInput] = useState(SAMPLE_SENTENCES[0])

  const result = useMemo(() => analyzeSentiment(input), [input])

  const handlePreset = useCallback((sentence: string) => {
    setInput(sentence)
  }, [])

  const barPosition = ((result.normalised + 1) / 2) * 100 // 0-100%

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Left: Input & Visualization ── */}
      <div className="bg-[#060A12] p-6 flex flex-col">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Type a sentence</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-violet-500/50 transition-colors resize-none mb-4"
          rows={2}
          placeholder="Type any sentence to analyse sentiment..."
        />

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {SAMPLE_SENTENCES.map((s, i) => (
            <button
              key={i}
              onClick={() => handlePreset(s)}
              className="px-2.5 py-1 rounded-lg text-[9px] font-medium transition-all"
              style={{
                background: input === s ? "#7C3AED20" : "rgba(255,255,255,0.04)",
                color: input === s ? "#A78BFA" : "rgba(255,255,255,0.3)",
                border: `1px solid ${input === s ? "#7C3AED40" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              Example {i + 1}
            </button>
          ))}
        </div>

        {/* Sentiment bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[10px] mb-2">
            <span className="text-red-400 font-bold">Negative</span>
            <span className="text-gray-500">Neutral</span>
            <span className="text-emerald-400 font-bold">Positive</span>
          </div>
          <div className="relative h-4 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #EF4444, #6B7280, #10B981)" }}>
            <motion.div
              className="absolute top-0 w-4 h-4 rounded-full bg-white shadow-lg border-2"
              style={{ borderColor: result.color }}
              animate={{ left: `calc(${barPosition}% - 8px)` }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
        </div>

        {/* Word highlights */}
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Word Analysis</p>
        <div className="flex flex-wrap gap-1.5">
          {result.contributing.map((w, i) => (
            <motion.span
              key={`${w.word}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono"
              style={{
                background: w.type === "positive" ? "#10B98118" : w.type === "negative" ? "#EF444418" : "rgba(255,255,255,0.04)",
                border: `1px solid ${w.type === "positive" ? "#10B98130" : w.type === "negative" ? "#EF444430" : "rgba(255,255,255,0.06)"}`,
                color: w.type === "positive" ? "#6EE7B7" : w.type === "negative" ? "#FCA5A5" : "rgba(255,255,255,0.3)",
              }}
            >
              {w.word}
              {w.score !== 0 && (
                <span className="text-[9px] font-bold">
                  {w.score > 0 ? `+${w.score}` : w.score}
                </span>
              )}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── Right: Results ── */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sentiment Result</p>
        <motion.h3
          className="font-sora font-bold text-xl mb-1"
          style={{ color: result.color }}
          key={result.label}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          {result.label}
        </motion.h3>
        <p className="text-xs text-gray-400 mb-4">
          Raw score: <strong className="font-mono" style={{ color: result.color }}>{result.score}</strong>
        </p>

        {/* Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-emerald-700">Positive Words</p>
              <p className="text-xs font-bold text-emerald-700">
                {result.contributing.filter(w => w.type === "positive").length}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {result.contributing.filter(w => w.type === "positive").map((w, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">
                  {w.word} (+{w.score})
                </span>
              ))}
              {result.contributing.filter(w => w.type === "positive").length === 0 && (
                <span className="text-[10px] text-emerald-400 italic">None found</span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-red-50 border border-red-100">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-red-700">Negative Words</p>
              <p className="text-xs font-bold text-red-700">
                {result.contributing.filter(w => w.type === "negative").length}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {result.contributing.filter(w => w.type === "negative").map((w, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-medium">
                  {w.word} ({w.score})
                </span>
              ))}
              {result.contributing.filter(w => w.type === "negative").length === 0 && (
                <span className="text-[10px] text-red-400 italic">None found</span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 mb-1">Neutral Words</p>
            <p className="text-xs text-gray-400">
              {result.contributing.filter(w => w.type === "neutral").length} words with no sentiment value
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">How It Works</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            This uses <strong className="text-gray-700">keyword-based scoring</strong>. Each word
            has a sentiment value. The total score determines the overall sentiment. Real NLP systems
            use much more sophisticated approaches.
          </p>
        </div>
      </div>
    </div>
  )
}
