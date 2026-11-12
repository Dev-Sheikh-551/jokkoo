export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  durationEstimate?: string;
}

/**
 * Verification is a simple boolean flag.
 */
export interface VerificationStatus {
  isVerified: boolean;
  disclaimer: string;
}

export interface LocationCoverage {
  baseLocation: string;
  coverageAreas: string[];
  serviceRadiusNote: string;
}

export interface Review {
  id: string;
  author: string;
  clientType: "Homeowner" | "Business Owner" | "Diaspora Property Manager" | "Tenant";
  location: string;
  date: string;
  comment: string;
  serviceRendered: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  completedYear: string;
  tag: string;
}

export interface Professional {
  id: string;
  slug: string;
  name: string;
  businessName?: string;
  profession: string;
  categorySlug: string;
  yearsExperience: number;
  tagline: string;
  bio: string;
  verification: VerificationStatus;
  coverage: LocationCoverage;
  services: ServiceOffering[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  phone: string;
  whatsappNumber: string;
  languages: string[];
  isFeatured?: boolean;
  isSample: boolean;
}
