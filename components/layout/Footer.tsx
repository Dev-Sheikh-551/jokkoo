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
            Phone verified means we confirmed the number belongs to the person who registered. It is not a check of identity, qualifications or workmanship.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* TODO: Replace Warm Bone container with a light logo variant when one is supplied */}
            <div className="inline-block bg-warm-bone rounded-[var(--radius-control)] px-3 py-2">
              <Logo size="footer" />
            </div>
            <p className="text-sm text-warm-bone/70 max-w-sm leading-relaxed">
              Connecting households and businesses across The Gambia with independent skilled professionals.
            </p>
          </div>

          {/* Kinds of work Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-bone mb-4">
              Kinds of work
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
            <ul className="space-y-2.5 text-sm text-warm-bone/70">
              {serviceAreas.slice(0, 6).map((loc) => (
                <li key={loc.id}>
                  <Link
                    href={`/explore?location=${loc.id}`}
                    className="hover:text-warm-bone transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-1 text-xs font-medium text-warm-bone underline underline-offset-4 hover:text-laterite transition-colors pt-1"
                >
                  All areas →
                </Link>
              </li>
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
