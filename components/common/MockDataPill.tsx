import { SHOW_MOCK } from "@/lib/mock";

export function MockDataPill() {
  if (!SHOW_MOCK) return null;

  return (
    <div
      className="w-full h-[28px] bg-deep-slate text-warm-bone font-mono text-[11px] flex items-center justify-center px-4 shrink-0 select-none border-b border-warm-bone/10"
      aria-label="Preview notice"
    >
      Preview: sample content. Not shown in production.
    </div>
  );
}
