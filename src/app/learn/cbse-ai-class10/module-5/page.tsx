import { Eye, Grid3X3, ScanLine, Clock, Target, ChevronDown, BookOpen } from "lucide-react"
import AnimFrame from "@/components/learn/AnimFrame"
import ConceptCard from "@/components/learn/ConceptCard"
import MicroCheck from "@/components/learn/MicroCheck"
import ExitQuiz, { type QuizQuestion } from "@/components/learn/ExitQuiz"
import ObjectivesCard from "@/components/learn/ObjectivesCard"
import AnimPixelsExplorer from "./_components/AnimPixelsExplorer"
import AnimConvolution from "./_components/AnimConvolution"
import AnimCNNLayers from "./_components/AnimCNNLayers"
import LessonProgressStrip from "./_components/LessonProgressStrip"

// ── Quiz ─────────────────────────────────────────────────────────────────────

const QUIZ: QuizQuestion[] = [
  {
    question: "What is the smallest unit of a digital image?",
    options: ["Byte", "Pixel", "Vector", "Frame"],
    correct: 1,
    explanation: "A pixel (picture element) is the smallest unit of a digital image. Each pixel stores colour information as numerical values.",
  },
  {
    question: "In the RGB colour model, each pixel stores:",
    options: [
      "One number from 0 to 255",
      "Two numbers for X and Y position",
      "Three numbers (Red, Green, Blue) each from 0 to 255",
      "Four numbers including transparency",
    ],
    correct: 2,
    explanation: "RGB uses 3 channels: Red, Green, and Blue, each ranging from 0 (no intensity) to 255 (full intensity). Together they create over 16 million possible colours.",
  },
  {
    question: "A grayscale image stores each pixel as:",
    options: [
      "Three RGB values",
      "A single value from 0 (black) to 255 (white)",
      "Two values for brightness and contrast",
      "No numerical values",
    ],
    correct: 1,
    explanation: "Grayscale images use a single channel — one number per pixel where 0 = pure black and 255 = pure white, with shades of grey in between.",
  },
  {
    question: "Which of these is NOT a computer vision application?",
    options: [
      "Face recognition",
      "Self-driving cars",
      "Spell checking in documents",
      "Medical image analysis",
    ],
    correct: 2,
    explanation: "Spell checking is a Natural Language Processing (NLP) task, not computer vision. CV deals with visual data — images and video.",
  },
  {
    question: "In a convolution operation, what does the kernel/filter do?",
    options: [
      "Removes all colours from the image",
      "Slides over the image, performing element-wise multiplication and summation",
      "Increases the image resolution",
      "Converts the image to text",
    ],
    correct: 1,
    explanation: "A kernel is a small matrix that slides over the input image. At each position, it performs element-wise multiplication with the overlapping region and sums the results to detect specific features.",
  },
  {
    question: "Max pooling with a 2×2 window reduces a 26×26 feature map to:",
    options: ["52×52", "13×13", "26×26", "6×6"],
    correct: 1,
    explanation: "2×2 max pooling with stride 2 halves each dimension: 26÷2 = 13. So the output is 13×13, reducing the data by 75% while keeping the strongest features.",
  },
  {
    question: "The correct order of layers in a basic CNN is:",
    options: [
      "Output → Conv → Pool → Input",
      "Input → Conv → ReLU → Pool → FC → Output",
      "Input → Pool → Conv → Output",
      "Conv → Input → Output → Pool",
    ],
    correct: 1,
    explanation: "A CNN processes data in order: Input (raw image) → Convolution (feature detection) → ReLU (activation) → Pooling (dimension reduction) → Fully Connected → Output.",
  },
  {
    question: "What is the purpose of the ReLU activation function?",
    options: [
      "To increase image resolution",
      "To replace negative values with 0, adding non-linearity",
      "To convert images to grayscale",
      "To reduce the number of layers",
    ],
    correct: 1,
    explanation: "ReLU (Rectified Linear Unit) replaces all negative values with 0 while keeping positive values unchanged. This adds non-linearity, allowing the network to learn complex patterns.",
  },
  {
    question: "Object detection differs from image classification because it:",
    options: [
      "Only works with grayscale images",
      "Identifies AND locates objects with bounding boxes",
      "Is always less accurate",
      "Doesn't use neural networks",
    ],
    correct: 1,
    explanation: "Image classification tells you WHAT is in the image. Object detection tells you WHAT is in the image AND WHERE it is, drawing bounding boxes around each detected object.",
  },
  {
    question: "Which Google tool can train image classification models using a webcam?",
    options: ["Google Maps", "Teachable Machine", "Google Sheets", "Google Docs"],
    correct: 1,
    explanation: "Google's Teachable Machine lets you train image, sound, and pose classification models directly in your browser using your webcam — no coding required.",
  },
]

