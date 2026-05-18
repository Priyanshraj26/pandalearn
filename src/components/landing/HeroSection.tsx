"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronRight, Sparkles, BookOpen, Layers, Bot, Users,
  Code2, Brain, Network, Database, CheckCircle, Circle,
  Play, Pause, ChevronLeft, RefreshCw,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type BarState = "cmp" | "swap" | "postswap" | "pivot" | "min" | "sorted" | "active";

type Step = {
  arr: number[];
  hl: Partial<Record<number, BarState>>;
  stepDesc: string;
  tutorMsg: string;
  codeLine: number;
};

type AlgoId = "bubble" | "selection" | "quick" | "merge";

// ── Shared constants ──────────────────────────────────────────────────────────

const INIT_ARR = [7, 3, 5, 1, 8, 2, 6, 4];
const MAX_VAL  = 8;

const BAR_COLORS: Record<BarState, string> = {
  swap:     "#7c3aed",
  postswap: "#8b5cf6",
  cmp:      "#818cf8",
  pivot:    "#f97316",
  min:      "#fbbf24",
  sorted:   "#a78bfa",
  active:   "#c7d2fe",
};

function mk(
  arr: number[],
  hl: Partial<Record<number, BarState>>,
  stepDesc: string, tutorMsg: string, codeLine: number,
): Step {
  return { arr: [...arr], hl, stepDesc, tutorMsg, codeLine };
}

function getDelay(step: Step): number {
  const vals = Object.values(step.hl);
  if (vals.length === 0) return 2000;
  if (vals.some(s => s === "swap")) return 620;
  return 900;
}

// ── Bubble Sort ───────────────────────────────────────────────────────────────

function computeBubble(init: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...init];
  const n = a.length;
  let sc = 0; // sorted count from right

  const sh = (extra: Partial<Record<number, BarState>> = {}) =>
    Object.assign(
      Object.fromEntries(Array.from({ length: sc }, (_, i) => [n - 1 - i, "sorted" as BarState])),
      extra,
    );

  steps.push(mk(a, sh(), "Starting bubble sort on [7,3,5,1,8,2,6,4]",
    "An unsorted array. Bubble sort repeatedly compares adjacent pairs, swapping when out of order. Larger values gradually bubble rightward each pass.", 0));

  for (let i = 0; i < n - 1; i++) {
    steps.push(mk(a, sh(), `Pass ${i + 1} of ${n - 1}`,
      `Pass ${i + 1} begins. After this pass the ${["1st","2nd","3rd","4th","5th","6th","7th"][i]} largest element will reach its final position on the right.`, 1));

    for (let j = 0; j < n - i - 1; j++) {
      const w = a[j] > a[j + 1];
      steps.push(mk(a, sh({ [j]: w ? "swap" : "cmp", [j + 1]: w ? "swap" : "cmp" }),
        w ? `arr[${j}]=${a[j]} > arr[${j+1}]=${a[j+1]} → swap`
          : `arr[${j}]=${a[j]} ≤ arr[${j+1}]=${a[j+1]} → no swap`,
        w ? `${a[j]} > ${a[j+1]}: out of order, so we swap. The larger value moves one step right.`
          : `${a[j]} ≤ ${a[j+1]}: already in order. No swap needed.`,
        w ? 4 : 3));

      if (w) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push(mk(a, sh({ [j]: "postswap", [j + 1]: "postswap" }),
          `Swapped → ${a[j]} and ${a[j+1]} now in order`,
          `After swap: ${a[j]} moved left, ${a[j+1]} moved right. The larger value is one step closer to its final position.`, 4));
      }
    }
    sc++;
  }
  sc = n;
  steps.push(mk(a, sh(), "Array is fully sorted!",
    "Done! [1,2,3,4,5,6,7,8] - every element found its position through repeated bubbling. Bubble sort is simple but O(n²), making it slow for large inputs.", 0));
  return steps;
}

// ── Selection Sort ────────────────────────────────────────────────────────────

