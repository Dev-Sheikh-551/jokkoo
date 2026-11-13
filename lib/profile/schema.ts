import { z } from "zod";

const LOCATION_SLUGS = [
  "brusubi",
  "serekunda",
  "fajara",
  "bakau",
  "senegambia-kololi",
  "bijilo",
  "kotu",
  "sukuta",
  "banjul",
  "brikama",
  "kanifing",
  "yundum-lamin",
  "kerr-sering",
] as const;

const CATEGORY_SLUGS = [
  "electrical-work",
  "plumbing",
  "carpentry",
  "mechanics",
  "tailoring",
  "painting",
  "cleaning",
  "photography",
  "computer-repairs",
] as const;

const LANGUAGE_OPTIONS = [
  "English",
  "Wolof",
  "Mandinka",
  "Fula",
  "Jola",
  "Serahule",
] as const;

export const PROFILE_LIMITS = {
  displayName: { min: 2, max: 60 },
  businessName: { min: 2, max: 60 },
  bio: { min: 40, max: 500 },
  serviceTitle: { min: 2, max: 60 },
  serviceDescription: { max: 140 },
  workPhotoCaption: { max: 80 },
  workingHours: { max: 80 },
  services: { min: 1, max: 8 },
  workPhotos: { min: 1, max: 8 },
  languages: { max: 6 },
  yearsExperience: { min: 0, max: 60 },
  categories: { min: 1, max: 3 },
} as const;

// Gambian phone: +220 followed by 7 digits
const gambianPhoneRegex = /^\+220\d{7}$/;

export const professionalProfileInputSchema = z
  .object({
    accountType: z.enum(["individual", "business"]),
    displayName: z.string().min(2).max(60),
    businessName: z.string().min(2).max(60).optional(),
    categories: z.array(z.enum(CATEGORY_SLUGS)).min(1).max(3),
    baseLocation: z.enum(LOCATION_SLUGS),
    regularAreas: z.array(z.enum(LOCATION_SLUGS)).optional().default([]),
    byArrangementAreas: z.array(z.enum(LOCATION_SLUGS)).optional().default([]),
    whatsappNumber: z
      .string()
      .regex(gambianPhoneRegex, "Must be +220 followed by 7 digits"),
    callNumber: z.string().regex(gambianPhoneRegex).optional(),
    bio: z.string().min(40).max(500),
    services: z
      .array(
        z.object({
          title: z.string().min(2).max(60),
          description: z.string().max(140).optional(),
        })
      )
      .min(1)
      .max(8),
    workPhotos: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string().max(80).optional(),
        })
      )
      .min(1)
      .max(8),
    avatar: z.string().optional(),
    languages: z.array(z.enum(LANGUAGE_OPTIONS)).max(6).optional().default([]),
    yearsExperience: z.number().int().min(0).max(60).optional(),
    workingHours: z.string().max(80).optional(),
    confirmsPhone: z.literal(true),
  })
  .refine(
    (d) => {
      // regularAreas and byArrangementAreas must not overlap each other or baseLocation
      const reg = d.regularAreas ?? [];
      const byArr = d.byArrangementAreas ?? [];
      const overlap = reg.some((a) => byArr.includes(a));
      const baseInReg = reg.includes(d.baseLocation);
      const baseInByArr = byArr.includes(d.baseLocation);
      return !overlap && !baseInReg && !baseInByArr;
    },
    {
      message:
        "regularAreas and byArrangementAreas must not overlap each other or baseLocation",
    }
  );

export type ProfessionalProfileInput = z.infer<
  typeof professionalProfileInputSchema
>;

export function isPublishable(
  profile: Partial<ProfessionalProfileInput>
): boolean {
  const result = professionalProfileInputSchema.safeParse(profile);
  return result.success;
}

export function getCompleteness(profile: Partial<ProfessionalProfileInput>): {
  percent: number;
  missing: string[];
} {
  const missing: string[] = [];
  if (!profile.accountType) missing.push("accountType");
  if (!profile.displayName || profile.displayName.length < 2)
    missing.push("displayName");
  if (!profile.categories || profile.categories.length === 0)
    missing.push("categories");
  if (!profile.baseLocation) missing.push("baseLocation");
  if (
    !profile.whatsappNumber ||
    !/^\+220\d{7}$/.test(profile.whatsappNumber)
  )
    missing.push("whatsappNumber");
  if (!profile.bio || profile.bio.length < 40) missing.push("bio");
  if (!profile.services || profile.services.length === 0)
    missing.push("services");
  if (!profile.workPhotos || profile.workPhotos.length === 0)
    missing.push("workPhotos");
  if (!profile.confirmsPhone) missing.push("confirmsPhone");
  const total = 9; // required fields count
  const percent = Math.round(((total - missing.length) / total) * 100);
  return { percent, missing };
}
