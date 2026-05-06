"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!active) { setShown(""); return; }
    let i = 0;
    const t = setInterval(() => {
      setShown(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(t);
    }, 42);
    return () => clearInterval(t);
  }, [active, text]);
  return (
    <span className="font-mono text-xs" style={{ color: "#39FF14" }}>
      {shown}
      {active && shown.length < text.length && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>▌</motion.span>
      )}
    </span>
  );
}

export const VisualScanner = memo(function VisualScanner() {
  const [phase, setPhase] = useState<"scanning" | "verified">("scanning");

  useEffect(() => {
    setPhase("scanning");
    const scanTimer = setTimeout(() => setPhase("verified"), 2800);
    const resetTimer = setTimeout(() => setPhase("scanning"), 6000);
    return () => { clearTimeout(scanTimer); clearTimeout(resetTimer); };
  }, []);

  // Re-cycle
  useEffect(() => {
    if (phase !== "scanning") return;
    const scanTimer = setTimeout(() => setPhase("verified"), 2800);
    const resetTimer = setTimeout(() => setPhase("scanning"), 6000);
    return () => { clearTimeout(scanTimer); clearTimeout(resetTimer); };
  }, [phase]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ background: "#04040f" }}>
      {/* Grid bg */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      <div className="relative z-10 flex flex-col items-center gap-3 w-full px-6">
        {/* Camera product */}
        <div className="relative">
          {/* Body */}
          <div className="relative w-44 h-28 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Camera details */}
            <div className="absolute top-3 left-4 w-6 h-3 rounded bg-black/60 border border-white/10" />
            <div className="absolute top-2 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
            </div>
            {/* Lens */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "radial-gradient(circle, #1a1a3e, #080814)", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 0 20px rgba(0,34,255,0.2)" }}>
              <div className="w-8 h-8 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,34,255,0.4), rgba(0,0,0,0.8))", border: "1px solid rgba(0,34,255,0.3)" }} />
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/20" />
            </div>
            {/* Bottom grip */}
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-2 rounded-sm bg-white/5" />
              ))}
            </div>

            {/* Scanner line */}
            {phase === "scanning" && (
              <motion.div
                className="absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, #39FF14, #39FF14, transparent)",
                  boxShadow: "0 0 12px 4px rgba(57,255,20,0.5)",
                }}
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Verified flash overlay */}
            {phase === "verified" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ background: "rgba(57,255,20,0.05)" }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(57,255,20,0.2)", border: "2px solid #39FF14" }}
                >
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <motion.path d="M4 10 L8 14 L16 6" stroke="#39FF14" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }} />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Scan corner markers */}
          {[["top-0 left-0", "border-t-2 border-l-2 rounded-tl-lg"],
            ["top-0 right-0", "border-t-2 border-r-2 rounded-tr-lg"],
            ["bottom-0 left-0", "border-b-2 border-l-2 rounded-bl-lg"],
            ["bottom-0 right-0", "border-b-2 border-r-2 rounded-br-lg"],
          ].map(([pos, cls], i) => (
            <motion.div key={i}
              className={`absolute w-4 h-4 ${pos} ${cls}`}
              style={{ borderColor: "#39FF14" }}
              animate={{ opacity: phase === "scanning" ? [0.5, 1, 0.5] : 1 }}
              transition={{ duration: 1, repeat: phase === "scanning" ? Infinity : 0, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Badge */}
        <AnimatePresence mode="wait">
          {phase === "verified" ? (
            <motion.div
              key="badge"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.35)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#39FF14] font-mono">
                  WEB3 CHIP VERIFIED
                </span>
              </div>
              <div className="px-3 py-1 rounded text-[10px] tracking-wider"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <TypewriterText text="0x8F2a4d91bC3e...9C1f" active={phase === "verified"} />
              </div>
            </motion.div>
          ) : (
            <motion.div key="scanning-label"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-xs tracking-widest font-mono"
              style={{ color: "rgba(57,255,20,0.5)" }}>
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
                SCANNING...
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
