"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, BookOpen, Layers, Bot, Users } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, delay, ease: [0.22,1,0.36,1] as const },
});

const STATS = [
  { Icon: BookOpen, value: "50+",  label: "Interactive Modules" },
  { Icon: Layers,   value: "2",    label: "Learning Tracks"     },
  { Icon: Bot,      value: "AI",   label: "Powered Tutor"       },
  { Icon: Users,    value: "10K+", label: "Students Learning"   },
];

export default function HeroSection() {
  return (
    <section className="relative bg-white">

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(203,213,225,0.45) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
      }} />

      {/* Centered headline block */}
      <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-12 text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 text-sm font-medium px-4 py-2 rounded-full mb-8 select-none cursor-default">
          <Sparkles size={13} className="text-violet-500" />
          Early access is open
          <span className="w-px h-3.5 bg-violet-200" />
          10,000+ students
          <ChevronRight size={13} className="text-violet-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.07)}
          className="font-sora font-extrabold text-gray-900 tracking-tight mb-5"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1 }}
        >
          Learn CS & ML the way<br />
          it{" "}
          <span className="text-violet-600">should&apos;ve always been.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p {...fadeUp(0.13)} className="text-lg text-gray-500 leading-relaxed mb-9 max-w-xl mx-auto">
          Not videos. Not slides. Live interactive visualizations, an AI tutor,
          and gamified XP — for school students and engineering grads.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.19)} className="flex flex-wrap items-center justify-center gap-3 mb-9">
          <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold bg-orange-500 hover:bg-orange-400 rounded-xl shadow-md hover:-translate-y-px active:translate-y-0 transition-all text-[0.95rem]">
            Start Free — no card needed
            <ArrowRight size={16} />
          </a>
          <a href="#tracks" className="inline-flex items-center gap-2 px-7 py-3.5 text-gray-600 font-semibold border-2 border-gray-200 hover:border-violet-300 hover:text-violet-700 rounded-xl transition-all text-[0.95rem]">
            Explore Courses
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div {...fadeUp(0.25)} className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {["#7c3aed","#f97316","#0d9488","#f43f5e","#2563eb"].map((bg, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{background:bg}}>
                {["P","A","R","S","K"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="text-amber-400">★★★★★</span>{" "}
            <strong className="text-gray-700 font-semibold">10,000+</strong> students already learning
          </p>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                  <s.Icon size={16} className="text-violet-600" />
                </div>
                <div>
                  <div className="font-sora text-lg font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
