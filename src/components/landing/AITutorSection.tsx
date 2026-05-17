"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

const chatMessages = [
  {
    role: "user",
    text: "Why do we use a priority queue in Dijkstra's algorithm?",
  },
  {
    role: "ai",
    text: "Great question! In Dijkstra's, we always want to process the node with the smallest current distance next. A priority queue (min-heap) lets us do that in O(log n) instead of scanning all nodes each time. Without it, the algorithm would be O(V²) instead of O((V+E) log V).",
  },
  {
    role: "user",
    text: "Can you show me how the heap works with a small example?",
  },
  {
    role: "ai",
    text: "Sure! Say you have nodes A(dist=0), B(dist=4), C(dist=2). The heap orders them: [A:0, C:2, B:4]. You pop A, relax its neighbors, update distances, and push updated values. The heap always gives you the cheapest unvisited node next. Want me to open the interactive visualizer? 🐼",
  },
];

export default function AITutorSection() {
  return (
    <section
      className="relative py-24 lg:py-32"
      aria-labelledby="ai-tutor-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-navy-700/70 border border-navy-600/60 text-slate-400 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <Sparkles size={13} className="text-violet-400" />
              Powered by Google Gemini
            </div>
            <h2
              id="ai-tutor-heading"
              className="font-sora text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Your AI tutor knows{" "}
              <span className="gradient-text">exactly where you are</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              The AI tutor isn't a generic chatbot. It knows your current module,
              your progress, your last quiz score — and answers questions in
              context, like a real teacher looking over your shoulder.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                {
                  icon: "💬",
                  title: "Context-aware answers",
                  desc: "Ask about the exact concept you're studying — no need to explain what module you're on.",
                },
                {
                  icon: "💡",
                  title: "Progressive hints",
                  desc: "Don't want the answer? Ask for a hint. The tutor guides you without spoiling the solution.",
                },
                {
                  icon: "🔄",
                  title: "Adaptive path",
                  desc: "Score below 70% on a quiz? The tutor recommends the prerequisite module automatically.",
                },
                {
                  icon: "🎤",
                  title: "Mock interview mode",
                  desc: "Gemini plays a technical interviewer for system design and DSA practice.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="text-xl w-7 text-center shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-white text-sm">{item.title}</div>
                    <div className="text-slate-400 text-sm mt-0.5">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-2xl overflow-hidden border border-violet-500/20">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-600/60 bg-violet-950/30">
                <div className="w-9 h-9 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-xl">
                  🐼
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">PandaLearn AI Tutor</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-400">Online — Module: Dijkstra's Algorithm</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Bot size={18} className="text-violet-400" />
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-lg bg-violet-700/50 border border-violet-500/40 flex items-center justify-center text-sm mr-2.5 shrink-0 mt-0.5">
                        🐼
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-orange-500/20 border border-orange-500/30 text-orange-100 rounded-tr-sm"
                          : "bg-navy-700/70 border border-navy-600/60 text-slate-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input bar */}
              <div className="px-5 py-4 border-t border-navy-600/60 bg-navy-800/40">
                <div className="flex items-center gap-2 bg-navy-700/60 border border-navy-600/60 rounded-xl px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Ask anything about this module…"
                    className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none"
                    readOnly
                  />
                  <button className="shrink-0 w-8 h-8 bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-colors">
                    ↑
                  </button>
                </div>
                <p className="text-xs text-slate-600 text-center mt-2">
                  5 free AI questions/day on Free plan · Unlimited on Pro
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
