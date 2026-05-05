import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/contexts/LanguageContext";

export function SearchBar() {
  const { t } = useLang();
  const tags = ["iPhone 15", "Vintage Leica", "PS5", "Air Jordan", "Rolex"];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-20">
      <div className="bg-[#0a0a0a] p-2 flex flex-col md:flex-row items-center gap-2 border border-white/10 focus-within:border-[#39FF14]/50 focus-within:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all">
        <div className="w-full md:w-[200px]">
          <Select defaultValue="all">
            <SelectTrigger className="w-full border-none bg-transparent text-white focus:ring-0 focus:ring-offset-0 rounded-none h-12" data-testid="search-category-select">
              <SelectValue placeholder={t.search.allCategories} />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10 text-white rounded-none">
              <SelectItem value="all">{t.search.allCategories}</SelectItem>
              <SelectItem value="electronics">{t.search.categories.electronics}</SelectItem>
              <SelectItem value="fashion">{t.search.categories.fashion}</SelectItem>
              <SelectItem value="collectibles">{t.search.categories.collectibles}</SelectItem>
              <SelectItem value="vehicles">{t.search.categories.vehicles}</SelectItem>
              <SelectItem value="sports">{t.search.categories.sports}</SelectItem>
              <SelectItem value="books">{t.search.categories.books}</SelectItem>
              <SelectItem value="home">{t.search.categories.home}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full h-[1px] md:h-8 md:w-[1px] bg-white/10" />

        <div className="flex-1 flex items-center w-full">
          <Search className="w-5 h-5 text-gray-500 ml-3 mr-2" />
          <Input
            type="text"
            placeholder={t.search.placeholder}
            className="flex-1 border-none bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-12 px-0 text-lg placeholder:text-gray-600"
            data-testid="search-input"
          />
        </div>

        <Button
          className="w-full md:w-auto h-12 px-8 rounded-none text-black font-bold hover:opacity-90 transition-opacity border-none"
          style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
          data-testid="search-button"
        >
          {t.search.button}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">{t.search.popular}</span>
        {tags.map((tag) => (
          <button
            key={tag}
            className="text-xs text-gray-400 hover:text-[#39FF14] transition-colors bg-white/5 hover:bg-[#39FF14]/10 px-3 py-1 rounded-full border border-white/5 hover:border-[#39FF14]/30"
            data-testid={`search-tag-${tag.toLowerCase().replace(" ", "-")}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
