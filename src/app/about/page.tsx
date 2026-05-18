"use client";

import { motion } from "framer-motion";
import { PawPrint, ArrowRight, Target, Eye, Zap } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";


const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const VALUES = [
  {
    Icon: Eye,
    title: "Visual over textual",
    desc: "Every concept that can be shown should be shown. A 30-second interaction beats a 5-minute explanation every time.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    Icon: Target,
    title: "Precisely scoped",
    desc: "School students and engineering grads need different things. We don't water down the engineering track or overwhelm school students.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    Icon: Zap,
    title: "Gamified but serious",
    desc: "XP, streaks, and levels are not gimmicks — they're feedback loops that keep you consistent. The content backs up the play.",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white">

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 lg:px-8 text-center pb-20">
          <motion.div {...up(0)}>
            <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <PawPrint size={28} className="text-white" />
            </div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              Our story
            </span>
            <h1 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We built the platform we<br />
              <span className="gradient-text">wish existed when we were students.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
              PandaLearn started from a simple frustration: CS is a visual, interactive subject being taught through static PDFs and lecture recordings. We set out to fix that.
            </p>
          </motion.div>
        </section>

        {/* Story */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div {...up(0)}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                  How it started
                </span>
                <h2 className="font-sora text-3xl font-bold text-gray-900 mb-5">
                  From a visualizer to a full platform
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-4">
                  The team behind PandaLearn has been building interactive CS visualizations since 2023 under Vizuara. We watched thousands of students go from confused to confident the moment they could interact with an algorithm instead of just reading about it.
                </p>
                <p className="text-gray-500 text-base leading-relaxed">
                  PandaLearn is the platform that wraps those visualizations with structure: tracks scoped to your level, an AI tutor that knows exactly where you are, and gamification that makes consistency feel natural.
                </p>
              </motion.div>
              <motion.div {...up(0.12)} className="space-y-4">
                {[
                  { year: "2023", event: "First interactive visualizer launched for sorting algorithms" },
                  { year: "2024", event: "Expanded to neural networks, graph algorithms, and computer networks" },
                  { year: "2025", event: "PandaLearn beta launches with AI tutor and gamified XP system" },
                  { year: "2026", event: "10,000+ students across India. School + Engineering tracks fully live." },
                ].map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="font-sora text-sm font-bold text-violet-600 w-12 shrink-0 mt-0.5">{item.year}</span>
                    <div className="flex-1 border-l border-gray-200 pl-4">
                      <p className="text-sm text-gray-700">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                What we believe
              </span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">Our values</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  {...up(i * 0.1)}
                  className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                    <v.Icon size={18} />
                  </div>
                  <h3 className="font-sora font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
            <motion.div {...up()}>
              <h2 className="font-sora text-3xl font-bold text-gray-900 mb-4">Ready to learn the right way?</h2>
              <p className="text-gray-500 mb-8">Join 10,000+ students building real CS knowledge.</p>
              <a
                href="/#tracks"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl shadow-md hover:-translate-y-px transition-all"
              >
                Start Learning Free <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
