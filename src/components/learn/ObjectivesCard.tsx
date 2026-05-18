import { CheckCircle2 } from "lucide-react"

interface Props {
  objectives: string[]
}

export default function ObjectivesCard({ objectives }: Props) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-5">
      <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">
        By the end of this module you will be able to
      </p>
      <ul className="space-y-2">
        {objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 size={15} className="text-violet-400 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 leading-relaxed">{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
