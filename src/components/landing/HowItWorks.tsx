"use client";

import { motion } from "framer-motion";
import { Compass, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Choose your track",
    description:
      "Pick School (Grade 9–12) or Engineering. Each track is carefully scoped to your level — nothing too easy, nothing overwhelming.",
    color: "from-teal-500 to-cyan-500",
    glow: "rgba(20,184,166,0.3)",
    accent: "border-teal-500/30 bg-teal-950/40",
    iconBg: "bg-teal-500/20 text-teal-300",
  },
  {
    number: "02",
    icon: Zap,
    title: "Learn through live simulations",
    description:
      "Every concept has an interactive visualization. Drag nodes in a neural network. Watch packets travel through a router. See sorting happen step by step.",
    color: "from-violet-500 to-purple-500",
    glow: "rgba(124,58,237,0.3)",
    accent: "border-violet-500/30 bg-violet-950/40",
    iconBg: "bg-violet-500/20 text-violet-300",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Get guided, earn XP, level up",
    description:
      "Your AI tutor knows exactly which module you're on. Ask questions, get hints, take quizzes. Watch your XP grow and unlock the next chapter.",
    color: "from-orange-500 to-amber-500",
    glow: "rgba(249,115,22,0.3)",
    accent: "border-orange-500/30 bg-orange-950/40",
    iconBg: "bg-orange-500/20 text-orange-300",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative py-24 lg:py-32 bg-navy-800/30"
      aria-labelledby="how-heading"
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
            Simple. Powerful. Fun.
          </div>
          <h2
            id="how-heading"
            className="font-sora text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            How PandaLearn works
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Three steps from "I know nothing" to "I can build it."
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-linear-to-r from-teal-500/40 via-violet-500/40 to-orange-500/40"
            aria-hidden
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl border p-7 ${step.accent} card-hover`}
            >
              {/* Step number */}
              <div
                className={`w-12 h-12 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white font-extrabold font-sora text-lg mb-5 shadow-lg`}
                style={{ boxShadow: `0 8px 24px ${step.glow}` }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className={`inline-flex p-2.5 rounded-xl ${step.iconBg} mb-4`}>
                <step.icon size={20} />
              </div>

              <h3 className="font-sora text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
