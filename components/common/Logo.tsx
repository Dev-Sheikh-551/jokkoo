import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO } from "@/lib/brand";
import { PlaceholderLogo } from "@/components/common/PlaceholderLogo";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isCompact?: boolean;
  /** "header" (default) renders at 36px tall; "footer" renders at 32px tall */
  size?: "header" | "footer";
}

// Trimmed logo dimensions: 706 × 169 px → aspect ratio ~4.18:1
const LOGO_ASPECT = 706 / 169;

export function Logo({ className, isCompact, size = "header" }: LogoProps) {
  if (BRAND_LOGO === "placeholder") {
    return <PlaceholderLogo className={className} isCompact={isCompact} />;
  }

  const h = size === "footer" ? 32 : 36;
  const w = Math.round(h * LOGO_ASPECT);

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite rounded-sm",
        className
      )}
      aria-label="Jokkoo"
    >
      <Image
        src="/brand/jokkoo-logo.png"
        alt="jokkoo"
        width={w}
        height={h}
        priority={size === "header"}
        style={{ width: `${w}px`, height: `${h}px`, objectFit: "contain" }}
      />
    </Link>
  );
}
