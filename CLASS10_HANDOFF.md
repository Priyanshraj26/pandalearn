# PandaLearn — Class 10 CBSE AI Course: Full Handoff Context

> **Purpose:** This document provides ALL context needed to continue building the Class 10 CBSE AI (Subject Code 417) course in Claude Code. Units 1-2 + shared infrastructure are complete. Units 3-6 remain.

---

## 1. Project Overview

**Repository:** `d:\Estel\pandalearn`  
**Framework:** Next.js 16.2.6 (App Router, Turbopack)  
**Styling:** Tailwind CSS v4 (canonical classes like `min-h-100`, NOT `min-h-[400px]`)  
**Animation:** Framer Motion v12  
**Icons:** lucide-react  
**Typography:** Sora (headings: `font-sora font-bold`), DM Sans (body, default)  
**Colors:** CSS variables from `src/app/globals.css` — never hardcode hex in components  

### Key Color Variables
| Variable | Hex | Usage |
|---|---|---|
| `--pl-violet` | `#7c3aed` | Interactive elements, progress, badges |
| `--pl-orange` | `#f97316` | Primary CTA buttons, unit branding |
| `--pl-green` | `#10b981` | Success, completion |
| `--pl-red` | `#ef4444` | Errors |

### Design Rules (from AGENTS.md)
- Orange = primary CTA button (never violet for CTA)
- Dark backgrounds (`#060A12`, `#0d0d0d`) ONLY for SVG animation canvases and hero banners
- All other surfaces: white/gray (light theme)
- Never use Inter, Roboto, Arial
- Never hardcode hex — use CSS variables or Tailwind classes

---

## 2. What's Been Built (13 files)

### Directory Structure
```
src/
├── components/learn/
│   ├── AI10Sidebar.tsx          ← NEW (6-unit sidebar, Units 1-2 unlocked)
│   ├── AISidebar.tsx            ← existing Class 9
│   ├── AnimFrame.tsx            ← shared component
│   ├── ConceptCard.tsx          ← shared component
│   ├── MicroCheck.tsx           ← shared component
│   ├── ExitQuiz.tsx             ← shared component
│   └── ObjectivesCard.tsx       ← shared component
│
├── app/learn/cbse-ai-class10/
│   ├── layout.tsx               ← NEW (AppNavbar + AI10Sidebar shell)
│   ├── page.tsx                 ← NEW (course overview with 6 unit cards)
│   │
│   ├── module-1/                ← UNIT 1: AI Project Cycle & Ethical Frameworks
│   │   ├── page.tsx             ← 3 lessons, 6 MicroChecks, 10-Q ExitQuiz
│   │   └── _components/
│   │       ├── LessonProgressStrip.tsx
│   │       ├── AnimEthicalFrameworks.tsx   ← sector vs value-based explorer
│   │       └── AnimBioethicsCase.tsx       ← 4-principle bioethics simulator
│   │
│   ├── module-2/                ← UNIT 2: Advanced Concepts of Modeling
│   │   ├── page.tsx             ← 3 lessons, 6 MicroChecks, 10-Q ExitQuiz
│   │   └── _components/
│   │       ├── LessonProgressStrip.tsx
│   │       ├── AnimAIMLDL.tsx             ← AI⊃ML⊃DL nested circles
│   │       ├── AnimMLModelTypes.tsx        ← WOW: ML model classifier playground
│   │       └── AnimNeuralNetwork.tsx       ← interactive neural net calculator
│   │
│   ├── module-3/                ← TODO
│   ├── module-4/                ← TODO
│   ├── module-5/                ← TODO
│   └── module-6/                ← TODO
```

---

## 3. Shared Component Interfaces (MUST reuse these)

### AnimFrame
```tsx
// src/components/learn/AnimFrame.tsx
// Wraps interactive animations with a header bar
import AnimFrame from "@/components/learn/AnimFrame"

<AnimFrame
  id="anim-some-id"           // unique HTML id
  title="Interactive: Title"   // shown in header
  description="Subtitle text"  // optional
  totalSteps={1}               // optional, for step-based anims
  showSpeed={false}            // optional speed selector
>
  <YourAnimationComponent />
</AnimFrame>
```

### ConceptCard
```tsx
// src/components/learn/ConceptCard.tsx
import ConceptCard from "@/components/learn/ConceptCard"

<ConceptCard
  number="1.1"                    // optional badge number
  title="Card Title"
  tag="Definition"                // "Definition" | "Key Concept" | "Formula" | "Example" | "Warning" | "Remember"
>
  <p>Content here as JSX</p>
</ConceptCard>
```

