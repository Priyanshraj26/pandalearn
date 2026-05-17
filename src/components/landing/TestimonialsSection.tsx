"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    avatar: "👧",
    name: "Priya Sharma",
    role: "Class 11 Student, Delhi",
    track: "School Track",
    trackColor: "bg-teal-500/20 text-teal-300",
    stars: 5,
    quote:
      "I used to dread calculus. PandaLearn's derivative visualizer — where I could drag the tangent line and watch the slope change live — made it click in 20 minutes. I've been on a 14-day streak and I don't want to stop.",
  },
  {
    avatar: "🧑‍💻",
    name: "Arjun Mehta",
    role: "3rd Year CS, NIT Trichy",
    track: "Engineering Track",
    trackColor: "bg-violet-500/20 text-violet-300",
    stars: 5,
    quote:
      "I had my Amazon SDE interview in 3 weeks and was panicking about system design. The PandaLearn System Design module — especially the consistent hashing and load balancing simulators — was the most helpful resource I found. Got the offer.",
  },
  {
    avatar: "👨‍🔬",
    name: "Rohan Kapoor",
    role: "Software Engineer, Bangalore",
    track: "Engineering Track",
    trackColor: "bg-violet-500/20 text-violet-300",
    stars: 5,
    quote:
      "I've tried Brilliant, Coursera, and YouTube playlists. Nothing compares to PandaLearn's interactive approach. The neural network builder where you actually train a model in the browser and see the loss curve drop — I finally *understood* backpropagation.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="relative py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            id="testimonials-heading"
            className="font-sora text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Students who{" "}
            <span className="gradient-text">actually learned</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Not hand-picked influencers. Real students from schools and
            engineering colleges.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-7 flex flex-col card-hover"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label={`${t.stars} stars`}>
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 leading-relaxed text-sm flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 pt-5 border-t border-navy-600/50">
                <div className="w-10 h-10 rounded-xl bg-navy-700/80 border border-navy-600/60 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <cite className="not-italic font-semibold text-white text-sm">
                    {t.name}
                  </cite>
                  <div className="text-xs text-slate-500 truncate">{t.role}</div>
                </div>
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.trackColor}`}>
                  {t.track}
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
