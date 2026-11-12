import { ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";
import { SearchExperience } from "@/components/home/SearchExperience";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-warm-bone py-16 sm:py-24 lg:py-28">
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EFE9DF_1px,transparent_1px),linear-gradient(to_bottom,#EFE9DF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {/* Cultural Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-sand-dune border border-border-subtle text-xs font-medium text-deep-slate">
            <span className="h-1.5 w-1.5 rounded-full bg-laterite" />
            <span>Inspired by Wolof <em>jokkoo</em> — mutual connection & trust</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-deep-slate leading-[1.1]">
            Connecting you with verified skilled trades in{" "}
            <span className="font-serif italic font-normal text-laterite">
              The Gambia.
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-river-silt max-w-2xl mx-auto leading-relaxed">
            Find vetted master carpenters, certified electricians, plumbers, tailors, and mechanics across Banjul, Serekunda, and the West Coast Region. Contact them directly on WhatsApp.
          </p>

          {/* Search Box */}
          <div className="pt-4 pb-2">
            <SearchExperience />
          </div>

          {/* Reassurance Proof Points */}
          <div className="pt-6 border-t border-border-subtle/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-river-silt text-left sm:text-center">
            <div className="flex items-center sm:justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-laterite shrink-0" />
              <span>Identity Verified Artisans</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-deep-slate shrink-0" />
              <span>Transparent Dalasi (GMD) Rates</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <PhoneCall className="h-4 w-4 text-laterite shrink-0" />
              <span>Direct WhatsApp & Call Contact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
