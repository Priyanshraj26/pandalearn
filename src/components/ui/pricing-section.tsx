"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    monthlyPrice: "₹0",
    yearlyPrice: "₹0",
    period: "/month",
    description: "Perfect for trying PandaLearn and exploring the platform.",
    cta: "Get Started Free",
    ctaStyle:
      "border-2 border-gray-300 hover:border-violet-400 text-gray-700 hover:text-violet-700 hover:bg-violet-50",
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
    monthlyPrice: "₹249",
    yearlyPrice: "₹1,999",
    period: "/month",
    periodYearly: "/year",
    yearlyNote: "save 33%",
    description: "For serious learners who want the full experience.",
    cta: "Start Pro - Free 7-day trial",
    ctaStyle:
      "bg-orange-500 hover:bg-orange-400 text-white shadow-xl shadow-orange-500/25",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Free",
      "All modules - all subjects",
      "Unlimited AI tutor",
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
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    period: "per school / college",
    description: "For schools, coaching institutes, and universities.",
    cta: "Contact Us",
    ctaStyle:
      "border-2 border-gray-300 hover:border-teal-400 text-gray-700 hover:text-teal-700 hover:bg-teal-50",
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
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Simple pricing
          </span>
          <h2 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Start free, upgrade{" "}
            <span className="gradient-text">when you&apos;re ready</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            The free tier is genuinely useful. Upgrade only when you want the
            full power - no dark patterns, no credit card required.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billing === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Yearly
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs font-semibold">
                Save 33%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => {
            const isCustom = plan.monthlyPrice === "Custom";
            const displayPrice =
              isCustom
                ? "Custom"
                : billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;
            const displayPeriod =
              isCustom
                ? plan.period
                : billing === "yearly" && plan.periodYearly
                ? plan.periodYearly
                : plan.period;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  plan.highlight
                    ? "bg-violet-50/50 border-2 border-violet-300 shadow-xl shadow-violet-100"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                    <Zap size={11} />
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                    {plan.name}
                  </div>

                  <div className="flex items-end gap-1.5 mb-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={displayPrice}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="font-sora text-4xl font-extrabold text-gray-900"
                      >
                        {displayPrice}
                      </motion.span>
                    </AnimatePresence>
                    {!isCustom && (
                      <span className="text-gray-500 text-sm pb-1">
                        {displayPeriod}
                      </span>
                    )}
                    {isCustom && (
                      <span className="text-gray-500 text-sm pb-1">
                        {displayPeriod}
                      </span>
                    )}
                  </div>

                  {billing === "yearly" && plan.yearlyNote && !isCustom && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-emerald-600 font-medium mb-2"
                    >
                      {plan.yearlyNote}
                    </motion.div>
                  )}

                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <a
                  href="#"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 mb-7 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </a>

                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    What&apos;s included
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((f, j) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + j * 0.055, duration: 0.35 }}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <Check
                          size={15}
                          className={`shrink-0 mt-0.5 ${
                            plan.highlight ? "text-violet-500" : "text-emerald-500"
                          }`}
                        />
                        {f}
                      </motion.li>
                    ))}
                    {plan.notIncluded.map((f, j) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.12 + (plan.features.length + j) * 0.055,
                          duration: 0.35,
                        }}
                        className="flex items-start gap-2.5 text-sm text-gray-400"
                      >
                        <span className="shrink-0 mt-0.5 w-3.75 text-center leading-none">
                          -
                        </span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          All plans include SSL security, GDPR compliance, and 99.9% uptime SLA.
          No hidden fees. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
