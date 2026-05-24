# CBSE AI Class IX — Unit 1 UI Upgrade Plan
## "From Basic to World-Class Interactive Learning"

---

## Current State Audit

### What Exists
| Component | Status | Quality |
|---|---|---|
| `AnimAIDomains` | ✅ Built | Basic — auto-cycling card tabs, static |
| `AnimProjectCycle` | ✅ Built | Medium — SVG hexagon ring, click-to-explore |
| `AnimModelLearning` | ✅ Built | Medium — animated neural net signal flow |
| `AnimProjectSandbox` | ✅ Built | Good — 8-step wizard, gamified choices |
| `AnimEthicsScenario` | ✅ Built | Medium — stakeholder tabs, static text |
| Module page layout | ✅ Built | Basic — ConceptCards + MicroCheck inline |
| Exit Quiz | ✅ Built | Good — 10Q, pass threshold |
| Layout / Sidebar | ✅ Built | Basic — flat nav list |

### What's Missing (CBSE curriculum activities not yet interactive)
| PDF Activity | Status |
|---|---|
| LUIS Lighting Demo (AI in daily life) | ❌ Not built |
| Rock Paper Scissors (data AI game) | ❌ Not built |
| Semantris clone (NLP AI game) | ❌ Not built |
| Quick Draw clone (CV AI game) | ❌ Not built |
| 4Ws Problem Canvas (fillable) | ❌ Static only (shown as 4 cards) |
| System Maps builder | ❌ Not built |
| Interactive Data Visualisation builder | ❌ Not built |
| Confusion Matrix hands-on classifier | ❌ Not built |
| Moral Machine style ethics voting | ❌ Not built |
| Balloon Debate (affirmative vs against) | ❌ Not built |

---

## The Upgrade Vision: 4-Layer Interactivity Model

```
Layer 4: IMMERSIVE (live playgrounds, role-play, real data)
Layer 3: ACTIVE (drag-drop, fill canvases, draw, classify)
Layer 2: REACTIVE (click-to-reveal, animated reveals, audio)
Layer 1: PASSIVE (read, scroll, animated text)   ← current
```

Everything currently at Layer 1. Target: **Layer 3–4 for all major concepts**.

---

## Section-by-Section Upgrade Plan

---

### 0. Page Shell & Navigation

**Current:** Gray sidebar flat list + white main scroll

**Upgrade to:**

#### `ProgressRailLayout`
- **Left rail** (240px sticky): Lesson progress tracker
  - Each lesson has a circular progress ring (0-100%)
  - Rings fill as user completes MicroChecks and activities
  - Completed = green checkmark + XP badge
  - Active = pulsing orange dot
  - Locked (not started) = gray lock icon
  - Thin connector line between lessons (fills with animated gradient as you progress)

#### Scroll-based section reveals
- Use IntersectionObserver to animate sections in as they enter the viewport
- First visit: sections slide in from the right with a subtle fade
- Return visit: sections appear instantly (localStorage flag)

#### Floating XP Toaster
- When user completes a MicroCheck or activity: `+15 XP 🔥` toast flies up from the bottom-right
- XP tracker in the top nav shows cumulative session XP
- At 100 XP: confetti burst + "Level Up!" banner

---

### 1. Hero Banner — Unit 1

**Current:** Dark card with large title + description text

**Upgrade to:** `HeroCanvas`

- Full-width animated canvas (400px tall) behind the title
- **Particle system**: 60 dots drifting in 3 clusters labeled NLP / CV / Data
  - NLP cluster: blue dots floating from left
  - CV cluster: green dots floating from right  
  - Data cluster: orange dots floating from bottom
  - Dots gently converge toward a glowing "AI" core center
  - On hover: clusters scatter away and reform
- Title overlaid with glassmorphism panel (`backdrop-blur-sm`, `bg-white/10`)
- **3 stat chips** with count-up animation on scroll-into-view:
  - `3 Realms Explored`
  - `6-Step Cycle Mastered`
  - `10 Ethics Scenarios`
- Sticky breadcrumb that transforms into a compact lesson progress bar when scrolled past hero

---

### 2. Lesson 1 — What is AI? The Three Realms

#### 2a. Replace `AnimAIDomains` → `AIDomainsPlayground`

**Current:** 3 tabs with bullets and static examples

**Upgrade to:** Interactive multi-layer explorer

**Layout:** Full-width dark canvas (480px), 3-panel info below

