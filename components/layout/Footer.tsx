import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";

export function Footer() {
  const serviceAreas = GAMBIAN_LOCATIONS.filter((loc) => loc.id !== "all");

  return (
    <footer className="w-full bg-deep-slate text-warm-bone mt-auto">
      {/* Verification Policy Disclaimer */}
      <div className="border-b border-warm-bone/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs text-warm-bone/70 leading-relaxed max-w-3xl">
            Identity verified means an administrator has checked a person&apos;s ID. It is not a guarantee of workmanship or qualifications.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="[&_span]:text-warm-bone [&_svg]:text-warm-bone">
              <Logo />
            </div>
            <p className="text-sm text-warm-bone/70 max-w-sm leading-relaxed">
              Connecting households and businesses across The Gambia with independent skilled trade professionals.
            </p>
          </div>

          {/* Trades Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-bone mb-4">
              Trades
            </h3>
            <ul className="space-y-2.5 text-sm text-warm-bone/70">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/explore?category=${category.slug}`}
                    className="hover:text-warm-bone transition-colors"
                  >
                    {category.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-bone mb-4">
              Areas
            </h3>
            <ul className="space-y-2.5 text-sm text-warm-bone/70 max-h-60 overflow-y-auto pr-2">
              {serviceAreas.map((loc) => (
                <li key={loc.id}>
                  <Link
                    href={`/explore?location=${loc.id}`}
                    className="hover:text-warm-bone transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-bone mb-4">
              For professionals
            </h3>
            <ul className="space-y-2.5 text-sm text-warm-bone/70">
              <li>
                <Link
                  href="/join"
                  className="hover:text-warm-bone transition-colors"
                >
                  Join as a professional
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-warm-bone transition-colors"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-bone/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-bone/60">
          <p>© 2026 Jokkoo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>The Gambia</span>
            <span>Free to join</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
