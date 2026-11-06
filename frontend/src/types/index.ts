export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  featured: boolean;
  available: boolean;
  popular: boolean;
  showOnHome: boolean;
  onPromo: boolean;
  promoPrice?: number;
  promoStartDate?: string;
  promoEndDate?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title?: string;
  section?: string;
  featured: boolean;
  order: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  imageUrl: string;
  hours: string;
  mapsUrl?: string;
  active: boolean;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutText: string;
  aboutTextSecondary: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface ContactInfo {
  shopName: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  openingHours: {
    weekdays: string;
    weekends: string;
    sunday: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}
