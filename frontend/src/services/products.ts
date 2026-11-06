import type { Product } from "../types";
import { mockProducts } from "../data/mockData";

const KEY = "gavroche_products";
const DEMO_VERSION_KEY = "gavroche_products_demo_version";
const DEMO_VERSION = "1";

function migrate(products: Product[]): Product[] {
  let changed = false;

  let migrated = products.map((product) => {
    const seed = mockProducts.find((item) => item.id === product.id);
    const next = {
      ...product,
      popular: product.popular ?? seed?.popular ?? false,
      showOnHome: product.showOnHome ?? seed?.showOnHome ?? false,
      onPromo: product.onPromo ?? seed?.onPromo ?? false,
      promoPrice: product.promoPrice ?? seed?.promoPrice,
    };

    if (
      product.popular === undefined ||
      product.showOnHome === undefined ||
      product.onPromo === undefined ||
      (product.promoPrice === undefined && seed?.promoPrice !== undefined)
    ) {
      changed = true;
    }

    return next;
  });

  if (localStorage.getItem(DEMO_VERSION_KEY) !== DEMO_VERSION) {
    const existingIds = new Set(migrated.map((product) => product.id));
    const demoProducts = mockProducts.filter(
      (product) => product.id.startsWith("demo-") && !existingIds.has(product.id),
    );
    migrated = [...migrated, ...demoProducts];
    changed = changed || demoProducts.length > 0;
    localStorage.setItem(DEMO_VERSION_KEY, DEMO_VERSION);
  }

  if (changed) save(migrated);
  return migrated;
}

function load(): Product[] {
  const stored = localStorage.getItem(KEY);
  if (!stored) return mockProducts;
  try {
    return migrate(JSON.parse(stored));
  } catch {
    return mockProducts;
  }
}

function save(products: Product[]): void {
  localStorage.setItem(KEY, JSON.stringify(products));
}

export function getProducts(): Product[] {
  return load();
}

export function getProduct(id: string): Product | undefined {
  return load().find((p) => p.id === id);
}

export function createProduct(data: Omit<Product, "id" | "createdAt">): Product {
  const products = load();
  const product: Product = { ...data, id: `p-${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
  save([...products, product]);
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const products = load();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  save(products);
  return products[index];
}

export function deleteProduct(id: string): void {
  save(load().filter((p) => p.id !== id));
}
