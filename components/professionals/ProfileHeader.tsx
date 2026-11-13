import { Professional } from "@/types/professional";
import { SampleDataBadge } from "@/components/common/Badge";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";

interface ProfileHeaderProps {
  professional: Professional;
}

export function ProfileHeader({ professional }: ProfileHeaderProps) {
  const categoryNames = professional.categories
    .map((slug) => CATEGORIES.find((c) => c.slug === slug)?.shortName ?? slug)
    .join(" · ");

  const baseLocationName =
    GAMBIAN_LOCATIONS.find((l) => l.id === professional.baseLocation)?.name ??
    professional.baseLocation;

  const hasSubtitle =
    professional.businessName &&
    professional.businessName.trim().toLowerCase() !==
      professional.displayName.trim().toLowerCase();

  const metaItems: string[] = [];
  if (professional.languages && professional.languages.length > 0) {
    metaItems.push(`Speaks ${professional.languages.join(", ")}`);
  }
  if (
    professional.yearsExperience != null &&
    professional.yearsExperience > 0
  ) {
    metaItems.push(`${professional.yearsExperience} years in the trade`);
  }

  return (
    <div className="space-y-4">
      {/* Chips row & Verification details */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {professional.isSample && <SampleDataBadge />}
          <VerificationBadge level={professional.verification} />
        </div>

        {professional.verification !== "none" && (
          <details className="text-xs text-river-silt cursor-pointer group">
            <summary className="hover:text-deep-slate underline underline-offset-2 select-none">
              What does this mean?
            </summary>
            <p className="mt-1.5 text-[11px] text-river-silt bg-sand-dune/40 p-2.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle max-w-md leading-relaxed">
              We confirmed this phone number belongs to the person who
              registered. It is not a check of identity, qualifications or
              workmanship.
            </p>
          </details>
        )}
      </div>

      {/* Main H1 Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-deep-slate">
          {professional.displayName}
        </h1>

        {hasSubtitle && (
          <p className="text-base sm:text-lg font-medium text-river-silt">
            {professional.businessName}
          </p>
        )}
      </div>

      {/* One line: categories & base location */}
      <p className="text-sm sm:text-base font-medium text-river-silt">
        {categoryNames} · Based in {baseLocationName}
      </p>

      {/* Optional languages and years in the trade */}
      {metaItems.length > 0 && (
        <p className="text-xs sm:text-sm text-river-silt/80 pt-0.5">
          {metaItems.join(" · ")}
        </p>
      )}
    </div>
  );
}
