import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getGallery, addImage, updateImage, deleteImage } from "../../services/gallery";
import type { GalleryImage } from "../../types";

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("home");
  const [adding, setAdding] = useState(false);

  const reload = () => setImages(getGallery());
  useEffect(() => { reload(); }, []);

  const handleAdd = () => {
    if (!url.trim()) return;
    addImage({ imageUrl: url, title, section, featured: false, order: images.length + 1 });
    reload();
    setUrl(""); setTitle(""); setSection("home"); setAdding(false);
  };

  return (
    <AdminLayout title="Galerie">
      <div className="space-y-6">
        <div className="flex justify-end">
          <button onClick={() => setAdding(true)} className="flex items-center gap-2 px-5 py-2 bg-[#C9A227] text-black text-[10px] tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">
            + AJOUTER UNE IMAGE
          </button>
        </div>

        {/* Drop hint */}
        <div className="border border-dashed border-[#C9A227]/30 p-8 text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="mx-auto mb-3 opacity-40">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <p className="text-white/30 text-xs tracking-widest">AJOUTER VIA L'URL D'UNE IMAGE</p>
          <p className="text-white/20 text-xs mt-1">L'upload direct sera disponible avec Supabase Storage</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-[#0d0d0d] border border-white/10 hover:border-[#C9A227]/40 transition-colors duration-300">
              <div className="aspect-square overflow-hidden bg-[#1a1a1a]">
                <img src={img.imageUrl} alt={img.title || "Photo"} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-white/70 text-xs truncate mb-1">{img.title || "Sans titre"}</p>
                <p className="text-white/30 text-[9px] tracking-widest">{img.section?.toUpperCase()}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => { updateImage(img.id, { featured: !img.featured }); reload(); }}
                  className={`w-6 h-6 flex items-center justify-center bg-black/70 ${img.featured ? "text-[#C9A227]" : "text-white/60"}`}
                  title="Vedette"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={img.featured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button
                  onClick={() => { deleteImage(img.id); reload(); }}
                  className="w-6 h-6 flex items-center justify-center bg-black/70 text-red-400"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-md">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white text-sm font-medium tracking-widest">AJOUTER UNE IMAGE</h3>
              <button onClick={() => setAdding(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">URL DE L'IMAGE *</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 placeholder-white/20" />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">TITRE</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50" />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">SECTION</label>
                <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full bg-[#151515] border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50">
                  <option value="home">Accueil</option>
                  <option value="menu">Menu</option>
                  <option value="about">À propos</option>
                </select>
              </div>
              {url && (
                <div className="aspect-video bg-[#1a1a1a] overflow-hidden">
                  <img src={url} alt="Aperçu" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
            <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
              <button onClick={() => setAdding(false)} className="px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest">ANNULER</button>
              <button onClick={handleAdd} className="px-5 py-2.5 bg-[#C9A227] text-black text-xs tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">AJOUTER</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
