import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { getCategories } from "../services/categories";
import ProductCard from "../components/ProductCard";
import type { Product, Category } from "../types";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts().filter((p) => p.available));
    setCategories(getCategories().filter((c) => c.active));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.categoryId === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Header */}
      <div className="theme-dark relative pt-40 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1664088760009-faf16e24edf9?w=1600&h=600&fit=crop&auto=format"
            alt="Menu header"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        </div>
        <div className="relative z-10">
          <p className="text-[9px] tracking-[0.5em] text-[#C9A227] font-medium mb-5">
            GAVROCHE
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-white mb-4">
            NOTRE MENU
          </h1>
          <div className="w-12 h-px bg-[#C9A227] mx-auto my-6" />
          <p className="text-white/50 text-sm tracking-wider max-w-md mx-auto">
            Découvrez nos créations inspirées de la tradition italienne
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <div className="relative max-w-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-white/10 text-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#C9A227]/50 placeholder-white/30 transition-colors duration-300"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 text-[10px] tracking-[0.2em] font-medium px-5 py-2.5 border transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-[#C9A227] text-black border-[#C9A227]"
                : "border-white/20 text-white/60 hover:border-[#C9A227]/50 hover:text-[#C9A227]"
            }`}
          >
            TOUT
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 text-[10px] tracking-[0.15em] font-medium px-5 py-2.5 border transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#C9A227] text-black border-[#C9A227]"
                  : "border-white/20 text-white/60 hover:border-[#C9A227]/50 hover:text-[#C9A227]"
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm tracking-widest">AUCUN PRODUIT TROUVÉ</p>
          </div>
        ) : (
          <>
            <p className="text-white/30 text-xs tracking-widest mb-8">
              {filtered.length} CRÉATION{filtered.length > 1 ? "S" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} categories={categories} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
