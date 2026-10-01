import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/products";
import { getCategories } from "../../services/categories";
import type { Product, Category } from "../../types";

const empty: Omit<Product, "id" | "createdAt"> = {
  name: "", description: "", price: 0, categoryId: "", imageUrl: "",
  featured: false, available: true, popular: false, showOnHome: false,
  onPromo: false, promoPrice: 0,
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const reload = () => setProducts(getProducts());

  useEffect(() => { reload(); setCategories(getCategories()); }, []);

  const filtered = products.filter((p) => {
    const matchCat = filterCat === "all" || p.categoryId === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ? true :
      filterStatus === "popular" ? p.popular :
      filterStatus === "promo" ? p.onPromo :
      filterStatus === "available" ? p.available : true;
    return matchCat && matchSearch && matchStatus;
  });

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (p: Product) => {
    setForm({
      name: p.name, description: p.description, price: p.price, categoryId: p.categoryId,
      imageUrl: p.imageUrl, featured: p.featured, available: p.available,
      popular: p.popular, showOnHome: p.showOnHome,
      onPromo: p.onPromo, promoPrice: p.promoPrice ?? 0,
    });
    setEditing(p); setCreating(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const payload = { ...form, promoPrice: form.onPromo ? form.promoPrice : undefined };
    if (editing) updateProduct(editing.id, payload);
    else createProduct(payload);
    reload(); setEditing(null); setCreating(false);
  };

  const catName = (id: string) => categories.find((c) => c.id === id)?.name || "—";

  return (
    <AdminLayout title="Produits">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <input
              type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0d0d0d] border border-white/10 text-white text-sm px-4 py-2 focus:outline-none focus:border-[#C9A227]/50 w-44 placeholder-white/30"
            />
            <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
              className="bg-[#0d0d0d] border border-white/10 text-white/70 text-sm px-4 py-2 focus:outline-none focus:border-[#C9A227]/50">
              <option value="all">Toutes catégories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0d0d0d] border border-white/10 text-white/70 text-sm px-4 py-2 focus:outline-none focus:border-[#C9A227]/50">
              <option value="all">Tous les statuts</option>
              <option value="popular">Populaires</option>
              <option value="promo">En promo</option>
              <option value="available">Disponibles</option>
            </select>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2 bg-[#C9A227] text-black text-[10px] tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300 shrink-0">
            + NOUVEAU PRODUIT
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex gap-4 text-xs text-white/30">
          <span>{products.length} produits</span>
          <span>·</span>
          <span className="text-[#C9A227]/60">{products.filter(p => p.popular).length} populaires</span>
          <span>·</span>
          <span className="text-red-400/60">{products.filter(p => p.onPromo).length} en promo</span>
        </div>

        {/* Table */}
        <div className="bg-[#0d0d0d] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {["Image", "Nom", "Catégorie", "Prix", "Populaire", "Promo", "Disponible", "Vedette", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[8px] tracking-[0.2em] text-white/40 font-medium whitespace-nowrap">{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/2 transition-colors duration-200">
                    <td className="px-4 py-3">
                      <div className="w-9 h-9 bg-[#1a1a1a] overflow-hidden">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white font-medium">{p.name}</span>
                      <p className="text-white/30 text-xs truncate max-w-[160px]">{p.description}</p>
                    </td>
                    <td className="px-4 py-3 text-white/50 whitespace-nowrap">{catName(p.categoryId)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.onPromo && p.promoPrice ? (
                        <div>
                          <span className="font-serif text-[#C9A227]">{p.promoPrice.toFixed(2)} DT</span>
                          <span className="text-white/30 text-xs line-through ml-1">{p.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-serif text-[#C9A227]">{p.price.toFixed(2)} DT</span>
                      )}
                    </td>
                    {/* Popular toggle */}
                    <td className="px-4 py-3">
                      <button onClick={() => { updateProduct(p.id, { popular: !p.popular }); reload(); }}
                        className={`text-[8px] tracking-widest px-2 py-1 border transition-colors duration-200 ${p.popular ? "border-[#C9A227]/50 text-[#C9A227]" : "border-white/10 text-white/30 hover:border-[#C9A227]/30"}`}>
                        {p.popular ? "★ OUI" : "NON"}
                      </button>
                    </td>
                    {/* Promo toggle */}
                    <td className="px-4 py-3">
                      <button onClick={() => { updateProduct(p.id, { onPromo: !p.onPromo }); reload(); }}
                        className={`text-[8px] tracking-widest px-2 py-1 border transition-colors duration-200 ${p.onPromo ? "border-red-500/40 text-red-400" : "border-white/10 text-white/30 hover:border-red-500/20"}`}>
                        {p.onPromo ? "ACTIF" : "NON"}
                      </button>
                    </td>
                    {/* Available toggle */}
                    <td className="px-4 py-3">
                      <button onClick={() => { updateProduct(p.id, { available: !p.available }); reload(); }}
                        className={`text-[8px] tracking-widest px-2 py-1 border transition-colors duration-200 ${p.available ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"}`}>
                        {p.available ? "OUI" : "NON"}
                      </button>
                    </td>
                    {/* Featured toggle */}
                    <td className="px-4 py-3">
                      <button onClick={() => { updateProduct(p.id, { featured: !p.featured }); reload(); }}
                        className={`transition-colors duration-200 ${p.featured ? "text-[#C9A227]" : "text-white/20 hover:text-[#C9A227]/50"}`}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={p.featured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={() => openEdit(p)} className="text-white/40 hover:text-[#C9A227] transition-colors duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                        <button onClick={() => setDeleteId(p.id)} className="text-white/40 hover:text-red-400 transition-colors duration-200">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/20 text-xs tracking-widest">AUCUN PRODUIT</div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0d0d0d] z-10">
              <h3 className="text-white text-sm font-medium tracking-widest">
                {editing ? "MODIFIER LE PRODUIT" : "NOUVEAU PRODUIT"}
              </h3>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-5">
              {/* Basic fields */}
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">NOM *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50" />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">DESCRIPTION</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 resize-none" />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">URL IMAGE</label>
                <input type="text" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">PRIX (DT) *</label>
                  <input type="number" step="0.5" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50" />
                </div>
                <div>
                  <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">CATÉGORIE</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50">
                    <option value="">Choisir...</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="border border-white/10 p-4 space-y-3">
                <p className="text-[8px] tracking-[0.3em] text-[#C9A227]/60 mb-3">STATUTS</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "available", label: "Disponible" },
                    { key: "featured", label: "Vedette (accueil)" },
                    { key: "popular", label: "★ Populaire" },
                    { key: "showOnHome", label: "Afficher accueil" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2.5 text-white/60 text-sm cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" checked={!!form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="accent-[#C9A227]" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Promo section */}
              <div className={`border p-4 space-y-3 transition-colors duration-300 ${form.onPromo ? "border-red-500/30 bg-red-500/5" : "border-white/10"}`}>
                <label className="flex items-center gap-2.5 text-white/70 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.onPromo} onChange={(e) => setForm({ ...form, onPromo: e.target.checked })} className="accent-red-500" />
                  <span className={form.onPromo ? "text-red-400 font-medium" : ""}>Activer une promotion</span>
                </label>
                {form.onPromo && (
                  <div>
                    <label className="block text-[8px] tracking-[0.3em] text-red-400/70 mb-2">PRIX PROMOTIONNEL (DT)</label>
                    <input type="number" step="0.5" value={form.promoPrice ?? 0}
                      onChange={(e) => setForm({ ...form, promoPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-[#151515] border border-red-500/30 text-white text-sm px-4 py-3 focus:outline-none focus:border-red-500/50" />
                    {form.promoPrice && form.price > 0 && (
                      <p className="text-red-400/60 text-xs mt-1.5">
                        Réduction : -{Math.round(((form.price - form.promoPrice) / form.price) * 100)}%
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex gap-3 justify-end sticky bottom-0 bg-[#0d0d0d]">
              <button onClick={() => { setEditing(null); setCreating(false); }}
                className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest hover:border-white/40 transition-colors duration-200">
                ANNULER
              </button>
              <button onClick={handleSave}
                className="px-5 py-2.5 bg-[#C9A227] text-black text-xs tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">
                ENREGISTRER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-red-500/30 p-8 max-w-sm w-full text-center">
            <p className="text-white font-medium mb-3">Supprimer ce produit ?</p>
            <p className="text-white/40 text-sm mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest">ANNULER</button>
              <button onClick={() => { deleteProduct(deleteId); reload(); setDeleteId(null); }}
                className="px-5 py-2.5 bg-red-500 text-white text-xs tracking-widest font-semibold">SUPPRIMER</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
