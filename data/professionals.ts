import type { Professional } from "@/types/professional";
import { SHOW_MOCK } from "@/lib/mock";
import { MOCK_PROFESSIONALS } from "@/data/mock/professionals.mock";
import { getCompleteness } from "@/lib/profile/schema";

// Real published professionals (populated when users register)
const REAL_PROFESSIONALS: Professional[] = [];

export function getProfessionals(): Professional[] {
  const real = REAL_PROFESSIONALS.filter((p) => p.status === "published");
  if (SHOW_MOCK) {
    return [...real, ...MOCK_PROFESSIONALS];
  }
  return real;
}

export interface ExploreProfessional {
  slug: string;
  displayName: string;
  businessName?: string;
  categories: string[];
  primaryCategorySlug: string;
  baseLocation: string;
  regularAreas?: string[];
  byArrangementAreas?: string[];
  verification: Professional["verification"];
  isSample?: boolean;
  firstPhotoSrc?: string;
  whatsappNumber?: string;
  searchTerms: string[];
  completenessPercent: number;
  createdAt: string;
  joinedTimestamp: number;
}

export function getExploreProfessionals(): ExploreProfessional[] {
  return getProfessionals().map((p) => ({
    slug: p.slug,
    displayName: p.displayName,
    businessName: p.businessName,
    categories: p.categories,
    primaryCategorySlug: p.primaryCategorySlug,
    baseLocation: p.baseLocation,
    regularAreas: p.regularAreas,
    byArrangementAreas: p.byArrangementAreas,
    verification: p.verification,
    isSample: p.isSample,
    firstPhotoSrc: p.avatar ?? p.workPhotos?.[0]?.src,
    whatsappNumber: p.whatsappNumber,
    searchTerms: [
      p.displayName,
      p.businessName ?? "",
      p.bio,
      p.primaryCategorySlug,
      ...(p.services ?? []).map((s) => `${s.title} ${s.description ?? ""}`),
    ].filter(Boolean),
    completenessPercent: getCompleteness(p).percent,
    createdAt: p.createdAt,
    joinedTimestamp: new Date(p.createdAt).getTime() || 0,
  }));
}
