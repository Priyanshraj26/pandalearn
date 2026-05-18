"use client";

import { motion } from "framer-motion";
import { Compass, Zap, TrendingUp } from "lucide-react";

const STEPS = [
  {
    n: "01", Icon: Compass,
    title: "Choose your track",
    body: "Pick School (Grade 9–12) or Engineering. Each track is carefully scoped to your level — nothing overwhelming, nothing too easy.",
    numCls: "bg-teal-500",
    glow: "rgba(20,184,166,0.07)",
    border: "hover:border-teal-200",
    iconBg: "bg-teal-50",
    iconCls: "text-teal-600",
  },
  {
    n: "02", Icon: Zap,
    title: "Learn through live simulations",
    body: "Every concept has an interactive visualization. Drag nodes in a neural net. Watch packets travel through routers. See sorting happen step by step.",
    numCls: "bg-violet-600",
    glow: "rgba(124,58,237,0.07)",
    border: "hover:border-violet-200",
    iconBg: "bg-violet-50",
    iconCls: "text-violet-600",
  },
  {
    n: "03", Icon: TrendingUp,
    title: "Get guided, earn XP, level up",
    body: "Your AI tutor knows exactly which module you're on. Ask questions, get hints, take quizzes — and watch your XP grow with every lesson.",
    numCls: "bg-orange-500",
    glow: "rgba(249,115,22,0.07)",
    border: "hover:border-orange-200",
    iconBg: "bg-orange-50",
    iconCls: "text-orange-600",
  },
];

const up = (i = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.6, delay: i * 0.13, ease: [0.22,1,0.36,1] as const },
});

export default function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div {...up()} className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Simple. Powerful. Fun.
          </span>
          <h2 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How PandaLearn works</h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Three steps from &ldquo;I know nothing&rdquo; to &ldquo;I can build it.&rdquo;
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 relative">
          {/* Line draws itself left-to-right */}
          <motion.div
            className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px bg-gray-200 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22,1,0.36,1] as const }}
          />

          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...up(i * 0.12)}>
              <div
                className={`relative rounded-2xl border border-gray-200 ${s.border} bg-white hover:shadow-lg p-7 transition-all duration-300 h-full group`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%,${s.glow},transparent)` }}
                />
                <div className="relative">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-sora font-extrabold text-white text-lg mb-5 shadow-md ${s.numCls}`}
                    initial={{ scale: 0, rotate: -15 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.45, delay: i * 0.13 + 0.25 }}
                  >
                    {s.n}
                  </motion.div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${s.iconBg}`}>
                    <s.Icon size={18} className={s.iconCls} />
                  </div>
                  <h3 className="font-sora text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
