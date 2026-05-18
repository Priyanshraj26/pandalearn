"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Building, HelpCircle, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const CONTACT_OPTIONS = [
  { Icon: HelpCircle, title: "Student support",   desc: "Trouble with a module, bug report, or account issue.",       email: "hello@pandalearn.in", subject: "Student Support" },
  { Icon: Building,   title: "Institutions",       desc: "Bulk licenses, teacher dashboards, or white-label.",         email: "hello@pandalearn.in", subject: "Institution Enquiry" },
  { Icon: MessageSquare, title: "Partnerships",   desc: "Content partnerships, sponsorships, or integrations.",       email: "hello@pandalearn.in", subject: "Partnership" },
  { Icon: Mail,       title: "General",            desc: "Anything else - we read every email.",                       email: "hello@pandalearn.in", subject: "General Enquiry" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send_failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please email us directly at hello@pandalearn.in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          <motion.div {...up()} className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
              Get in touch
            </span>
            <h1 className="font-sora text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              We&apos;d love to hear from you
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Whether you&apos;re a student, teacher, or potential partner - we read every message and typically reply within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left - contact options */}
            <motion.div {...up(0.08)}>
              <h2 className="font-sora text-lg font-bold text-gray-900 mb-5">What can we help with?</h2>
              <div className="space-y-3 mb-8">
                {CONTACT_OPTIONS.map((c, i) => (
                  <motion.a
                    key={c.title}
                    href={`mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition-colors">
                      <c.Icon size={16} className="text-violet-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{c.title}</div>
                      <div className="text-gray-500 text-sm mt-0.5">{c.desc}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm font-semibold text-gray-900 mb-1">Direct email</p>
                <a href="mailto:hello@pandalearn.in" className="text-violet-600 hover:underline text-sm font-medium">
                  hello@pandalearn.in
                </a>
                <p className="text-xs text-gray-400 mt-2">Response time: within 24 hours on business days</p>
              </div>
            </motion.div>

            {/* Right - contact form */}
            <motion.div {...up(0.12)}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10"
                >
                  <CheckCircle size={40} className="text-emerald-500 mb-4" />
                  <h3 className="font-sora text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Thanks, {form.name.split(" ")[0]}. We&apos;ll get back to you at{" "}
                    <strong>{form.email}</strong> within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-sora text-lg font-bold text-gray-900 mb-5">Send a message</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name</label>
                      <input
                        name="name" value={form.name} onChange={handleChange} required
                        placeholder="Your name"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-violet-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="you@email.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-violet-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-violet-400 transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option>Student support</option>
                      <option>Institution enquiry</option>
                      <option>Partnership</option>
                      <option>Press / media</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Tell us what's on your mind…"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-violet-400 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-md"
                  >
                    <Send size={15} />
                    {loading ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
