import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface ChapterItem {
  number: string;
  categorySlug: string;
  title: string;
  culturalContext: string;
  keyMaterials: string[];
  imageUrl: string;
  imageAlt: string;
  proCount: number;
}

const CHAPTERS: ChapterItem[] = [
  {
    number: "CHAPTER 01",
    categorySlug: "carpentry",
    title: "Structural Timber & Architectural Joinery",
    culturalContext:
      "Crafting doors, timber trusses, and fitted cabinetry capable of outlasting the intense moisture shifts of the coastal Gambian rainy season and the dry Harmattan winds.",
    keyMaterials: ["West African Mahogany", "Teak", "Kiln-Dried Hardwood", "Brass Pivots"],
    imageUrl:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Master joiner shaping seasoned timber on a bench",
    proCount: 12,
  },
  {
    number: "CHAPTER 02",
    categorySlug: "electrical-work",
    title: "Power Matrices & Hybrid Solar Grids",
    culturalContext:
      "Designing resilient electrical backbones that seamlessly automate transitions between NAWEC grid power, lithium battery reserves, and quiet standby generators.",
    keyMaterials: ["Pure Copper Busbars", "High-Voltage DC Relays", "LiFePO4 Storage", "Surge Suppressors"],
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Electrician wiring high-capacity distribution breaker",
    proCount: 18,
  },
  {
    number: "CHAPTER 03",
    categorySlug: "tailoring",
    title: "Ceremonial Textile & Haute Couture",
    culturalContext:
      "Centuries of Senegambian tailoring heritage expressed through hand-guided Grand Boubou embroidery, tailored breathable linen safari suits, and bespoke wedding ensembles.",
    keyMaterials: ["Bazin Riche", "Belgian Linen", "Metallic Embroidery Thread", "Mother-of-Pearl"],
    imageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Tailor executing high-density geometric embroidery",
    proCount: 16,
  },
  {
    number: "CHAPTER 04",
    categorySlug: "plumbing",
    title: "Borehole Hydraulics & Water Pressure Systems",
    culturalContext:
      "Deep borehole submersible pump installations, overhead tank automation, and non-corrosive PPR piping engineered specifically for coastal saline groundwater.",
    keyMaterials: ["PPR Fusion Pipes", "Submersible Motors", "Automatic Float Relays", "Brass Non-Return Valves"],
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Plumbing technician installing pressure manifold",
    proCount: 14,
  },
  {
    number: "CHAPTER 05",
    categorySlug: "painting",
    title: "Architectural Surface Finishes & Masonry Defense",
    culturalContext:
      "Formulating exterior silicone acrylic shields, anti-efflorescence primers, and trowel-on textured stone finishes that protect building envelopes from coastal salt weathering.",
    keyMaterials: ["Silicone Damp Primers", "Elastomeric Acrylics", "Venetian Plaster", "UV-Resistant Pigments"],
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Architectural surface finisher applying clean exterior coating",
    proCount: 9,
  },
  {
    number: "CHAPTER 06",
    categorySlug: "mechanics",
    title: "Automotive Diagnostics & 4x4 Suspension Systems",
    culturalContext:
      "ECU sensor fault diagnosis, engine timing rebuilds, and heavy-duty suspension overhauls calibrated for the unpaved sandy and laterite road conditions across The Gambia.",
    keyMaterials: ["OBD2 Diagnostic Scanners", "Heavy-Duty Shock Absorbers", "Polyurethane Bushings", "Calibrated Torque Tools"],
    imageUrl:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Mechanic inspecting 4x4 suspension assembly",
    proCount: 11,
  },
];

export function EditorialChapters() {
  return (
    <section className="w-full border-b border-border-subtle bg-warm-bone py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-laterite font-semibold flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" />
              <span>The Trade Folios • Curated Disciplines</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-deep-slate">
              Editorial trade chapters.
            </h2>
            <p className="text-sm text-river-silt max-w-2xl leading-relaxed">
              Every trade on Jokkoo is treated as an essential discipline. Explore the specific materials, local climatic challenges, and verified masters who practice them.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-laterite hover:text-laterite-dark transition-colors self-start md:self-auto border-b border-laterite pb-0.5"
          >
            <span>Review All 9 Trade Disciplines</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* The Broadside Chapter Grid */}
        <div className="space-y-10">
          {CHAPTERS.map((ch) => (
            <div
              key={ch.number}
              className="border border-border-subtle bg-sand-dune/20 rounded-[2px] p-6 sm:p-8 hover:border-deep-slate/40 transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Chapter Info & Provenance (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2">
                    <span className="text-xs font-mono font-bold tracking-widest text-laterite uppercase">
                      {ch.number}
                    </span>
                    <span className="text-[11px] font-mono text-river-silt">
                      {ch.proCount} Verified Practitioners
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-deep-slate tracking-tight">
                    {ch.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-river-silt leading-relaxed">
                    {ch.culturalContext}
                  </p>

                  {/* Material Disciplines Tags */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-deep-slate block mb-2 font-semibold">
                      Essential Materials & Diagnostics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ch.keyMaterials.map((mat) => (
                        <span
                          key={mat}
                          className="px-2 py-0.5 rounded-[2px] bg-warm-bone border border-border-subtle text-[11px] font-medium text-deep-slate"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Link */}
                  <div className="pt-4">
                    <Link
                      href={`/explore?category=${ch.categorySlug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-deep-slate hover:bg-laterite text-warm-bone text-xs font-semibold tracking-wider uppercase transition-colors"
                    >
                      <span>Consult Chapter Artisans</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right: Documentary Photo Plate (5 Cols) */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune">
                    <Image
                      src={ch.imageUrl}
                      alt={ch.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[2px] bg-deep-slate/85 text-warm-bone font-mono text-[9px] uppercase tracking-wider">
                      Plate {ch.number.split(" ")[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
