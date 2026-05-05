import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Github, Globe, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import logoImg from "@assets/b2c6b384-0d96-4e2b-8733-54c629541641_1777651387394.png";

export function AuthModal() {
  const { t } = useLang();
  const { signIn, signUp, authModalOpen: open, setAuthModalOpen } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onClose = () => setAuthModalOpen(false);

  const validate = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    return true;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      if (mode === "login") {
        const { data, error } = await signIn.email({
          email,
          password,
          callbackURL: window.location.origin
        });
        
        if (error) {
          setError(error.message || "Invalid email or password.");
          return;
        }
      } else {
        const { data, error } = await signUp.email({
          email,
          password,
          name,
          callbackURL: window.location.origin
        });

        if (error) {
          setError(error.message || "Could not create account.");
          return;
        }
      }
      
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created!",
        description: "You have been successfully authenticated.",
      });
      onClose();
    } catch (err: any) {
      setError("A network error occurred. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Shimmer effect when loading */}
            {loading && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39FF14]/10 to-transparent -translate-x-full animate-shimmer" />
              </div>
            )}

            <div className="flex-1 overflow-y-auto hide-scrollbar p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="interX" className="h-8 w-auto" />
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-mono"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleAuth} className="space-y-5">
                {mode === "register" && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Name</label>
                    <div className="relative group">
                      <div className="absolute -inset-[1px] bg-[#39FF14] rounded-xl opacity-0 group-focus-within:opacity-20 transition-opacity blur-sm" />
                      <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-xl px-4 py-3">
                        <User className="w-4 h-4 text-zinc-500 mr-3" />
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="bg-transparent border-none focus:ring-0 text-white text-sm w-full placeholder:text-zinc-700 font-sans"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Email</label>
                  <div className="relative group">
                    <div className="absolute -inset-[1px] bg-[#39FF14] rounded-xl opacity-0 group-focus-within:opacity-20 transition-opacity blur-sm" />
                    <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-xl px-4 py-3">
                      <Mail className="w-4 h-4 text-zinc-500 mr-3" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="bg-transparent border-none focus:ring-0 text-white text-sm w-full placeholder:text-zinc-700 font-sans"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Password</label>
                    {mode === "login" && (
                      <button type="button" className="text-[10px] text-[#39FF14] hover:underline font-mono uppercase tracking-widest">Forgot?</button>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-[1px] bg-[#39FF14] rounded-xl opacity-0 group-focus-within:opacity-20 transition-opacity blur-sm" />
                    <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-xl px-4 py-3">
                      <Lock className="w-4 h-4 text-zinc-500 mr-3" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-transparent border-none focus:ring-0 text-white text-sm w-full placeholder:text-zinc-700 font-sans"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  disabled={loading}
                  className="w-full h-14 rounded-2xl text-black font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#39FF14]/10"
                  style={{ background: 'linear-gradient(135deg, #39FF14, #0022FF)' }}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === "login" ? "Sign In" : "Create Account")}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-zinc-950 px-4 text-zinc-600 font-mono">Or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-white font-mono text-xs gap-2">
                  <Github className="w-4 h-4" /> Github
                </Button>
                <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-white font-mono text-xs gap-2">
                  <Globe className="w-4 h-4 text-blue-400" /> Naver
                </Button>
              </div>

              <p className="text-center mt-8 text-xs text-zinc-500 font-sans">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                  onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}
                  className="text-[#39FF14] font-bold hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
