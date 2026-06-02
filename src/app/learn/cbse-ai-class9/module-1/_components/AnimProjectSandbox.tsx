"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, CheckCircle, RotateCcw, Sparkles, HeartPulse, BookOpen, Leaf, Car, User, Landmark, Laptop, Building2, FlaskConical, Newspaper, Smartphone, Monitor, Tablet, Settings, Bot, PartyPopper } from "lucide-react"

// ─── Data ────────────────────────────────────────────────────────────────────

const THEMES = [
  { id: "health",  Icon: HeartPulse, title: "Healthcare",   problem: "Early disease detection in rural areas",          sdg: "SDG 3 · Good Health",        color: "#EF4444", bg: "#FEF2F2" },
  { id: "edu",     Icon: BookOpen,   title: "Education",    problem: "Personalised learning paths for every student",   sdg: "SDG 4 · Quality Education",  color: "#7C3AED", bg: "#F5F3FF" },
  { id: "env",     Icon: Leaf,       title: "Environment",  problem: "Predict air pollution before it peaks",           sdg: "SDG 13 · Climate Action",    color: "#059669", bg: "#ECFDF5" },
  { id: "traffic", Icon: Car,        title: "Transport",    problem: "Smart traffic signals to cut city congestion",    sdg: "SDG 11 · Sustainable Cities", color: "#2563EB", bg: "#EFF6FF" },
]

const WHO_OPTIONS   = ["School students aged 10-14","Elderly patients in remote areas","Farmers","Daily commuters"]
const WHAT_OPTIONS  = ["Need early warning before crisis","Lack personalised support","Are harmed by delayed information","Waste hours due to inefficiency"]
const WHERE_OPTIONS = ["Rural districts with few hospitals","Government schools","Agricultural regions","Metro city intersections"]
const WHEN_OPTIONS  = ["During disease outbreak seasons","All year, daily monitoring","Crop-growing seasons","Peak morning & evening hours"]

const STAKEHOLDERS = [
  { id: "users",  Icon: User,        name: "End Users",      desc: "Directly affected people"         },
  { id: "gov",    Icon: Landmark,    name: "Government",     desc: "Policy, regulation & funding"     },
  { id: "dev",    Icon: Laptop,      name: "AI Developers",  desc: "Build & maintain the model"       },
  { id: "org",    Icon: Building2,   name: "Organisation",   desc: "Deploy & operate the system"      },
  { id: "expert", Icon: FlaskConical,name: "Domain Experts", desc: "Doctors, teachers, engineers"     },
  { id: "media",  Icon: Newspaper,   name: "Media / NGOs",   desc: "Public awareness & accountability"},
]

const FEATURES_BY_THEME: Record<string, { id: string; name: string; impact: number }[]> = {
  health:  [
    { id: "age",     name: "Patient Age",        impact: 0.65 },
    { id: "sym",     name: "Symptoms Reported",  impact: 0.90 },
    { id: "hist",    name: "Medical History",     impact: 0.85 },
    { id: "loc",     name: "Location (district)", impact: 0.35 },
    { id: "gen",     name: "Genetic Markers",     impact: 0.92 },
    { id: "life",    name: "Lifestyle Data",      impact: 0.60 },
  ],
  edu:     [
    { id: "score",   name: "Past Test Scores",   impact: 0.88 },
    { id: "time",    name: "Time Spent Learning", impact: 0.72 },
    { id: "err",     name: "Error Patterns",      impact: 0.84 },
    { id: "lang",    name: "Language Preference", impact: 0.45 },
    { id: "atten",   name: "Attendance Record",   impact: 0.55 },
    { id: "pace",    name: "Learning Pace",       impact: 0.78 },
  ],
  env:     [
    { id: "wind",    name: "Wind Speed",          impact: 0.75 },
    { id: "temp",    name: "Temperature",         impact: 0.68 },
    { id: "traffic", name: "Vehicle Count",       impact: 0.82 },
    { id: "ind",     name: "Factory Output",      impact: 0.88 },
    { id: "humid",   name: "Humidity",            impact: 0.55 },
    { id: "season",  name: "Season / Month",      impact: 0.60 },
  ],
  traffic: [
    { id: "vol",     name: "Vehicle Volume",      impact: 0.90 },
    { id: "time",    name: "Time of Day",         impact: 0.85 },
    { id: "weather", name: "Weather Condition",   impact: 0.65 },
    { id: "event",   name: "Nearby Events",       impact: 0.70 },
    { id: "hist",    name: "Historical Patterns", impact: 0.78 },
    { id: "type",    name: "Vehicle Type Mix",    impact: 0.55 },
  ],
}

