import type { Professional } from "@/types/professional";
import { MOCK_IMAGES_MAP } from "@/data/mock/mock-images.generated";

// Helper to assemble work photos: existing category photo first, then any work-N files found from sync
function buildMockWorkPhotos(
  slug: string,
  initialPhotos: { src: string; caption?: string }[]
): { src: string; caption?: string }[] {
  const syncedWorks = MOCK_IMAGES_MAP[slug]?.works ?? [];
  const photos = [...initialPhotos];
  for (let i = 0; i < syncedWorks.length; i++) {
    photos.push({
      src: syncedWorks[i],
      caption: `Work photo ${photos.length + 1}`,
    });
  }
  return photos;
}

// Helper to resolve avatar
function getMockAvatar(slug: string): string | undefined {
  return MOCK_IMAGES_MAP[slug]?.avatar;
}

// In development, validate mock profiles against schema asynchronously
if (process.env.NODE_ENV === "development") {
  import("@/lib/profile/schema").then(({ professionalProfileInputSchema }) => {
    setTimeout(() => {
      MOCK_PROFESSIONALS.forEach((p, i) => {
        const result = professionalProfileInputSchema.safeParse(p);
        if (!result.success) {
          throw new Error(
            `[Mock Data] Profile at index ${i} (${p.slug}) failed schema validation:\n${JSON.stringify(
              result.error.format(),
              null,
              2
            )}`
          );
        }
      });
    }, 0);
  });
}

