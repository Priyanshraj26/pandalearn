"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Code2, Lock } from "lucide-react";

const schoolSubjects = [
  { emoji: "📐", label: "Mathematics", desc: "Algebra, Calculus, Statistics, Vectors" },
  { emoji: "💻", label: "Computer Science", desc: "Programming, DSA intro, OOP, SQL" },
  { emoji: "🧑‍💻", label: "Python Programming", desc: "Syntax, loops, functions, projects" },
  { emoji: "🌐", label: "How the Internet Works", desc: "DNS, HTTP, packets, TCP/IP" },
  { emoji: "🤖", label: "What is AI?", desc: "Intro to ML, decision trees, ethics" },
  { emoji: "🔢", label: "Discrete Mathematics", desc: "Logic gates, Boolean algebra, sets" },
];

const engSubjects = [
  { emoji: "🌳", label: "Data Structures & Algorithms", desc: "Trees, graphs, DP, sorting" },
  { emoji: "🧠", label: "Machine Learning", desc: "Neural nets, CNNs, Transformers, RL" },
  { emoji: "🌍", label: "Computer Networks", desc: "OSI, TCP/IP, routing, TLS" },
  { emoji: "⚙️", label: "Operating Systems", desc: "Scheduling, memory, deadlock, FS" },
  { emoji: "🗄️", label: "DBMS", desc: "SQL, normalization, ACID, indexing" },
  { emoji: "🏗️", label: "System Design", desc: "Load balancing, caching, microservices" },
  { emoji: "🎯", label: "Interview Preparation", desc: "FAANG, system design, behavioral" },
];

function SubjectTag({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-navy-700/60 border border-navy-600/60 rounded-lg px-2.5 py-1.5 text-sm text-slate-300 hover:border-violet-500/50 hover:text-white transition-all group">
      <span>{emoji}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

export default function TracksSection() {
  return (
    <section
      id="tracks"
      className="relative py-24 lg:py-32"
      aria-labelledby="tracks-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-navy-700/70 border border-navy-600/60 text-slate-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Two tracks, one platform
          </div>
          <h2
            id="tracks-heading"
            className="font-sora text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Choose your path
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Whether you're in school discovering CS for the first time or an
            engineering student preparing for your dream job — we have a track
            built for you.
          </p>
        </motion.div>

        {/* Track cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* School Track */}
          <motion.article
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-teal-500/20 bg-linear-to-br from-teal-950/40 to-navy-800/80 p-7 overflow-hidden card-hover"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-2xl shrink-0">
                  🏫
                </div>
                <div>
                  <div className="inline-block bg-teal-500/20 text-teal-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-1.5">
                    Grade 9 – 12
                  </div>
                  <h3 className="font-sora text-2xl font-bold text-white">
                    School Track
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    CS fundamentals, interactive maths, and real programming
                    — designed for curious young minds.
                  </p>
                </div>
              </div>

              {/* Subject grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                {schoolSubjects.map((s) => (
                  <SubjectTag key={s.label} emoji={s.emoji} label={s.label} />
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-7 text-sm text-slate-400">
                {[
                  "Aligned with CBSE & international curricula",
                  "Age-appropriate visual explanations",
                  "Python IDE built right into lessons",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-teal-400 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 hover:border-teal-400/60 text-teal-300 hover:text-teal-200 font-semibold rounded-xl transition-all text-sm"
              >
                Explore School Track
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.article>

          {/* Engineering Track */}
          <motion.article
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-violet-500/30 bg-linear-to-br from-violet-950/50 to-navy-800/80 p-7 overflow-hidden card-hover"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
            {/* Popular badge */}
            <div className="absolute top-5 right-5 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-2.5 py-1 rounded-full">
              Most Popular
            </div>

            <div className="relative">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-2xl shrink-0">
                  ⚙️
                </div>
                <div>
                  <div className="inline-block bg-violet-600/20 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-1.5">
                    B.Tech / B.E. — CS / IT
                  </div>
                  <h3 className="font-sora text-2xl font-bold text-white">
                    Engineering Track
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Deep-dive CS, interview preparation, and system design —
                    built for engineers who want to get hired.
                  </p>
                </div>
              </div>

              {/* Subject grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                {engSubjects.map((s) => (
                  <SubjectTag key={s.label} emoji={s.emoji} label={s.label} />
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-7 text-sm text-slate-400">
                {[
                  "FAANG + Indian MNC interview prep included",
                  "Mock system design interviews with AI feedback",
                  "LeetCode-style problems with visual hints",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-violet-400 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-3 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 hover:border-violet-400/60 text-violet-300 hover:text-violet-200 font-semibold rounded-xl transition-all text-sm"
              >
                Explore Engineering Track
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
