import Link from "next/link";
import Image from "next/image";
import { Professional } from "@/types/professional";
import { SampleDataBadge } from "@/components/common/Badge";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { categoryMedia } from "@/lib/media";
import { CATEGORIES } from "@/data/categories";

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const {
    slug,
    displayName,
    primaryCategorySlug,
    baseLocation,
    regularAreas,
    byArrangementAreas,
    verification,
    isSample,
    avatar,
    workPhotos,
  } = professional;

  // All coverage areas beyond base
  const allOtherAreas = [
    ...(regularAreas ?? []),
    ...(byArrangementAreas ?? []),
  ].filter((a) => a !== baseLocation);
  const displayAreas = allOtherAreas.slice(0, 3).join(", ");
  const extraCount = allOtherAreas.length - 3;

  // Category display name
  const categoryName =
    CATEGORIES.find((c) => c.slug === primaryCategorySlug)?.shortName ??
    primaryCategorySlug;

  // Category tone for placeholder
  const mediaTone = categoryMedia[primaryCategorySlug]?.tone ?? "slate";

  const firstPhotoSrc = avatar ?? workPhotos?.[0]?.src;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[3px] border border-border-subtle bg-warm-bone">
      {/* IMAGE AREA */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {firstPhotoSrc ? (
          <Image
            src={firstPhotoSrc}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 100vw"
            quality={75}
          />
        ) : (
          <ImagePlaceholder
            tone={mediaTone}
            label="Best work photo"
            className="h-full w-full"
          />
        )}
        {/* Top-left chip stack */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {isSample && <SampleDataBadge />}
          <VerificationBadge level={verification} />
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-5 gap-1.5">
        <h3 className="font-serif text-2xl leading-snug text-deep-slate">
          {displayName}
        </h3>
        <p className="text-sm text-river-silt">
          {categoryName} · Based in {baseLocation}
        </p>
        {allOtherAreas.length > 0 && (
          <p className="text-xs text-river-silt">
            Also serves: {displayAreas}
            {extraCount > 0 && ` +${extraCount} more`}
          </p>
        )}
      </div>

      {/* FOOTER ROW */}
      <div className="flex items-center justify-between border-t border-border-subtle px-5 py-3 min-h-[52px]">
        {isSample ? (
          <>
            <Link
              href={`/professionals/${slug}`}
              className="text-xs font-medium text-laterite hover:underline underline-offset-2 transition-colors"
            >
              View sample profile
            </Link>
            <div className="flex flex-col items-end">
              <span
                role="button"
                aria-disabled="true"
                className="inline-flex items-center justify-center rounded-full bg-laterite/40 px-3.5 py-1.5 text-xs font-semibold text-warm-bone/60 cursor-not-allowed min-h-[36px]"
              >
                WhatsApp
              </span>
              <span className="text-[10px] text-river-silt/80 mt-0.5">
                Sample profile: contact is disabled
              </span>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-end">
            <a
              href={`https://wa.me/${professional.whatsappNumber}?text=${encodeURIComponent(
                `Hi, I found your profile on Jokkoo. I'd like to enquire about your services.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-laterite px-4 text-xs font-semibold text-warm-bone transition-colors hover:bg-laterite/90 min-h-[44px]"
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
