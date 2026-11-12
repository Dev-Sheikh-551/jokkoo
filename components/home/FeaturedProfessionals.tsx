import { SAMPLE_PROFESSIONALS } from "@/data/professionals";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";

export function FeaturedProfessionals() {
  // Prefer real (non-sample) profiles; fall back to samples if none exist
  const realPros = SAMPLE_PROFESSIONALS.filter((p) => !p.isSample);
  const hasRealProfiles = realPros.length >= 3;
  const featured = hasRealProfiles
    ? realPros.slice(0, 3)
    : SAMPLE_PROFESSIONALS.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-sand-dune/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-deep-slate">
            Meet the people behind the work
          </h2>
          {!hasRealProfiles && (
            <p className="text-xs text-river-silt shrink-0 self-end sm:pb-1">
              Layout preview only. No real profiles yet.
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      </div>
    </section>
  );
}
