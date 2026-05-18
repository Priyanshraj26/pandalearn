"use client";

import { motion } from "framer-motion";

function NeuralNetViz() {
  const nodes = [
    { cx: 30,  cy: 40,  delay: "0s"   },
    { cx: 30,  cy: 80,  delay: "0.2s" },
    { cx: 30,  cy: 120, delay: "0.4s" },
    { cx: 90,  cy: 55,  delay: "0.1s" },
    { cx: 90,  cy: 105, delay: "0.3s" },
    { cx: 150, cy: 80,  delay: "0.2s" },
  ];
  const edges = [
    { x1: 30,  y1: 40,  x2: 90,  y2: 55  },
    { x1: 30,  y1: 40,  x2: 90,  y2: 105 },
    { x1: 30,  y1: 80,  x2: 90,  y2: 55  },
    { x1: 30,  y1: 80,  x2: 90,  y2: 105 },
    { x1: 30,  y1: 120, x2: 90,  y2: 55  },
    { x1: 30,  y1: 120, x2: 90,  y2: 105 },
    { x1: 90,  y1: 55,  x2: 150, y2: 80  },
    { x1: 90,  y1: 105, x2: 150, y2: 80  },
  ];
  return (
    <svg viewBox="0 0 180 160" className="w-full h-full" aria-hidden>
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" strokeDasharray="4 3"
          style={{ animation: `dash 2s linear ${i * 0.15}s infinite` }} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="9"
          fill="rgba(124,58,237,0.85)" stroke="rgba(167,139,250,0.8)" strokeWidth="1.5"
          style={{ animation: `pulseGlow 3s ease-in-out ${n.delay} infinite` }} />
      ))}
      <style>{`@keyframes dash { to { stroke-dashoffset: -14; } }`}</style>
    </svg>
  );
}

function AlgorithmViz() {
  const bars = [
    { h: 55, delay: "0s",    color: "#7c3aed" },
    { h: 85, delay: "0.3s",  color: "#8b5cf6" },
    { h: 35, delay: "0.6s",  color: "#a855f7" },
    { h: 95, delay: "0.9s",  color: "#7c3aed" },
    { h: 65, delay: "1.2s",  color: "#6d28d9" },
    { h: 45, delay: "1.5s",  color: "#8b5cf6" },
    { h: 75, delay: "1.8s",  color: "#7c3aed" },
  ];
  return (
    <div className="w-full h-full flex items-end justify-center gap-2 px-4 pb-2" aria-hidden>
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-t-sm" style={{
          height: `${b.h}%`,
          backgroundColor: b.color,
          animation: `sortBar 3s ease-in-out ${b.delay} infinite`,
          opacity: 0.8,
        }} />
      ))}
    </div>
  );
}

function PacketViz() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 px-4" aria-hidden>
      {[
        { label: "Browser",  color: "bg-violet-500" },
        { label: "Router",   color: "bg-slate-400"  },
        { label: "Server",   color: "bg-emerald-500"},
      ].map((node, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-20 text-center text-xs font-semibold text-white ${node.color} rounded-lg py-1.5 px-2 shrink-0`}>
            {node.label}
          </div>
          {i < 2 && (
            <div className="flex-1 h-1 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-full bg-orange-400 rounded-full"
                style={{ animation: `packetMove 2s linear ${i * 0.7}s infinite` }} />
            </div>
          )}
        </div>
      ))}
      <div className="text-center text-xs text-emerald-600 font-semibold mt-1">
        📦 Packets delivered!
      </div>
    </div>
  );
}

const modules = [
  {
    emoji: "🧠",
    title: "Neural Network Builder",
    description: "Drag nodes, add layers, adjust weights and watch the network learn in real time on live data.",
    Viz: NeuralNetViz,
    tag: "Machine Learning",
    tagColor: "bg-violet-100 text-violet-700 border-violet-200",
    border: "border-violet-200 hover:border-violet-400",
    vizBg: "bg-violet-50",
    glow: "rgba(124,58,237,0.05)",
  },
  {
    emoji: "📊",
    title: "Algorithm Visualizer",
    description: "Step through BFS, DFS, Dijkstra, and 10+ sorting algorithms with full control - pause, rewind, speed up.",
    Viz: AlgorithmViz,
    tag: "Data Structures",
    tagColor: "bg-orange-100 text-orange-700 border-orange-200",
    border: "border-orange-200 hover:border-orange-400",
    vizBg: "bg-orange-50",
    glow: "rgba(249,115,22,0.05)",
  },
  {
    emoji: "🌐",
    title: "Packet Simulator",
    description: "Send real packets through a visual network. See DNS resolution, TCP handshakes, and HTTP in action.",
    Viz: PacketViz,
    tag: "Computer Networks",
    tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    border: "border-emerald-200 hover:border-emerald-400",
    vizBg: "bg-emerald-50",
    glow: "rgba(16,185,129,0.05)",
  },
];

export default function ModuleShowcase() {
  return (
    <section id="features" className="relative py-24 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            Don&apos;t just read. Experience it.
          </span>
          <h2 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Interactive modules that{" "}
            <span className="gradient-text">stick</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every concept on PandaLearn has a live simulation you can play with.
            No passive videos. No boring text walls.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((mod, i) => (
            <motion.article
              key={mod.title}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.65, ease: [0.22,1,0.36,1] }}
              className={`rounded-2xl border bg-white ${mod.border} overflow-hidden card-hover transition-all shadow-sm hover:shadow-lg`}
            >
              <div className={`relative h-44 ${mod.vizBg} border-b border-gray-100 overflow-hidden`}>
                <mod.Viz />
                <div className="absolute inset-0 bg-linear-to-t from-white/30 to-transparent pointer-events-none" />
              </div>
              <div className="p-6">
                <div className={`inline-flex items-center gap-1.5 border text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${mod.tagColor}`}>
                  <span>{mod.emoji}</span>
                  {mod.tag}
                </div>
                <h3 className="font-sora text-xl font-bold text-gray-900 mb-2">{mod.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{mod.description}</p>
                <button className="mt-5 text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 group transition-colors">
                  Try it live
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
