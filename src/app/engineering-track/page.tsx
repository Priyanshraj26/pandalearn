"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Check, GraduationCap, Code2, Brain, Network,
  Server, Database, Layout, Mic, Briefcase, TrendingUp,
  ChevronRight, Layers, GitBranch, Sparkles, Award,
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
    Icon: Code2,
    name: "Data Structures & Algorithms",
    modules: 15,
    flagship: true,
    desc: "The core of every technical interview. Visualize every operation, trace every traversal.",
    topics: ["Arrays & Strings", "Linked Lists", "Trees & BST", "Graphs (BFS/DFS)", "Heaps", "Dynamic Programming", "Sorting", "Sliding Window", "Two Pointers", "Backtracking"],
  },
  {
    Icon: Brain,
    name: "Machine Learning",
    modules: 12,
    desc: "From linear regression to transformers - every algorithm visualized interactively.",
    topics: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "Neural Networks", "CNNs", "RNNs & LSTMs", "Transformers & Attention", "NLP Basics", "Clustering", "Model Evaluation"],
  },
  {
    Icon: Network,
    name: "Computer Networks",
    modules: 8,
    desc: "Watch packets travel through the OSI model, DNS resolvers, and load balancers.",
    topics: ["OSI & TCP/IP Model", "HTTP/HTTPS", "DNS & CDNs", "Routing & Switching", "Load Balancing", "WebSockets", "Network Security", "REST vs GraphQL"],
  },
  {
    Icon: Server,
    name: "Operating Systems",
    modules: 8,
    desc: "Processes, threads, memory - the engine under every application.",
    topics: ["Processes & Threads", "CPU Scheduling", "Memory Management", "Virtual Memory", "Deadlocks", "File Systems", "Concurrency & Locks", "OS Security"],
  },
  {
    Icon: Database,
    name: "DBMS",
    modules: 6,
    desc: "Design schemas, write optimized queries, and understand transactions at depth.",
    topics: ["Relational Model & SQL", "Indexing & Query Optimization", "Transactions & ACID", "Normalization", "NoSQL Databases", "Distributed Databases"],
  },
  {
    Icon: Layout,
    name: "System Design",
    modules: 10,
    desc: "Design scalable systems. The subject that separates mid-level from senior engineers.",
    topics: ["Scalability Fundamentals", "Caching Strategies", "Message Queues", "Consistent Hashing", "Rate Limiting", "API Design", "Microservices", "Case Studies: Netflix, WhatsApp"],
  },
  {
    Icon: Mic,
    name: "Interview Preparation",
    modules: 6,
    desc: "Gemini plays the interviewer. Walk into your next interview knowing what to expect.",
    topics: ["Mock Technical Interviews", "System Design Interviews", "Behavioral (STAR method)", "LC Patterns Reference", "Company-specific Prep", "Resume & LinkedIn"],
  },
];

const FOR_WHOM = [
  {
    Icon: GraduationCap,
    label: "Final-year CS students",
    desc: "Campus placements coming up? This track covers everything asked in FAANG, product startups, and service companies.",
  },
  {
    Icon: Briefcase,
    label: "Recent grads job-hunting",
    desc: "Refresh your fundamentals, fill gaps, and practice with the mock interview simulator until you're interview-ready.",
  },
  {
    Icon: TrendingUp,
    label: "Working devs leveling up",
    desc: "Targeting senior or staff roles? System Design and ML modules go deep enough to handle that scope of interview.",
  },
];

