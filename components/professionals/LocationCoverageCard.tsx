import { getLocationLabel } from "@/data/locations";

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
  const getLocationName = (slug: string) => getLocationLabel(slug);

  return (
    <section aria-labelledby="coverage-heading" className="space-y-4 pt-4">
      <h2
        id="coverage-heading"
        className="font-serif font-medium text-2xl tracking-tight text-deep-slate"
      >
        Where {displayName} works
      </h2>

      {/* FUTURE MAP COMPONENT SLOT:
          When district vector maps or interactive SVG boundaries are ready,
          insert the map visualization component here. Keep fallback chip layout below.
      */}
      <div className="hidden" aria-hidden="true">
        {/* Map visualization slot placeholder */}
      </div>

      <div className="space-y-4 pt-1">
        {/* Based in */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block">
            Based in
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-laterite text-white text-xs font-medium">
              {getLocationName(baseLocation)}
            </span>
          </div>
        </div>

        {/* Regular areas */}
        {regularAreas.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block">
              Regular areas
            </span>
            <div className="flex flex-wrap gap-2">
              {regularAreas.map((slug) => (
                <span
                  key={slug}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-laterite-light text-laterite-dark text-xs font-medium"
                >
                  {getLocationName(slug)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* By arrangement */}
        {byArrangementAreas.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block">
              By arrangement
            </span>
            <div className="flex flex-wrap gap-2">
              {byArrangementAreas.map((slug) => (
                <span
                  key={slug}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle bg-transparent text-deep-slate text-xs font-medium"
                >
                  {getLocationName(slug)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend / explanation */}
      <p className="text-xs text-river-silt pt-1 leading-relaxed">
        Solid shows their workshop base, soft shows towns they visit regularly, and outline shows areas available by advance arrangement.
      </p>
    </section>
  );
}
