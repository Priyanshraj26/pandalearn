"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying PandaLearn and exploring the platform.",
    cta: "Get Started Free",
    ctaStyle: "border border-navy-500 hover:border-violet-500 text-slate-300 hover:text-white hover:bg-violet-950/40",
    highlight: false,
    features: [
      "First 3 modules per subject",
      "5 AI tutor questions / day",
      "Basic quizzes",
      "Progress tracking",
      "Mobile-friendly access",
    ],
    notIncluded: [
      "Unlimited AI tutor",
      "AI-graded quizzes",
      "Mock interviews",
      "Certificates",
    ],
  },
  {
    name: "Pro",
    price: "₹499",
    priceAnnual: "₹3,999",
    period: "/month",
    periodAnnual: "/year  (save 33%)",
    description: "For serious learners who want the full experience.",
    cta: "Start Pro — Free 7-day trial",
    ctaStyle: "bg-orange-500 hover:bg-orange-400 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Free",
      "All modules — all subjects",
      "Unlimited AI tutor 🐼",
      "AI-graded quizzes + feedback",
      "System design mock interviews",
      "Completion certificates",
      "Offline mode (PWA)",
      "Priority support",
    ],
    notIncluded: [],
  },
  {
    name: "Institution",
    price: "Custom",
    period: "per school / college",
    description: "For schools, coaching institutes, and universities.",
    cta: "Contact Us",
    ctaStyle: "border border-navy-500 hover:border-teal-500 text-slate-300 hover:text-white hover:bg-teal-950/30",
    highlight: false,
    features: [
      "Everything in Pro",
      "Bulk student licenses",
      "Teacher dashboard",
      "Assign modules to classes",
      "Class progress analytics",
      "Custom branding (white-label)",
      "LMS integration (API)",
      "Dedicated account manager",
    ],
    notIncluded: [],
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-32 bg-navy-800/30"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-navy-700/70 border border-navy-600/60 text-slate-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Simple pricing
          </div>
          <h2
            id="pricing-heading"
            className="font-sora text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Start free, upgrade{" "}
            <span className="gradient-text">when you're ready</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            The free tier is genuinely useful. Upgrade only when you want the
            full power — no dark patterns, no credit card required.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlight
                  ? "bg-linear-to-b from-violet-950/80 to-navy-800/80 border-2 border-violet-500/60 animate-pulse-glow"
                  : "bg-navy-800/60 border border-navy-600/60"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap size={11} />
                  {plan.badge}
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-5">
                <div className="text-sm font-semibold text-slate-400 mb-1 uppercase tracking-wide">
                  {plan.name}
                </div>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="font-sora text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-400 text-sm pb-1">{plan.period}</span>
                  )}
                </div>
                {plan.priceAnnual && (
                  <div className="text-xs text-emerald-400 font-medium">
                    or {plan.priceAnnual}{plan.periodAnnual}
                  </div>
                )}
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 mb-7 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  What's included
                </div>
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check
                        size={15}
                        className={`shrink-0 mt-0.5 ${plan.highlight ? "text-violet-400" : "text-emerald-400"}`}
                      />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="shrink-0 mt-0.5 w-[15px] text-center leading-none">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          All plans include SSL security, GDPR compliance, and 99.9% uptime SLA.
          No hidden fees. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
