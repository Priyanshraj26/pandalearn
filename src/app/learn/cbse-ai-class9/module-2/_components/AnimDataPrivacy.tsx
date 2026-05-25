"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, MapPin, Heart, CreditCard, Eye, ShieldCheck, ShieldAlert, Lock, Unlock } from "lucide-react"

// ── Types & Data ──────────────────────────────────────────────────────────────

type DataCategoryKey = "location" | "health" | "financial" | "behavior" | "identity"
type Phase = "permissions" | "breach" | "protect"

interface DataCategory {
  key:       DataCategoryKey
  label:     string
  Icon:      React.ElementType
  color:     string
  examples:  string[]
  riskLevel: "low" | "medium" | "high" | "critical"
  riskDesc:  string
  whenShared: string
}

const DATA_CATEGORIES: DataCategory[] = [
  {
    key:     "location",
    label:   "Location",
    Icon:    MapPin,
    color:   "#3B82F6",
    examples: ["GPS coordinates every 5 minutes", "Home & work addresses", "Shops you visit", "Daily commute routes"],
    riskLevel: "high",
    riskDesc: "Reveals your home, workplace, daily schedule — a stalker or thief could use this to track you.",
    whenShared: "Maps, food delivery, cab apps, weather apps",
  },
  {
    key:     "health",
    label:   "Health",
    Icon:    Heart,
    color:   "#EF4444",
    examples: ["Step count & calories burned", "Sleep patterns", "Heart rate data", "Mental health app entries"],
    riskLevel: "critical",
    riskDesc: "Health data can be used by insurers to deny coverage, or by employers to discriminate. It is the most sensitive personal data.",
    whenShared: "Fitness apps, health trackers, hospital portals",
  },
  {
    key:     "financial",
    label:   "Financial",
    Icon:    CreditCard,
    color:   "#F59E0B",
    examples: ["Bank account details", "Transaction history", "UPI/credit card usage", "Shopping behaviour"],
    riskLevel: "critical",
    riskDesc: "Financial data can be used for identity theft, fraud, and targeted scams. A data breach can empty your bank account.",
    whenShared: "Payment apps, UPI, e-commerce, banking apps",
  },
  {
    key:     "behavior",
    label:   "Behaviour",
    Icon:    Eye,
    color:   "#8B5CF6",
    examples: ["What you search and click", "How long you read each post", "Videos you watch", "Ads you interact with"],
    riskLevel: "medium",
    riskDesc: "Behavioural data is used to build a detailed profile of your personality, political views, and vulnerabilities for micro-targeted advertising.",
    whenShared: "Social media, YouTube, Google, news apps",
  },
  {
    key:     "identity",
    label:   "Identity",
    Icon:    Smartphone,
    color:   "#10B981",
    examples: ["Name, age, gender", "Phone number & email", "Aadhaar / school ID", "Selfie / biometric data"],
    riskLevel: "high",
    riskDesc: "Identity data linked to other data enables impersonation, SIM swapping, and targeted phishing attacks.",
    whenShared: "Any app signup, KYC processes, social profiles",
  },
]

