interface ServiceItem {
  title: string;
  description?: string;
}

interface ServicesListProps {
  services: ServiceItem[];
}

export function ServicesList({ services }: ServicesListProps) {
  if (!services || services.length === 0) return null;

  return (
    <section aria-labelledby="services-heading" className="space-y-4 pt-4">
      <h2
        id="services-heading"
        className="font-serif text-2xl font-bold tracking-tight text-deep-slate"
      >
        Services
      </h2>

      <div className="divide-y divide-border-subtle border-y border-border-subtle">
        {services.map((service, i) => (
          <div key={service.title + i} className="py-4 space-y-1">
            <h3 className="text-base font-semibold text-deep-slate leading-snug">
              {service.title}
            </h3>
            {service.description && (
              <p className="text-sm text-river-silt leading-relaxed max-w-2xl">
                {service.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
