"use client";

import Link from "next/link";
import { PawPrint, Heart } from "lucide-react";

const SOCIALS = [
  { label: "𝕏",   title: "Twitter / X", href: "#" },
  { label: "in",  title: "LinkedIn",     href: "#" },
  { label: "▶",   title: "YouTube",      href: "#" },
  { label: "</>", title: "GitHub",       href: "#" },
];

const LINKS = {
  Platform: [
    { label: "School Track",      href: "/school-track"      },
    { label: "Engineering Track", href: "/engineering-track"  },
    { label: "Pricing",           href: "/#pricing"           },
    { label: "For Institutions",  href: "/for-institutions"   },
  ],
  Learn: [
    { label: "Data Structures",   href: "/engineering-track#curriculum" },
    { label: "Machine Learning",  href: "/engineering-track#curriculum" },
    { label: "Computer Networks", href: "/engineering-track#curriculum" },
    { label: "System Design",     href: "/engineering-track#curriculum" },
    { label: "Interview Prep",    href: "/engineering-track#curriculum" },
  ],
  Company: [
    { label: "About Us",  href: "/about"    },
    { label: "Blog",      href: "/blog"     },
    { label: "Careers",   href: "/careers"  },
    { label: "Press Kit", href: "/press"    },
    { label: "Contact",   href: "/contact"  },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms"   },
    { label: "Cookie Policy",    href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-8">

        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <PawPrint size={16} className="text-white" />
              </div>
              <span className="font-sora text-lg font-bold text-gray-900">
                Panda<span className="text-violet-600">Learn</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Interactive CS &amp; ML education for school students and
              engineering graduates. Learn by doing.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.title}
                  href={s.href}
                  aria-label={s.title}
                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-all text-xs font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">{cat}</p>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1.5">
            © 2026 PandaLearn. Built with
            <Heart size={12} className="text-rose-500 inline" fill="currentColor" />
            for curious minds.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              All systems operational
            </span>
            <span>·</span>
            <a href="#" className="hover:text-gray-600 transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
