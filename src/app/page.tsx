import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import TracksSection from "@/components/landing/TracksSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ModuleShowcase from "@/components/landing/ModuleShowcase";
import GamificationSection from "@/components/landing/GamificationSection";
import AITutorSection from "@/components/landing/AITutorSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <TracksSection />
        <HowItWorks />
        <ModuleShowcase />
        <GamificationSection />
        <AITutorSection />
        <PricingSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
