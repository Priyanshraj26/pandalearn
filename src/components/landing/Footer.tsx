"use client";

const socials_data = [
  { label: "𝕏",  title: "Twitter / X",  href: "#" },
  { label: "in", title: "LinkedIn",      href: "#" },
  { label: "▶",  title: "YouTube",       href: "#" },
  { label: "</>", title: "GitHub",       href: "#" },
];

const footerLinks = {
  Platform: [
    { label: "School Track", href: "#" },
    { label: "Engineering Track", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "For Institutions", href: "#" },
  ],
  Learn: [
    { label: "Data Structures", href: "#" },
    { label: "Machine Learning", href: "#" },
    { label: "Computer Networks", href: "#" },
    { label: "System Design", href: "#" },
    { label: "Interview Prep", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t border-navy-600/50 bg-navy-900/80"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-lg shadow-lg">
                🐼
              </div>
              <span className="font-sora text-lg font-bold text-white">
                Panda<span className="text-violet-400">Learn</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Interactive CS & ML education for school students and engineering
              graduates. Learn by doing. See every concept come alive.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socials_data.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  aria-label={s.title}
                  className="w-8 h-8 rounded-lg bg-navy-700/60 border border-navy-600/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-950/40 transition-all text-xs font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-600/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 PandaLearn. Built with ❤️ for curious minds.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              All systems operational
            </span>
            <span>·</span>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Status page
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
