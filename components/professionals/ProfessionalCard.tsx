import Link from "next/link";
import { Professional } from "@/types/professional";
import { SampleDataBadge } from "@/components/common/Badge";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { categoryMedia } from "@/lib/media";

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const { slug, name, profession, coverage, verification, isSample, categorySlug } = professional;

  // Coverage areas beyond base
  const otherAreas = coverage.coverageAreas.filter(
    (a) => a !== coverage.baseLocation
  );
  const displayAreas = otherAreas.slice(0, 3).join(", ");
  const extraCount = otherAreas.length - 3;

  // Category tone for placeholder
  const mediaTone = categoryMedia[categorySlug]?.tone ?? "slate";

  return (
    <div className="group flex flex-col overflow-hidden rounded-[3px] border border-border-subtle bg-warm-bone">
      {/* IMAGE AREA */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImagePlaceholder
          tone={mediaTone}
          label="Best work photo"
          className="h-full w-full"
        />
        {/* Top-left chip stack */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isSample && <SampleDataBadge />}
          <VerificationBadge level={verification} />
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-5 gap-1.5">
        <h3 className="font-serif text-2xl leading-snug text-deep-slate">
          {name}
        </h3>
        <p className="text-sm text-river-silt">
          {profession} · Based in {coverage.baseLocation}
        </p>
        {otherAreas.length > 0 && (
          <p className="text-xs text-river-silt">
            Also serves: {displayAreas}
            {extraCount > 0 && ` +${extraCount} more`}
          </p>
        )}
      </div>

      {/* FOOTER ROW */}
      <div className="flex items-center justify-end border-t border-border-subtle px-5 py-3 min-h-[52px]">
        {isSample ? (
          <Link
            href={`/professionals/${slug}`}
            className="text-xs font-medium text-laterite hover:underline underline-offset-2 transition-colors"
          >
            View sample profile
          </Link>
        ) : (
          /* Only rendered for real (non-sample) profiles */
          <a
            href={`https://wa.me/${professional.whatsappNumber}?text=${encodeURIComponent(`Hi, I found your profile on Jokkoo. I'd like to enquire about your services.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-laterite px-4 text-xs font-semibold text-warm-bone transition-colors hover:bg-laterite/90 min-h-[44px]"
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
