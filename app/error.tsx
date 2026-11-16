"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RotateCcw, Home, Search } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to client console or monitoring service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-16 sm:py-24 flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
            Notice
          </span>
          <h1 className="font-serif font-medium text-3xl sm:text-4xl text-deep-slate tracking-tight">
            Something went wrong
          </h1>
          <p className="text-base text-river-silt leading-relaxed max-w-md mx-auto">
            We encountered an unexpected error while loading this page. Please try again.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try again</span>
            </button>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-5 py-2.5 text-sm font-semibold text-deep-slate hover:border-deep-slate/40 transition-colors shadow-xs w-full sm:w-auto"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-5 py-2.5 text-sm font-semibold text-deep-slate hover:border-deep-slate/40 transition-colors shadow-xs w-full sm:w-auto"
            >
              <Search className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
