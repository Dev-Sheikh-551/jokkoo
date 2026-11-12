import { MapPin, Briefcase, Languages } from "lucide-react";
import { Professional } from "@/types/professional";
import { VerificationBadge, SampleDataBadge } from "@/components/common/Badge";

interface ProfileHeaderProps {
  professional: Professional;
}

export function ProfileHeader({ professional }: ProfileHeaderProps) {
  return (
    <div className="border-b border-border-subtle bg-warm-bone">
      {/* Cover placeholder */}
      <div className="relative h-48 sm:h-64 lg:h-72 w-full overflow-hidden bg-sand-dune border-b border-border-subtle">
        <div
          className="h-full w-full flex items-center justify-center"
          role="img"
          aria-label="Cover image placeholder"
        >
          <span className="text-xs font-medium text-river-silt/50 uppercase tracking-widest">
            Cover Photo
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-slate/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 sm:-mt-20 relative z-10">
          {/* Profile Avatar placeholder */}
          <div
            className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-[3px] border-4 border-warm-bone overflow-hidden bg-sand-dune shadow-md shrink-0 flex items-center justify-center"
            role="img"
            aria-label="Profile image placeholder"
          >
            <span className="text-[9px] font-medium text-river-silt/60 uppercase tracking-wide text-center leading-tight px-2">
              Profile Photo
            </span>
          </div>

          {/* Main Info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {professional.verification.isVerified && (
                <VerificationBadge showDisclaimer={false} />
              )}
              {professional.isSample && <SampleDataBadge />}
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-slate">
                {professional.name}
              </h1>
              {professional.businessName && (
                <span className="text-sm font-medium text-river-silt">
                  {professional.businessName}
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-laterite">
              {professional.profession}
            </p>

            {/* Quick Meta Stats */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-river-silt pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-laterite" />
                <span>Base: {professional.coverage.baseLocation}, The Gambia</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-river-silt" />
                <span>{professional.yearsExperience} Years Experience</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-river-silt" />
                <span>{professional.languages.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
