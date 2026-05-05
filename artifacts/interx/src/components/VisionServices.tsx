"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

/* ─────────────────────────────────────────────
   Section data
───────────────────────────────────────────── */
const sections = [
  {
    id: 0,
    tag: "Our vision",
    title: "Redefining trust in cross-border trade",
    text: "We are building the most transparent second-hand network in Asia. Let used goods move across language and physical barriers safely and effortlessly, finding a new owner.",
  },
  {
    id: 1,
    tag: "Core technology",
    title: "No more counterfeits, Web3 hardware-grade verification",
    text: "We use blockchain and chip-based verification to give every high-value item a tamper-proof digital identity, fully traceable from shipment in Korea to receipt in China.",
  },
  {
    id: 2,
    tag: "Trading experience",
    title: "Cut out the middleman, connect buyers and sellers directly",
    text: "We remove the markup and information gap of traditional proxy buying. Built-in live FX and automated cross-border logistics make international trade feel as easy as local shopping.",
  },
];

/* ─────────────────────────────────────────────
   Visual 1 — Route Map (KR → CN)
───────────────────────────────────────────── */
function PulsingNode({
  x, y, label, color, delay = 0,
}: { x: number; y: number; label: string; color: string; delay?: number }) {
  return (
    <g>
      {[1, 2].map((ring) => (
        <motion.circle
          key={ring}
          cx={x} cy={y} r={18}
          stroke={color} strokeWidth="1" fill="none"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: ring === 1 ? [1, 2.2, 2.2] : [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.4, delay: delay + ring * 0.5, repeat: Infinity, ease: "easeOut" }}
          style={{ originX: `${x}px`, originY: `${y}px` }}
        />
      ))}
      <circle cx={x} cy={y} r={16} fill="#050510" stroke={color} strokeWidth="1.5" />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize="11" fontWeight="bold" fontFamily="monospace">{label}</text>
    </g>
  );
}

