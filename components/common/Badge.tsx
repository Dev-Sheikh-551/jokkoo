import { cn } from "@/lib/utils";

interface SampleDataBadgeProps {
  className?: string;
}

export function SampleDataBadge({ className }: SampleDataBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-[3px] bg-warm-bone text-[11px] font-medium text-deep-slate border border-border-subtle shadow-xs",
        className
      )}
      title="This is demonstration data for testing and preview"
    >
      Sample profile
    </span>
  );
}
