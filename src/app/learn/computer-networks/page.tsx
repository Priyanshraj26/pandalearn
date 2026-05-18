import Link from "next/link"
import {
  Network, Wifi, Server, Globe, Signal, Cpu,
  ArrowRight, Clock, Lock, CheckCircle, BookOpen, Zap, Shield,
} from "lucide-react"

const MODULES = [
  {
    num: 1,
    title: "Introduction to Networks",
    dur: "~3h",
    desc: "Build a mental model of networks, topologies, and protocols.",
    topics: ["LAN / WAN / MAN", "Topologies", "Client-Server", "Protocols"],
    unlocked: true,
  },
  {
    num: 2,
    title: "OSI & TCP/IP Models",
    dur: "~5h",
    desc: "Trace HTTP through all 7 OSI layers. Master encapsulation.",
    topics: ["7 Layers", "Encapsulation", "PDUs", "TCP/IP Stack"],
    unlocked: true,
  },
  {
    num: 3,
    title: "Data Link Layer",
    dur: "~4h",
    desc: "MAC addressing, Ethernet frames, ARP, and switches.",
    topics: ["MAC Addressing", "Ethernet", "ARP", "Switches"],
    unlocked: true,
  },
  {
    num: 4,
    title: "Network Layer & IP Addressing",
    dur: "~6h",
    desc: "IPv4, CIDR subnetting, routing tables, NAT, and IPv6.",
    topics: ["IPv4 / IPv6", "CIDR", "Routing", "NAT"],
    unlocked: true,
  },
  {
    num: 5,
    title: "Transport Layer: TCP & UDP",
    dur: "~6h",
    desc: "3-way handshake, sliding window, and congestion control.",
    topics: ["TCP / UDP", "3-way Handshake", "Flow Control", "Congestion"],
    unlocked: true,
  },
  {
    num: 6,
    title: "Application Layer Protocols",
    dur: "~6h",
    desc: "HTTP/HTTPS, TLS, DNS, DHCP, REST vs GraphQL vs gRPC.",
    topics: ["HTTP/S", "DNS", "DHCP", "REST & gRPC"],
    unlocked: false,
  },
  {
    num: 7,
    title: "Network Infrastructure",
    dur: "~5h",
    desc: "CDNs, load balancers, reverse proxies, and BGP.",
    topics: ["CDNs", "Load Balancers", "Reverse Proxies", "BGP"],
    unlocked: false,
  },
  {
    num: 8,
    title: "Security & Modern Patterns",
    dur: "~5h",
    desc: "DDoS, ARP spoofing, firewalls, VPNs, Zero Trust, service meshes.",
    topics: ["Firewalls", "VPNs", "Zero Trust", "DDoS / ARP"],
    unlocked: false,
  },
]

const HIGHLIGHTS = [
  {
    Icon: BookOpen,
    label: "8 Modules",
    sub: "From first packet to global internet",
  },
  {
    Icon: Clock,
    label: "~40 Hours",
    sub: "Self-paced, no deadlines",
  },
  {
    Icon: Zap,
    label: "Interactive Animations",
    sub: "Every concept visualised",
  },
  {
    Icon: Shield,
    label: "No Prerequisites",
    sub: "Beginner friendly",
  },
]

export default function CNOverviewPage() {
  return (
    <div>

      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div className="relative bg-gray-900 px-6 lg:px-10 py-12 overflow-hidden">

        {/* Decorative background icons */}
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Network size={200} className="absolute -right-10 -top-8 text-white opacity-[0.04]" />
          <Wifi     size={88}  className="absolute right-44 top-6 text-white opacity-[0.04] rotate-12" />
          <Server   size={68}  className="absolute right-28 bottom-4 text-white opacity-[0.04] -rotate-6" />
          <Globe    size={76}  className="absolute right-8 bottom-5 text-white opacity-[0.04]" />
          <Signal   size={56}  className="absolute right-72 top-8 text-white opacity-[0.035] rotate-3" />
          <Cpu      size={48}  className="absolute right-60 bottom-6 text-white opacity-[0.04] -rotate-12" />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/40 mb-5 relative z-10">
          <span>Engineering Track</span>
          <span>›</span>
          <span className="text-white/70 font-medium">Computer Networks</span>
        </div>

        {/* Title block */}
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/60 font-medium mb-4">
            <Network size={11} />
            Engineering Track · Module Series
          </div>

          <h1 className="font-sora text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            Computer Networks
          </h1>

          <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-8 max-w-xl">
            From the first packet crossing a cable to BGP routing traffic across continents.
            Every layer demystified with interactive animations and real-world context.
          </p>

          <Link
            href="/learn/computer-networks/module-1"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            Begin Module 1 <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── Highlights strip ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200 divide-y lg:divide-y-0 border-x-0">
          {HIGHLIGHTS.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-4 first:pl-0 last:pr-0">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Module curriculum ────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-10 py-10">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sora font-bold text-gray-900 text-lg">Course Curriculum</h2>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            8 modules · ~40 hours
          </span>
        </div>

        {/* Module cards */}
        <div className="space-y-3">
          {MODULES.map((m) => (
            m.unlocked ? (
              <Link
                key={m.num}
                href={`/learn/computer-networks/module-${m.num}`}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all group"
              >
                {/* Number badge */}
                <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-sora font-bold text-white text-sm shrink-0 mt-0.5">
                  {m.num}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors text-sm">
                      {m.title}
                    </p>
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">
                      Free
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{m.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={11} /> {m.dur}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <ArrowRight size={13} className="text-violet-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={m.num}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100"
              >
                {/* Number badge */}
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-sora font-bold text-gray-400 text-sm shrink-0 mt-0.5">
                  {m.num}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-400 text-sm">{m.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{m.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lock */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-gray-300 flex items-center gap-1">
                    <Clock size={11} /> {m.dur}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center">
                    <Lock size={12} className="text-gray-300" />
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-gray-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-sora font-bold text-white text-base mb-1">Ready to start?</p>
            <p className="text-white/50 text-sm">Modules 1-5 are completely free. No account needed.</p>
          </div>
          <Link
            href="/learn/computer-networks/module-1"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Begin Module 1 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
