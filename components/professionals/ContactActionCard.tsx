import { MessageSquare, Phone } from "lucide-react";
import { Professional } from "@/types/professional";
import { Button } from "@/components/common/Button";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import { CATEGORIES } from "@/data/categories";

interface ContactActionCardProps {
  professional: Professional;
}

export function ContactActionCard({ professional }: ContactActionCardProps) {
  const isSample = professional.isSample;

  const firstName = professional.displayName.split(" ")[0];
  const categoryName =
    CATEGORIES.find((c) => c.slug === professional.primaryCategorySlug)
      ?.name ?? professional.primaryCategorySlug;
  const callNumber = professional.callNumber ?? professional.whatsappNumber;
  const languages = professional.languages ?? [];

  const whatsappMessage = encodeURIComponent(
    `Hi ${professional.displayName}, I found you on Jokkoo. I'd like to ask about ${categoryName}. Could you give me a quote?`
  );
  const whatsappUrl = isSample
    ? undefined
    : `https://wa.me/${professional.whatsappNumber}?text=${whatsappMessage}`;
  const phoneUrl = isSample
    ? undefined
    : `tel:${callNumber.replace(/\s+/g, "")}`;

  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 shadow-sm space-y-6 sticky top-28">
      <div>
        <span className="text-[10px] uppercase tracking-wider text-river-silt font-semibold block mb-1">
          Direct Contact
        </span>
        <h3 className="text-lg font-bold text-deep-slate">
          Connect with {firstName}
        </h3>
        <p className="text-xs text-river-silt mt-1">
          Agree the scope and price directly with {firstName}.
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-3">
        {isSample ? (
          <div className="space-y-2">
            <span
              role="button"
              aria-disabled="true"
              className="w-full flex items-center justify-center rounded-full bg-laterite/40 px-4 py-2.5 text-xs font-semibold text-warm-bone/60 cursor-not-allowed min-h-[44px] gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </span>
            <span
              role="button"
              aria-disabled="true"
              className="w-full flex items-center justify-center rounded-full border border-border-subtle bg-sand-dune/40 px-4 py-2 text-xs font-medium text-river-silt/60 cursor-not-allowed min-h-[44px] gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </span>
            <p className="text-[11px] text-river-silt text-center">
              Sample profile: contact is disabled
            </p>
          </div>
        ) : (
          <>
            <Button
              href={whatsappUrl}
              isExternal
              variant="primary"
              size="lg"
              className="w-full justify-center bg-laterite hover:bg-laterite-dark text-white gap-2 font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </Button>

            <Button
              href={phoneUrl}
              isExternal
              variant="secondary"
              size="md"
              className="w-full justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call {callNumber}</span>
            </Button>
          </>
        )}
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div className="border-t border-border-subtle pt-4 text-xs text-river-silt">
          <div className="flex items-center justify-between">
            <span className="text-deep-slate font-medium">Languages:</span>
            <span>{languages.join(", ")}</span>
          </div>
        </div>
      )}

      {/* Verification Transparency Notice */}
      <div className="rounded-[2px] bg-sand-dune/60 border border-border-subtle p-3.5 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-deep-slate">
          {professional.verification === "phone" ? (
            <VerificationBadge level="phone" />
          ) : (
            <span>Phone not yet confirmed</span>
          )}
        </div>
        <p className="text-[11px] text-river-silt leading-relaxed">
          Phone verified means we confirmed the number belongs to the person who
          registered. It is not a check of identity, qualifications or
          workmanship.
        </p>
      </div>
    </div>
  );
}
