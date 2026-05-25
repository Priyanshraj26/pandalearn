# PandaLearn · CBSE AI Class IX Module
## Project Brief — CBSE Subject Code 417 · Session 2026-2027

> **How to use this file:** Read top-to-bottom once to orient, then jump to the phase you are building.
> Route: `/learn/cbse-ai-class9/`   Design authority: CBSE orange (`#f97316`) + violet (`#7c3aed`) branding.

---

## 1. Official CBSE Syllabus (Subject Code 417)

**Total: 100 marks — Theory 50 + Practical 50**

### Exam Pattern
| Part | Name | Marks |
|---|---|---|
| Part A | Employability Skills | 10 |
| Part B | Subject Specific (Theory) | 40 |
| Part C | Practical Work | 35 |
| Part D | Project Work / Portfolio | 15 |

### Curriculum Structure

#### Unit 1 — AI Reflection, Project Cycle & Ethics
**Hours:** 30 Theory + 25 Practical = 55h | **Marks:** 10M

| # | Learning Outcome |
|---|---|
| 1 | Identify and appreciate AI and describe its applications in daily life |
| 2 | Recognise the three domains of AI: Computer Vision, Data Statistics, and NLP |
| 3 | Identify the AI Project Cycle framework (Problem Scoping → Data → Modeling → Evaluation → Deployment) |
| 4 | Learn problem scoping and the 4Ws Problem Canvas |
| 5 | Brainstorm ethical issues around a selected AI problem |
| 6 | Understand AI bias and AI access; describe potential ethical considerations |
| 7 | Analyse advantages and disadvantages of Artificial Intelligence |

**CBSE Activities (must mirror):**
- 4Ws Problem Canvas activity
- Confusion Matrix building exercise
- Balloon Debate / Ethics Roleplay (stakeholder perspectives)
- AI Project Cycle mini-project

---

#### Unit 2 — Data Literacy
**Hours:** 22 Theory + 28 Practical = 50h | **Marks:** 10M

| # | Learning Outcome |
|---|---|
| 1 | Describe types of data: structured vs unstructured, primary vs secondary |
| 2 | Find, acquire, and evaluate data from reliable sources |
| 3 | Process and clean data (handle missing values, outliers) |
| 4 | Visualise data using appropriate chart types (bar, pie, scatter, line, histogram) |
| 5 | Use Tableau or similar tools for data dashboards |
| 6 | Understand data privacy, consent, and ethical data use |
| 7 | Interpret patterns and trends from visualisations |

**CBSE Activities:**
- Data collection and annotation activity
- Create a visualisation dashboard in Tableau
- Analyse a real dataset (e.g., NITI Aayog data portal)
- Data cleaning exercise

---

#### Unit 3 — Math for AI: Statistics & Probability
**Hours:** 12 Theory + 13 Practical = 25h | **Marks:** 7M

| # | Learning Outcome |
|---|---|
| 1 | Apply statistics to real-life problems (mean, median, mode, range) |
| 2 | Identify number patterns and sequences |
| 3 | Understand probability: experiments, outcomes, events |
| 4 | Calculate simple and compound probability |
| 5 | Connect statistics and probability to how AI models make predictions |

**CBSE Activities:**
- Real-world statistics problems (health data, sports scores)
- Coin / dice probability experiments
- Number pattern puzzles

---

#### Unit 4 — Introduction to Generative AI
**Hours:** 8 Theory + 12 Practical = 20h | **Marks:** 5M

| # | Learning Outcome |
|---|---|
| 1 | Distinguish Generative AI from conventional AI |
| 2 | Identify types of Generative AI (text, image, audio, video, code) |
| 3 | Describe real-world applications of Generative AI |
| 4 | Understand limitations: hallucinations, deepfakes, copyright |
| 5 | Apply ethical principles to Generative AI use |

**CBSE Activities:**
- Compare outputs from different GenAI tools
- Identify AI-generated vs human-created content
- Prompt engineering exercise

---

#### Unit 5 — Introduction to Python
**Hours:** 1 Theory + 9 Practical = 10h | **Marks:** 8M

