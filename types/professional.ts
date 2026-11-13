import type { ProfessionalProfileInput } from "@/lib/profile/schema";

export type VerificationLevel = "none" | "phone" | "identity";

export interface Review {
  id: string;
  author: string;
  date: string;
  comment: string;
  serviceRendered: string;
}

export interface Professional extends ProfessionalProfileInput {
  id: string;
  slug: string;
  /** primary category slug = categories[0] */
  primaryCategorySlug: string;
  verification: VerificationLevel;
  status: "draft" | "published" | "suspended";
  createdAt: string; // ISO date string
  isSample: boolean;
}