function computeSelection(init: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...init];
  const n = a.length;
  const done = new Set<number>();

  const bh = (extra: Partial<Record<number, BarState>> = {}) =>
    Object.assign(Object.fromEntries([...done].map(i => [i, "sorted" as BarState])), extra);

  steps.push(mk(a, bh(), "Starting selection sort on [7,3,5,1,8,2,6,4]",
    "Selection sort finds the minimum of the unsorted region and places it at the front. The sorted region grows leftward, one element per pass.", 0));

  for (let i = 0; i < n - 1; i++) {
    let mi = i;
    steps.push(mk(a, bh({ [i]: "min" }), `Pass ${i+1}: finding minimum from index ${i}`,
      `Pass ${i+1}: scanning from index ${i} rightward to find the smallest remaining element, then placing it at position ${i}.`, 1));

    for (let j = i + 1; j < n; j++) {
      const isNew = a[j] < a[mi];
      steps.push(mk(a, bh({ [mi]: "min", [j]: "cmp" }),
        isNew ? `arr[${j}]=${a[j]} < min ${a[mi]} → new minimum`
              : `arr[${j}]=${a[j]} ≥ min ${a[mi]} → keep current`,
        isNew ? `${a[j]} is smaller than the current minimum ${a[mi]}. Updating the minimum pointer to index ${j}.`
              : `${a[j]} ≥ current minimum ${a[mi]}, no change.`,
        isNew ? 4 : 3));
      if (isNew) mi = j;
    }

    if (mi !== i) {
      steps.push(mk(a, bh({ [i]: "swap", [mi]: "swap" }),
        `Swapping index ${i} (${a[i]}) ↔ index ${mi} (${a[mi]})`,
        `Minimum of the unsorted region is ${a[mi]} at index ${mi}. Swapping it to position ${i} to extend the sorted region.`, 5));
      [a[i], a[mi]] = [a[mi], a[i]];
      steps.push(mk(a, bh({ [i]: "postswap", [mi]: "postswap" }),
        `${a[i]} is now in its final sorted position`,
        `${a[i]} is at index ${i} - its correct final position. Note: selection sort always makes exactly n−1 swaps regardless of input.`, 5));
    }
    done.add(i);
  }
  done.add(n - 1);
  steps.push(mk(a, bh(), "Array is fully sorted!",
    "Done! [1,2,3,4,5,6,7,8] - selection sort made exactly 7 swaps. It's O(n²) comparisons but O(n) writes, useful when write operations are expensive.", 0));
  return steps;
}

// ── Quick Sort ────────────────────────────────────────────────────────────────