const RISK_COLORS = {
  low:      { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7", label: "Low Risk"      },
  medium:   { bg: "#FEF9EE", text: "#D97706", border: "#FCD34D", label: "Medium Risk"   },
  high:     { bg: "#FFF7ED", text: "#EA580C", border: "#FDBA74", label: "High Risk"     },
  critical: { bg: "#FEF2F2", text: "#DC2626", border: "#FCA5A5", label: "Critical Risk" },
}

const BREACH_SCENARIO = {
  title: "Data Breach: EduLearn App Hacked",
  date:  "March 2025",
  desc:  "A popular education app (used by 2 million students) was hacked. The attackers accessed the database and leaked data onto the dark web.",
  leaked: [
    { cat: "identity",  detail: "Full names, ages, email IDs, and phone numbers of all 2M users" },
    { cat: "location",  detail: "Home addresses stored for 'study group finder' feature" },
    { cat: "behavior",  detail: "Complete study history: every topic accessed, quiz score, time spent" },
  ],
  consequences: [
    "Students received phishing SMS claiming to be the school, asking for Aadhaar details",
    "Parents received fake fee payment requests to fraudulent accounts",
    "Some students faced targeted social engineering attempts",
    "App fined ₹2 crore under India's PDPB (Personal Data Protection Bill)",
  ],
}

const PROTECTIONS = [
  {
    label: "Read Privacy Policies",
    desc:  "Before installing any app, check what data it collects and why. Legitimate apps only ask for what they need.",
    icon:  "📖",
  },
  {
    label: "Use App Permissions wisely",
    desc:  "Does a flashlight app need your location? Deny permissions that don't match the app's purpose.",
    icon:  "🔒",
  },
  {
    label: "Enable Two-Factor Authentication",
    desc:  "Even if your password leaks, 2FA prevents attackers from accessing your account.",
    icon:  "🛡️",
  },
  {
    label: "Use Strong, Unique Passwords",
    desc:  "Never reuse passwords. Use a password manager. A leaked password from one site unlocks all your other accounts.",
    icon:  "🔑",
  },
  {
    label: "Know Your Rights (PDPB India)",
    desc:  "India's Personal Data Protection Bill gives you the right to access, correct, and erase your data from any platform.",
    icon:  "⚖️",
  },
  {
    label: "Data Minimisation",
    desc:  "Don't share more than necessary. Use fake birthdates in non-critical signups. Protect your Aadhaar and school ID.",
    icon:  "✂️",
  },
]

// ── Particle flow ─────────────────────────────────────────────────────────────

function DataParticle({ color, delay, active }: { color: string; delay: number; active: boolean }) {
  if (!active) return null
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{ background: color, top: "50%", left: "38px" }}
      animate={{ x: [0, 60, 120, 160], y: [0, -8, 4, 0], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.5, delay, repeat: Infinity, ease: "easeOut" }}
    />
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnimDataPrivacy() {
  const [phase, setPhase]           = useState<Phase>("permissions")
  const [consented, setConsented]   = useState<Set<DataCategoryKey>>(new Set())
  const [activeCategory, setActive] = useState<DataCategoryKey>("location")

  const toggleConsent = (key: DataCategoryKey) => {
    setConsented(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const activeMeta = DATA_CATEGORIES.find(d => d.key === activeCategory)!
  const riskColor  = RISK_COLORS[activeMeta.riskLevel]

  return (
    <div className="grid md:grid-cols-2">

      {/* ── Visual panel ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#060A12] flex items-center justify-center min-h-80 overflow-hidden">

        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden>
          <defs>
            <pattern id="dp-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#94A3B8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dp-dots)" />
        </svg>

        <div className="relative z-10 w-full px-6 flex flex-col items-center gap-6">

          {/* Phase: permissions */}
          {phase === "permissions" && (
            <div className="w-full max-w-64">
              {/* Fake phone mockup */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium ml-1">EduLearn App — Permissions</p>
                </div>
                <div className="p-3 space-y-2">
                  {DATA_CATEGORIES.map(d => {
                    const granted = consented.has(d.key)
                    const isActive = activeCategory === d.key
                    return (
                      <motion.div key={d.key}
                        onClick={() => { setActive(d.key); toggleConsent(d.key) }}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: isActive ? d.color + "18" : "transparent",
                          border:     `1px solid ${isActive ? d.color + "40" : "transparent"}`,
                        }}
                      >
                        <d.Icon size={13} style={{ color: d.color }} className="shrink-0" />
                        <span className="text-[11px] text-slate-200 flex-1 font-medium">{d.label}</span>
                        {/* Toggle */}
                        <div
                          className="w-8 h-4 rounded-full transition-all relative"
                          style={{ background: granted ? d.color : "#334155" }}
                        >
                          <motion.div
                            className="w-3 h-3 bg-white rounded-full absolute top-0.5"
                            animate={{ left: granted ? "calc(100% - 14px)" : "2px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        </div>
                        {/* Particle flow when granted */}
                        {granted && (
                          <div className="relative w-0 h-0 overflow-visible">
                            {[0, 0.5, 1].map(delay => (
                              <DataParticle key={delay} color={d.color} delay={delay} active={granted} />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
                <div className="px-3 pb-3">
                  <div
                    className="w-full py-2 rounded-xl text-[11px] font-bold text-white text-center"
                    style={{ background: consented.size > 0 ? "#F97316" : "#334155" }}
                  >
                    Install App ({consented.size}/{DATA_CATEGORIES.length} permissions granted)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase: breach */}
          {phase === "breach" && (
            <div className="w-full max-w-64 space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-red-950 border border-red-800 rounded-2xl p-4 text-center"
              >
                <ShieldAlert size={28} className="text-red-400 mx-auto mb-2" />
                <p className="text-red-300 font-bold text-xs">DATA BREACH</p>
                <p className="text-red-400 text-[10px] mt-0.5">{BREACH_SCENARIO.date}</p>
              </motion.div>
              {BREACH_SCENARIO.leaked.map((item, i) => {
                const cat = DATA_CATEGORIES.find(d => d.key === item.cat)!
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-2 bg-slate-800/60 border border-slate-700 rounded-xl p-2.5"
                  >
                    <cat.Icon size={12} style={{ color: cat.color }} className="shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-300 leading-snug">{item.detail}</p>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Phase: protect */}
          {phase === "protect" && (
            <div className="w-full max-w-64 space-y-2">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-emerald-950 border border-emerald-800 rounded-2xl p-4 text-center"
              >
                <ShieldCheck size={28} className="text-emerald-400 mx-auto mb-2" />
                <p className="text-emerald-300 font-bold text-xs">DATA PROTECTION</p>
                <p className="text-emerald-600 text-[10px]">India PDPB & Best Practices</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-1.5">
                {PROTECTIONS.slice(0, 4).map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-800/60 border border-slate-700 rounded-xl p-2 text-center"
                  >
                    <p className="text-base mb-1">{p.icon}</p>
                    <p className="text-[9px] text-slate-300 font-semibold leading-tight">{p.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Phase buttons */}
          <div className="flex gap-2">
            {(["permissions", "breach", "protect"] as Phase[]).map(p => (
              <button key={p} onClick={() => setPhase(p)}
                className="px-3 py-1 rounded-full text-[10px] font-bold capitalize transition-all"
                style={phase === p
                  ? { background: "#F97316", color: "#fff" }
                  : { background: "#1E293B", color: "#64748B" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-l border-gray-200 flex flex-col overflow-y-auto">

        {/* Phase content */}
        <AnimatePresence mode="wait">

          {phase === "permissions" && (
            <motion.div key="permissions"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="p-4 flex flex-col gap-3 flex-1"
            >
              <div>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">Data Permissions</p>
                <h3 className="font-sora font-bold text-gray-900 text-sm">What does this app know about you?</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Click each permission to toggle it ON/OFF and see what data the app gets.
                </p>
              </div>

              {/* Active category detail */}
              <motion.div key={activeCategory}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="rounded-xl p-3 border space-y-2"
                style={{ borderColor: activeMeta.color + "40", background: activeMeta.color + "08" }}
              >
                <div className="flex items-center gap-2">
                  <activeMeta.Icon size={14} style={{ color: activeMeta.color }} />
                  <p className="text-xs font-bold text-gray-900">{activeMeta.label} Data</p>
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: riskColor.bg, color: riskColor.text, border: `1px solid ${riskColor.border}` }}
                  >
                    {riskColor.label}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {activeMeta.examples.map(ex => (
                    <li key={ex} className="text-[10px] text-gray-600 flex items-start gap-1.5">
                      <span className="shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ background: activeMeta.color }} />
                      {ex}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-gray-500 pt-1 border-t border-gray-100 leading-snug">{activeMeta.riskDesc}</p>
                <p className="text-[10px] font-semibold" style={{ color: activeMeta.color }}>
                  Shared by: {activeMeta.whenShared}
                </p>
              </motion.div>

              <div className="mt-auto">
                {consented.size === 0 && (
                  <p className="text-[10px] text-gray-400 italic mb-2 text-center">Grant some permissions to see what data flows out</p>
                )}
                {consented.size > 0 && (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 mb-2 text-xs text-amber-800">
                    <p className="font-bold mb-0.5">You granted {consented.size} permission{consented.size > 1 ? "s" : ""}</p>
                    <p className="text-[10px]">Every toggle sends data flows to the company's servers. Think: is the value worth the privacy cost?</p>
                  </div>
                )}
                <button onClick={() => setPhase("breach")}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors"
                >
                  See what happens in a breach →
                </button>
              </div>
            </motion.div>
          )}

          {phase === "breach" && (
            <motion.div key="breach"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="p-4 flex flex-col gap-3 flex-1"
            >
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Scenario</p>
                <h3 className="font-sora font-bold text-gray-900 text-sm">{BREACH_SCENARIO.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{BREACH_SCENARIO.desc}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1.5">Real-world consequences</p>
                <ul className="space-y-2">
                  {BREACH_SCENARIO.consequences.map((c, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-xs text-gray-700 flex items-start gap-2"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 bg-red-400" />
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs">
                <p className="font-bold text-red-700 mb-1">Data breaches are not rare</p>
                <p className="text-red-600 leading-relaxed">
                  India's CERT-In reported 13.9 lakh cybersecurity incidents in 2022 alone.
                  Data you shared years ago can be leaked anytime — minimising what you share is your best protection.
                </p>
              </div>
              <button onClick={() => setPhase("protect")}
                className="mt-auto w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck size={14} /> Learn how to protect yourself →
              </button>
            </motion.div>
          )}

          {phase === "protect" && (
            <motion.div key="protect"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="p-4 flex flex-col gap-3 flex-1"
            >
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Protection Strategies</p>
                <h3 className="font-sora font-bold text-gray-900 text-sm">How to protect your data</h3>
              </div>
              <div className="space-y-2">
                {PROTECTIONS.map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-2.5"
                  >
                    <span className="text-lg shrink-0">{p.icon}</span>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">{p.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto rounded-xl bg-violet-50 border border-violet-100 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Lock size={11} className="text-violet-600" />
                  <p className="text-[10px] font-bold text-violet-700">India PDPB Key Rights</p>
                </div>
                <p className="text-[10px] text-violet-700 leading-relaxed">
                  Right to Access · Right to Correction · Right to Erasure ("Right to be Forgotten") · Right to Grievance Redressal
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
