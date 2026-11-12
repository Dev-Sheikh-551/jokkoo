import { Category } from "@/types/category";

export const CATEGORIES: Category[] = [
  {
    id: "electrical",
    slug: "electrical-work",
    name: "Electrical & Solar Installations",
    shortName: "Electrical",
    tagline: "Wiring, solar, generators",
    shortDescription:
      "Residential wiring, solar inverter setups, backup generators, and safety inspections.",
    fullDescription:
      "Electricians providing residential wiring, solar inverter installations, backup generator switches, and electrical fault inspection.",
    iconName: "Zap",
    popularServices: [
      "Solar inverter & battery installation",
      "Residential distribution board wiring",
      "Automatic generator changeover switch",
      "Air conditioning power line routing",
      "Metre fault inspection",
    ],
  },
  {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing & Borehole Systems",
    shortName: "Plumbing",
    tagline: "Pipes, pumps, boreholes",
    shortDescription:
      "Pipefitting, water tanks, borehole pumps, leak diagnosis, and bathroom sanitary installations.",
    fullDescription:
      "Plumbers experienced in residential piping, solar water heating, booster pumps, and borehole installations across coastal The Gambia.",
    iconName: "Wrench",
    popularServices: [
      "Borehole pump repair & installation",
      "Overhead water tank plumbing",
      "Bathroom sanitary ware fitting",
      "Underground pipe leak detection",
      "Water heater & solar collector servicing",
    ],
  },
  {
    id: "carpentry",
    slug: "carpentry",
    name: "Carpentry & Joinery",
    shortName: "Carpentry",
    tagline: "Furniture, doors, roof timber",
    shortDescription:
      "Woodwork, roof truss framing, fitted cabinetry, and hardwood furniture.",
    fullDescription:
      "Carpenters building hardwood cabinetry, dining tables, roof timber trusses, and outdoor timber structures.",
    iconName: "Hammer",
    popularServices: [
      "Custom kitchen cabinets & wardrobes",
      "Hardwood entrance doors & architraves",
      "Roof timber truss construction",
      "Bespoke dining and living room furniture",
      "Timber deck & shaded pergola construction",
    ],
  },
  {
    id: "mechanics",
    slug: "mechanics",
    name: "Automotive & Mechanical Repairs",
    shortName: "Mechanical",
    tagline: "Cars, engines, repairs",
    shortDescription:
      "Vehicle computer diagnostics, suspension overhauls, engine servicing, and AC repairs.",
    fullDescription:
      "Automotive technicians providing electronic diagnostics, suspension repairs, engine servicing, and automotive AC maintenance.",
    iconName: "Car",
    popularServices: [
      "Computerized ECU diagnostic scanning",
      "Suspension bush & shock absorber replacement",
      "Complete engine timing & overhaul",
      "Automotive climate control & AC gas refill",
      "Brake caliper & disc resurfacing",
    ],
  },
  {
    id: "tailoring",
    slug: "tailoring",
    name: "Bespoke Tailoring & Garment Design",
    shortName: "Tailoring",
    tagline: "Clothes made and mended",
    shortDescription:
      "Traditional attire, embroidery, formal suits, and custom garment fitting.",
    fullDescription:
      "Tailors creating embroidery, tailored linen shirts, bespoke ceremonial garments, and everyday wear.",
    iconName: "Scissors",
    popularServices: [
      "Grand Boubou hand-guided machine embroidery",
      "Custom tailored two-piece suits",
      "Bespoke Bazin Riche formal garments",
      "Modern African print ready-to-wear",
      "Garment resizing & fine alteration",
    ],
  },
  {
    id: "painting",
    slug: "painting",
    name: "Painting & Surface Finishing",
    shortName: "Painting",
    tagline: "Interior and exterior finishes",
    shortDescription:
      "Interior emulsion, exterior coatings, textured finishes, and waterproofing.",
    fullDescription:
      "Painters skilled in exterior weather coatings, damp sealing, interior emulsion, and woodwork finishes.",
    iconName: "Paintbrush",
    popularServices: [
      "Exterior compound painting",
      "Damp wall treatment & priming",
      "Interior decorative accent walls",
      "Timber varnish & metal gate coating",
      "Textured wall finishes",
    ],
  },
  {
    id: "cleaning",
    slug: "cleaning",
    name: "Deep Cleaning & Facility Care",
    shortName: "Cleaning",
    tagline: "Homes, offices, after-build cleanup",
    shortDescription:
      "Post-construction cleanup, compound grounds care, upholstery sanitation, and office turnover.",
    fullDescription:
      "Cleaning services offering post-construction site cleanup, compound power-washing, upholstery sanitation, and move-in turnover.",
    iconName: "Sparkles",
    popularServices: [
      "Post-construction deep site handover cleaning",
      "Courtyard & interlock washing",
      "Sofa, rug & upholstery steam cleaning",
      "Move-in / move-out compound turnover",
      "Water reservoir tank disinfection",
    ],
  },
  {
    id: "photography",
    slug: "photography",
    name: "Photography & Videography",
    shortName: "Photography",
    tagline: "Events, property, portraits",
    shortDescription:
      "Architectural property showcases, commercial documentation, and family events.",
    fullDescription:
      "Photographers providing real estate documentation, event coverage, portraits, and construction progress records.",
    iconName: "Camera",
    popularServices: [
      "Real estate & architectural interior photography",
      "Construction progress photo logs",
      "Corporate headshots & team documentation",
      "Commercial product photography",
      "Family celebration & wedding documentation",
    ],
  },
  {
    id: "computer-repairs",
    slug: "computer-repairs",
    name: "Computer & IT Engineering",
    shortName: "Computer & Tech",
    tagline: "Repairs, networks, data recovery",
    shortDescription:
      "Hardware repair, data recovery, Wi-Fi networking, and system maintenance.",
    fullDescription:
      "Technicians providing board-level repairs, data recovery, Wi-Fi networking, and operating system maintenance.",
    iconName: "Laptop",
    popularServices: [
      "Laptop display & keyboard replacement",
      "Drive data recovery",
      "Power charging port repair",
      "Wi-Fi & CCTV cabling",
      "Operating system clean reinstall & backup",
    ],
  },
];
