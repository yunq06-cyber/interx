import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Sparkles, CheckCircle2, ClipboardList, Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import logoImg from "@assets/b2c6b384-0d96-4e2b-8733-54c629541641_1777651387394.png";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChatModal({ open, onClose }: ChatModalProps) {
  const { t } = useLang();
  const { user, setAuthModalOpen } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [expectedPrice, setExpectedPrice] = useState("");
  const [userNotes, setUserNotes] = useState("");

  useEffect(() => {
    if (!open) {
      setShowForm(false);
      setIsAnalyzing(false);
      setSubmitted(false);
      setInputValue("");
    }
  }, [open]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (!user) {
      toast({ title: "Login required", description: "Please sign in to process links." });
      setAuthModalOpen(true);
      return;
    }
    
    setIsAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowForm(true);
    }, 2500);
  };

  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    // Mocking for Demo/Competition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({ 
        title: "解析成功！", 
        description: "我们已收到您的验货请求，将通过 Web3 芯片为您生成专属报价单。" 
      });
    }, 1500);

    /* Original code commented out for demo
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xianyuLink: inputValue,
          userNotes,
          expectedPrice
        })
      });
      
      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Request Sent!", description: "A buyer will contact you with a quote soon." });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not send request." });
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-zinc-900/20">
              <div className="flex items-center gap-4">
                <img src={logoImg} alt="interX" className="h-8 w-auto" />
                <div className="flex items-center gap-2 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                  <p className="text-[#39FF14] text-[10px] uppercase tracking-widest font-mono font-bold">{t.chat.online}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
              {!showForm && !submitted && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#39FF14] text-xs font-bold">iX</span>
                  </div>
                  <div className="bg-zinc-900/50 border border-white/5 rounded-3xl rounded-tl-none p-5 max-w-[85%]">
                    <p className="text-zinc-200 text-sm leading-relaxed">{t.chat.welcome}</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative w-20 h-20">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-[#39FF14]/20 rounded-full"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-4 bg-[#39FF14]/10 rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="w-6 h-6 text-[#39FF14]" />
                    </motion.div>
                  </div>
                  <p className="text-[#39FF14] font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse">Analyzing link data...</p>
                </div>
              )}

              {showForm && !submitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="flex items-center gap-3 text-[#39FF14] bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-2xl p-4">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-bold">✅ 링크 분석 완료! (Analysis Complete)</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono flex items-center gap-2">
                        <Wallet className="w-3 h-3" /> Target Price (KRW/USD)
                      </label>
                      <input 
                        type="text" 
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                        placeholder="e.g. 500,000 KRW"
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-[#39FF14]/50 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono flex items-center gap-2">
                        <ClipboardList className="w-3 h-3" /> Special Requests (e.g. Battery Test)
                      </label>
                      <textarea 
                        value={userNotes}
                        onChange={(e) => setUserNotes(e.target.value)}
                        placeholder="Describe what you need verified..."
                        rows={3}
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-[#39FF14]/50 transition-colors resize-none"
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitRequest}
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl text-black font-bold uppercase tracking-widest text-sm"
                      style={{ background: 'linear-gradient(135deg, #39FF14, #0022FF)' }}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "전문 바이어에게 견적 요청 (Request Quote)"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {submitted && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#39FF14]/10 flex items-center justify-center border border-[#39FF14]/20 mb-4">
                    <CheckCircle2 className="w-10 h-10 text-[#39FF14]" />
                  </div>
                  <h4 className="text-white font-bold text-xl">요청 완료! (Request Sent)</h4>
                  <p className="text-zinc-500 text-sm max-w-[280px]">Our specialist buyer will send you a custom quote within 24 hours.</p>
                  <Button variant="outline" onClick={onClose} className="mt-6 border-white/10 rounded-xl">Close</Button>
                </motion.div>
              )}
            </div>

            {/* Input Area (Only visible when starting) */}
            {!showForm && !submitted && !isAnalyzing && (
              <div className="p-8 border-t border-white/5 bg-zinc-900/10">
                <div className="relative flex items-center bg-zinc-900 border border-white/5 rounded-2xl p-1.5">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.chat.placeholder}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm px-4 py-3"
                  />
                  <Button 
                    onClick={handleSend}
                    size="icon"
                    className="w-12 h-12 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #39FF14, #0022FF)' }}
                  >
                    <Send className="w-5 h-5 text-black" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
