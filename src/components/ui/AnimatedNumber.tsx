"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  end: number
  suffix?: string
  duration?: number
}

/** Counts up from 0 → end when the element scrolls into view. */
export default function AnimatedNumber({ end, suffix = "", duration = 1800 }: Props) {
  const [display, setDisplay] = useState("0")
  const ref       = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return
        triggered.current = true
        let startTs = 0
        const tick = (ts: number) => {
          if (!startTs) startTs = ts
          const p     = Math.min((ts - startTs) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(eased * end).toLocaleString() + suffix)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, suffix, duration])

  return <span ref={ref}>{display}</span>
}
