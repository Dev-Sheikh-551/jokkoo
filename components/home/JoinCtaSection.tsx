import Link from "next/link";

export function JoinCtaSection() {
  return (
    <section className="bg-laterite text-warm-bone py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          <div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] tracking-tight leading-tight">
              Do good work? <span className="italic">Let people find you.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-6">
            <p className="text-base text-warm-bone/90 leading-relaxed max-w-xl">
              Build your profile from your phone in minutes. Add photos of your work, your area and your WhatsApp number. Free to join.
            </p>

            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-full bg-warm-bone px-8 py-3.5 text-sm font-semibold text-deep-slate transition-colors hover:bg-warm-bone/90 min-h-[44px]"
            >
              Start your profile
            </Link>

            <p className="text-xs text-warm-bone/70">
              We confirm your phone number before the Phone verified badge appears.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
