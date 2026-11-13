import { Check } from "lucide-react";

interface ServiceItem {
  title: string;
  description?: string;
}

interface ServicesListProps {
  services: ServiceItem[];
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-6">
      <div>
        <h3 className="text-base font-bold text-deep-slate">Services</h3>
      </div>

      <div className="space-y-4">
        {services.map((service, i) => (
          <div
            key={service.title + i}
            className="p-4 rounded-[2px] border border-border-subtle bg-sand-dune/20 hover:border-deep-slate/30 transition-colors space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-deep-slate flex items-start gap-2">
                <Check className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <span>{service.title}</span>
              </h4>
            </div>

            {service.description && (
              <p className="text-xs text-river-silt pl-6 leading-relaxed">
                {service.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
