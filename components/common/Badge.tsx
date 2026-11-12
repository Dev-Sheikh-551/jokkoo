import { cn } from "@/lib/utils";

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
