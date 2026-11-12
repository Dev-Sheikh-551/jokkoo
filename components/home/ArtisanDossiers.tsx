import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, MapPin, ShieldCheck, Briefcase } from "lucide-react";
import { SAMPLE_PROFESSIONALS } from "@/data/professionals";

export function ArtisanDossiers() {
  const featured = SAMPLE_PROFESSIONALS.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="w-full border-b border-border-subtle bg-sand-dune/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-laterite font-semibold flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Verified Masters • Archival Dossiers</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-deep-slate">
              Master practitioners in context.
            </h2>
            <p className="text-sm text-river-silt max-w-2xl leading-relaxed">
              Every professional dossier documents their verified operational base, actual travel boundaries, confirmed years of trade practice, and transparent Dalasi pricing.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-laterite hover:text-laterite-dark transition-colors self-start md:self-auto border-b border-laterite pb-0.5"
          >
            <span>Explore All Master Dossiers</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Development Notice */}
        <div className="mb-8 p-3 rounded-[2px] bg-warm-bone border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between text-xs text-river-silt gap-2">
          <span className="font-mono text-[10px] uppercase text-deep-slate font-semibold">
            Demonstration Folio:
          </span>
          <span className="text-[11px]">
            The profiles below represent vetted trade archetypes for development review. Actual registered records will populate upon backend launch.
          </span>
        </div>

        {/* Master Dossiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((pro) => {
            const whatsappMessage = encodeURIComponent(
              `Hello ${pro.name}, I am reviewing your profile on Jokkoo and would like to discuss a project in The Gambia.`
            );
            const whatsappUrl = `https://wa.me/${pro.whatsappNumber}?text=${whatsappMessage}`;

            return (
              <div
                key={pro.id}
                className="flex flex-col justify-between rounded-[2px] border border-border-subtle bg-warm-bone p-6 hover:border-deep-slate/40 transition-all duration-200 space-y-6 shadow-xs"
              >
                <div className="space-y-4">
                  {/* Top Meta: Verification & Experience */}
                  <div className="flex items-center justify-between border-b border-border-subtle pb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-deep-slate font-medium">
                      <ShieldCheck className="h-4 w-4 text-laterite shrink-0" />
                      <span>Identity Verified</span>
                    </div>
                    <span className="font-mono text-[11px] text-river-silt">
                      {pro.yearsExperience} Yrs Bench
                    </span>
                  </div>

                  {/* Artisan Portrait & Name */}
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune">
                      <Image
                        src={pro.avatarUrl}
                        alt={pro.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/professionals/${pro.slug}`}
                        className="hover:text-laterite transition-colors inline-block"
                      >
                        <h3 className="text-base font-bold text-deep-slate leading-snug truncate">
                          {pro.name}
                        </h3>
                      </Link>
                      {pro.businessName && (
                        <p className="text-xs text-river-silt truncate">
                          {pro.businessName}
                        </p>
                      )}
                      <p className="text-xs font-semibold text-laterite mt-0.5">
                        {pro.profession}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-river-silt leading-relaxed line-clamp-2">
                    {pro.tagline}
                  </p>

                  {/* Territorial Coordinates */}
                  <div className="p-3 rounded-[2px] bg-sand-dune/40 border border-border-subtle space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-deep-slate">
                      <MapPin className="h-3.5 w-3.5 text-laterite shrink-0" />
                      <span>Workshop Base: {pro.coverage.baseLocation}</span>
                    </div>
                    <p className="text-[11px] text-river-silt pl-5 leading-tight line-clamp-1">
                      Coverage: {pro.coverage.coverageAreas.slice(0, 3).join(", ")}
                      {pro.coverage.coverageAreas.length > 3 ? " + more" : ""}
                    </p>
                  </div>

                  {/* Sample Service & Price Estimate */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-river-silt block">
                      Typical Labour Range:
                    </span>
                    <span className="font-mono font-bold text-deep-slate text-sm">
                      {pro.services[0]?.priceEstimate || "Rates upon inquiry"}
                    </span>
                  </div>
                </div>

                {/* Actions: Direct WhatsApp & Full Dossier */}
                <div className="pt-4 border-t border-border-subtle space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#1E7E34] hover:bg-[#155724] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Direct WhatsApp</span>
                  </a>

                  <Link
                    href={`/professionals/${pro.slug}`}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-[2px] border border-border-subtle bg-warm-bone hover:bg-sand-dune text-xs font-medium text-deep-slate transition-colors"
                  >
                    <span>Inspect Full Dossier</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
