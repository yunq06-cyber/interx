import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export function StatsStrip() {
  const { t } = useLang();

  const stats = [
    { value: "2M+",   labelKey: "listings"     as const },
    { value: "180+",  labelKey: "countries"    as const },
    { value: "500K+", labelKey: "sellers"      as const },
    { value: "98.2%", labelKey: "satisfaction" as const },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-mono font-bold mb-2 tracking-tighter"
                style={{
                  background: "linear-gradient(135deg, #39FF14, #0022FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                {t.stats[stat.labelKey]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