| # | Learning Outcome |
|---|---|
| 1 | Write and run basic Python programs |
| 2 | Use variables, data types, and operators |
| 3 | Implement conditional statements (if/elif/else) |
| 4 | Write loops (for, while) |
| 5 | Create and manipulate lists |
| 6 | Use input() and print() for I/O |

**CBSE Activities:**
- Calculator program
- Number guessing game
- List manipulation exercises
- Pattern printing with loops

---

## 2. What We Are Building

A **deeply interactive learning module** at `/learn/cbse-ai-class9/` on the PandaLearn platform. The goal is not a PDF replacement — every concept that can be experienced should be experienced through interaction.

### Design Principles
1. **Experience > Read** — Every key concept has a corresponding interactive component
2. **CBSE-aligned** — Each page has an accordion showing the official learning outcomes, hours, and marks
3. **Proof through delight** — Students should want to come back. The Sandbox and Ethics Roleplay are the differentiators competitors don't have
4. **Mobile-first** — All animations work on small screens
5. **Orange + Violet branding** — Distinct from the Computer Networks track (which uses violet only)

### Tech Stack
- **Framework:** Next.js App Router (read `node_modules/next/dist/docs/` before writing any Next.js code — it has breaking changes)
- **Animations:** Framer Motion v12 (`motion.*`, `AnimatePresence`, `layoutId`, keyframe arrays)
- **Styling:** Tailwind CSS v4 — use canonical classes (`min-h-100` not `min-h-[400px]`)
- **Colors:** CSS variables ONLY — never hardcode hex in components (see `src/app/globals.css`)
- **Typography:** `font-sora font-bold` for headings, DM Sans default for body
- **Icons:** lucide-react

### Color Rules
| Context | Background | Accent |
|---|---|---|
| Dark SVG canvas (animations) | `#060A12` or `#080C14` | Domain-specific colors |
| Light info panels | `bg-white` | `text-orange-600`, `text-violet-600` |
| CBSE badges / CTAs | `bg-orange-500` | `text-white` |

### Component Patterns
Every animation component is **self-contained** (no AnimFrame context required) for Sandbox and Ethics. All others are wrapped in `<AnimFrame>` by the page.

```
page.tsx (server component)
├─ CBSEAccordion       — <details>/<summary>, [&::-webkit-details-marker]:hidden
├─ SectionHeading      — orange badge + title
├─ ObjectivesCard      — from @/components/learn/ObjectivesCard
├─ ConceptCard         — from @/components/learn/ConceptCard
├─ AnimFrame           — wrapper with title + description
│   └─ AnimXxx         — self-contained client component
├─ MicroCheck          — from @/components/learn/MicroCheck
└─ ExitQuiz            — from @/components/learn/ExitQuiz, passThreshold=7
```

---

## 3. File Map (All Created Files)

### Shared Infrastructure
| File | Purpose |
|---|---|
| `src/components/learn/AISidebar.tsx` | CBSE-branded sidebar: orange accents, 5 units with marks, CBSE 417 badge, Class IX 2026-27 label |
| `src/app/learn/cbse-ai-class9/layout.tsx` | Course layout: `AISidebar` + `AppNavbar` with `variant="learn"`, `backHref="/dashboard"`, `courseTitle="Artificial Intelligence · Class IX"` |
| `src/app/learn/cbse-ai-class9/page.tsx` | Course overview: dark hero, 5 unit cards (Unit 1 unlocked), exam pattern table, "Why PandaLearn" section |

### Unit 1 — AI Reflection, Project Cycle & Ethics ✅ COMPLETE
| File | Purpose |
|---|---|
| `src/app/learn/cbse-ai-class9/module-1/page.tsx` | Server component. 3 lessons + CBSE accordion + 7 MicroChecks + ExitQuiz (10 questions, threshold 7) |
| `module-1/_components/AnimAIDomains.tsx` | 3-realm AI explorer: dark SVG canvas, hexagonal nodes, bezier particle paths, auto-cycle, rich info panel |
| `module-1/_components/AnimProjectCycle.tsx` | 6-step hexagonal cycle: click any step, directional polygon arrowheads, hover/tap scale effects, auto-cycle |
| `module-1/_components/AnimModelLearning.tsx` | Neural network signal propagation: 3→5→3→2 fully-connected, 4-phase animation, signal particles, prediction bars |
| `module-1/_components/AnimProjectSandbox.tsx` | **THE WOW FEATURE** — 8-step AI Project Cycle wizard |
| `module-1/_components/AnimEthicsScenario.tsx` | Ethics roleplay: 4 stakeholders, 3 phases (Explore / Reality Check / What Can We Do?) |

