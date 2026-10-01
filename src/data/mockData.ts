import type { Category, Product, GalleryImage, SiteContent, ContactInfo, Location } from "../types";

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Pâtisseries", description: "Nos créations sucrées artisanales", imageUrl: "https://images.unsplash.com/photo-1600835768553-0cc19062f912?w=400&h=300&fit=crop&auto=format", order: 1, active: true },
  { id: "cat-2", name: "Viennoiseries", description: "Croissants et pains au beurre feuilletés", imageUrl: "https://images.unsplash.com/photo-1604071489531-21b6358751cd?w=400&h=300&fit=crop&auto=format", order: 2, active: true },
  { id: "cat-3", name: "Gâteaux", description: "Gâteaux entiers pour toutes occasions", imageUrl: "https://images.unsplash.com/photo-1629129448957-efaaa3e01798?w=400&h=300&fit=crop&auto=format", order: 3, active: true },
  { id: "cat-4", name: "Desserts italiens", description: "Tiramisu, cannoli et spécialités d'Italie", imageUrl: "https://images.unsplash.com/photo-1583353437359-26fc97204aea?w=400&h=300&fit=crop&auto=format", order: 4, active: true },
  { id: "cat-5", name: "Chocolats", description: "Pralinés et truffes de haute voltige", imageUrl: "https://images.unsplash.com/photo-1632134526942-c51acdecb76e?w=400&h=300&fit=crop&auto=format", order: 5, active: true },
  { id: "cat-6", name: "Boissons", description: "Cafés, thés et boissons froides", imageUrl: "https://images.unsplash.com/photo-1646495992245-83139df0938d?w=400&h=300&fit=crop&auto=format", order: 6, active: true },
  { id: "cat-7", name: "Spécialités", description: "Créations exclusives Gavroche", imageUrl: "https://images.unsplash.com/photo-1643399904917-35a0e81166ca?w=400&h=300&fit=crop&auto=format", order: 7, active: true },
  { id: "cat-8", name: "Nouveautés", description: "Les dernières créations de notre chef", imageUrl: "https://images.unsplash.com/photo-1762117863153-6db91d93eb66?w=400&h=300&fit=crop&auto=format", order: 8, active: true },
];

