import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface Web3BadgeProps {
  onClick: (e: React.MouseEvent) => void;
  size?: "sm" | "md";
}

export function Web3Badge({ onClick, size = "sm" }: Web3BadgeProps) {
  const isSm = size === "sm";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider border cursor-pointer transition-all
        ${isSm
          ? "text-[9px] px-2 py-1 rounded-md"
          : "text-xs px-3 py-1.5 rounded-lg"
        }
        text-[#39FF14] border-[#39FF14]/40 bg-[#39FF14]/8 hover:bg-[#39FF14]/15 hover:border-[#39FF14]/70
        shadow-[0_0_8px_rgba(57,255,20,0.15)] hover:shadow-[0_0_14px_rgba(57,255,20,0.3)]`}
      style={{ backdropFilter: "blur(4px)" }}
    >
      {/* Pulsing dot */}
      <span className="relative flex items-center justify-center">
        <motion.span
          className="absolute w-2.5 h-2.5 rounded-full bg-[#39FF14]/30"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
        <ShieldCheck className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </span>
      Web3 Verified
    </motion.button>
  );
}
