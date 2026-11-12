export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Search",
      description: "Pick a trade and an area.",
    },
    {
      num: "2",
      title: "Look at the work",
      description:
        "Check photos, services, where they cover, and whether their ID is verified.",
    },
    {
      num: "3",
      title: "Say hello",
      description:
        "Message them on WhatsApp or call. You deal with them directly.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-warm-bone border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col">
              <span className="font-serif text-6xl lg:text-7xl font-bold text-sand-dune select-none">
                {step.num}
              </span>
              <h3 className="font-serif text-2xl text-deep-slate mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-base text-river-silt leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
