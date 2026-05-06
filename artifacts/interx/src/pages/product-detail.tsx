import { useState, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Share2, ShieldCheck, Star, Clock, Package,
  Globe2, ChevronDown, Truck, MapPin, BadgeCheck, Eye, Bookmark,
  MessageCircle, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProductById } from "@/data/products";
import { useLang } from "@/contexts/LanguageContext";
import { isWeb3Verified, getAuthCert } from "@/data/web3Auth";
import { Web3Badge } from "@/components/Web3Badge";
import { AuthCertModal } from "@/components/AuthCertModal";

const EXCHANGE_RATES: Record<string, { rate: number; symbol: string; label: string; flag: string }> = {
  USD: { rate: 1,       symbol: "$",  label: "US Dollar",    flag: "🇺🇸" },
  KRW: { rate: 1342,    symbol: "₩",  label: "Korean Won",   flag: "🇰🇷" },
  EUR: { rate: 0.921,   symbol: "€",  label: "Euro",         flag: "🇪🇺" },
  GBP: { rate: 0.793,   symbol: "£",  label: "British Pound",flag: "🇬🇧" },
  JPY: { rate: 154.2,   symbol: "¥",  label: "Japanese Yen", flag: "🇯🇵" },
  CNY: { rate: 7.24,    symbol: "¥",  label: "Chinese Yuan", flag: "🇨🇳" },
};

const SHIPPING_RATES: Record<string, Record<string, { cost: number; days: string }>> = {
  JP: { US: { cost: 28, days: "5–8" }, EU: { cost: 35, days: "7–10" }, KR: { cost: 12, days: "2–4" }, GB: { cost: 38, days: "8–12" } },
  DE: { US: { cost: 32, days: "6–9" }, EU: { cost: 8,  days: "2–4"  }, KR: { cost: 40, days: "9–14" }, GB: { cost: 14, days: "3–5"  } },
  US: { US: { cost: 0,  days: "2–5" }, EU: { cost: 35, days: "7–10" }, KR: { cost: 30, days: "6–9"  }, GB: { cost: 30, days: "5–8"  } },
  GB: { US: { cost: 28, days: "5–8" }, EU: { cost: 12, days: "3–5"  }, KR: { cost: 38, days: "8–12" }, GB: { cost: 0,  days: "1–3"  } },
  CH: { US: { cost: 45, days: "7–10"},EU: { cost: 15,  days: "3–5"  }, KR: { cost: 55, days: "10–14"}, GB: { cost: 18, days: "4–6"  } },
  CA: { US: { cost: 15, days: "3–5" }, EU: { cost: 40, days: "8–11" }, KR: { cost: 45, days: "9–13" }, GB: { cost: 35, days: "7–10" } },
  KR: { US: { cost: 25, days: "5–7" }, EU: { cost: 35, days: "8–11" }, KR: { cost: 0,  days: "1–2"  }, GB: { cost: 38, days: "9–12" } },
};

const DESTINATION_OPTIONS = [
  { code: "US", label: "United States",   flag: "🇺🇸" },
  { code: "EU", label: "Europe (EU)",     flag: "🇪🇺" },
  { code: "KR", label: "South Korea",     flag: "🇰🇷" },
  { code: "GB", label: "United Kingdom",  flag: "🇬🇧" },
];

const conditionStyles: Record<string, string> = {
  Mint: "text-[#39FF14] border-[#39FF14]/40 bg-[#39FF14]/10",
  Good: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  Fair: "text-gray-400 border-gray-400/40 bg-gray-400/10",
};

