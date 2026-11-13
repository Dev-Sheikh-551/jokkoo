import Link from "next/link";
import { getProfessionals } from "@/data/professionals";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { Professional } from "@/types/professional";

export function FeaturedProfessionals() {
  const allPros = getProfessionals();

  // If no professionals exist, show empty state
  if (allPros.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-sand-dune/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-deep-slate">
            Meet the people behind the work
          </h2>
          <p className="text-sm text-river-silt max-w-sm mx-auto">
            Be one of the first professionals on Jokkoo.
          </p>
          <div>
            <Link
              href="/join"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite/90 transition-colors"
            >
              Join as a professional
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Pick up to 3 professionals with different primary categories
  const featured: Professional[] = [];
  const seenCategories = new Set<string>();

  for (const pro of allPros) {
    if (!seenCategories.has(pro.primaryCategorySlug)) {
      featured.push(pro);
      seenCategories.add(pro.primaryCategorySlug);
    }
    if (featured.length === 3) break;
  }

  // Fallback to fill up to 3 if fewer categories
  if (featured.length < 3) {
    for (const pro of allPros) {
      if (!featured.includes(pro) && featured.length < 3) {
        featured.push(pro);
      }
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-sand-dune/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-deep-slate">
            Meet the people behind the work
          </h2>
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