function computeQuick(init: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...init];
  const n = a.length;
  const done = new Set<number>();

  const bh = (extra: Partial<Record<number, BarState>> = {}) =>
    Object.assign(Object.fromEntries([...done].map(i => [i, "sorted" as BarState])), extra);

  steps.push(mk(a, bh(), "Starting quick sort on [7,3,5,1,8,2,6,4]",
    "Quick sort picks a pivot and partitions: elements ≤ pivot go left, greater go right. The pivot lands in its final position, then each half is sorted recursively.", 0));

  const stack: [number, number][] = [[0, n - 1]];

  while (stack.length > 0) {
    const [lo, hi] = stack.pop()!;
    if (lo >= hi) { if (lo === hi) done.add(lo); continue; }

    const pv = a[hi];
    steps.push(mk(a, bh({ [hi]: "pivot" }),
      `Range [${lo}..${hi}]: pivot = ${pv}`,
      `Picking ${pv} as pivot (last element of [${lo}..${hi}]). We'll scan left-to-right and move everything ≤ ${pv} to the left side.`, 1));

    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      const sm = a[j] <= pv;
      steps.push(mk(a, bh({ [hi]: "pivot", [j]: "cmp", ...(i >= lo ? { [i]: "min" } : {}) }),
        sm ? `arr[${j}]=${a[j]} ≤ pivot → left`
           : `arr[${j}]=${a[j]} > pivot → right`,
        sm ? `${a[j]} ≤ pivot ${pv}: belongs in the left partition. Incrementing boundary and swapping.`
           : `${a[j]} > pivot ${pv}: stays in the right partition.`,
        sm ? 3 : 2));

      if (sm) {
        i++;
        if (i !== j) {
          steps.push(mk(a, bh({ [hi]: "pivot", [i]: "swap", [j]: "swap" }),
            `Swapping arr[${i}]=${a[i]} ↔ arr[${j}]=${a[j]}`,
            `Swapping ${a[j]} to position ${i} to keep it within the ≤ pivot region.`, 3));
          [a[i], a[j]] = [a[j], a[i]];
          steps.push(mk(a, bh({ [hi]: "pivot", [i]: "postswap", [j]: "postswap" }),
            `${a[i]} is now in the left partition`,
            `${a[i]} moved to index ${i}, within the ≤ pivot region.`, 3));
        }
      }
    }

    const pp = i + 1;
    if (pp !== hi) {
      steps.push(mk(a, bh({ [pp]: "swap", [hi]: "swap" }),
        `Placing pivot ${pv} at index ${pp}`,
        `All elements processed. Placing pivot ${pv} at its final position ${pp}. Everything to its left is ≤ ${pv}, everything right is > ${pv}.`, 4));
      [a[pp], a[hi]] = [a[hi], a[pp]];
    }
    done.add(pp);
    steps.push(mk(a, bh({ [pp]: "sorted" }),
      `Pivot ${a[pp]} locked at index ${pp}`,
      `Pivot ${a[pp]} is at index ${pp} - its correct final position forever. Left [${lo}..${pp-1}] and right [${pp+1}..${hi}] will be sorted next.`, 4));

    if (pp + 1 <= hi) stack.push([pp + 1, hi]);
    if (lo <= pp - 1) stack.push([lo, pp - 1]);
  }

  steps.push(mk(a, bh(), "Array is fully sorted!",
    "Done! [1,2,3,4,5,6,7,8] - each pivot found its position in O(n) time. With a good pivot choice, quick sort runs in O(n log n); worst case (sorted input + last pivot) is O(n²).", 0));
  return steps;
}

// ── Merge Sort ────────────────────────────────────────────────────────────────

function computeMerge(init: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...init];
  const n = a.length;
  const done = new Set<number>();

  const bh = (extra: Partial<Record<number, BarState>> = {}) =>
    Object.assign(Object.fromEntries([...done].map(i => [i, "sorted" as BarState])), extra);

  steps.push(mk(a, bh(), "Starting merge sort on [7,3,5,1,8,2,6,4]",
    "Merge sort uses divide and conquer. Bottom-up: start by merging adjacent pairs of size 1, then size 2, then 4, until the whole array is merged. Guaranteed O(n log n).", 0));

  for (let w = 1; w < n; w *= 2) {
    steps.push(mk(a, bh(), `Merging sub-arrays of size ${w}`,
      `Level: merging adjacent sorted runs of length ${w} into runs of length ${w * 2}. There are ⌈n / ${w * 2}⌉ merges at this level.`, 1));

    for (let lo = 0; lo < n; lo += w * 2) {
      const mid = Math.min(lo + w - 1, n - 1);
      const hi  = Math.min(lo + w * 2 - 1, n - 1);
      if (mid >= hi) continue;

      const winHl = Object.fromEntries(
        Array.from({ length: hi - lo + 1 }, (_, k) => [lo + k, "active" as BarState]),
      );
      steps.push(mk(a, bh(winHl), `Merging [${lo}..${mid}] with [${mid+1}..${hi}]`,
        `Merging left [${lo}–${mid}] and right [${mid+1}–${hi}]. Two fingers scan each half, always picking the smaller front element.`, 2));

      const L = a.slice(lo, mid + 1);
      const R = a.slice(mid + 1, hi + 1);
      let li = 0, ri = 0, k = lo;

      while (li < L.length && ri < R.length) {
        const tl = L[li] <= R[ri];
        steps.push(mk(a, bh({ ...winHl, [lo + li]: "cmp", [mid + 1 + ri]: "cmp" }),
          tl ? `${L[li]} ≤ ${R[ri]} → take left`
             : `${L[li]} > ${R[ri]} → take right`,
          tl ? `${L[li]} ≤ ${R[ri]}: taking from the left half. The smaller value goes next into the merged result.`
             : `${R[ri]} < ${L[li]}: taking from the right half.`,
          3));
        a[k++] = tl ? L[li++] : R[ri++];
      }
      while (li < L.length) a[k++] = L[li++];
      while (ri < R.length) a[k++] = R[ri++];

      const mergedHl = Object.fromEntries(
        Array.from({ length: hi - lo + 1 }, (_, x) => [lo + x, "sorted" as BarState]),
      );
      for (let x = lo; x <= hi; x++) done.add(x);
      steps.push(mk(a, bh(mergedHl), `Merged → [${a.slice(lo, hi+1).join(", ")}]`,
        `Indices ${lo}–${hi} are now sorted: [${a.slice(lo, hi+1).join(", ")}]. This merged run will be used as input at the next level.`, 3));
    }
  }

  steps.push(mk(a, bh(), "Array is fully sorted!",
    "Done! [1,2,3,4,5,6,7,8] - merge sort is stable and always O(n log n). The trade-off is O(n) extra space for the temporary arrays during each merge.", 0));
  return steps;
}

