"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Bell } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const TOPICS = [
  { label: "CS Fundamentals",     color: "bg-violet-100 text-violet-700 border-violet-200" },
  { label: "Machine Learning",    color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Interview Prep",      color: "bg-teal-100 text-teal-700 border-teal-200"       },
  { label: "Student Stories",     color: "bg-blue-100 text-blue-700 border-blue-200"       },
  { label: "Platform Updates",    color: "bg-rose-100 text-rose-700 border-rose-200"       },
];

export default function Blog() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
              className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <BookOpen size={28} className="text-violet-600" />
            </motion.div>

            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              Coming Soon
            </span>

            <h1 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              The PandaLearn Blog
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Deep dives into CS concepts, interview strategies, student success
              stories, and behind-the-scenes platform updates. We&apos;re writing
              content worth reading — not just content.
            </p>

            {/* Topics preview */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {TOPICS.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border ${t.color}`}
                >
                  {t.label}
                </motion.span>
              ))}
            </div>

            {/* Notify form */}
            {!submitted ? (
              <div className="flex gap-2 max-w-sm mx-auto mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-violet-400 transition-colors"
                />
                <button
                  onClick={() => email && setSubmitted(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
                >
                  <Bell size={14} />
                  Notify me
                </button>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-600 text-sm font-medium mb-6"
              >
                You&apos;re on the list — we&apos;ll email you when the blog launches.
              </motion.p>
            )}

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
