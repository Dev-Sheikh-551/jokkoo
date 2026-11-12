import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { CategoryIcon } from "@/components/common/CategoryIcon";

export function PopularCategories() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border-subtle bg-warm-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
              Specialist Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-slate mt-1">
              Popular Service Categories
            </h2>
            <p className="text-sm text-river-silt mt-1.5 max-w-xl">
              From plumbing repairs to tailoring, find trade specialists across The Gambia.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-laterite hover:text-laterite-dark transition-colors self-start md:self-auto"
          >
            <span>Explore All 9 Categories</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories Grid - 3 columns for 9 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/explore?category=${category.slug}`}
              className="group p-5 rounded-[3px] border border-border-subtle bg-warm-bone transition-all duration-200 hover:border-deep-slate/40 hover:bg-sand-dune/40 flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 flex items-center justify-center rounded-[2px] bg-sand-dune border border-border-subtle text-deep-slate group-hover:bg-laterite group-hover:text-white transition-colors mb-4">
                  <CategoryIcon name={category.iconName} className="h-5 w-5" />
                </div>

                <h3 className="text-base font-semibold text-deep-slate group-hover:text-laterite transition-colors">
                  {category.name}
                </h3>

                <p className="text-xs text-river-silt mt-2 line-clamp-2 leading-relaxed">
                  {category.shortDescription}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-xs text-river-silt">
                <span className="text-[11px] font-medium text-river-silt/80">
                  {category.tagline}
                </span>
                <span className="font-medium text-deep-slate group-hover:translate-x-1 transition-transform">
                  Browse →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
