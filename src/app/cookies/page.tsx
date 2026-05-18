import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - PandaLearn",
  description: "How PandaLearn uses cookies and similar tracking technologies.",
};

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    purpose: "Keep you logged in, remember your session, maintain your cart/plan selection.",
    examples: "auth_token, session_id, csrf_token",
  },
  {
    name: "Preference Cookies",
    required: false,
    purpose: "Remember your settings like dark mode preference, last-visited module, and language.",
    examples: "theme, last_module, ui_lang",
  },
  {
    name: "Analytics Cookies",
    required: false,
    purpose: "Understand how students use the platform so we can improve it. We use privacy-respecting analytics (no cross-site tracking).",
    examples: "pl_session, pl_page_views",
  },
  {
    name: "Third-party Cookies",
    required: false,
    purpose: "Payment processing (Razorpay) sets temporary cookies during checkout. No advertising cookies are used.",
    examples: "rzp_*, payment flow tokens",
  },
];

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">

          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-1.5">
            <a href="/" className="hover:text-violet-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-600">Cookie Policy</span>
          </nav>

          <h1 className="font-sora text-4xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: May 2026</p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 mb-12">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Beta notice:</strong> Our full cookie consent banner and management UI will be available at public launch.
            </p>
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-10">
            Cookies are small text files stored on your device when you visit PandaLearn. We use them to make the platform work correctly and to understand how students learn. Here&apos;s exactly what we use and why.
          </p>

          <div className="space-y-5 mb-12">
            {COOKIE_TYPES.map(c => (
              <div key={c.name} className="rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-sora text-base font-bold text-gray-900">{c.name}</h2>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    c.required
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-violet-50 text-violet-700 border-violet-200"
                  }`}>
                    {c.required ? "Always on" : "Optional"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{c.purpose}</p>
                <p className="text-xs text-gray-400">Examples: <span className="font-mono">{c.examples}</span></p>
              </div>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="font-sora text-lg font-bold text-gray-900 mb-3">Managing Cookies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              You can disable non-essential cookies via your browser settings at any time. Note that disabling essential cookies will prevent you from logging in to PandaLearn. Most browsers allow you to view, manage, and delete cookies through their settings panels.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-sora text-lg font-bold text-gray-900 mb-3">No Advertising Cookies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We do not use advertising networks or retargeting cookies. We will never use cookies to track you across other websites.
            </p>
          </section>

          <div className="mt-14 pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Cookie questions? Email{" "}
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
