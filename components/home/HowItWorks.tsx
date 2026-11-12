import { Search, ShieldCheck, MessageSquareCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Find Trade by Location",
      description:
        "Search by specific service and select your neighborhood in The Gambia. Each professional clearly indicates the exact areas they cover.",
    },
    {
      step: "02",
      icon: ShieldCheck,
      title: "Inspect Credentials & Rates",
      description:
        "Review verified government ID checks, authentic client reviews, previous portfolio photographs, and realistic Dalasi price estimates.",
    },
    {
      step: "03",
      icon: MessageSquareCheck,
      title: "Contact Directly via WhatsApp",
      description:
        "Call or send a pre-filled WhatsApp message directly to the artisan. Discuss your requirements and agree on schedule with zero platform fees.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border-subtle bg-warm-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-slate mt-1">
            How Jokkoo Works
          </h2>
          <p className="text-sm text-river-silt mt-2">
            No complicated apps or opaque escrow hurdles. Just verified artisans and transparent direct communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-6 rounded-[3px] border border-border-subtle bg-sand-dune/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-11 w-11 flex items-center justify-center rounded-[2px] bg-sand-dune border border-border-subtle text-deep-slate">
                    <item.icon className="h-5 w-5 text-laterite" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-river-silt/30">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-deep-slate mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-river-silt leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/60 text-[11px] text-river-silt font-medium">
                Direct Contact • Transparent Pricing
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
