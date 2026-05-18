import Link from "next/link"
import { ArrowRight, Clock, Lock, CheckCircle } from "lucide-react"

const MODULES = [
  { num: 1, title: "Introduction to Networks",       dur: "~3h",  desc: "Build a mental model of networks, topologies, and protocols.",           unlocked: true  },
  { num: 2, title: "OSI & TCP/IP Models",            dur: "~5h",  desc: "Trace HTTP through all 7 OSI layers. Master encapsulation.",            unlocked: false },
  { num: 3, title: "Data Link Layer",                dur: "~4h",  desc: "MAC addressing, Ethernet frames, ARP, switches.",                       unlocked: false },
  { num: 4, title: "Network Layer & IP Addressing",  dur: "~6h",  desc: "IPv4, CIDR subnetting, routing tables, NAT, IPv6.",                    unlocked: false },
  { num: 5, title: "Transport Layer: TCP & UDP",     dur: "~6h",  desc: "3-way handshake, sliding window, congestion control.",                  unlocked: false },
  { num: 6, title: "Application Layer Protocols",    dur: "~6h",  desc: "HTTP/HTTPS, TLS, DNS, DHCP, REST vs GraphQL vs gRPC.",                 unlocked: false },
  { num: 7, title: "Network Infrastructure",         dur: "~5h",  desc: "CDNs, load balancers, reverse proxies, BGP.",                          unlocked: false },
  { num: 8, title: "Security & Modern Patterns",     dur: "~5h",  desc: "DDoS, ARP spoofing, firewalls, VPNs, Zero Trust, service meshes.",     unlocked: false },
]

export default function CNOverviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>Engineering Track</span>
          <span>›</span>
          <span className="text-violet-600 font-medium">Computer Networks</span>
        </div>
        <h1 className="font-sora text-3xl font-bold text-gray-900 mb-3">Computer Networks</h1>
        <p className="text-gray-500 leading-relaxed mb-4">
          From the first packet to the global internet — 8 modules, 40 hours, and every concept
          brought to life with interactive animations.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-1.5 text-gray-500">
            <Clock size={14} /> ~40 hours
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">8 modules</span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <CheckCircle size={14} className="text-violet-400" /> No prerequisites
          </span>
        </div>
      </div>

      {/* module grid */}
      <div className="space-y-3">
        {MODULES.map(m => (
          m.unlocked ? (
            <Link
              key={m.num}
              href={`/learn/computer-networks/module-${m.num}`}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-violet-300 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center font-sora font-bold text-violet-700 shrink-0">
                {m.num}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">{m.title}</p>
                <p className="text-sm text-gray-500 truncate">{m.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-gray-400">{m.dur}</span>
                <ArrowRight size={16} className="text-violet-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ) : (
            <div
              key={m.num}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 opacity-60"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-sora font-bold text-gray-400 shrink-0">
                {m.num}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-500">{m.title}</p>
                <p className="text-sm text-gray-400 truncate">{m.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-gray-400">{m.dur}</span>
                <Lock size={14} className="text-gray-300" />
              </div>
            </div>
          )
        ))}
      </div>

      {/* start CTA */}
      <div className="mt-8 p-6 bg-violet-600 rounded-2xl text-center">
        <h2 className="font-sora font-bold text-white text-xl mb-2">Ready to start?</h2>
        <p className="text-violet-200 text-sm mb-4">Module 1 is unlocked. No sign-in required to preview.</p>
        <Link
          href="/learn/computer-networks/module-1"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-colors"
        >
          Begin Module 1 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
