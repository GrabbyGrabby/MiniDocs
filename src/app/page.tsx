import LandingNavbar from "@/components/layout/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import SandboxSection from "@/components/landing/SandboxSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-[#F0E7D5] flex flex-col justify-between relative overflow-hidden">
      <LandingNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-20 pb-12 space-y-24 md:space-y-32 relative z-10">
        <HeroSection />
        <SandboxSection />
        <HowItWorksSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
