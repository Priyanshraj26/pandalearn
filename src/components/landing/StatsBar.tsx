"use client";

import { motion } from "framer-motion";
import { Layers, GitBranch, Bot, Users } from "lucide-react";

const stats = [
  { icon: Layers,    value: "50+",    label: "Interactive Modules",  color: "text-violet-400" },
  { icon: GitBranch, value: "2",      label: "Learning Tracks",      color: "text-orange-400" },
  { icon: Bot,       value: "AI",     label: "Powered Tutor",        color: "text-emerald-400" },
  { icon: Users,     value: "10K+",   label: "Students Learning",    color: "text-blue-400"   },
];

export default function StatsBar() {
  return (
    <section
      className="relative border-y border-navy-600/50 bg-navy-800/60 backdrop-blur-sm"
      aria-label="Platform statistics"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-navy-600/40">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 px-6 py-7 group"
            >
              <div
                className={`p-2.5 rounded-xl bg-navy-700/80 group-hover:scale-110 transition-transform ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <div className="text-center sm:text-left">
                <div className={`text-2xl font-extrabold font-sora ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
