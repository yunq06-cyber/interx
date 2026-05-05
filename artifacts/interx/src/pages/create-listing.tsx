import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Upload, X, ChevronRight, ChevronLeft, Check, Camera,
  DollarSign, MapPin, Package, Info, Globe2, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";

const CATEGORIES = ["Electronics", "Fashion", "Sneakers", "Camera", "Watch", "Computer", "Games", "Furniture", "Art", "Music", "Books", "Collectibles", "Sports", "Other"];
const CURRENCIES = ["USD", "EUR", "KRW", "GBP", "JPY", "CNY"];
const SHIPPING_ORIGINS = [
  { code: "US", label: "United States",  flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", label: "Germany",        flag: "🇩🇪" },
  { code: "FR", label: "France",         flag: "🇫🇷" },
  { code: "JP", label: "Japan",          flag: "🇯🇵" },
  { code: "KR", label: "South Korea",    flag: "🇰🇷" },
  { code: "CN", label: "China",          flag: "🇨🇳" },
  { code: "AU", label: "Australia",      flag: "🇦🇺" },
  { code: "CA", label: "Canada",         flag: "🇨🇦" },
  { code: "CH", label: "Switzerland",    flag: "🇨🇭" },
  { code: "SG", label: "Singapore",      flag: "🇸🇬" },
  { code: "HK", label: "Hong Kong",      flag: "🇭🇰" },
];

const step1Schema = z.object({
  title:       z.string().min(10, "Title must be at least 10 characters").max(120, "Keep it within 120 characters"),
  category:    z.string().min(1, "Please select a category"),
  condition:   z.string().min(1, "Please select a condition"),
  description: z.string().min(30, "Please add at least 30 characters of description"),
});
const step2Schema = z.object({
  price:         z.string().min(1, "Please enter a price").refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Please enter a valid price"),
  currency:      z.string().min(1, "Please select a currency"),
  acceptOffers:  z.boolean().optional(),
  minimumOffer:  z.string().optional(),
});
const step3Schema = z.object({
  origin:         z.string().min(1, "Please select a shipping origin"),
  city:           z.string().min(2, "Please enter a city"),
  shippingOption: z.string().min(1, "Please select a shipping method"),
  flatRate:       z.string().optional(),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
      {children}{required && <span className="text-[#39FF14] ml-1">*</span>}
    </label>
  );
}
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-400 text-xs font-mono mt-1.5">{message}</p>;
}
function inputCls(hasError?: boolean) {
  return `bg-black border ${hasError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#39FF14]/60"} text-white placeholder:text-gray-600 font-mono focus:ring-0 focus:ring-offset-0 transition-all`;
}

function ImageUpload({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const { t } = useLang();
  const s = t.sell;

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 8 - images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onChange([...images, e.target.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, [images, onChange]);

  const removeImage = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <FieldLabel required>{s.photosLabel}</FieldLabel>
      <div className="grid grid-cols-4 gap-3" data-testid="image-upload-grid">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] group">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-white hover:text-red-400 transition-colors"
              data-testid={`remove-image-${i}`}
            >
              <X className="w-3 h-3" />
            </button>
            {i === 0 && (
              <div className="absolute bottom-1.5 left-1.5 text-[9px] font-mono bg-[#39FF14] text-black px-1.5 py-0.5 rounded">{s.photosCover}</div>
            )}
          </div>
        ))}
        {images.length < 8 && (
          <label
            className="aspect-square rounded-xl border-2 border-dashed border-white/15 hover:border-[#39FF14]/50 bg-[#0a0a0a] cursor-pointer flex flex-col items-center justify-center gap-2 transition-all group"
            data-testid="upload-image-button"
          >
            <Upload className="w-6 h-6 text-gray-600 group-hover:text-[#39FF14] transition-colors" />
            <span className="text-[10px] font-mono text-gray-600 group-hover:text-[#39FF14] transition-colors">{s.addPhoto}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </label>
        )}
      </div>
      <p className="text-[11px] text-gray-600 font-mono">{s.photosHint}</p>
    </div>
  );
}

