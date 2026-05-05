import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import xianyuLogo from "@assets/xianyu-logo.png";

export function XianyuPortal() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="xianyu-portal">
      {/* Background decoration: Blurred Brand Logo Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-10 blur-[80px] pointer-events-none select-none grayscale brightness-50 contrast-125">
        <img src={xianyuLogo} alt="" className="w-full h-auto rotate-[-12deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group cursor-pointer"
          onClick={() => window.open("https://www.goofish.com/", "_blank")}
        >
          {/* Dynamic Gradient Border (Simulated with pseudo-elements in Tailwind) */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#39FF14] via-[#0022FF] to-[#39FF14] rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
          
          <div className="relative bg-[#050505] rounded-2xl p-8 md:p-16 flex flex-col items-center text-center">
            <motion.div
              animate={{ 
                boxShadow: ["0 0 0px rgba(57,255,20,0)", "0 0 20px rgba(57,255,20,0.2)", "0 0 0px rgba(57,255,20,0)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8"
            >
              <ExternalLink className="w-8 h-8 text-[#39FF14]" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 font-sans">
              {t.portal.title}
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.portal.desc}
            </p>

            <Button
              size="lg"
              className="text-black font-bold text-lg px-10 py-7 rounded-full transition-all hover:scale-110 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_35px_rgba(57,255,20,0.5)] border-none"
              style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
            >
              {t.portal.cta}
            </Button>

            {/* Sub decoration */}
            <div className="mt-8 flex items-center gap-2 text-[#39FF14]/40 font-mono text-xs tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-[#39FF14]/20" />
              Gateway to Global Trade
              <span className="w-8 h-[1px] bg-[#39FF14]/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
