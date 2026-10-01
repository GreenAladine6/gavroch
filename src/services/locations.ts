import type { Location } from "../types";
import { mockLocations } from "../data/mockData";

const KEY = "gavroche_locations";

function load(): Location[] {
  const stored = localStorage.getItem(KEY);
  if (!stored) return mockLocations;
  try { return JSON.parse(stored); } catch { return mockLocations; }
}

function save(locs: Location[]): void {
  localStorage.setItem(KEY, JSON.stringify(locs));
}

export function getLocations(): Location[] {
  return load();
}

export function getActiveLocations(): Location[] {
  return load().filter((l) => l.active);
}

export function createLocation(data: Omit<Location, "id">): Location {
  const locs = load();
  const loc: Location = { ...data, id: `loc-${Date.now()}` };
  save([...locs, loc]);
  return loc;
}

export function updateLocation(id: string, data: Partial<Location>): Location | null {
  const locs = load();
  const idx = locs.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  locs[idx] = { ...locs[idx], ...data };
  save(locs);
  return locs[idx];
}

export function deleteLocation(id: string): void {
  save(load().filter((l) => l.id !== id));
}