function VisualRouteMap() {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ background: "#04040f" }}>
      {/* Dot-grid map */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }} />
      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, #04040f 100%)",
      }} />

      <svg viewBox="0 0 320 320" className="relative z-10 w-full h-full" fill="none">
        <defs>
          <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0022FF" />
            <stop offset="100%" stopColor="#39FF14" />
          </linearGradient>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* KR glow halo */}
        <circle cx="232" cy="88" r="30" fill="#0022FF" opacity="0.12" filter="url(#node-glow)" />
        {/* CN glow halo */}
        <circle cx="88" cy="232" r="30" fill="#39FF14" opacity="0.12" filter="url(#node-glow)" />

        {/* Animated route path */}
        <motion.path
          d="M 232 88 C 232 200 88 120 88 232"
          stroke="url(#route-grad)" strokeWidth="2.5" fill="none"
          filter="url(#line-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
        />
        {/* Ghost path for animateMotion reference */}
        <path id="vr-path" d="M 232 88 C 232 200 88 120 88 232" fill="none" />

        {/* Particles */}
        {[0, 1.1, 2.2].map((begin, i) => (
          <circle key={i} r={i === 0 ? 5 : 3.5}
            fill={i === 0 ? "#39FF14" : "rgba(57,255,20,0.55)"}
            filter="url(#line-glow)">
            <animateMotion dur="3.3s" begin={`${begin}s`} repeatCount="indefinite" calcMode="spline"
              keySplines="0.4 0 0.2 1">
              <mpath href="#vr-path" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.3s"
              begin={`${begin}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Nodes */}
        <PulsingNode x={232} y={88} label="KR" color="#5577FF" delay={0} />
        <PulsingNode x={88} y={232} label="CN" color="#39FF14" delay={0.8} />

        {/* Labels */}
        <text x={232} y={68} textAnchor="middle" fill="rgba(255,255,255,0.35)"
          fontSize="9" fontFamily="monospace" letterSpacing="2">SEOUL</text>
        <text x={88} y={255} textAnchor="middle" fill="rgba(255,255,255,0.35)"
          fontSize="9" fontFamily="monospace" letterSpacing="2">BEIJING</text>

        {/* Mid-point goods badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <rect x="132" y="148" width="56" height="24" rx="12"
            fill="rgba(57,255,20,0.08)" stroke="rgba(57,255,20,0.3)" strokeWidth="1" />
          <text x="160" y="160" textAnchor="middle" dominantBaseline="middle"
            fill="#39FF14" fontSize="8.5" fontFamily="monospace" fontWeight="bold">IN TRANSIT</text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Visual 2 — Scanner / Web3 Verification
───────────────────────────────────────────── */
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

function VisualScanner() {
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
}

/* ─────────────────────────────────────────────
   Visual 3 — Currency Exchange (KRW ↔ CNY)
───────────────────────────────────────────── */
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

function VisualExchange() {
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
}

/* ─────────────────────────────────────────────
   Visual labels & registry
───────────────────────────────────────────── */
const visuals = [VisualRouteMap, VisualScanner, VisualExchange];
const visualLabels = [
  { line1: "Asia-wide circulation network", line2: "China × Korea Route" },
  { line1: "Blockchain provenance verification", line2: "Web3 Anti-Counterfeit" },
  { line1: "Direct trade · zero middleman spread", line2: "Peer-to-Peer Trading" },
];

/* ─────────────────────────────────────────────
   Text block (left column)
───────────────────────────────────────────── */
function TextBlock({
  section,
  index,
  onEnter,
  Visual,
}: {
  section: (typeof sections)[0];
  index: number;
  onEnter: (i: number) => void;
  Visual: React.ComponentType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) onEnter(index);
  }, [isInView, index, onEnter]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[80vh] flex flex-col justify-center py-24 pr-0 md:pr-16"
    >
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full w-fit"
        style={{
          background: "linear-gradient(135deg, rgba(57,255,20,0.15), rgba(0,34,255,0.15))",
          border: "1px solid rgba(57,255,20,0.3)",
          color: "#39FF14",
        }}
      >
        {section.tag}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
        style={{
          background: "linear-gradient(135deg, #ffffff 40%, rgba(57,255,20,0.7) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {section.title}
      </motion.h2>

      {/* Mobile-only visual */}
      <div className="md:hidden w-full aspect-square max-w-[320px] mx-auto my-8 rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(57,255,20,0.06), inset 0 0 0 1px rgba(255,255,255,0.1)" }}>
        <Visual />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg text-gray-400 leading-relaxed max-w-md"
      >
        {section.text}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-8 h-px w-16 origin-left"
        style={{ background: "linear-gradient(90deg, #39FF14, #0022FF)" }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export function VisionServices() {
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveVisual = visuals[activeIndex];
  const label = visualLabels[activeIndex];
  const visibleSections = lang === "zh"
    ? [
        {
          id: 0,
          tag: "我们的愿景",
          title: "大数据与 Web3 驱动的无国界交易",
          text: "我们利用大数据价格分析与 Web3 验货芯片，重塑跨境二手电商的信任边界。让闲置好物在亚洲市场自然流 转。",
        },
        {
          id: 1,
          tag: "核心技术",
          title: "破坏型 NFC 芯片，彻底阻断掉包",
          text: "针对高价值电器的掉包诈骗，我们会在机器接合处粘贴物理破坏型芯片。若机器被私自拆解，Polygon 链上 的数字证书将立即失效，保证 100% 正品。",
        },
        {
          id: 2,
          tag: "解决屏障",
          title: "打通闲鱼支付与内需物流孤岛",
          text: "闲鱼的实名支付与内需专用物流不再是障碍。InterX 集成支付系统可安全绕过限制，为您提供企业级跨境清算与直邮体验。",
        },
      ]
    : lang === "ko"
    ? [
        {
          id: 0,
          tag: "우리의 비전",
          title: "빅데이터와 Web3로 완성하는 무국적 거래",
          text: "우리는 빅데이터 시세 분석과 Web3 검수 칩을 통해 크로스보더 중고 커머스의 신뢰 경계를 다시 정의 합니다. 아시아 전역의 매물을 안전하게 연결합니다.",
        },
        {
          id: 1,
          tag: "핵심 기술",
          title: "파괴형 NFC 칩으로 배송 중 바꿔치기 차단",
          text: "고단가 전자기기 거래의 핵심 리스크인 부품 바꿔치기를 원천 봉쇄합니다. 임의 분해 시 파손되는 NFC 칩과 폴리곤(Polygon) 온체인 인증서로 100% 무결성을 보장합니다.",
        },
        {
          id: 2,
          tag: "해결 방안",
          title: "시엔위 결제 장벽과 내수 물류 고립 해소",
          text: "시엔위의 결제 실명제와 내수 전용 물류 장벽을 InterX 통합 결제 시스템이 해결합니다. 타국 플랫폼 의 규제를 우회하고 기업 단위 정산으로 대금을 안전하게 처리합니다.",
        },
      ]
    : sections;

  const handleEnter = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <section className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-0">
          {/* Left: scrollable text */}
          <div className="w-full md:w-1/2 md:pr-8">
            {visibleSections.map((section, i) => (
              <TextBlock 
                key={section.id} 
                section={section} 
                index={i} 
                onEnter={handleEnter} 
                Visual={visuals[i]}
              />
            ))}
          </div>

          {/* Right: sticky visual panel */}
          <div className="hidden md:flex w-1/2 items-start justify-center">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center w-full gap-6">
              {/* Visual frame */}
              <div className="w-80 h-80 rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 0 60px rgba(57,255,20,0.06), 0 0 120px rgba(0,34,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.06)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Label */}
              <AnimatePresence mode="wait">
                <motion.div key={`lbl-${activeIndex}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-center">
                  <p className="text-sm font-bold tracking-widest"
                    style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {label.line1}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 tracking-wider font-mono">{label.line2}</p>
                </motion.div>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex gap-2">
                {sections.map((_, i) => (
                  <motion.div key={i} className="rounded-full"
                    animate={{ width: i === activeIndex ? 24 : 6, background: i === activeIndex ? "linear-gradient(90deg,#39FF14,#0022FF)" : "rgba(255,255,255,0.15)" }}
                    transition={{ duration: 0.4 }}
                    style={{ height: 6 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
