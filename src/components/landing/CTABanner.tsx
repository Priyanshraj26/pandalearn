"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PawPrint, Users, BookOpen, Star, Check } from "lucide-react";

const FLOATS = [
  { Icon: Users,    val: "10K+", label: "Students",   cls: "top-10 left-8 lg:left-16",       delay: 0,   dur: "animate-float"      },
  { Icon: BookOpen, val: "50+",  label: "Modules",    cls: "top-16 right-8 lg:right-16",     delay: 1.5, dur: "animate-float-slow" },
  { Icon: Star,     val: "4.9",  label: "Avg rating", cls: "bottom-10 left-16 lg:left-24",   delay: 0.7, dur: "animate-float-slow" },
  { Icon: Sparkles, val: "Free", label: "To start",   cls: "bottom-16 right-16 lg:right-24", delay: 2.1, dur: "animate-float"      },
];

export default function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden bg-gray-900">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Floating stat chips */}
        {FLOATS.map((f, i) => (
          <motion.div
            key={f.val}
            className={`hidden lg:flex absolute ${f.cls} ${f.dur} items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3.5 py-2.5 z-10`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            style={{ animationDelay: `${f.delay}s` }}
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
              <f.Icon size={15} className="text-violet-300" />
            </div>
            <div>
              <div className="font-sora text-sm font-bold text-white leading-none">{f.val}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{f.label}</div>
            </div>
          </motion.div>
        ))}

        {/* Centered content */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-600 mb-6 shadow-lg shadow-violet-900/50"
              animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PawPrint size={28} className="text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={13} className="text-violet-400" />
              Join 10,000+ learners worldwide
            </motion.div>

            <h2 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {["Ready", "to", "learn", "CS"].map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="text-violet-400 inline-block"
              >
                the right way?
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Stop watching. Start doing. Your first 3 modules are completely
              free - no credit card, no catch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl shadow-xl shadow-orange-500/25 hover:-translate-y-1 transition-all duration-200"
              >
                Start Learning Free <ArrowRight size={20} />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold text-lg rounded-xl hover:bg-white/5 hover:-translate-y-1 transition-all duration-200"
              >
                See Pricing Plans
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-8"
            >
              {["No credit card required", "Free forever plan", "Cancel Pro anytime"].map(s => (
                <span key={s} className="flex items-center gap-1.5">
                  <Check size={12} className="text-violet-500" />
                  {s}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
