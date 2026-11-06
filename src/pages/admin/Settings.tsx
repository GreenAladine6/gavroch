import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Administrateur", email: "admin@gavroche.tn" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");

  const handleSaveProfile = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const handleSavePw = () => {
    if (passwords.next !== passwords.confirm) { setPwError("Les mots de passe ne correspondent pas."); return; }
    if (passwords.next.length < 6) { setPwError("Minimum 6 caractères."); return; }
    setPwError(""); setSaved(true); setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout title="Paramètres">
      <div className="space-y-8 max-w-lg">
        {/* Profile */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6">
          <h2 className="text-white text-sm font-medium tracking-widest mb-6">PROFIL ADMINISTRATEUR</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">NOM</label>
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50" />
            </div>
            <div>
              <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">EMAIL</label>
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50" />
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-[#C9A227] text-black text-[10px] tracking-widest font-semibold hover:bg-[#E8C84A] transition-all duration-300">
                ENREGISTRER
              </button>
              {saved && <span className="text-emerald-400 text-xs tracking-widest">ENREGISTRÉ ✓</span>}
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6">
          <h2 className="text-white text-sm font-medium tracking-widest mb-6">CHANGER LE MOT DE PASSE</h2>
          <div className="space-y-4">
            {[
              { key: "current", label: "MOT DE PASSE ACTUEL" },
              { key: "next", label: "NOUVEAU MOT DE PASSE" },
              { key: "confirm", label: "CONFIRMER LE NOUVEAU" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                <input
                  type="password"
                  value={passwords[key as keyof typeof passwords]}
                  onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50"
                />
              </div>
            ))}
            {pwError && <p className="text-red-400 text-xs">{pwError}</p>}
            <button onClick={handleSavePw} className="px-6 py-2.5 border border-[#C9A227]/50 text-[#C9A227] text-[10px] tracking-widest hover:bg-[#C9A227] hover:text-black transition-all duration-300">
              METTRE À JOUR
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#0d0d0d] border border-[#C9A227]/20 p-6">
          <h2 className="text-[#C9A227] text-sm font-medium tracking-widest mb-4">BACKEND</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-3">
            Ce prototype utilise le stockage local (localStorage). Pour une utilisation en production, connectez un backend :
          </p>
          <ul className="space-y-1 text-white/30 text-xs">
            <li>→ Supabase (auth, base de données, storage)</li>
            <li>→ Firebase</li>
            <li>→ REST API personnalisée</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
