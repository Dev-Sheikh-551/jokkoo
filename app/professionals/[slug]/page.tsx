import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, ShieldAlert } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SAMPLE_PROFESSIONALS } from "@/data/professionals";
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
  return SAMPLE_PROFESSIONALS.map((pro) => ({
    slug: pro.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pro = SAMPLE_PROFESSIONALS.find((p) => p.slug === slug);

  if (!pro) {
    return {
      title: "Professional Not Found — Jokkoo",
    };
  }

  return {
    title: `${pro.name} (${pro.profession}) — Jokkoo The Gambia`,
    description: `${pro.tagline} Based in ${pro.coverage.baseLocation}, The Gambia. Direct contact and verified credentials.`,
  };
}

export default async function ProfessionalProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const professional = SAMPLE_PROFESSIONALS.find((p) => p.slug === slug);

  if (!professional) {
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

            <span className="text-[11px] font-mono text-river-silt/80">
              Verified Profile ID: {professional.id}
            </span>
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
                  About {professional.name}
                </h2>
                <p className="text-sm text-river-silt leading-relaxed">
                  {professional.bio}
                </p>
                <div className="pt-2 text-xs text-river-silt font-medium">
                  Operating in The Gambia since {2026 - professional.yearsExperience} • {professional.completedJobsCount}+ documented completed jobs.
                </div>
              </div>

              {/* Location & Coverage Section */}
              <LocationCoverageCard coverage={professional.coverage} />

              {/* Services Offered Section */}
              <ServicesList services={professional.services} />

              {/* Portfolio Showcase */}
              <PortfolioGallery portfolio={professional.portfolio} />

              {/* Reviews Section */}
              <ReviewSection
                reviews={professional.reviews}
                rating={professional.rating}
                reviewCount={professional.reviewCount}
              />
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
