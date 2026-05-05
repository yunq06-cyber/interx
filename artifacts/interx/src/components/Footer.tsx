import { Link } from "wouter";
import { Github, Twitter, Disc as Discord } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import logoImg from "@assets/b2c6b384-0d96-4e2b-8733-54c629541641_1777651387394.png";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src={logoImg} alt="interX" className="h-9 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{f.tagline}</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#39FF14] transition-colors" data-testid="footer-social-twitter"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-[#39FF14] transition-colors" data-testid="footer-social-github"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-[#39FF14] transition-colors" data-testid="footer-social-discord"><Discord className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold uppercase tracking-wider text-sm mb-4">{f.support}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-help">{f.links.help}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-trust">{f.links.trust}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-selling">{f.links.selling}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-contact">{f.links.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold uppercase tracking-wider text-sm mb-4">{f.legal}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-terms">{f.links.terms}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-privacy">{f.links.privacy}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-cookies">{f.links.cookies}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors text-sm" data-testid="footer-link-kyc">{f.links.kyc}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} interX Protocol. {f.rights}
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#39FF14]"></span>
            <span>{f.system}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
