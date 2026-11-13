import { MapPin, Briefcase, Languages } from "lucide-react";
import { Professional } from "@/types/professional";
import { SampleDataBadge } from "@/components/common/Badge";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { CATEGORIES } from "@/data/categories";

interface ProfileHeaderProps {
  professional: Professional;
}

export function ProfileHeader({ professional }: ProfileHeaderProps) {
  const categoryName =
    CATEGORIES.find((c) => c.slug === professional.primaryCategorySlug)
      ?.name ?? professional.primaryCategorySlug;

  return (
    <div className="border-b border-border-subtle bg-warm-bone">
      {/* Cover placeholder */}
      <div className="relative h-48 sm:h-64 lg:h-72 w-full overflow-hidden border-b border-border-subtle">
        <ImagePlaceholder tone="sand" label="Cover Photo" className="border-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-slate/30 to-transparent pointer-events-none" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 sm:-mt-20 relative z-10">
          {/* Profile Avatar placeholder */}
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-[3px] border-4 border-warm-bone overflow-hidden shadow-md shrink-0">
            <ImagePlaceholder
              tone="clay"
              label="Profile Photo"
              className="rounded-[2px] border-none"
            />
          </div>

          {/* Main Info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <VerificationBadge level={professional.verification} />
              {professional.verification === "phone" && (
                <details className="text-xs text-river-silt cursor-pointer group">
                  <summary className="hover:text-deep-slate underline underline-offset-2">
                    What does this mean?
                  </summary>
                  <p className="mt-1.5 text-[11px] text-river-silt bg-sand-dune/40 p-2 rounded border border-border-subtle max-w-sm">
                    We confirmed this phone number belongs to the person who
                    registered. It is not a check of identity, qualifications or
                    workmanship.
                  </p>
                </details>
              )}
              {professional.isSample && <SampleDataBadge />}
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-slate">
                {professional.displayName}
              </h1>
              {professional.businessName && (
                <span className="text-sm font-medium text-river-silt">
                  {professional.businessName}
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-laterite">
              {categoryName}
            </p>

            {/* Quick Meta Stats */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-river-silt pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-laterite" />
                <span>Base: {professional.baseLocation}, The Gambia</span>
              </div>

              {professional.yearsExperience != null && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-river-silt" />
                  <span>{professional.yearsExperience} Years Experience</span>
                </div>
              )}

              {(professional.languages ?? []).length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4 text-river-silt" />
                  <span>{(professional.languages ?? []).join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
