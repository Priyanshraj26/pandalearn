# Computer Networks — Curriculum Specification
**Track:** Engineering Track  
**Subject Code:** CN  
**Total Modules:** 8  
**Estimated Time:** ~40 hours  
**Prerequisite Knowledge:** Basic programming literacy. No prior networking required.

---

## Learning Path Overview

```
[Module 1]           [Module 2]           [Module 3]           [Module 4]
Introduction    →    OSI & TCP/IP    →    Data Link       →    Network Layer
to Networks          Model                Layer                & IP Addressing
   ~3h                  ~5h                  ~4h                    ~6h

[Module 5]           [Module 6]           [Module 7]           [Module 8]
Transport       →    Application     →    Network         →    Security &
Layer                Layer                Infrastructure       Modern Patterns
   ~6h                  ~6h                  ~5h                    ~5h
```

Each module unlocks after the previous one's exit quiz is passed (≥ 70%). Modules 7 and 8 can be taken in parallel after Module 6.

---

## Global Animation Principles

These apply across every module. Individual modules add topic-specific rules on top.

### Colour System
| Element | Colour | Hex |
|---------|--------|-----|
| Data packets in motion | Violet | `#7C3AED` |
| Successful / ACK signals | Emerald | `#10B981` |
| Error / NACK / dropped | Rose | `#F43F5E` |
| Control frames / headers | Amber | `#F59E0B` |
| Physical medium (wire, radio) | Slate | `#475569` |
| Device icons (routers, switches) | Gray-900 | `#111827` |
| Highlights / hover | Orange | `#F97316` |

### Motion Tempo
- **Idle state:** 0.8–1.2 s loop, ease-in-out, subtle (opacity pulse or gentle float).
- **User-triggered events:** 300 ms ease-out for UI responses; no delay.
- **Packet travel:** 1.5–2.5 s along path. Speed may be adjusted by a slider.
- **Cascade animations** (e.g. headers being added per layer): 200 ms stagger between each layer card.
- **Error events:** Fast shake (200 ms, 3 cycles) then red glow fade-out.

### Interactivity Model
Every animation has three modes toggled by a tab bar:
1. **Watch** — auto-plays the full sequence with narration captions.
2. **Step** — "Next →" button advances one state at a time; current step is highlighted.
3. **Explore** — user can click any device/node/packet to inspect its state. No auto-play.

### Accessibility
- All animated paths have a **Pause** button and keyboard shortcut `Space`.
- Colour-blind safe: never rely on red/green alone — add icons (✓ ✕) and labels.
- Reduced-motion media query: replace motion with cross-fades and number counters.

---

## Module 1 — Introduction to Networks
**Difficulty:** Beginner  
**Duration:** ~3 hours  
**Goal:** Build a mental model of what a network is, why it exists, and how devices communicate at the highest level.

### Learning Objectives
By the end of this module, learners will be able to:
- Define a computer network and explain why they exist.
- Distinguish between LAN, WAN, MAN, and PAN with real-world examples.
- Identify the five major network topologies and their trade-offs.
- Explain the difference between a client and a server.
- Describe the concept of a protocol and why standardisation matters.

### Concepts

#### 1.1 What Is a Network?
A network is two or more devices that can exchange data. The internet is the largest network — it is a *network of networks*.

Key vocabulary: **node**, **link**, **bandwidth**, **latency**, **throughput**, **packet**.

#### 1.2 Types of Networks
| Type | Scope | Example |
|------|-------|---------|
| PAN | ~10 m | Bluetooth earphones ↔ phone |
| LAN | Building | Office Wi-Fi |
| MAN | City | Cable TV provider backbone |
| WAN | Country / global | The internet |

#### 1.3 Network Topologies

| Topology | Layout | Pros | Cons |
|----------|--------|------|------|
| Bus | Single shared cable | Simple, cheap | One break kills all |
| Ring | Circular chain | Equal access | One break kills all (unless dual-ring) |
| Star | Hub/switch at centre | Fault-isolated | Hub is single point of failure |
| Mesh | Every node connected | Highly redundant | Expensive, complex |
| Hybrid | Mix of above | Flexible | Complex |

#### 1.4 Client–Server vs Peer-to-Peer
- **Client–Server:** Centralised. Clients request; servers respond. Scales well. (HTTP, DNS)
- **Peer-to-Peer:** Decentralised. Every node is both client and server. (BitTorrent, blockchain)

#### 1.5 What Is a Protocol?
A protocol is a set of rules that define the format, timing, sequencing, and error checking for data exchange. Without protocols, a Windows PC and a Linux server couldn't talk. TCP/IP is the foundational protocol suite of the internet.

### Animation Specifications

#### Anim 1-A: "Network Types" Zoom Map
- Start with a **world map** rendered in SVG.
- Zoom in stages: Globe → Country → City → Building floor-plan → Desk.
- At each zoom level, animate the relevant network type label fading in with a radius circle.
- Clicking any circle shows a tooltip: real-world example + typical bandwidth.

#### Anim 1-B: Topology Builder (Interactive)
- A **canvas** with drag-and-drop nodes (laptops, represented as icons).
- User connects nodes by clicking and dragging from port to port.
- As the topology forms, a live sidebar updates: "Fault tolerance: LOW / MEDIUM / HIGH", "Cable usage: N links", "If node X fails: Y nodes disconnected".
- A **"Break a node"** button randomly removes one node and highlights the disconnected segment in rose.

#### Anim 1-C: First Packet Journey
- Simple two-device diagram (Laptop A → Laptop B) connected by a line.
- User types a message in a chat box on Laptop A.
- The message visually "wraps" into a violet packet and travels along the line to Laptop B.
- On arrival, it unwraps and appears as text on Laptop B's screen.
- Clicking the packet mid-travel pauses it and shows: Source, Destination, Payload (the message).

### Module 1 — Exit Quiz
- 10 MCQs covering topology trade-offs, network type identification, and protocol vocabulary.
- Pass threshold: 7/10.

---

## Module 2 — OSI & TCP/IP Models
**Difficulty:** Beginner → Intermediate  
**Duration:** ~5 hours  
**Goal:** Understand how the OSI and TCP/IP models structure network communication, and trace a real HTTP request through every layer.

### Learning Objectives
- Name and describe all 7 OSI layers and their responsibilities.
- Map the 4 TCP/IP layers to their OSI equivalents.
- Explain encapsulation and decapsulation.
- Trace an HTTP request from browser to server through every layer.
- Identify which layer a given protocol or device belongs to.

