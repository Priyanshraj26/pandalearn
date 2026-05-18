"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Medal, Trophy, Gem, Crown, Flame, Brain, Zap, Star } from "lucide-react";

function AnimatedNumber({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let startTs = 0;
          const tick = (ts: number) => {
            if (!startTs) startTs = ts;
            const p = Math.min((ts - startTs) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * end).toLocaleString() + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, suffix, duration]);

  return <span ref={ref}>{display}</span>;
}

const BADGES = [
  { Icon: Award,  label: "Bronze",  xp: "0",   active: false, cls: "text-amber-700 bg-amber-50"   },
  { Icon: Medal,  label: "Silver",  xp: "1K",  active: false, cls: "text-gray-500 bg-gray-100"    },
  { Icon: Trophy, label: "Gold",    xp: "5K",  active: true,  cls: "text-yellow-500 bg-yellow-50" },
  { Icon: Gem,    label: "Diamond", xp: "15K", active: false, cls: "text-cyan-500 bg-cyan-50"     },
  { Icon: Crown,  label: "Legend",  xp: "50K", active: false, cls: "text-violet-500 bg-violet-50" },
];

const ACHIEVEMENTS = [
  { Icon: Flame, title: "7 Day Streak",  desc: "Login 7 days in a row",        border: "border-orange-200 bg-orange-50", iconCls: "text-orange-500" },
  { Icon: Brain, title: "ML Master",     desc: "Completed all ML modules",      border: "border-violet-200 bg-violet-50", iconCls: "text-violet-500" },
  { Icon: Zap,   title: "Speed Learner", desc: "Finished a module in < 10 min", border: "border-yellow-200 bg-yellow-50", iconCls: "text-yellow-500" },
  { Icon: Star,  title: "First 1K XP",  desc: "Earned your first milestone",   border: "border-blue-200 bg-blue-50",     iconCls: "text-blue-500"   },
];

const FEATURES = [
  { Icon: Flame,  text: "Daily streaks keep you consistent",           iconCls: "text-orange-500" },
  { Icon: Star,   text: "XP and levels track your real growth",        iconCls: "text-yellow-500" },
  { Icon: Gem,    text: "Gems for challenging yourself beyond basics", iconCls: "text-cyan-500"   },
  { Icon: Trophy, text: "Certificates you can share on LinkedIn",      iconCls: "text-violet-500" },
];

export default function GamificationSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-violet-100/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              Gamified learning
            </span>
            <h2 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Learning feels like a game.<br />
              <span className="gradient-text">Results feel like a degree.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Every lesson earns XP. Every module unlocks a badge. Every day you
              come back, your streak grows. Progress you can see — and feel proud of.
            </p>
            <ul className="space-y-3">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.text}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 text-gray-700 text-sm"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 ${f.iconCls}`}>
                    <f.Icon size={15} />
                  </div>
                  {f.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
            className="space-y-4"
          >
            {/* XP card with animated counters */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-50 shadow-md"
                    animate={{ rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.6, delay: 1.2, repeat: Infinity, repeatDelay: 4 }}
                  >
                    <Star size={20} className="text-yellow-500" />
                  </motion.div>
                  <div>
                    <p className="text-[11px] text-gray-500">Your XP</p>
                    <p className="font-sora text-xl font-bold text-gray-900">
                      <AnimatedNumber end={4230} /> XP
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-gray-500">Level</p>
                  <p className="font-sora text-xl font-bold text-violet-600">
                    <AnimatedNumber end={12} duration={1200} />
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>4,230 / 5,000 XP to Level 13</span><span>84%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-violet-500"
                  initial={{ width:"0%" }} whileInView={{ width:"84%" }}
                  viewport={{ once:true }}
                  transition={{ duration:1.4, delay:0.3, ease:"easeOut" }}
                />
              </div>
            </div>

            {/* Rank badges */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">Rank Path</p>
              <div className="flex items-end justify-between gap-2">
                {BADGES.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: b.active ? 1 : 0.3, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${b.cls} ${b.active ? "ring-2 ring-yellow-400 ring-offset-1" : ""}`}>
                      <b.Icon size={18} />
                    </div>
                    <span className={`text-xs font-semibold ${b.active ? "text-gray-900" : "text-gray-400"}`}>{b.label}</span>
                    <span className="text-[10px] text-gray-400">{b.xp} XP</span>
                  </motion.div>
                ))}
              </div>
              <div className="relative mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-orange-400"
                  initial={{ width:"0%" }} whileInView={{ width:"55%" }}
                  viewport={{ once:true }}
                  transition={{ duration:1.4, delay:0.5, ease:"easeOut" }}
                />
              </div>
            </div>

            {/* Achievement cards spring in */}
            <div className="grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", bounce: 0.35, delay: i * 0.1 }}
                  className={`rounded-xl border p-3.5 ${a.border}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 ${a.iconCls}`}>
                    <a.Icon size={16} />
                  </div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{a.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{a.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Streak banner slides up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", bounce: 0.3 }}
              className="rounded-2xl border border-orange-200 bg-orange-50 p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <Flame size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="font-sora text-xl font-bold text-gray-900">7 Day Streak!</p>
                <p className="text-sm text-gray-500">Keep going — your best streak was 12 days</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
