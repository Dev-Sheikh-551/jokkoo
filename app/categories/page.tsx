import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES } from "@/data/categories";
import { CategoryIcon } from "@/components/common/CategoryIcon";

export const metadata: Metadata = {
  title: "Service Categories — Jokkoo The Gambia",
  description:
    "Explore trade service categories on Jokkoo: Electrical, Plumbing, Carpentry, Tailoring, Automotive, Painting, Cleaning, Photography, and Computer Repairs.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12 border-b border-border-subtle pb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
              Directory Classification
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-deep-slate mt-1.5">
              Service Categories &amp; Trades
            </h1>
            <p className="text-base text-river-silt mt-3 leading-relaxed">
              Every category on Jokkoo represents a trade practice in The Gambia. Browse specific skillsets, common service requests, and experienced professionals serving your area.
            </p>
          </div>

          {/* Detailed Categories List */}
          <div className="space-y-6">
            {CATEGORIES.map((category) => (
              <div
                key={category.slug}
                className="group p-6 sm:p-8 rounded-[3px] border border-border-subtle bg-warm-bone hover:border-deep-slate/40 hover:bg-sand-dune/20 transition-all duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Icon + Category Info */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 flex items-center justify-center rounded-[2px] bg-sand-dune border border-border-subtle text-deep-slate group-hover:bg-laterite group-hover:text-white transition-colors">
                        <CategoryIcon
                          name={category.iconName}
                          className="h-6 w-6"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-deep-slate group-hover:text-laterite transition-colors">
                          {category.name}
                        </h2>
                        <span className="text-xs text-river-silt font-medium">
                          {category.tagline}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-river-silt leading-relaxed">
                      {category.fullDescription}
                    </p>
                  </div>

                  {/* Middle Column: Common Services */}
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-border-subtle pt-4 lg:pt-0 lg:pl-6 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-deep-slate block mb-2">
                      Common Services &amp; Specializations
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-river-silt">
                      {category.popularServices.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-laterite font-bold">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: CTA */}
                  <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 gap-3">
                    <Link
                      href={`/explore?category=${category.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[2px] bg-deep-slate hover:bg-laterite text-warm-bone text-xs font-medium transition-colors w-full justify-center"
                    >
                      <span>Explore Pros</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