export const MOCK_PROFESSIONALS: Professional[] = [
  // 1. Lamin Ceesay — Electrician (individual, phone verified)
  {
    id: "mock-pro-1",
    slug: "lamin-ceesay",
    primaryCategorySlug: "electrical-work",
    accountType: "individual",
    displayName: "Lamin Ceesay",
    businessName: undefined,
    categories: ["electrical-work"],
    baseLocation: "kanifing",
    regularAreas: ["serekunda", "bakau", "fajara"],
    byArrangementAreas: ["banjul", "brusubi"],
    whatsappNumber: "+2200000001",
    callNumber: "+2200000001",
    bio: "I've been working on domestic and solar installations for a good while now. I do wiring, inverters, and backup generator switches. I keep things neat and I always test before I leave. Most of my customers come from word of mouth in the Kanifing area.",
    services: [
      {
        title: "Residential wiring",
        description: "New build and rewiring of existing houses.",
      },
      {
        title: "Solar inverter installation",
        description: "Panels, batteries, and DC/AC cabling.",
      },
      {
        title: "Generator changeover switch",
        description: "Automatic transfer between grid and generator.",
      },
      {
        title: "Electrical fault diagnosis",
        description: "Finding and fixing shorts, tripped breakers, and earthing faults.",
      },
    ],
    workPhotos: buildMockWorkPhotos("lamin-ceesay", [
      {
        src: "/images/categories/electrical.jpg",
        caption: "Electrical breaker panel installation",
      },
    ]),
    avatar: getMockAvatar("lamin-ceesay"),
    languages: ["English", "Wolof", "Mandinka"],
    yearsExperience: 9,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "phone",
    status: "published",
    createdAt: "2026-10-01",
    isSample: true,
  },

  // 2. Fatou Darboe — Tailor (individual, none)
  {
    id: "mock-pro-2",
    slug: "fatou-darboe",
    primaryCategorySlug: "tailoring",
    accountType: "individual",
    displayName: "Fatou Darboe",
    businessName: undefined,
    categories: ["tailoring"],
    baseLocation: "serekunda",
    regularAreas: ["bakau", "fajara", "kotu"],
    byArrangementAreas: ["banjul"],
    whatsappNumber: "+2200000002",
    callNumber: "+2200000002",
    bio: "I make boubous, suits, dresses, and everyday wear. I work from my studio in Serekunda and I do fittings at home too. Tell me what you want and I will tell you honestly whether it works for your fabric and your body shape. I do not rush.",
    services: [
      {
        title: "Grand Boubou with embroidery",
        description: "Hand-guided machine embroidery on Bazin and other fabrics.",
      },
      {
        title: "Bespoke suit or two-piece",
        description: "Measured, fitted, and finished to your instructions.",
      },
      {
        title: "African print dresses and tops",
        description: "Modern cuts in Ankara and Kente prints.",
      },
      {
        title: "Alterations and resizing",
        description: "Taking in, letting out, hemming, and repairs.",
      },
    ],
    workPhotos: buildMockWorkPhotos("fatou-darboe", [
      {
        src: "/images/categories/tailoring.jpg",
        caption: "Tailoring and garment construction",
      },
    ]),
    avatar: getMockAvatar("fatou-darboe"),
    languages: ["Wolof", "Mandinka", "English"],
    yearsExperience: 11,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "none",
    status: "published",
    createdAt: "2026-10-05",
    isSample: true,
  },

  // 3. Ousman Bojang — Carpenter (individual, phone verified)
  {
    id: "mock-pro-3",
    slug: "ousman-bojang",
    primaryCategorySlug: "carpentry",
    accountType: "individual",
    displayName: "Ousman Bojang",
    businessName: undefined,
    categories: ["carpentry"],
    baseLocation: "bakau",
    regularAreas: ["fajara", "kotu", "senegambia-kololi"],
    byArrangementAreas: ["banjul", "brikama"],
    whatsappNumber: "+2200000003",
    callNumber: "+2200000003",
    bio: "I make doors, cabinets, and furniture from solid timber. Everything is built in my workshop in Bakau and delivered. I work with hardwood — mostly Iroko and Mahogany — and I finish by hand. If you want flat-pack, I am not your person. If you want something that lasts, talk to me.",
    services: [
      {
        title: "Hardwood entrance doors",
        description: "Solid timber door, frame, and lock mortising.",
      },
      {
        title: "Kitchen cabinets",
        description: "Floor and wall cabinets in moisture-resistant timber with hardwood fascias.",
      },
      {
        title: "Dining tables and chairs",
        description: "Single-plank or matched-plank tops, hand-finished.",
      },
      {
        title: "Wardrobe and built-in storage",
        description: "Fitted to your wall dimensions.",
      },
    ],
    workPhotos: buildMockWorkPhotos("ousman-bojang", [
      {
        src: "/images/categories/carpentry.jpg",
        caption: "Hands planing hardwood joinery",
      },
    ]),
    avatar: getMockAvatar("ousman-bojang"),
    languages: ["English", "Wolof"],
    yearsExperience: 14,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "phone",
    status: "published",
    createdAt: "2026-10-08",
    isSample: true,
  },

  // 4. Mariama Sowe — Painter (individual, none)
  {
    id: "mock-pro-4",
    slug: "mariama-sowe",
    primaryCategorySlug: "painting",
    accountType: "individual",
    displayName: "Mariama Sowe",
    businessName: undefined,
    categories: ["painting"],
    baseLocation: "brusubi",
    regularAreas: ["bijilo", "senegambia-kololi", "kotu"],
    byArrangementAreas: ["serekunda", "fajara"],
    whatsappNumber: "+2200000004",
    callNumber: "+2200000004",
    bio: "I do interior and exterior painting for homes and small businesses. I prep walls properly before I paint — that is what most people skip and what causes problems later. I use weather-shield coatings outside and I can do textured finishes if that is what you want.",
    services: [
      {
        title: "Interior emulsion painting",
        description: "Full rooms or feature walls, all prep included.",
      },
      {
        title: "Exterior weather-coat application",
        description: "Damp sealing and weather-shield on compound walls.",
      },
      {
        title: "Textured wall finishes",
        description: "Various texture styles for interior accent walls.",
      },
      {
        title: "Timber and metal gate finishing",
        description: "Varnish, primer, and enamel on wood and ironwork.",
      },
    ],
    workPhotos: buildMockWorkPhotos("mariama-sowe", [
      {
        src: "/images/categories/painting.jpg",
        caption: "Wall surface painting finish",
      },
    ]),
    avatar: getMockAvatar("mariama-sowe"),
    languages: ["English", "Wolof", "Fula"],
    yearsExperience: 6,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "none",
    status: "published",
    createdAt: "2026-10-10",
    isSample: true,
  },

  // 5. Bakary Jammeh — Mechanic (individual, phone verified)
  {
    id: "mock-pro-5",
    slug: "bakary-jammeh",
    primaryCategorySlug: "mechanics",
    accountType: "individual",
    displayName: "Bakary Jammeh",
    businessName: undefined,
    categories: ["mechanics"],
    baseLocation: "kanifing",
    regularAreas: ["serekunda", "banjul"],
    byArrangementAreas: ["bakau", "fajara"],
    whatsappNumber: "+2200000005",
    callNumber: "+2200000005",
    bio: "I do diagnostic scans, suspension work, brake jobs, and engine servicing. My garage is in the Kanifing area. I have a scanner that reads most Japanese and Korean vehicles. I do not guess — I read the codes first, then I explain what needs to be done and what can wait.",
    services: [
      {
        title: "ECU diagnostic scan",
        description: "Full code readout with explanation of findings.",
      },
      {
        title: "Suspension and bushing replacement",
        description: "Shock absorbers, control arms, tie rods, and ball joints.",
      },
      {
        title: "Brake pads and discs",
        description: "Replacement and resurfacing.",
      },
      {
        title: "Engine service",
        description: "Oil change, filters, belts, and plug replacement.",
      },
    ],
    workPhotos: buildMockWorkPhotos("bakary-jammeh", [
      {
        src: "/images/categories/mechanical.jpg",
        caption: "Vehicle diagnostics and mechanical repair",
      },
    ]),
    avatar: getMockAvatar("bakary-jammeh"),
    languages: ["English", "Wolof", "Mandinka"],
    yearsExperience: 12,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "phone",
    status: "published",
    createdAt: "2026-10-12",
    isSample: true,
  },

  // 6. Adama Sallah — Cleaner (individual, none)
  {
    id: "mock-pro-6",
    slug: "adama-sallah",
    primaryCategorySlug: "cleaning",
    accountType: "individual",
    displayName: "Adama Sallah",
    businessName: undefined,
    categories: ["cleaning"],
    baseLocation: "bijilo",
    regularAreas: ["brusubi", "senegambia-kololi", "kotu"],
    byArrangementAreas: ["fajara", "bakau"],
    whatsappNumber: "+2200000006",
    callNumber: "+2200000006",
    bio: "I specialise in post-construction handover cleaning and deep household cleaning. After builders finish, there is always mortar dust, paint spots, and tile grout to deal with. That is what I do. I also do regular office and home cleaning for clients who want a scheduled service.",
    services: [
      {
        title: "Post-construction handover clean",
        description: "Mortar residue, tile de-hazing, window descaling, and dust extraction.",
      },
      {
        title: "Deep household cleaning",
        description: "Full clean of all rooms, appliances, and surfaces.",
      },
      {
        title: "Upholstery and carpet cleaning",
        description: "Sofa, rugs, and mattress sanitation.",
      },
      {
        title: "Office and commercial cleaning",
        description: "Scheduled daily or weekly service.",
      },
    ],
    workPhotos: buildMockWorkPhotos("adama-sallah", [
      {
        src: "/images/categories/cleaning.jpg",
        caption: "Deep cleaning and sanitation",
      },
    ]),
    avatar: getMockAvatar("adama-sallah"),
    languages: ["English", "Wolof"],
    yearsExperience: 7,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "none",
    status: "published",
    createdAt: "2026-10-15",
    isSample: true,
  },

  // 7. Ndey Touray — Photographer (individual, phone verified)
  {
    id: "mock-pro-7",
    slug: "ndey-touray",
    primaryCategorySlug: "photography",
    accountType: "individual",
    displayName: "Ndey Touray",
    businessName: undefined,
    categories: ["photography"],
    baseLocation: "fajara",
    regularAreas: ["bakau", "kotu", "banjul"],
    byArrangementAreas: ["brikama", "brusubi"],
    whatsappNumber: "+2200000007",
    callNumber: "+2200000007",
    bio: "I photograph properties, construction sites, and events. I started doing real estate work and I still enjoy it — good architectural photos make a real difference when someone is trying to sell or rent. I also do family events and corporate headshots when my schedule allows.",
    services: [
      {
        title: "Real estate and property photography",
        description: "Interior and exterior with perspective correction.",
      },
      {
        title: "Construction progress documentation",
        description: "Scheduled site visits with photo and written log.",
      },
      {
        title: "Corporate headshots",
        description: "Individual and team portraits.",
      },
      {
        title: "Event coverage",
        description: "Naming ceremonies, weddings, and corporate events.",
      },
    ],
    workPhotos: buildMockWorkPhotos("ndey-touray", [
      {
        src: "/images/categories/photography.jpg",
        caption: "Architectural and event photography",
      },
    ]),
    avatar: getMockAvatar("ndey-touray"),
    languages: ["English", "Wolof", "Mandinka"],
    yearsExperience: 8,
    workingHours: undefined,
    confirmsPhone: true,
    verification: "phone",
    status: "published",
    createdAt: "2026-10-18",
    isSample: true,
  },

  // 8. Sunrise Electrical Services — Business (phone verified, 2 categories)
  {
    id: "mock-pro-8",
    slug: "sunrise-electrical-services",
    primaryCategorySlug: "electrical-work",
    accountType: "business",
    displayName: "Sunrise Electrical Services",
    businessName: "Sunrise Electrical Services",
    categories: ["electrical-work", "plumbing"],
    baseLocation: "serekunda",
    regularAreas: ["kanifing", "bakau", "fajara", "kotu"],
    byArrangementAreas: ["brikama", "yundum-lamin"],
    whatsappNumber: "+2200000008",
    callNumber: "+2200000009",
    bio: "We are a small electrical and plumbing team based in Serekunda. We do residential and small commercial work — wiring, solar, borehole pumps, and water tank plumbing. We send one or two people depending on the job. We prefer to visit the site before we start so there are no surprises.",
    services: [
      {
        title: "Electrical installation",
        description: "New builds and extensions, full wiring and breaker panel.",
      },
      {
        title: "Solar and inverter systems",
        description: "Sizing, supply, and installation of off-grid and hybrid systems.",
      },
      {
        title: "Borehole pump installation",
        description: "Submersible pump fitting, cabling, and tank connection.",
      },
      {
        title: "Water tank plumbing",
        description: "Overhead and underground tank piping and valves.",
      },
      {
        title: "Plumbing repairs",
        description: "Leak tracing, pipe replacement, and sanitary fittings.",
      },
    ],
    workPhotos: buildMockWorkPhotos("sunrise-electrical-services", [
      {
        src: "/images/categories/electrical.jpg",
        caption: "Electrical installation",
      },
      {
        src: "/images/categories/plumbing.jpg",
        caption: "Plumbing and pipework installation",
      },
    ]),
    avatar: getMockAvatar("sunrise-electrical-services"),
    languages: ["English", "Wolof"],
    yearsExperience: 5,
    workingHours: "Monday to Saturday, 8am–6pm",
    confirmsPhone: true,
    verification: "phone",
    status: "published",
    createdAt: "2026-10-20",
    isSample: true,
  },
];
