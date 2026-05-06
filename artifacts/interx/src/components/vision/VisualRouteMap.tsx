"use client";

import { motion } from "framer-motion";
import { memo } from "react";

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

export const VisualRouteMap = memo(function VisualRouteMap() {
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
          style={{ willChange: "transform, path-length" } as any}
        />
        {/* Ghost path for animateMotion reference */}
        <path id="vr-path" d="M 232 88 C 232 200 88 120 88 232" fill="none" />

        {/* Particles */}
        {[0, 1.1, 2.2].map((begin, i) => (
          <circle key={i} r={i === 0 ? 5 : 3.5}
            fill={i === 0 ? "#39FF14" : "rgba(57,255,20,0.55)"}
            filter="url(#line-glow)"
            style={{ willChange: "transform, opacity" }}>
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
});