// ── Algo registry ─────────────────────────────────────────────────────────────

const ALGO_CONFIGS = {
  bubble: {
    label: "Bubble Sort",
    codeLines: [
      "procedure bubbleSort(arr, n):",
      "  for i ← 0 to n−2:",
      "    for j ← 0 to n−i−2:",
      "      if arr[j] > arr[j+1]:",
      "        swap(arr[j], arr[j+1])",
    ],
    complexity: { time: "O(n²)", space: "O(1)", stable: "yes" },
  },
  selection: {
    label: "Selection Sort",
    codeLines: [
      "procedure selectionSort(arr, n):",
      "  for i ← 0 to n−2:",
      "    min ← i",
      "    for j ← i+1 to n−1:",
      "      if arr[j] < arr[min]: min ← j",
      "    swap(arr[i], arr[min])",
    ],
    complexity: { time: "O(n²)", space: "O(1)", stable: "no" },
  },
  quick: {
    label: "Quick Sort",
    codeLines: [
      "procedure quickSort(arr, lo, hi):",
      "  pivot ← arr[hi]; i ← lo−1",
      "  for j ← lo to hi−1:",
      "    if arr[j] ≤ pivot: i++; swap(i,j)",
      "  swap(arr[i+1], arr[hi])",
    ],
    complexity: { time: "O(n log n)", space: "O(log n)", stable: "no" },
  },
  merge: {
    label: "Merge Sort",
    codeLines: [
      "procedure mergeSort(arr):",
      "  for width ← 1, 2, 4…:",
      "    for lo ← 0, 2w, 4w…:",
      "      merge(arr, lo, lo+w, lo+2w)",
      "        pick smaller of L[i], R[j]",
    ],
    complexity: { time: "O(n log n)", space: "O(n)", stable: "yes" },
  },
} as const;

const ALGO_STEPS: Record<AlgoId, Step[]> = {
  bubble:    computeBubble(INIT_ARR),
  selection: computeSelection(INIT_ARR),
  quick:     computeQuick(INIT_ARR),
  merge:     computeMerge(INIT_ARR),
};

const ALGO_LIST: { id: AlgoId; label: string }[] = [
  { id: "bubble",    label: "Bubble Sort"    },
  { id: "selection", label: "Selection Sort" },
  { id: "quick",     label: "Quick Sort"     },
  { id: "merge",     label: "Merge Sort"     },
];

const SUB_NAV = [
  { Icon: Code2,    label: "DSA"      },
  { Icon: Brain,    label: "ML"       },
  { Icon: Network,  label: "Networks" },
  { Icon: Database, label: "Systems"  },
];

