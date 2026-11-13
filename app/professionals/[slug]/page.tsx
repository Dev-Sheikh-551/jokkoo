import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProfessionals } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import { SHOW_MOCK } from "@/lib/mock";
import { ProfileHeader } from "@/components/professionals/ProfileHeader";
import { ContactActionCard } from "@/components/professionals/ContactActionCard";
import { LocationCoverageCard } from "@/components/professionals/LocationCoverageCard";
import { ServicesList } from "@/components/professionals/ServicesList";
import { PortfolioGallery } from "@/components/professionals/PortfolioGallery";
import { ReviewSection } from "@/components/professionals/ReviewSection";

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

  const categoryName =
    CATEGORIES.find((c) => c.slug === pro.primaryCategorySlug)?.name ??
    pro.primaryCategorySlug;

  return {
    title: `${pro.displayName} (${categoryName}) — Jokkoo The Gambia`,
    description: `${pro.bio.slice(0, 150)}... Based in ${pro.baseLocation}, The Gambia.`,
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
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-border-subtle bg-warm-bone/80 px-4 sm:px-6 lg:px-8 py-3">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs text-river-silt">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 hover:text-laterite transition-colors font-medium"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Explore</span>
            </Link>

            {professional.isSample && (
              <span className="text-[11px] font-mono text-river-silt/80">
                Sample profile
              </span>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <ProfileHeader professional={professional} />

        {/* Profile Content Body */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Bio / About Section */}
              <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-3">
                <h2 className="text-base font-bold text-deep-slate">
                  About {professional.displayName}
                </h2>
                <p className="text-sm text-river-silt leading-relaxed">
                  {professional.bio}
                </p>
                {professional.yearsExperience != null && (
                  <div className="pt-2 text-xs text-river-silt font-medium">
                    Operating in The Gambia for {professional.yearsExperience}+ years.
                  </div>
                )}
                {professional.workingHours && (
                  <div className="pt-1 text-xs text-river-silt">
                    <span className="font-semibold text-deep-slate">Hours: </span>
                    {professional.workingHours}
                  </div>
                )}
              </div>

              {/* Location & Coverage Section */}
              <LocationCoverageCard
                displayName={professional.displayName}
                baseLocation={professional.baseLocation}
                regularAreas={professional.regularAreas}
                byArrangementAreas={professional.byArrangementAreas}
              />

              {/* Services Offered Section */}
              <ServicesList services={professional.services} />

              {/* Work Photos Gallery */}
              <PortfolioGallery
                workPhotos={professional.workPhotos}
                isSample={professional.isSample}
              />

              {/* Reviews Section */}
              <ReviewSection reviews={[]} />
            </div>

            {/* Sticky Sidebar Action Column (4 cols) */}
            <div className="lg:col-span-4">
              <ContactActionCard professional={professional} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
