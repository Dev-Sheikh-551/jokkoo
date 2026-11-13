import { Info } from "lucide-react";
import { ONBOARDING_LIVE } from "@/lib/onboarding";

export function OnboardingBanner() {
  if (ONBOARDING_LIVE) return null;

  return (
    <div
      role="status"
      className="bg-sand-dune/80 border-b border-border-subtle px-4 py-2.5 text-xs text-river-silt flex items-center justify-center gap-2"
    >
      <Info className="h-4 w-4 shrink-0 text-laterite" aria-hidden="true" />
      <span>Preview only: nothing is saved or published yet.</span>
    </div>
  );
}
