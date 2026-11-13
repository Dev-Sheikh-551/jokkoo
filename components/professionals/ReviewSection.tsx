import { MessageCircle } from "lucide-react";
import { Review } from "@/types/professional";

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h3 className="text-base font-bold text-deep-slate flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-laterite" />
            <span>Client Reviews</span>
          </h3>
          <p className="text-xs text-river-silt mt-1">
            Feedback from homeowners, diaspora property managers, and businesses.
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="py-8 text-center text-sm text-river-silt">
          No reviews yet. Reviews appear here once a client leaves one.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-[2px] border border-border-subtle bg-sand-dune/20 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-deep-slate">
                    {rev.author}
                  </span>
                </div>
                <span className="text-[11px] text-river-silt">{rev.date}</span>
              </div>

              <div className="text-[11px] text-river-silt">
                Service: <strong>{rev.serviceRendered}</strong>
              </div>

              <p className="text-xs text-deep-slate/90 leading-relaxed italic pt-1">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
