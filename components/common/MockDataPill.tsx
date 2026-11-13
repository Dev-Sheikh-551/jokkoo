import { SHOW_MOCK } from "@/lib/mock";

export function MockDataPill() {
  if (!SHOW_MOCK) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 pointer-events-none select-none px-3 py-1.5 rounded-full bg-deep-slate/90 text-warm-bone text-[11px] font-mono tracking-wide backdrop-blur-sm border border-warm-bone/10 shadow-md"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-hidden="true"
    >
      Preview: sample content
    </div>
  );
}
