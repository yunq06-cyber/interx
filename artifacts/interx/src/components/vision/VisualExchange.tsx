"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

function AnimatedCounter({ to, prefix, suffix = "" }: { to: number; prefix: string; suffix?: string }) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionVal.set(0);
    const controls = animate(motionVal, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = motionVal.on("change", (v) => setDisplay(Math.round(v)));
    return () => { controls.stop(); unsub(); };
  }, [to, motionVal]);

  return (
    <span className="tabular-nums">
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export const VisualExchange = memo(function VisualExchange() {
  const { lang } = useLang();
  const [showMiddleman, setShowMiddleman] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setShowMiddleman(true);
    setKey((k) => k + 1);
    const t1 = setTimeout(() => setShowMiddleman(false), 2200);
    const t2 = setTimeout(() => { setShowMiddleman(true); setKey((k) => k + 1); }, 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (showMiddleman) return;
    const t1 = setTimeout(() => setShowMiddleman(false), 2200);
    const t2 = setTimeout(() => { setShowMiddleman(true); setKey((k) => k + 1); }, 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [showMiddleman]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ background: "#04040f" }}>
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(0,34,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,34,255,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative z-10 flex flex-col items-center w-full px-4 gap-4">

        {/* Middleman row */}
        <div className="relative h-10 flex items-center justify-center w-full">
          <AnimatePresence>
            {showMiddleman && (
              <motion.div key={`mm-${key}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(6px)", transition: { duration: 0.5 } }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)" }}
              >
                <motion.span
                  exit={{ rotate: [0, -15, 15, -10, 0], transition: { duration: 0.4 } }}
                  className="text-sm">⚠️</motion.span>
                <span className="text-xs font-mono" style={{ color: "rgba(255,100,100,0.8)" }}>
                  {lang === "ko" ? "중간상 / 추가 수수료 +38%" : "Middleman / Extra Fees +38%"}
                </span>
                <motion.div className="text-xs line-through opacity-50 text-red-400">
                  ¥2,170
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cards + Arrow row */}
        <div className="flex items-center gap-3 w-full">
          {/* KRW Card */}
          <motion.div
            key={`krw-${key}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.5 }, x: { duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="flex-1 rounded-xl p-3 flex flex-col gap-1"
            style={{ background: "linear-gradient(135deg, rgba(0,34,255,0.15), rgba(0,34,255,0.05))", border: "1px solid rgba(0,34,255,0.3)" }}
          >
            <div className="text-[9px] font-mono tracking-widest" style={{ color: "rgba(100,140,255,0.7)" }}>KRW</div>
            <div className="text-sm font-bold text-white tabular-nums leading-tight">
              <AnimatedCounter key={key} to={289000} prefix="₩" />
            </div>
            <div className="text-[9px] font-mono" style={{ color: "rgba(100,140,255,0.5)" }}>
              {lang === "ko" ? "서울 · 서울" : "Seoul · 서울"}
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="relative flex flex-col items-center gap-1 shrink-0">
            <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
              <defs>
                <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0022FF" />
                  <stop offset="100%" stopColor="#39FF14" />
                </linearGradient>
                <filter id="arrow-glow">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <motion.path d="M 4 12 L 44 12" stroke="url(#arrow-grad)" strokeWidth="2.5"
                strokeLinecap="round" filter="url(#arrow-glow)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }} />
              <motion.path d="M 38 7 L 50 12 L 38 17" stroke="url(#arrow-grad)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" filter="url(#arrow-glow)"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }} />
              {/* Particle */}
              <circle r="3.5" fill="#39FF14" filter="url(#arrow-glow)">
                <animate attributeName="cx" values="4;50" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <span className="text-[8px] font-mono tracking-wider" style={{ color: "rgba(57,255,20,0.6)" }}>
              {lang === "ko" ? "직거래" : "DIRECT"}
            </span>
          </div>

          {/* CNY Card */}
          <motion.div
            key={`cny-${key}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.5, delay: 0.2 }, x: { duration: 0.5, delay: 0.2 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
            className="flex-1 rounded-xl p-3 flex flex-col gap-1"
            style={{ background: "linear-gradient(135deg, rgba(57,255,20,0.12), rgba(57,255,20,0.04))", border: "1px solid rgba(57,255,20,0.25)" }}
          >
            <div className="text-[9px] font-mono tracking-widest" style={{ color: "rgba(57,255,20,0.6)" }}>CNY</div>
            <div className="text-sm font-bold text-white tabular-nums leading-tight">
              <AnimatedCounter key={key} to={1580} prefix="¥" />
            </div>
            <div className="text-[9px] font-mono" style={{ color: "rgba(57,255,20,0.4)" }}>Beijing</div>
          </motion.div>
        </div>

        {/* FX rate strip */}
        <motion.div
          key={`fx-${key}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-full justify-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
            Live FX · ₩1 = ¥0.00547 · Zero fees
          </span>
        </motion.div>
      </div>
    </div>
  );
});