### Concepts

#### 2.1 The OSI Model (7 Layers)

| Layer | Name | Unit | Key Protocols & Devices | Mnemonic |
|-------|------|------|------------------------|----------|
| 7 | Application | Data | HTTP, FTP, DNS, SMTP | **A**ll |
| 6 | Presentation | Data | TLS, JPEG, ASCII | **P**eople |
| 5 | Session | Data | NetBIOS, RPC | **S**eem |
| 4 | Transport | Segment | TCP, UDP | **T**o |
| 3 | Network | Packet | IP, ICMP, routers | **N**eed |
| 2 | Data Link | Frame | Ethernet, MAC, switches | **D**ata |
| 1 | Physical | Bits | Cables, Wi-Fi, hubs | **P**rocessing |

Mnemonic (top-down): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

#### 2.2 Encapsulation
When data travels **down** the sender's stack, each layer *wraps* the data with its own header (and sometimes trailer). This is **encapsulation**.

```
Application:   [HTTP Header | HTTP Body]
Transport:     [TCP Header | HTTP Header | HTTP Body]
Network:       [IP Header | TCP Header | HTTP Header | HTTP Body]
Data Link:     [Eth Header | IP Header | TCP Header | HTTP Header | HTTP Body | Eth Trailer]
Physical:      01001101 01110010 ... (bits on the wire)
```

When data travels **up** the receiver's stack, each layer *strips* its header. This is **decapsulation**.

#### 2.3 TCP/IP Model (4 Layers)
| TCP/IP Layer | Equivalent OSI Layers |
|---|---|
| Application | 5 + 6 + 7 |
| Transport | 4 |
| Internet | 3 |
| Network Access | 1 + 2 |

The TCP/IP model is the *practical* model. OSI is the *conceptual* model. Real implementations use TCP/IP; OSI is used to understand and troubleshoot.

#### 2.4 PDU Names (Protocol Data Unit)
Each layer has a specific name for the data it handles:
- Application → **Message / Data**
- Transport → **Segment** (TCP) / **Datagram** (UDP)
- Network → **Packet**
- Data Link → **Frame**
- Physical → **Bits**

### Animation Specifications

#### Anim 2-A: OSI Stack — Encapsulation Visualizer (Core Animation)
- Render **two stacked columns** side by side: Sender (left) and Receiver (right).
- Each column has 7 layer cards, top to bottom, with the layer name and colour-coded.
- **Sending side:** a "message" block starts at Layer 7. On each step down, a new header block slides in from the left and attaches to the front of the data block. The block grows visually with each header addition. Label each header: "TCP Hdr", "IP Hdr", "Eth Hdr".
- The assembled frame then **travels as a single block** across a cable to the receiving side.
- **Receiving side:** as it moves up, headers are peeled away one at a time (slide off to the right and fade).
- Colour each header segment differently so users can track them across the journey.
- **Step mode:** user clicks "Next" to advance one layer. Current active layer glows.

#### Anim 2-B: "Which Layer Does This Belong To?" Drag Game
- Right side: a list of 12 items (HTTP, router, MAC address, TLS handshake, TCP port, Ethernet cable, etc.)
- Left side: 7 labelled layer buckets.
- User drags items to their layer. Correct = green check + brief explanation. Wrong = shake + correct layer highlighted.

#### Anim 2-C: Live HTTP Request Trace
- A browser URL bar at the top. User types `http://pandalearn.in` and presses Enter.
- An animated vertical stack trace shows the request passing through each OSI layer on the **sender** side, then the physical medium, then back up each layer on the **server** side.
- At each layer, a speech-bubble callout appears with a one-sentence description of what that layer is doing (e.g. "Layer 4 — TCP — splits the request into segments and numbers them").
- Time markers on a horizontal timeline at the bottom show relative layer processing time.

### Module 2 — Exit Quiz
- 15 questions: layer identification, encapsulation ordering, PDU naming.
- Pass threshold: 11/15.

---

## Module 3 — Data Link Layer
**Difficulty:** Intermediate  
**Duration:** ~4 hours  
**Goal:** Understand how data is transferred between adjacent nodes on a network — MAC addressing, Ethernet framing, ARP, and the role of switches.

### Learning Objectives
- Explain what a MAC address is and how it differs from an IP address.
- Describe the structure of an Ethernet frame.
- Trace an ARP request and response.
- Contrast hubs, bridges, and switches.
- Explain how a switch builds and uses its MAC address table.

### Concepts

#### 3.1 MAC Addresses
A Media Access Control (MAC) address is a **hardware** identifier burned into every NIC (Network Interface Card). It is 48 bits, written as six colon-separated hex pairs: `A4:C3:F0:85:7D:21`.

- First 24 bits = OUI (Organisationally Unique Identifier) — identifies the manufacturer.
- Last 24 bits = device-specific.
- MAC addresses are **local** — they don't route across the internet. IP addresses do.

#### 3.2 Ethernet Frame Structure
```
| Preamble (7B) | SFD (1B) | Dest MAC (6B) | Src MAC (6B) | EtherType (2B) | Payload (46–1500B) | FCS (4B) |
```
- **Preamble + SFD:** Synchronisation — tells the receiver "a frame is starting".
- **EtherType:** What's inside the payload? `0x0800` = IPv4, `0x86DD` = IPv6, `0x0806` = ARP.
- **FCS (Frame Check Sequence):** CRC checksum — detects transmission errors.
- **MTU (Maximum Transmission Unit):** 1500 bytes for standard Ethernet. Frames larger than this must be **fragmented**.

#### 3.3 ARP — Address Resolution Protocol
Problem: you know the IP address of a host, but you need its MAC address to send a frame.

ARP Process:
1. Host A broadcasts: *"Who has 192.168.1.5? Tell 192.168.1.1."*
2. Every device on the LAN receives it.
3. Host B (who has 192.168.1.5) replies unicast: *"192.168.1.5 is at AA:BB:CC:DD:EE:FF"*
4. Host A stores this in its **ARP cache** to avoid future broadcasts.

`arp -a` on any OS shows the current cache.

#### 3.4 Hubs vs Bridges vs Switches
| Device | Layer | Intelligence | Collision Domain |
|--------|-------|-------------|-----------------|
| Hub | 1 | None — floods all ports | One big domain |
| Bridge | 2 | Learns MACs, separates 2 segments | Per segment |
| Switch | 2 | Full MAC table, per-port forwarding | Per port |

