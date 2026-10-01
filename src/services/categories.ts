import type { Category } from "../types";
import { mockCategories } from "../data/mockData";

const KEY = "gavroche_categories";

function load(): Category[] {
  const stored = localStorage.getItem(KEY);
  if (!stored) return mockCategories;
  try { return JSON.parse(stored); } catch { return mockCategories; }
}

function save(cats: Category[]): void {
  localStorage.setItem(KEY, JSON.stringify(cats));
}

export function getCategories(): Category[] {
  return load().sort((a, b) => a.order - b.order);
}

export function createCategory(data: Omit<Category, "id">): Category {
  const cats = load();
  const cat: Category = { ...data, id: `cat-${Date.now()}` };
  save([...cats, cat]);
  return cat;
}

export function updateCategory(id: string, data: Partial<Category>): Category | null {
  const cats = load();
  const idx = cats.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  cats[idx] = { ...cats[idx], ...data };
  save(cats);
  return cats[idx];
}

export function deleteCategory(id: string): void {
  save(load().filter((c) => c.id !== id));
}