**Left panel — The Venn Brain:**
- Large SVG with 3 overlapping circles (Venn diagram style):
  - NLP circle (blue) — left  
  - Computer Vision circle (green) — right
  - Data Statistics circle (orange) — bottom
- Overlap zones show combined applications:
  - NLP + CV center: "Image captioning, document scanning"
  - NLP + Data: "Sentiment analysis, recommendation"
  - CV + Data: "Object counting, anomaly detection"
  - All three: "Self-driving cars, medical AI"
- Circles have floating app-icon pills orbiting them:
  - NLP: Google Translate, ChatGPT, Siri, Duolingo
  - CV: Face unlock, Google Lens, Tesla Autopilot, YouTube thumbnails
  - Data: Netflix, Spotify, Amazon, Stock trading bots
- Click any circle → zooms it, dims others, right panel fills with details
- Click any orbit pill → shows micro-demo of that app

**Right panel — Live Mini-Games (CBSE Activity replicated):**

Tab 1: **"Quick Draw" CV demo**
- User draws a simple shape in a canvas
- A fake CV classifier runs (animated progress bar, 2s)
- Shows: "I see: 87% Cat, 9% Rabbit, 4% Dog"
- Has 5 pre-seeded drawing prompts: cat, sun, house, car, tree

Tab 2: **Word Association NLP demo**
- Shows 5 random words on screen
- User types a word → system highlights which other words are semantically closest (cosine-similarity simulation)
- Shows NLP reasoning: "Your word 'hospital' is closest to 'doctor' (0.91) and 'medicine' (0.87)"

Tab 3: **Pattern Prediction Data demo**
- Shows a sequence: "2, 4, 8, ?, ?" and "1, 1, 2, 3, ?, ?"
- User picks the next number
- System reveals: "Correct! An AI saw this pattern in milliseconds"

---

#### 2b. AI History Timeline — Upgraded

**Current:** Static bullet list with colored year badges

**Upgrade to:** `TimelineScrubber`
- Horizontal scrollable timeline (mobile: vertical)
- Each year is a **node** with a pulsing ring
- Hovering a node:
  - Expands it with a photo/illustration placeholder
  - Shows a "What it meant" impact line in plain student language
  - Shows "What couldn't AI do yet at this point" (builds anticipation)
- **Animated progress line** connecting 1950 → 2022 fills with a gradient as you scroll through nodes
- Final node (2022 ChatGPT) has a burst animation

---

### 3. Lesson 2 — The AI Project Cycle

#### 3a. Replace `AnimProjectCycle` → `ProjectCycleFlow`

**Current:** 6 nodes in a ring, click to see bullets on the right

**Upgrade to:** Animated pipeline with data particles

**Top half — Flow visualization:**
- 6 hexagonal stations connected by animated conveyor paths
- **Particles flow** from station to station (left to right, looping)
- Particles are colored based on which stage they're in:
  - Scope: purple sparks
  - Acquire: blue data packets
  - Explore: teal chart points
  - Model: green nodes
  - Evaluate: amber ticks/crosses
  - Deploy: red rockets
- When you click a station: particles pile up there, others pause
- Iterative arrow: a separate "loop back" particle occasionally travels backward from Deploy → Scope, showing the iterative nature

**Bottom half — Interactive detail panel:**
- Same as current but enhanced:
  - Each step has a **"Try it"** button that triggers a mini-activity (see below)
  - Step has an estimated time badge
  - Real-world example card appears (with an icon illustration)

#### 3b. NEW: `Canvas4Ws` — Interactive 4Ws Problem Canvas

**The CBSE curriculum's #1 activity — currently missing as interactive**

Full-screen modal or inline expandable panel:

**Layout:**
- 4 quadrant grid, each quadrant is a fillable sticky-note canvas
- WHO quadrant (top-left): pale purple
- WHAT quadrant (top-right): pale orange  
- WHERE quadrant (bottom-left): pale blue
- WHEN quadrant (bottom-right): pale green

**Interactions:**
- Click any quadrant → text area expands, user can type freely
- Pre-populated with placeholder hints ("e.g., Students aged 10–16 in rural Bihar")
- When all 4 are filled → **"Generate Problem Statement"** button activates
- Button triggers: animated text assembly combining the 4 answers into a proper problem statement
- User can copy or download their canvas as a styled card (PNG)
- Progress saved to localStorage

