import { Compass, ShieldCheck, PhoneCall, Check } from "lucide-react";

export function ArchitecturalBlueprintHowItWorks() {
  const axes = [
    {
      numeral: "AXIS 01",
      title: "Geographic Calibration",
      icon: Compass,
      description:
        "Locate artisans by verified territory. In The Gambia, reliable execution requires realistic travel boundaries. Each master lists their actual base and confirmed coverage towns.",
      details: [
        "Filter by specific Gambian towns",
        "Clear travel boundary disclosures",
        "Zero misleading nationwide claims",
      ],
    },
    {
      numeral: "AXIS 02",
      title: "Identity Verification Protocol",
      icon: ShieldCheck,
      description:
        "Jokkoo administrators manually verify government-issued identification and operational base. Verification confirms identity—it does not substitute for customer diligence.",
      details: [
        "National ID or Passport checked",
        "Operational base validated",
        "Does not guarantee workmanship",
      ],
    },
    {
      numeral: "AXIS 03",
      title: "Direct Unmediated Commerce",
      icon: PhoneCall,
      description:
        "Connect directly on WhatsApp or voice call. Agree on project scope, delivery timeline, and transparent Dalasi pricing without platform commissions or locked messaging.",
      details: [
        "Direct artisan WhatsApp link",
        "Pre-filled project inquiry text",
        "Zero platform booking cuts",
      ],
    },
  ];

  return (
    <section className="w-full border-b border-border-subtle bg-warm-bone py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-6 mb-12 space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-laterite font-semibold">
            Operational Blueprint • Marketplace Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-deep-slate">
            How the Jokkoo protocol operates.
          </h2>
          <p className="text-sm text-river-silt max-w-2xl leading-relaxed">
            Designed for transparent human connection without unnecessary technological complexity or extractive platform fees.
          </p>
        </div>

        {/* Blueprint 3-Column Structural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border-subtle rounded-[2px] bg-sand-dune/20 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          {axes.map((axis) => (
            <div
              key={axis.numeral}
              className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-warm-bone transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <span className="font-mono text-xs font-bold text-laterite tracking-widest">
                    {axis.numeral}
                  </span>
                  <axis.icon className="h-4 w-4 text-deep-slate" />
                </div>

                <h3 className="text-lg font-bold text-deep-slate">
                  {axis.title}
                </h3>

                <p className="text-xs text-river-silt leading-relaxed">
                  {axis.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-border-subtle/60 text-xs">
                {axis.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-river-silt">
                    <Check className="h-3.5 w-3.5 text-laterite shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
