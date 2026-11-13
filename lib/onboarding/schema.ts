import { z } from "zod";
import { PROFILE_LIMITS } from "@/lib/profile/schema";

export const onboardingFormSchema = z
  .object({
    accountType: z.enum(["individual", "business"], {
      error: "Please choose whether you work alone or run a business",
    }),
    displayName: z
      .string()
      .min(PROFILE_LIMITS.displayName.min, "Please enter your name (at least 2 letters)")
      .max(PROFILE_LIMITS.displayName.max, "Name must be 60 characters or fewer"),
    businessName: z
      .string()
      .max(PROFILE_LIMITS.businessName.max, "Business name must be 60 characters or fewer")
      .optional()
      .or(z.literal("")),
    categories: z
      .array(z.string())
      .min(1, "Please choose your main trade")
      .max(3, "You can select up to 3 trades"),
    baseLocation: z.string().min(1, "Please choose the town or area where you are based"),
    regularAreas: z.array(z.string()).default([]),
    byArrangementAreas: z.array(z.string()).default([]),
    whatsappNumber: z
      .string()
      .regex(/^\+220\d{7}$/, "Enter a valid 7-digit Gambian phone number (+220XXXXXXX)"),
    callNumber: z
      .string()
      .regex(/^\+220\d{7}$/, "Enter a valid 7-digit Gambian phone number (+220XXXXXXX)")
      .optional()
      .or(z.literal("")),
    useSameNumberForCalls: z.boolean().default(true),
    bio: z
      .string()
      .min(PROFILE_LIMITS.bio.min, "Write at least 40 characters so customers know your experience")
      .max(PROFILE_LIMITS.bio.max, "Bio must be 500 characters or fewer"),
    services: z
      .array(
        z.object({
          title: z
            .string()
            .min(PROFILE_LIMITS.serviceTitle.min, "Enter what you do (at least 2 letters)")
            .max(PROFILE_LIMITS.serviceTitle.max, "Service name must be 60 characters or fewer"),
          description: z
            .string()
            .max(PROFILE_LIMITS.serviceDescription.max, "Description must be 140 characters or fewer")
            .optional()
            .or(z.literal("")),
        })
      )
      .min(1, "Add at least one service that you offer")
      .max(8, "You can add up to 8 services"),
    workPhotos: z
      .array(
        z.object({
          src: z.string(),
          caption: z
            .string()
            .max(PROFILE_LIMITS.workPhotoCaption.max, "Caption must be 80 characters or fewer")
            .optional()
            .or(z.literal("")),
        })
      )
      .min(1, "Add at least one photo showing work you have done")
      .max(8, "You can add up to 8 photos"),
    avatar: z.string().optional().or(z.literal("")),
    languages: z.array(z.string()).max(6).default([]),
    yearsExperience: z
      .union([z.number().int().min(0).max(60), z.nan(), z.literal("")])
      .optional()
      .transform((val) => (typeof val === "number" && !isNaN(val) ? val : undefined)),
    workingHours: z
      .string()
      .max(PROFILE_LIMITS.workingHours.max, "Working hours must be 80 characters or fewer")
      .optional()
      .or(z.literal("")),
    confirmsPhone: z.literal(true, {
      error: "You must confirm this phone number is yours",
    }),
  })
  .refine(
    (data) => {
      const reg = data.regularAreas ?? [];
      const byArr = data.byArrangementAreas ?? [];
      const overlap = reg.some((a) => byArr.includes(a));
      const baseInReg = reg.includes(data.baseLocation);
      const baseInByArr = byArr.includes(data.baseLocation);
      return !overlap && !baseInReg && !baseInByArr;
    },
    {
      message: "An area can only be picked once (base town, regular areas, or by arrangement)",
      path: ["regularAreas"],
    }
  );

export type OnboardingFormValues = z.input<typeof onboardingFormSchema>;
