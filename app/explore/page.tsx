import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ExploreClient } from "@/components/explore/ExploreClient";
import { ExploreFallback } from "@/components/explore/ExploreFallback";

export const metadata: Metadata = {
  title: "Explore Professionals — Jokkoo The Gambia",
  description:
    "Browse skilled trade professionals, carpenters, electricians, tailors, and mechanics across The Gambia. Direct contact on WhatsApp.",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<ExploreFallback />}>
          <ExploreClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