#### 3.5 How a Switch Learns
1. Switch starts with an empty MAC table.
2. Frame arrives on port 3 from `AA:BB:...` — switch records: `AA:BB:... → Port 3`.
3. Destination MAC unknown? **Flood** all other ports.
4. Destination MAC known? **Forward** only to the correct port.
5. Entries expire after ~300 s (aging timer) to handle devices that move.

#### 3.6 VLANs (Virtual LANs)
A VLAN divides a single physical switch into multiple logical LANs. VLAN tagging (802.1Q) adds a 4-byte tag to frames. Traffic between VLANs requires a router (Layer 3).

### Animation Specifications

#### Anim 3-A: ARP Request & Response
- LAN diagram: 4 hosts + 1 switch. Host A highlighted as sender.
- Phase 1 — ARP Request: a **broadcast frame** (amber, dashed border) leaves A and fans out to all ports simultaneously. Label: "Who has 192.168.1.5?"
- Hosts B, C, D receive it — B, C, D show a brief "not me" fade.
- Phase 2 — ARP Reply: Host B sends a **unicast frame** (violet) directly back to A. Label shows "192.168.1.5 is at AA:BB:CC:..."
- Phase 3 — Cache: A small ARP table widget appears next to Host A and populates with the entry.
- **Replay button** re-runs with different IP to show cache hit (skips broadcast).

#### Anim 3-B: Switch MAC Table Builder
- Diagram: switch with 4 ports, each connected to a host (each host has a visible MAC address label).
- Switch has a **live MAC table** panel on the right: initially empty.
- User clicks "Send frame from A to D".
- Frame travels from A to switch. Switch checks table — empty, so floods to ports 2, 3, 4.
- Table updates: `MAC_A → Port 1`.
- D responds — frame travels to switch. Table updates: `MAC_D → Port 4`.
- User repeats with "A to D again" — this time the switch only sends to port 4. Ports 2 and 3 show a muted "blocked" indicator.
- **Aging demo slider:** dragging time forward fades out entries as TTL expires.

#### Anim 3-C: Ethernet Frame Dissector
- A physical cable rendered across the screen. A frame block travels along it.
- Clicking the frame **explodes** it into its fields. Each field card shows: name, size in bytes, hex value, and a plain-English description.
- FCS field has a **"Corrupt Frame"** button: flips a random bit in the payload, rerenders the CRC check, shows mismatch → frame dropped.

### Module 3 — Exit Quiz
- 12 questions: ARP sequence, switch forwarding logic, frame field identification, MAC vs IP.
- Pass threshold: 9/12.

---

## Module 4 — Network Layer & IP Addressing
**Difficulty:** Intermediate  
**Duration:** ~6 hours  
**Goal:** Master IP addressing (IPv4 + IPv6), subnetting, CIDR, routing tables, and how routers make forwarding decisions.

### Learning Objectives
- Convert between binary and decimal for IP addresses.
- Apply CIDR notation and calculate network/host ranges.
- Subnet a given address block into required sub-networks.
- Explain how a routing table makes forwarding decisions (longest prefix match).
- Describe NAT and its role in IPv4 address exhaustion.
- Understand IPv6 addressing and why the transition matters.

### Concepts

#### 4.1 IPv4 Addressing
An IPv4 address is 32 bits written as four decimal octets: `192.168.1.100`.

**Classes (historical — now superseded by CIDR):**
| Class | Range | Default Mask | Use |
|-------|-------|-------------|-----|
| A | 0.0.0.0 – 127.255.255.255 | /8 | Large organisations |
| B | 128.0.0.0 – 191.255.255.255 | /16 | Medium organisations |
| C | 192.0.0.0 – 223.255.255.255 | /24 | Small networks |
| D | 224.0.0.0 – 239.255.255.255 | — | Multicast |
| E | 240.0.0.0 – 255.255.255.255 | — | Reserved/Experimental |

**Private Ranges (RFC 1918):**
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

#### 4.2 Subnet Masks & CIDR
A subnet mask separates the **network** portion from the **host** portion.

`/24` means 24 bits for network → subnet mask `255.255.255.0` → 2⁸ - 2 = **254 usable hosts**.

**CIDR Calculation Formula:**
- Hosts = 2^(32 - prefix) - 2  (subtract network and broadcast addresses)
- Subnets from a block = 2^(bits borrowed)

Example: Split `192.168.1.0/24` into 4 equal subnets:
- Borrow 2 bits → `/26`
- Each subnet: 64 addresses, 62 usable
- Ranges: `.0–.63`, `.64–.127`, `.128–.191`, `.192–.255`

#### 4.3 Special Addresses
| Address | Purpose |
|---------|---------|
| `0.0.0.0` | "This host" / default route |
| `127.0.0.1` | Loopback (localhost) |
| `255.255.255.255` | Limited broadcast |
| `x.x.x.0` | Network address |
| `x.x.x.255` (in /24) | Directed broadcast |
| `169.254.x.x` | APIPA — link-local (DHCP failure) |

#### 4.4 Routing & Routing Tables
A router maintains a **routing table**: a list of network prefixes and next-hop instructions.

```
Destination      Mask            Next Hop     Interface
192.168.1.0      255.255.255.0   0.0.0.0      eth0  (directly connected)
10.0.0.0         255.0.0.0       192.168.1.1  eth1
0.0.0.0          0.0.0.0         203.0.113.1  eth2  (default route)
```

**Longest Prefix Match:** when multiple routes match a destination, the router picks the most specific (longest prefix). `192.168.1.50` matches both `/24` and `/8` — the `/24` wins.

#### 4.5 Routing Protocols
| Protocol | Type | Algorithm | Use Case |
|----------|------|-----------|----------|
| RIP | Distance-vector | Bellman-Ford | Small, legacy networks |
| OSPF | Link-state | Dijkstra | Enterprise intra-domain |
| BGP | Path-vector | Best-path selection | Internet inter-domain |

#### 4.6 NAT (Network Address Translation)
Problem: 4 billion IPv4 addresses aren't enough for 15+ billion devices.

Solution: NAT allows many private IP addresses to share a single public IP.

NAT table maps `(private IP, private port) ↔ (public IP, public port)`. The router rewrites IP/port headers on every packet.

Types:
- **Static NAT:** one-to-one mapping.
- **Dynamic NAT:** pool of public IPs.
- **PAT / NAT Overload (most common):** many-to-one using port numbers.

