"use client";

import { motion } from "framer-motion";

const badges = [
  { emoji: "🥉", label: "Bronze",   xp: "0 XP",    active: false },
  { emoji: "🥈", label: "Silver",   xp: "1K XP",   active: false },
  { emoji: "🥇", label: "Gold",     xp: "5K XP",   active: true  },
  { emoji: "💎", label: "Diamond",  xp: "15K XP",  active: false },
  { emoji: "👑", label: "Legend",   xp: "50K XP",  active: false },
];

const achievements = [
  { emoji: "🔥", title: "7 Day Streak",     desc: "Logged in 7 days in a row",      color: "border-orange-500/30 bg-orange-950/30" },
  { emoji: "🧠", title: "ML Master",         desc: "Completed all ML modules",        color: "border-violet-500/30 bg-violet-950/30" },
  { emoji: "⚡", title: "Speed Learner",     desc: "Finished a module in under 10min",color: "border-yellow-500/30 bg-yellow-950/30" },
  { emoji: "🌟", title: "First 1000 XP",    desc: "Earned your first milestone",     color: "border-blue-500/30 bg-blue-950/30"   },
];

export default function GamificationSection() {
  return (
    <section
      className="relative py-24 lg:py-32 bg-navy-800/30 overflow-hidden"
      aria-labelledby="gamification-heading"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-block bg-navy-700/70 border border-navy-600/60 text-slate-400 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              Gamified Learning
            </div>
            <h2
              id="gamification-heading"
              className="font-sora text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Learning feels like{" "}
              <span className="gradient-text-orange">a game</span>.
              <br />
              Results feel like{" "}
              <span className="gradient-text">a degree</span>.
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Every lesson earns XP. Every module unlocks a badge. Every day
              you come back, your streak grows. Progress you can see — and
              feel proud of.
            </p>

            <ul className="space-y-3">
              {[
                { icon: "🔥", text: "Daily streaks keep you consistent" },
                { icon: "⭐", text: "XP and levels track your real growth" },
                { icon: "💎", text: "Gems for challenging yourself beyond basics" },
                { icon: "🏆", text: "Completion certificates you can share" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-slate-300">
                  <span className="text-xl w-7 text-center shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Gamification UI */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* XP card */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg shadow-lg animate-bounce-soft">
                    ⭐
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Your XP</div>
                    <div className="font-sora text-xl font-bold text-white">4,230 XP</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Level</div>
                  <div className="font-sora text-xl font-bold text-violet-400">12</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>4,230 / 5,000 XP to Level 13</span>
                <span>84%</span>
              </div>
              <div className="h-3 bg-navy-600/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-violet-600 to-violet-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "84%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Rank badges */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wide">Your Rank Path</div>
              <div className="flex items-center justify-between gap-2">
                {badges.map((b) => (
                  <div
                    key={b.label}
                    className={`flex flex-col items-center gap-1 ${b.active ? "opacity-100" : "opacity-40"}`}
                  >
                    <div className={`text-2xl ${b.active ? "badge-pulse" : ""}`}>{b.emoji}</div>
                    <div className={`text-xs font-semibold ${b.active ? "text-white" : "text-slate-500"}`}>
                      {b.label}
                    </div>
                    <div className="text-xs text-slate-600">{b.xp}</div>
                  </div>
                ))}
              </div>
              {/* Progress line */}
              <div className="relative mt-3">
                <div className="h-1 bg-navy-600/50 rounded-full" />
                <motion.div
                  className="absolute top-0 left-0 h-1 rounded-full bg-linear-to-r from-orange-500 to-yellow-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "55%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Achievements grid */}
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className={`rounded-xl border p-3 ${a.color}`}
                >
                  <div className="text-2xl mb-1">{a.emoji}</div>
                  <div className="text-sm font-bold text-white">{a.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-tight">{a.desc}</div>
                </div>
              ))}
            </div>

            {/* Streak banner */}
            <div className="glass rounded-2xl p-4 flex items-center gap-4 border-orange-500/20">
              <div className="text-4xl fire-flicker">🔥</div>
              <div>
                <div className="font-sora text-2xl font-bold text-white">7 Day Streak!</div>
                <div className="text-sm text-slate-400">Keep going — your best streak was 12 days</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
