"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, Search, Info } from "lucide-react";
import { Professional } from "@/types/professional";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { ONBOARDING_LIVE } from "@/lib/onboarding";

interface OnboardingSuccessProps {
  draft: Professional;
}

export function OnboardingSuccess({ draft }: OnboardingSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-8">
      {/* Success banner if preview mode */}
      {!ONBOARDING_LIVE && (
        <div
          role="status"
          className="flex items-center gap-2 p-4 rounded-[var(--radius-control,0.75rem)] bg-sand-dune/80 border border-border-subtle text-sm text-deep-slate"
        >
          <Info className="h-5 w-5 shrink-0 text-laterite" aria-hidden="true" />
          <span className="font-medium">
            Preview only: nothing is saved or published yet.
          </span>
        </div>
      )}

      {/* Header Block */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-14 w-14 rounded-full bg-verified-soft text-verified items-center justify-center">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className="font-serif font-medium text-3xl sm:text-4xl text-deep-slate tracking-tight">
          Your profile is ready
        </h1>
        <p className="text-base text-river-silt max-w-lg mx-auto leading-relaxed">
          {ONBOARDING_LIVE
            ? "Your details have been registered. Customers will be able to discover your services and reach you directly on WhatsApp."
            : "Here is how your profile card looks to people searching for services in The Gambia."}
        </p>
      </div>

      {/* Card Preview */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block text-center">
          Profile Card Preview
        </span>
        <div className="max-w-md mx-auto">
          <ProfessionalCard professional={draft} previewMode />
        </div>
      </div>

      {/* Action Navigation */}
      <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/explore"
          className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors cursor-pointer"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Explore professionals</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-warm-bone px-6 py-2.5 text-sm font-semibold text-deep-slate hover:bg-sand-dune/60 transition-colors cursor-pointer"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>Go to homepage</span>
        </Link>
      </div>
    </div>
  );
}
