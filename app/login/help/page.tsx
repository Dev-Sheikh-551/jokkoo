import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ONBOARDING_LIVE } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Password Help — Jokkoo",
  description: "Account help and password recovery assistance for Jokkoo.",
  robots: ONBOARDING_LIVE ? undefined : { index: false, follow: false },
};

export default function LoginHelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-12 sm:py-20 flex items-center justify-center px-4">
        <div className="w-full max-w-[440px] space-y-6">
          <div className="rounded-2xl border border-border-subtle bg-white p-6 sm:p-8 shadow-xs space-y-5 text-center">
            <h1 className="font-serif font-medium text-2xl sm:text-3xl text-deep-slate">
              Password recovery
            </h1>
            <p className="text-sm text-river-silt leading-relaxed">
              Account sign-in and password recovery will be available once customer accounts launch in The Gambia.
            </p>
            <p className="text-xs text-river-silt">
              You can browse and contact professionals directly on WhatsApp without an account.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-warm-bone px-5 py-2.5 text-sm font-semibold text-deep-slate hover:border-deep-slate/40 transition-colors w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to sign in</span>
              </Link>
              <Link
                href="/explore"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors shadow-xs w-full sm:w-auto"
              >
                Explore professionals
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
