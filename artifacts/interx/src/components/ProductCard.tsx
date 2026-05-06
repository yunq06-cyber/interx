import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { isWeb3Verified, getAuthCert } from "@/data/web3Auth";
import { Web3Badge } from "@/components/Web3Badge";
import { AuthCertModal } from "@/components/AuthCertModal";

interface ProductCardProps {
  id: string | number;
  title: string;
  image: string;
  price: number;
  location: string;
  flag: string;
  condition: "Mint" | "Good" | "Fair";
  shipping: string;
}

export function ProductCard({ id, title, image, price, location, flag, condition, shipping }: ProductCardProps) {
  const [, setLocation] = useLocation();
  const [saved, setSaved] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const { t } = useLang();

  const idStr = String(id);
  const verified = isWeb3Verified(idStr);
  const cert = verified ? getAuthCert(idStr) : undefined;

  const conditionColors = {
    Mint: "text-[#39FF14] border-[#39FF14]/30 bg-[#39FF14]/10",
    Good: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    Fair: "text-gray-400 border-gray-400/30 bg-gray-400/10",
  };

  const conditionLabel = {
    Mint: t.sell.conditions[0].label,
    Good: t.sell.conditions[1].label,
    Fair: t.sell.conditions[2].label,
  };

  return (
    <>
      <motion.div
        layoutId={`product-card-${id}`}
        whileHover={{ y: -5 }}
        className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#39FF14]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] flex flex-col cursor-pointer will-change-transform"
        data-testid={`product-card-${id}`}
        onClick={() => setLocation(`/product/${id}`)}
      >
        {/* Image area */}
        <div className="relative aspect-square p-4 bg-[#111] flex items-center justify-center overflow-hidden">
          <button
            className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0a0a0a]/50 backdrop-blur-sm border transition-all ${saved ? "border-[#39FF14] text-[#39FF14]" : "border-white/10 text-white hover:border-[#39FF14] hover:text-[#39FF14]"}`}
            data-testid={`product-save-${id}`}
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-[#39FF14]" : ""}`} />
          </button>

          <Badge
            className={`absolute top-3 left-3 z-10 ${conditionColors[condition]} hover:bg-transparent font-mono uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-none border`}
          >
            {conditionLabel[condition]}
          </Badge>

          <motion.img
            layoutId={`product-image-${id}`}
            src={image}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
          />

          <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <Button
              className="text-black font-bold uppercase tracking-widest text-xs rounded-none px-6 py-2 transform translate-y-4 group-hover:translate-y-0 transition-all border-none"
              style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
              data-testid={`product-view-${id}`}
            >
              {t.card.viewListing}
            </Button>
          </div>
        </div>

        {/* Info area */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-white text-lg leading-tight line-clamp-2 group-hover:text-[#39FF14] transition-colors">
              {title}
            </h3>
          </div>

          <div className="text-2xl font-mono font-bold text-white mb-3">
            ${price.toLocaleString()}
          </div>

          {/* Web3 badge — only for verified items */}
          {verified && cert && (
            <div className="mb-3">
              <Web3Badge
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setCertOpen(true);
                }}
              />
            </div>
          )}

          <div className="mt-auto space-y-2">
            <div className="flex items-center text-xs text-gray-400">
              <span className="mr-2 text-base">{flag}</span>
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">{t.card.shipping}</span>
              <span className={shipping === "Free" || shipping === "Free shipping" ? "text-[#39FF14]" : "text-gray-300"}>
                {shipping === "Free" || shipping === "Free shipping" ? t.card.freeShip : `Est. ${shipping} USD`}
              </span>
            </div>
          </div>
        </div>

        {/* Neon underline on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: "linear-gradient(90deg, #39FF14, #0022FF)" }} />
      </motion.div>

      {/* Auth Certificate Modal */}
      {cert && (
        <AuthCertModal
          open={certOpen}
          onClose={() => setCertOpen(false)}
          cert={cert}
          productTitle={title}
        />
      )}
    </>
  );
}
