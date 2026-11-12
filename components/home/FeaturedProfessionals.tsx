import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SAMPLE_PROFESSIONALS } from "@/data/professionals";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";

export function FeaturedProfessionals() {
  const featured = SAMPLE_PROFESSIONALS.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border-subtle bg-sand-dune/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-laterite">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Verified Artisans</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-slate mt-1">
              Featured Skilled Professionals
            </h2>
            <p className="text-sm text-river-silt mt-1.5 max-w-xl">
              Experienced tradespeople with verified Gambian identity checks, transparent pricing estimates, and real client feedback.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-laterite hover:text-laterite-dark transition-colors self-start md:self-auto"
          >
            <span>View All Professionals</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