function StepIndicator({ current, labels }: { current: number; labels: string[] }) {
  const ICONS = [
    <Camera className="w-4 h-4" key="cam" />,
    <DollarSign className="w-4 h-4" key="dollar" />,
    <Truck className="w-4 h-4" key="truck" />,
    <Check className="w-4 h-4" key="check" />,
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {labels.map((label, i) => {
        const stepNum = i + 1;
        return (
          <div key={stepNum} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-mono text-sm font-bold
                  ${current === stepNum
                    ? "border-[#39FF14] text-black shadow-[0_0_16px_rgba(57,255,20,0.5)]"
                    : current > stepNum
                    ? "border-[#39FF14]/50 text-[#39FF14]"
                    : "border-white/10 text-gray-500"}`}
                style={
                  current === stepNum
                    ? { background: "linear-gradient(135deg, #39FF14, #0022FF)" }
                    : current > stepNum
                    ? { background: "rgba(57,255,20,0.1)" }
                    : {}
                }
                data-testid={`step-indicator-${stepNum}`}
              >
                {current > stepNum ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider hidden sm:block ${
                  current === stepNum ? "text-[#39FF14]" : current > stepNum ? "text-[#39FF14]/60" : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className={`h-[2px] w-12 sm:w-20 mx-2 transition-all ${current > stepNum ? "bg-[#39FF14]/40" : "bg-white/5"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CreateListing() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();
  const s = t.sell;

  const [step1Data, setStep1Data] = useState<Partial<Step1>>({});
  const [step2Data, setStep2Data] = useState<Partial<Step2>>({ currency: "USD", acceptOffers: false });
  const [step3Data, setStep3Data] = useState<Partial<Step3>>({ shippingOption: "free" });

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), defaultValues: step1Data });
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema), defaultValues: { currency: "USD", acceptOffers: false, ...step2Data } });
  const form3 = useForm<Step3>({ resolver: zodResolver(step3Schema), defaultValues: step3Data });

  const selectedCondition = form1.watch("condition");
  const selectedCategory  = form1.watch("category");
  const selectedCurrency  = form2.watch("currency");
  const acceptOffers      = form2.watch("acceptOffers");
  const selectedOrigin    = form3.watch("origin");
  const selectedShipping  = form3.watch("shippingOption");

  const onStep1Submit = (data: Step1) => { setStep1Data(data); setStep(2); };
  const onStep2Submit = (data: Step2) => { setStep2Data(data); setStep(3); };
  const onStep3Submit = (data: Step3) => { setStep3Data(data); setStep(4); };
  const onPublish     = () => setSubmitted(true);

  const cardCls = "rounded-2xl border border-white/8 bg-[#08080a] p-8";

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 max-w-md">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}>
              <Check className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-3xl font-bold">{s.successTitle}</h1>
            <p className="text-gray-400">{s.successDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                className="text-black font-bold border-none hover:opacity-90 px-8"
                style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                onClick={() => setLocation("/")}
                data-testid="go-home-button"
              >
                {s.backHome}
              </Button>
              <Button
                variant="outline"
                className="border-white/15 text-gray-300 hover:border-white/30 hover:text-white px-8"
                onClick={() => { setSubmitted(false); setStep(1); setImages([]); }}
                data-testid="list-another-button"
              >
                {s.listAnother}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#39FF14] selection:text-black">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">{s.pageTitle}</h1>
          <p className="text-gray-500 mt-2 text-sm font-mono">{s.pageSub}</p>
        </div>

        <StepIndicator current={step} labels={s.steps as unknown as string[]} />

        <AnimatePresence mode="wait">
          {/* STEP 1 — Photos & Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
                <div className={cardCls}>
                  <ImageUpload images={images} onChange={setImages} />
                </div>

                <div className={`${cardCls} space-y-6`}>
                  {/* Title */}
                  <div>
                    <FieldLabel required>{s.titleLabel}</FieldLabel>
                    <Input
                      placeholder={s.titlePlaceholder}
                      className={inputCls(!!form1.formState.errors.title)}
                      data-testid="input-title"
                      {...form1.register("title")}
                    />
                    <FieldError message={form1.formState.errors.title?.message} />
                  </div>

                  {/* Category */}
                  <div>
                    <FieldLabel required>{s.categoryLabel}</FieldLabel>
                    <div className="flex flex-wrap gap-2" data-testid="category-grid">
                      {CATEGORIES.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => form1.setValue("category", cat, { shouldValidate: true })}
                          className={`px-3 py-1.5 text-xs font-mono border rounded-lg transition-all ${selectedCategory === cat ? "border-[#39FF14]/60 text-[#39FF14] bg-[#39FF14]/8" : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"}`}
                          data-testid={`category-${cat}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <FieldError message={form1.formState.errors.category?.message} />
                  </div>

                  {/* Condition */}
                  <div>
                    <FieldLabel required>{s.conditionLabel}</FieldLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-testid="condition-grid">
                      {s.conditions.map((c) => (
                        <button
                          type="button"
                          key={c.value}
                          onClick={() => form1.setValue("condition", c.value, { shouldValidate: true })}
                          className={`p-4 rounded-xl border text-left transition-all ${selectedCondition === c.value ? "border-[#39FF14]/60 bg-[#39FF14]/5 shadow-[0_0_12px_rgba(57,255,20,0.1)]" : "border-white/8 bg-black hover:border-white/20"}`}
                          data-testid={`condition-${c.value}`}
                        >
                          <div className={`font-mono font-bold text-sm mb-1 ${selectedCondition === c.value ? "text-[#39FF14]" : "text-white"}`}>{c.label}</div>
                          <div className="text-[11px] text-gray-500 leading-relaxed">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                    <FieldError message={form1.formState.errors.condition?.message} />
                  </div>

                  {/* Description */}
                  <div>
                    <FieldLabel required>{s.descLabel}</FieldLabel>
                    <Textarea
                      placeholder={s.descPlaceholder}
                      rows={5}
                      className={`resize-none ${inputCls(!!form1.formState.errors.description)}`}
                      data-testid="input-description"
                      {...form1.register("description")}
                    />
                    <FieldError message={form1.formState.errors.description?.message} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="h-12 px-8 text-black font-bold font-mono uppercase tracking-wider border-none hover:opacity-90" style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }} data-testid="step1-next">
                    {s.nextPricing} <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2 — Pricing */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
                <div className={`${cardCls} space-y-6`}>
                  {/* Price + currency */}
                  <div>
                    <FieldLabel required>{s.priceLabel}</FieldLabel>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
                            {selectedCurrency === "KRW" || selectedCurrency === "JPY" ? "¥" : selectedCurrency === "EUR" ? "€" : selectedCurrency === "GBP" ? "£" : "$"}
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            min="1"
                            placeholder="0.00"
                            className={`pl-8 ${inputCls(!!form2.formState.errors.price)}`}
                            data-testid="input-price"
                            {...form2.register("price")}
                          />
                        </div>
                        <FieldError message={form2.formState.errors.price?.message} />
                      </div>
                      <div className="w-32">
                        <FieldLabel>{s.currencyLabel}</FieldLabel>
                        <select
                          className={`w-full h-10 px-3 rounded-md ${inputCls()} bg-black text-sm`}
                          data-testid="select-currency"
                          {...form2.register("currency")}
                        >
                          {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 font-mono mt-2 flex items-center gap-1">
                      <Info className="w-3 h-3" /> {s.priceHint}
                    </p>
                  </div>

                  {/* Accept Offers toggle */}
                  <div>
                    <FieldLabel>{s.offersLabel}</FieldLabel>
                    <button
                      type="button"
                      onClick={() => form2.setValue("acceptOffers", !acceptOffers)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all w-full text-left ${acceptOffers ? "border-[#39FF14]/50 bg-[#39FF14]/5" : "border-white/8 bg-black"}`}
                      data-testid="toggle-accept-offers"
                    >
                      <div className={`w-10 h-6 rounded-full border-2 flex items-center transition-all px-0.5 ${acceptOffers ? "border-[#39FF14] bg-[#39FF14]/20" : "border-white/20 bg-black"}`}>
                        <div className={`w-4 h-4 rounded-full transition-all ${acceptOffers ? "translate-x-4 bg-[#39FF14]" : "translate-x-0 bg-gray-600"}`} />
                      </div>
                      <div>
                        <div className="font-mono text-sm text-white">{s.offersDesc}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{s.offersSubDesc}</div>
                      </div>
                    </button>
                  </div>

                  {/* Minimum offer */}
                  {acceptOffers && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <FieldLabel>{s.minOfferLabel}</FieldLabel>
                      <Input
                        type="number"
                        placeholder={s.minOfferPlaceholder}
                        className={inputCls()}
                        data-testid="input-min-offer"
                        {...form2.register("minimumOffer")}
                      />
                      <p className="text-[11px] text-gray-600 font-mono mt-1.5">{s.minOfferHint}</p>
                    </motion.div>
                  )}

                  {/* Pricing tips */}
                  <div className="rounded-xl border border-[#39FF14]/10 bg-[#39FF14]/3 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[#39FF14] font-mono text-xs font-bold uppercase tracking-wider">
                      <Globe2 className="w-3.5 h-3.5" /> {s.pricingTipsTitle}
                    </div>
                    <ul className="text-[11px] text-gray-400 space-y-1 font-mono">
                      {s.pricingTips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-gray-400 hover:text-white font-mono" data-testid="step2-back">
                    <ChevronLeft className="w-4 h-4 mr-1" /> {s.back}
                  </Button>
                  <Button type="submit" className="h-12 px-8 text-black font-bold font-mono uppercase tracking-wider border-none hover:opacity-90" style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }} data-testid="step2-next">
                    {s.nextShipping} <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3 — Shipping */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <form onSubmit={form3.handleSubmit(onStep3Submit)} className="space-y-6">
                <div className={`${cardCls} space-y-6`}>
                  {/* Shipping origin */}
                  <div>
                    <FieldLabel required>{s.originLabel}</FieldLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" data-testid="origin-grid">
                      {SHIPPING_ORIGINS.map((o) => (
                        <button
                          type="button"
                          key={o.code}
                          onClick={() => form3.setValue("origin", o.code, { shouldValidate: true })}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm font-mono transition-all ${selectedOrigin === o.code ? "border-[#39FF14]/60 text-[#39FF14] bg-[#39FF14]/8" : "border-white/8 text-gray-300 hover:border-white/20 bg-black"}`}
                          data-testid={`origin-${o.code}`}
                        >
                          <span className="text-lg">{o.flag}</span>
                          <span className="text-xs truncate">{o.label}</span>
                        </button>
                      ))}
                    </div>
                    <FieldError message={form3.formState.errors.origin?.message} />
                  </div>

                  {/* City */}
                  <div>
                    <FieldLabel required>{s.cityLabel}</FieldLabel>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder={s.cityPlaceholder}
                        className={`pl-10 ${inputCls(!!form3.formState.errors.city)}`}
                        data-testid="input-city"
                        {...form3.register("city")}
                      />
                    </div>
                    <FieldError message={form3.formState.errors.city?.message} />
                  </div>

                  {/* Shipping option */}
                  <div>
                    <FieldLabel required>{s.shippingMethodLabel}</FieldLabel>
                    <div className="space-y-2" data-testid="shipping-options">
                      {s.shippingOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => form3.setValue("shippingOption", opt.value, { shouldValidate: true })}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${selectedShipping === opt.value ? "border-[#39FF14]/60 bg-[#39FF14]/5" : "border-white/8 bg-black hover:border-white/20"}`}
                          data-testid={`shipping-${opt.value}`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selectedShipping === opt.value ? "border-[#39FF14]" : "border-gray-600"}`}>
                            {selectedShipping === opt.value && <div className="w-2 h-2 rounded-full bg-[#39FF14]" />}
                          </div>
                          <div>
                            <div className={`font-mono font-bold text-sm ${selectedShipping === opt.value ? "text-[#39FF14]" : "text-white"}`}>{opt.label}</div>
                            <div className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <FieldError message={form3.formState.errors.shippingOption?.message} />
                  </div>

                  {/* Flat rate input */}
                  {selectedShipping === "flat" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <FieldLabel>{s.flatRateLabel}</FieldLabel>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono">$</span>
                        <Input
                          type="number"
                          placeholder={s.flatRatePlaceholder}
                          className={`pl-8 ${inputCls()}`}
                          data-testid="input-flat-rate"
                          {...form3.register("flatRate")}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* interX protection note */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-black">
                    <Package className="w-4 h-4 text-[#39FF14] mt-0.5 flex-shrink-0" />
                    <div className="text-[11px] text-gray-500 font-mono leading-relaxed">{s.protectionNote}</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="ghost" onClick={() => setStep(2)} className="text-gray-400 hover:text-white font-mono" data-testid="step3-back">
                    <ChevronLeft className="w-4 h-4 mr-1" /> {s.back}
                  </Button>
                  <Button type="submit" className="h-12 px-8 text-black font-bold font-mono uppercase tracking-wider border-none hover:opacity-90" style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }} data-testid="step3-next">
                    {s.steps[3]} <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4 — Review */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-6">
              <div className={`${cardCls} space-y-5`}>
                <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="w-1.5 h-5 inline-block rounded-sm" style={{ background: "linear-gradient(180deg, #39FF14, #0022FF)" }} />
                  {s.reviewTitle}
                </h2>

                {images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((src, i) => (
                      <img key={i} src={src} alt="" className="w-20 h-20 object-cover rounded-lg border border-white/10 flex-shrink-0" />
                    ))}
                  </div>
                )}

                {[
                  {
                    section: s.sections.details,
                    rows: [
                      { label: s.reviewRows.title,       value: step1Data.title },
                      { label: s.reviewRows.category,    value: step1Data.category },
                      { label: s.reviewRows.condition,   value: step1Data.condition },
                      { label: s.reviewRows.description, value: step1Data.description },
                    ],
                  },
                  {
                    section: s.sections.pricing,
                    rows: [
                      { label: s.reviewRows.price,  value: `${step2Data.price} ${step2Data.currency}` },
                      { label: s.reviewRows.offers, value: step2Data.acceptOffers ? `Yes (min: ${step2Data.minimumOffer || "any"})` : "No" },
                    ],
                  },
                  {
                    section: s.sections.shipping,
                    rows: [
                      { label: s.reviewRows.from,   value: SHIPPING_ORIGINS.find((o) => o.code === step3Data.origin)?.label },
                      { label: s.reviewRows.city,   value: step3Data.city },
                      { label: s.reviewRows.method, value: s.shippingOptions.find((o) => o.value === step3Data.shippingOption)?.label },
                    ],
                  },
                ].map(({ section, rows }) => (
                  <div key={section}>
                    <div className="text-[10px] font-mono text-[#39FF14] uppercase tracking-widest mb-2">{section}</div>
                    <div className="rounded-xl border border-white/5 overflow-hidden">
                      {rows.filter((r) => r.value).map(({ label, value }, i) => (
                        <div key={label} className={`flex gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-[#0a0a0a]" : "bg-black"}`}>
                          <span className="text-gray-500 font-mono w-24 flex-shrink-0">{label}</span>
                          <span className="text-white truncate">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="ghost" onClick={() => setStep(3)} className="text-gray-400 hover:text-white font-mono" data-testid="step4-back">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {s.back}
                </Button>
                <Button
                  type="button"
                  onClick={onPublish}
                  className="h-12 px-10 text-black font-bold font-mono uppercase tracking-wider border-none hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                  data-testid="publish-button"
                >
                  <ZapIcon className="w-4 h-4 mr-2" />
                  {s.publish}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
