"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Bot, Sparkles, MessageCircle, Lightbulb, RefreshCw, Mic } from "lucide-react";

const MESSAGES = [
  { role: "user", text: "Why do we use a priority queue in Dijkstra's algorithm?" },
  { role: "ai",   text: "Great question! In Dijkstra's, we always want to process the node with the smallest current distance next. A priority queue (min-heap) lets us do that in O(log n) instead of scanning all nodes each time." },
  { role: "user", text: "Can you show me how the heap works with a small example?" },
  { role: "ai",   text: "Sure! Say you have nodes A(dist=0), B(dist=4), C(dist=2). The heap orders them: [A:0, C:2, B:4]. You pop A, relax its neighbors, push updates. Want me to open the interactive visualizer?" },
];

const FEATURES = [
  { Icon: MessageCircle, title: "Context-aware answers",  desc: "Ask about the exact concept you're studying - no need to explain what module you're on." },
  { Icon: Lightbulb,     title: "Progressive hints",      desc: "Don't want the answer? Ask for a hint. The tutor guides you without spoiling the solution." },
  { Icon: RefreshCw,     title: "Adaptive path",          desc: "Score below 70% on a quiz? The tutor recommends the prerequisite module automatically." },
  { Icon: Mic,           title: "Mock interview mode",    desc: "Gemini plays a technical interviewer for system design and DSA practice." },
];

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="w-7 h-7 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center mr-2.5 shrink-0">
        <Bot size={14} className="text-violet-500" />
      </div>
      <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full block"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity, repeatType: "loop" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AITutorSection() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(messagesRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 350;

    MESSAGES.forEach((msg, i) => {
      if (msg.role === "ai") {
        timers.push(setTimeout(() => setTyping(true), t));
        t += 900;
        timers.push(setTimeout(() => { setTyping(false); setVisible(i + 1); }, t));
        t += 500;
      } else {
        timers.push(setTimeout(() => setVisible(i + 1), t));
        t += 700;
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section className="relative py-24 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          >
            
            <h2 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Your AI tutor knows{" "}
              <span className="gradient-text">exactly where you are</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              The AI tutor isn&apos;t a generic chatbot. It knows your current module,
              your progress, your last quiz score - and answers questions in
              context, like a real teacher looking over your shoulder.
            </p>
            <ul className="space-y-4">
              {FEATURES.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <item.Icon size={15} className="text-violet-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{item.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - live chat UI */}
          <motion.div
            initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-violet-50">
                <motion.div
                  className="w-9 h-9 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Bot size={18} className="text-violet-600" />
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">PandaLearn AI Tutor</div>
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full block"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-emerald-600">Online - Module: Dijkstra&apos;s Algorithm</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Bot size={18} className="text-violet-500" />
                </div>
              </div>

              {/* Messages */}
              <div ref={messagesRef} className="p-5 space-y-4 min-h-64 max-h-80 overflow-y-auto bg-white">
                <AnimatePresence>
                  {MESSAGES.slice(0, visible).map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "ai" && (
                        <div className="w-7 h-7 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center mr-2.5 shrink-0 mt-0.5">
                          <Bot size={14} className="text-violet-500" />
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-orange-50 border border-orange-200 text-orange-900 rounded-tr-sm"
                          : "bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypingDots />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Ask anything about this module…"
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    readOnly
                  />
                  <button className="shrink-0 w-8 h-8 bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-colors">
                    ↑
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
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
