export interface LocationItem {
  id: string;
  name: string;
  region: string;
  isPopular?: boolean;
}

export const GAMBIAN_LOCATIONS: LocationItem[] = [
  { id: "all", name: "All Locations (The Gambia)", region: "National" },
  { id: "brusubi", name: "Brusubi", region: "West Coast Region", isPopular: true },
  { id: "serekunda", name: "Serekunda", region: "Kanifing Municipality", isPopular: true },
  { id: "fajara", name: "Fajara", region: "Kanifing Municipality", isPopular: true },
  { id: "bakau", name: "Bakau", region: "Kanifing Municipality", isPopular: true },
  { id: "senegambia-kololi", name: "Senegambia / Kololi", region: "Kanifing Municipality", isPopular: true },
  { id: "bijilo", name: "Bijilo", region: "West Coast Region", isPopular: true },
  { id: "kotu", name: "Kotu", region: "Kanifing Municipality" },
  { id: "sukuta", name: "Sukuta", region: "West Coast Region" },
  { id: "banjul", name: "Banjul (City)", region: "Greater Banjul Area" },
  { id: "brikama", name: "Brikama", region: "West Coast Region" },
  { id: "kanifing", name: "Kanifing Industrial", region: "Kanifing Municipality" },
  { id: "yundum-lamin", name: "Yundum / Lamin", region: "West Coast Region" },
  { id: "kerr-sering", name: "Kerr Sering", region: "West Coast Region" },
];

export function getLocationLabel(slug?: string): string {
  if (!slug) return "";
  const found = GAMBIAN_LOCATIONS.find((loc) => loc.id === slug);
  if (found) return found.name;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
