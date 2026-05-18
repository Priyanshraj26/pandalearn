"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, School, GraduationCap } from "lucide-react";

const TRACKS = [
  {
    id: "school",
    badge: "Grade 9 – 12",
    Icon: School,
    iconBg: "bg-teal-500",
    title: "School Track",
    subtitle: "Build a rock-solid CS foundation before you hit college.",
    border: "border-gray-200 hover:border-teal-300",
    glow: "rgba(20,184,166,0.06)",
    tagCls: "bg-teal-50 text-teal-700 border-teal-200",
    btnCls: "bg-teal-500 hover:bg-teal-400",
    subjects: ["Mathematics & Logic","Computer Science","Python Programming","Data Structures Intro","How the Internet Works","What is AI / ML"],
    features: ["Beginner-friendly pacing","Visual-first explanations","Adaptive quizzes"],
  },
  {
    id: "engineering",
    badge: "Most Popular",
    Icon: GraduationCap,
    iconBg: "bg-violet-600",
    title: "Engineering Track",
    subtitle: "Go deep on CS fundamentals and crack any technical interview.",
    border: "border-violet-200 hover:border-violet-400",
    glow: "rgba(124,58,237,0.06)",
    tagCls: "bg-violet-50 text-violet-700 border-violet-200",
    btnCls: "bg-violet-600 hover:bg-violet-500",
    subjects: ["Data Structures & Algorithms","Machine Learning","Computer Networks","Operating Systems","DBMS","System Design","Interview Prep"],
    features: ["Industry-level depth","Mock interview simulator","Certificate on completion"],
    featured: true,
  },
];

const up = (i = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.6, delay: i * 0.12, ease: [0.22,1,0.36,1] as const },
});

export default function TracksSection() {
  return (
    <section id="tracks" className="relative py-24 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div {...up()} className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Two tracks, one platform
          </span>
          <h2 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Pick your path.</h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Whether you&apos;re in Grade 9 or final-year engineering, we have a
            track scoped exactly to your level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {TRACKS.map((t, i) => (
            <motion.div key={t.id} {...up(i * 0.1)} className="h-full">
              <div
                className={`relative h-full rounded-2xl border bg-white ${t.border} transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-lg`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 40% at 50% 0%,${t.glow},transparent)` }}
                />
                {t.featured && (
                  <div className="absolute top-4 right-4 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                    Most Popular
                  </div>
                )}
                <div className="relative p-7 flex flex-col h-full">
                  <div className="flex items-center gap-3.5 mb-5">
                    <motion.div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${t.iconBg}`}
                      initial={{ scale: 0, rotate: -20 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", bounce: 0.4, delay: i * 0.1 + 0.2 }}
                    >
                      <t.Icon size={20} className="text-white" />
                    </motion.div>
                    <div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${t.tagCls}`}>
                        {t.badge}
                      </span>
                      <h3 className="font-sora text-xl font-bold text-gray-900 mt-0.5">{t.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{t.subtitle}</p>

                  <div className="mb-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
                      Subjects covered
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.subjects.map((s, j) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + j * 0.07, duration: 0.3 }}
                          className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {t.features.map((f, j) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.08 + 0.4 }}
                        className="flex items-center gap-2.5 text-sm text-gray-700"
                      >
                        <Check size={13} className="text-emerald-500 shrink-0" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 w-full justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md hover:-translate-y-px ${t.btnCls}`}
                  >
                    Explore {t.title} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