const STATS = [
  { Icon: BookOpen, value: "50+",  label: "Interactive Modules" },
  { Icon: Layers,   value: "2",    label: "Learning Tracks"     },
  { Icon: Bot,      value: "AI",   label: "Powered Tutor"       },
  { Icon: Users,    value: "10K+", label: "Students Learning"   },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function PseudoCodePanel({
  codeLines,
  activeLine,
  complexity,
}: {
  codeLines: readonly string[];
  activeLine: number;
  complexity: { time: string; space: string; stable: string };
}) {
  return (
    <div className="bg-gray-950 rounded-xl h-full flex flex-col overflow-hidden border border-white/6">
      <div className="px-3 py-2 border-b border-white/8">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Pseudocode</span>
      </div>
      <div className="flex-1 px-3 py-2.5 font-mono text-[11px] leading-[1.65] space-y-px overflow-hidden">
        {codeLines.map((line, i) => (
          <div
            key={i}
            className="relative rounded px-2 transition-colors duration-200"
            style={{
              background: i === activeLine ? "rgba(124,58,237,0.22)" : "transparent",
              color: i === activeLine ? "#c4b5fd" : "#6b7280",
            }}
          >
            {i === activeLine && (
              <motion.span
                className="absolute right-2 top-1/2 -translate-y-1/2 w-px h-3.5 bg-violet-400 rounded-sm"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.65, repeat: Infinity }}
              />
            )}
            <span className="text-gray-700 select-none mr-2">{i + 1}</span>
            {line}
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-white/8 flex items-center gap-4 text-[9px] font-mono">
        <span className="text-amber-400">Time: {complexity.time}</span>
        <span className="text-emerald-400">Space: {complexity.space}</span>
        <span className="text-gray-600">Stable: {complexity.stable}</span>
      </div>
    </div>
  );
}

function BarsViz({ step }: { step: Step }) {
  return (
    <div className="flex items-end gap-1 h-20">
      {step.arr.map((val, i) => {
        const state = step.hl[i];
        const color = state ? BAR_COLORS[state] : "#e2e8f0";
        const isActive = state === "swap" || state === "cmp" || state === "pivot" || state === "min";
        return (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            animate={{ backgroundColor: color, y: isActive ? -3 : 0, scaleY: isActive ? 1.04 : 1 }}
            style={{ height: `${(val / MAX_VAL) * 100}%`, originY: "bottom" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [algoId, setAlgoId]     = useState<AlgoId>("bubble");
  const [stepIdx, setStepIdx]   = useState(0);
  const [playing, setPlaying]   = useState(true);
  const [xpVisible, setXpVisible] = useState(false);
  const [tutorPhase, setTutorPhase] = useState<"typing" | "streaming">("streaming");
  const [visibleWords, setVisibleWords] = useState(
    ALGO_STEPS.bubble[0].tutorMsg.split(" ").length,
  );
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps  = ALGO_STEPS[algoId];
  const config = ALGO_CONFIGS[algoId];
  const step   = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  const advance = useCallback(() => {
    setStepIdx(prev => {
      const next = prev + 1;
      if (next >= steps.length) { setPlaying(false); return prev; }
      const vals = Object.values(steps[prev].hl);
      if (vals.some(s => s === "swap" || s === "postswap")) setXpVisible(true);
      return next;
    });
  }, [steps]);

  const switchAlgo = useCallback((id: AlgoId) => {
    setAlgoId(id);
    setStepIdx(0);
    setPlaying(true);
    setXpVisible(false);
  }, []);

  const reset = useCallback(() => {
    setStepIdx(0);
    setPlaying(true);
    setXpVisible(false);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!playing || isLast) return;
    const delay = getDelay(step);
    const id = setTimeout(advance, delay);
    return () => clearTimeout(id);
  }, [playing, isLast, step, advance]);

  // XP toast
  useEffect(() => {
    if (!xpVisible) return;
    const id = setTimeout(() => setXpVisible(false), 2000);
    return () => clearTimeout(id);
  }, [xpVisible]);

  // Tutor typing → streaming animation
  useEffect(() => {
    if (streamRef.current) clearInterval(streamRef.current);
    if (typingRef.current) clearTimeout(typingRef.current);
    setTutorPhase("typing");
    setVisibleWords(0);

    typingRef.current = setTimeout(() => {
      setTutorPhase("streaming");
      const words = ALGO_STEPS[algoId][stepIdx].tutorMsg.split(" ");
      let count = 0;
      streamRef.current = setInterval(() => {
        count += 1;
        setVisibleWords(count);
        if (count >= words.length) clearInterval(streamRef.current!);
      }, 40);
    }, 500);

    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [stepIdx, algoId]);

  const tutorText = ALGO_STEPS[algoId][stepIdx].tutorMsg;
  const tutorWords = tutorText.split(" ");

  return (
    <section className="relative bg-white overflow-hidden">

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(203,213,225,0.45) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 100% 90% at 50% 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 100% 90% at 50% 0%, black 40%, transparent 100%)",
      }} />

      {/* Hero text */}
      <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-12 text-center">
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 text-sm font-medium px-4 py-2 rounded-full mb-8 select-none">
          <Sparkles size={13} className="text-violet-500" />
          Early access is open
          <span className="w-px h-3.5 bg-violet-200" />
          10,000+ students
          <ChevronRight size={13} className="text-violet-400" />
        </motion.div>

        <motion.h1
          {...fadeUp(0.07)}
          className="font-sora font-extrabold text-gray-900 tracking-tight mb-5"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1 }}
        >
          Learn CS &amp; ML the way<br />
          it{" "}
          <span className="gradient-text">should&apos;ve always been.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.13)} className="text-lg text-gray-500 leading-relaxed mb-9 max-w-xl mx-auto">
          Not videos. Not slides. Live interactive visualizations, an AI tutor,
          and gamified XP - for school students and engineering grads.
        </motion.p>

        <motion.div {...fadeUp(0.19)} className="flex flex-wrap items-center justify-center gap-3 mb-9">
          <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold bg-orange-500 hover:bg-orange-400 rounded-xl shadow-md hover:-translate-y-px active:translate-y-0 transition-all text-[0.95rem]">
            Start Free - no card needed <ArrowRight size={16} />
          </a>
          <a href="#tracks" className="inline-flex items-center gap-2 px-7 py-3.5 text-gray-600 font-semibold border-2 border-gray-200 hover:border-violet-300 hover:text-violet-700 rounded-xl transition-all text-[0.95rem]">
            Explore Courses
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.25)} className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {["#7c3aed","#f97316","#0d9488","#f43f5e","#2563eb"].map((bg, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ background: bg }}>
                {["P","A","R","S","K"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="text-amber-400">★★★★★</span>{" "}
            <strong className="text-gray-700 font-semibold">10,000+</strong> students already learning
          </p>
        </motion.div>
      </div>

      {/* Product preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl px-6 pb-0"
      >
        <div className="absolute bottom-0 left-6 right-6 h-28 bg-linear-to-t from-white to-transparent z-10 pointer-events-none rounded-b-2xl" />

        <div className="rounded-t-2xl border border-gray-200 shadow-2xl shadow-gray-300/40 overflow-hidden">

          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-400 text-center max-w-sm mx-auto">
              pandalearn.in/dsa/sorting/{algoId.replace("selection","selection-sort").replace("bubble","bubble-sort").replace("quick","quick-sort").replace("merge","merge-sort")}
            </div>
            <div className="shrink-0 w-28 flex justify-end">
              <AnimatePresence>
                {xpVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  >
                    <Sparkles size={10} />+10 XP
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* App layout */}
          <div className="bg-white grid grid-cols-[192px_1fr] min-h-85 divide-x divide-gray-100">

            {/* Sidebar */}
            <div className="bg-gray-50/60 p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-3 px-1">
                <span>DSA</span>
                <ChevronRight size={9} />
                <span className="text-violet-600 font-medium">Sorting</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 px-1">
                Module 3
              </p>

              {ALGO_LIST.map(({ id, label }) => {
                const isActive = id === algoId;
                const isDone   = id === "bubble" && !isActive;
                return (
                  <button
                    key={id}
                    onClick={() => switchAlgo(id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all w-full text-left ${
                      isActive
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {isActive ? (
                      <CheckCircle size={11} className="shrink-0" />
                    ) : isDone ? (
                      <CheckCircle size={11} className="shrink-0 text-violet-400" />
                    ) : (
                      <Circle size={11} className="shrink-0 opacity-40" />
                    )}
                    {label}
                  </button>
                );
              })}

              <div className="mt-auto pt-4 border-t border-gray-200 space-y-0.5">
                {SUB_NAV.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-gray-400 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <Icon size={11} />{label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="p-5 flex flex-col gap-4">

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={algoId}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="font-sora font-bold text-gray-900 text-sm"
                    >
                      {config.label} Visualizer
                    </motion.h3>
                  </AnimatePresence>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Step {stepIdx + 1} / {steps.length}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => { setStepIdx(i => Math.max(0, i - 1)); setPlaying(false); }}
                    disabled={stepIdx === 0}
                    className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={13} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => setPlaying(p => !p)}
                    disabled={isLast}
                    className="w-7 h-7 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 flex items-center justify-center transition-colors"
                  >
                    {playing && !isLast
                      ? <Pause size={11} className="text-white" />
                      : <Play  size={11} className="text-white ml-0.5" />
                    }
                  </button>
                  <button
                    onClick={() => { if (!isLast) advance(); setPlaying(false); }}
                    disabled={isLast}
                    className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={13} className="text-gray-600" />
                  </button>
                  <button onClick={reset} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <RefreshCw size={11} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Bars + pseudocode */}
              <div className="grid grid-cols-[3fr_2fr] gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <BarsViz step={step} />
                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400 mt-3">
                    {algoId === "quick" ? (
                      <>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.pivot }} />Pivot</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.cmp }} />Comparing</span>
                      </>
                    ) : algoId === "selection" ? (
                      <>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.min }} />Current min</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.cmp }} />Scanning</span>
                      </>
                    ) : algoId === "merge" ? (
                      <>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.active }} />Merge window</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.cmp }} />Comparing</span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.swap }} />Swapping</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.cmp }} />Comparing</span>
                      </>
                    )}
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: BAR_COLORS.sorted }} />Sorted</span>
                  </div>
                  {/* Step desc */}
                  <div className="mt-2.5 min-h-[2.2em]">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${algoId}-${stepIdx}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="text-[11px] text-gray-500 font-medium leading-snug"
                      >
                        {step.stepDesc}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={algoId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <PseudoCodePanel
                      codeLines={config.codeLines}
                      activeLine={step.codeLine}
                      complexity={config.complexity}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* AI tutor */}
              <div className="flex items-start gap-2.5">
                <motion.div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border"
                  animate={
                    tutorPhase === "typing"
                      ? { backgroundColor: ["#ede9fe","#ddd6fe","#ede9fe"], borderColor: ["#c4b5fd","#a78bfa","#c4b5fd"] }
                      : { backgroundColor: "#ede9fe", borderColor: "#c4b5fd" }
                  }
                  transition={{ duration: 0.8, repeat: tutorPhase === "typing" ? Infinity : 0 }}
                >
                  <Bot size={12} className="text-violet-600" />
                </motion.div>

                <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 border border-gray-200 min-h-10">
                  <AnimatePresence mode="wait" initial={false}>
                    {tutorPhase === "typing" ? (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xs font-semibold text-gray-700">AI Tutor</span>
                        <TypingIndicator />
                      </motion.div>
                    ) : (
                      <motion.p
                        key={`msg-${algoId}-${stepIdx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-gray-600 leading-relaxed"
                      >
                        <span className="font-semibold text-gray-800">AI Tutor: </span>
                        {tutorWords.slice(0, visibleWords).join(" ")}
                        {visibleWords < tutorWords.length && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.65, repeat: Infinity }}
                            className="inline-block w-px h-3 bg-gray-500 ml-0.5 align-middle"
                          />
                        )}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="border-t border-gray-100 bg-gray-50/80 px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-gray-600">Level 12</span>
              <div className="w-28 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-violet-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "84%" }}
                  transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <span className="text-[11px] text-gray-400">4,230 / 5,000 XP</span>
            </div>
            <div className="text-[11px] text-orange-500 font-semibold">🔥 7 day streak</div>
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <div className="border-t border-gray-100 bg-gray-50/70 mt-0">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <s.Icon size={15} className="text-violet-600" />
                </div>
                <div>
                  <div className="font-sora text-lg font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
