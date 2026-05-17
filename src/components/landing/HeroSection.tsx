"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";

function PlatformMockup() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white text-slate-800 select-none">
      {/* Gamification bar */}
      <div className="bg-white border-b border-slate-100 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-sm fire-flicker">🔥</span>
            <span className="text-xs font-bold text-slate-700">7</span>
            <span className="text-xs text-slate-400 ml-0.5">Day Streak</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">⭐</span>
            <span className="text-xs font-bold text-slate-700">4,230</span>
            <span className="text-xs text-slate-400">XP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">💎</span>
            <span className="text-xs font-bold text-slate-700">420</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
            V
          </div>
          <span className="text-xs font-medium text-slate-600">Vikash</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-slate-50 px-3 py-1.5 flex items-center gap-3 border-b border-slate-100">
        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Lesson 2.1: What is AI?</span>
        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "20%" }} />
        </div>
        <span className="text-xs text-slate-400 whitespace-nowrap">2 / 10 lessons</span>
      </div>

      {/* Main layout */}
      <div className="flex" style={{ minHeight: "280px" }}>
        {/* Sidebar */}
        <div className="w-44 bg-white border-r border-slate-100 p-2.5 flex flex-col gap-1 shrink-0">
          {/* Course info */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-sm shrink-0">🐍</div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">Python for AI</div>
              <div className="text-xs text-slate-500">Beginners</div>
            </div>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full mb-2">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "60%" }} />
          </div>

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Course</div>

          {/* Lessons */}
          <div className="space-y-0.5 text-xs">
            <div className="text-slate-500 font-medium py-0.5">1. Getting Started</div>
            {["1.1 Welcome to Python","1.2 First Program","1.3 Variables","1.4 Mini Quiz"].map((l) => (
              <div key={l} className="flex items-center gap-1 py-0.5 pl-1">
                <span className="text-emerald-500 shrink-0">✓</span>
                <span className="text-slate-400 truncate">{l}</span>
              </div>
            ))}

            <div className="text-slate-600 font-semibold pt-1 pb-0.5">2. Control Flow</div>
            <div className="flex items-center gap-1 py-0.5 px-1.5 bg-violet-50 rounded border-l-2 border-violet-500">
              <span className="text-violet-500 shrink-0 font-bold">›</span>
              <span className="text-violet-700 font-medium truncate">2.1 What is AI?</span>
            </div>
            {["2.2 AI Types","2.3 ML Basics"].map((l) => (
              <div key={l} className="flex items-center gap-1 py-0.5 pl-2">
                <span className="text-slate-300 text-xs shrink-0">🔒</span>
                <span className="text-slate-400 truncate">{l}</span>
              </div>
            ))}
          </div>

          {/* XP bar */}
          <div className="mt-auto pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-500 text-xs">⭐</span>
              <span className="text-xs text-slate-500">XP Progress</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: "62%" }} />
            </div>
            <div className="text-xs text-slate-400 mt-0.5">4,230 / 5,000 XP · Lv. 12</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 min-w-0">
          <div className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
            Lesson 1
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1 font-sora">What is Intelligence?</h2>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            Before we talk about <em>Artificial Intelligence</em>, let's understand what <span className="text-violet-600 font-medium">intelligence</span> itself means.
          </p>

          {/* Comparison cards */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg p-2">
              <div className="text-xl mb-1">🌡️</div>
              <div className="text-xs font-semibold text-slate-700">A thermometer</div>
              <div className="text-xs text-slate-500 mt-0.5">It shows temperature. That's all.</div>
            </div>
            <div className="flex items-center text-slate-400 text-xs font-bold">VS</div>
            <div className="flex-1 bg-orange-50 border border-orange-100 rounded-lg p-2">
              <div className="text-xl mb-1">🧑</div>
              <div className="text-xs font-semibold text-slate-700">You</div>
              <div className="text-xs text-slate-500 mt-0.5">You understand & decide.</div>
            </div>
          </div>

          {/* Mascot callout */}
          <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-lg p-2.5">
            <span className="text-2xl leading-none shrink-0">🐼</span>
            <p className="text-xs text-violet-700 leading-relaxed">
              Intelligence helps make smart decisions based on more than just raw data!
            </p>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between bg-white">
        <button className="text-xs text-slate-400 hover:text-slate-600">← Previous</button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Lesson Progress</span>
          <div className="w-16 h-1.5 bg-slate-200 rounded-full">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "20%" }} />
          </div>
          <span className="text-xs text-slate-400">20%</span>
        </div>
        <button className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-sm">
          Next Lesson →
        </button>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden dot-grid"
      aria-label="Hero"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Launch badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-violet-950/70 border border-violet-700/50 text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-violet-400" />
              Launching Interactive CS Education
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sora text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6"
            >
              CS & ML that{" "}
              <span className="gradient-text italic">you can touch</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              Interactive visualizations, an AI tutor that knows where you are,
              and gamified progress. Built for{" "}
              <span className="text-white font-medium">school students</span>{" "}
              and{" "}
              <span className="text-white font-medium">
                engineering grads
              </span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Learning Free
                <ArrowRight size={18} />
              </a>
              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-slate-600 hover:border-violet-500 text-slate-300 hover:text-white font-semibold rounded-xl text-base hover:bg-violet-950/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Play size={16} className="text-violet-400" />
                Explore Courses
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 text-sm text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Free forever tier
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Cancel anytime
              </span>
            </motion.div>
          </div>

          {/* Right — Platform mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative animate-float"
          >
            {/* Glow behind mockup */}
            <div
              className="absolute -inset-4 bg-violet-600/20 rounded-3xl blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <PlatformMockup />
            </div>

            {/* Floating badge — XP reward */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl border border-emerald-500/30"
            >
              <span className="text-xl">⭐</span>
              <div>
                <div className="text-xs font-bold text-emerald-400">+10 XP</div>
                <div className="text-xs text-slate-400">Lesson Complete!</div>
              </div>
            </motion.div>

            {/* Floating badge — AI tutor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
              className="absolute -top-3 -right-3 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl border border-violet-500/30"
            >
              <span className="text-xl">🐼</span>
              <div>
                <div className="text-xs font-bold text-violet-300">AI Tutor</div>
                <div className="text-xs text-slate-400">Always here</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
