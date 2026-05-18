import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TracksSection from "@/components/landing/TracksSection";
import HowItWorks from "@/components/landing/HowItWorks";
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
        <TracksSection />
        <HowItWorks />
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
