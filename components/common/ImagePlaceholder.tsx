import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label?: string;
  tone?: "clay" | "sand" | "slate";
  className?: string;
}

export function ImagePlaceholder({
  label = "Image placeholder",
  tone = "sand",
  className,
}: ImagePlaceholderProps) {
  const toneClasses = {
    clay: "bg-gradient-to-br from-laterite-light to-warm-bone text-laterite border-border-subtle",
    sand: "bg-gradient-to-br from-sand-dune to-warm-bone text-river-silt border-border-subtle",
    slate: "bg-gradient-to-br from-sand-dune/80 to-sand-dune text-deep-slate border-border-subtle",
  };

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex h-full w-full items-center justify-center border overflow-hidden",
        toneClasses[tone],
        className
      )}
    >
      <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-[2px] bg-warm-bone/80 border border-border-subtle shadow-xs backdrop-blur-xs">
        {label}
      </span>
    </div>
  );
}
