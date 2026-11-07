import type { SiteContent, ContactInfo } from "../types";
import { defaultSiteContent, defaultContactInfo } from "../data/mockData";

const CONTENT_KEY = "gavroche_content";
const CONTACT_KEY = "gavroche_contact";

export function getSiteContent(): SiteContent {
  const stored = localStorage.getItem(CONTENT_KEY);
  if (!stored) return defaultSiteContent;
  try { return JSON.parse(stored); } catch { return defaultSiteContent; }
}

export function saveSiteContent(data: SiteContent): void {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(data));
}

export function getContactInfo(): ContactInfo {
  const stored = localStorage.getItem(CONTACT_KEY);
  if (!stored) return defaultContactInfo;
  try { return JSON.parse(stored); } catch { return defaultContactInfo; }
}

export function saveContactInfo(data: ContactInfo): void {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(data));
}
