"use client";

import { useRef, useState, useEffect, useCallback, lazy, Suspense, useMemo } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

// Lazy load heavy visual components
const VisualRouteMap = lazy(() => import("./vision/VisualRouteMap").then(m => ({ default: m.VisualRouteMap })));
const VisualScanner = lazy(() => import("./vision/VisualScanner").then(m => ({ default: m.VisualScanner })));
const VisualExchange = lazy(() => import("./vision/VisualExchange").then(m => ({ default: m.VisualExchange })));

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

const visuals = [VisualRouteMap, VisualScanner, VisualExchange];
const visualLabels = [
  { line1: "Asia-wide circulation network", line2: "China × Korea Route" },
  { line1: "Blockchain provenance verification", line2: "Web3 Anti-Counterfeit" },
  { line1: "Direct trade · zero middleman spread", line2: "Peer-to-Peer Trading" },
];

function VisualLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#04040f] rounded-2xl border border-white/5">
      <Loader2 className="w-6 h-6 text-[#39FF14] animate-spin opacity-20" />
    </div>
  );
}

export function VisionServices() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Update section data based on language (localized) - memoized for performance
  const localizedSections = useMemo(() => sections.map((s, i) => ({
    ...s,
    tag: i === 0 ? (lang === "zh" ? "我们的愿景" : lang === "ko" ? "우리의 비전" : s.tag) : 
         i === 1 ? (lang === "zh" ? "核心技术" : lang === "ko" ? "핵심 기술" : s.tag) :
         (lang === "zh" ? "交易体验" : lang === "ko" ? "거래 경험" : s.tag),
    title: i === 0 ? (lang === "zh" ? "重新定义跨境贸易中的信任" : lang === "ko" ? "크로스보더 무역의 신뢰를 재정의하다" : s.title) :
           i === 1 ? (lang === "zh" ? "拒绝假货，Web3 硬件级验证" : lang === "ko" ? "가품 차단, Web3 하드웨어급 검수" : s.title) :
           (lang === "zh" ? "去除中间商，直接连接买家与卖家" : lang === "ko" ? "중간상 제거, 구매자와 판매자를 직접 연결" : s.title),
    text: i === 0 ? (lang === "zh" ? "我们正在构建亚洲最透明的二手交易网络。让二手商品安全、轻松地跨越语言和物理障碍，找到新的主人。" : lang === "ko" ? "아시아에서 가장 투명한 중고 거래 네트워크를 구축하고 있습니다. 언어와 물리적 장벽을 넘어 중고 물품이 안전하고 편리하게 새 주인을 찾을 수 있도록 합니다." : s.text) :
          i === 1 ? (lang === "zh" ? "我们利用区块链和芯片级验证技术，为每一件高价值商品赋予不可篡改的数字身份，从韩国发货到中国签收全程可追溯。" : lang === "ko" ? "블록체인과 칩 기반 검수 기술을 활용하여 모든 고가치 상품에 위변조 불가능한 디지털 ID를 부여합니다. 한국 발송부터 중국 수령까지 전 과정을 추적할 수 있습니다." : s.text) :
          (lang === "zh" ? "我们消除了传统代购的加价和信息差。内置实时汇率和自动化的跨境物流，让国际贸易像本地购物一样简单。" : lang === "ko" ? "기존 구매 대행의 과도한 마진과 정보 비대칭을 제거했습니다. 실시간 환율과 자동화된 물류 시스템으로 해외 직구가 국내 쇼핑처럼 쉬워집니다." : s.text),
  })), [lang]);

  const ActiveVisual = visuals[activeIndex];

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-black relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left column: Text content */}
          <div className="space-y-12">
            {localizedSections.map((section, idx) => (
              <motion.div
                key={section.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group cursor-pointer transition-all duration-500 p-6 rounded-2xl border ${
                  activeIndex === idx 
                    ? "bg-white/[0.03] border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
                    : "bg-transparent border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-[10px] uppercase tracking-[0.3em] font-mono font-bold px-2 py-0.5 rounded ${
                    activeIndex === idx ? "text-[#39FF14] bg-[#39FF14]/10" : "text-gray-500"
                  }`}>
                    {section.tag}
                  </span>
                  <div className={`h-[1px] flex-1 transition-all duration-700 ${
                    activeIndex === idx ? "bg-gradient-to-r from-[#39FF14]/50 to-transparent" : "bg-white/5"
                  }`} />
                </div>
                
                <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-4 transition-colors ${
                  activeIndex === idx ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                }`}>
                  {section.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right column: Dynamic Visuals */}
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] group">
            {/* Ambient glow */}
            <div className="absolute -inset-20 bg-gradient-to-br from-[#0022FF]/10 via-transparent to-[#39FF14]/10 blur-[100px] opacity-50" />
            
            <div className="relative h-full w-full bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
              {/* Toolbar decoration */}
              <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-900/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                  Live simulation
                </div>
              </div>

              {/* Main Visual Display */}
              <div className="flex-1 p-4 md:p-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <Suspense fallback={<VisualLoader />}>
                      <ActiveVisual />
                    </Suspense>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer info strip */}
              <div className="h-20 border-t border-white/5 flex items-center justify-between px-8 bg-zinc-900/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {visualLabels[activeIndex].line1}
                  </p>
                  <p className="text-xs font-bold text-white tracking-wide">
                    {visualLabels[activeIndex].line2}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
