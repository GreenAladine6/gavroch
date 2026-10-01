import { useState } from "react";

export default function About() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = "Nom requis";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.message.trim()) e.message = "Message requis";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSent(true);
    setForm({ nom: "", email: "", telephone: "", message: "" });
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Header */}
      <div className="theme-dark relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1575831315238-dfe02ecedf26?w=1600&h=600&fit=crop&auto=format"
            alt="À propos"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[9px] tracking-[0.5em] text-[#C9A227] font-medium mb-5">NOTRE MAISON</p>
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-white mb-4">À PROPOS</h1>
          <div className="w-12 h-px bg-[#C9A227] mt-6" />
        </div>
      </div>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-6">NOTRE HISTOIRE</p>
            <h2 className="font-serif text-4xl font-bold text-white mb-6 leading-tight">
              Une passion pour la pâtisserie italienne,<br />
              <em className="italic text-[#C9A227] font-normal">partagée en Tunisie.</em>
            </h2>
            <div className="w-8 h-px bg-[#C9A227] mb-8" />
            <p className="text-white/60 leading-relaxed mb-5 text-sm">
              Née d'une passion pour la grande pâtisserie italienne, Gavroche est une maison qui célèbre l'art de la douceur avec rigueur et délicatesse. Chaque création naît d'un respect profond pour les techniques ancestrales d'Italie, revisitées avec une sensibilité contemporaine.
            </p>
            <p className="text-white/50 leading-relaxed text-sm mb-5">
              Nos recettes, transmises depuis 1936, incarnent le cœur de la tradition italienne. Le fondateur, passionné de grande pâtisserie napolitaine et milanaise, a posé ses valises à Tunis — une ville méditerranéenne naturellement ouverte à la beauté et à la gastronomie.
            </p>
            <p className="text-white/50 leading-relaxed text-sm">
              Gavroche accompagne depuis des décennies des générations de Tunisois dans leurs moments de célébration, leurs cadeaux et leurs plaisirs du quotidien. Une constante : l'excellence artisanale et la fidélité aux recettes originales.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
              <img
                src="https://images.unsplash.com/photo-1664088760009-faf16e24edf9?w=600&h=800&fit=crop&auto=format"
                alt="Intérieur Gavroche"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 border border-[#C9A227]/30 w-2/3 h-2/3 -z-10" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-[#070707]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-serif text-5xl text-[#C9A227]/30 leading-none mb-4">"</div>
          <blockquote className="font-serif text-2xl md:text-3xl text-white/80 font-light italic leading-relaxed mb-6">
            Une passion pour la pâtisserie italienne, un savoir-faire partagé en Tunisie.
          </blockquote>
          <div className="w-8 h-px bg-[#C9A227] mx-auto" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Savoir-Faire", text: "Techniques ancestrales italiennes, transmises de génération en génération et pratiquées avec amour dans notre atelier de Tunis.", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
            { title: "Ingrédients", text: "Farines italiennes, beurre AOP, chocolats Valrhona, fruits frais de saison. Chaque ingrédient est sélectionné avec le plus grand soin.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
            { title: "Création", text: "Chaque création est une œuvre d'art — une alliance parfaite entre tradition et innovation, entre respect du classique et audace contemporaine.", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
          ].map(({ title, text, icon }) => (
            <div key={title} className="group border border-white/10 p-8 hover:border-[#C9A227]/40 transition-colors duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6">
                <path d={icon} />
              </svg>
              <h3 className="font-serif text-xl font-medium text-white mb-4">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-20 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-6">CONTACT & LOCALISATION</p>
              <h2 className="font-serif text-4xl font-bold text-white mb-10">Nous Trouver</h2>

              <div className="space-y-6 mb-10">
                {[
                  { label: "ADRESSE", value: "15, Rue de la Liberté, Les Berges du Lac, Tunis 1053, Tunisie", href: null },
                  { label: "TÉLÉPHONE", value: "+216 71 000 000", href: "tel:+21671000000" },
                  { label: "EMAIL", value: "contact@gavroche.tn", href: "mailto:contact@gavroche.tn" },
                  { label: "INSTAGRAM", value: "@gavroche_tunisie", href: "https://www.instagram.com/gavroche_tunisie" },
                ].map(({ label, value, href }) => (
                  <div key={label} className="border-b border-white/10 pb-4">
                    <p className="text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-1">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-white/70 text-sm hover:text-[#C9A227] transition-colors duration-300">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/70 text-sm">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-[#0d0d0d] border border-[#C9A227]/20 p-6">
                <p className="text-[9px] tracking-[0.3em] text-[#C9A227] mb-4 font-medium">HORAIRES D'OUVERTURE</p>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex justify-between"><span>Lundi – Vendredi</span><span className="text-[#C9A227]/80">8h00 – 21h00</span></div>
                  <div className="flex justify-between"><span>Samedi</span><span className="text-[#C9A227]/80">8h00 – 22h00</span></div>
                  <div className="flex justify-between"><span>Dimanche</span><span className="text-[#C9A227]/80">9h00 – 20h00</span></div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Les+Berges+du+Lac+Tunis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 border border-[#C9A227] text-[#C9A227] text-[10px] tracking-[0.25em] font-medium hover:bg-[#C9A227] hover:text-black transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                ITINÉRAIRE
              </a>
            </div>

            {/* Contact form */}
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-6">NOUS ÉCRIRE</p>
              <h2 className="font-serif text-4xl font-bold text-white mb-10">Contact</h2>

              {sent ? (
                <div className="border border-[#C9A227]/40 p-8 text-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="mx-auto mb-4">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="font-serif text-white text-xl mb-2">Message envoyé</p>
                  <p className="text-white/50 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-[10px] tracking-widest text-[#C9A227] hover:text-white transition-colors duration-300">NOUVEAU MESSAGE</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: "nom", label: "NOM *", type: "text", placeholder: "Votre nom" },
                    { id: "email", label: "EMAIL *", type: "email", placeholder: "votre@email.com" },
                    { id: "telephone", label: "TÉLÉPHONE", type: "tel", placeholder: "+216 XX XXX XXX" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">{label}</label>
                      <input
                        type={type}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        placeholder={placeholder}
                        className={`w-full bg-[#0d0d0d] border text-white text-sm px-4 py-3 focus:outline-none placeholder-white/20 transition-colors duration-300 ${errors[id] ? "border-red-500/50" : "border-white/10 focus:border-[#C9A227]/50"}`}
                      />
                      {errors[id] && <p className="text-red-400 text-xs mt-1">{errors[id]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">MESSAGE *</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Votre message..."
                      className={`w-full bg-[#0d0d0d] border text-white text-sm px-4 py-3 focus:outline-none placeholder-white/20 resize-none transition-colors duration-300 ${errors.message ? "border-red-500/50" : "border-white/10 focus:border-[#C9A227]/50"}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C9A227] text-black text-[10px] tracking-[0.25em] font-semibold hover:bg-[#E8C84A] transition-all duration-300"
                  >
                    ENVOYER
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
