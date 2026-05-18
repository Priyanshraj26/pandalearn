interface Props {
  number?: string
  title: string
  tag?: "Definition" | "Key Concept" | "Formula" | "Example" | "Warning" | "Remember"
  children: React.ReactNode
}

const TAG: Record<NonNullable<Props["tag"]>, string> = {
  "Definition":  "bg-violet-100 text-violet-700",
  "Key Concept": "bg-blue-100   text-blue-700",
  "Formula":     "bg-amber-100  text-amber-700",
  "Example":     "bg-teal-100   text-teal-700",
  "Warning":     "bg-rose-100   text-rose-700",
  "Remember":    "bg-orange-100 text-orange-700",
}

export default function ConceptCard({ number, title, tag, children }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        {number && (
          <span className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-sora font-bold text-white text-xs shrink-0">
            {number}
          </span>
        )}
        <h3 className="font-sora font-bold text-gray-900 flex-1">{title}</h3>
        {tag && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${TAG[tag]}`}>
            {tag}
          </span>
        )}
      </div>
      <div className="px-5 py-4 text-gray-700 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  )
}
