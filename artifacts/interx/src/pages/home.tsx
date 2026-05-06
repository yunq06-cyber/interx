import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VisionServices } from "@/components/VisionServices";
import { CategoryStrip } from "@/components/CategoryStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { XianyuPortal } from "@/components/XianyuPortal";
import { NFCSecuritySection } from "@/components/NFCSecuritySection";
import { Footer } from "@/components/Footer";
import { NetworkBackground } from "@/components/NetworkBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#39FF14] selection:text-black">
      {/* Fixed canvas — z:0, behind everything */}
      <NetworkBackground />

      {/* All page content sits above the canvas at z:1 */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSection />
          <XianyuPortal />
          <NFCSecuritySection />
          <VisionServices />
          <CategoryStrip />
          <HowItWorks />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}
