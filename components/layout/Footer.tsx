import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-sand-dune/40 mt-auto">
      {/* Verification & Trust Disclaimer Banner */}
      <div className="border-b border-border-subtle bg-sand-dune/60 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-river-silt">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-laterite shrink-0" />
            <span>
              <strong>Verification Policy:</strong> Jokkoo verifies government-issued identity documents and operational location of listed professionals. Verification does not guarantee workmanship or warranty services.
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-river-silt max-w-sm leading-relaxed">
              Inspired by the Wolof principle of <em>jokkoo</em> — bringing people together in mutual connection and trust. Connecting Gambian households and businesses with verified, independent trade professionals.
            </p>
            <div className="pt-2 text-xs text-river-silt">
              <span className="font-semibold text-deep-slate">Initial Service Territory:</span> Greater Banjul Area, Kanifing Municipality, and West Coast Region, The Gambia.
            </div>
          </div>

          {/* Trade Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-deep-slate mb-4">
              Featured Trades
            </h3>
            <ul className="space-y-2.5 text-sm text-river-silt">
              {CATEGORIES.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/explore?category=${category.slug}`}
                    className="hover:text-laterite transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="font-medium text-laterite hover:underline inline-block pt-1 text-xs"
                >
                  View All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-deep-slate mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2.5 text-sm text-river-silt">
              <li>
                <Link href="/explore?location=brusubi" className="hover:text-laterite transition-colors">
                  Brusubi & Bijilo
                </Link>
              </li>
              <li>
                <Link href="/explore?location=serekunda" className="hover:text-laterite transition-colors">
                  Serekunda & Westfield
                </Link>
              </li>
              <li>
                <Link href="/explore?location=fajara" className="hover:text-laterite transition-colors">
                  Fajara & Bakau
                </Link>
              </li>
              <li>
                <Link href="/explore?location=senegambia-kololi" className="hover:text-laterite transition-colors">
                  Senegambia & Kololi
                </Link>
              </li>
              <li>
                <Link href="/explore?location=banjul" className="hover:text-laterite transition-colors">
                  Banjul (City)
                </Link>
              </li>
              <li>
                <Link href="/explore?location=brikama" className="hover:text-laterite transition-colors">
                  Brikama
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-deep-slate mb-4">
              For Tradespeople
            </h3>
            <ul className="space-y-2.5 text-sm text-river-silt">
              <li>
                <Link href="/join" className="font-medium text-deep-slate hover:text-laterite transition-colors">
                  List Your Trade Practice
                </Link>
              </li>
              <li>
                <Link href="/join#verification" className="hover:text-laterite transition-colors">
                  Verification Requirements
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-laterite transition-colors">
                  Professional Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-laterite transition-colors">
                  Create Client Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-river-silt">
          <p>© 2026 Jokkoo. Built for The Gambia. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-deep-slate cursor-default">Identity Verified Platform</span>
            <span className="hover:text-deep-slate cursor-default">Direct WhatsApp & Call</span>
            <span className="hover:text-deep-slate cursor-default">Free to join</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
