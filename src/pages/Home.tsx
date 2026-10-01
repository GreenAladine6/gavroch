import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import { getCategories } from "../services/categories";
import { getGallery } from "../services/gallery";
import { getSiteContent, getContactInfo } from "../services/content";
import { getActiveLocations } from "../services/locations";
import ProductCard from "../components/ProductCard";
import Logo from "../components/Logo";
import type { Product, Category, GalleryImage, SiteContent, ContactInfo, Location } from "../types";

function useInView(threshold = 0.12) {
  const [element, ref] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!element) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(element);
    return () => obs.disconnect();
  }, [element, threshold]);
  return { ref, visible };
}

function PromoCard({ product, categories }: { product: Product; categories: Category[] }) {
  const cat = categories.find((c) => c.id === product.categoryId);
  const discount = product.promoPrice
    ? Math.round(((product.price - product.promoPrice) / product.price) * 100)
    : 0;

  return (
    <article className="group relative h-full flex flex-col bg-[#0d0d0d] border border-red-500/15 hover:border-red-500/50 transition-all duration-500 overflow-hidden">
      <div className="theme-dark relative aspect-[4/3] sm:aspect-square lg:aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="text-[9px] tracking-[0.18em] bg-red-500 text-white px-3 py-2 font-semibold shadow-lg">
            -{discount}%
          </span>
          <span className="text-[8px] tracking-[0.18em] bg-black/70 text-white px-2.5 py-2 font-medium">
            OFFRE LIMITÉE
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {cat && <p className="text-[8px] tracking-[0.3em] text-[#C9A227] mb-2">{cat.name.toUpperCase()}</p>}
        <h3 className="font-serif text-xl font-semibold text-white mb-2 leading-tight">{product.name}</h3>
        <p className="text-white/50 text-xs leading-relaxed mb-5 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[#C9A227] text-2xl font-semibold">
            {product.promoPrice?.toFixed(2)} DT
            </span>
            <span className="text-white/40 text-xs line-through">{product.price.toFixed(2)} DT</span>
          </div>
          <Link
            to={`/menu?cat=${product.categoryId}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#C9A227]/40 text-[#C9A227] transition-all duration-300 hover:bg-[#C9A227] hover:text-black"
            aria-label={`Voir ${product.name} dans le menu`}
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path d="M1 4h12M9 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </article>
  );
}

function PopularCard({ product, categories }: { product: Product; categories: Category[] }) {
  const cat = categories.find((c) => c.id === product.categoryId);
  return (
    <article className="group h-full flex flex-col overflow-hidden bg-[#0d0d0d] border border-white/10 hover:border-[#C9A227]/60 transition-all duration-500">
      <div className="theme-dark relative aspect-[4/3] sm:aspect-square lg:aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-3">
          <span className="text-[8px] tracking-[0.2em] bg-[#C9A227] text-black px-3 py-2 font-semibold">
            BEST-SELLER
          </span>
          {product.onPromo && product.promoPrice && (
            <span className="text-[8px] tracking-widest bg-red-500 text-white px-2.5 py-2 font-semibold">PROMO</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {cat && <p className="text-[8px] tracking-[0.3em] text-[#C9A227] mb-2">{cat.name.toUpperCase()}</p>}
        <h3 className="font-serif text-xl font-semibold text-white leading-tight">{product.name}</h3>
        <p className="text-white/50 text-xs leading-relaxed mt-2 mb-5 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex items-baseline gap-2">
          {product.onPromo && product.promoPrice ? (
            <>
                <span className="font-serif text-[#C9A227] font-semibold text-xl">{product.promoPrice.toFixed(2)} DT</span>
                <span className="text-white/40 text-xs line-through">{product.price.toFixed(2)} DT</span>
            </>
          ) : (
            <span className="font-serif text-[#C9A227] font-semibold text-xl">{product.price.toFixed(2)} DT</span>
          )}
          </div>
          <Link
            to={`/menu?cat=${product.categoryId}`}
            className="text-[9px] tracking-[0.15em] text-[#C9A227] border-b border-[#C9A227]/40 pb-0.5 hover:border-[#C9A227]"
          >
            VOIR
          </Link>
        </div>
      </div>
    </article>
  );
}

const whyUs = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Qualité Premium", text: "Ingrédients italiens sélectionnés : beurre AOP, chocolats Valrhona, farines de première mouture." },
  { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "Fabrication Artisanale", text: "Chaque pièce est façonnée à la main, dans le respect des traditions italiennes depuis 1936." },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Produits Frais", text: "Nos pâtisseries sont préparées chaque matin, jamais la veille. La fraîcheur fait partie de notre promesse." },
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Commande Facile", text: "Commandez en boutique ou contactez-nous directement. Préparation sur mesure pour vos événements." },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const prods = getProducts();
    setProducts(prods);
    setCategories(getCategories());
    setGallery(getGallery().filter((g) => g.featured));
    setLocations(getActiveLocations());
    setContent(getSiteContent());
    setContact(getContactInfo());
  }, []);

  const popularProducts = products
    .filter((p) => p.popular && p.available)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const promoProducts = products.filter((p) => p.onPromo && p.available && p.promoPrice);
  const featuredProducts = products.filter((p) => p.featured && p.available);
  const activeCategories = categories.filter((c) => c.active).slice(0, 6);

  const s = {
    intro: useInView(),
    popular: useInView(),
    promos: useInView(),
    specialties: useInView(),
    featured: useInView(),
    whyUs: useInView(),
    locs: useInView(),
    instagram: useInView(),
    location: useInView(),
  };

  if (!content || !contact) return null;

  return (
    <div className="bg-[#050505]">
      {/* ── HERO ── */}
      <section className="theme-dark relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1762117863153-6db91d93eb66?w=1600&h=900&fit=crop&auto=format"
            alt="Gavroche pâtisserie"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
        </div>
        {/* Logo watermark */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-8 hidden lg:block pointer-events-none select-none">
          <Logo size={340} />
        </div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-[#C9A227] to-transparent hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24">
          <div className="max-w-2xl">
            <p className="text-[9px] tracking-[0.5em] text-[#C9A227] font-medium mb-8 animate-fade-in-up">
              TUNIS · RECETTE DEPUIS 1936
            </p>
            <h1 className="font-serif text-7xl md:text-9xl font-bold text-white leading-none tracking-tight mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {content.heroTitle}
            </h1>
            <p className="text-[11px] tracking-[0.5em] text-[#C9A227] font-light mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {content.heroSubtitle}
            </p>
            <div className="w-12 h-px bg-[#C9A227] mb-8 animate-fade-in-up" style={{ animationDelay: "0.25s" }} />
            <p className="text-white/70 text-lg font-light leading-relaxed mb-12 max-w-md animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {content.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/menu" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A227] text-black text-[10px] tracking-[0.25em] font-semibold hover:bg-[#E8C84A] transition-all duration-300">
                DÉCOUVRIR NOS PÂTISSERIES
              </Link>
              {promoProducts.length > 0 && (
                <a href="#promotions" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-red-500/60 text-red-400 text-[10px] tracking-[0.25em] font-medium hover:bg-red-500 hover:text-white transition-all duration-300">
                  VOIR LES PROMOTIONS
                </a>
              )}
              {promoProducts.length === 0 && (
                <Link to="/menu" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white text-[10px] tracking-[0.25em] font-medium hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-300">
                  VOIR LE MENU
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-shimmer">
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A227] to-transparent" />
          <span className="text-[8px] tracking-[0.3em] text-[#C9A227]/60">SCROLL</span>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ── */}
      <section
        ref={s.popular.ref}
        id="populaires"
        className={`py-16 md:py-24 bg-[#070707] transition-all duration-1000 ${s.popular.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-4">BEST-SELLERS</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">Nos créations populaires</h2>
              <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-xl">
                Les créations préférées de nos clients, préparées chaque jour dans notre atelier.
              </p>
              <div className="w-12 h-px bg-[#C9A227] mt-5" />
            </div>
            <Link to="/menu" className="text-[10px] tracking-[0.2em] text-[#C9A227] border-b border-[#C9A227]/40 pb-0.5 hover:border-[#C9A227] transition-colors duration-300 shrink-0">
              VOIR TOUT LE MENU →
            </Link>
          </div>

          {popularProducts.length === 0 ? (
            <div className="text-center py-16 border border-white/5">
              <p className="text-white/20 text-sm tracking-widest">AUCUN PRODUIT POPULAIRE POUR L'INSTANT</p>
              <p className="text-white/10 text-xs mt-2">L'administrateur peut marquer des produits comme populaires depuis le Dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
              {popularProducts.slice(0, 4).map((product) => (
                <PopularCard key={product.id} product={product} categories={categories} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PROMOTIONS ── */}
      <section
        ref={s.promos.ref}
        id="promotions"
        className={`py-16 md:py-24 transition-all duration-1000 ${s.promos.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-red-400 font-medium mb-4">OFFRES LIMITÉES</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">Promotions du moment</h2>
              <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-xl">
                Profitez de nos offres gourmandes pendant une durée limitée.
              </p>
              <div className="w-12 h-px bg-red-500/60 mt-5" />
            </div>
          </div>

          {promoProducts.length === 0 ? (
            <div className="text-center py-16 border border-white/5">
              <p className="text-white/20 text-sm tracking-widest">AUCUNE PROMOTION ACTIVE POUR L'INSTANT</p>
              <p className="text-white/10 text-xs mt-2">L'administrateur peut activer des promotions depuis le Dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
              {promoProducts.map((p) => (
                <PromoCard key={p.id} product={p} categories={categories} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SPECIALTIES / CATEGORIES ── */}
      <section
        ref={s.specialties.ref}
        className={`py-24 bg-[#070707] transition-all duration-1000 ${s.specialties.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-4">COLLECTIONS</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Nos Spécialités</h2>
            <div className="w-12 h-px bg-[#C9A227] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {activeCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu?cat=${cat.id}`}
                className="theme-dark group relative aspect-square overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-[#C9A227]/40 transition-all duration-500"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <p className="text-white text-[10px] tracking-[0.15em] font-semibold leading-tight group-hover:text-[#C9A227] transition-colors duration-300">
                    {cat.name.toUpperCase()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="inline-flex items-center gap-3 px-10 py-4 border border-[#C9A227]/40 text-[#C9A227] text-[10px] tracking-[0.25em] font-medium hover:bg-[#C9A227] hover:text-black transition-all duration-300">
              EXPLORER LE MENU COMPLET
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND INTRO ── */}
      <section
        ref={s.intro.ref}
        className={`py-24 transition-all duration-1000 ${s.intro.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-6">NOTRE HISTOIRE</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                L'ART DE LA<br />
                <em className="italic text-[#C9A227]">Pâtisserie Italienne</em>
              </h2>
              <div className="w-12 h-px bg-[#C9A227] mb-8" />
              <p className="text-white/60 leading-relaxed mb-6">{content.aboutText}</p>
              <p className="text-white/50 leading-relaxed text-sm mb-10">{content.aboutTextSecondary}</p>
              <Link to="/about" className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-[#C9A227] font-medium border-b border-[#C9A227]/40 pb-0.5 hover:border-[#C9A227] transition-colors duration-300">
                NOTRE HISTOIRE COMPLÈTE
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4h12M9 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://images.unsplash.com/photo-1575831315238-dfe02ecedf26?w=800&h=1000&fit=crop&auto=format"
                  alt="Artisan pâtissier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#C9A227] text-black px-6 py-5">
                <div className="font-serif text-2xl font-bold leading-none">1936</div>
                <div className="text-[8px] tracking-[0.2em] font-medium mt-1">RECETTE DEPUIS</div>
              </div>
              <div className="absolute top-6 -right-4 w-px h-24 bg-gradient-to-b from-[#C9A227] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section
        ref={s.featured.ref}
        className={`py-24 bg-[#070707] transition-all duration-1000 ${s.featured.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-4">SÉLECTION</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">NOS CRÉATIONS</h2>
            <div className="w-12 h-px bg-[#C9A227] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} categories={categories} />
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/menu" className="inline-flex items-center gap-3 px-10 py-4 border border-[#C9A227]/50 text-[#C9A227] text-[10px] tracking-[0.25em] font-medium hover:bg-[#C9A227] hover:text-black transition-all duration-300">
              VOIR TOUT LE MENU
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section
        ref={s.whyUs.ref}
        className={`py-24 transition-all duration-1000 ${s.whyUs.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-4">NOS ENGAGEMENTS</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Pourquoi nous choisir ?</h2>
            <div className="w-12 h-px bg-[#C9A227] mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon, title, text }) => (
              <div key={title} className="group border border-white/5 p-7 hover:border-[#C9A227]/30 transition-all duration-300 hover:bg-white/[0.02]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6">
                  <path d={icon} />
                </svg>
                <h3 className="font-serif text-lg font-medium text-white mb-3">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section
        ref={s.locs.ref}
        className={`py-24 bg-[#070707] transition-all duration-1000 ${s.locs.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-4">OÙ NOUS TROUVER</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Nos Locaux</h2>
              <div className="w-12 h-px bg-[#C9A227] mt-5" />
            </div>
          </div>

          {locations.length === 0 ? (
            <div className="text-center py-16 border border-white/5">
              <p className="text-white/20 text-sm tracking-widest">AUCUN LOCAL ACTIF</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc) => (
                <div key={loc.id} className="group bg-[#0d0d0d] border border-white/5 hover:border-[#C9A227]/30 transition-all duration-500 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden bg-[#1a1a1a]">
                    <img
                      src={loc.imageUrl}
                      alt={loc.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-medium text-white mb-3 leading-tight">{loc.name}</h3>
                    <ul className="space-y-2 mb-5">
                      <li className="flex items-start gap-2.5 text-white/50 text-xs">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {loc.address}
                      </li>
                      <li className="flex items-center gap-2.5 text-white/50 text-xs">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="shrink-0"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.79 19.79 19.79 0 011.18 1.18C1.18.48 1.66 0 2.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.27 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                        {loc.phone}
                      </li>
                      <li className="flex items-center gap-2.5 text-white/50 text-xs">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" className="shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {loc.hours}
                      </li>
                    </ul>
                    {loc.mapsUrl && (
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] text-[#C9A227] font-medium border border-[#C9A227]/30 px-4 py-2 hover:bg-[#C9A227] hover:text-black transition-all duration-300"
                      >
                        VOIR LE LOCAL
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── INSTAGRAM GALLERY ── */}
      <section
        ref={s.instagram.ref}
        className={`py-24 transition-all duration-1000 ${s.instagram.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-4">INSTAGRAM</p>
            <h2 className="font-serif text-4xl font-bold text-white mb-2">SEGUI GAVROCHE</h2>
            <p className="text-white/40 text-sm tracking-wider mt-3">Découvrez nos dernières créations</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {gallery.slice(0, 6).map((img) => (
              <a
                key={img.id}
                href="https://www.instagram.com/gavroche_tunisie"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-dark group relative aspect-square overflow-hidden bg-[#1a1a1a]"
              >
                <img src={img.imageUrl} alt={img.title || "Gavroche"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/gavroche_tunisie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#C9A227] font-medium border border-[#C9A227]/30 px-8 py-3 hover:bg-[#C9A227] hover:text-black transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @GAVROCHE_TUNISIE
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-[#070707]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="border border-[#C9A227]/20 p-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-16 h-px bg-[#C9A227]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px w-16 h-px bg-[#C9A227]" />
            <p className="text-[9px] tracking-[0.5em] text-[#C9A227] font-medium mb-6">GAVROCHE</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Laissez-vous séduire<br />
              <em className="italic text-[#C9A227] font-normal">par l'Italie à Tunis</em>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed max-w-md mx-auto">
              Des créations artisanales préparées chaque matin, avec passion et rigueur. Venez nous rendre visite ou commandez pour votre prochain événement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A227] text-black text-[10px] tracking-[0.25em] font-semibold hover:bg-[#E8C84A] transition-all duration-300">
                DÉCOUVRIR NOS PRODUITS
              </Link>
              <Link to="/about#contact" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-[10px] tracking-[0.25em] font-medium hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-300">
                NOUS CONTACTER
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION PREVIEW ── */}
      <section
        ref={s.location.ref}
        className={`py-24 transition-all duration-1000 ${s.location.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="theme-dark relative aspect-video bg-[#1a1a1a] overflow-hidden border border-[#C9A227]/20">
              <img src="https://images.unsplash.com/photo-1729809106394-7ceb922b37f0?w=800&h=500&fit=crop&auto=format" alt="Notre adresse" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" className="mx-auto mb-3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <p className="text-white/60 text-xs tracking-widest">LES BERGES DU LAC, TUNIS</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium mb-6">NOUS TROUVER</p>
              <h2 className="font-serif text-4xl font-bold text-white mb-8">
                Gavroche<br />
                <span className="text-white/40 font-normal text-2xl">Pâtisserie Italienne</span>
              </h2>
              <ul className="space-y-4 mb-10">
                {[
                  { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z", text: contact.address },
                  { icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.79 19.79 19.79 0 011.18 1.18C1.18.48 1.66 0 2.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.27 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", text: contact.phone },
                  { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6", text: contact.email },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d={icon} /></svg>
                    <span className="text-white/60 text-sm">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="border border-[#C9A227]/20 p-5 mb-8">
                <p className="text-[9px] tracking-[0.3em] text-[#C9A227] mb-3">HORAIRES</p>
                <p className="text-white/60 text-sm mb-1">{contact.openingHours.weekdays}</p>
                <p className="text-white/60 text-sm">{contact.openingHours.weekends}</p>
              </div>
              <Link to="/about" className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A227] text-black text-[10px] tracking-[0.25em] font-semibold hover:bg-[#E8C84A] transition-all duration-300">
                ITINÉRAIRE & CONTACT
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
