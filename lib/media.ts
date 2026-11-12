export interface CategoryMediaItem {
  src?: string;
  alt: string;
  tone: "clay" | "sand" | "slate";
}

// When real photos exist, put them in public/images/ and set src; render with next/image (sizes set, quality 75).
export const categoryMedia: Record<string, CategoryMediaItem> = {
  "electrical-work": {
    src: undefined,
    alt: "Electrical and solar installation work in The Gambia",
    tone: "clay",
  },
  plumbing: {
    src: undefined,
    alt: "Plumbing, borehole, and piping installations",
    tone: "sand",
  },
  carpentry: {
    src: undefined,
    alt: "Custom timber joinery and woodwork",
    tone: "sand",
  },
  mechanics: {
    src: undefined,
    alt: "Automotive repair and diagnostics",
    tone: "sand",
  },
  tailoring: {
    src: undefined,
    alt: "Tailoring, boubous, and garment design",
    tone: "sand",
  },
  painting: {
    src: undefined,
    alt: "Interior and exterior surface finishing",
    tone: "sand",
  },
  cleaning: {
    src: undefined,
    alt: "Post-construction and deep sanitation cleaning",
    tone: "sand",
  },
  photography: {
    src: undefined,
    alt: "Architectural and event photography",
    tone: "sand",
  },
  "computer-repairs": {
    src: undefined,
    alt: "Computer diagnostics and network engineering",
    tone: "sand",
  },
};
