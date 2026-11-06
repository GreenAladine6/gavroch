import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#C9A227]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Logo size={64} />
              <div>
                <div className="font-serif text-2xl font-bold tracking-[0.15em] text-white">GAVROCHE</div>
                <div className="text-[8px] tracking-[0.35em] text-[#C9A227] font-light mt-0.5">PÂTISSERIE ITALIENNE · TUNIS</div>
                <div className="text-[7px] tracking-[0.2em] text-white/30 mt-0.5">RECETTE DEPUIS 1936</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Le savoir-faire italien au cœur de Tunis. Une maison dédiée à l'art de la douceur.
            </p>
            <a
              href="https://www.instagram.com/gavroche_tunisie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[#C9A227] text-xs tracking-widest hover:text-white transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @GAVROCHE_TUNISIE
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] text-[#C9A227] mb-6 font-medium">NAVIGATION</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/menu", label: "Menu" },
                { to: "/about", label: "À Propos" },
                { to: "/about#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 text-sm hover:text-[#C9A227] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] text-[#C9A227] mb-6 font-medium">CONTACT</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>15, Rue de la Liberté</li>
              <li>Les Berges du Lac, Tunis</li>
              <li className="pt-1">+216 71 000 000</li>
              <li>contact@gavroche.tn</li>
              <li className="pt-2 text-[#C9A227]/80">Lun – Ven : 8h – 21h</li>
              <li className="text-[#C9A227]/80">Sam – Dim : 8h – 22h</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            © 2026 Gavroche — Tous droits réservés.
          </p>
          <Link
            to="/admin/login"
            className="text-white/20 text-xs tracking-wider hover:text-white/40 transition-colors duration-300"
          >
            Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