#### 4.7 IPv6
IPv6 is 128 bits, written as 8 groups of 4 hex digits: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.

Simplification rules:
- Leading zeros in a group can be omitted.
- One sequence of consecutive all-zero groups can be replaced with `::`.

Key differences from IPv4:
- No broadcast (replaced by multicast and anycast).
- Built-in IPSec support.
- Stateless Address Autoconfiguration (SLAAC).
- No need for NAT.

### Animation Specifications

#### Anim 4-A: Binary ↔ Decimal IP Converter
- IP address displayed as 4 groups of 8 toggle-bit sliders.
- Toggling a bit updates decimal and binary in real time.
- A subnet mask slider (CIDR /0 to /32) shades the network bits (violet) vs host bits (gray).
- Clicking "Calculate" shows: network address, broadcast address, first host, last host, number of hosts — all animated counter-up.

#### Anim 4-B: Subnetting Visualizer
- Input field: any IPv4 network in CIDR notation.
- Drag a "split" slider to borrow bits — the address block visually **divides** into sub-blocks on a bar chart.
- Each sub-block is clickable to reveal its range.
- A "Use case" mode maps subnets to labelled rooms (HR, Engineering, Guest).

#### Anim 4-C: Routing Table Simulator
- Topology: 4 routers in a mesh. Each router has a visible routing table panel.
- User clicks a source host and a destination IP.
- The packet spawns and at each router, the routing table **highlights the matching row** (green) before the packet moves to the next hop.
- "Add a route" button lets user inject a static route and watch it change the path.
- "Break a link" removes an interface — routing table updates, new path is found.

#### Anim 4-D: NAT in Action
- Left: private network (3 hosts, IPs `192.168.1.x`).
- Right: internet with a remote server.
- Centre: router with a live **NAT table** panel.
- User triggers HTTP requests from each host. NAT table populates with entries.
- Return packets arrive — router consults table, rewrites headers, delivers to correct host.
- Clicking any packet shows before/after header comparison side-by-side.

### Module 4 — Exit Quiz
- 20 questions: subnetting calculations (5 numeric), routing table lookups (5), concept MCQs (10).
- Pass threshold: 14/20.

---

## Module 5 — Transport Layer: TCP & UDP
**Difficulty:** Intermediate  
**Duration:** ~6 hours  
**Goal:** Understand how TCP provides reliable, ordered delivery and how UDP provides fast, connectionless delivery. Master the 3-way handshake, flow control, and congestion control.

### Learning Objectives
- Explain TCP's reliability mechanisms: sequence numbers, acknowledgements, retransmission.
- Trace the TCP 3-way handshake and 4-way teardown.
- Describe TCP flow control (sliding window) and congestion control (slow start, AIMD).
- Explain when UDP is the right choice over TCP.
- Identify well-known ports and how port multiplexing enables multiple services on one host.

### Concepts

#### 5.1 Port Numbers
Ports allow a single IP to run multiple services simultaneously.

| Range | Name | Example |
|-------|------|---------|
| 0–1023 | Well-known | HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25 |
| 1024–49151 | Registered | MySQL=3306, Redis=6379, PostgreSQL=5432 |
| 49152–65535 | Dynamic / Ephemeral | Client-side ports assigned per connection |

A **socket** = IP + Port + Protocol. A connection = two sockets (client socket ↔ server socket).

#### 5.2 TCP — Transmission Control Protocol
TCP is **connection-oriented**, **reliable**, **ordered**, and **error-checked**.

**TCP Segment Header (key fields):**
- Source Port / Destination Port
- Sequence Number (which byte this segment starts with)
- Acknowledgement Number (next byte expected)
- Flags: SYN, ACK, FIN, RST, PSH, URG
- Window Size (flow control)
- Checksum

#### 5.3 TCP 3-Way Handshake (Connection Establishment)
```
Client                          Server
  |                               |
  |——— SYN (seq=x) ——————————————>|   "I want to connect"
  |                               |
  |<—— SYN-ACK (seq=y, ack=x+1) ——|   "OK, I'm ready"
  |                               |
  |——— ACK (ack=y+1) ————————————>|   "Great, let's go"
  |                               |
  |         DATA TRANSFER         |
```
**Why 3 steps?** Both parties must confirm they can *send* and *receive*.

#### 5.4 TCP 4-Way Teardown (Connection Termination)
```
Client                          Server
  |——— FIN ————————————————————>|    "I'm done sending"
  |<——— ACK ————————————————————|    "Got it"
  |<——— FIN ————————————————————|    "I'm done too"
  |——— ACK ————————————————————>|    "Goodbye"
  |    (TIME_WAIT: 2×MSL)        |
```
**TIME_WAIT** ensures the final ACK reaches the server before the port is reused.

#### 5.5 Sequence Numbers & Acknowledgements
TCP numbers every **byte** (not segment). If a segment is lost, only that segment is retransmitted, not the whole stream.

**Cumulative ACK:** ACK=1001 means "I've received everything up to byte 1000; send 1001 next."

**Retransmission Timeout (RTO):** if ACK not received within RTO, segment is resent. RTO is dynamically calculated using RTT (Round-Trip Time).

**Fast Retransmit:** if 3 duplicate ACKs are received, retransmit immediately without waiting for RTO.

#### 5.6 Flow Control — Sliding Window
The receiver advertises a **window size** (how many bytes it can buffer). The sender may not have more than `window_size` unacknowledged bytes in flight.

If the receiver's buffer fills up → `window = 0` → sender pauses → **Zero Window Probe** keeps the connection alive.

#### 5.7 Congestion Control
The network can be overwhelmed independently of the receiver's buffer. TCP uses four algorithms:

1. **Slow Start:** begin with `cwnd = 1 MSS`. Double `cwnd` every RTT until `ssthresh`.
2. **Congestion Avoidance:** once `cwnd ≥ ssthresh`, grow by 1 MSS per RTT (linear).
3. **Fast Retransmit + Fast Recovery:** on 3 duplicate ACKs: `ssthresh = cwnd/2`, skip slow start.
4. **AIMD (Additive Increase, Multiplicative Decrease):** on timeout: `ssthresh = cwnd/2`, `cwnd = 1`.

#### 5.8 UDP — User Datagram Protocol
UDP is **connectionless**, **unreliable**, and **unordered** — but extremely **fast**.

