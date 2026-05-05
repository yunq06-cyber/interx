import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, ExternalLink, Send, Wallet, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import logoImg from "@assets/b2c6b384-0d96-4e2b-8733-54c629541641_1777651387394.png";

interface Order {
  id: string;
  xianyuLink: string;
  userNotes: string;
  expectedPrice: number | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/admin/all");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast({ variant: "destructive", title: "Fetch failed", description: "Could not load orders." });
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuote = async (orderId: string) => {
    const price = quotes[orderId];
    if (!price) {
      toast({ title: "Validation Error", description: "Please enter a price." });
      return;
    }

    setIsSubmitting(orderId);
    try {
      const res = await fetch("/api/orders/admin/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, finalPrice: parseFloat(price) })
      });

      if (res.ok) {
        toast({ title: "Quote Sent!", description: "Customer notified." });
        fetchOrders();
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to send quote." });
    } finally {
      setIsSubmitting(null);
    }
  };

  const pendingOrders = orders.filter(o => o.status === "PENDING_QUOTE");
  const otherOrders = orders.filter(o => o.status !== "PENDING_QUOTE");

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex justify-between items-end">
          <div>
            <img src={logoImg} alt="interX" className="h-8 w-auto mb-6" />
            <h1 className="text-4xl font-bold font-sans tracking-tight mb-2">Concierge Dashboard</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">interX Protocol Internal Only</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl px-6 py-3">
              <span className="text-zinc-500 text-[10px] uppercase font-mono block mb-1">Queue</span>
              <span className="text-2xl font-bold font-mono">{pendingOrders.length}</span>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-[#39FF14]">
            <Loader2 className="w-5 h-5 animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-widest font-mono">Incoming Requests</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full py-20 text-center text-zinc-700 animate-pulse font-mono uppercase text-xs tracking-widest">Loading queue...</div>
            ) : pendingOrders.length === 0 ? (
              <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl text-zinc-700 font-mono text-xs uppercase tracking-widest">Inbox Empty</div>
            ) : (
              pendingOrders.map((order) => (
                <motion.div 
                  key={order.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 hover:border-[#39FF14]/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">Order ID: {order.id}</span>
                      <h3 className="text-white font-bold flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#39FF14]" /> {order.expectedPrice ? `${order.expectedPrice.toLocaleString()} KRW` : "No target price"}
                      </h3>
                    </div>
                    <a 
                      href={order.xianyuLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-[#39FF14]/10 text-zinc-400 hover:text-[#39FF14] transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="bg-zinc-900/50 rounded-2xl p-4 border border-white/5">
                    <p className="text-xs text-zinc-400 leading-relaxed italic">"{order.userNotes || "No notes provided"}"</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 relative group">
                      <input 
                        type="number"
                        value={quotes[order.id] || ""}
                        onChange={(e) => setQuotes({...quotes, [order.id]: e.target.value})}
                        placeholder="Final Quote (KRW)"
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-[#39FF14]/50 transition-colors"
                      />
                    </div>
                    <Button 
                      onClick={() => handleSendQuote(order.id)}
                      disabled={isSubmitting === order.id}
                      className="h-12 px-6 rounded-xl text-black font-bold uppercase text-[10px] tracking-widest gap-2"
                      style={{ background: 'linear-gradient(135deg, #39FF14, #0022FF)' }}
                    >
                      {isSubmitting === order.id ? <Loader2 className="animate-spin w-4 h-4" /> : <>Send Quote <Send className="w-3 h-3" /></>}
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {otherOrders.length > 0 && (
          <section className="pt-12 border-t border-white/5 space-y-6">
            <h2 className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] font-mono">Processed / History</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherOrders.map(order => (
                <div key={order.id} className="p-4 bg-zinc-900/30 border border-white/5 rounded-2xl flex items-center justify-between opacity-60">
                   <div className="text-[10px] font-mono">
                      <div className="text-zinc-500 mb-1">{order.id}</div>
                      <div className="text-[#39FF14]">{order.status}</div>
                   </div>
                   <div className="text-xs font-bold font-mono">
                      {order.finalPrice ? `${order.finalPrice.toLocaleString()} KRW` : "-"}
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
