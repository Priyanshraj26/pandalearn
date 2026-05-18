"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Check, School, BookOpen, Code, Brain,
  Globe, Cpu, Sigma, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const SUBJECTS = [
  {
    Icon: Sigma, color: "bg-blue-500", lightBg: "bg-blue-50", textCls: "text-blue-600",
    name: "Mathematics & Logic", modules: 6,
    desc: "Build the mathematical intuition every CS concept depends on.",
    topics: ["Number Systems & Binary", "Boolean Logic & Truth Tables", "Set Theory", "Algebraic Thinking", "Probability Basics", "Mathematical Induction"],
  },
  {
    Icon: Cpu, color: "bg-slate-600", lightBg: "bg-slate-50", textCls: "text-slate-600",
    name: "Computer Science Basics", modules: 7,
    desc: "Understand how computers actually work, from transistors to programs.",
    topics: ["How Computers Work", "Binary & Hex Encoding", "Memory & Storage", "Operating System Basics", "File Systems", "How Programs Execute"],
  },
  {
    Icon: Code, color: "bg-teal-500", lightBg: "bg-teal-50", textCls: "text-teal-600",
    name: "Python Programming", modules: 9,
    desc: "Go from zero to writing real programs — the most beginner-friendly path.",
    topics: ["Variables & Data Types", "Control Flow", "Functions & Scope", "Lists, Tuples, Dicts", "Object-Oriented Python", "File I/O", "Error Handling", "Mini Project: CLI App"],
  },
  {
    Icon: BookOpen, color: "bg-orange-500", lightBg: "bg-orange-50", textCls: "text-orange-600",
    name: "Data Structures Intro", modules: 5,
    desc: "Your first encounter with the structures that power every real program.",
    topics: ["Arrays & Indexing", "Linked Lists", "Stacks & Queues", "Trees: Concepts", "Basic Sorting (Bubble, Selection)"],
  },
  {
    Icon: Globe, color: "bg-violet-600", lightBg: "bg-violet-50", textCls: "text-violet-600",
    name: "How the Internet Works", modules: 6,
    desc: "From typing a URL to seeing the page — every step, visualized.",
    topics: ["Internet vs Web", "DNS & HTTP", "Browsers & Rendering", "Client-Server Architecture", "APIs & JSON", "Cybersecurity Basics"],
  },
  {
    Icon: Brain, color: "bg-rose-500", lightBg: "bg-rose-50", textCls: "text-rose-600",
    name: "What is AI / ML", modules: 5,
    desc: "Understand what AI actually is — no hype, no buzzwords, just concepts.",
    topics: ["What is Artificial Intelligence", "How Machines Learn", "Decision Trees", "Neural Networks (intro)", "Real-world AI Applications"],
  },
];

const FOR_WHOM = [
  { label: "Complete beginners", desc: "Never written a line of code? Start here. Every concept introduced from scratch with zero assumptions." },
  { label: "Class 9 – 12 students", desc: "Aligned to the school CS curriculum, but deeper. Build a foundation that makes college CS feel easy." },
  { label: "JEE / competitive prep", desc: "Mathematical thinking modules directly strengthen analytical skills tested in competitive exams." },
];

const FEATURES = [
  { title: "Beginner-friendly pacing",   desc: "No concept is assumed. Every new term is defined when you first meet it." },
  { title: "Visual-first explanations",  desc: "Sorting algorithms animate step by step. Boolean logic uses interactive truth tables." },
  { title: "Adaptive quizzes",           desc: "Score below 70%? The AI tutor recommends which module to revisit." },
  { title: "AI tutor in context",        desc: "Ask questions about the exact module you're on. No generic chatbot." },
  { title: "Day streak & XP",           desc: "Every module earns XP. Every day you come back, your streak grows." },
  { title: "Mobile + PWA",              desc: "Learn on your phone during commute. Works offline once cached." },
];

export default function SchoolTrack() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="relative pt-36 pb-24 bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(203,213,225,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          }} />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <School size={14} />
                Grade 9 – 12 · School Track
              </div>
              <h1
                className="font-sora font-extrabold text-gray-900 tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
              >
                Build the CS foundation<br />
                <span className="text-teal-500">that changes everything.</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-9 max-w-xl mx-auto">
                Before you hit college, build the mental models that make every CS concept easy. Six subjects, 38 modules, fully interactive — from zero to confident.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl shadow-md hover:-translate-y-px transition-all">
                  Start Free — Grade 9–12 <ArrowRight size={16} />
                </a>
                <a href="#curriculum" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-200 hover:border-teal-300 hover:text-teal-700 text-gray-600 font-semibold rounded-xl transition-all">
                  View Curriculum <ChevronRight size={16} />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
                {["6 subjects", "38+ modules", "~120 hours of content", "AI tutor included"].map(s => (
                  <span key={s} className="flex items-center gap-1.5">
                    <Check size={13} className="text-teal-500" />{s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <h2 className="font-sora text-3xl font-bold text-gray-900">Who is this track for?</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {FOR_WHOM.map((f, i) => (
                <motion.div key={f.label} {...up(i * 0.1)} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                    <Check size={16} className="text-teal-600" />
                  </div>
                  <h3 className="font-sora font-bold text-gray-900 mb-2">{f.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Full curriculum</span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">6 subjects. 38 modules. All interactive.</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SUBJECTS.map((s, i) => (
                <motion.div
                  key={s.name}
                  {...up(i * 0.07)}
                  className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                    <s.Icon size={18} className="text-white" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sora font-bold text-gray-900 text-base leading-tight">{s.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ml-2 shrink-0 ${s.lightBg} ${s.textCls} border-current border-opacity-20`}>
                      {s.modules} modules
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.topics.slice(0, 4).map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">{t}</span>
                    ))}
                    {s.topics.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-400">+{s.topics.length - 4} more</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Why it works</span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">Built for students who are new to CS</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} {...up(i * 0.07)} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-teal-500">
          <motion.div {...up()} className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Your CS journey starts here.
            </h2>
            <p className="text-teal-100 text-lg mb-8">First 3 modules completely free. No credit card required.</p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-teal-700 font-bold text-lg rounded-xl shadow-xl hover:-translate-y-1 transition-all"
            >
              Start School Track Free <ArrowRight size={20} />
            </a>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
