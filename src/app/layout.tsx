import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PandaLearn — Interactive CS & ML Learning Platform",
  description:
    "Learn Computer Science and Machine Learning through live interactive visualizations. Neural networks, algorithms, computer networks — all interactive. Built for Grade 9–12 students and engineering graduates.",
  keywords: [
    "interactive CS learning",
    "machine learning tutorial",
    "data structures visualizer",
    "learn programming online",
    "algorithm animation",
    "neural network visualization",
    "computer science for students",
    "engineering interview preparation",
    "system design course",
    "AI tutor for students",
  ],
  authors: [{ name: "PandaLearn" }],
  openGraph: {
    title: "PandaLearn — CS & ML that you can touch",
    description:
      "Interactive visualizations, AI tutor, gamified progress. Built for school students and engineering grads.",
    type: "website",
    url: "https://pandalearn.io",
    siteName: "PandaLearn",
  },
  twitter: {
    card: "summary_large_image",
    title: "PandaLearn — CS & ML that you can touch",
    description:
      "Interactive visualizations, AI tutor, gamified progress. Built for school students and engineering grads.",
    site: "@pandalearn",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://pandalearn.io"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "PandaLearn",
  description:
    "Interactive CS & ML learning platform with live visualizations and AI tutor",
  url: "https://pandalearn.io",
  sameAs: [
    "https://twitter.com/pandalearn",
    "https://linkedin.com/company/pandalearn",
    "https://youtube.com/@pandalearn",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free access to first 3 modules per subject",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
