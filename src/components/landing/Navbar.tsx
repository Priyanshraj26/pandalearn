"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, PawPrint } from "lucide-react";
import Link from "next/link";
const NAV_LINKS = [
  { label: "Courses",  href: "/#tracks"           },
  { label: "Pricing",  href: "/#pricing"           },
  { label: "Blog",     href: "/blog"               },
  { label: "About",    href: "/about"              },
  { label: "Contact",  href: "/contact"            },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          className="pointer-events-auto w-full max-w-4xl"
        >
          <div
            className="flex items-center justify-between h-13 px-3 rounded-2xl transition-all duration-300"
            style={{
              background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: scrolled
                ? "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)"
                : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="PandaLearn home">
              <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <PawPrint size={15} className="text-white" />
              </div>
              <span className="font-sora text-sm font-bold text-gray-900 leading-none">
                Panda<span className="text-violet-600">Learn</span>
              </span>
              <span className="hidden sm:inline-flex items-center text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-full leading-none">
                Beta
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="px-3.5 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100/80 transition-all duration-150 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-1.5">
              <Link href="/login" className="px-3.5 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all duration-150">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white bg-orange-500 hover:bg-orange-400 rounded-xl shadow-sm transition-all duration-150 hover:-translate-y-px active:translate-y-0"
              >
                Start Free
                <ArrowRight size={12} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.96, y: -8  }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-3 flex flex-col gap-1 bg-white border border-gray-200 shadow-xl"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-gray-100 my-1" />
            <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-all text-center">
              Sign In
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-400 rounded-xl text-center transition-colors">
              Start Free
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