### Unit 2 — Data Literacy ✅ COMPLETE
| File | Purpose |
|---|---|
| `src/app/learn/cbse-ai-class9/module-2/page.tsx` | Server component. 3 lessons + CBSE accordion + 5 MicroChecks + ExitQuiz (10 questions, threshold 7) |
| `module-2/_components/AnimDataTypes.tsx` | Data taxonomy explorer: structured vs unstructured, primary vs secondary, bezier particle flows, tab indicator |
| `module-2/_components/AnimDataCleaning.tsx` | **WOW FEATURE** — Interactive dataset cleaner: 15-row student dataset with 7 issues (missing, outlier, duplicate), data quality score 0→100% |
| `module-2/_components/AnimChartSelector.tsx` | 5 scenarios × 5 chart types: pick right chart, see animated live SVG (bar, line, pie, scatter, histogram) |
| `module-2/_components/AnimDataPrivacy.tsx` | 3-phase privacy simulator: toggle app permissions → breach scenario → protection strategies + PDPB rights |

### Units 3–5 — NOT YET BUILT

---

## 4. Unit 1 Component Detail

### AnimAIDomains — Three Realms Explorer
- **Canvas:** `viewBox="0 0 400 370"` on `#060A12` background
- **Geometry:** NLP(200,52), CV(332,262), Data(68,262), AI hub at (200,185)
- **Nodes:** Hexagonal (`hexPts()` helper), r=28 fill, r=34 glow halo
- **Animation:** 3 bezier particles per active domain (pre-computed `KF` keyframe arrays), dual pulse rings on hub
- **SVG Filters:** `#particle-blur` (stdDeviation 1.5), `#hex-glow` (4), `#hub-glow` (6)
- **Info panel:** Live counter widget, "What it enables" list, real app examples grid, `layoutId="tab-indicator"` tab underline
- **Interaction:** Click tab to pause auto-cycle; "resume" button restarts

### AnimProjectCycle — 6-Step Cycle
- **Canvas:** `viewBox="0 0 400 382"` on `#080C14`
- **Nodes:** 6 circles at hexagonal positions, pulse ring on active node
- **Arrows:** `arrowPts()` helper computes polygon triangles at midpoints of connections
- **Interaction:** `whileHover={{ scale: 1.08 }}`, `whileTap={{ scale: 0.92 }}` on nodes
- **Info panel:** Step badge, key question quote, bullet list, step mini-nav buttons

### AnimModelLearning — Neural Network Visualization *(NEW)*
- **Canvas:** `viewBox="0 0 400 275"` on `#060A12`
- **Architecture:** Input(3) → Hidden1(5) → Hidden2(3) → Output(2) = 30 connections
- **Phases:** 4 phases × 2.2s = 8.8s cycle. Each phase highlights one layer.
- **Signal:** 3 staggered `SignalParticle` components travel along active layer-pair lanes
- **Info panel:** Phase dots, layer description, feature list (phase 0), probability bars (phase 3)
- **Position in page:** After ConceptCard 2.3 (Rule-based vs Learning-based), before ConceptCard 2.4

### AnimProjectSandbox — AI Project Wizard
- **Steps:** 0 (Intro) → 1 (Theme) → 2 (4Ws) → 3 (Stakeholders) → 4 (Features) → 5 (Training) → 6 (Evaluation) → 7 (Deploy) → 8 (Summary)
- **Themes:** Healthcare (SDG 3), Education (SDG 4), Environment (SDG 13), Transport (SDG 11)
- **4Ws:** WHO / WHAT / WHERE / WHEN selectors → live generated problem statement
- **Training:** Animated log entries with `motion.p` fade-in: epoch numbers, loss values, sample counts
- **Confusion Matrix:** Live threshold slider (0.1–0.9), TP/FP/TN/FN with `Math.max(0,...)` protection
- **Validation hints:** `stepHint` shows orange guidance text above nav when Continue is disabled
- **ProgressBar:** 8 segments, orange fill for completed steps

