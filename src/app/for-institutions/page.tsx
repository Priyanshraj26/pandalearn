"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, Check, Building, BarChart2, Users, BookOpen,
  Layers, Link2, ShieldCheck, Mail, Send, CheckCircle,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const FEATURES = [
  { Icon: BarChart2,  title: "Progress Analytics",       desc: "Module completion rates, quiz scores, streak data, and time-on-task — per student and per class." },
  { Icon: Users,      title: "Bulk Student Licenses",    desc: "Onboard hundreds of students at once. Manage licenses, add/remove seats from a single dashboard." },
  { Icon: BookOpen,   title: "Module Assignment",        desc: "Assign specific modules or full subjects to classes. Set deadlines and track submission." },
  { Icon: Layers,     title: "Custom Branding",          desc: "White-label the platform with your institution's logo, colors, and domain." },
  { Icon: Link2,      title: "LMS Integration",          desc: "REST API and LTI 1.3 integration with Moodle, Canvas, Google Classroom, and custom LMS." },
  { Icon: ShieldCheck, title: "Data Privacy",            desc: "Student data stays in India. DPDP Act compliant. SOC 2 audit in progress." },
];

const INSTITUTION_TYPES = [
  { Icon: Building, title: "Schools & Coaching Institutes", desc: "Structured CS curriculum for Grades 9–12. Align to CBSE/ICSE or create custom paths." },
  { Icon: Users,    title: "Engineering Colleges",          desc: "Supplement classroom teaching with interactive labs. Perfect for CS, IT, and ECE departments." },
  { Icon: BookOpen, title: "Online EdTech Platforms",      desc: "Embed PandaLearn visualizations via API. White-label available for branded deployments." },
];

const STEPS = [
  { n: "01", title: "Onboard your institution",         desc: "We set up your institution's account, import your class roster, and configure the platform to your needs." },
  { n: "02", title: "Assign modules to classes",        desc: "Use the teacher dashboard to assign modules, set pacing, and schedule assessments per class." },
  { n: "03", title: "Track progress in real time",      desc: "Monitor every student's progress, quiz performance, and streak from a single analytics view." },
];

export default function ForInstitutions() {
  const [form, setForm] = useState({ name: "", email: "", institution: "", role: "", students: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.institution) setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="relative pt-36 pb-24 bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(203,213,225,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          }} />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Building size={14} />
                For Schools, Colleges &amp; Institutes
              </div>
              <h1
                className="font-sora font-extrabold text-gray-900 tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
              >
                Bring interactive CS learning<br />
                <span className="text-emerald-600">to your classroom.</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
                Scale PandaLearn across your institution with a teacher dashboard, bulk licenses, module assignment tools, and detailed student analytics. Custom pricing for every institution size.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="#contact-form" className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md hover:-translate-y-px transition-all">
                  Book a Demo <ArrowRight size={16} />
                </a>
                <a href="mailto:hello@pandalearn.in?subject=Institution Enquiry" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-200 hover:border-emerald-300 text-gray-600 hover:text-emerald-700 font-semibold rounded-xl transition-all">
                  <Mail size={16} /> Email us directly
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Institution types */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <h2 className="font-sora text-3xl font-bold text-gray-900">Who uses PandaLearn for institutions?</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {INSTITUTION_TYPES.map((t, i) => (
                <motion.div key={t.title} {...up(i * 0.1)} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <t.Icon size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="font-sora font-bold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Platform features</span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">Everything your institution needs</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} {...up(i * 0.07)} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <f.Icon size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="font-sora font-bold text-gray-900 mb-2 text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-14">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Getting started</span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">Up and running in days, not months</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((s, i) => (
                <motion.div key={s.n} {...up(i * 0.1)} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-sora font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    {s.n}
                  </div>
                  <h3 className="font-sora font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-10">
              <h2 className="font-sora text-3xl font-bold text-gray-900">Everything in Pro, plus</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "All School + Engineering Track content",
                "Unlimited student licenses (custom)",
                "Teacher & admin dashboard",
                "Module assignment & deadlines",
                "Class-level progress analytics",
                "Student quiz performance reports",
                "Custom branding (white-label)",
                "LMS integration (API + LTI 1.3)",
                "Dedicated account manager",
                "Onboarding & training session",
                "Priority email + phone support",
                "99.9% SLA with uptime monitoring",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                >
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact-form" className="py-20 bg-gray-50">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <motion.div {...up()} className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Book a demo</span>
              <h2 className="font-sora text-3xl font-bold text-gray-900">Let&apos;s talk</h2>
              <p className="text-gray-500 mt-3">Fill in your details and we&apos;ll reach out within 24 hours to schedule a product walkthrough.</p>
            </motion.div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
              >
                <CheckCircle size={40} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="font-sora text-xl font-bold text-gray-900 mb-2">Request received!</h3>
                <p className="text-gray-500 text-sm">We&apos;ll reach out to <strong>{form.email}</strong> within 24 hours to schedule a demo.</p>
              </motion.div>
            ) : (
              <motion.form {...up(0.1)} onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your name</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Dr. / Prof. / Mr."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Work email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@institution.edu"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Institution name</label>
                  <input name="institution" value={form.institution} onChange={handleChange} required placeholder="e.g. IIT Roorkee / DPS Vasant Kunj"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-400 transition-colors" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your role</label>
                    <select name="role" value={form.role} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-emerald-400 transition-colors">
                      <option value="">Select role</option>
                      <option>Principal / Director</option>
                      <option>HOD / Department Head</option>
                      <option>Professor / Teacher</option>
                      <option>Academic Coordinator</option>
                      <option>IT / Technical Team</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Approx. students</label>
                    <select name="students" value={form.students} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-emerald-400 transition-colors">
                      <option value="">Select range</option>
                      <option>Under 100</option>
                      <option>100 – 500</option>
                      <option>500 – 2,000</option>
                      <option>2,000+</option>
                    </select>
                  </div>
                </div>
                <button type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors shadow-md">
                  <Send size={15} /> Request a demo
                </button>
              </motion.form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
