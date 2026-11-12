import { Star, MessageCircle, ShieldCheck } from "lucide-react";
import { Review } from "@/types/professional";

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewSection({
  reviews,
  rating,
  reviewCount,
}: ReviewSectionProps) {
  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h3 className="text-base font-bold text-deep-slate flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-laterite" />
            <span>Client Reviews & Ratings</span>
          </h3>
          <p className="text-xs text-river-silt mt-1">
            Feedback from verified homeowners, diaspora property managers, and businesses.
          </p>
        </div>

        {/* Rating Summary Pill */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-[2px] bg-sand-dune border border-border-subtle self-start sm:self-auto">
          <div className="flex items-center gap-1 text-base font-bold text-deep-slate">
            <Star className="h-4 w-4 fill-[#C29B38] text-[#C29B38]" />
            <span>{rating.toFixed(2)}</span>
          </div>
          <div className="h-4 w-[1px] bg-border-subtle" />
          <span className="text-xs text-river-silt font-medium">
            Based on {reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-[2px] border border-border-subtle bg-sand-dune/20 space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-deep-slate">{rev.author}</span>
                <span className="text-river-silt/60">•</span>
                <span className="text-river-silt">{rev.clientType} ({rev.location})</span>
              </div>
              <span className="text-[11px] text-river-silt">{rev.date}</span>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rev.rating
                      ? "fill-[#C29B38] text-[#C29B38]"
                      : "text-border-subtle"
                  }`}
                />
              ))}
              <span className="text-[11px] text-river-silt ml-2">
                Service: <strong>{rev.serviceRendered}</strong>
              </span>
            </div>

            <p className="text-xs text-deep-slate/90 leading-relaxed italic pt-1">
              &ldquo;{rev.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