### AnimEthicsScenario — The AI Hiring Tool
- **Scenario:** Amazon 2018 AI recruiting bias (real incident)
- **Phase 1 (Explore):** 4 stakeholder cards — Job Applicant, Company HR, AI Developer, Government
- **Phase 2 (Reality Check):** Bias type identification (Historical ✓, Measurement ✓, Representation ✓, Random ✗)
- **Phase 3 (What Can We Do?):** `<details>/<summary>` accordions per stakeholder group
- **Note:** Uses `[&::-webkit-details-marker]:hidden` to suppress native disclosure triangle

---

## 5. Completed Tasks (Session Log)

### Phase 1 — Foundation Build
- [x] Analysed CBSE 417 syllabus PDF in full
- [x] Created `AISidebar.tsx` — CBSE-branded, orange accent, 5 units
- [x] Created `layout.tsx` — course shell with AppNavbar + AISidebar
- [x] Created `page.tsx` (overview) — hero, unit cards, exam pattern
- [x] Created `module-1/page.tsx` — 3 lessons, 7 MicroChecks, 10-question ExitQuiz
- [x] Created `AnimAIDomains.tsx` — initial version
- [x] Created `AnimProjectCycle.tsx` — initial version
- [x] Created `AnimProjectSandbox.tsx` — 8-step wizard (WOW feature)
- [x] Created `AnimEthicsScenario.tsx` — 3-phase ethics roleplay

### Phase 2 — Quality Uplift
- [x] Rewrote `AnimAIDomains.tsx` — bezier particle system, hexagonal nodes, SVG glow filters, live counter, tab indicator
- [x] Fixed Tailwind v4 canonical warnings in `AnimAIDomains.tsx` (`min-h-100`, `min-h-85`, `max-w-95`)
- [x] Improved `AnimProjectCycle.tsx` — `arrowPts()` polygon arrowheads replacing circle dots, `whileHover/whileTap`, fixed `min-h-105`, `max-w-92.5`
- [x] Created `AnimModelLearning.tsx` — brand-new neural network visualization (3→5→3→2)
- [x] Improved `AnimProjectSandbox.tsx` — animated training log, `stepHint` validation guidance
- [x] Updated `module-1/page.tsx` — added `AnimModelLearning` after ConceptCard 2.3

---

## 6. Pending Tasks

### High Priority — Unit 1 Polish
- [x] **AnimEthicsScenario** — Phase 3 accordions replaced with framer-motion `height: "auto"` animation + staggered `motion.li` entries + `openWho` state
- [x] **AnimProjectCycle** — Resume button added in info panel (colored with active step color, `▶ resume` text triggers `setAuto(true)`)
- [x] **module-1/page.tsx** — `LessonMap` component added after CBSEAccordion, before ObjectivesCard. 3 anchor-linked cards. Sections have `id="lesson-0N"` + `scroll-mt-20`
- [x] **MicroCheck after AnimModelLearning** — Added after the AnimFrame, before ConceptCard 2.4 

### Medium Priority — Platform Features
- [ ] **AISidebar** — Add lesson-level navigation within Unit 1 (expandable sub-items for Lesson 1, 2, 3)
- [ ] **Progress tracking** — Wire the progress bar in AISidebar to actual completion state (currently hardcoded 0%)
- [ ] **CBSE board selector** — When user picks CBSE on dashboard, offer "View Syllabus" linking to `/learn/cbse-ai-class9/`

### Phase 3 — Unit 2: Data Literacy

**Route:** `/learn/cbse-ai-class9/module-2/`

**Files to create:**
```
module-2/page.tsx                          — server component, same pattern as module-1
module-2/_components/AnimDataTypes.tsx     — structured vs unstructured data explorer
module-2/_components/AnimDataCleaning.tsx  — missing values / outliers interactive exercise  
module-2/_components/AnimChartSelector.tsx — pick the right chart type for different data scenarios
module-2/_components/AnimDataPrivacy.tsx   — consent and privacy scenario roleplay
```

