import type { Professional } from "@/types/professional";
import { SHOW_MOCK } from "@/lib/mock";
import { MOCK_PROFESSIONALS } from "@/data/mock/professionals.mock";

// Real published professionals (populated when users register)
const REAL_PROFESSIONALS: Professional[] = [];

export function getProfessionals(): Professional[] {
  const real = REAL_PROFESSIONALS.filter((p) => p.status === "published");
  if (SHOW_MOCK) {
    return [...real, ...MOCK_PROFESSIONALS];
  }
  return real;
}