// ── CBSE Syllabus accordion ────────────────────────────────────────────────────

function CBSEAccordion() {
  const outcomes = [
    "Understand how computers represent images as grids of pixel values.",
    "Explain the RGB colour model and grayscale conversion.",
    "Identify major computer vision applications in the real world.",
    "Differentiate between object detection, image classification, and image segmentation.",
    "Explain the convolution operation with kernels and feature maps.",
    "Describe the CNN architecture: Conv → ReLU → Pool → FC → Output.",
    "Use Teachable Machine for computer vision projects.",
  ]
  return (
    <details className="group rounded-2xl border border-violet-200 overflow-hidden">
      <summary className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <BookOpen size={14} className="text-violet-500 shrink-0" />
        <span className="text-xs font-bold text-violet-700 flex-1">CBSE 417 · Unit 5 — Official Learning Outcomes</span>
        <ChevronDown size={14} className="text-violet-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-5 py-4 bg-white space-y-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Learning Outcomes</p>
          <ul className="space-y-1.5">
            {outcomes.map((o, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-violet-100 text-violet-600 text-[9px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Theory Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">20h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Practical Hours</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">30h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Max Marks</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">10M</p>
          </div>
        </div>
      </div>
    </details>
  )
}

// ── Lesson map ────────────────────────────────────────────────────────────────

function LessonMap() {
  const lessons = [
    {
      n: "01", href: "#lesson-01",
      accent: "#3B82F6", bg: "#EFF6FF", textColor: "text-blue-700",
      title: "How Computers See",
      time: "~40 min",
      topics: ["Pixels", "RGB", "Grayscale", "Image Matrix"],
      feature: "WOW: Interactive pixel explorer",
    },
    {
      n: "02", href: "#lesson-02",
      accent: "#F97316", bg: "#FFF7ED", textColor: "text-orange-700",
      title: "Computer Vision Applications",
      time: "~30 min",
      topics: ["Face Recognition", "Self-Driving", "Medical Imaging"],
      feature: "Detection vs Classification vs Segmentation",
    },
    {
      n: "03", href: "#lesson-03",
      accent: "#7C3AED", bg: "#F5F3FF", textColor: "text-violet-700",
      title: "Convolution & CNNs",
      time: "~50 min",
      topics: ["Kernels", "Feature Maps", "Pooling", "CNN Layers"],
      feature: "Live convolution + CNN layer walkthrough",
    },
  ]

  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Module Roadmap</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {lessons.map(l => (
          <a
            key={l.n}
            href={l.href}
            className="block rounded-2xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ borderColor: l.accent + "44", background: l.bg }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center font-sora font-bold text-white text-xs shrink-0"
                style={{ background: l.accent }}
              >
                {l.n}
              </span>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${l.textColor}`}>Lesson {l.n}</p>
                <p className="text-[11px] text-gray-400">{l.time}</p>
              </div>
            </div>
            <p className="font-sora font-bold text-gray-900 text-xs leading-snug mb-2.5">{l.title}</p>
            <div className="flex flex-wrap gap-1 mb-2.5">
              {l.topics.map(t => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">
                  {t}
                </span>
              ))}
            </div>
            <p className={`text-[10px] font-semibold ${l.textColor}`}>✦ {l.feature}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({ n, title, lesson }: { n: string; title: string; lesson: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center shrink-0">
        <span className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-sora font-bold text-white text-sm">
          {n}
        </span>
      </div>
      <div>
        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">{lesson}</p>
        <h2 className="font-sora font-bold text-gray-900 text-lg leading-tight">{title}</h2>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Module5Page() {
  return (
    <>
    <LessonProgressStrip />
    <div className="px-6 lg:px-10">

      {/* ── Hero banner ── */}
      <div className="relative bg-[#0d0d0d] rounded-2xl mt-6 p-8 overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none absolute inset-0">
          <Eye size={200} className="absolute -right-10 -top-8 text-orange-500 opacity-[0.07]" />
          <Grid3X3 size={72} className="absolute right-44 top-6 text-violet-400 opacity-[0.06] rotate-6" />
          <ScanLine size={60} className="absolute right-28 bottom-4 text-orange-400 opacity-[0.06]" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wide">
              Unit 5 of 6
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock size={11} /> ~50 hours
            </span>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Target size={11} /> 10 marks · CBSE 417
            </span>
          </div>
          <h1 className="font-sora text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            Computer Vision
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Three lessons: understand how computers see through pixels and RGB, explore real-world
            CV applications, and learn how CNNs detect features through convolution and pooling.
          </p>
        </div>
      </div>

      <div className="mt-6"><CBSEAccordion /></div>

      <div className="py-10 space-y-16">
        <LessonMap />

        <ObjectivesCard
          objectives={[
            "Explain how computers represent images as grids of pixel values.",
            "Describe the RGB colour model and how 3 channels create colours.",
            "Convert RGB pixels to grayscale using the weighted formula.",
            "Identify major computer vision applications: face recognition, self-driving, medical imaging.",
            "Differentiate between object detection, image classification, and image segmentation.",
            "Explain the convolution operation: kernel sliding, element-wise multiply, and summation.",
            "Describe the CNN pipeline: Input → Conv → ReLU → Pool → FC → Output.",
          ]}
        />

        {/* ════ LESSON 1: How Computers See ════ */}
        <section id="lesson-01" className="space-y-6 scroll-mt-20">
          <SectionHeading n="01" title="How Computers See" lesson="Lesson 1 of 3" />

          <ConceptCard number="1.1" title="Pixels — The Building Blocks" tag="Definition">
            <p>
              A <strong>pixel</strong> (picture element) is the smallest unit of a digital image.
              Every photo, video frame, and screenshot is made up of thousands or millions of tiny
              pixels arranged in a grid.
            </p>
            <p className="mt-2">
              A computer doesn&apos;t &quot;see&quot; images like we do — it sees a <strong>matrix of numbers</strong>.
              Each pixel is just a set of numerical values that represent colour.
            </p>
          </ConceptCard>

          <ConceptCard number="1.2" title="The RGB Colour Model" tag="Key Concept">
            <p>
              In colour images, each pixel stores <strong>3 values</strong> — one for each colour channel:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-red-600">R</p>
                <p className="text-[10px] text-red-700">Red (0–255)</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-emerald-600">G</p>
                <p className="text-[10px] text-emerald-700">Green (0–255)</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-600">B</p>
                <p className="text-[10px] text-blue-700">Blue (0–255)</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              (255, 0, 0) = pure red. (0, 255, 0) = pure green. (255, 255, 255) = white. (0, 0, 0) = black.
            </p>
          </ConceptCard>

          <ConceptCard number="1.3" title="Grayscale Images" tag="Formula">
            <p>
              <strong>Grayscale</strong> images use a single value per pixel: 0 (black) to 255 (white).
            </p>
            <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800">
              Gray = 0.299 × R + 0.587 × G + 0.114 × B
            </div>
            <p className="mt-2 text-xs text-gray-600">
              The human eye is most sensitive to green light, so green gets the highest weight (0.587)
              in the conversion formula.
            </p>
          </ConceptCard>

          <AnimFrame id="anim-pixels" title="Interactive: Pixel Explorer" description="Click pixels to see RGB values, toggle grayscale mode, and explore how computers see colour">
            <AnimPixelsExplorer />
          </AnimFrame>

          <MicroCheck
            question="How many values does each pixel in a colour (RGB) image store?"
            options={["1", "2", "3", "4"]}
            correct={2}
            explanation="Each pixel in an RGB image stores 3 values — one for Red, one for Green, and one for Blue, each ranging from 0 to 255."
          />

          <MicroCheck
            question="In a grayscale image, the value 0 represents:"
            options={["White", "Black", "Red", "Transparent"]}
            correct={1}
            explanation="In grayscale, 0 = pure black and 255 = pure white. Values in between represent shades of grey."
          />
        </section>

        {/* ════ LESSON 2: CV Applications ════ */}
        <section id="lesson-02" className="space-y-6 scroll-mt-20">
          <SectionHeading n="02" title="Computer Vision Applications" lesson="Lesson 2 of 3" />

          <ConceptCard number="2.1" title="Real-World CV Applications" tag="Key Concept">
            <div className="space-y-2 mt-1">
              {[
                ["🔐 Face Recognition", "Unlocking phones, security systems, attendance tracking."],
                ["🚗 Self-Driving Cars", "Detecting pedestrians, traffic signs, lane markings, other vehicles."],
                ["🏥 Medical Imaging", "Detecting tumours, fractures, eye diseases from X-rays, MRIs, retinal scans."],
                ["🏭 Defect Detection", "Inspecting products on manufacturing lines for quality control."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs font-bold text-gray-800 w-40 shrink-0">{title}</span>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard number="2.2" title="Three Types of CV Tasks" tag="Key Concept">
            <div className="space-y-3 mt-1">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">Image Classification</p>
                <p className="text-[11px] text-blue-800">Assigns a single label to entire image. &quot;This is a cat.&quot;</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <p className="text-xs font-bold text-orange-700 mb-1">Object Detection</p>
                <p className="text-[11px] text-orange-800">Identifies AND locates objects with bounding boxes. &quot;There&apos;s a cat at (x, y).&quot;</p>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
                <p className="text-xs font-bold text-violet-700 mb-1">Image Segmentation</p>
                <p className="text-[11px] text-violet-800">Labels every single pixel. &quot;These pixels are cat, those are background.&quot;</p>
              </div>
            </div>
          </ConceptCard>

          <MicroCheck
            question="Object detection differs from image classification because it:"
            options={[
              "Works with videos only",
              "Identifies AND locates objects with bounding boxes",
              "Is always less accurate",
              "Only detects one object at a time",
            ]}
            correct={1}
            explanation="Image classification just labels the image ('cat'). Object detection also localises the object with a bounding box — telling you WHERE it is."
          />
        </section>

        {/* ════ LESSON 3: Convolution & CNNs ════ */}
        <section id="lesson-03" className="space-y-6 scroll-mt-20">
          <SectionHeading n="03" title="Convolution & CNNs" lesson="Lesson 3 of 3" />

          <ConceptCard number="3.1" title="The Convolution Operation" tag="Key Concept">
            <p>
              <strong>Convolution</strong> is the core operation in computer vision. A small matrix called
              a <strong>kernel</strong> (or filter) slides over the image. At each position, it performs
              element-wise multiplication with the overlapping region and sums all the products to produce
              one output value.
            </p>
            <p className="mt-2">
              Different kernels detect different features: edges, corners, textures, gradients.
              The output of convolution is called a <strong>feature map</strong>.
            </p>
          </ConceptCard>

          <AnimFrame id="anim-convolution" title="Interactive: Convolution Operation" description="Watch a kernel slide over an image matrix, see element-wise multiplication at each position">
            <AnimConvolution />
          </AnimFrame>

          <ConceptCard number="3.2" title="Pooling" tag="Key Concept">
            <p>
              <strong>Pooling</strong> reduces the dimensions of feature maps while preserving the
              most important information.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-700 mb-1">Max Pooling</p>
                <p className="text-[11px] text-amber-800">
                  Takes the maximum value from each 2×2 window. Keeps the strongest activations.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-700 mb-1">Average Pooling</p>
                <p className="text-[11px] text-blue-800">
                  Takes the average value from each window. Smoother but may lose some details.
                </p>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="3.3" title="CNN Architecture" tag="Key Concept">
            <p>
              A <strong>Convolutional Neural Network (CNN)</strong> chains multiple layers together
              to progressively extract features from raw pixels:
            </p>
            <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-center text-gray-800">
              Input → Conv → ReLU → Pool → Fully Connected → Output
            </div>
            <p className="mt-2 text-xs text-gray-600">
              Early layers detect simple features (edges, colours). Deeper layers detect complex patterns
              (eyes, faces, objects). The fully connected layer combines all features for final prediction.
            </p>
          </ConceptCard>

          <AnimFrame id="anim-cnn-layers" title="Interactive: CNN Layer Walkthrough" description="Step through each CNN layer and see how data transforms from raw pixels to predictions">
            <AnimCNNLayers />
          </AnimFrame>

          <MicroCheck
            question="In a convolution operation, the kernel:"
            options={[
              "Increases the image resolution",
              "Slides over the image, performing element-wise multiplication and summation",
              "Removes all colours from the image",
              "Only works on grayscale images",
            ]}
            correct={1}
            explanation="The kernel slides across the input, performing element-wise multiplication with the overlapping region at each position, then sums the products to produce one output value."
          />

          <MicroCheck
            question="After 2×2 max pooling, a 26×26 feature map becomes:"
            options={["52×52", "26×26", "13×13", "6×6"]}
            correct={2}
            explanation="2×2 max pooling with stride 2 halves each dimension: 26 ÷ 2 = 13. The output is 13×13, reducing data by 75% while preserving the strongest features."
          />
        </section>

        {/* ── Exit Quiz ── */}
        <section>
          <ExitQuiz
            moduleName="Unit 5: Computer Vision"
            questions={QUIZ}
            passThreshold={7}
          />
        </section>

      </div>
    </div>
    </>
  )
}
