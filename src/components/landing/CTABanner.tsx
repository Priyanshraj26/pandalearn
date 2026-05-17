"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-950/80 via-navy-800/90 to-navy-900/90" />
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mascot */}
          <div className="text-6xl mb-6 animate-bounce-soft inline-block">🐼</div>

          <div className="inline-flex items-center gap-2 bg-violet-950/70 border border-violet-700/50 text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Sparkles size={13} className="text-violet-400" />
            Join 10,000+ learners worldwide
          </div>

          <h2
            id="cta-heading"
            className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Ready to learn CS{" "}
            <span className="gradient-text">the right way?</span>
          </h2>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop watching. Start doing. Your first 3 modules are completely
            free — no credit card, no catch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl shadow-2xl shadow-orange-500/35 hover:shadow-orange-500/55 hover:-translate-y-1 transition-all duration-200"
            >
              Start Learning Free
              <ArrowRight size={20} />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-violet-500/50 hover:border-violet-400 text-violet-300 hover:text-white font-bold text-lg rounded-xl hover:bg-violet-950/50 hover:-translate-y-1 transition-all duration-200"
            >
              See Pricing Plans
            </a>
          </div>

          <p className="text-slate-600 text-sm mt-6">
            No credit card required · Free forever plan · Cancel Pro anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
