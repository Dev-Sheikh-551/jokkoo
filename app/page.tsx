import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedProfessionals } from "@/components/home/FeaturedProfessionals";
import { HowItWorks } from "@/components/home/HowItWorks";
import { JoinCtaSection } from "@/components/home/JoinCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate selection:bg-laterite-light selection:text-laterite">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularCategories />
        <FeaturedProfessionals />
        <HowItWorks />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
