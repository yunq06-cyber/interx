import { Monitor, Shirt, Car, Gem, Trophy, BookOpen, Sofa, Palette, Music, Gamepad2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export function CategoryStrip() {
  const { t } = useLang();

  const categories = [
    { key: "electronics" as const, icon: Monitor },
    { key: "fashion"     as const, icon: Shirt },
    { key: "vehicles"    as const, icon: Car },
    { key: "collectibles"as const, icon: Gem },
    { key: "sports"      as const, icon: Trophy },
    { key: "books"       as const, icon: BookOpen },
    { key: "home"        as const, icon: Sofa },
    { key: "art"         as const, icon: Palette },
    { key: "music"       as const, icon: Music },
    { key: "games"       as const, icon: Gamepad2 },
  ];

  return (
    <div className="w-full py-12 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-6 items-center justify-center flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                className="group flex flex-col items-center gap-3 min-w-[80px] transition-all hover:-translate-y-1"
                data-testid={`category-${cat.key}`}
              >
                <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-[#39FF14] group-hover:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all">
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#39FF14] transition-colors" />
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                 {t.categories?.[cat.key] || cat.key}
                </span>              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