### MicroCheck
```tsx
// src/components/learn/MicroCheck.tsx — "use client"
import MicroCheck from "@/components/learn/MicroCheck"

<MicroCheck
  question="What is X?"
  options={["Option A", "Option B", "Option C", "Option D"]}
  correct={1}                     // 0-indexed
  explanation="Because Y..."
/>
```

### ExitQuiz
```tsx
// src/components/learn/ExitQuiz.tsx — "use client"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"

const QUIZ: QuizQuestion[] = [
  {
    question: "...",
    options: ["A", "B", "C", "D"],
    correct: 0,        // 0-indexed
    explanation: "..."
  },
  // ... 10 questions minimum
]

<ExitQuiz
  moduleName="Unit X: Title"
  questions={QUIZ}
  passThreshold={7}     // always 7 out of 10
/>
```

### ObjectivesCard
```tsx
import ObjectivesCard from "@/components/learn/ObjectivesCard"

<ObjectivesCard objectives={[
  "Objective 1...",
  "Objective 2...",
]} />
```

---

## 4. Architecture Patterns to Follow

### 4.1 Module Page Structure (page.tsx)

Every module page is a **server component** (no "use client") with this exact structure:

```tsx
import { SomeIcon, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimSomething from "./_components/AnimSomething"
import LessonProgressStrip from "./_components/LessonProgressStrip"

const QUIZ: QuizQuestion[] = [ /* 10 questions */ ]

function CBSEAccordion() { /* CBSE learning outcomes dropdown */ }
function LessonMap() { /* 2-3 lesson cards */ }
function SectionHeading({ n, title, lesson }: { n: string; title: string; lesson: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-sora font-bold text-white text-sm">{n}</span>
      <div>
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">{lesson}</p>
        <h2 className="font-sora font-bold text-gray-900 text-lg leading-tight">{title}</h2>
      </div>
    </div>
  )
}

export default function ModuleNPage() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">
      {/* Dark hero banner */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        {/* Decorative icons with opacity-[0.07] */}
        <div className="relative z-10">
          <span className="...">Unit N of 6</span>
          <span>~Xh hours</span>
          <span>Y marks · CBSE 417</span>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white">Title</h1>
          <p className="text-white/60">Description</p>
        </div>
      </div>

      <div className="mt-6"><CBSEAccordion /></div>

      <div className="py-10 space-y-16">
        <LessonMap />
        <ObjectivesCard objectives={[...]} />

        {/* Lesson sections with id="lesson-0N" and className="scroll-mt-20" */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="..." lesson="Lesson 1 of N" />
          <ConceptCard>...</ConceptCard>
          <AnimFrame><AnimComponent /></AnimFrame>
          <MicroCheck ... />
        </section>

        {/* More lessons... */}

        <section>
          <ExitQuiz moduleName="Unit N: Title" questions={QUIZ} passThreshold={7} />
        </section>
      </div>
    </div>
    </>
  )
}
```

### 4.2 Interactive Animation Component Pattern

