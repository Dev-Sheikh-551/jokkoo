"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/explore", label: "Explore Professionals" },
  { href: "/categories", label: "All Categories" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-warm-bone/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo Placeholder */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-laterite focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-laterite rounded-[2px] py-1",
                  isActive ? "text-laterite font-semibold" : "text-deep-slate/85"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-deep-slate/80 hover:text-deep-slate px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>

          <Button href="/join" variant="outline" size="sm" className="gap-1.5 border-deep-slate/20">
            <span>List Your Business</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-laterite" />
          </Button>

          <Button href="/explore" variant="primary" size="sm">
            Find a Professional
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            href="/join"
            variant="subtle"
            size="sm"
            className="text-xs px-2.5 py-1 text-deep-slate"
          >
            Join as Pro
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-deep-slate hover:bg-sand-dune rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-warm-bone px-4 pt-3 pb-6 animate-in fade-in-50 duration-150">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-deep-slate hover:bg-sand-dune rounded-[3px] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-border-subtle flex flex-col gap-2.5">
              <Button
                href="/explore"
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find a Professional
              </Button>

              <Button
                href="/join"
                variant="outline"
                size="md"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join as a Skilled Professional
              </Button>

              <div className="flex justify-between items-center px-2 pt-2 text-sm text-river-silt">
                <span>Already registered?</span>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium text-laterite hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
