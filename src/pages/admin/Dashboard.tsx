import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProducts } from "../../services/products";
import { getCategories } from "../../services/categories";
import { getGallery } from "../../services/gallery";
import { getLocations } from "../../services/locations";
import type { Product } from "../../types";

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, photos: 0, featured: 0, popular: 0, promos: 0, locations: 0 });
  const [recent, setRecent] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    const categories = getCategories();
    const gallery = getGallery();
    const locs = getLocations();
    setStats({
      products: products.length,
      categories: categories.length,
      photos: gallery.length,
      featured: products.filter((p) => p.featured).length,
      popular: products.filter((p) => p.popular).length,
      promos: products.filter((p) => p.onPromo).length,
      locations: locs.filter((l) => l.active).length,
    });
    setRecent([...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5));
  }, []);

  const statCards = [
    { label: "Produits", value: stats.products, color: "#C9A227", to: "/admin/products", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Catégories", value: stats.categories, color: "#9B7615", to: "/admin/categories", icon: "M4 6h16M4 12h8m-8 6h16" },
    { label: "★ Populaires", value: stats.popular, color: "#C9A227", to: "/admin/products", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
    { label: "Promos actives", value: stats.promos, color: "#ef4444", to: "/admin/products", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
    { label: "Photos", value: stats.photos, color: "#9B7615", to: "/admin/gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Locaux actifs", value: stats.locations, color: "#C9A227", to: "/admin/locations", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map(({ label, value, color, to, icon }) => (
            <Link
              key={label}
              to={to}
              className="bg-[#0d0d0d] border border-white/10 p-5 hover:border-[#C9A227]/30 transition-colors duration-300 group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                <path d={icon} />
              </svg>
              <div className="font-serif text-3xl font-bold text-white mb-1 group-hover:text-[#C9A227] transition-colors duration-300">{value}</div>
              <div className="text-[8px] tracking-[0.2em] text-white/40 uppercase leading-tight">{label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { to: "/admin/products", label: "Gérer les produits", sub: "Ajouter, modifier, activer des promotions", icon: "M12 4v16m8-8H4" },
            { to: "/admin/locations", label: "Gérer les locaux", sub: "Ajouter ou modifier vos boutiques", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
            { to: "/admin/content", label: "Modifier le contenu", sub: "Textes, horaires, informations de contact", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
          ].map(({ to, label, sub, icon }) => (
            <Link key={to} to={to} className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 p-5 hover:border-[#C9A227]/30 group transition-colors duration-300">
              <div className="w-10 h-10 bg-[#C9A227]/10 border border-[#C9A227]/20 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"><path d={icon} /></svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-[#C9A227] transition-colors duration-300">{label}</p>
                <p className="text-white/30 text-xs mt-0.5">{sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent products */}
        <div className="bg-[#0d0d0d] border border-white/10">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-white text-sm font-medium tracking-widest">PRODUITS RÉCENTS</h2>
            <Link to="/admin/products" className="text-[9px] tracking-widest text-[#C9A227]/60 hover:text-[#C9A227] transition-colors duration-200">VOIR TOUT →</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recent.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors duration-200">
                <div className="w-10 h-10 bg-[#1a1a1a] overflow-hidden shrink-0">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{p.name}</p>
                  <p className="text-white/40 text-xs">{p.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {p.popular && <span className="text-[7px] tracking-widest text-[#C9A227] border border-[#C9A227]/30 px-1.5 py-0.5">★</span>}
                  {p.onPromo && <span className="text-[7px] tracking-widest text-red-400 border border-red-500/30 px-1.5 py-0.5">PROMO</span>}
                  {p.onPromo && p.promoPrice ? (
                    <div className="text-right">
                      <div className="font-serif text-[#C9A227] text-sm">{p.promoPrice.toFixed(2)} DT</div>
                      <div className="text-white/20 text-xs line-through">{p.price.toFixed(2)}</div>
                    </div>
                  ) : (
                    <span className="font-serif text-[#C9A227] text-sm">{p.price.toFixed(2)} DT</span>
                  )}
                </div>
                <span className={`text-[7px] tracking-widest px-2 py-1 border shrink-0 ${p.available ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"}`}>
                  {p.available ? "ACTIF" : "INACTIF"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
