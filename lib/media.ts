export interface CategoryMediaItem {
  src?: string;
  alt: string;
  tone: "clay" | "sand" | "slate";
  /** CSS object-position value to frame the subject in every crop context */
  objectPosition?: string;
}

// When real photos exist, put them in public/images/mock/ and set src here.
// Render with next/image (fill, sizes set per context, quality 75).
export const categoryMedia: Record<string, CategoryMediaItem> = {
  "electrical-work": {
    src: "/images/mock/electrical.jpg",
    alt: "Hands working inside an electrical breaker panel",
    tone: "clay",
    objectPosition: "center",
  },
  plumbing: {
    src: "/images/mock/plumbing.jpg",
    alt: "Hands turning a wrench on copper pipe fittings",
    tone: "sand",
    objectPosition: "center",
  },
  carpentry: {
    src: "/images/mock/carpentry.jpg",
    alt: "Hands planing wood shavings at a workbench",
    tone: "sand",
    objectPosition: "center 30%",
  },
  mechanics: {
    src: "/images/mock/mechanical.jpg",
    alt: "Mechanic working with tools under a car engine",
    tone: "slate",
    objectPosition: "center",
  },
  tailoring: {
    src: "/images/mock/tailoring.jpg",
    alt: "Hands guiding fabric through a sewing machine",
    tone: "sand",
    objectPosition: "center",
  },
  painting: {
    src: "/images/mock/painting.jpg",
    alt: "Hand applying paint with a roller on a wall",
    tone: "clay",
    objectPosition: "center 40%",
  },
  cleaning: {
    src: "/images/mock/cleaning.jpg",
    alt: "Person cleaning a surface",
    tone: "sand",
    objectPosition: "center",
  },
  photography: {
    src: "/images/mock/photography.jpg",
    alt: "Hands holding a camera focused on a subject",
    tone: "slate",
    objectPosition: "center",
  },
  "computer-repairs": {
    src: "/images/mock/computer.jpg",
    alt: "Hands working on a computer circuit board",
    tone: "slate",
    objectPosition: "center",
  },
};
