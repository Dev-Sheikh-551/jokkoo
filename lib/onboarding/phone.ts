export function normalizeGambianPhone(raw: string): {
  normalized: string;
  localDigits: string;
  isValid: boolean;
} {
  if (!raw) {
    return { normalized: "", localDigits: "", isValid: false };
  }

  // Strip whitespace, dashes, dots, parentheses
  let digits = raw.replace(/[\s\-\(\)\.]/g, "");

  // Strip Gambian country code prefixes
  if (digits.startsWith("+220")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("220") && digits.length === 10) {
    digits = digits.slice(3);
  } else if (digits.startsWith("00220")) {
    digits = digits.slice(5);
  }

  // Keep only digits, up to 7 characters
  const cleanDigits = digits.replace(/\D/g, "").slice(0, 7);
  const isValid = cleanDigits.length === 7;
  const normalized = isValid
    ? `+220${cleanDigits}`
    : cleanDigits
    ? `+220${cleanDigits}`
    : "";

  return { normalized, localDigits: cleanDigits, isValid };
}
