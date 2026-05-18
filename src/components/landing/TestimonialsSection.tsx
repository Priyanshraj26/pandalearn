"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "I used to dread calculus. PandaLearn's derivative visualizer - drag the tangent line and watch the slope change live - made it click in 20 minutes. I've been on a 14-day streak and I don't want to stop.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    role: "Class 11 Student, Delhi",
  },
  {
    text: "I had my Amazon SDE interview in 3 weeks and was panicking about system design. The consistent hashing and load balancing simulators were the most helpful resources I found. Got the offer.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Arjun Mehta",
    role: "3rd Year CS, NIT Trichy",
  },
  {
    text: "I've tried Brilliant, Coursera, and YouTube playlists. Nothing compares. The neural network builder where you train a model in the browser and see the loss curve drop - I finally understood backpropagation.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    name: "Rohan Kapoor",
    role: "Software Engineer, Bangalore",
  },
  {
    text: "Coming from a school with no CS lab, I was intimidated. But PandaLearn's Python modules start from zero and the AI tutor never makes you feel silly. I wrote my first program in week one. Now I'm on module 11.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Neha Srivastava",
    role: "Class 12 Student, Lucknow",
  },
  {
    text: "The BFS/DFS visualizer finally made graph traversals click for me after two years of struggling. I went from dreading graph questions to solving them confidently. Cracked my Zepto interview last month.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Karan Verma",
    role: "Final Year BTech, IIIT Hyderabad",
  },
  {
    text: "As a non-engineer trying to understand ML for my job, every resource assumed too much or too little. PandaLearn hits the perfect level. The gradient descent animation is genuinely the best explanation I've ever seen.",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Divya Nair",
    role: "Product Manager, transitioning to ML",
  },
  {
    text: "The AI tutor feature is incredible. It answers exactly what I'm confused about without making me feel dumb. I've learned more in 3 weeks than in an entire semester of offline coaching.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Ananya Joshi",
    role: "Class 10 Student, Pune",
  },
  {
    text: "The mock interview mode was spot on. It asked exactly the kind of system design questions I got in real interviews. Cleared my Google interview - couldn't have done it without this platform.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Vikram Singh",
    role: "Software Engineer, Google",
  },
  {
    text: "Recursion was always a black box for me. The visual call-stack walkthrough in PandaLearn made it finally make sense. My DSA scores improved dramatically in just two weeks of practice.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "Riya Patel",
    role: "2nd Year CS, VIT Vellore",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-violet-200 text-violet-600 text-xs font-semibold uppercase tracking-widest py-1 px-4 rounded-lg">
              Student Stories
            </div>
          </div>

          <h2 className="font-sora text-4xl sm:text-5xl font-bold tracking-tighter text-gray-900 text-center mt-5">
            Students who{" "}
            <span className="gradient-text">actually learned</span>
          </h2>
          <p className="text-center mt-5 text-gray-500 text-lg">
            Not hand-picked influencers. Real students from schools and
            engineering colleges across India.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
