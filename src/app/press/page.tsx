"use client";

import { motion } from "framer-motion";
import { Download, Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const STATS = [
  { value: "10,000+", label: "Active students" },
  { value: "50+",     label: "Interactive modules" },
  { value: "2",       label: "Learning tracks" },
  { value: "4.9 / 5", label: "Average rating" },
];

const BRAND_COLORS = [
  { name: "Violet",      hex: "#7C3AED", cls: "bg-violet-600" },
  { name: "Orange",      hex: "#F97316", cls: "bg-orange-500" },
  { name: "Teal",        hex: "#0D9488", cls: "bg-teal-600"   },
  { name: "Gray 900",    hex: "#111827", cls: "bg-gray-900"   },
  { name: "White",       hex: "#FFFFFF", cls: "bg-white border border-gray-200" },
];

export default function PressKit() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-1.5">
            <a href="/" className="hover:text-violet-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/about" className="hover:text-violet-600 transition-colors">Company</a>
            <span>/</span>
            <span className="text-gray-600">Press Kit</span>
          </nav>

          <motion.div {...up()}>
            <h1 className="font-sora text-4xl font-bold text-gray-900 mb-3">Press Kit</h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl">
              Everything you need to write about PandaLearn. For interviews or additional assets, contact us directly.
            </p>
          </motion.div>

          {/* About blurb */}
          <motion.section {...up(0.05)} className="mb-12">
            <h2 className="font-sora text-xl font-bold text-gray-900 mb-4">About PandaLearn</h2>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>One-liner:</strong> PandaLearn is an interactive CS and Machine Learning learning platform for school students (Grade 9–12) and engineering graduates, powered by live visualizations and an AI tutor.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>Short description:</strong> PandaLearn replaces passive video lectures with hands-on interactive simulations - drag nodes in a neural network, watch sorting algorithms step by step, simulate packet routing in real time. Backed by an AI tutor (powered by Google Gemini) and a gamified XP system, the platform serves two tracks: School (Grade 9–12) and Engineering (DSA, ML, Networks, System Design, Interview Prep).
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Founded:</strong> 2025 · <strong>Headquarters:</strong> India · <strong>Website:</strong> pandalearn.in
              </p>
            </div>
          </motion.section>

          {/* Stats */}
          <motion.section {...up(0.08)} className="mb-12">
            <h2 className="font-sora text-xl font-bold text-gray-900 mb-4">Key Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map(s => (
                <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 text-center">
                  <div className="font-sora text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Brand colors */}
          <motion.section {...up(0.1)} className="mb-12">
            <h2 className="font-sora text-xl font-bold text-gray-900 mb-4">Brand Colors</h2>
            <div className="flex flex-wrap gap-4">
              {BRAND_COLORS.map(c => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl shadow-sm ${c.cls}`} />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-400 font-mono">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Typography */}
          <motion.section {...up(0.12)} className="mb-12">
            <h2 className="font-sora text-xl font-bold text-gray-900 mb-4">Typography</h2>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-4">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Display / Headings</span>
                <p className="font-sora text-2xl font-bold text-gray-900">Sora - Google Fonts</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Body / UI</span>
                <p className="text-lg text-gray-700">DM Sans - Google Fonts</p>
              </div>
            </div>
          </motion.section>

          {/* Logo download placeholder */}
          <motion.section {...up(0.14)} className="mb-12">
            <h2 className="font-sora text-xl font-bold text-gray-900 mb-4">Logo Assets</h2>
            <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
              <Download size={28} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-1">Logo assets (SVG, PNG, dark + light variants)</p>
              <p className="text-gray-400 text-xs mb-4">Available upon request from press team</p>
              <a
                href="mailto:hello@pandalearn.in?subject=Press Kit - Logo Assets"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
              >
                <Mail size={14} />
                Request assets
              </a>
            </div>
          </motion.section>

          {/* Press contact */}
          <motion.section {...up(0.16)}>
            <h2 className="font-sora text-xl font-bold text-gray-900 mb-4">Press Contact</h2>
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Media enquiries & interview requests</p>
                <p className="text-gray-500 text-sm mt-0.5">We typically respond within 24 hours on business days.</p>
              </div>
              <a
                href="mailto:hello@pandalearn.in?subject=Press Enquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
              >
                <ExternalLink size={14} />
                hello@pandalearn.in
              </a>
            </div>
          </motion.section>

        </div>
      </main>
      <Footer />
    </>
  );
}
