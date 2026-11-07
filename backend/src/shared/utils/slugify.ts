// src/shared/utils/slugify.ts
// "Crème Brûlée!" -> "creme-brulee"  (used for friendly URLs like ?category=creme-brulee)
export function slugify(text: string): string {
  return text
    .normalize('NFD')                 // split letters from accents: é -> e + ´
    .replace(/[\u0300-\u036f]/g, '')  // remove the accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')      // anything else becomes "-"
    .replace(/(^-|-$)/g, '');         // no "-" at the start or end
}