import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getSiteContent, saveSiteContent, getContactInfo, saveContactInfo } from "../../services/content";
import type { SiteContent, ContactInfo } from "../../types";

export default function Content() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(getSiteContent());
    setContact(getContactInfo());
  }, []);

  const handleSave = () => {
    if (content) saveSiteContent(content);
    if (contact) saveContactInfo(contact);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!content || !contact) return null;

  return (
    <AdminLayout title="Contenu du site">
      <div className="space-y-8 max-w-2xl">
        {/* Hero section */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6">
          <h2 className="text-white text-sm font-medium tracking-widest mb-6">SECTION HÉRO</h2>
          <div className="space-y-4">
            {[
              { key: "heroTitle", label: "TITRE PRINCIPAL" },
              { key: "heroSubtitle", label: "SOUS-TITRE" },
              { key: "heroDescription", label: "DESCRIPTION" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                {key === "heroDescription" ? (
                  <textarea
                    rows={3}
                    value={content[key as keyof SiteContent] as string}
                    onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={content[key as keyof SiteContent] as string}
                    onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* About section */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6">
          <h2 className="text-white text-sm font-medium tracking-widest mb-6">SECTION À PROPOS</h2>
          <div className="space-y-4">
            {[
              { key: "aboutText", label: "TEXTE PRINCIPAL" },
              { key: "aboutTextSecondary", label: "TEXTE SECONDAIRE" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                <textarea
                  rows={4}
                  value={content[key as keyof SiteContent] as string}
                  onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6">
          <h2 className="text-white text-sm font-medium tracking-widest mb-6">INFORMATIONS DE CONTACT</h2>
          <div className="space-y-4">
            {[
              { key: "shopName", label: "NOM DE LA BOUTIQUE" },
              { key: "address", label: "ADRESSE" },
              { key: "phone", label: "TÉLÉPHONE" },
              { key: "email", label: "EMAIL" },
              { key: "instagram", label: "INSTAGRAM (sans @)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                <input
                  type="text"
                  value={contact[key as keyof ContactInfo] as string}
                  onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6">
          <h2 className="text-white text-sm font-medium tracking-widest mb-6">HORAIRES D'OUVERTURE</h2>
          <div className="space-y-4">
            {[
              { key: "weekdays", label: "SEMAINE" },
              { key: "weekends", label: "WEEK-END" },
              { key: "sunday", label: "DIMANCHE" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                <input
                  type="text"
                  value={contact.openingHours[key as keyof typeof contact.openingHours]}
                  onChange={(e) => setContact({ ...contact, openingHours: { ...contact.openingHours, [key]: e.target.value } })}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-3.5 bg-[#C9A227] text-black text-[10px] tracking-[0.25em] font-semibold hover:bg-[#E8C84A] transition-all duration-300"
          >
            ENREGISTRER LES MODIFICATIONS
          </button>
          {saved && (
            <span className="text-emerald-400 text-xs tracking-widest flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              ENREGISTRÉ
            </span>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