function AvatarPlaceholder({ name, size = 48 }: { name: string; size?: number }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center font-mono font-bold text-black flex-shrink-0"
      style={{ width: size, height: size, background: "linear-gradient(135deg, #39FF14, #0022FF)", fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const product = params ? getProductById(params.id) : undefined;
  const { t } = useLang();
  const p = t.pdp;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [destination, setDestination] = useState("US");
  const [saved, setSaved] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  const verified = product ? isWeb3Verified(product.id) : false;
  const cert = product && verified ? getAuthCert(product.id) : undefined;

  const convertedPrice = useMemo(() => {
    const rate = EXCHANGE_RATES[selectedCurrency]?.rate ?? 1;
    const symbol = EXCHANGE_RATES[selectedCurrency]?.symbol ?? "$";
    const converted = product ? product.price * rate : 0;
    return {
      symbol,
      value: converted.toLocaleString(undefined, {
        maximumFractionDigits: selectedCurrency === "KRW" || selectedCurrency === "JPY" ? 0 : 2,
      }),
    };
  }, [product, selectedCurrency]);

  const shippingInfo = useMemo(() => {
    if (!product) return null;
    const originRates = SHIPPING_RATES[product.countryCode];
    if (!originRates) return null;
    const info = originRates[destination];
    if (!info) return null;
    if ((product.shipping === "Free" || product.shipping === "Free worldwide") && destination === product.countryCode) return { cost: 0, days: "2–5" };
    return info;
  }, [product, destination]);

  const conditionLabel = {
    Mint: t.sell.conditions[0].label,
    Good: t.sell.conditions[1].label,
    Fair: t.sell.conditions[2].label,
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold mt-32">{t.pdpNotFound}</h1>
        <Link href="/">
          <Button className="mt-6" style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}>
            {p.home}
          </Button>
        </Link>
      </div>
    );
  }

  const sel = product.seller;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#39FF14] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-8" data-testid="breadcrumb">
          <Link href="/" className="hover:text-[#39FF14] transition-colors">{p.home}</Link>
          <span>/</span>
          <span className="hover:text-[#39FF14] cursor-pointer transition-colors">{product.category}</span>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT — Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={activeImage}
              layoutId={activeImage === 0 ? `product-card-${product.id}` : undefined}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/8 flex items-center justify-center group will-change-transform"
              data-testid="main-image"
            >
              <motion.img
                layoutId={activeImage === 0 ? `product-image-${product.id}` : undefined}
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${conditionStyles[product.condition]} border font-mono uppercase text-[10px] tracking-widest px-3 py-1 rounded-none`}>
                  {conditionLabel[product.condition as "Mint" | "Good" | "Fair"]}
                </Badge>
              </div>
              <button
                onClick={() => setSaved(!saved)}
                className={`absolute top-4 right-4 p-3 rounded-full border backdrop-blur-sm transition-all ${saved ? "bg-[#39FF14]/20 border-[#39FF14] text-[#39FF14]" : "bg-black/50 border-white/10 text-white hover:border-[#39FF14] hover:text-[#39FF14]"}`}
                data-testid="save-button"
              >
                <Heart className={`w-5 h-5 ${saved ? "fill-[#39FF14]" : ""}`} />
              </button>
              <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs text-gray-400 font-mono bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{product.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Bookmark className="w-3 h-3" />{product.saves}</span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3" data-testid="image-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === activeImage ? "border-[#39FF14] shadow-[0_0_12px_rgba(57,255,20,0.4)]" : "border-white/5 hover:border-white/20"}`}
                  data-testid={`thumbnail-${i}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-3 bg-[#0a0a0a]" />
                </button>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <Clock className="w-3 h-3" />
              <span>{p.listed} {product.listedAt}</span>
              <span className="mx-2 text-gray-700">·</span>
              <Globe2 className="w-3 h-3" />
              <span>{product.location}</span>
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#39FF14] border border-[#39FF14]/30 px-2 py-0.5 uppercase tracking-widest">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight" data-testid="product-title">
              {product.title}
            </h1>

            {/* Web3 Verified badge */}
            {verified && cert && (
              <div>
                <Web3Badge size="md" onClick={() => setCertOpen(true)} />
              </div>
            )}

            {/* Currency Converter */}
            <div className="rounded-xl border border-white/8 bg-[#0a0a0a] p-5 space-y-4" data-testid="currency-converter">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{p.price}</span>
                <div className="relative">
                  <button
                    onClick={() => setCurrencyOpen(!currencyOpen)}
                    className="flex items-center gap-2 text-xs font-mono text-gray-300 border border-white/10 hover:border-[#39FF14]/50 px-3 py-1.5 rounded-lg transition-all"
                    data-testid="currency-selector"
                  >
                    <span>{EXCHANGE_RATES[selectedCurrency]?.flag}</span>
                    <span>{selectedCurrency}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {currencyOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 top-full mt-2 z-50 bg-[#111] border border-white/10 rounded-xl overflow-hidden min-w-[180px] shadow-xl"
                      >
                        {Object.entries(EXCHANGE_RATES).map(([code, info]) => (
                          <button
                            key={code}
                            onClick={() => { setSelectedCurrency(code); setCurrencyOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono hover:bg-[#39FF14]/10 transition-colors ${selectedCurrency === code ? "text-[#39FF14]" : "text-gray-300"}`}
                            data-testid={`currency-option-${code}`}
                          >
                            <span>{info.flag}</span>
                            <span>{code}</span>
                            <span className="text-gray-500 ml-auto">{info.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-end gap-3">
                <span
                  className="text-4xl font-mono font-bold"
                  style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  data-testid="converted-price"
                >
                  {convertedPrice.symbol}{convertedPrice.value}
                </span>
                {selectedCurrency !== "USD" && (
                  <span className="text-gray-500 text-sm font-mono mb-1">(${product.price.toLocaleString()} USD)</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["USD", "KRW", "EUR"].map((code) => {
                  const r = EXCHANGE_RATES[code];
                  const val = product.price * r.rate;
                  const formatted = val.toLocaleString(undefined, { maximumFractionDigits: code === "KRW" ? 0 : 2 });
                  return (
                    <button
                      key={code}
                      onClick={() => setSelectedCurrency(code)}
                      className={`p-3 rounded-lg border text-left transition-all ${selectedCurrency === code ? "border-[#39FF14]/50 bg-[#39FF14]/5" : "border-white/5 bg-black hover:border-white/15"}`}
                      data-testid={`quick-currency-${code}`}
                    >
                      <div className="text-[10px] font-mono text-gray-500 mb-1">{r.flag} {code}</div>
                      <div className="text-sm font-mono font-bold text-white">{r.symbol}{formatted}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shipping Calculator */}
            <div className="rounded-xl border border-white/8 bg-[#0a0a0a] p-5 space-y-4" data-testid="shipping-calculator">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#39FF14]" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{p.shippingCalc}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <span className="text-gray-400">{p.from}</span>
                <span className="font-mono text-white">{product.flag} {product.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm flex-shrink-0">{p.to}</span>
                <div className="relative flex-1">
                  <button
                    onClick={() => setDestOpen(!destOpen)}
                    className="w-full flex items-center justify-between gap-2 text-sm font-mono text-white border border-white/10 hover:border-[#39FF14]/50 px-4 py-2.5 rounded-lg transition-all bg-black"
                    data-testid="destination-selector"
                  >
                    <span>{DESTINATION_OPTIONS.find((d) => d.code === destination)?.flag} {DESTINATION_OPTIONS.find((d) => d.code === destination)?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${destOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {destOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl"
                      >
                        {DESTINATION_OPTIONS.map((opt) => (
                          <button
                            key={opt.code}
                            onClick={() => { setDestination(opt.code); setDestOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-mono hover:bg-[#39FF14]/10 transition-colors ${destination === opt.code ? "text-[#39FF14]" : "text-gray-300"}`}
                            data-testid={`destination-option-${opt.code}`}
                          >
                            <span>{opt.flag}</span>
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {shippingInfo && (
                <motion.div
                  key={destination}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between rounded-lg border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-3"
                  data-testid="shipping-result"
                >
                  <div>
                    <div className="text-xs text-gray-400 font-mono">{p.estShipping}</div>
                    <div className="text-lg font-mono font-bold text-[#39FF14] mt-0.5">
                  {shippingInfo.cost === 0 ? "Free shipping" : `${shippingInfo.cost} USD`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 font-mono">{p.deliveryTime}</div>
                    <div className="text-sm font-mono text-white mt-0.5">{shippingInfo.days} {p.businessDays}</div>
                  </div>
                </motion.div>
              )}

              <p className="text-[11px] text-gray-600 font-mono">{p.shippingNote}</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3" data-testid="cta-buttons">
              <Button
                className="flex-1 h-14 text-black font-bold uppercase tracking-widest text-sm border-none hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                data-testid="buy-now-button"
              >
                <Zap className="w-4 h-4 mr-2" />
                {p.buyNow}
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 font-bold uppercase tracking-widest text-sm border-white/20 text-white hover:border-[#39FF14]/60 hover:text-[#39FF14] hover:bg-[#39FF14]/5 transition-all"
                data-testid="make-offer-button"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {p.makeOffer}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full h-10 text-gray-400 hover:text-white text-xs font-mono border border-white/5 hover:border-white/15 transition-all"
              data-testid="share-button"
            >
              <Share2 className="w-3.5 h-3.5 mr-2" />
              {p.shareListing}
            </Button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-1.5 h-6 inline-block rounded-sm" style={{ background: "linear-gradient(180deg, #39FF14, #0022FF)" }} />
                {p.description}
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm" data-testid="product-description">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-1.5 h-6 inline-block rounded-sm" style={{ background: "linear-gradient(180deg, #39FF14, #0022FF)" }} />
                {p.specifications}
              </h2>
              <div className="rounded-xl border border-white/8 overflow-hidden" data-testid="specs-table">
                {Object.entries(product.specs).map(([key, val], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-[#0a0a0a]" : "bg-black"}`}
                  >
                    <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">{key}</span>
                    <span className="text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-1.5 h-6 inline-block rounded-sm" style={{ background: "linear-gradient(180deg, #39FF14, #0022FF)" }} />
              {p.seller}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/8 bg-[#0a0a0a] p-6 space-y-5"
              data-testid="seller-card"
            >
              <div className="flex items-center gap-4">
                <AvatarPlaceholder name={sel.name} size={52} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-white truncate">{sel.name}</span>
                    {sel.verified && <BadgeCheck className="w-4 h-4 text-[#39FF14] flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(sel.rating) ? "text-[#39FF14] fill-[#39FF14]" : "text-gray-700"}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1 font-mono">{sel.rating} ({sel.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Package className="w-3.5 h-3.5" />, label: p.sales,    value: `${sel.totalSales}+` },
                  { icon: <Clock   className="w-3.5 h-3.5" />, label: p.response, value: sel.responseTime },
                  { icon: <Globe2  className="w-3.5 h-3.5" />, label: p.location, value: `${sel.flag} ${sel.city}` },
                  { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: p.since, value: sel.memberSince },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-black rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 text-[#39FF14] mb-1">
                      {icon}
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{label}</span>
                    </div>
                    <div className="text-xs font-mono text-white">{value}</div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full h-10 font-mono text-sm text-black font-bold border-none hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                data-testid="contact-seller-button"
              >
                {p.contactSeller}
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 font-mono text-sm text-gray-300 border-white/10 hover:border-white/25 hover:text-white transition-all"
                data-testid="view-profile-button"
              >
                {p.viewProfile}
              </Button>

              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono justify-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39FF14]" />
                {p.protection}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Auth Certificate Modal */}
      {cert && (
        <AuthCertModal
          open={certOpen}
          onClose={() => setCertOpen(false)}
          cert={cert}
          productTitle={product.title}
        />
      )}
    </div>
  );
}
