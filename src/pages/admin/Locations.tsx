import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getLocations, createLocation, updateLocation, deleteLocation } from "../../services/locations";
import type { Location } from "../../types";

const empty: Omit<Location, "id"> = {
  name: "", address: "", phone: "", description: "", imageUrl: "", hours: "", mapsUrl: "", active: true,
};

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editing, setEditing] = useState<Location | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const reload = () => setLocations(getLocations());
  useEffect(() => { reload(); }, []);

  const openCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const openEdit = (l: Location) => {
    setForm({ name: l.name, address: l.address, phone: l.phone, description: l.description, imageUrl: l.imageUrl, hours: l.hours, mapsUrl: l.mapsUrl ?? "", active: l.active });
    setEditing(l); setCreating(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) updateLocation(editing.id, form);
    else createLocation(form);
    reload(); setEditing(null); setCreating(false);
  };

  return (
    <AdminLayout title="Locaux / Boutiques">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs tracking-widest">{locations.filter(l => l.active).length} local(aux) actif(s) sur {locations.length}</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2 bg-[#C9A227] text-black text-[10px] tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">
            + NOUVEAU LOCAL
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {locations.map((loc) => (
            <div key={loc.id} className={`bg-[#0d0d0d] border transition-colors duration-300 overflow-hidden ${loc.active ? "border-white/10 hover:border-[#C9A227]/30" : "border-white/5 opacity-60"}`}>
              <div className="relative aspect-video bg-[#1a1a1a] overflow-hidden">
                {loc.imageUrl ? (
                  <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 text-xs tracking-widest">AUCUNE PHOTO</div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`text-[7px] tracking-widest px-2 py-1 border ${loc.active ? "border-emerald-500/40 text-emerald-400 bg-black/60" : "border-red-500/40 text-red-400 bg-black/60"}`}>
                    {loc.active ? "ACTIF" : "INACTIF"}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-white font-medium text-lg mb-3">{loc.name}</h3>
                <ul className="space-y-2 mb-4">
                  {[
                    { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z", text: loc.address },
                    { icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.79 19.79 19.79 0 011.18 1.18C1.18.48 1.66 0 2.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.27 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", text: loc.phone },
                    { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: loc.hours },
                  ].map(({ icon, text }) => text ? (
                    <li key={icon} className="flex items-start gap-2.5 text-white/40 text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="shrink-0 mt-0.5"><path d={icon} /></svg>
                      {text}
                    </li>
                  ) : null)}
                </ul>
                {loc.description && <p className="text-white/30 text-xs leading-relaxed mb-4 line-clamp-2">{loc.description}</p>}
                <div className="flex items-center gap-3 flex-wrap">
                  <button onClick={() => { updateLocation(loc.id, { active: !loc.active }); reload(); }}
                    className="text-[9px] tracking-widest text-white/40 hover:text-[#C9A227] transition-colors duration-200">
                    {loc.active ? "Désactiver" : "Activer"}
                  </button>
                  <button onClick={() => openEdit(loc)} className="flex items-center gap-1.5 text-[9px] tracking-widest text-white/40 hover:text-[#C9A227] transition-colors duration-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Modifier
                  </button>
                  <button onClick={() => setDeleteId(loc.id)} className="flex items-center gap-1.5 text-[9px] tracking-widest text-white/40 hover:text-red-400 transition-colors duration-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /></svg>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {locations.length === 0 && (
          <div className="text-center py-16 border border-white/5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="mx-auto mb-4 opacity-40">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-white/20 text-xs tracking-widest">AUCUN LOCAL — CRÉEZ VOTRE PREMIÈRE BOUTIQUE</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0d0d0d]">
              <h3 className="text-white text-sm font-medium tracking-widest">{editing ? "MODIFIER LE LOCAL" : "NOUVEAU LOCAL"}</h3>
              <button onClick={() => { setEditing(null); setCreating(false); }} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: "name", label: "NOM DU LOCAL *", type: "text" },
                { key: "address", label: "ADRESSE", type: "text" },
                { key: "phone", label: "TÉLÉPHONE", type: "text" },
                { key: "hours", label: "HORAIRES", type: "text", placeholder: "Ex: Lun–Ven : 8h–21h" },
                { key: "imageUrl", label: "URL PHOTO", type: "text", placeholder: "https://..." },
                { key: "mapsUrl", label: "LIEN GOOGLE MAPS", type: "text", placeholder: "https://maps.google.com/..." },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                  <input type={type} value={form[key as keyof typeof form] as string}
                    placeholder={placeholder}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 placeholder-white/20" />
                </div>
              ))}
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">DESCRIPTION</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 resize-none" />
              </div>
              <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[#C9A227]" />
                Afficher sur le site
              </label>
            </div>
            <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
              <button onClick={() => { setEditing(null); setCreating(false); }} className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest">ANNULER</button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-[#C9A227] text-black text-xs tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">ENREGISTRER</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-red-500/30 p-8 max-w-sm w-full text-center">
            <p className="text-white font-medium mb-3">Supprimer ce local ?</p>
            <div className="flex gap-3 justify-center mt-4">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest">ANNULER</button>
              <button onClick={() => { deleteLocation(deleteId); reload(); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 text-white text-xs tracking-widest font-semibold">SUPPRIMER</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
