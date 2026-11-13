import { MapPin, Navigation } from "lucide-react";

interface LocationCoverageCardProps {
  displayName: string;
  baseLocation: string;
  regularAreas?: string[];
  byArrangementAreas?: string[];
}

export function LocationCoverageCard({
  displayName,
  baseLocation,
  regularAreas = [],
  byArrangementAreas = [],
}: LocationCoverageCardProps) {
  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-laterite" />
        <h3 className="text-base font-bold text-deep-slate">
          Where {displayName} works
        </h3>
      </div>

      <p className="text-xs text-river-silt leading-relaxed">
        To maintain punctuality and reliable project delivery, this professional
        operates within the specific Gambian districts listed below.
      </p>

      {/* Primary Workshop / Base */}
      <div className="p-3 rounded-[2px] bg-sand-dune/40 border border-border-subtle text-xs">
        <span className="font-semibold text-deep-slate block mb-0.5">
          Primary Workshop / Base:
        </span>
        <span className="text-river-silt">{baseLocation}, The Gambia</span>
      </div>

      {/* Regular areas */}
      {regularAreas.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-deep-slate block mb-2">
            Regular areas
          </span>
          <div className="flex flex-wrap gap-1.5">
            {regularAreas.map((area) => (
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
      )}

      {/* By arrangement areas */}
      {byArrangementAreas.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-deep-slate block mb-2">
            By arrangement
          </span>
          <div className="flex flex-wrap gap-1.5">
            {byArrangementAreas.map((area) => (
              <span
                key={area}
                className="px-2.5 py-1 rounded-[2px] bg-sand-dune/40 text-xs text-deep-slate border border-border-subtle"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-river-silt italic">
        Illustrative area names. Real district boundaries come with the build.
      </p>
    </div>
  );
}
