"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Fingerprint, 
  Laptop,
  Camera,
  Gamepad2,
  MousePointer2,
  Maximize2,
  Info
} from "lucide-react";

// Import layer images
import layer0 from "@assets/layer-0-protective.png";
import layer1 from "@assets/layer-1-printed.png";
import layer2 from "@assets/layer-2-antenna.png";
import layer3 from "@assets/layer-3-secure.png";
import layer4 from "@assets/layer-4-tamper.png";
import layer5 from "@assets/layer-5-adhesive.png";

const layerImages = [layer0, layer1, layer2, layer3, layer4, layer5];

export function NFCSecuritySection() {
  const { t } = useLang();
  const n = t.nfc;
  const [isExploded, setIsExploded] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const appIcons = [<Laptop key="0" />, <Camera key="1" />, <Smartphone key="2" />, <Gamepad2 key="3" />];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="nfc-tech">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          opacity: isExploded ? 0.15 : 0.05,
          scale: isExploded ? 1.2 : 1 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/20 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck className="w-3 h-3" />
            Core Technology
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {n.title}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {n.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* LEFT: Interactive Exploded View */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[650px] flex items-center justify-center perspective-[2000px]">
            <div className="relative w-full max-w-md h-full flex items-center justify-center">
              {n.layers.map((layer, idx) => (
                <motion.div
                  key={idx}
                  animate={{ 
                    opacity: 1, 
                    y: isExploded 
                      ? (idx - (n.layers.length / 2)) * (window.innerWidth < 640 ? -60 : -115) 
                      : (idx - (n.layers.length / 2)) * -8,
                    rotateX: isExploded ? 55 : 20, 
                    rotateZ: isExploded ? -15 : 0,
                    scale: isExploded 
                      ? (window.innerWidth < 640 ? 0.75 : 1) - (idx * 0.03) 
                      : (window.innerWidth < 640 ? 0.8 : 1),
                    filter: !isExploded ? "brightness(0.8) contrast(1.1)" : "brightness(1.1) contrast(1.1)", 
                  }}
                  onMouseEnter={() => isExploded && setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                       setHoveredLayer(hoveredLayer === idx ? null : idx);
                    }
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 80,
                    damping: 18,
                    delay: idx * 0.04
                  }}
                  className={`absolute w-[280px] sm:w-[340px] aspect-[2.4/1] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/20 ${hoveredLayer === idx ? "ring-2 ring-brand-green/70 z-[100] scale-[1.05]" : ""}`}
                  style={{ 
                    zIndex: n.layers.length - idx,
                  }}
                >
                  <img 
                    src={layerImages[idx]} 
                    alt={layer.name} 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Layer Info Overlay */}
                  <AnimatePresence>
                    {(hoveredLayer === idx || (!isExploded && idx === 1)) && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 flex flex-col justify-center px-4 sm:px-6 backdrop-blur-[1px]"
                      >
                         <div className="flex items-center gap-2 sm:gap-3">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-green text-black flex items-center justify-center text-[9px] sm:text-[10px] font-bold font-mono shrink-0">
                              {n.layers.length - idx}
                            </span>
                            <div className="min-w-0">
                              <p className="text-white font-bold text-[10px] sm:text-xs truncate">{layer.name}</p>
                              <p className="text-brand-green font-bold text-[8px] sm:text-[9px] uppercase tracking-wider truncate">{layer.desc}</p>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              
              {/* Central Core Line */}
              <motion.div 
                animate={{ opacity: isExploded ? 0.6 : 0 }}
                className="absolute w-[1px] h-[350px] sm:h-[550px] bg-gradient-to-b from-brand-green/0 via-brand-green to-brand-green/0 pointer-events-none" 
              />
            </div>
          </div>

          {/* RIGHT: Complete Chip & Controls */}
          <div className="flex flex-col gap-8 md:gap-12">
            
            {/* Main Interactive Target */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-green/10 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExploded(!isExploded)}
                className="relative cursor-pointer rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    <span className="text-zinc-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Final Assembly</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-green font-mono text-[9px] sm:text-[10px] uppercase font-bold bg-brand-green/10 px-2 sm:px-3 py-1 rounded-full">
                    {isExploded ? "Exploded" : "Compact"}
                  </div>
                </div>

                <motion.div 
                  className="relative aspect-[2.4/1] mb-6 sm:mb-8 shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden group-hover:shadow-brand-green/20 transition-shadow"
                >
                  <img src={layer1} alt="Complete interX Chip" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Interaction Prompt Overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="flex flex-col items-center gap-3">
                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-green flex items-center justify-center text-black shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                          <Maximize2 className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 ${isExploded ? 'rotate-180' : ''}`} />
                       </div>
                       <p className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest">{isExploded ? "Merge View" : "Examine Layers"}</p>
                    </div>
                  </motion.div>
                </motion.div>

                <div className="flex items-center gap-4 sm:gap-6 text-zinc-500 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest">
                  <div className="flex items-center gap-2"><MousePointer2 className="w-3 h-3" /> {window.innerWidth < 1024 ? 'Tap' : 'Click'} to toggle</div>
                  <div className="flex items-center gap-2"><Info className="w-3 h-3" /> 6 Layers</div>
                </div>
              </motion.div>

              {/* Connecting Visual Link (Dashed Line) */}
              <div className="hidden lg:block absolute top-1/2 -left-16 w-16 border-t border-dashed border-white/20 pointer-events-none" />
            </div>

            {/* Application Grid */}
            <div className="pt-6 sm:pt-8 border-t border-white/5">
              <h4 className="text-white font-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-6 sm:mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                {n.applications.title}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {n.applications.items.map((app, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 text-center transition-colors"
                  >
                    <div className="text-zinc-400 scale-90 sm:scale-100">
                      {appIcons[idx]}
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-tight">{app}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
