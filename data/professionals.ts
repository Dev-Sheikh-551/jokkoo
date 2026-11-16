import type { Professional } from "@/types/professional";
import { SHOW_MOCK } from "@/lib/mock";
import { MOCK_PROFESSIONALS } from "@/data/mock/professionals.mock";

// Real published professionals (populated when users register)
const REAL_PROFESSIONALS: Professional[] = [];

export function getProfessionals(): Professional[] {
  const real = REAL_PROFESSIONALS.filter((p) => p.status === "published");
  const isSuppressed =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("nomock");
  if (SHOW_MOCK && !isSuppressed) {
    return [...real, ...MOCK_PROFESSIONALS];
  }
  return real;
}
