import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Search } from "lucide-react";

export default function ProfessionalNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full bg-sand-dune text-laterite">
            <Search className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-deep-slate">
              Profile Not Found
            </h1>
            <p className="text-sm text-river-silt leading-relaxed">
              The professional profile you are looking for does not exist or may have been unlisted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite/90 transition-colors"
            >
              Browse all professionals
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-border-subtle bg-white px-5 py-2.5 text-sm font-medium text-deep-slate hover:bg-sand-dune/40 transition-colors gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