**Lessons:**
1. **Types of Data** (~20h) — Structured vs unstructured, primary vs secondary, examples; AnimDataTypes
2. **Data Acquisition & Cleaning** (~25h) — Sources, scraping basics, missing values, outliers; AnimDataCleaning
3. **Data Visualisation** (~25h) — Chart types, Tableau intro, interpreting trends; AnimChartSelector
4. **Data Privacy & Ethics** — Consent, anonymisation, PDPB India; AnimDataPrivacy

**WOW feature for Unit 2:** A **"Build Your Dataset"** wizard — students upload or choose a raw dataset, spot issues (duplicates, nulls, outliers), clean it, then choose and generate the right visualisation. Final output is a "Data Story" card.

**MicroChecks (minimum 5):**
1. Which type of data would survey responses be? (Unstructured → structured after processing)
2. A scatter plot is best for showing... (Correlation between two variables)
3. What is the purpose of data normalisation?
4. Which chart is misleading if the Y-axis doesn't start at zero?
5. Name one way to handle missing data values.

**ExitQuiz:** 10 questions, threshold 7, covering all 4 lessons.

**CBSE Accordion outcomes:** All 7 learning outcomes from Unit 2 syllabus listed above.

---

### Phase 4 — Unit 3: Math for AI

**Route:** `/learn/cbse-ai-class9/module-3/`

**Files to create:**
```
module-3/page.tsx
module-3/_components/AnimStatsCasino.tsx   — mean/median/mode interactive calculator with real dataset
module-3/_components/AnimProbability.tsx   — coin/dice/spinner probability simulator
module-3/_components/AnimPatterns.tsx      — number sequences + AI pattern recognition link
```

**Lessons:**
1. **Statistics in Real Life** (~15h) — Mean, median, mode, range; AnimStatsCasino
2. **Number Patterns** (~5h) — Sequences, Fibonacci; AnimPatterns
3. **Probability** (~15h) — Experiments, sample space, events; AnimProbability

**WOW feature for Unit 3:** A live **"Probability vs AI"** experiment — flip a coin 100 times (simulated), compare empirical vs theoretical probability, then show how AI uses similar reasoning for prediction confidence.

---

### Phase 5 — Unit 4: Introduction to Generative AI

**Route:** `/learn/cbse-ai-class9/module-4/`

**Files to create:**
```
module-4/page.tsx
module-4/_components/AnimGenAITypes.tsx       — text/image/audio/video/code GenAI explorer
module-4/_components/AnimPromptLab.tsx        — prompt engineering sandbox (static, no API calls)
module-4/_components/AnimHallucinationGame.tsx — spot the hallucination: AI vs facts quiz
```

**Lessons:**
1. **What is Generative AI?** (~10h) — Discriminative vs Generative, how LLMs work; AnimGenAITypes
2. **Applications & Limitations** (~10h) — Real uses, hallucinations, deepfakes; AnimHallucinationGame
3. **Ethical Use of GenAI** (~10h) — Plagiarism, consent, bias; AnimPromptLab

**WOW feature for Unit 4:** **"Spot the Hallucination"** game — students are shown 5 AI-generated "facts" and must identify which ones are hallucinated. Teaches critical consumption of GenAI output.

---

### Phase 6 — Unit 5: Introduction to Python

**Route:** `/learn/cbse-ai-class9/module-5/`

**Files to create:**
```
module-5/page.tsx
module-5/_components/AnimPythonREPL.tsx       — sandboxed Python-like pseudo-executor (no real eval)
module-5/_components/AnimVariables.tsx        — visual variable box assignment
module-5/_components/AnimLoopTracer.tsx       — step through a for/while loop line by line
module-5/_components/AnimListBuilder.tsx      — append/pop/index list operations
```

**Lessons:**
1. **Python Basics** (~4h) — Variables, data types, operators; AnimVariables
2. **Flow of Control** (~3h) — if/elif/else, for, while; AnimLoopTracer
3. **Lists** (~2h) — Create, index, append, pop; AnimListBuilder
4. **Input / Output** (~1h) — input(), print(), f-strings; AnimPythonREPL

**WOW feature for Unit 5:** A **step-through code tracer** — students write a short program and then step through it instruction by instruction, with variable values shown in a "memory box" at each step. Makes execution concrete and visual.

