export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  priceEstimate: string;
  pricingType: "fixed" | "starting_at" | "hourly" | "quote";
  durationEstimate?: string;
}

export interface VerificationStatus {
  isVerified: boolean;
  verifiedDate: string;
  verificationType: "National ID & Proof of Address" | "Single Business Registration" | "Master Trade Guild Certification";
  badgeText: string;
  disclaimer: string;
}

export interface LocationCoverage {
  baseLocation: string; // e.g. "Brusubi", "Serekunda", "Bakau"
  coverageAreas: string[]; // Specific locations they will travel to
  serviceRadiusNote: string; // Explicit statement: "Does not travel outside Kombo North without prior arrangement"
}

export interface Review {
  id: string;
  author: string;
  clientType: "Homeowner" | "Business Owner" | "Diaspora Property Manager" | "Tenant";
  location: string;
  date: string;
  rating: number;
  comment: string;
  serviceRendered: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  completedYear: string;
  imageUrl: string;
  tag: string;
}

export interface Professional {
  id: string;
  slug: string;
  name: string;
  businessName?: string;
  profession: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  completedJobsCount: number;
  yearsExperience: number;
  avatarUrl: string;
  coverImageUrl?: string;
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
  availabilityStatus: "Available today" | "Available this week" | "By appointment only";
  isSampleData: true; // Explicitly treat as development sample data
}
