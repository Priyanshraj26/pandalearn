"use client"

import {
  createContext, useContext, useState, useCallback, useEffect,
  type ReactNode,
} from "react"
import { Play, Pause, ChevronRight, RotateCcw } from "lucide-react"

// ─── context ──────────────────────────────────────────────────────────────────

export type AnimMode = "watch" | "step" | "explore"

export interface AnimCtx {
  mode:       AnimMode
  playing:    boolean
  speed:      number
  step:       number
  totalSteps: number
  setStep:    (n: number) => void
  advance:    () => void
  reset:      () => void
}

const Ctx = createContext<AnimCtx | null>(null)

export function useAnim(): AnimCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error("useAnim must be used inside <AnimFrame>")
  return c
}

// ─── component ────────────────────────────────────────────────────────────────

interface Props {
  id:          string
  title:       string
  description?: string
  totalSteps?: number
  children:    ReactNode
}

export default function AnimFrame({
  id, title, description, totalSteps = 1, children,
}: Props) {
  const [mode,    setMode]    = useState<AnimMode>("watch")
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)
  const [step,    setStep]    = useState(0)

  const advance = useCallback(
    () => setStep(s => Math.min(s + 1, totalSteps - 1)),
    [totalSteps],
  )
  const reset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  // Space = pause/resume when frame is focused
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const el = document.getElementById(id)
      if (e.code === "Space" && el?.contains(document.activeElement)) {
        e.preventDefault()
        setPlaying(p => !p)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [id])

  const ctx: AnimCtx = { mode, playing, speed, step, totalSteps, setStep, advance, reset }

  return (
    <div id={id} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">

      {/* ── header ── */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 font-sora truncate">{title}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">{description}</p>
          )}
        </div>

        {/* mode tabs */}
        <div className="flex rounded-lg bg-white border border-gray-200 p-0.5 shrink-0">
          {(["watch", "step", "explore"] as AnimMode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); reset() }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                mode === m
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ── content ── */}
      <Ctx.Provider value={ctx}>
        {children}
      </Ctx.Provider>

      {/* ── footer controls ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2">
          {mode === "watch" && (
            <>
              <button
                onClick={() => setPlaying(p => !p)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  playing
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-violet-600 text-white hover:bg-violet-500"
                }`}
              >
                {playing ? <><Pause size={11} /> Pause</> : <><Play size={11} /> Play</>}
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </>
          )}

          {mode === "step" && (
            <>
              <span className="text-xs text-gray-400 tabular-nums w-16">
                {step + 1} / {totalSteps}
              </span>
              <button
                onClick={reset}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <RotateCcw size={11} /> Reset
              </button>
              <button
                onClick={advance}
                disabled={step >= totalSteps - 1}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-medium hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight size={11} />
              </button>
            </>
          )}

          {mode === "explore" && (
            <span className="text-xs text-gray-400 italic">Click any element to inspect</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400">Speed</span>
          <select
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="text-xs border border-gray-200 rounded-md px-1.5 py-1 bg-white text-gray-700"
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </div>
    </div>
  )
}
