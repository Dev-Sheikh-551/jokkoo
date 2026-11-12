import Link from "next/link";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/common/Button";

export function JoinCtaSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-deep-slate text-warm-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-white/10 text-xs font-medium text-warm-bone">
              <ShieldCheck className="h-3.5 w-3.5 text-laterite" />
              <span>For Tradespeople & Registered Businesses</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-warm-bone leading-tight">
              Are you a skilled artisan or trade business in The Gambia?
            </h2>

            <p className="text-sm sm:text-base text-warm-bone/80 max-w-xl leading-relaxed">
              Jokkoo connects serious professionals with quality homeowners, commercial clients, and Gambian diaspora investors. No middleman deductions on your earnings.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-warm-bone/90">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-laterite shrink-0" />
                <span>Verified identity profile with your own portfolio gallery</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-laterite shrink-0" />
                <span>Clients contact you directly on your business WhatsApp and phone</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-laterite shrink-0" />
                <span>Clear coverage boundaries — specify the exact towns you serve</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/join" variant="primary" size="lg">
                <span>Apply to Join Jokkoo</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href="/join#requirements"
                className="text-xs font-medium text-warm-bone/80 hover:text-warm-bone underline underline-offset-4"
              >
                Review verification requirements
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[3px] space-y-4 text-xs text-warm-bone/80">
            <h3 className="text-sm font-semibold text-warm-bone uppercase tracking-wider">
              Verification Standards
            </h3>
            <p className="leading-relaxed">
              To protect both customers and craftsmen, every professional must pass our identity verification process before appearing in public search results.
            </p>
            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between py-1">
                <span className="text-warm-bone/60">Required Document:</span>
                <span className="font-medium text-warm-bone">Gambian National ID / Passport</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warm-bone/60">Operational Base:</span>
                <span className="font-medium text-warm-bone">Declared district & coverage area</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warm-bone/60">Listing Fee:</span>
                <span className="font-medium text-warm-bone">Free to join</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
