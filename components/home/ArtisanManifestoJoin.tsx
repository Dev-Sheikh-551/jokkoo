import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/common/Button";

export function ArtisanManifestoJoin() {
  return (
    <section className="w-full bg-deep-slate text-warm-bone py-16 sm:py-20 lg:py-24 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: The Manifesto (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/10 text-xs font-mono tracking-wider uppercase text-warm-bone border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-laterite" />
              <span>Guild Manifesto • Professional Induction</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-warm-bone leading-[1.05]">
              An invitation to Gambian master artisans.
            </h2>

            <p className="text-sm sm:text-base text-warm-bone/80 leading-relaxed max-w-2xl">
              We do not demand corporate bureaucracy or formal degrees to recognise practical mastery. If you take unhurried pride in your joinery, electrical wiring, tailoring, or mechanics—Jokkoo offers a dignified platform without middleman deductions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-warm-bone/90">
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <span>Dedicated photographic portfolio dossier for your work</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <span>Clients contact you directly on WhatsApp and phone</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <span>Clear travel limits—you define the towns you serve</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <span>Zero percentage commissions on your agreed earnings</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/join" variant="primary" size="lg" className="gap-2">
                <span>Submit Trade Practice for Verification</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              <Link
                href="/join#verification"
                className="text-xs font-mono uppercase tracking-wider text-warm-bone/70 hover:text-warm-bone underline underline-offset-4"
              >
                Review Identity Protocol
              </Link>
            </div>
          </div>

          {/* Right Column: Verification Criteria Ledger (5 Cols) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[2px] space-y-4 text-xs text-warm-bone/80 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-warm-bone uppercase tracking-wider">
                Induction Protocol
              </span>
              <ShieldCheck className="h-4 w-4 text-laterite" />
            </div>

            <p className="text-[11px] leading-relaxed font-sans text-warm-bone/75">
              To preserve trust for both homeowners and craftsmen, every artisan listed in the Jokkoo Monograph undergoes manual identity verification.
            </p>

            <div className="space-y-3 pt-2">
              <div className="border-t border-white/10 pt-2.5 flex justify-between">
                <span className="text-warm-bone/60">01 / Identity Document:</span>
                <span className="font-semibold text-warm-bone">National ID / Passport</span>
              </div>
              <div className="border-t border-white/10 pt-2.5 flex justify-between">
                <span className="text-warm-bone/60">02 / Workshop Base:</span>
                <span className="font-semibold text-warm-bone">Verified District in The Gambia</span>
              </div>
              <div className="border-t border-white/10 pt-2.5 flex justify-between">
                <span className="text-warm-bone/60">03 / Platform Cut:</span>
                <span className="font-semibold text-laterite">0% Booking Commission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
