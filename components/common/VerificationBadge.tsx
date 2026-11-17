import { Check, ShieldCheck } from "lucide-react";
import { VerificationLevel } from "@/types/professional";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  level: VerificationLevel;
  className?: string;
}

export function VerificationBadge({ level, className }: VerificationBadgeProps) {
  if (level === "none") {
    return null;
  }

  if (level === "phone") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-warm-bone text-deep-slate text-xs font-medium border border-border-subtle shadow-xs",
          className
        )}
      >
        <Check className="h-3.5 w-3.5 text-verified" aria-hidden="true" />
        <span>Phone verified</span>
      </div>
    );
  }

  if (level === "identity") {
    // Kept for later opt-in tier; not currently used
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-sand-dune border border-border-subtle text-deep-slate text-xs font-medium",
          className
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5 text-laterite" aria-hidden="true" />
        <span>Identity verified</span>
      </div>
    );
  }

  return null;
}
