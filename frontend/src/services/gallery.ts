import type { GalleryImage } from "../types";
import { mockGallery } from "../data/mockData";

const KEY = "gavroche_gallery";

function load(): GalleryImage[] {
  const stored = localStorage.getItem(KEY);
  if (!stored) return mockGallery;
  try { return JSON.parse(stored); } catch { return mockGallery; }
}

function save(imgs: GalleryImage[]): void {
  localStorage.setItem(KEY, JSON.stringify(imgs));
}

export function getGallery(): GalleryImage[] {
  return load().sort((a, b) => a.order - b.order);
}

export function addImage(data: Omit<GalleryImage, "id">): GalleryImage {
  const imgs = load();
  const img: GalleryImage = { ...data, id: `g-${Date.now()}` };
  save([...imgs, img]);
  return img;
}

export function updateImage(id: string, data: Partial<GalleryImage>): GalleryImage | null {
  const imgs = load();
  const idx = imgs.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  imgs[idx] = { ...imgs[idx], ...data };
  save(imgs);
  return imgs[idx];
}

export function deleteImage(id: string): void {
  save(load().filter((i) => i.id !== id));
}