UDP header is only 8 bytes (vs TCP's 20+). No handshake, no retransmission, no ordering.

**When to use UDP:**
- Real-time media: video calls, gaming, live streaming (latency > reliability).
- DNS lookups (simple request-response; retry handled by application).
- DHCP.
- QUIC (HTTP/3) — implements reliability *on top of* UDP in userspace.

#### 5.9 TCP vs UDP Summary
| Property | TCP | UDP |
|----------|-----|-----|
| Connection | Yes (3-way handshake) | No |
| Reliability | Guaranteed delivery | Best effort |
| Order | Maintained | Not guaranteed |
| Speed | Slower (overhead) | Faster |
| Use cases | HTTP, SSH, email, file transfer | DNS, VoIP, video, gaming |

### Animation Specifications

#### Anim 5-A: 3-Way Handshake Step-by-Step
- Split screen: Client (left), Server (right). Timeline flows top-to-bottom.
- Three animated arrows: SYN, SYN-ACK, ACK. Each arrow shows the segment header fields.
- Alongside each arrow: a state-machine diagram updates (CLOSED → SYN_SENT → ESTABLISHED).
- After handshake: a "Send data" demo — packets flow, ACKs return.
- **"Simulate dropped SYN"** button: SYN disappears mid-travel, timeout timer counts down, retransmission fires automatically.

#### Anim 5-B: Sliding Window Visualizer
- Sender side: a horizontal bar representing the byte stream. Divided into 4 zones with coloured segments:
  - Sent & Acknowledged (gray)
  - Sent, Not Yet Acknowledged (violet)
  - Can Send (window, blue)
  - Cannot Send Yet (light gray)
- A **window-size slider** lets users shrink/expand the window. The zones animate accordingly.
- "Receive ACK" button advances the window right.
- "Fill receiver buffer" reduces window to 0 — sender halts, probe fires after 1 s.

#### Anim 5-C: Congestion Control Graph
- X-axis: RTT count (time). Y-axis: cwnd (congestion window size, in MSS).
- Watch the graph draw in real time as the algorithm runs:
  - Slow start: exponential curve up.
  - Congestion avoidance: linear growth.
  - Triple dup ACK event: half-drop, Fast Recovery line.
  - Timeout event: drop to 1.
- **Event injection buttons:** "Simulate packet loss", "Simulate triple dup ACK", "Simulate timeout". Each updates the graph live.
- Toggle between **TCP Tahoe**, **Reno**, and **CUBIC** to compare algorithms on the same graph.

#### Anim 5-D: TCP vs UDP Side-by-Side Race
- Same file transfer (100 packets) shown twice: TCP (left) and UDP (right).
- TCP: packets numbered, ACKs return, one lost packet causes visible pause + retransmit.
- UDP: all packets fire immediately, no ACKs, one packet silently disappears.
- At the end: delivery report — TCP: 100/100. UDP: 97/100 (3 lost). Latency comparison shown.

### Module 5 — Exit Quiz
- 18 questions: handshake ordering, window calculations, congestion control states, TCP vs UDP scenarios.
- Pass threshold: 13/18.

---

## Module 6 — Application Layer Protocols
**Difficulty:** Intermediate → Advanced  
**Duration:** ~6 hours  
**Goal:** Understand the protocols applications rely on — HTTP/HTTPS, DNS, DHCP — and compare API paradigms (REST, GraphQL, gRPC).

### Learning Objectives
- Trace a full HTTP/HTTPS request-response cycle.
- Describe TLS handshake and the role of certificates.
- Trace a recursive DNS resolution from browser to root servers.
- Explain DHCP DORA process.
- Compare REST, GraphQL, and gRPC.

### Concepts

#### 6.1 HTTP — HyperText Transfer Protocol

**HTTP Request structure:**
```
GET /api/modules HTTP/1.1
Host: pandalearn.in
Accept: application/json
Authorization: Bearer eyJ...
```

**HTTP Response structure:**
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 348

{"modules": [...]}
```

**HTTP Methods:**
| Method | Purpose | Idempotent? | Safe? |
|--------|---------|------------|-------|
| GET | Retrieve resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Replace resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Remove resource | Yes | No |
| HEAD | Headers only | Yes | Yes |
| OPTIONS | CORS preflight | Yes | Yes |

**HTTP Status Codes:**
| Range | Category | Examples |
|-------|----------|---------|
| 1xx | Informational | 100 Continue |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

#### 6.2 HTTP Versions
| Version | Key Features |
|---------|-------------|
| HTTP/1.0 | New connection per request |
| HTTP/1.1 | Persistent connections, pipelining, `Keep-Alive` |
| HTTP/2 | Multiplexing, header compression (HPACK), server push, binary framing |
| HTTP/3 | Runs over QUIC (UDP), no head-of-line blocking, built-in TLS 1.3 |

#### 6.3 HTTPS & TLS
TLS (Transport Layer Security) provides: **Confidentiality** (encryption), **Integrity** (MACs), and **Authentication** (certificates).

**TLS 1.3 Handshake (simplified):**
1. Client → `ClientHello` (TLS version, cipher suites, random).
2. Server → `ServerHello` + Certificate + `ServerFinished`.
3. Client validates certificate against CA chain.
4. Client → key share → both sides derive session keys.
5. Encrypted data transfer begins.

TLS 1.3 reduces handshake to **1 RTT** (TLS 1.2 needed 2 RTTs). With **0-RTT resumption**, a returning client can send data before the handshake completes.

**Certificate Chain:** Site cert → Intermediate CA → Root CA. Browsers ship with trusted Root CA lists.

#### 6.4 DNS — Domain Name System
DNS is the internet's phone book: translates `pandalearn.in` → `203.0.113.42`.

**Record types:**
| Type | Purpose | Example |
|------|---------|---------|
| A | IPv4 address | `pandalearn.in → 203.0.113.42` |
| AAAA | IPv6 address | `pandalearn.in → 2001:db8::1` |
| CNAME | Alias to another name | `www → pandalearn.in` |
| MX | Mail server | `pandalearn.in → mail.google.com` |
| TXT | Arbitrary text (SPF, DKIM) | `"v=spf1 include:google.com"` |
| NS | Authoritative nameservers | `pandalearn.in → ns1.cloudflare.com` |
| SOA | Zone authority | Start-of-authority record |

**Recursive Resolution Flow:**
1. Browser checks its DNS cache.
2. OS resolves via stub resolver → queries **Recursive Resolver** (ISP or 8.8.8.8).
3. Resolver asks **Root Nameserver** (13 root clusters globally): "Who knows about `.in`?"
4. Root refers to **TLD Nameserver** for `.in`.
5. TLD refers to **Authoritative Nameserver** for `pandalearn.in`.
6. Authoritative returns the A record.
7. Resolver caches per TTL, returns to browser.

Total: typically 3–5 hops, ~50–200 ms uncached, <5 ms cached.

#### 6.5 DHCP — Dynamic Host Configuration Protocol
DHCP automatically assigns IP configuration to devices when they join a network.

**DORA Process:**
1. **D**iscover — client broadcasts: "Is there a DHCP server?"
2. **O**ffer — server unicasts: "I offer you 192.168.1.50 for 24 hours."
3. **R**equest — client broadcasts: "I'd like 192.168.1.50 please." (broadcasts to notify other servers)
4. **A**cknowledge — server: "It's yours. Here are also: gateway, DNS server, subnet mask."

**DHCP Lease:** the IP is temporary. Client must renew before expiry (T1 = 50% of lease, T2 = 87.5%).

#### 6.6 REST vs GraphQL vs gRPC

| Dimension | REST | GraphQL | gRPC |
|-----------|------|---------|------|
| Protocol | HTTP/1.1 or 2 | HTTP/1.1 or 2 | HTTP/2 |
| Format | JSON / XML | JSON | Protocol Buffers (binary) |
| Fetching | Multiple endpoints | Single endpoint | Generated methods |
| Over-fetching | Common | None (client specifies fields) | None |
| Under-fetching | Common (N+1) | None | None |
| Real-time | WebSockets / SSE | Subscriptions | Streaming |
| Type safety | OpenAPI/Swagger | Schema introspection | Proto schema |
| Best for | Public APIs, simple CRUD | Complex graphs, mobile | Microservices, performance |

#### 6.7 WebSockets
HTTP is request-response — the server can't push data unsolicited. WebSockets upgrade an HTTP connection to a **full-duplex** persistent channel.

Handshake:
```
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

After this, the connection is bidirectional — no HTTP overhead per message. Used in: chat, live scores, collaborative editors, stock tickers.

**Alternatives:** Server-Sent Events (SSE) for server→client only push; long polling for legacy.

### Animation Specifications

#### Anim 6-A: Full HTTP Request Lifecycle
- Browser address bar at top; server rack at bottom.
- Typing a URL and pressing Enter triggers the full flow:
  1. DNS lookup (arrow to DNS server, response with IP).
  2. TCP 3-way handshake.
  3. TLS handshake (compressed to 3 animated steps with a padlock icon appearing).
  4. HTTP GET request (violet packet travels down).
  5. Server processes and returns HTTP 200 with JSON.
  6. Connection keep-alive or close.
- A **timeline bar** at the bottom shows all these phases as colour-coded blocks with duration labels. Mirrors what DevTools "Waterfall" looks like.
- Clicking any phase expands it for detail.

#### Anim 6-B: DNS Resolution Tracer
- World map with labelled nodes: Browser, Recursive Resolver, Root NS, TLD NS (.in), Authoritative NS.
- User types `pandalearn.in` and hits Enter.
- Arrows travel between nodes in sequence. Each hop is numbered (1–7).
- Response arrows return along the same path.
- A **cache hit demo:** run resolution twice — second time, the arrow goes only to resolver (cached). TTL timer visible.
- **"Change TTL" slider:** show how short TTL = more queries, long TTL = stale records.

#### Anim 6-C: DHCP DORA Visualizer
- LAN with one new device (shown as dashed — no IP), one DHCP server, and two other assigned hosts.
- DISCOVER: broadcast burst (amber) from new device to all.
- OFFER: arrow from server with IP offer callout.
- REQUEST: broadcast from new device (confirming it wants that offer).
- ACK: server sends config packet. New device gets solid border + IP label.
- A lease clock appears with renew/expire timeline.

#### Anim 6-D: REST vs GraphQL Request Comparison
- Same use case: "Get a user's name and their last 3 posts' titles."
- Left panel (REST): shows 2 requests — `GET /users/42` (returns 20 fields) + `GET /users/42/posts` (returns full post objects). Unused fields greyed out. Byte count shown.
- Right panel (GraphQL): shows 1 request with the exact query. Response contains only the 3 fields requested. Byte count shown (30–60% less).
- Sliders to adjust: "Number of fields fetched", "Number of posts". Both panels update byte counts dynamically.

#### Anim 6-E: WebSocket vs HTTP Polling
- Split screen: HTTP polling (left) vs WebSocket (right). Shared live counter updating every second.
- Left: HTTP request-response pairs fire every 1 s — wasted empty responses shown as gray "nothing new" packets.
- Right: single handshake, then only actual update packets travel.
- Byte counter tracks total data transferred over 30 simulated seconds. WebSocket wins by >70%.

### Module 6 — Exit Quiz
- 20 questions: HTTP methods, status codes, DNS record types, DHCP sequence, API comparisons.
- Pass threshold: 14/20.

---

## Module 7 — Network Infrastructure
**Difficulty:** Advanced  
**Duration:** ~5 hours  
**Goal:** Understand how large-scale internet infrastructure works — CDNs, load balancers, reverse proxies, and the BGP routing that holds the internet together.

### Learning Objectives
- Explain how a CDN reduces latency and origin load.
- Describe load balancing algorithms (round-robin, least connections, IP hash, weighted).
- Distinguish forward proxy, reverse proxy, and CDN.
- Explain BGP's role in inter-domain routing and the risks of BGP hijacking.
- Understand Anycast addressing.

### Concepts

#### 7.1 Content Delivery Networks (CDNs)
A CDN is a globally distributed network of **edge servers** that cache static content close to users.

**How it works:**
1. DNS for `pandalearn.in` is delegated to the CDN's nameservers.
2. CDN's DNS returns the IP of the nearest edge server based on the client's location (Anycast or geolocation-based).
3. Edge serves cached content (CSS, JS, images) directly.
4. On cache miss (or for dynamic content), edge forwards to the origin server (**cache miss → origin pull**).
5. Edge caches the response per `Cache-Control` / `CDN-Cache-Control` headers.

**Cache hit ratio** is the primary metric. Modern CDNs achieve >90% for static assets.

**CDN Providers:** Cloudflare, Fastly, AWS CloudFront, Akamai.

#### 7.2 Load Balancing

Load balancers distribute traffic across multiple backend servers.

**Algorithms:**
| Algorithm | Description | Best for |
|-----------|------------|---------|
| Round Robin | Distribute sequentially | Equal-capacity servers |
| Weighted Round Robin | More traffic to higher-capacity | Heterogeneous servers |
| Least Connections | Route to server with fewest active connections | Variable request durations |
| IP Hash | Same client → same server (session affinity) | Stateful apps without shared sessions |
| Random | Random server | Simple, equal capacity |

**Layer 4 vs Layer 7 Load Balancing:**
- **L4 (Transport):** Routes based on IP/port. Fast, no HTTP awareness. Cannot route based on URL path or headers.
- **L7 (Application):** Can route based on URL, headers, cookies. Enables A/B testing, canary deployments, and content-based routing.

**Health Checks:** LB continuously probes backends. Unhealthy server removed from rotation automatically.

#### 7.3 Reverse Proxy
A **reverse proxy** sits in front of one or more backend servers and intercepts all incoming requests.

Functions: TLS termination, caching, compression, rate limiting, authentication, WAF.

**Forward proxy** vs **Reverse proxy:**
- Forward proxy: client-side (e.g. corporate proxy hiding internal users).
- Reverse proxy: server-side (e.g. Nginx hiding backend servers from clients).

#### 7.4 BGP — Border Gateway Protocol
BGP is the routing protocol that connects Autonomous Systems (AS) on the internet.

- An **AS** (Autonomous System) is a network under a single administrative domain (ISP, cloud provider, large enterprise). Each AS has an **ASN** (AS Number).
- BGP peers (neighbours) exchange **prefixes** they can reach, along with **AS paths**.
- BGP selects the best path using a sequence of tie-breaking attributes: Local Preference → AS Path Length → MED → IGP cost → Router ID.

**BGP Hijacking:** a malicious or misconfigured AS announces a more-specific prefix for IPs it doesn't own. Traffic gets redirected. Real incidents: Pakistan Telecom hijacked YouTube in 2008; MyEtherWallet hack in 2018.

**RPKI (Resource Public Key Infrastructure):** cryptographically validates that an AS is authorised to announce a prefix. Mitigates route hijacking.

#### 7.5 Anycast
The same IP address is announced from multiple locations. Packets are routed to the topologically **nearest** instance.

Used by: DNS root servers (13 IPs → hundreds of physical servers), Cloudflare's `1.1.1.1`, CDN edge nodes.

### Animation Specifications

#### Anim 7-A: CDN Cache Miss vs Hit
- World map with an origin server (India), 5 edge PoPs (US, Europe, Singapore, Tokyo, Brazil).
- User 1 from Brazil requests `pandalearn.in/hero.jpg` → cache miss → arrow travels all the way to India origin → response cached at Brazil PoP.
- User 2 from Brazil requests same file → cache hit → served instantly from Brazil PoP.
- Latency counter: cache miss = 280 ms, cache hit = 12 ms.
- TTL and cache-fill animations for the edge node.

#### Anim 7-B: Load Balancer Algorithm Playground
- 3 backend servers shown as boxes with a capacity bar (connections/sec).
- Client requests fire at a configurable rate (slider: 1–20 req/s).
- Toggle between algorithms. Watch traffic distribution visually change.
- **Least Connections demo:** make Server 2 slower (slider) — algorithm automatically reduces its share.
- **"Kill a server" button:** server 2 goes dark, requests redistribute to 1 and 3.

#### Anim 7-C: BGP Path Visualisation
- Simplified internet topology: 8 ASes with peering links.
- Each AS has labelled prefixes.
- User selects source AS and destination prefix. BGP path is highlighted step-by-step.
- **"Inject a hijack"** button: a rogue AS announces a more-specific prefix. The path changes to route through the rogue AS. Alert banner: "BGP Hijack Detected".
- RPKI mode: toggle on → hijack blocked, path stays correct.

### Module 7 — Exit Quiz
- 15 questions: CDN mechanics, LB algorithm selection, L4 vs L7, BGP attributes.
- Pass threshold: 11/15.

---

## Module 8 — Network Security & Modern Patterns
**Difficulty:** Advanced  
**Duration:** ~5 hours  
**Goal:** Understand how attackers exploit networks and how defenders protect them — firewalls, DDoS mitigation, VPNs, zero trust — plus modern patterns like service meshes.

### Learning Objectives
- Explain how common attacks work: DDoS, ARP spoofing, DNS poisoning, MITM, port scanning.
- Describe how firewalls (stateful vs stateless), IDS/IPS, and WAFs defend networks.
- Trace a VPN connection (TLS-based and WireGuard).
- Explain the Zero Trust model and its principles.
- Describe service meshes (Istio/Envoy) and their role in microservice networking.

### Concepts

#### 8.1 Common Network Attacks

**DDoS (Distributed Denial of Service):**
Overwhelm a target with traffic from thousands of compromised hosts (botnet). Types:
- **Volumetric:** flood with packets (UDP flood, ICMP flood).
- **Protocol:** exploit TCP state (SYN flood — server keeps half-open connections until table fills).
- **Application layer (L7):** HTTP GET flood — looks like legitimate traffic.

Mitigation: scrubbing centres, rate limiting, anycast black-holing, Cloudflare Magic Transit.

**ARP Spoofing:**
Attacker sends unsolicited ARP replies claiming to be the gateway. All traffic routes through the attacker (MITM). Mitigations: dynamic ARP inspection (DAI), static ARP entries.

**DNS Poisoning / Cache Poisoning:**
Inject false DNS records into a resolver's cache. Users directed to attacker-controlled IPs. Mitigation: DNSSEC (cryptographic signatures on DNS records).

**SYN Flood:**
Send SYN packets with spoofed source IPs. Server allocates state for each half-open connection. Backlog fills. Mitigation: SYN cookies (server doesn't allocate state until ACK received).

**Port Scanning (Reconnaissance):**
Attacker probes which ports are open (nmap). Stealth scan (SYN scan) sends SYN, reads SYN-ACK vs RST, never completes the handshake. Mitigation: firewalls, fail2ban, IDS alerts.

#### 8.2 Firewalls
A firewall enforces a policy of what traffic is allowed in/out.

| Type | Inspects | State | Example |
|------|---------|-------|---------|
| Packet filter | IP, port, protocol | Stateless | `iptables` basic rules |
| Stateful | + TCP connection state | Stateful | Most enterprise firewalls |
| Application / L7 | HTTP headers, payload, certificates | Stateful | WAF, Cloudflare |
| NGFW | Deep packet inspection, IDS/IPS, app ID | Stateful | Palo Alto, Fortinet |

**Firewall rule evaluation:** rules are evaluated top-down; first match wins. Default policy is typically `DENY`.

#### 8.3 VPN — Virtual Private Network
VPN creates an encrypted tunnel over a public network.

**TLS-based VPN (e.g. OpenVPN):**
- Client authenticates with certificate.
- TLS handshake establishes session keys.
- All traffic encapsulated in TLS records sent over TCP/UDP.

**WireGuard (modern, minimal):**
- Based on ChaCha20-Poly1305 encryption, Curve25519 key exchange.
- ~4,000 lines of code (vs ~100k for OpenVPN) — smaller attack surface.
- Cryptokey routing: each peer identified by public key, no certificate infrastructure.
- Stateless by design — if endpoint changes IP, tunnel recovers silently.

#### 8.4 Zero Trust Architecture
Traditional model: trust everything inside the perimeter. Zero Trust: **"never trust, always verify"**.

Principles:
1. Verify every user, every device, every request — regardless of network location.
2. Least-privilege access — grant minimum necessary permissions.
3. Assume breach — limit blast radius with micro-segmentation.
4. Continuous verification — re-authenticate periodically, not just at login.

Implementation: Identity provider (Okta, Azure AD) + Device posture checks + mTLS between services + policy engine (OPA).

#### 8.5 Service Mesh
In microservices, every service-to-service call is a network call. A service mesh (Istio, Linkerd) injects a **sidecar proxy** (Envoy) alongside each service.

Sidecar handles: mTLS between services, load balancing, retries, circuit breaking, observability (metrics, traces), traffic shaping (canary, A/B).

**Control Plane** (Istio Pilot): pushes routing policy to all sidecars.  
**Data Plane** (Envoy proxies): executes the policy on every request.

The service no longer needs to implement its own retry/auth logic — the mesh handles it transparently.

### Animation Specifications

#### Anim 8-A: SYN Flood Attack Visualiser
- Server with a visible **connection table** (finite slots shown as a grid).
- Attacker (off-screen) begins firing SYN packets from random source IPs.
- Each SYN fills a slot in the table (half-open, shown in amber).
- Table fills up → new legitimate client's SYN shown as rose → "Connection refused".
- **SYN Cookie Mode:** toggle on. Server now shows no table entries filling. Legitimate client's connection proceeds normally. Attacker SYNs silently discarded.

#### Anim 8-B: ARP Spoofing Attack
- 3 hosts on a LAN: Victim, Gateway, Attacker.
- Normal mode: Victim → ARP table shows Gateway = correct MAC.
- Attack starts: Attacker sends forged ARP reply "Gateway is me" to Victim. Victim's ARP table updates to attacker's MAC.
- All of Victim's packets now route to Attacker first (MITM). Packet labels show: "Victim thinks this goes to Gateway → actually goes to Attacker".
- **DAI enabled:** attacker's ARP reply hits the switch, switch checks DHCP snooping table, drops the packet, alerts fire.

#### Anim 8-C: Zero Trust vs Perimeter Model
- Side-by-side comparison.
- Left (Perimeter): hard outer wall, once inside the wall all services trusted. An insider threat / VPN compromise = full access.
- Right (Zero Trust): no outer wall. Every request carries identity token. Each service has its own policy gate. Even if one service is compromised, blast radius is contained.
- "Simulate breach" button: in perimeter model, breach cascades across all services. In Zero Trust, breach is isolated.

#### Anim 8-D: Service Mesh Traffic Flow
- 3 microservices: API Gateway → Auth Service → DB Service.
- Without mesh: each arrow is plain HTTP, no encryption labels.
- Enable mesh: Envoy sidecar icons appear beside each pod. mTLS lock icons appear on every connection. Retry counter shows automatic retry on a failed request.
- Circuit breaker demo: DB Service starts failing. After 5 failures, Envoy opens the circuit (red broken-circuit icon) — requests fail fast instead of queuing. After 30 s, half-open probe sent — DB recovers, circuit closes.

### Module 8 — Exit Quiz
- 15 questions: attack identification, firewall rule analysis, VPN comparison, zero trust principles.
- Pass threshold: 11/15.

---

## Assessment Strategy

### In-Module Checkpoints
- Every 2–3 concepts: a **1-question micro-check** (no penalty, just prompts reflection).
- Immediate feedback with explanation — not just "incorrect", but why.

### Module Exit Quiz
- Minimum 70% to unlock next module.
- Two retake attempts allowed per 24 hours.
- Wrong-answer explanations reference the exact concept card.

### Subject Final Exam
- 50 questions covering all 8 modules.
- Timed: 90 minutes.
- Includes 5 scenario-based questions ("Given this network topology, which router receives this packet and what does it do next?").
- Score ≥ 80% = **Computer Networks Completion Certificate**.

### Adaptive AI Tutor Triggers
The AI tutor is automatically surfaced when:
- A learner fails a checkpoint question twice.
- A learner spends > 3 minutes on a concept card without advancing.
- A learner fails an exit quiz.

The tutor prompt includes: current module, failed concept ID, and the learner's previous answer — so responses are contextual, not generic.

---

## Content Quality Standards

### Writing Style
- **Second person, present tense.** ("The router checks its table" not "Routers will check their tables".)
- **Concrete before abstract.** Introduce the problem first, then the solution.
- **No passive voice in explanations.** ("TCP sends an ACK" not "An ACK is sent by TCP".)
- Maximum concept card length: **180 words**. Long explanations are split into progressive reveal.

### Diagram Standards
- All diagrams use the **Global Colour System** above — no ad-hoc colours.
- Minimum touch target size on mobile: 44×44 px.
- Every diagram has an **alt text** description for screen readers.
- SVG preferred over PNG for all diagrams (sharp on all densities).

### Animation Quality Gates
Before any animation ships, it must pass:
- [ ] Plays correctly at 0.5×, 1×, and 2× speed.
- [ ] Step mode pauses at every meaningful state.
- [ ] Pause button works at any point.
- [ ] Colour-blind mode tested (deuteranopia simulation).
- [ ] Reduced-motion variant exists.
- [ ] Mobile: touch targets ≥ 44 px. Pinch-to-zoom doesn't break the layout.
- [ ] AI tutor can reference the animation by ID (`anim-5-a`) in its answers.

---

*Specification version: 1.0 — May 2026*  
*Curriculum owner: PandaLearn Engineering Team*  
*Review cadence: each animation reviewed after first 500 learner completions using heatmap + drop-off data.*
