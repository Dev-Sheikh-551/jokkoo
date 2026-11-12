"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Info } from "lucide-react";

interface SwatchPhase {
  id: "raw" | "process" | "result";
  phaseNumber: string;
  phaseLabel: string;
  stageTitle: string;
  description: string;
  imageUrl: string;
  technicalNote: string;
}

interface CraftTrack {
  id: string;
  title: string;
  tradeLabel: string;
  territory: string;
  artisanName: string;
  proSlug: string;
  labourEstimate: string;
  phases: SwatchPhase[];
}

const CRAFT_TRACKS: CraftTrack[] = [
  {
    id: "joinery",
    title: "Structural Timber & Architectural Joinery",
    tradeLabel: "Hardwood Millwork",
    territory: "Bakau & Coastal Corridor",
    artisanName: "Pa Ousman Sowe",
    proSlug: "ousman-sowe-master-carpenter",
    labourEstimate: "GMD 18,000 – GMD 35,000",
    phases: [
      {
        id: "raw",
        phaseNumber: "PHASE 01",
        phaseLabel: "Raw Provenance",
        stageTitle: "Kiln-Dried West African Mahogany & Teak",
        description:
          "Selecting dense, seasoned timber planks naturally resistant to coastal Atlantic humidity and dry Harmattan winds. Grain patterns are matched by hand prior to cutting.",
        imageUrl:
          "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Moisture content calibrated to <12% to prevent door warp in rainy season.",
      },
      {
        id: "process",
        phaseNumber: "PHASE 02",
        phaseLabel: "The Bench Process",
        stageTitle: "Hand-Planed Mortise & Tenon Joinery",
        description:
          "Precision traditional joinery executed on the Bakau workshop bench. Steel irons shave timber to within tenths of a millimetre, ensuring structural rigidity without nails.",
        imageUrl:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "High-density hide glue and teak dowels driven under mechanical pressure.",
      },
      {
        id: "result",
        phaseNumber: "PHASE 03",
        phaseLabel: "The Finished Space",
        stageTitle: "Bespoke Hardwood Pivot Door & Living Space",
        description:
          "Fitted entrance architecture installed at a private residential villa in Cape Point, Bakau. Hand-rubbed with Danish oils and marine wax for generational longevity.",
        imageUrl:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Multi-point perimeter seal fitted to withstand driving coastal rains.",
      },
    ],
  },
  {
    id: "solar",
    title: "Solar Matrices & Hybrid Electrical Storage",
    tradeLabel: "Clean Power Engineering",
    territory: "Kanifing, Fajara & Brusubi",
    artisanName: "Modou Camara",
    proSlug: "modou-camara-solar-electrical",
    labourEstimate: "GMD 12,000 – GMD 28,000",
    phases: [
      {
        id: "raw",
        phaseNumber: "PHASE 01",
        phaseLabel: "Raw Provenance",
        stageTitle: "High-Purity Copper Conductors & DC Breakers",
        description:
          "Industrial-gauge pure copper flex cabling and specialized high-rupture DC breakers rated for intense West African tropical heat and continuous photovoltaic loads.",
        imageUrl:
          "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Double-insulated UV-resistant solar conductors rated to 1000V DC.",
      },
      {
        id: "process",
        phaseNumber: "PHASE 02",
        phaseLabel: "The Bench Process",
        stageTitle: "Precision Conduit Routing & Inverter Calibration",
        description:
          "Routing insulated PVC trunking, configuring automatic changeover relays between NAWEC grid power and battery storage, and setting lithium charge limits.",
        imageUrl:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Tested with thermal imaging to ensure zero resistance hotspots.",
      },
      {
        id: "result",
        phaseNumber: "PHASE 03",
        phaseLabel: "The Finished Space",
        stageTitle: "Uninterrupted Coastal Power Architecture",
        description:
          "A 10kVA hybrid solar system powering refrigeration, air conditioning, and water pumping without noisy generator fumes during grid outages.",
        imageUrl:
          "https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Automated sub-5-millisecond transfer prevents electronics reset.",
      },
    ],
  },
  {
    id: "couture",
    title: "Bespoke Couture & Ceremonial Embroidery",
    tradeLabel: "Master Garment Design",
    territory: "Serekunda & Greater Banjul",
    artisanName: "Mariama Bah",
    proSlug: "mariama-bah-bespoke-couture",
    labourEstimate: "GMD 4,500 – GMD 9,000",
    phases: [
      {
        id: "raw",
        phaseNumber: "PHASE 01",
        phaseLabel: "Raw Provenance",
        stageTitle: "Hand-Dyed Bazin Riche & Belgian Linen",
        description:
          "Imported high-luster Bazin Riche fabric and breathable linen bolts inspected under natural light for thread consistency, dye depth, and crisp hand-feel.",
        imageUrl:
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Fabric cold-ironed and pre-shrunk before pattern drafting.",
      },
      {
        id: "process",
        phaseNumber: "PHASE 02",
        phaseLabel: "The Bench Process",
        stageTitle: "Hand-Guided Precision Needlework",
        description:
          "Chalk-drafted geometric neckline motifs embroidered with continuous metallic thread using seasoned treadle and electronic machines in Serekunda.",
        imageUrl:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Over 40,000 interlocking stitches per ceremonial collar.",
      },
      {
        id: "result",
        phaseNumber: "PHASE 03",
        phaseLabel: "The Finished Space",
        stageTitle: "Ceremonial Dignity & Unflawed Fit",
        description:
          "The completed Grand Boubou ensemble worn at formal celebrations. Flowing drape, reinforced inner collar canvas, and zero fabric puckering.",
        imageUrl:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
        technicalNote: "Crafted to retain sharp structural creases through humid evenings.",
      },
    ],
  },
];