**Themes:** User can toggle between 4 project themes (Health, Education, Environment, Traffic) — pre-fills sensible defaults for each quadrant that the user can edit

#### 3c. NEW: `DataFeaturesLab` — Interactive Data Analysis

**Maps to CBSE Activity: "Data and Analysis"**

A scientific lab UI:
- Left: **Feature Shelf** — 12 possible data features with drag handles
  - Each feature has: icon, name, type (numeric/text/image), sensitivity rating
  - Sensitivity shown as a small colored badge: 🔴 High / 🟡 Medium / 🟢 Low
- Center: **Analysis Table** — user drags features into 3 columns:
  - "Need this" / "Might need this" / "Don't need this"
- Right: **Impact Preview** — live updating radar chart showing impact of selected features on model quality

Constraints panel at the bottom:
- "What if you don't have enough data?" → click triggers a branching explanation
- "How often to collect?" → slider: Real-time / Daily / Weekly / Monthly → shows trade-offs

#### 3d. Upgrade `AnimModelLearning` → `NeuralStudio`

**Current:** Signal flow animation in a box

**Upgrade to:** Full interactive neural network builder

**Mode 1 — Watch:** Auto-demo of signal flowing through layers
- Each neuron lights up sequentially
- Connection weights animate (thick = high weight, thin = low)
- Final output neuron shows confidence bars

**Mode 2 — Build your own:**
- User selects: Input features (e.g., age, symptoms, location)
- User selects: Number of hidden layers (1, 2, 3)
- User selects: Training data size (100 / 1,000 / 10,000 samples)
- Click **"Train"** → animated training loop runs for 3 seconds
- Watch accuracy counter climbing: 34% → 67% → 82% → 89%
- Final result: model card with accuracy + a green/amber/red deployment badge

#### 3e. Upgrade `AnimProjectSandbox` — Enhanced Gamification

**Current:** 8-step wizard with choice buttons

**Upgrade to:** Full RPG-style project builder with visual storytelling

- Each step has a **scene illustration** (SVG illustration of the context)
- **Choice consequence system:** Your choices in step 2 affect what data options appear in step 4
- **Mistake mode:** If you make a suboptimal choice (e.g., collecting biased data), a warning card appears mid-flow showing the downstream consequence
- **Project Timeline:** A Gantt-chart style bar builds up as you complete each step
- **Team avatar selection:** User picks a role at the start (Data Scientist / Domain Expert / Ethicist / Developer) — each role has slightly different hints
- Final screen: **Project Report Card** with animated radar chart of your project quality across 6 dimensions

#### 3f. NEW: `ConfusionMatrixClassifier` — Hands-on Evaluation

**Maps to CBSE Session: Evaluation (TP/FP/TN/FN)**

**The activity:**
- System shows 20 cards, one at a time, each with a brief scenario:
  - e.g., "Patient: 45-year-old with cough, fever, night sweats. Actual: Has TB"
  - The AI says: "Prediction: No TB"
- Student must classify: Is this TP / FP / TN / FN?
- After selection: animated reveal with explanation
- Running scoreboard builds the actual confusion matrix in real time (2×2 grid fills in as you classify)
- At the end: calculates Accuracy, Precision, Recall → shows which metric matters most for this use case (medicine = minimize FN)

---

### 4. Lesson 3 — AI Ethics, Bias & Access

#### 4a. Upgrade `AnimEthicsScenario` → `EthicsCourtroom`

**Current:** Tabs showing stakeholder concerns as bullet lists

**Upgrade to:** Full debate simulation

**Layout:** Courtroom-style split screen
- Left dock: Affirmative team (pro-AI for this scenario)
- Right dock: Opposition team (anti-AI / concerned stakeholders)
- Center: "Judge" panel (the student)

**Flow:**
1. Scenario card drops in with dramatic entrance animation
2. Affirmative makes a point (animated speech bubble pops in)
3. Opposition counter-argues (animated speech bubble from the right)
4. Student votes: Agree with Affirmative / Agree with Opposition / Undecided
5. After 3 rounds: tally reveals → "Class voted 67% for stricter regulation"
6. Judge's verdict: a carefully balanced summary of both sides

**3 built-in scenarios** (all from CBSE curriculum):
1. The AI Hiring Tool (Amazon 2018 — historical bias)
2. AI CCTV in Schools (privacy vs safety)
3. AI Doctor in Rural Areas (access vs accuracy)

