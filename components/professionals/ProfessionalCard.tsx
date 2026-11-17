import Link from "next/link";
import Image from "next/image";
import { Professional } from "@/types/professional";
import { ExploreProfessional } from "@/data/professionals";
import { SampleDataBadge } from "@/components/common/Badge";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { categoryMedia } from "@/lib/media";
import { CATEGORIES } from "@/data/categories";
import { getLocationLabel, getLocationMatchLabel } from "@/data/locations";

interface ProfessionalCardProps {
  professional: Professional | ExploreProfessional;
  previewMode?: boolean;
  filterLocation?: string;
  priority?: boolean;
}

export function ProfessionalCard({
  professional,
  previewMode = false,
  filterLocation,
  priority = false,
}: ProfessionalCardProps) {
  const {
    slug,
    displayName,
    primaryCategorySlug,
    baseLocation,
    regularAreas,
    byArrangementAreas,
    verification,
    isSample,
  } = professional;
  const whatsappNumber = "whatsappNumber" in professional ? professional.whatsappNumber : undefined;

  // All coverage areas beyond base
  const allOtherAreas = [
    ...(regularAreas ?? []),
    ...(byArrangementAreas ?? []),
  ].filter((a) => a !== baseLocation);
  const displayAreas = allOtherAreas
    .slice(0, 3)
    .map((a) => getLocationLabel(a))
    .join(", ");
  const extraCount = allOtherAreas.length - 3;

  // Category display name
  const categoryName =
    CATEGORIES.find((c) => c.slug === primaryCategorySlug)?.shortName ??
    primaryCategorySlug;

  // Category tone for placeholder
  const mediaTone = categoryMedia[primaryCategorySlug]?.tone ?? "slate";

  const firstPhotoSrc =
    ("firstPhotoSrc" in professional && professional.firstPhotoSrc)
      ? professional.firstPhotoSrc
      : ("avatar" in professional ? professional.avatar : undefined) ??
        ("workPhotos" in professional ? professional.workPhotos?.[0]?.src : undefined);

  const matchLine = filterLocation
    ? getLocationMatchLabel(professional, filterLocation)
    : null;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[3px] border border-border-subtle bg-warm-bone">
      {/* IMAGE AREA */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {firstPhotoSrc ? (
          <Image
            src={firstPhotoSrc}
            alt={displayName}
            fill
            priority={priority}
            unoptimized={firstPhotoSrc.startsWith("blob:") || previewMode}
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
          {previewMode ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-sand-dune/90 text-[10px] uppercase tracking-wider text-river-silt font-semibold border border-border-subtle shadow-xs">
              Preview
            </span>
          ) : (
            <>
              {isSample && <SampleDataBadge />}
              <VerificationBadge level={verification} />
            </>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-5 gap-1.5">
        <h3 className="font-serif text-2xl leading-snug text-deep-slate">
          {displayName}
        </h3>
        {matchLine ? (
          <>
            <p className="text-sm text-river-silt">{categoryName}</p>
            <p className="text-xs font-medium text-deep-slate">{matchLine}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-river-silt">
              {categoryName} · Based in {getLocationLabel(baseLocation)}
            </p>
            {allOtherAreas.length > 0 && (
              <p className="text-xs text-river-silt">
                Also serves: {displayAreas}
                {extraCount > 0 && ` +${extraCount} more`}
              </p>
            )}
          </>
        )}
      </div>

      {/* FOOTER ROW */}
      <div className="flex items-center justify-between border-t border-border-subtle px-5 py-3 min-h-[52px]">
        {previewMode ? (
          <div className="w-full flex items-center justify-between">
            <span className="text-xs text-river-silt">Profile card preview</span>
            <span
              role="presentation"
              aria-hidden="true"
              className="inline-flex items-center justify-center rounded-full bg-laterite-light text-laterite-dark border border-laterite/20 px-4 py-2 text-xs font-semibold pointer-events-none select-none min-h-[44px]"
            >
              WhatsApp
            </span>
          </div>
        ) : isSample ? (
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
                className="inline-flex items-center justify-center rounded-full bg-laterite-light text-laterite-dark border border-laterite/20 px-3.5 py-1.5 text-xs font-semibold cursor-not-allowed min-h-[36px]"
              >
                WhatsApp
              </span>
              <span className="text-[10px] text-river-silt mt-0.5">
                Sample profile: contact is disabled
              </span>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-end">
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi, I found your profile on Jokkoo. I'd like to enquire about your services.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-laterite px-4 text-xs font-semibold text-warm-bone transition-colors hover:bg-laterite/90 min-h-[44px]"
              >
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