export function TactileSwatchReveal() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const currentTrack = CRAFT_TRACKS[selectedTrackIndex];
  const activePhase = currentTrack.phases[activePhaseIndex];

  return (
    <section className="w-full border-b border-border-subtle bg-sand-dune/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: The Monograph Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 mb-10 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-laterite font-semibold flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" />
              <span>Signature Interaction • The Material Journey</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-deep-slate">
              From raw provenance to finished space.
            </h2>
            <p className="text-sm text-river-silt max-w-2xl leading-relaxed">
              Jokkoo honours the physical reality of craft. Explore how unseasoned raw materials are shaped by verified Gambian master hands into finished architectural living spaces.
            </p>
          </div>

          {/* Craft Switcher Tabs */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            {CRAFT_TRACKS.map((track, idx) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setSelectedTrackIndex(idx);
                  setActivePhaseIndex(0);
                }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all ${
                  selectedTrackIndex === idx
                    ? "bg-deep-slate text-warm-bone shadow-xs"
                    : "bg-warm-bone border border-border-subtle text-river-silt hover:text-deep-slate hover:bg-sand-dune/50"
                }`}
              >
                {track.tradeLabel}
              </button>
            ))}
          </div>
        </div>

        {/* The Tactile Swatch Showcase Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Visual Plate: Morphing Photographic Layer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune shadow-sm">
              <Image
                key={`${currentTrack.id}-${activePhase.id}`}
                src={activePhase.imageUrl}
                alt={activePhase.stageTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-opacity duration-300 animate-in fade-in-50"
              />

              {/* Dynamic Coordinate Stamps on Photo */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-deep-slate/90 backdrop-blur-xs text-warm-bone font-mono text-[10px] tracking-wider uppercase border border-white/10">
                {activePhase.phaseNumber} • {activePhase.phaseLabel}
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-[2px] bg-warm-bone/90 backdrop-blur-xs text-deep-slate font-mono text-[10px] tracking-wider uppercase border border-border-subtle">
                {currentTrack.territory}
              </div>

              {/* Technical Caption Box */}
              <div className="absolute bottom-3 inset-x-3 p-3 rounded-[2px] bg-deep-slate/90 backdrop-blur-xs text-warm-bone border border-white/10 text-xs flex items-start gap-2.5">
                <Info className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight text-warm-bone/90">
                  <strong className="text-warm-bone font-medium">Specification: </strong>
                  {activePhase.technicalNote}
                </div>
              </div>
            </div>

            {/* Tactile Phase Switcher: Tap-Friendly Pills */}
            <div className="grid grid-cols-3 gap-2">
              {currentTrack.phases.map((phase, pIdx) => {
                const isActive = activePhaseIndex === pIdx;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActivePhaseIndex(pIdx)}
                    className={`p-3 text-left rounded-[2px] border transition-all ${
                      isActive
                        ? "bg-warm-bone border-laterite ring-1 ring-laterite shadow-xs"
                        : "bg-warm-bone/60 border-border-subtle hover:bg-warm-bone text-river-silt"
                    }`}
                  >
                    <span
                      className={`block text-[10px] font-mono tracking-wider uppercase ${
                        isActive ? "text-laterite font-semibold" : "text-river-silt/70"
                      }`}
                    >
                      {phase.phaseNumber}
                    </span>
                    <span
                      className={`block text-xs font-semibold mt-0.5 leading-snug ${
                        isActive ? "text-deep-slate" : "text-river-silt"
                      }`}
                    >
                      {phase.phaseLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Narrative Dossier: Technical Specification Sheet (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[2px] border border-border-subtle bg-warm-bone p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <span className="text-xs uppercase font-mono tracking-widest text-laterite font-semibold">
                  Archival Craft Dossier
                </span>
                <span className="text-[11px] font-mono text-river-silt">
                  Ref: {currentTrack.id.toUpperCase()}-GM
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-deep-slate leading-snug">
                {activePhase.stageTitle}
              </h3>

              <p className="text-xs sm:text-sm text-river-silt leading-relaxed">
                {activePhase.description}
              </p>

              {/* Technical Spec Matrix */}
              <div className="space-y-2 border-t border-border-subtle pt-4 text-xs">
                <div className="flex justify-between py-1 border-b border-border-subtle/50">
                  <span className="text-river-silt">Master Practitioner:</span>
                  <span className="font-semibold text-deep-slate">{currentTrack.artisanName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle/50">
                  <span className="text-river-silt">Workshop Base:</span>
                  <span className="font-semibold text-deep-slate">{currentTrack.territory}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border-subtle/50">
                  <span className="text-river-silt">Typical Labour Band:</span>
                  <span className="font-mono font-semibold text-deep-slate">
                    {currentTrack.labourEstimate}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-river-silt">Identity Verification:</span>
                  <span className="text-laterite font-medium">Checked by Jokkoo Admin</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href={`/professionals/${currentTrack.proSlug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[2px] bg-laterite hover:bg-laterite-dark text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <span>Inspect Full Portfolio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <span className="text-[11px] text-river-silt font-mono">
                Direct WhatsApp • Zero Commission
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
