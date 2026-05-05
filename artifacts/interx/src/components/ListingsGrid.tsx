import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/data/products";
import { useLang } from "@/contexts/LanguageContext";

export function ListingsGrid() {
  const { t } = useLang();

  const products = PRODUCTS.map((p) => ({
    id: p.id,
    title: p.title,
    image: p.images[0],
    price: p.price,
    location: p.location,
    flag: p.flag,
    condition: p.condition,
    shipping: p.shipping,
  }));

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="browse">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <span className="w-2 h-8 mr-4 inline-block" style={{ background: "linear-gradient(180deg, #39FF14, #0022FF)" }} />
          {t.grid.title}
        </h2>
        <a href="#all" className="text-sm font-mono text-[#39FF14] hover:text-white transition-colors" data-testid="view-all-listings">
          {t.grid.viewAll}
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
