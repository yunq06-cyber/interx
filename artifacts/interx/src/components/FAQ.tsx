import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export function FAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section 
      className="py-24 bg-black border-t border-white/5 relative overflow-hidden" 
      id="faq"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' } as React.CSSProperties}
    >
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-5 blur-[120px] pointer-events-none" 
        style={{ background: "radial-gradient(circle, #0022FF, transparent)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {t.faq.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.faq.sub}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? "bg-white/5 border-[#39FF14]/30" : "bg-[#0a0a0a] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                    isOpen ? "text-[#39FF14]" : "text-gray-200"
                  }`}>
                    {item.q}
                  </span>
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    isOpen ? "bg-[#39FF14] text-black" : "bg-white/5 text-gray-500"
                  }`}>
                    {isOpen ? <Minus className="w-3 h-3 sm:w-4 sm:h-4" /> : <Plus className="w-3 h-3 sm:w-4 sm:h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-gray-400 leading-relaxed text-sm sm:text-base border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
