import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { LocationCoverage } from "@/types/professional";

interface LocationCoverageCardProps {
  coverage: LocationCoverage;
}

export function LocationCoverageCard({ coverage }: LocationCoverageCardProps) {
  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-laterite" />
        <h3 className="text-base font-bold text-deep-slate">
          Location & Service Coverage
        </h3>
      </div>

      <p className="text-xs text-river-silt leading-relaxed">
        To maintain punctuality and reliable project delivery, this professional operates within the specific Gambian districts listed below.
      </p>

      {/* Primary Workshop / Base */}
      <div className="p-3 rounded-[2px] bg-sand-dune/40 border border-border-subtle text-xs">
        <span className="font-semibold text-deep-slate block mb-0.5">
          Primary Workshop / Base:
        </span>
        <span className="text-river-silt">
          {coverage.baseLocation}, The Gambia
        </span>
      </div>

      {/* Confirmed Service Towns */}
      <div>
        <span className="text-xs font-semibold text-deep-slate block mb-2">
          Confirmed Coverage Towns:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {coverage.coverageAreas.map((area) => (
            <span
              key={area}
              className="px-2.5 py-1 rounded-[2px] bg-sand-dune text-xs font-medium text-deep-slate border border-border-subtle flex items-center gap-1"
            >
              <Navigation className="h-3 w-3 text-laterite" />
              <span>{area}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Territory Boundary Note */}
      <div className="flex items-start gap-2 pt-2 text-xs text-river-silt">
        <AlertCircle className="h-3.5 w-3.5 text-river-silt shrink-0 mt-0.5" />
        <span className="italic leading-tight">{coverage.serviceRadiusNote}</span>
      </div>
    </div>
  );
}
