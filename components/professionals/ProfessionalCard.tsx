import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Briefcase, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { Professional } from "@/types/professional";
import { VerificationBadge, SampleDataBadge } from "@/components/common/Badge";

interface ProfessionalCardProps {
  professional: Professional;
  featured?: boolean;
}

export function ProfessionalCard({ professional, featured = false }: ProfessionalCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-[3px] border border-border-subtle bg-warm-bone transition-all duration-200 hover:border-deep-slate/40 hover:bg-sand-dune/20">
      <div className="p-5">
        {/* Top Meta: Verification and Sample tag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <VerificationBadge />
          <SampleDataBadge />
        </div>

        {/* Profile Header */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune">
            <Image
              src={professional.avatarUrl}
              alt={professional.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <Link
              href={`/professionals/${professional.slug}`}
              className="group-hover:text-laterite transition-colors inline-block"
            >
              <h3 className="text-base font-semibold text-deep-slate leading-snug truncate">
                {professional.name}
              </h3>
            </Link>
            {professional.businessName && (
              <p className="text-xs text-river-silt truncate">
                {professional.businessName}
              </p>
            )}
            <p className="text-xs font-medium text-deep-slate/80 mt-0.5">
              {professional.profession}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-river-silt line-clamp-2 mb-4 leading-relaxed">
          {professional.tagline}
        </p>

        {/* Rating and Experience Stats */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-border-subtle text-center text-xs mb-4">
          <div>
            <span className="flex items-center justify-center gap-1 font-semibold text-deep-slate">
              <Star className="h-3.5 w-3.5 fill-[#C29B38] text-[#C29B38]" />
              {professional.rating.toFixed(2)}
            </span>
            <span className="text-[10px] text-river-silt block mt-0.5">
              {professional.reviewCount} reviews
            </span>
          </div>

          <div>
            <span className="font-semibold text-deep-slate">
              {professional.yearsExperience} yrs
            </span>
            <span className="text-[10px] text-river-silt block mt-0.5">
              Experience
            </span>
          </div>

          <div>
            <span className="font-semibold text-deep-slate">
              {professional.completedJobsCount}+
            </span>
            <span className="text-[10px] text-river-silt block mt-0.5">
              Jobs completed
            </span>
          </div>
        </div>

        {/* Location & Coverage Notice */}
        <div className="space-y-1.5 text-xs text-river-silt">
          <div className="flex items-center gap-1.5 text-deep-slate font-medium">
            <MapPin className="h-3.5 w-3.5 text-laterite shrink-0" />
            <span>Based in {professional.coverage.baseLocation}</span>
          </div>
          <p className="text-[11px] text-river-silt pl-5 leading-tight line-clamp-1">
            Coverage: {professional.coverage.coverageAreas.slice(0, 3).join(", ")}
            {professional.coverage.coverageAreas.length > 3 ? " + more" : ""}
          </p>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="flex items-center justify-between border-t border-border-subtle bg-sand-dune/30 px-5 py-3 text-xs">
        <span className="text-river-silt">
          {professional.services[0]?.priceEstimate ? (
            <>
              Est: <strong className="text-deep-slate font-medium">{professional.services[0].priceEstimate.split(" ")[0]} {professional.services[0].priceEstimate.split(" ")[1]}</strong>
            </>
          ) : (
            <span>Verified Rates</span>
          )}
        </span>

        <Link
          href={`/professionals/${professional.slug}`}
          className="inline-flex items-center gap-1 font-medium text-laterite hover:text-laterite-dark group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
