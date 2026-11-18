import type { ProfessionalProfileInput } from "@/lib/profile/schema";

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
