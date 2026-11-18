"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";

const MobileMenuDrawer = dynamic(() => import("./MobileMenuDrawer"), {
  ssr: false,
});

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
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
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-laterite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite rounded-[2px] py-1 text-sm font-medium",
                    isActive ? "text-laterite font-semibold" : "text-deep-slate/85"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/login"
              className={cn(
                "transition-colors hover:text-laterite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite rounded-[2px] py-1 text-sm font-medium",
                pathname === "/login" ? "text-laterite font-semibold" : "text-deep-slate/85"
              )}
            >
              Sign in
            </Link>
          </nav>

          <Link
            href="/join"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-deep-slate px-5 py-2.5 text-xs font-semibold text-warm-bone transition-colors hover:bg-deep-slate/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite focus-visible:ring-offset-2"
          >
            Join as a professional
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-deep-slate hover:bg-sand-dune rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite"
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

      {/* Mobile Drawer Menu (dynamically loaded on open) */}
      {mobileMenuOpen && (
        <MobileMenuDrawer
          navLinks={NAV_LINKS}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
