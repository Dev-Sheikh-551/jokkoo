import { Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedProfessionals } from "@/components/home/FeaturedProfessionals";
import { HowItWorks } from "@/components/home/HowItWorks";
import { JoinCtaSection } from "@/components/home/JoinCtaSection";

const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif-italic",
  weight: "variable",
  style: ["italic"],
  display: "swap",
  axes: ["opsz"],
  adjustFontFallback: true,
});

export default function HomePage() {
  return (
    <div className={`${newsreaderItalic.variable} min-h-screen flex flex-col bg-warm-bone text-deep-slate selection:bg-laterite-light selection:text-laterite`}>
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
