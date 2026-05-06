import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, Search, Database } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const ICONS = [ShieldCheck, Smartphone, Search, Database];

export function HowItWorks() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-[#020202] border-t border-white/5 relative overflow-hidden" id="how-it-works">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-[100px] pointer-events-none" style={{ background: "linear-gradient(180deg, #39FF14, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {t.how.heading}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.how.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated line behind icons (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/10 z-0">
            <div className="h-full w-full" style={{ background: "linear-gradient(90deg, transparent, #39FF14, transparent)", opacity: 0.5 }} />
          </div>

          {t.how.steps.map((step, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 bg-[#0a0a0a] border border-white/10 p-6 rounded-xl text-center group hover:border-[#39FF14]/50 transition-all hover:-translate-y-1"
              >
                <div className="w-20 h-20 mx-auto bg-black rounded-full border border-white/10 mb-5 flex items-center justify-center relative group-hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-shadow">
                  <div
                    className="absolute -top-1 -right-1 w-7 h-7 rounded-full text-black font-bold font-mono flex items-center justify-center text-xs"
                    style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                  >
                    {index + 1}
                  </div>
                  <Icon className="w-8 h-8 text-gray-400 group-hover:text-[#39FF14] transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#39FF14] transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed text-balance">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
