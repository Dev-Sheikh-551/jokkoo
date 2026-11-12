import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isCompact?: boolean;
}

/**
 * Brand Logo Placeholder Component
 *
 * NOTE: As per Phase 03.2 instructions, no final logo asset is generated or invented.
 * This component provides a calibrated placeholder layout conforming to the
 * Contemporary African Minimalism aesthetic. When approved SVG assets are ready,
 * replace the inner SVG/mark container below.
 */
export function Logo({ className, isCompact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite rounded-sm transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Jokkoo — Verified Skilled Services in The Gambia"
    >
      {/* Structural Logo Mark Placeholder */}
      <div
        className="relative flex h-8 w-8 items-center justify-center rounded-[3px] bg-deep-slate text-warm-bone transition-transform duration-200 group-hover:scale-[1.03]"
        title="Jokkoo Logo Asset Placeholder"
      >
        <span className="font-serif text-lg font-bold italic tracking-tighter text-laterite-light">
          J
        </span>
        {/* Subtle architectural dot representing connection / node */}
        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-laterite" />
      </div>

      {/* Brand Wordmark (Lowercase as per brand guidelines) */}
      <div className="flex flex-col">
        <span className="font-sans text-xl font-bold tracking-tight text-deep-slate leading-none">
          jokkoo
        </span>
        {!isCompact && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-river-silt font-medium mt-0.5">
            The Gambia
          </span>
        )}
      </div>
    </Link>
  );
}
