"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowLeft, Heart, Mail } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const VALUES = [
  { title: "Students first",    desc: "Every decision — product, content, design — starts with 'does this help students learn better?'" },
  { title: "Async by default",  desc: "We trust you to do great work without being in a meeting. Deep work time is protected." },
  { title: "Build in public",   desc: "We share progress, mistakes, and learnings openly — inside the team and with our community." },
];

export default function Careers() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Briefcase size={28} className="text-orange-500" />
            </motion.div>

            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              We&apos;re Hiring
            </span>

            <h1 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Join the team
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              We&apos;re a small, ambitious team building the CS education platform
              we wish existed when we were students. No open roles listed yet —
              but we&apos;re always interested in exceptional people.
            </p>

            {/* Values */}
            <div className="grid gap-4 text-left mb-12">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4"
                >
                  <p className="font-semibold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <Heart size={13} className="text-rose-400" fill="currentColor" />
                    {v.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border border-violet-200 bg-violet-50 px-6 py-5 mb-8 text-left">
              <p className="font-semibold text-gray-900 text-sm mb-1">Interested in working with us?</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Send a short note about yourself, what you&apos;d build, and links to any relevant work to:
              </p>
              <a
                href="mailto:hello@pandalearn.in?subject=Careers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
              >
                <Mail size={14} />
                hello@pandalearn.in
              </a>
            </div>

            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to PandaLearn
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
