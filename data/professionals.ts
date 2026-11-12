import { Professional } from "@/types/professional";

export const SAMPLE_PROFESSIONALS: Professional[] = [
  {
    id: "pro-1",
    slug: "sample-electrician",
    name: "Sample Electrician",
    businessName: undefined,
    profession: "Electrician & Solar Installer",
    categorySlug: "electrical-work",
    yearsExperience: 10,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Kanifing",
      coverageAreas: ["Serekunda", "Fajara", "Bakau", "Kotu", "Brusubi", "Bijilo"],
      serviceRadiusNote: "Serves Kanifing Municipality and Kombo North coastal corridor.",
    },
    services: [
      {
        id: "s1-1",
        title: "Solar Inverter & Battery System Installation",
        description:
          "Mounting of solar panels, DC/AC breaker cabling, inverter configuration, and battery protection.",
        durationEstimate: "2–3 business days",
      },
      {
        id: "s1-2",
        title: "Generator Changeover Switch Installation",
        description:
          "Transfer switch that swaps between grid power and private generator.",
        durationEstimate: "4–6 hours",
      },
      {
        id: "s1-3",
        title: "Residential Electrical Safety Audit",
        description:
          "Earth leakage testing, circuit breaker balance diagnosis, and fault isolation.",
        durationEstimate: "2–4 hours",
      },
    ],
    portfolio: [
      {
        id: "port-1-1",
        title: "Hybrid Solar Inverter Array",
        description: "Installed for a private villa with battery storage.",
        completedYear: "2025",
        tag: "Solar Installation",
      },
      {
        id: "port-1-2",
        title: "Industrial Conduits & Sub-Panel",
        description: "Structured breaker configuration for a retail property.",
        completedYear: "2025",
        tag: "Commercial Electrical",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof"],
    isFeatured: true,
    isSample: true,
  },
  {
    id: "pro-2",
    slug: "sample-carpenter",
    name: "Sample Carpenter",
    businessName: undefined,
    profession: "Joiner & Woodworker",
    categorySlug: "carpentry",
    yearsExperience: 15,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Bakau",
      coverageAreas: ["Bakau", "Fajara", "Kotu", "Kololi", "Senegambia", "Brusubi", "Banjul"],
      serviceRadiusNote: "Delivers and installs finished joinery throughout the Greater Banjul Area.",
    },
    services: [
      {
        id: "s2-1",
        title: "Bespoke Hardwood Entrance Door & Jamb Fitting",
        description:
          "Solid timber entrance door with weather-sealed sub-frame and lock mortising.",
        durationEstimate: "7–10 days fabrication",
      },
      {
        id: "s2-2",
        title: "Fitted Modular Kitchen Cabinetry",
        description:
          "Moisture-resistant carcass timber, soft-close hinges, and hardwood fascias.",
      },
      {
        id: "s2-3",
        title: "Bespoke Dining Table",
        description:
          "Single-slab or matched plank tabletop with hand-rubbed oil finish.",
        durationEstimate: "10–14 days",
      },
    ],
    portfolio: [
      {
        id: "port-2-1",
        title: "Custom Pivot Door",
        description: "Private residence in the Greater Banjul Area.",
        completedYear: "2025",
        tag: "Entrance Joinery",
      },
      {
        id: "port-2-2",
        title: "Fitted Kitchen Cabinetry",
        description: "Solid timber island bench and cabinets.",
        completedYear: "2025",
        tag: "Cabinetry",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof"],
    isFeatured: true,
    isSample: true,
  },
  {
    id: "pro-3",
    slug: "sample-tailor",
    name: "Sample Tailor",
    businessName: undefined,
    profession: "Tailor & Garment Designer",
    categorySlug: "tailoring",
    yearsExperience: 12,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Serekunda",
      coverageAreas: ["Serekunda", "Banjul", "Fajara", "Bakau", "Brusubi", "Kotu"],
      serviceRadiusNote:
        "Fitting studio in Serekunda. Mobile fitting available across Greater Banjul Area.",
    },
    services: [
      {
        id: "s3-1",
        title: "Bespoke Grand Boubou with Embroidery",
        description:
          "Full three-piece ceremonial ensemble on Bazin Riche with custom neckline motifs.",
        durationEstimate: "5–7 business days",
      },
      {
        id: "s3-2",
        title: "Contemporary Tailored Linen Suit",
        description: "Breathable two-piece suit tailored for tropical wear.",
        durationEstimate: "3–5 days",
      },
      {
        id: "s3-3",
        title: "Express Fitting & Garment Alteration",
        description:
          "Tapering, hemming, shoulder restructuring, and zipper replacements.",
      },
    ],
    portfolio: [
      {
        id: "port-3-1",
        title: "Ceremonial Boubou",
        description: "Custom celebratory boubou.",
        completedYear: "2025",
        tag: "Ceremonial Wear",
      },
      {
        id: "port-3-2",
        title: "Tailored Linen Coordinate",
        description: "Two-piece modern ensemble.",
        completedYear: "2025",
        tag: "Modern Ready-to-Wear",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof"],
    isFeatured: true,
    isSample: true,
  },
  {
    id: "pro-4",
    slug: "sample-plumber",
    name: "Sample Plumber",
    businessName: undefined,
    profession: "Plumbing Technician & Borehole Specialist",
    categorySlug: "plumbing",
    yearsExperience: 10,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Brusubi",
      coverageAreas: ["Brusubi", "Bijilo", "Sukuta", "Kerr Sering", "Kotu", "Brikama"],
      serviceRadiusNote:
        "Operates across Kombo North and Kombo South with a mobile service vehicle.",
    },
    services: [
      {
        id: "s4-1",
        title: "Borehole Submersible Pump Diagnosis & Replacement",
        description:
          "Pulling pump strings, testing motor capacitors, and installing new pump units.",
        durationEstimate: "Same day service",
      },
      {
        id: "s4-2",
        title: "Overhead Tank Plumbing & Float Automation",
        description:
          "Piping for overhead poly-tanks with automatic water level controller.",
      },
      {
        id: "s4-3",
        title: "Emergency Pipe Burst & Leak Location",
        description:
          "Immediate isolation of pipe breaches and rapid fusion repair.",
      },
    ],
    portfolio: [
      {
        id: "port-4-1",
        title: "Borehole Filtration & Pressure Manifold",
        description: "Installed for a residential complex.",
        completedYear: "2025",
        tag: "Piping Systems",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof", "Mandinka"],
    isFeatured: true,
    isSample: true,
  },
  {
    id: "pro-5",
    slug: "sample-painter",
    name: "Sample Painter",
    businessName: undefined,
    profession: "Surface Finishing & Waterproofing Specialist",
    categorySlug: "painting",
    yearsExperience: 8,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Fajara",
      coverageAreas: ["Fajara", "Bakau", "Kotu", "Kololi", "Banjul", "Brusubi"],
      serviceRadiusNote: "Serves all Greater Banjul and coastal residential estates.",
    },
    services: [
      {
        id: "s5-1",
        title: "Full Compound Exterior Waterproof Coating",
        description:
          "Crack filling, damp-primer, and two coats of weather-shield acrylic.",
      },
      {
        id: "s5-2",
        title: "Interior Emulsion Application",
        description:
          "Surface skimming, sanding, base undercoat, and dual coat application.",
      },
    ],
    portfolio: [
      {
        id: "port-5-1",
        title: "Exterior Protection Finish",
        description: "Weather-shield application on a coastal property.",
        completedYear: "2025",
        tag: "Exterior Coating",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof"],
    isFeatured: false,
    isSample: true,
  },
  {
    id: "pro-6",
    slug: "sample-mechanic",
    name: "Sample Mechanic",
    businessName: undefined,
    profession: "Automotive Mechanical & Electrical Diagnostician",
    categorySlug: "mechanics",
    yearsExperience: 12,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Kanifing",
      coverageAreas: ["Kanifing", "Serekunda", "Banjul", "Bakau", "Brusubi"],
      serviceRadiusNote:
        "Garage located in Kanifing. Mobile roadside callout available within 15 km.",
    },
    services: [
      {
        id: "s6-1",
        title: "Computerized ECU Diagnostic Scan & Report",
        description:
          "Digital readout of live sensor data, misfire counts, and transmission states.",
        durationEstimate: "45 minutes",
      },
      {
        id: "s6-2",
        title: "Suspension Overhaul & Bushing Replacement",
        description:
          "Replacing control arms, shock absorbers, tie rod ends, and ball joints.",
      },
    ],
    portfolio: [
      {
        id: "port-6-1",
        title: "Suspension & Bushing Restoration",
        description: "4x4 vehicle fitted with heavy duty shocks.",
        completedYear: "2025",
        tag: "Automotive Restoration",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof", "Mandinka"],
    isFeatured: false,
    isSample: true,
  },
  {
    id: "pro-7",
    slug: "sample-cleaner",
    name: "Sample Cleaning Specialist",
    businessName: undefined,
    profession: "Deep Sanitation & Post-Construction Cleaning",
    categorySlug: "cleaning",
    yearsExperience: 7,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Bijilo",
      coverageAreas: ["Bijilo", "Brusubi", "Kololi", "Senegambia", "Kotu", "Fajara"],
      serviceRadiusNote: "Specialises in coastal residential compounds and corporate offices.",
    },
    services: [
      {
        id: "s7-1",
        title: "Post-Construction Handover Deep Cleaning",
        description:
          "Mortar residue removal, tile de-hazing, window descaling, and dust extraction.",
      },
      {
        id: "s7-2",
        title: "Steam Upholstery & Mattress Sanitization",
        description:
          "Thermal injection-extraction to eliminate dust mites and stains.",
      },
    ],
    portfolio: [
      {
        id: "port-7-1",
        title: "Post-Build Handover Clean",
        description: "4-bedroom compound readied for move-in.",
        completedYear: "2025",
        tag: "Post-Construction",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof"],
    isFeatured: false,
    isSample: true,
  },
  {
    id: "pro-8",
    slug: "sample-photographer",
    name: "Sample Photographer",
    businessName: undefined,
    profession: "Architectural & Real Estate Photographer",
    categorySlug: "photography",
    yearsExperience: 8,
    tagline: "[Short tagline written by the professional]",
    bio: "[Short bio written by the professional]",
    verification: {
      isVerified: false,
      disclaimer:
        "Identity checks verify government-issued documents and operational location. Verification does not guarantee workmanship.",
    },
    coverage: {
      baseLocation: "Fajara",
      coverageAreas: ["Fajara", "Bakau", "Banjul", "Brusubi", "Bijilo", "Kotu", "Brikama"],
      serviceRadiusNote: "Serves all regions across The Gambia for property shoots.",
    },
    services: [
      {
        id: "s8-1",
        title: "Real Estate & Architectural Interior Showcase",
        description:
          "HDR interior and exterior photography with perspective correction.",
        durationEstimate: "2–3 hours on site",
      },
      {
        id: "s8-2",
        title: "Construction Progress Photo & Drone Log",
        description:
          "Scheduled photographic documentation of building progress.",
      },
    ],
    portfolio: [
      {
        id: "port-8-1",
        title: "Coastal Villa Showcase",
        description: "Architectural interior and exterior portfolio shoot.",
        completedYear: "2025",
        tag: "Real Estate",
      },
    ],
    reviews: [],
    phone: "",
    whatsappNumber: "",
    languages: ["English", "Wolof"],
    isFeatured: false,
    isSample: true,
  },
];
