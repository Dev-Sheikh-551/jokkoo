import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES } from "@/data/categories";
import { categoryMedia } from "@/lib/media";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Browse by Kind of Work — Jokkoo The Gambia",
  description:
    "Explore trade service categories on Jokkoo: Electrical, Plumbing, Carpentry, Tailoring, Automotive, Painting, Cleaning, Photography, and Computer Repairs.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="max-w-3xl border-b border-border-subtle pb-6 mb-8 space-y-2">
            <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-deep-slate">
              Browse by kind of work
            </h1>
            <p className="text-base text-river-silt leading-relaxed">
              Find skilled trade professionals and workshops across The Gambia by service category.
            </p>
          </div>

          {/* Grid of Category Cards (1 / 2 / 3 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CATEGORIES.map((category) => {
              const media = categoryMedia[category.slug];
              const popularServices = (category.popularServices ?? []).slice(0, 4);

              return (
                <div
                  key={category.slug}
                  className="group flex flex-col overflow-hidden rounded-[3px] border border-border-subtle bg-white hover:border-deep-slate/40 transition-colors shadow-2xs"
                >
                  {/* Category Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-dune">
                    {media?.src ? (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        quality={75}
                        style={{ objectPosition: media.objectPosition || "center" }}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder
                        tone={media?.tone || "slate"}
                        label={category.shortName}
                        className="h-full w-full"
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6 space-y-4">
                    <div>
                      <h2 className="font-serif font-medium text-2xl text-deep-slate group-hover:text-laterite transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-sm text-river-silt mt-1">
                        {category.tagline}
                      </p>
                    </div>

                    {/* Up to 4 example services as small text chips */}
                    {popularServices.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {popularServices.map((service) => (
                          <span
                            key={service}
                            className="inline-flex items-center rounded-full bg-sand-dune/60 px-2.5 py-1 text-xs text-river-silt font-medium border border-border-subtle/60"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action link */}
                    <div className="pt-2 mt-auto">
                      <Link
                        href={`/explore?category=${category.slug}`}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors shadow-xs w-full sm:w-auto"
                      >
                        <span>See professionals</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
