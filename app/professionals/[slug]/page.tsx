import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProfessionals } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { SHOW_MOCK } from "@/lib/mock";
import { PortfolioGallery } from "@/components/professionals/PortfolioGallery";
import { ProfileHeader } from "@/components/professionals/ProfileHeader";
import { ServicesList } from "@/components/professionals/ServicesList";
import { LocationCoverageCard } from "@/components/professionals/LocationCoverageCard";
import { ReviewSection } from "@/components/professionals/ReviewSection";
import { ContactActionCard } from "@/components/professionals/ContactActionCard";
import { MobileContactBar } from "@/components/professionals/MobileContactBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pros = getProfessionals();
  if (pros.length === 0) {
    // When no professionals exist (e.g. mock data removed in prod before real users exist),
    // Next.js with cacheComponents requires at least one static param fallback to validate prerendering.
    return [{ slug: "_empty" }];
  }
  return pros.map((pro) => ({
    slug: pro.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pro = getProfessionals().find((p) => p.slug === slug);

  if (!pro) {
    return {
      title: "Professional Not Found — Jokkoo",
    };
  }

  const primaryTrade =
    CATEGORIES.find((c) => c.slug === pro.primaryCategorySlug)?.shortName ??
    pro.primaryCategorySlug;

  const baseName =
    GAMBIAN_LOCATIONS.find((l) => l.id === pro.baseLocation)?.name ??
    pro.baseLocation;

  const title = `${pro.displayName}, ${primaryTrade} in ${baseName} | Jokkoo`;
  const description =
    pro.bio.length > 150 ? `${pro.bio.slice(0, 147)}...` : pro.bio;

  return {
    title,
    description,
    robots: pro.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function ProfessionalProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const professional = getProfessionals().find((p) => p.slug === slug);

  if (!professional) {
    notFound();
  }

  // If sample profile and mock mode is off, 404
  if (professional.isSample && !SHOW_MOCK) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate pb-24 lg:pb-16 [scroll-padding-bottom:5.5rem] lg:[scroll-padding-bottom:2rem]">
      <Header />

      <main className="flex-1">
        {/* Top Breadcrumb Navigation */}
        <div className="border-b border-border-subtle bg-warm-bone/80 px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs text-river-silt">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 hover:text-laterite transition-colors font-medium min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Explore</span>
            </Link>
          </div>
        </div>

        {/* Outer container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8 sm:space-y-10">
          {/* Gallery: full width on desktop */}
          <PortfolioGallery
            workPhotos={professional.workPhotos}
            displayName={professional.displayName}
          />

          {/* Desktop Two-column grid / Mobile sequential stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {/* Header block */}
              <ProfileHeader professional={professional} />

              {/* Bio section */}
              <section aria-labelledby="bio-heading" className="space-y-3 pt-2">
                <h2 id="bio-heading" className="sr-only">
                  About {professional.displayName}
                </h2>
                <p className="text-[17px] leading-[1.7] text-deep-slate/90 max-w-[640px]">
                  {professional.bio}
                </p>
              </section>

              {/* Services section */}
              <ServicesList services={professional.services} />

              {/* Location & Coverage section */}
              <LocationCoverageCard
                displayName={professional.displayName}
                baseLocation={professional.baseLocation}
                regularAreas={professional.regularAreas}
                byArrangementAreas={professional.byArrangementAreas}
              />

              {/* Working Hours (only if provided) */}
              {professional.workingHours && (
                <section
                  aria-labelledby="hours-heading"
                  className="space-y-2 pt-2"
                >
                  <h2
                    id="hours-heading"
                    className="font-serif font-medium text-2xl tracking-tight text-deep-slate"
                  >
                    Working hours
                  </h2>
                  <p className="text-sm text-river-silt leading-relaxed">
                    {professional.workingHours}
                  </p>
                </section>
              )}

              {/* Reviews section */}
              <ReviewSection displayName={professional.displayName} />

              {/* Disclaimer note */}
              <p className="text-xs text-river-silt pt-2 border-t border-border-subtle">
                Details on this profile are provided by the professional.
              </p>
            </div>

            {/* Desktop Sticky Sidebar (380px, top offset 24px) */}
            <div className="hidden lg:block lg:col-span-4 w-full">
              <ContactActionCard professional={professional} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Contact Bar */}
      <MobileContactBar professional={professional} />

      <Footer />
    </div>
  );
}
