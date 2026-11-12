import { MessageSquare, Phone } from "lucide-react";
import { Professional } from "@/types/professional";
import { Button } from "@/components/common/Button";
import { VerificationBadge } from "@/components/common/VerificationBadge";

interface ContactActionCardProps {
  professional: Professional;
}

export function ContactActionCard({ professional }: ContactActionCardProps) {
  const isSample = professional.isSample;

  const firstName = professional.name.split(" ")[0];
  const whatsappMessage = encodeURIComponent(
    `Hi ${professional.name}, I found you on Jokkoo. I'd like to ask about ${professional.profession}. Could you give me a quote?`
  );
  const whatsappUrl = isSample
    ? undefined
    : `https://wa.me/${professional.whatsappNumber}?text=${whatsappMessage}`;
  const phoneUrl = isSample
    ? undefined
    : `tel:${professional.phone.replace(/\s+/g, "")}`;

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
          <div className="rounded-[2px] bg-sand-dune border border-border-subtle p-4 text-center text-xs text-river-silt">
            Contact is available on real profiles.
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
              <span>Call {professional.phone}</span>
            </Button>
          </>
        )}
      </div>

      {/* Languages */}
      <div className="border-t border-border-subtle pt-4 text-xs text-river-silt">
        <div className="flex items-center justify-between">
          <span className="text-deep-slate font-medium">Languages:</span>
          <span>{professional.languages.join(", ")}</span>
        </div>
      </div>

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
          Phone verified means we confirmed the number belongs to the person who registered. It is not a check of identity, qualifications or workmanship.
        </p>
      </div>
    </div>
  );
}