export const mockProducts: Product[] = [
  { id: "p-1", name: "Tiramisu Classique", description: "Mascarpone onctueux, café fort, biscuits Savoiardi, cacao de Valrhona", price: 12.5, categoryId: "cat-4", imageUrl: "https://images.unsplash.com/photo-1583353437359-26fc97204aea?w=600&h=600&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: false, createdAt: "2026-01-15" },
  { id: "p-2", name: "Cannoli Siciliani", description: "Pâte croustillante, ricotta fraîche, zeste d'orange, pistaches de Bronte", price: 9.5, categoryId: "cat-4", imageUrl: "https://images.unsplash.com/photo-1632134526942-c51acdecb76e?w=600&h=600&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: true, promoPrice: 7.5, createdAt: "2026-01-20" },
  { id: "p-3", name: "Croissant au Beurre", description: "Feuilletage pur beurre AOP, dorure à l'œuf, 72 heures de fermentation", price: 5.5, categoryId: "cat-2", imageUrl: "https://images.unsplash.com/photo-1604071489531-21b6358751cd?w=600&h=600&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: false, createdAt: "2026-02-01" },
  { id: "p-4", name: "Millefoglie", description: "Mille-feuilles à l'italienne, crème diplomate vanille Bourbon, caramel doré", price: 16.0, categoryId: "cat-1", imageUrl: "https://images.unsplash.com/photo-1600835768553-0cc19062f912?w=600&h=600&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: true, promoPrice: 12.0, createdAt: "2026-02-10" },
  { id: "p-5", name: "Torta della Nonna", description: "Tarte grand-mère, crème pâtissière citron, pignons de pin, sucre glace", price: 11.0, categoryId: "cat-3", imageUrl: "https://images.unsplash.com/photo-1629129448957-efaaa3e01798?w=600&h=600&fit=crop&auto=format", featured: true, available: true, popular: false, showOnHome: true, onPromo: false, createdAt: "2026-02-15" },
  { id: "p-6", name: "Pasticcini Assortiti", description: "Assortiment de petites pâtisseries italiennes, 6 pièces", price: 18.0, categoryId: "cat-1", imageUrl: "https://images.unsplash.com/photo-1643399904917-35a0e81166ca?w=600&h=600&fit=crop&auto=format", featured: true, available: true, popular: false, showOnHome: true, onPromo: true, promoPrice: 14.0, createdAt: "2026-03-01" },
  { id: "p-7", name: "Sfogliatella", description: "Sfogliatella napolitaine, farce à la ricotta et semoule, cannelle", price: 6.5, categoryId: "cat-4", imageUrl: "https://images.unsplash.com/photo-1646495992245-83139df0938d?w=600&h=600&fit=crop&auto=format", featured: false, available: true, popular: false, showOnHome: false, onPromo: false, createdAt: "2026-03-10" },
  { id: "p-8", name: "Brioche con Tuppo", description: "Brioche sicilienne moelleuse, idéale avec granita ou gelato", price: 5.0, categoryId: "cat-2", imageUrl: "https://images.unsplash.com/photo-1611292984550-6dd8def2e668?w=600&h=600&fit=crop&auto=format", featured: false, available: true, popular: false, showOnHome: false, onPromo: false, createdAt: "2026-03-15" },
  { id: "p-9", name: "Torta Caprese", description: "Fondant chocolat noir et amandes, sans farine, pure extase", price: 13.0, categoryId: "cat-3", imageUrl: "https://images.unsplash.com/photo-1600975814842-69bd3df9c798?w=600&h=600&fit=crop&auto=format", featured: false, available: true, popular: false, showOnHome: false, onPromo: false, createdAt: "2026-04-01" },
  { id: "p-10", name: "Pralinés Gavroche", description: "Boîte de 9 pralinés artisanaux, ganaches aux fruits et épices rares", price: 22.0, categoryId: "cat-5", imageUrl: "https://images.unsplash.com/photo-1632134526942-c51acdecb76e?w=600&h=600&fit=crop&auto=format", featured: false, available: true, popular: false, showOnHome: false, onPromo: false, createdAt: "2026-04-10" },
  { id: "p-11", name: "Caffè Gavroche", description: "Espresso Italian, single origin, torréfaction lente", price: 3.0, categoryId: "cat-6", imageUrl: "https://images.unsplash.com/photo-1583353437359-26fc97204aea?w=600&h=600&fit=crop&auto=format", featured: false, available: true, popular: false, showOnHome: false, onPromo: false, createdAt: "2026-05-01" },
  { id: "p-12", name: "Tarte aux Figues", description: "Frangipane d'amandes, figues fraîches de Tunisie, miel d'acacia", price: 19.0, categoryId: "cat-8", imageUrl: "https://images.unsplash.com/photo-1643399904917-35a0e81166ca?w=600&h=600&fit=crop&auto=format", featured: false, available: true, popular: true, showOnHome: true, onPromo: true, promoPrice: 15.0, createdAt: "2026-09-01" },
  { id: "demo-1", name: "Cannolo Oro", description: "Cannolo croustillant, ricotta vanillée, chocolat noir et éclats de pistache", price: 11.5, categoryId: "cat-4", imageUrl: "https://images.unsplash.com/photo-1773113634788-9329d4db6141?w=800&h=800&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: true, promoPrice: 8.5, createdAt: "2026-10-04" },
  { id: "demo-2", name: "Tiramisù Pistacchio", description: "Mascarpone léger, biscuit café et crème de pistache de Bronte", price: 15.0, categoryId: "cat-4", imageUrl: "https://images.unsplash.com/photo-1774428755024-88024a28223c?w=800&h=800&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: false, createdAt: "2026-10-03" },
  { id: "demo-3", name: "Cannoli al Cioccolato", description: "Coque dorée, crème de ricotta et généreux filet de chocolat italien", price: 13.0, categoryId: "cat-4", imageUrl: "https://images.unsplash.com/photo-1772494047824-c664b7e24ee8?w=800&h=800&fit=crop&auto=format", featured: false, available: true, popular: true, showOnHome: true, onPromo: true, promoPrice: 9.9, createdAt: "2026-10-02" },
  { id: "demo-4", name: "Dolce della Casa", description: "Création signature du chef, crème soyeuse et biscuit délicatement caramélisé", price: 17.5, categoryId: "cat-7", imageUrl: "https://images.unsplash.com/photo-1571292226185-6a16b4d879ee?w=800&h=800&fit=crop&auto=format", featured: true, available: true, popular: true, showOnHome: true, onPromo: true, promoPrice: 13.5, createdAt: "2026-10-01" },
];

export const mockGallery: GalleryImage[] = [
  { id: "g-1", imageUrl: "https://images.unsplash.com/photo-1583353437359-26fc97204aea?w=600&h=600&fit=crop&auto=format", title: "Tiramisu signature", section: "home", featured: true, order: 1 },
  { id: "g-2", imageUrl: "https://images.unsplash.com/photo-1632134526942-c51acdecb76e?w=600&h=600&fit=crop&auto=format", title: "Cannoli siciliani", section: "home", featured: true, order: 2 },
  { id: "g-3", imageUrl: "https://images.unsplash.com/photo-1600835768553-0cc19062f912?w=600&h=600&fit=crop&auto=format", title: "Millefoglie", section: "home", featured: true, order: 3 },
  { id: "g-4", imageUrl: "https://images.unsplash.com/photo-1643399904917-35a0e81166ca?w=600&h=600&fit=crop&auto=format", title: "Pasticcini", section: "home", featured: true, order: 4 },
  { id: "g-5", imageUrl: "https://images.unsplash.com/photo-1629129448957-efaaa3e01798?w=600&h=600&fit=crop&auto=format", title: "Torta della Nonna", section: "home", featured: true, order: 5 },
  { id: "g-6", imageUrl: "https://images.unsplash.com/photo-1762117863153-6db91d93eb66?w=600&h=600&fit=crop&auto=format", title: "Notre vitrine", section: "home", featured: true, order: 6 },
];

export const mockLocations: Location[] = [
  {
    id: "loc-1",
    name: "Gavroche — Les Berges du Lac",
    address: "15, Rue de la Liberté, Les Berges du Lac, Tunis 1053",
    phone: "+216 71 000 001",
    description: "Notre boutique principale au cœur des Berges du Lac, dans un cadre élégant et lumineux.",
    imageUrl: "https://images.unsplash.com/photo-1664088760009-faf16e24edf9?w=800&h=500&fit=crop&auto=format",
    hours: "Lun–Ven : 8h–21h · Sam–Dim : 8h–22h",
    mapsUrl: "https://maps.google.com/?q=Les+Berges+du+Lac+Tunis",
    active: true,
  },
  {
    id: "loc-2",
    name: "Gavroche — La Marsa",
    address: "Rue Habib Bourguiba, La Marsa, Tunis 2070",
    phone: "+216 71 000 002",
    description: "Notre second espace, face à la mer, idéal pour une pause sucrée après la plage.",
    imageUrl: "https://images.unsplash.com/photo-1762117863153-6db91d93eb66?w=800&h=500&fit=crop&auto=format",
    hours: "Tous les jours : 9h–23h",
    mapsUrl: "https://maps.google.com/?q=La+Marsa+Tunis",
    active: true,
  },
  {
    id: "loc-3",
    name: "Gavroche — Sousse",
    address: "Avenue Habib Bourguiba, Sousse 4000",
    phone: "+216 73 000 003",
    description: "Notre boutique de Sousse, au cœur de la ville, pour les amateurs de douceurs italiennes en Sahel.",
    imageUrl: "https://images.unsplash.com/photo-1729809106394-7ceb922b37f0?w=800&h=500&fit=crop&auto=format",
    hours: "Lun–Sam : 8h–21h · Dim : 9h–20h",
    mapsUrl: "https://maps.google.com/?q=Sousse+Tunisie",
    active: true,
  },
];

export const defaultSiteContent: SiteContent = {
  heroTitle: "GAVROCHE",
  heroSubtitle: "PÂTISSERIE ITALIENNE",
  heroDescription: "Recette depuis 1936 — le savoir-faire italien au cœur de Tunis. Des créations artisanales qui éveillent les sens et honorent la tradition.",
  aboutText: "Née d'une passion pour la grande pâtisserie italienne, Gavroche est une maison fondée sur des recettes transmises depuis 1936. Nous célébrons l'art de la douceur avec rigueur et délicatesse. Chaque création naît d'un respect profond pour les techniques ancestrales d'Italie, revisitées avec une sensibilité contemporaine.",
  aboutTextSecondary: "Nos ingrédients sont sélectionnés avec soin : farines italiennes de première qualité, beurre AOP, chocolats Valrhona, fruits de saison issus des marchés tunisiens. Chaque détail compte, chaque geste est précis. Bienvenue dans notre maison.",
  instagramUrl: "https://www.instagram.com/gavroche_tunisie",
  facebookUrl: "",
};

export const defaultContactInfo: ContactInfo = {
  shopName: "Gavroche Pâtisserie Italienne",
  address: "15, Rue de la Liberté, Les Berges du Lac, Tunis 1053, Tunisie",
  phone: "+216 71 000 000",
  email: "contact@gavroche.tn",
  instagram: "gavroche_tunisie",
  facebook: "",
  openingHours: {
    weekdays: "Lundi – Vendredi : 8h00 – 21h00",
    weekends: "Samedi – Dimanche : 8h00 – 22h00",
    sunday: "Dimanche : 9h00 – 20h00",
  },
};
