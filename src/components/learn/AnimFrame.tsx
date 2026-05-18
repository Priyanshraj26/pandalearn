"use client"

import {
  createContext, useContext, useState, useCallback,
  type Dispatch, type SetStateAction, type ReactNode,
} from "react"

// ─── context ──────────────────────────────────────────────────────────────────

export interface AnimCtx {
  speed:      number
  step:       number
  totalSteps: number
  setStep:    Dispatch<SetStateAction<number>>
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
  id:           string
  title:        string
  description?: string
  totalSteps?:  number
  showSpeed?:   boolean
  children:     ReactNode
}

export default function AnimFrame({
  id, title, description, totalSteps = 1, showSpeed = false, children,
}: Props) {
  const [speed, setSpeed] = useState(1)
  const [step,  setStep]  = useState(0)

  const advance = useCallback(
    () => setStep(s => Math.min(s + 1, totalSteps - 1)),
    [totalSteps],
  )
  const reset = useCallback(() => setStep(0), [])

  const ctx: AnimCtx = { speed, step, totalSteps, setStep, advance, reset }

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

        {showSpeed && (
          <div className="flex items-center gap-1.5 shrink-0">
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
        )}
      </div>

      {/* ── content ── */}
      <Ctx.Provider value={ctx}>
        {children}
      </Ctx.Provider>
    </div>
  )
}