const DEPLOY_OPTIONS = [
  { id: "app",   Icon: Smartphone, label: "Mobile App",      note: "Accessible anywhere, but needs smartphone." },
  { id: "web",   Icon: Monitor,    label: "Web Dashboard",   note: "Great for experts, needs internet access."  },
  { id: "kiosk", Icon: Tablet,     label: "Public Kiosk",    note: "Works offline, limited to fixed locations." },
  { id: "api",   Icon: Settings,   label: "API Integration", note: "Powers other apps  invisible but powerful."},
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcAccuracy(featureIds: string[], theme: string) {
  const feats = FEATURES_BY_THEME[theme] ?? []
  const selected = feats.filter(f => featureIds.includes(f.id))
  if (selected.length === 0) return 0.42
  const avg = selected.reduce((s, f) => s + f.impact, 0) / selected.length
  const bonus = Math.min(selected.length / feats.length, 1) * 0.12
  return Math.min(0.96, avg + bonus)
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full transition-all duration-300"
          style={{ background: i < step ? "#F97316" : i === step ? "#FED7AA" : "#F1F5F9" }}
        />
      ))}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AnimProjectSandbox() {
  const [step,         setStep]         = useState(0)
  const [theme,        setTheme]        = useState<string | null>(null)
  const [who,          setWho]          = useState<string | null>(null)
  const [what,         setWhat]         = useState<string | null>(null)
  const [where,        setWhere]        = useState<string | null>(null)
  const [when,         setWhen]         = useState<string | null>(null)
  const [stakeholders, setStakeholders] = useState<string[]>([])
  const [features,     setFeatures]     = useState<string[]>([])
  const [trainDone,    setTrainDone]     = useState(false)
  const [trainPct,     setTrainPct]      = useState(0)
  const [threshold,    setThreshold]    = useState(0.5)
  const [deployment,   setDeployment]   = useState<string | null>(null)

  const themeData  = THEMES.find(t => t.id === theme) ?? THEMES[0]
  const accuracy   = calcAccuracy(features, theme ?? "health")
  const TOTAL_STEPS = 8

  function startTraining() {
    setTrainDone(false)
    setTrainPct(0)
    let pct = 0
    const id = setInterval(() => {
      pct += Math.random() * 4 + 1
      if (pct >= 100) { pct = 100; clearInterval(id); setTrainDone(true) }
      setTrainPct(pct)
    }, 60)
  }

  function toggleStakeholder(id: string) {
    setStakeholders(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }
  function toggleFeature(id: string) {
    setFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  function reset() {
    setStep(0); setTheme(null); setWho(null); setWhat(null)
    setWhere(null); setWhen(null); setStakeholders([]); setFeatures([])
    setTrainDone(false); setTrainPct(0); setThreshold(0.5); setDeployment(null)
  }

  const canProceed = [
    true,
    !!theme,
    !!(who && what && where && when),
    stakeholders.length >= 2,
    features.length >= 2,
    trainDone,
    true,
    !!deployment,
  ][step] ?? false

  const stepHint = !canProceed ? ([
    null,
    "Choose a problem theme above to continue",
    "Fill all four fields to unlock the problem statement",
    `Select ${Math.max(0, 2 - stakeholders.length)} more stakeholder${2 - stakeholders.length === 1 ? "" : "s"}`,
    `Select ${Math.max(0, 2 - features.length)} more feature${2 - features.length === 1 ? "" : "s"}`,
    "Press \"Start Training\" to continue",
    null,
    "Choose a deployment method above",
  ][step] ?? null) : null

  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-white overflow-hidden">

      {/* header */}
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-orange-50 border-b border-orange-100">
        <div>
          <p className="font-sora font-bold text-gray-900 text-sm">AI Project Cycle Sandbox</p>
          <p className="text-xs text-gray-500 mt-0.5">Build your own AI project  step by step</p>
        </div>
        {step > 0 && (
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors">
            <RotateCcw size={12} /> Restart
          </button>
        )}
      </div>

      <div className="p-5">
        <ProgressBar step={step} total={TOTAL_STEPS} />

        <AnimatePresence mode="wait">

          {/* ── Step 0: Introduction ── */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="text-center py-4">
                <div className="flex justify-center mb-3"><Bot size={40} className="text-orange-500" /></div>
                <h3 className="font-sora font-bold text-gray-900 text-lg mb-2">Build Your First AI Project!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  You&apos;ll follow the real <strong>CBSE AI Project Cycle</strong>  scoping a problem, collecting data,
                  building a model, evaluating it, and deploying it. This is exactly what AI engineers do.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["6 interactive steps","Real AI process","Relate to SDGs"].map(l => (
                  <div key={l} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                    <p className="text-xs font-semibold text-orange-700">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 1: Choose theme ── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 01 · Problem Scoping</p>
                <h3 className="font-sora font-bold text-gray-900">Choose a problem theme</h3>
                <p className="text-xs text-gray-500 mt-1">Which area will your AI help with? Each theme links to a UN Sustainable Development Goal.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`rounded-xl p-3.5 text-left border-2 transition-all ${
                      theme === t.id ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200 bg-white"
                    }`}
                  >
                    <t.Icon size={20} className="mb-1.5" style={{ color: t.color }} />
                    <p className="font-semibold text-gray-900 text-sm">{t.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{t.problem}</p>
                    <span
                      className="inline-block mt-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: t.color + "18", color: t.color }}
                    >
                      {t.sdg}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: 4Ws Canvas ── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 01 · 4Ws Problem Canvas</p>
                <h3 className="font-sora font-bold text-gray-900">Fill in the 4Ws</h3>
                <p className="text-xs text-gray-500 mt-1">This is the exact canvas recommended in the CBSE AI curriculum. Select one option per question.</p>
              </div>
              {[
                { q: "WHO is affected?",            opts: WHO_OPTIONS,   val: who,   set: setWho   },
                { q: "WHAT is the problem?",        opts: WHAT_OPTIONS,  val: what,  set: setWhat  },
                { q: "WHERE does it happen?",       opts: WHERE_OPTIONS, val: where, set: setWhere },
                { q: "WHEN does it occur?",         opts: WHEN_OPTIONS,  val: when,  set: setWhen  },
              ].map(({ q, opts, val, set }) => (
                <div key={q}>
                  <p className="text-xs font-bold text-orange-600 mb-1.5">{q}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {opts.map(o => (
                      <button
                        key={o}
                        onClick={() => set(o)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                          val === o
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {/* live problem statement */}
              {who && what && where && when && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-violet-50 border border-violet-200 rounded-xl p-3.5"
                >
                  <p className="text-[10px] font-bold text-violet-500 uppercase tracking-wider mb-1">Generated Problem Statement</p>
                  <p className="text-xs text-violet-900 leading-relaxed">
                    <strong>{who}</strong> {what}  especially {where}, {when}.
                    An AI system can help by analysing patterns and providing timely predictions.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Step 3: Stakeholders ── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 01 · Stakeholders</p>
                <h3 className="font-sora font-bold text-gray-900">Who is involved?</h3>
                <p className="text-xs text-gray-500 mt-1">Select at least 2 stakeholders who will be affected by or involved in your AI project.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STAKEHOLDERS.map(s => {
                  const selected = stakeholders.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleStakeholder(s.id)}
                      className={`rounded-xl p-3 text-left border-2 transition-all ${
                        selected ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <s.Icon size={16} className={selected ? "text-orange-500" : "text-gray-400"} />
                        {selected && <CheckCircle size={13} className="text-orange-500 ml-auto shrink-0" />}
                      </div>
                      <p className="font-semibold text-gray-900 text-xs">{s.name}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{s.desc}</p>
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-gray-400 text-center">{stakeholders.length} selected (min 2)</p>
            </motion.div>
          )}

          {/* ── Step 4: Data Features ── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 02 · Data Acquisition</p>
                <h3 className="font-sora font-bold text-gray-900">Choose your data features</h3>
                <p className="text-xs text-gray-500 mt-1">Select which data points will help your model. Watch how your estimated accuracy changes.</p>
              </div>

              <div className="space-y-1.5">
                {(FEATURES_BY_THEME[theme ?? "health"] ?? []).map(f => {
                  const selected = features.includes(f.id)
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 border-2 transition-all ${
                        selected ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {selected
                          ? <CheckCircle size={14} className="text-orange-500 shrink-0" />
                          : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0" />
                        }
                        <span className="text-xs font-medium text-gray-900 truncate">{f.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-400 rounded-full transition-all duration-500"
                            style={{ width: `${f.impact * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 w-8 text-right">{Math.round(f.impact * 100)}%</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                <span className="text-xs text-gray-600">Estimated model accuracy</span>
                <motion.span
                  key={Math.round(accuracy * 100)}
                  initial={{ scale: 1.2, color: "#F97316" }} animate={{ scale: 1, color: "#111827" }}
                  className="text-sm font-bold"
                >
                  {features.length === 0 ? "" : `${Math.round(accuracy * 100)}%`}
                </motion.span>
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Model Training ── */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 04 · Modeling</p>
                <h3 className="font-sora font-bold text-gray-900">Train your model</h3>
                <p className="text-xs text-gray-500 mt-1">
                  You chose {features.length} data features. This is a <strong>learning-based model</strong>  it learns patterns
                  from historical examples, not hand-written rules.
                </p>
              </div>

              <div className="bg-[#080C14] rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Training progress</span>
                  <span className="font-mono">{Math.round(trainPct)}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${trainPct}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                {trainDone ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center py-2"
                  >
                    <p className="text-orange-400 font-bold text-sm">Training complete ✓</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Test-set accuracy: <span className="text-orange-300 font-bold">{Math.round(accuracy * 100)}%</span>
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-xs font-mono space-y-1.5 min-h-24">
                    {[
                      { t: 5,  text: `Loading ${features.length * 1200 + 800} training samples…`   },
                      { t: 22, text: "Normalising feature vectors…"                                  },
                      { t: 40, text: "Forward pass  epoch 1/5 · loss: 0.834"                        },
                      { t: 58, text: "Backpropagation  loss: 0.834 → 0.521"                         },
                      { t: 74, text: "Gradient descent  epoch 4/5 · loss: 0.312"                    },
                      { t: 90, text: "Validating on hold-out test set…"                              },
                    ].map(({ t, text }) => trainPct > t && (
                      <motion.p
                        key={t}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        className="text-emerald-400"
                      >
                        ✓ {text}
                      </motion.p>
                    ))}
                  </div>
                )}
              </div>

              {!trainDone && trainPct === 0 && (
                <button
                  onClick={startTraining}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  Start Training
                </button>
              )}
            </motion.div>
          )}

          {/* ── Step 6: Evaluation ── */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 05 · Evaluation</p>
                <h3 className="font-sora font-bold text-gray-900">Read the Confusion Matrix</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Adjust the confidence threshold. See how it shifts TP, FP, TN, FN.
                  In healthcare, false negatives (missed cases) are dangerous!
                </p>
              </div>

              {/* threshold slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16 shrink-0">Threshold: {threshold.toFixed(2)}</span>
                <input
                  type="range" min={0.1} max={0.9} step={0.05}
                  value={threshold}
                  onChange={e => setThreshold(Number(e.target.value))}
                  className="flex-1 accent-orange-500"
                />
              </div>

              {/* Confusion matrix */}
              {(() => {
                const n    = 200
                const pos  = Math.round(n * accuracy)
                const tp   = Math.max(0, Math.round(pos * (1 - threshold * 0.4)))
                const fn   = Math.max(0, pos - tp)
                const neg  = n - pos
                const fp   = Math.max(0, Math.round(neg * (1 - threshold) * 0.6))
                const tn   = Math.max(0, neg - fp)
                const cells = [
                  { label: "True Positive",  val: tp, accent: "#7C3AED", desc: "Correctly predicted POSITIVE"         },
                  { label: "False Positive", val: fp, accent: "#6B7280", desc: "Incorrectly predicted POSITIVE"       },
                  { label: "False Negative", val: fn, accent: "#6B7280", desc: "Missed real POSITIVE  most dangerous!"},
                  { label: "True Negative",  val: tn, accent: "#7C3AED", desc: "Correctly predicted NEGATIVE"         },
                ]
                return (
                  <div className="grid grid-cols-2 gap-2">
                    {cells.map(c => (
                      <motion.div
                        key={c.label}
                        animate={{ opacity: 1 }}
                        className="rounded-xl p-3 border border-gray-200 bg-gray-50 text-center"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{c.label}</p>
                        <motion.p
                          key={c.val}
                          initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                          className="text-2xl font-bold font-sora mt-1"
                          style={{ color: c.accent }}
                        >
                          {c.val}
                        </motion.p>
                        <p className="text-[10px] mt-1 leading-tight text-gray-400">{c.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )
              })()}
            </motion.div>
          )}

          {/* ── Step 7: Deployment ── */}
          {step === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 06 · Deployment</p>
                <h3 className="font-sora font-bold text-gray-900">How will users access your AI?</h3>
                <p className="text-xs text-gray-500 mt-1">Each deployment method has trade-offs. Choose what fits your users best.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DEPLOY_OPTIONS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDeployment(d.id)}
                    className={`rounded-xl p-3.5 text-left border-2 transition-all ${
                      deployment === d.id ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200 bg-white"
                    }`}
                  >
                    <d.Icon size={20} className="mb-1.5 text-gray-500" />
                    <p className="font-semibold text-gray-900 text-xs">{d.label}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">{d.note}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 8 (index 7 + next = 8): Summary ── */}
          {step === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="text-center py-2">
                <div className="flex justify-center mb-2"><PartyPopper size={40} className="text-orange-500" /></div>
                <h3 className="font-sora font-bold text-gray-900 text-lg">Your AI Project!</h3>
                <p className="text-xs text-gray-500 mt-1">You just completed the full CBSE AI Project Cycle</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 space-y-2.5">
                {[
                  { label: "Theme",       val: themeData.title + "  " + themeData.problem },
                  { label: "4Ws",         val: `${who} | ${what} | ${where} | ${when}` },
                  { label: "Stakeholders",val: stakeholders.map(id => STAKEHOLDERS.find(s => s.id === id)?.name).filter(Boolean).join(", ") },
                  { label: "Features",    val: `${features.length} data features selected` },
                  { label: "Model",       val: `Learning-based · ${Math.round(accuracy * 100)}% accuracy` },
                  { label: "Deployment",  val: DEPLOY_OPTIONS.find(d => d.id === deployment)?.label ?? "" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide w-24 shrink-0 pt-0.5">{label}</span>
                    <span className="text-xs text-gray-700 leading-relaxed">{val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3">
                <Sparkles size={14} className="text-violet-500 shrink-0" />
                <p className="text-xs text-violet-700">
                  This is exactly how real AI engineers work  iterating from problem to deployment.
                  The <strong>CBSE AI curriculum</strong> teaches this cycle so you&apos;re ready for real projects.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
          {stepHint && (
            <motion.p
              key={stepHint}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[10px] text-orange-400 text-center"
            >
              {stepHint}
            </motion.p>
          )}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} /> Back
          </button>
          <span className="text-xs text-gray-400">{step + 1} / {TOTAL_STEPS}</span>
          {step < TOTAL_STEPS - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed}
              className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {step === 0 ? "Let's Go" : "Continue"} <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <RotateCcw size={14} /> Try Again
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
