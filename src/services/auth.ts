import type { AdminUser } from "../types";

const ADMIN_KEY = "gavroche_admin";
const MOCK_CREDENTIALS = { email: "admin@gavroche.tn", password: "gavroche2026" };

export function login(email: string, password: string): AdminUser | null {
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    const user: AdminUser = { id: "admin-1", email, name: "Administrateur", role: "admin" };
    localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(ADMIN_KEY);
}

export function getCurrentUser(): AdminUser | null {
  const stored = localStorage.getItem(ADMIN_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AdminUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
