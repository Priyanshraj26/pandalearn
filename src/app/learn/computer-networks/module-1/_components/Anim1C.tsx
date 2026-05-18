"use client"

import { useState, useRef, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

interface Packet {
  id:      string
  payload: string
  sent:    boolean   // has reached destination
}

// ── tiny SVG laptop icon ────────────────────────────────────────────────────
function Laptop({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={active ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-colors ${
          active ? "border-violet-400 bg-violet-50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <svg viewBox="0 0 48 40" width={44} height={36}>
          {/* screen */}
          <rect x={4} y={2} width={40} height={26} rx={3} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1.5} />
          <rect x={7} y={5} width={34} height={20} rx={1} fill="#7C3AED" opacity={active ? 0.6 : 0.15} />
          {/* base */}
          <rect x={1} y={29} width={46} height={3} rx={1.5} fill="#94A3B8" />
          {/* notch */}
          <rect x={18} y={28} width={12} height={2} rx={1} fill="#CBD5E1" />
        </svg>
      </motion.div>
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <span className="text-[10px] text-gray-400 font-mono">
        {label === "Laptop A" ? "192.168.1.10" : "192.168.1.20"}
      </span>
    </div>
  )
}

// ── component ───────────────────────────────────────────────────────────────
export default function Anim1C() {
  const [input,       setInput]       = useState("")
  const [packets,     setPackets]     = useState<Packet[]>([])
  const [traveling,   setTraveling]   = useState<string | null>(null)    // packet id
  const [inspecting,  setInspecting]  = useState<string | null>(null)    // packet id
  const [messages,    setMessages]    = useState<string[]>([])
  const uid = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  function send() {
    const text = input.trim()
    if (!text || traveling) return
    const id: string = `${uid}-${Date.now()}`
    const pkt: Packet = { id, payload: text, sent: false }
    setPackets(prev => [...prev, pkt])
    setTraveling(id)
    setInput("")
    inputRef.current?.focus()
  }

  function onPacketArrived(id: string) {
    setTraveling(null)
    setPackets(prev => prev.map(p => p.id === id ? { ...p, sent: true } : p))
    const pkt = packets.find(p => p.id === id)
    if (pkt) setMessages(m => [...m, pkt.payload])
  }

  const travelingPkt = packets.find(p => p.id === traveling)

  return (
    <div className="bg-[#0F172A] p-6 min-h-[340px] flex flex-col gap-6">

      {/* ── devices row ── */}
      <div className="relative flex items-end justify-between gap-4">

        {/* Laptop A */}
        <div className="flex flex-col items-center gap-1">
          <Laptop label="Laptop A" active={!!traveling} />

          {/* chat input */}
          <div className="mt-3 flex gap-1">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              disabled={!!traveling}
              placeholder="Type a message…"
              className="w-36 text-xs px-3 py-2 rounded-lg bg-[#1E293B] border border-[#334155] text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={!!traveling || !input.trim()}
              className="w-8 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 flex items-center justify-center disabled:opacity-40 transition-colors"
            >
              <Send size={12} className="text-white" />
            </button>
          </div>
        </div>

        {/* cable + traveling packet */}
        <div className="flex-1 relative h-12 flex items-center">
          {/* wire */}
          <div className="w-full h-px bg-[#475569]" />
          <div className="absolute left-0 w-2 h-2 rounded-full bg-[#475569]" />
          <div className="absolute right-0 w-2 h-2 rounded-full bg-[#475569]" />

          {/* flying packet */}
          <AnimatePresence>
            {travelingPkt && (
              <motion.div
                key={travelingPkt.id}
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                onAnimationComplete={() => onPacketArrived(travelingPkt.id)}
                className="absolute -top-4 -translate-x-1/2 cursor-pointer"
                onClick={e => {
                  e.stopPropagation()
                  setInspecting(prev => prev === travelingPkt.id ? null : travelingPkt.id)
                }}
              >
                {/* packet block */}
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg shadow-violet-900/50 whitespace-nowrap">
                    PKT
                  </div>
                  {/* tooltip */}
                  <AnimatePresence>
                    {inspecting === travelingPkt.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-44 bg-[#1E293B] border border-[#334155] rounded-xl p-3 text-[10px] shadow-xl z-10"
                        onClick={e => e.stopPropagation()}
                      >
                        <p className="text-gray-400 mb-1.5 font-bold uppercase tracking-wide">Packet Inspector</p>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Source</span>
                            <span className="text-violet-300 font-mono">192.168.1.10</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Destination</span>
                            <span className="text-violet-300 font-mono">192.168.1.20</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Protocol</span>
                            <span className="text-emerald-400 font-mono">TCP</span>
                          </div>
                          <div className="mt-1.5 pt-1.5 border-t border-[#334155]">
                            <span className="text-gray-400">Payload</span>
                            <p className="text-white mt-0.5 break-words">"{travelingPkt.payload}"</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Laptop B */}
        <div className="flex flex-col items-center gap-1">
          <Laptop label="Laptop B" active={messages.length > 0} />

          {/* received messages */}
          <div className="mt-3 w-36 min-h-[36px] max-h-24 overflow-y-auto space-y-1">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 text-[10px] px-2.5 py-1.5 rounded-lg text-right"
                >
                  {msg}
                </motion.div>
              ))}
            </AnimatePresence>
            {messages.length === 0 && (
              <p className="text-gray-600 text-[10px] text-center">No messages yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ── hint ── */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          {traveling
            ? "Click the violet packet to inspect its contents"
            : "Type a message and press Enter or click Send"
          }
        </p>
      </div>
    </div>
  )
}
