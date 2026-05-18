/** Color system from the Computer Networks curriculum spec */
export const CN = {
  packet:    "#7C3AED",  // violet   - data in motion
  success:   "#10B981",  // emerald  - ACK / correct
  error:     "#F43F5E",  // rose     - dropped / wrong
  control:   "#F59E0B",  // amber    - headers / control frames
  medium:    "#475569",  // slate    - physical wire / radio
  device:    "#111827",  // gray-900 - device icons
  highlight: "#F97316",  // orange   - hover / active
} as const
