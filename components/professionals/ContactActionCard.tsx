"use client";

import { MessageSquare, Phone, ShieldCheck, Clock, AlertCircle } from "lucide-react";
import { Professional } from "@/types/professional";
import { Button } from "@/components/common/Button";

interface ContactActionCardProps {
  professional: Professional;
}

export function ContactActionCard({ professional }: ContactActionCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello ${professional.name}, I found your verified profile on Jokkoo and would like to inquire about your services in The Gambia.`
  );
  const whatsappUrl = `https://wa.me/${professional.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 shadow-sm space-y-6 sticky top-28">
      <div>
        <span className="text-[10px] uppercase tracking-wider text-river-silt font-semibold block mb-1">
          Direct Contact
        </span>
        <h3 className="text-lg font-bold text-deep-slate">
          Connect with {professional.name.split(" ")[0]}
        </h3>
        <p className="text-xs text-river-silt mt-1">
          Zero platform commission. Speak directly with the artisan to agree on scope, timing, and Dalasi pricing.
        </p>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-3">
        {/* WhatsApp Button */}
        <Button
          href={whatsappUrl}
          isExternal
          variant="primary"
          size="lg"
          className="w-full justify-center bg-[#1E7E34] hover:bg-[#155724] text-white gap-2 font-medium"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Chat on WhatsApp</span>
        </Button>

        {/* Phone Call Button */}
        <Button
          href={`tel:${professional.phone.replace(/\s+/g, "")}`}
          isExternal
          variant="secondary"
          size="md"
          className="w-full justify-center gap-2"
        >
          <Phone className="h-4 w-4" />
          <span>Call {professional.phone}</span>
        </Button>
      </div>

      {/* Availability Status */}
      <div className="space-y-2 border-t border-border-subtle pt-4 text-xs text-river-silt">
        <div className="flex items-center justify-between">
          <span className="text-deep-slate font-medium">Availability:</span>
          <span className="text-laterite font-semibold">{professional.availabilityStatus}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-deep-slate font-medium">Response Time:</span>
          <span>Under 1 hour on WhatsApp</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-deep-slate font-medium">Languages:</span>
          <span>{professional.languages.join(", ")}</span>
        </div>
      </div>

      {/* Verification Transparency Disclaimer */}
      <div className="rounded-[2px] bg-sand-dune/60 border border-border-subtle p-3.5 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-deep-slate">
          <ShieldCheck className="h-4 w-4 text-laterite shrink-0" />
          <span>{professional.verification.badgeText}</span>
        </div>
        <p className="text-[11px] text-river-silt leading-relaxed">
          {professional.verification.disclaimer}
        </p>
        <div className="text-[10px] text-river-silt/70 pt-1 border-t border-border-subtle/60">
          Verified on: {professional.verification.verifiedDate} via {professional.verification.verificationType}
        </div>
      </div>
    </div>
  );
}
