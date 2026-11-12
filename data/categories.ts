import { Category } from "@/types/category";

export const CATEGORIES: Category[] = [
  {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing & Borehole Systems",
    shortDescription: "Pipefitting, water tanks, borehole pumps, leak diagnosis, and bathroom sanitary installations.",
    fullDescription:
      "Connect with skilled plumbers experienced in residential piping, solar water heating systems, high-pressure booster pumps, and borehole plumbing systems across coastal The Gambia.",
    iconName: "Wrench",
    professionalCount: 14,
    popularServices: [
      "Borehole pump repair & installation",
      "Overhead water tank plumbing",
      "Bathroom sanitary ware fitting",
      "Underground pipe leak detection",
      "Water heater & solar collector servicing",
    ],
  },
  {
    id: "electrical",
    slug: "electrical-work",
    name: "Electrical & Solar Installations",
    shortDescription: "Certified residential wiring, solar inverter setups, backup generators, and safety inspections.",
    fullDescription:
      "Vetted Gambian electricians specializing in NAWEC grid compliance, complete residential rewiring, solar PV inverter installations, automatic generator changeover switches, and surge protection.",
    iconName: "Zap",
    professionalCount: 18,
    popularServices: [
      "Solar inverter & battery installation",
      "Residential distribution board wiring",
      "Automatic generator changeover switch",
      "Air conditioning power line routing",
      "NAWEC metre fault inspection",
    ],
  },
  {
    id: "carpentry",
    slug: "carpentry",
    name: "Carpentry & Joinery",
    shortDescription: "Custom mahogany woodwork, roof truss framing, fitted cabinetry, and hardwood furniture.",
    fullDescription:
      "Master joiners and carpenters creating durable hardwood cabinetry, bespoke dining tables, roof timber trusses, architectural pergolas, and marine-grade outdoor timber installations designed for coastal humidity.",
    iconName: "Hammer",
    professionalCount: 12,
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
    shortDescription: "Vehicle computer diagnostics, suspension overhauls, engine servicing, and AC repairs.",
    fullDescription:
      "Experienced automotive technicians equipped for 4x4 off-road suspension setups, vehicle electronic diagnostics, engine overhauls, brake restoration, and high-efficiency automotive AC recharging.",
    iconName: "Car",
    professionalCount: 11,
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
    shortDescription: "Ceremonial African couture, Grand Boubou embroidery, formal suits, and custom bridal wear.",
    fullDescription:
      "Celebrated Senegambian master tailors creating exquisite handcrafted embroidery, tailored linen shirts, bespoke Bazin Riche attire, modern western suits, and formal traditional ceremony collections.",
    iconName: "Scissors",
    professionalCount: 16,
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
    shortDescription: "Interior emulsion, weather-resistant exterior coatings, trowel-on finishes, and waterproofing.",
    fullDescription:
      "Professional surface finish painters skilled in tropical weather-resistant acrylic coatings, damp-proof exterior sealing, decorative Venetian plaster, and precise interior trim work.",
    iconName: "Paintbrush",
    professionalCount: 9,
    popularServices: [
      "Exterior weather-proof compound painting",
      "Damp wall treatment & silicone priming",
      "Interior decorative accent walls",
      "Timber varnish & metal gate enamel coating",
      "Trowel-on textured stone finish",
    ],
  },
  {
    id: "cleaning",
    slug: "cleaning",
    name: "Deep Cleaning & Facility Care",
    shortDescription: "Post-construction cleanup, compound grounds care, upholstery sanitation, and office turnover.",
    fullDescription:
      "Systematic cleaning crews delivering post-construction rubble removal, compound power-washing, steam mattress and sofa deep-cleaning, and ongoing commercial facility hygiene maintenance.",
    iconName: "Sparkles",
    professionalCount: 10,
    popularServices: [
      "Post-construction deep site handover cleaning",
      "High-pressure courtyard & interlock washing",
      "Sofa, rug & upholstery steam cleaning",
      "Move-in / move-out compound turnover",
      "Water reservoir tank disinfection",
    ],
  },
  {
    id: "photography",
    slug: "photography",
    name: "Photography & Videography",
    shortDescription: "Architectural property showcases, commercial brand documentation, and formal family milestones.",
    fullDescription:
      "Visual documentarians and commercial photographers capturing real estate developments, high-profile hospitality interiors, corporate portraits, and memorable family celebrations with natural Atlantic light.",
    iconName: "Camera",
    professionalCount: 8,
    popularServices: [
      "Real estate & architectural interior photography",
      "Diaspora construction progress video logs",
      "Corporate headshots & team documentation",
      "Commercial brand product campaigns",
      "Milestone family & wedding documentation",
    ],
  },
  {
    id: "computer-repairs",
    slug: "computer-repairs",
    name: "Computer & IT Engineering",
    shortDescription: "Hardware logic board repair, data recovery, enterprise Wi-Fi networking, and workstation tuning.",
    fullDescription:
      "Bench-certified technicians providing chip-level logic board micro-soldering, lost data extraction, mesh Wi-Fi network routing for homes and offices, and workstation OS deployment.",
    iconName: "Laptop",
    professionalCount: 7,
    popularServices: [
      "Laptop display & keyboard replacement",
      "Corrupted drive data recovery",
      "Micro-soldering & power charging port repair",
      "Compound mesh Wi-Fi & CCTV cabling",
      "Operating system clean reinstall & backup",
    ],
  },
];
