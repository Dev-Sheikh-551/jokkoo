import { Check, Clock, Tag } from "lucide-react";
import { ServiceOffering } from "@/types/professional";

interface ServicesListProps {
  services: ServiceOffering[];
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-6">
      <div>
        <h3 className="text-base font-bold text-deep-slate">
          Services Offered & Estimated Rates
        </h3>
        <p className="text-xs text-river-silt mt-1">
          Standard rates in Gambian Dalasi (GMD). Exact quotes may vary depending on material costs and site inspection.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 rounded-[2px] border border-border-subtle bg-sand-dune/20 hover:border-deep-slate/30 transition-colors space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-deep-slate flex items-start gap-2">
                <Check className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
                <span>{service.title}</span>
              </h4>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-sand-dune border border-border-subtle text-xs font-semibold text-deep-slate shrink-0 self-start sm:self-auto">
                <Tag className="h-3 w-3 text-laterite" />
                <span>{service.priceEstimate}</span>
              </div>
            </div>

            <p className="text-xs text-river-silt pl-6 leading-relaxed">
              {service.description}
            </p>

            {service.durationEstimate && (
              <div className="flex items-center gap-1 text-[11px] text-river-silt pl-6">
                <Clock className="h-3 w-3 text-river-silt/70" />
                <span>Typical timeframe: {service.durationEstimate}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
