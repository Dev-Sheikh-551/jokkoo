import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found — Jokkoo",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-16 sm:py-24 flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
            404 Error
          </span>
          <h1 className="font-serif font-medium text-3xl sm:text-4xl text-deep-slate tracking-tight">
            Page not found
          </h1>
          <p className="text-base text-river-silt leading-relaxed max-w-md mx-auto">
            We couldn&apos;t find the page you were looking for. It may have moved or no longer exists.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-6 py-2.5 text-sm font-semibold text-deep-slate hover:border-deep-slate/40 transition-colors shadow-xs w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
            <Link
              href="/explore"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors shadow-xs w-full sm:w-auto"
            >
              <Search className="h-4 w-4" />
              <span>Explore professionals</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
