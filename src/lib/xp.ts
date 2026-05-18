// XP thresholds to reach each level (index = level - 1)
const XP_THRESHOLDS = [0, 500, 1_200, 2_500, 5_000, 10_000, 20_000, 35_000, 50_000, 75_000, 100_000]

export function levelFromXP(xp: number): number {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) return i + 1
  }
  return 1
}

export function xpForLevel(level: number): number {
  return XP_THRESHOLDS[Math.min(level - 1, XP_THRESHOLDS.length - 1)] ?? 0
}

/** Returns how far through the current level the user is. */
export function xpProgress(xp: number): { current: number; required: number; percent: number } {
  const level    = levelFromXP(xp)
  const floorXP  = xpForLevel(level)
  const ceilXP   = xpForLevel(level + 1) || floorXP * 2
  const current  = xp - floorXP
  const required = ceilXP - floorXP
  return { current, required, percent: Math.min(Math.round((current / required) * 100), 100) }
}
