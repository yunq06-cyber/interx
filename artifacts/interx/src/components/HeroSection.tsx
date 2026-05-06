"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { ChatModal } from "@/components/ChatModal";
import earthBg from "@assets/From_KlickPin_CF_Clear_democracy_notes_for_modern_homes_made_f_1777792069786.mp4";
import logoImg from "@assets/b2c6b384-0d96-4e2b-8733-54c629541641_1777651387394.png";

const spring = { type: "spring" as const, stiffness: 60, damping: 20, mass: 1 };

export function HeroSection() {
  const { t } = useLang();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        {/* Background layer */}
        <div className="absolute inset-0 z-[-2] pointer-events-none">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src={earthBg}
          />
        </div>
        <div
          className="absolute inset-0 z-[-1] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.58) 100%)",
          }}
        />
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Background visuals removed as per request */}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 text-center w-full leading-[1.2] text-balance"
          >
            <span className="block text-white mb-2">{t.hero.line1}</span>
            <span className="relative block py-1 md:py-2">
              {/* Main Text Layer */}
              <motion.span
                className="relative block bg-clip-text text-transparent bg-gradient-to-r from-[#39FF14] via-[#0022FF] to-[#39FF14]"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              >
                {t.hero.line3}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="text-center text-base sm:text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed text-balance px-4 sm:px-0"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full max-w-md sm:max-w-none"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                onClick={() => setChatOpen(true)}
                className="w-full sm:w-auto text-black font-bold text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-full hover:opacity-90 transition-all shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.7)] border-none cursor-pointer"
                style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                data-testid="hero-cta-primary"
                aria-label={t.hero.cta1}
              >
                {t.hero.cta1}
              </Button>
            </motion.div>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto text-white border-white/20 bg-white/5 backdrop-blur-md hover:border-[#39FF14] hover:bg-[#39FF14]/10 text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-full transition-all"
              data-testid="hero-cta-secondary"
            >
              <a href="#how-it-works">
                {t.hero.cta2}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Floating chat modal — fixed-positioned, renders over everything */}
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
