import LandingNavbar from "@/components/layout/LandingNavbar";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Footer from "@/components/layout/Footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black text-[#F0E7D5] flex flex-col justify-between relative overflow-hidden">
      <LandingNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 pt-24 pb-16 relative z-10">
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
}
