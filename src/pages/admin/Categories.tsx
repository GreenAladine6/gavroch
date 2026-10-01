import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categories";
import type { Category } from "../../types";

const empty: Omit<Category, "id"> = { name: "", description: "", imageUrl: "", order: 0, active: true };

export default function Categories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const reload = () => setCats(getCategories());
  useEffect(() => { reload(); }, []);

  const openCreate = () => { setForm({ ...empty, order: cats.length + 1 }); setCreating(true); setEditing(null); };
  const openEdit = (c: Category) => { setForm({ name: c.name, description: c.description, imageUrl: c.imageUrl, order: c.order, active: c.active }); setEditing(c); setCreating(false); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) updateCategory(editing.id, form);
    else createCategory(form);
    reload(); setEditing(null); setCreating(false);
  };

  return (
    <AdminLayout title="Catégories">
      <div className="space-y-6">
        <div className="flex justify-end">
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2 bg-[#C9A227] text-black text-[10px] tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">
            + NOUVELLE CATÉGORIE
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map((cat) => (
            <div key={cat.id} className="bg-[#0d0d0d] border border-white/10 hover:border-[#C9A227]/30 transition-colors duration-300">
              <div className="aspect-video bg-[#1a1a1a] overflow-hidden">
                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover opacity-70" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 text-xs">AUCUNE IMAGE</div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-white font-medium">{cat.name}</h3>
                  <span className={`text-[7px] tracking-widest px-2 py-0.5 border ${cat.active ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"}`}>
                    {cat.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
                <p className="text-white/40 text-xs mb-4 line-clamp-2">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-xs">Ordre: {cat.order}</span>
                  <div className="flex gap-3">
                    <button onClick={() => { updateCategory(cat.id, { active: !cat.active }); reload(); }} className="text-white/30 hover:text-[#C9A227] transition-colors duration-200 text-xs">
                      {cat.active ? "Désactiver" : "Activer"}
                    </button>
                    <button onClick={() => openEdit(cat)} className="text-white/30 hover:text-[#C9A227] transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button onClick={() => setDeleteId(cat.id)} className="text-white/30 hover:text-red-400 transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-md">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white text-sm font-medium tracking-widest">{editing ? "MODIFIER" : "NOUVELLE CATÉGORIE"}</h3>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: "name", label: "NOM *", type: "text" },
                { key: "description", label: "DESCRIPTION", type: "text" },
                { key: "imageUrl", label: "URL IMAGE", type: "text" },
                { key: "order", label: "ORDRE", type: "number" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [key]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50"
                  />
                </div>
              ))}
              <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[#C9A227]" />
                Catégorie active
              </label>
            </div>
            <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
              <button onClick={() => { setEditing(null); setCreating(false); }} className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest hover:border-white/40 transition-colors duration-200">ANNULER</button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-[#C9A227] text-black text-xs tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">ENREGISTRER</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-red-500/30 p-8 max-w-sm w-full text-center">
            <p className="text-white font-medium mb-3">Supprimer cette catégorie ?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest">ANNULER</button>
              <button onClick={() => { deleteCategory(deleteId); reload(); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 text-white text-xs tracking-widest font-semibold">SUPPRIMER</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