Every animation follows the **split-pane** layout:

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimSomething() {
  const [active, setActive] = useState(0)

  return (
    <div className="grid md:grid-cols-[1fr_280px] min-h-100 rounded-2xl border border-gray-200 overflow-hidden">

      {/* Left: Dark SVG canvas */}
      <div className="bg-[#060A12] p-6 flex flex-col">
        {/* Tab buttons at top */}
        {/* SVG visualization or interactive content */}
        {/* Animated with framer-motion */}
      </div>

      {/* Right: Light info panel */}
      <div className="bg-white border-l border-gray-200 p-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* Info content that changes based on active state */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
```

### 4.3 LessonProgressStrip Pattern

Each module has its own LessonProgressStrip. It's always the same code with different LESSONS array:

```tsx
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const LESSONS = [
  { id: "lesson-01", num: "01", label: "Short Label", color: "#3B82F6" },
  { id: "lesson-02", num: "02", label: "Short Label", color: "#F97316" },
  // optionally lesson-03 with color "#7C3AED"
]
// ... rest is identical to module-2/_components/LessonProgressStrip.tsx
```

---

## 5. Sidebar Update Required

When building new units, update `src/components/learn/AI10Sidebar.tsx` to change `unlocked: false` → `unlocked: true` for the units being built. Currently Units 1-2 are unlocked.

Also update the course overview `src/app/learn/cbse-ai-class10/page.tsx` — the UNITS array there has `unlocked: true/false` for each unit, controlling the card style.

---

## 6. Remaining Work — Unit 3: Evaluating Models

**Route:** `/learn/cbse-ai-class10/module-3`  
**Hours:** ~35h | **Marks:** 8M | **Lessons:** 3

### Content (from CBSE textbook)

**Lesson 1: Why Evaluate? & Train-Test Split**
- Why model evaluation matters (can't just trust training accuracy)
- Train-test split concept: typically 80% training / 20% testing
- Overfitting (model memorizes training data, fails on new data)
- Underfitting (model too simple, can't learn patterns)
- Accuracy = correct predictions / total predictions
- Error = 1 - Accuracy

**Lesson 2: Confusion Matrix**
- Classification review (predicting categories, not numbers)
- Confusion Matrix: 2×2 grid with TP, TN, FP, FN
- True Positive: predicted positive, actually positive (predicted sick, IS sick)
- True Negative: predicted negative, actually negative (predicted healthy, IS healthy)  
- False Positive: predicted positive, actually negative (predicted sick, IS healthy) — Type I error
- False Negative: predicted negative, actually positive (predicted healthy, IS sick) — Type II error
- Football examples: "predicted France wins, France wins" = TP
- Medical examples: "predicted infected, actually not" = FP

**Lesson 3: Precision, Recall, F1 & Ethics**
- Precision = TP / (TP + FP) — "of all positive predictions, how many were correct?"
- Recall = TP / (TP + FN) — "of all actual positives, how many did we catch?"
- F1 Score = 2 × (Precision × Recall) / (Precision + Recall) — harmonic mean
- When to use Precision: spam filter (don't want good emails marked as spam → minimize FP)
- When to use Recall: cancer detection (don't want to miss cancer → minimize FN)
- Ethical evaluation: bias in training data, transparency of model decisions, accountability

### Files to Create

1. **`module-3/_components/LessonProgressStrip.tsx`** — 3 lessons:
   - `{ id: "lesson-01", label: "Why Evaluate?", color: "#3B82F6" }`
   - `{ id: "lesson-02", label: "Confusion Matrix", color: "#F97316" }`
   - `{ id: "lesson-03", label: "Metrics & Ethics", color: "#7C3AED" }`

2. **`module-3/_components/AnimTrainTestSplit.tsx`** — Interactive:
   - Left canvas: 20 data-point dots in a grid
   - Slider (0-100%) to control split ratio (default 80/20)
   - Blue dots = training, Orange dots = test
   - Dots animate color change as slider moves
   - Right panel: train count, test count, explanation of overfitting/underfitting

3. **`module-3/_components/AnimConfusionMatrixDeep.tsx`** — **WOW FEATURE**:
   - 12 medical scenarios shown one at a time
   - Student classifies each as TP/FP/TN/FN by clicking buttons
   - Live 2×2 matrix fills as they classify
   - After all 12: auto-calculate Accuracy, Precision, Recall, F1 with animated results
   - Scenario data:
   ```
   { symptoms: "Fever, cough, night sweats", predicted: "Infected", actual: "Infected", type: "TP" }
   { symptoms: "Mild headache only", predicted: "Not Infected", actual: "Not Infected", type: "TN" }
   { symptoms: "Fatigue and weight loss", predicted: "Infected", actual: "Not Infected", type: "FP" }
   { symptoms: "Persistent cough, fatigue", predicted: "Not Infected", actual: "Infected", type: "FN" }
   { symptoms: "High fever, breathlessness", predicted: "Infected", actual: "Infected", type: "TP" }
   { symptoms: "Slight cold, runny nose", predicted: "Not Infected", actual: "Not Infected", type: "TN" }
   { symptoms: "Chest pain, cough", predicted: "Infected", actual: "Infected", type: "TP" }
   { symptoms: "Seasonal allergy symptoms", predicted: "Infected", actual: "Not Infected", type: "FP" }
   { symptoms: "Chronic fatigue, appetite loss", predicted: "Not Infected", actual: "Infected", type: "FN" }
   { symptoms: "No symptoms, routine check", predicted: "Not Infected", actual: "Not Infected", type: "TN" }
   { symptoms: "Fever, body ache, cough", predicted: "Infected", actual: "Infected", type: "TP" }
   { symptoms: "Mild cough, no fever", predicted: "Not Infected", actual: "Not Infected", type: "TN" }
   ```

4. **`module-3/page.tsx`** — Server component, 3 lessons, 6 MicroChecks, 10-Q ExitQuiz

### MicroChecks for Unit 3
1. "What happens if you test a model on the same data it trained on?" → Overfitting
2. "A model predicts a healthy patient as sick. This is:" → False Positive
3. "If TP=80, TN=15, FP=5, FN=10, accuracy is:" → (80+15)/(80+15+5+10) = 86.4%
4. "Precision measures:" → Of all positive predictions, how many were actually positive
5. "In cancer detection, which metric matters most?" → Recall (minimize false negatives)
6. "AI accountability means:" → Holding developers responsible for AI system decisions

---

## 7. Remaining Work — Unit 4: No-Code AI for Statistical Data

**Route:** `/learn/cbse-ai-class10/module-4`  
**Hours:** ~25h | **Marks:** 6M | **Lessons:** 2

### Content (from CBSE textbook)

**Lesson 1: No-Code AI Introduction**
- What is No-Code AI? Build AI models without writing code, using visual drag-and-drop
- No-Code vs Low-Code vs Full-Code comparison:
  - Full-Code: Python, TensorFlow — maximum flexibility, needs programmers
  - Low-Code: Some code + visual components — moderate flexibility
  - No-Code: All visual, drag-drop — anyone can use, limited flexibility
- Why No-Code? Saves cost, no coding errors, accessible to non-technical people (doctors, architects, musicians)
- Benefits: visual interface, real-time preview, less stress, democratizes AI
- Disadvantages: lack of flexibility, automation bias, security issues, limited customization
- Automation bias: tendency to favor automated decisions over human judgement
- Example: Kayla the zoo dietitian — uses No-Code AI to predict animal dietary needs without coding

**Lesson 2: Popular Tools & Use Cases**
- 5 key no-code tools:
  1. Azure Machine Learning (Microsoft, July 2014) — enterprise-grade, drag-drop ML
  2. Google Cloud AutoML (Google, Jan 2018) — auto-trains custom models
  3. Orange Data Mining (Univ. of Ljubljana, Oct 1996) — visual data analysis
  4. Lobe AI (Microsoft, 2015) — image classification made easy
  5. Teachable Machine (Google, Nov 2017) — webcam-based model training
- AI Project Cycle in No-Code: same 6 stages but tools handle coding parts
- Palmer Penguins case study: classifying penguin species using Orange Data Mining

### Files to Create

1. **`module-4/_components/LessonProgressStrip.tsx`** — 2 lessons:
   - `{ id: "lesson-01", label: "No-Code AI Intro", color: "#3B82F6" }`
   - `{ id: "lesson-02", label: "Tools & Use Cases", color: "#F97316" }`

2. **`module-4/_components/AnimNoCodeComparison.tsx`** — Interactive:
   - Left canvas: 3 columns (Full-Code / Low-Code / No-Code)
   - Animated code lines vs visual blocks showing the spectrum
   - Click each to select
   - Right panel: details (who, time, flexibility, cost, examples, pros/cons)

3. **`module-4/_components/AnimNoCodeTools.tsx`** — **WOW FEATURE**:
   - Left canvas: 5 tool cards in a grid
   - Click → expands with animated highlight
   - Auto-cycles every 5 seconds, pauses on click
   - Right panel: name, developer, date, capabilities, best-for, difficulty gauge

4. **`module-4/page.tsx`** — Server component, 2 lessons, 5 MicroChecks, 10-Q ExitQuiz

### MicroChecks for Unit 4
1. "Main advantage of No-Code AI?" → Anyone can build AI without coding
2. "Which is NOT a disadvantage of No-Code?" → Faster development (it's an advantage)
3. "Automation bias means:" → Favoring automated decisions over contradictory human judgement
4. "Orange Data Mining was developed by:" → University of Ljubljana
5. "Best tool for quick webcam-based image classification?" → Teachable Machine

---

## 8. Remaining Work — Unit 5: Computer Vision

**Route:** `/learn/cbse-ai-class10/module-5`  
**Hours:** ~50h | **Marks:** 10M | **Lessons:** 3

### Content
**Lesson 1: How Computers See**
- Pixels: smallest unit of a digital image
- RGB color model: each pixel = (Red, Green, Blue) values 0-255
- Grayscale: single value 0 (black) to 255 (white)
- Image as a matrix of numbers

**Lesson 2: Computer Vision Applications**
- Face recognition, self-driving cars, medical imaging, defect detection
- Object detection vs image classification vs image segmentation

**Lesson 3: Convolution & CNNs**
- Convolution operation: kernel/filter slides over image, produces feature map
- Pooling: reduces dimensions (max pooling, average pooling)
- CNN architecture: Input → Conv → ReLU → Pool → Fully Connected → Output
- Teachable Machine for CV projects

### Interactive Components
1. **AnimPixelsExplorer** (WOW): Click on an image area → see RGB values, zoom into pixel grid
2. **AnimConvolution**: Animate a 3×3 kernel sliding over a small image matrix, showing multiplication and sum
3. **AnimCNNLayers**: Step through CNN layers (input → conv → relu → pool → FC → output) with data transforming at each stage

---

## 9. Remaining Work — Unit 6: Natural Language Processing

**Route:** `/learn/cbse-ai-class10/module-6`  
**Hours:** ~42h | **Marks:** 8M | **Lessons:** 3

### Content
**Lesson 1: NLP Fundamentals**
- What is NLP? Computers understanding human language
- NLP stages: Tokenization → Stop word removal → Stemming/Lemmatization → Feature extraction
- Bag of Words model

**Lesson 2: TF-IDF**
- Term Frequency (TF) = count of term in doc / total terms in doc
- Inverse Document Frequency (IDF) = log(total docs / docs containing term)
- TF-IDF = TF × IDF
- Worked example with 2-3 documents

**Lesson 3: Applications**
- Chatbots (rule-based vs AI-based)
- Sentiment Analysis: positive/negative/neutral classification
- Google Translate, voice assistants

### Interactive Components
1. **AnimNLPStages**: Step through tokenization → stop word removal → stemming on a sample sentence
2. **AnimTFIDF** (WOW): Enter 2-3 sentences, see live TF, IDF, and TF-IDF calculations with highlighted terms
3. **AnimSentimentAnalysis**: Type a sentence → see sentiment score bar (negative/neutral/positive)

---

## 10. Sidebar & Overview Updates

When building units, update TWO files:

### `src/components/learn/AI10Sidebar.tsx`
Change `unlocked: false` → `unlocked: true` for the relevant unit in the UNITS array (lines 11-14).

### `src/app/learn/cbse-ai-class10/page.tsx`
Change `unlocked: false` → `unlocked: true` for the relevant unit in the UNITS array.

---

## 11. Verification Commands

```bash
# Type check (should show 0 errors for class10 files)
npx tsc --noEmit 2>&1 | grep "class10"

# Build (will show "Compiled successfully" — Prisma error is pre-existing, unrelated)
npx next build

# Dev server
npm run dev
```

---

## 12. Quick Reference — Existing File Contents

For exact code patterns, read these files:
- **Module page template:** `src/app/learn/cbse-ai-class10/module-2/page.tsx`
- **Animation component:** `src/app/learn/cbse-ai-class10/module-2/_components/AnimMLModelTypes.tsx`
- **LessonProgressStrip:** `src/app/learn/cbse-ai-class10/module-2/_components/LessonProgressStrip.tsx`
- **Sidebar:** `src/components/learn/AI10Sidebar.tsx`
- **Design rules:** `AGENTS.md` (root of repo)
- **Course spec:** `CBSE_AI_MODULE.md` (root of repo)
- **Textbook content:** `Class10.txt` (root of repo)

---

## 13. Task Checklist

### ✅ Completed
- [x] `AI10Sidebar.tsx` — 6-unit sidebar
- [x] `layout.tsx` — course shell
- [x] `page.tsx` — course overview
- [x] Unit 1: page + 3 components (LessonProgressStrip, AnimEthicalFrameworks, AnimBioethicsCase)
- [x] Unit 2: page + 4 components (LessonProgressStrip, AnimAIMLDL, AnimMLModelTypes, AnimNeuralNetwork)
- [x] Prisma client generation fixed
- [x] TypeScript: zero errors in all class10 files

### 🔲 TODO — Build Next
- [ ] Unit 3: page.tsx + LessonProgressStrip + AnimTrainTestSplit + AnimConfusionMatrixDeep
- [ ] Unit 4: page.tsx + LessonProgressStrip + AnimNoCodeComparison + AnimNoCodeTools
- [ ] Unit 5: page.tsx + LessonProgressStrip + AnimPixelsExplorer + AnimConvolution + AnimCNNLayers
- [ ] Unit 6: page.tsx + LessonProgressStrip + AnimNLPStages + AnimTFIDF + AnimSentimentAnalysis
- [ ] Unlock Units 3-4 in AI10Sidebar.tsx
- [ ] Unlock Units 3-4 in overview page.tsx
- [ ] Unlock Units 5-6 in AI10Sidebar.tsx
- [ ] Unlock Units 5-6 in overview page.tsx
