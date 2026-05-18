import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — PandaLearn",
  description: "How PandaLearn collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide when creating an account (name, email address, and password), your learning activity (modules completed, quiz scores, XP earned), and basic device/browser information to improve our service.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to personalise your learning experience, power the AI tutor context, send progress updates, and improve the platform. We do not sell your personal data to third parties.",
  },
  {
    title: "Data Storage & Security",
    body: "Your data is stored on secure servers. We use industry-standard encryption (TLS in transit, AES-256 at rest). Access is restricted to authorised team members on a need-to-know basis.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to keep you logged in and remember your preferences, and optional analytics cookies (you may opt out). See our Cookie Policy for full details.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by emailing hello@pandalearn.in. We will respond within 30 days.",
  },
  {
    title: "Children's Privacy",
    body: "PandaLearn is designed for students aged 14 and above. For users under 18, we recommend parental guidance. We do not knowingly collect data from children under 13.",
  },
  {
    title: "Changes to This Policy",
    body: "We will notify registered users by email of any material changes to this policy. Continued use of the platform after notification constitutes acceptance.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">

          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-1.5">
            <a href="/" className="hover:text-violet-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-600">Privacy Policy</span>
          </nav>

          <h1 className="font-sora text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: May 2026 · Effective: May 2026</p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 mb-12">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Beta notice:</strong> PandaLearn is currently in beta. This policy reflects our current practices and is being reviewed with legal counsel. A comprehensive GDPR/IT Act 2000 compliant version will be published at full launch.
            </p>
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-12">
            PandaLearn (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we handle your personal information when you use our platform at pandalearn.in.
          </p>

          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <section key={s.title}>
                <h2 className="font-sora text-lg font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {s.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed pl-10">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Questions or requests regarding your data? Contact us at{" "}
              <a href="mailto:hello@pandalearn.in" className="text-violet-600 hover:underline font-medium">
                hello@pandalearn.in
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
