import { ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  className?: string;
  showDisclaimer?: boolean;
}

export function VerificationBadge({
  className,
  showDisclaimer = false,
}: VerificationBadgeProps) {
  return (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-sand-dune border border-border-subtle text-deep-slate text-xs font-medium">
        <ShieldCheck className="h-3.5 w-3.5 text-laterite" aria-hidden="true" />
        <span>Identity Verified</span>
      </div>
      {showDisclaimer && (
        <p className="text-[11px] text-river-silt flex items-start gap-1 leading-tight">
          <Info className="h-3 w-3 mt-0.5 shrink-0 text-river-silt/70" />
          <span>Identity check completed. Does not imply a guarantee of workmanship.</span>
        </p>
      )}
    </div>
  );
}

interface SampleDataBadgeProps {
  className?: string;
}

export function SampleDataBadge({ className }: SampleDataBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[2px] bg-sand-dune/80 text-[10px] uppercase tracking-wider text-river-silt font-semibold border border-border-subtle",
        className
      )}
      title="This is demonstration data for testing and preview"
    >
      Sample Data
    </span>
  );
}
