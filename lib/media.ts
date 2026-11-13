export interface CategoryMediaItem {
  src?: string;
  alt: string;
  tone: "clay" | "sand" | "slate";
  /** CSS object-position value to frame the subject in every crop context */
  objectPosition?: string;
}

// Category images are permanent product content — public/images/categories/.
// They are NOT mock data and must not be gated by any mock flag or removed by a pre-deploy check.
// Render with next/image (fill, sizes set per context, quality 75).
export const categoryMedia: Record<string, CategoryMediaItem> = {
  "electrical-work": {
    src: "/images/categories/electrical.jpg",
    alt: "Hands working inside an electrical breaker panel",
    tone: "clay",
    objectPosition: "center",
  },
  plumbing: {
    src: "/images/categories/plumbing.jpg",
    alt: "Hands turning a wrench on copper pipe fittings",
    tone: "sand",
    objectPosition: "center",
  },
  carpentry: {
    src: "/images/categories/carpentry.jpg",
    alt: "Hands planing wood shavings at a workbench",
    tone: "sand",
    objectPosition: "center 30%",
  },
  mechanics: {
    src: "/images/categories/mechanical.jpg",
    alt: "Mechanic working with tools under a car engine",
    tone: "slate",
    objectPosition: "center",
  },
  tailoring: {
    src: "/images/categories/tailoring.jpg",
    alt: "Hands guiding fabric through a sewing machine",
    tone: "sand",
    objectPosition: "center",
  },
  painting: {
    src: "/images/categories/painting.jpg",
    alt: "Hand applying paint with a roller on a wall",
    tone: "clay",
    objectPosition: "center 40%",
  },
  cleaning: {
    src: "/images/categories/cleaning.jpg",
    alt: "Person cleaning a surface",
    tone: "sand",
    objectPosition: "center",
  },
  photography: {
    src: "/images/categories/photography.jpg",
    alt: "Hands holding a camera focused on a subject",
    tone: "slate",
    objectPosition: "center",
  },
  "computer-repairs": {
    src: "/images/categories/computer.jpg",
    alt: "Hands working on a computer circuit board",
    tone: "slate",
    objectPosition: "center",
  },
};