const FEATURES = [
  {
    Icon: Layers,
    title: "Industry-level depth",
    desc: "Not a survey course. DSA covers hard DP. System Design covers CAP theorem and real architectures.",
  },
  {
    Icon: GitBranch,
    title: "Interactive visualizations",
    desc: "Trace BFS on a live graph. Watch gradient descent converge. Simulate a consistent hashing ring.",
  },
  {
    Icon: Mic,
    title: "Mock interview simulator",
    desc: "Gemini plays a technical interviewer for DSA, System Design, and behavioral rounds.",
  },
  {
    Icon: Sparkles,
    title: "AI tutor with context",
    desc: "Ask about Dijkstra's and get an answer that knows you just finished BFS - not a generic chatbot.",
  },
  {
    Icon: Award,
    title: "Completion certificates",
    desc: "Shareable certificates for each subject. LinkedIn-ready PDF on track completion.",
  },
  {
    Icon: Code2,
    title: "LeetCode patterns guide",
    desc: "Learn the 14 core patterns that cover 90% of coding interview questions.",
  },
];

export default function EngineeringTrack() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(203,213,225,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <GraduationCap size={14} />
                Engineering + Interview Prep · Most Popular
              </div>

              <h1
                className="font-sora font-extrabold text-gray-900 tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
              >
                Go from student<br />
                <span className="gradient-text">to hired engineer.</span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-9 max-w-xl mx-auto">
                Industry-level depth on every CS subject that matters - plus the mock interview
                simulator that has helped 2,000+ students land offers at FAANG, unicorns, and top startups.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl shadow-md hover:-translate-y-px transition-all"
                >
                  Start Engineering Track <ArrowRight size={16} />
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-200 hover:border-violet-300 hover:text-violet-700 text-gray-600 font-semibold rounded-xl transition-all"
                >
                  View Curriculum <ChevronRight size={16} />
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
                {["7 subjects", "65+ modules", "~200 hours of content", "Mock interview included"].map(s => (
                  <span key={s} className="flex items-center gap-1.5">
                    <Check size={13} className="text-violet-500" />{s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Who is it for ────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                Who it&apos;s for
              </span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">
                Built for serious learners
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {FOR_WHOM.map((f, i) => (
                <motion.div
                  key={f.label}
                  {...up(i * 0.1)}
                  className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <f.Icon size={16} className="text-gray-700" />
                  </div>
                  <h3 className="font-sora font-bold text-gray-900 mb-2">{f.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Curriculum ───────────────────────────────────────── */}
        <section id="curriculum" className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                Full curriculum
              </span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">
                7 subjects. 65 modules. All visualized.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SUBJECTS.map((s, i) => (
                <motion.div
                  key={s.name}
                  {...up(i * 0.07)}
                  className={`rounded-2xl border p-6 hover:shadow-md transition-shadow flex flex-col ${
                    s.flagship
                      ? "border-violet-200 bg-white ring-1 ring-violet-100"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {s.flagship && (
                    <div className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-0.5 rounded-full inline-block mb-3 w-fit">
                      Most tested in interviews
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        s.flagship ? "bg-violet-600" : "bg-gray-900"
                      }`}
                    >
                      <s.Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sora font-bold text-gray-900 text-sm leading-tight">
                        {s.name}
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full shrink-0">
                      {s.modules} modules
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {s.topics.slice(0, 4).map(t => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                    {s.topics.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-lg bg-gray-50 text-gray-400 border border-gray-200">
                        +{s.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why it works ─────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                Why it works
              </span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">
                Built for engineers, not tourists
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  {...up(i * 0.07)}
                  className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <f.Icon size={16} className="text-gray-700" />
                  </div>
                  <p className="font-sora font-bold text-gray-900 text-sm mb-1.5">{f.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 bg-gray-900">
          <motion.div {...up()} className="mx-auto max-w-2xl px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-gray-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <GraduationCap size={13} />
              Engineering Track
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Your next offer starts here.
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              7-day free trial on Pro. No card required.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-base rounded-xl shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Start Engineering Track Free <ArrowRight size={18} />
            </a>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-8">
              {["No credit card", "Cancel anytime", "Instant access"].map(s => (
                <span key={s} className="flex items-center gap-1.5">
                  <Check size={12} className="text-violet-400" />{s}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