#### 4b. NEW: `MoralMachineLight` — Ethics Voting Activity

**Maps to CBSE Recommended Activity: Explore Moral Machine**

A simplified version of MIT's Moral Machine:
- Shows 5 self-driving car dilemmas (visual stick-figure scenarios)
- User clicks their choice: swerve left vs swerve right
- After all 5: bar chart reveals "Your choices vs Indian students nationally"
- Discussion prompt: "What ethical framework guided your choices?"
- Options: Utilitarian (greatest good) / Rights-based / Virtue ethics / No preference

#### 4c. NEW: `BalloonDebateArena`

**Maps to CBSE Activity: Balloon Debate**

A structured debate builder:
- User is assigned a side: PRO-AI or ANTI-AI for a given topic
- 3 topics: AI in healthcare / AI in hiring / AI surveillance
- User selects their **top 3 arguments** from a card pool (12 argument cards per side)
- They order them by strength (drag to reorder)
- Then the system reveals: "Here's how the other team would counter argument #1" with a rebuttal
- User chooses: "I can defend this" / "I concede this point"
- Final score: Debate Strength Rating out of 100

#### 4d. `BiasDetective` — AI Bias Explorer

**Maps to CBSE Session: AI Bias and AI Access**

Three bias scenarios, each presented as a mini-investigation:

**Scenario A: The Photo Filter**
- Shows 8 profile photos
- AI face detection shows: draws boxes around 6, misses 2
- "Can you figure out which pattern explains the misses?"
- Reveal: training data was 90% lighter skin tones

**Scenario B: The Loan Algorithm**  
- Shows 10 loan applicants with attributes (salary, location, education, name)
- AI approves/rejects them
- "Spot the bias. What irrelevant features might be influencing the outcome?"
- Reveal: applicants from ZIP codes with historically lower incomes rejected more

**Scenario C: The Search Engine**
- Shows search results for "CEO images" — mostly male
- "What does this tell us about who has historically held this role?"
- Reveal: representation bias amplified by AI at scale

---

### 5. Exit Quiz — Enhanced

**Current:** Linear 10-question quiz with radio buttons

**Upgrade to:** `AdaptiveQuiz`

- **Adaptive flow:** If student answers correctly → next question is harder. Wrong → easier question + micro-lesson before continuing
- **Per-question feedback animations:** 
  - Correct: confetti burst from the answer card + green glow
  - Wrong: card shakes + red flash + explanation slides in from bottom
- **Topic-tagged questions:** Each question has a tag (Domains / Cycle / Ethics / Evaluation)
- **Results radar chart:** Shows performance across 4 topic areas as a radar/spider chart
- **Review mode:** At the end, student can revisit wrong answers with full explanations + "Try again" on those specific questions
- **Certificate card:** On passing (≥70%): animated certificate SVG with student's score, date, and module name — downloadable as PNG

---

## Component Build Priority Queue

### Phase 1 — Quick wins (1–2 days each)
1. `ProgressRailLayout` — replaces flat sidebar nav
2. `Canvas4Ws` — inline interactive 4Ws canvas (major curriculum gap)
3. `ConfusionMatrixClassifier` — hands-on TP/FP/TN/FN activity
4. `TimelineScrubber` — upgraded AI history timeline

### Phase 2 — Medium effort (2–3 days each)
5. `AIDomainsPlayground` — replaces AnimAIDomains with Venn + mini-games
6. `ProjectCycleFlow` — animated pipeline with particles (replaces AnimProjectCycle)
7. `EthicsCourtroom` — replaces AnimEthicsScenario with full debate
8. `NeuralStudio` — replaces AnimModelLearning with build-your-own mode

### Phase 3 — Wow features (3–5 days each)
9. `MoralMachineLight` — ethics voting scenarios
10. `BalloonDebateArena` — structured debate builder
11. `BiasDetective` — 3-scenario bias investigation
12. `DataFeaturesLab` — drag-and-drop data analysis
13. `AdaptiveQuiz` — adaptive exit quiz with radar results
14. `HeroCanvas` — particle physics hero with XP system

---

## Design Tokens for Interactive Components

All interactive components use these consistent patterns:

