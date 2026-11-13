import { SHOW_MOCK } from "@/lib/mock";

export function MockDataPill() {
  if (!SHOW_MOCK) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none select-none px-2.5 py-1 rounded-full bg-deep-slate/90 text-warm-bone text-[10px] font-mono tracking-wider backdrop-blur-xs border border-warm-bone/10 shadow-sm left-4 bottom-[calc(env(safe-area-inset-bottom,0px)+6rem)] lg:bottom-4 lg:right-4 lg:left-auto"
      aria-hidden="true"
    >
      Preview: sample content
    </div>
  );
}
