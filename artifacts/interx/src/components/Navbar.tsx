import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Globe, Menu, X, ChevronDown, User as UserIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/b2c6b384-0d96-4e2b-8733-54c629541641_1777651387394.png";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "zh", label: "中文",    native: "中文" },
  { code: "ko", label: "한국어",   native: "한국어" },
];

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { user, signOut, setAuthModalOpen } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" data-testid="nav-logo" aria-label="Home">
              <img src={logoImg} alt="interX" className="h-9 w-auto" />
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:block">
            <div className="ml-12 flex items-baseline gap-x-12">
              <a href="#xianyu-portal" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors tracking-wide" data-testid="nav-market">
                {t.nav.market}
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors tracking-wide" data-testid="nav-how-it-works">
                {t.nav.howItWorks}
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors tracking-wide" data-testid="nav-faq">
                {t.nav.faq}
              </a>
              <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors tracking-wide" data-testid="nav-about">
                {t.nav.about}
              </a>
            </div>
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm font-medium px-3 py-2 rounded-md transition-colors hover:bg-white/10"
                data-testid="nav-lang"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Select language"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLang.native}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#111] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                        lang === l.code
                          ? "text-[#39FF14] bg-[#39FF14]/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      role="option"
                      aria-selected={lang === l.code}
                    >
                      <span>{l.label}</span>
                      {lang === l.code && <span className="text-xs text-[#39FF14]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                    {user.name || "User"}
                  </span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 font-mono text-xs uppercase tracking-widest" 
                  data-testid="nav-login"
                  onClick={() => setAuthModalOpen(true)}
                >
                  {t.nav.login}
                </Button>
                <Button 
                  className="text-black font-bold border-0 hover:opacity-90 transition-all hover:scale-105 rounded-full px-6 shadow-[0_0_15px_rgba(57,255,20,0.3)]" 
                  style={{ background: 'linear-gradient(135deg, #39FF14, #0022FF)' }} 
                  data-testid="nav-signup"
                  onClick={() => setAuthModalOpen(true)}
                >
                  {t.nav.signUp}
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile lang toggle (cycle) */}
            <button
              onClick={() => {
                const idx = LANGS.findIndex((l) => l.code === lang);
                setLang(LANGS[(idx + 1) % LANGS.length].code);
              }}
              className="text-gray-300 hover:text-[#39FF14] text-xs font-mono border border-white/10 px-2 py-1 rounded transition-colors"
              aria-label="Cycle language"
            >
              {currentLang.native}
            </button>
            <Button variant="ghost" size="icon" className="text-gray-300" onClick={() => setMobileOpen((o) => !o)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 border-t border-white/10 px-4 pb-6 pt-4 flex flex-col gap-3">
          <a href="#xianyu-portal" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium py-2">{t.nav.market}</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium py-2">{t.nav.howItWorks}</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium py-2">{t.nav.faq}</a>
          <a href="#about"  onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium py-2">{t.nav.about}</a>
          <div className="flex gap-3 mt-2">
            {user ? (
               <div className="flex-1 flex items-center justify-between bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-4 h-4 text-[#39FF14]" />
                    <span className="text-white text-sm font-bold">{user.name}</span>
                  </div>
                  <button onClick={() => signOut()} className="text-zinc-500 text-xs uppercase font-mono tracking-widest">Out</button>
               </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="flex-1 text-white hover:bg-white/10 font-mono text-xs uppercase tracking-widest"
                  onClick={() => { setAuthModalOpen(true); setMobileOpen(false); }}
                >
                  {t.nav.login}
                </Button>
                <Button 
                  className="flex-1 text-black font-bold border-0 rounded-full" 
                  style={{ background: 'linear-gradient(135deg, #39FF14, #0022FF)' }}
                  onClick={() => { setAuthModalOpen(true); setMobileOpen(false); }}
                >
                  {t.nav.signUp}
                </Button>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex-1 text-xs font-mono py-2 border rounded transition-colors ${
                  lang === l.code
                    ? "border-[#39FF14] text-[#39FF14] bg-[#39FF14]/10"
                    : "border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />
    </nav>
  );
}