```tsx
// Activity container wrapper
<div className="rounded-3xl border-2 border-violet-100 bg-white shadow-lg shadow-violet-50/50 overflow-hidden">
  
  {/* Activity header */}
  <div className="flex items-center gap-3 px-5 py-3.5 bg-[var(--pl-violet-50)] border-b border-violet-100">
    <ActivityIcon className="text-violet-500" />
    <span className="font-sora font-bold text-sm text-violet-800">{title}</span>
    <span className="ml-auto text-xs text-violet-400">{xpValue} XP</span>
  </div>

  {/* Canvas / interaction area */}
  <div className="bg-[#080C14] min-h-[320px]">
    {/* dark canvas for animations */}
  </div>

  {/* Controls area */}
  <div className="px-5 py-4 bg-white">
    {/* light controls */}
  </div>
</div>
```

**Interaction states:**
- Idle: subtle `shadow-sm`
- Hover: `shadow-lg shadow-violet-100/60 -translate-y-0.5 transition-all`
- Active/selected: `ring-2 ring-violet-500 ring-offset-2`
- Completed: `border-green-300 bg-green-50/30`

**Animation library:** Framer Motion throughout
- Section reveals: `initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}`
- Activity completions: spring with bounce: `type:"spring", stiffness:400, damping:15`
- Number countups: custom hook with `requestAnimationFrame`

---

## File Structure (after upgrades)

```
src/app/learn/cbse-ai-class9/
├── layout.tsx                          # Add ProgressRailLayout
├── page.tsx                            # Module overview (upgrade hero)
└── module-1/
    ├── page.tsx                        # Main lesson page (restructure with scroll reveals)
    └── _components/
        ├── AnimAIDomains.tsx           # → replace with AIDomainsPlayground.tsx
        ├── AIDomainsPlayground.tsx     # NEW: Venn + mini-games
        ├── AnimProjectCycle.tsx        # → upgrade to ProjectCycleFlow  
        ├── Canvas4Ws.tsx               # NEW: Interactive 4Ws canvas
        ├── DataFeaturesLab.tsx         # NEW: Drag-drop feature analysis
        ├── AnimModelLearning.tsx       # → upgrade to NeuralStudio
        ├── ConfusionMatrixClassifier.tsx # NEW: Hands-on TP/FP/TN/FN
        ├── AnimProjectSandbox.tsx      # Upgrade: RPG mode + consequences
        ├── AnimEthicsScenario.tsx      # → replace with EthicsCourtroom
        ├── MoralMachineLight.tsx       # NEW: Ethical dilemma voting
        ├── BalloonDebateArena.tsx      # NEW: Structured debate
        └── BiasDetective.tsx           # NEW: 3-scenario investigation
```

---

## CBSE Activity Coverage Matrix (After Upgrades)

| CBSE Activity (from PDF) | Component | Status |
|---|---|---|
| LUIS lighting demo | `AIDomainsPlayground` Tab 2 (NLP) | Phase 1 |
| Rock Paper Scissors (data AI) | `AIDomainsPlayground` Tab 3 | Phase 1 |
| Semantris (NLP) | `AIDomainsPlayground` Tab 2 | Phase 1 |
| Quick Draw (CV) | `AIDomainsPlayground` Tab 1 | Phase 1 |
| 4Ws Problem Canvas | `Canvas4Ws` | Phase 1 |
| Stakeholder mapping | `Canvas4Ws` step 2 | Phase 1 |
| Data requirements analysis | `DataFeaturesLab` | Phase 2 |
| System maps | `DataFeaturesLab` (relationship view) | Phase 2 |
| Data visualization activity | Separate Unit 2 component | Future |
| Modeling (rule vs learning) | `NeuralStudio` | Phase 2 |
| Confusion matrix evaluation | `ConfusionMatrixClassifier` | Phase 1 |
| Preventable Blindness case study | `AnimProjectSandbox` (new theme) | Phase 2 |
| Ethics Awareness roleplay | `EthicsCourtroom` | Phase 2 |
| Moral Machine exploration | `MoralMachineLight` | Phase 3 |
| Balloon Debate | `BalloonDebateArena` | Phase 3 |
| AI Bias discussion | `BiasDetective` | Phase 3 |

---

## Notes on Quality Bar

The reference quality target is **Duolingo for AI concepts** — every interaction should feel:
1. **Rewarding** — immediate positive feedback on every correct action
2. **Forgiving** — wrong answers teach, never punish
3. **Surprising** — at least one "wow, I didn't know that" moment per lesson
4. **Student-paced** — everything can be skipped and revisited
5. **Curriculum-aligned** — every activity maps 1:1 to a CBSE learning outcome or activity
