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

export type LocationMatchType = "base" | "regular" | "byArrangement";

export function getProfessionalLocationMatch(
  professional: {
    baseLocation: string;
    regularAreas?: string[];
    byArrangementAreas?: string[];
  },
  locationSlug?: string
): LocationMatchType | null {
  if (!locationSlug || locationSlug === "all") return null;
  const target = locationSlug.toLowerCase();
  if (professional.baseLocation.toLowerCase() === target) {
    return "base";
  }
  if ((professional.regularAreas ?? []).some((a) => a.toLowerCase() === target)) {
    return "regular";
  }
  if (
    (professional.byArrangementAreas ?? []).some((a) => a.toLowerCase() === target)
  ) {
    return "byArrangement";
  }
  return null;
}

export function getLocationMatchLabel(
  professional: {
    baseLocation: string;
    regularAreas?: string[];
    byArrangementAreas?: string[];
  },
  locationSlug?: string
): string | null {
  const match = getProfessionalLocationMatch(professional, locationSlug);
  if (!match || !locationSlug) return null;
  const areaLabel = getLocationLabel(locationSlug);
  switch (match) {
    case "base":
      return `Based in ${areaLabel}`;
    case "regular":
      return `Works in ${areaLabel} regularly`;
    case "byArrangement":
      return `Available in ${areaLabel} by arrangement`;
  }
}