---

## 7. Reusable Patterns for Future Units

### Page Template (copy-paste for Units 2-5)
```tsx
// src/app/learn/cbse-ai-class9/module-N/page.tsx
import { /* lucide icons */ } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimXxx from "./_components/AnimXxx"

const QUIZ: QuizQuestion[] = [ /* 10 questions */ ]

function CBSEAccordion() {
  // outcomes, hours, marks from the syllabus above
  // <details className="group rounded-2xl border border-violet-200 overflow-hidden">
  // <summary className="... [&::-webkit-details-marker]:hidden">
}

function SectionHeading({ n, title, lesson }) { /* orange badge + title */ }

export default function ModuleNPage() {
  return (
    <div className="px-6 lg:px-10">
      {/* Hero banner — bg-[#0d0d0d] */}
      {/* CBSEAccordion */}
      <div className="py-10 space-y-16">
        <ObjectivesCard objectives={[...]} />
        {/* LESSON SECTIONS */}
        <ExitQuiz moduleName="..." questions={QUIZ} passThreshold={7} />
      </div>
    </div>
  )
}
```

### Animation Component Template
```tsx
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Data ──────────────────────────────────────────────────────────────────────
// ... constants and types

// ── Helpers ───────────────────────────────────────────────────────────────────
// ... pure functions (no hooks)

// ── Sub-components ────────────────────────────────────────────────────────────
// ... small presentational pieces

// ── Main component ────────────────────────────────────────────────────────────
export default function AnimXxx() {
  // state
  // useEffect for auto-cycle (if needed)
  
  return (
    <div className="grid md:grid-cols-[1fr_260px] min-h-100">
      {/* SVG canvas: bg-[#060A12] */}
      {/* Info panel: bg-white border-l border-gray-200 */}
    </div>
  )
}
```

### AISidebar unlock pattern
When a new unit is ready, update `src/components/learn/AISidebar.tsx`:
```tsx
{ num: 2, title: "Data Literacy", ..., unlocked: true },  // change false → true
```
And update `src/app/learn/cbse-ai-class9/page.tsx` the same way.

---

## 8. Quality Bar

Every component must pass this checklist before being considered done:

- [ ] **No hardcoded hex** — All colors use CSS variables or Tailwind semantic classes
- [ ] **No Tailwind arbitrary values** where a canonical class exists (`min-h-100` not `min-h-[400px]`)
- [ ] **Dark canvas + light info panel** — All animations follow the split-pane layout
- [ ] **Self-contained** — Component has no required props and manages its own state
- [ ] **Auto-play + pause** — Animations cycle automatically but pause when user interacts
- [ ] **Mobile-friendly** — `grid md:grid-cols-[...]` collapses to single column on mobile
- [ ] **CBSE accuracy** — Every fact, formula, and example is accurate to the CBSE 417 curriculum
- [ ] **AnimatePresence on tab/phase changes** — Use `mode="wait"` for clean transitions
- [ ] **Exit quiz** — Minimum 10 questions, passThreshold=7, covering all lessons in the unit

---

## 9. Session History

| Session | What was built |
|---|---|
| Session 1 | Syllabus analysis, all Unit 1 files (first pass) — AISidebar, layout, overview page, module-1 page with 3 lessons, 4 animation components, 7 MicroChecks, 10-question ExitQuiz |
| Session 2 | Quality uplift — rewrote AnimAIDomains with bezier particles + hex nodes + glow filters; improved AnimProjectCycle with polygon arrowheads + hover/tap; created AnimModelLearning (neural network viz); improved AnimProjectSandbox training animation + validation hints; fixed all Tailwind canonical warnings |
| Session 3 | Unit 2: Data Literacy — full build: AnimDataTypes (taxonomy explorer), AnimDataCleaning (WOW: 15-row dirty dataset cleaner), AnimChartSelector (5 charts × 5 scenarios with live SVGs), AnimDataPrivacy (permissions → breach → protection + PDPB), module-2/page.tsx (3 lessons, 5 MicroChecks, 10-question ExitQuiz); unlocked Unit 2 in AISidebar + overview page |
