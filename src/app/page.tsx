import LandingNavbar from "@/components/layout/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import SandboxSection from "@/components/landing/SandboxSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F0E7D5] dark:bg-[#17191D] text-[#17191D] dark:text-[#F0E7D5] flex flex-col justify-between transition-colors duration-300 relative overflow-hidden isolate">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4BCC8]/30 via-[#F0E7D5]/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-[#8EB69B]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <LandingNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pt-28 pb-12 space-y-24 md:space-y-32 relative z-10">
        <HeroSection />
        <SandboxSection />
        <HowItWorksSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
