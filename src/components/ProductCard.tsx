import type { Product, Category } from "../types";

interface Props {
  product: Product;
  categories: Category[];
}

export default function ProductCard({ product, categories }: Props) {
  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="group relative overflow-hidden bg-[#0d0d0d] border border-white/5 hover:border-[#C9A227]/40 transition-all duration-500">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#1a1a1a]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        {product.featured && (
          <div className="absolute top-3 left-3 text-[8px] tracking-[0.2em] bg-[#C9A227] text-black px-2 py-1 font-semibold">
            VEDETTE
          </div>
        )}
        {!product.available && (
          <div className="theme-dark absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-[10px] tracking-[0.2em] text-white/60">INDISPONIBLE</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        {category && (
          <p className="text-[8px] tracking-[0.3em] text-[#C9A227] font-medium mb-2">
            {category.name.toUpperCase()}
          </p>
        )}
        <h3 className="font-serif text-lg font-medium text-white mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-[#C9A227] text-lg font-semibold">
            {product.price.toFixed(2)} DT
          </span>
        </div>
      </div>

      {/* Gold bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
