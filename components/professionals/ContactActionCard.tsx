"use client";

import { MessageSquare, Phone } from "lucide-react";
import { Professional } from "@/types/professional";
import { Button } from "@/components/common/Button";

interface ContactActionCardProps {
  professional: Professional;
  onContact?: (kind: "whatsapp" | "call") => void;
}

export function ContactActionCard({
  professional,
  onContact = () => {},
}: ContactActionCardProps) {
  const isSample = professional.isSample;
  const firstName = professional.displayName.split(" ")[0];
  const callNumber = professional.callNumber ?? professional.whatsappNumber;

  const whatsappMessage = encodeURIComponent(
    `Hi ${professional.displayName}, I found you on Jokkoo. I'd like to ask about your services. Could you give me a quote?`
  );
  const whatsappUrl = isSample
    ? undefined
    : `https://wa.me/${professional.whatsappNumber}?text=${whatsappMessage}`;
  const phoneUrl = isSample
    ? undefined
    : `tel:${callNumber.replace(/\s+/g, "")}`;

  return (
    <div className="rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-white p-6 sm:p-7 shadow-xs space-y-6 sticky top-6">
      <div>
        <h3 className="font-serif text-2xl font-bold tracking-tight text-deep-slate">
          Contact {firstName}
        </h3>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-3">
        {isSample ? (
          <div className="space-y-2.5">
            <button
              type="button"
              aria-disabled="true"
              onClick={() => onContact("whatsapp")}
              className="w-full flex items-center justify-center rounded-full bg-laterite px-6 py-3 text-sm font-semibold text-white cursor-not-allowed opacity-60 min-h-[44px] gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              aria-disabled="true"
              onClick={() => onContact("call")}
              className="w-full flex items-center justify-center rounded-full border border-border-subtle bg-transparent px-6 py-2.5 text-sm font-semibold text-deep-slate cursor-not-allowed opacity-60 min-h-[44px] gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
            <p className="text-[11px] text-river-silt text-center pt-0.5">
              Sample profile: contact is disabled
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <Button
              href={whatsappUrl}
              isExternal
              variant="primary"
              size="lg"
              onClick={() => onContact("whatsapp")}
              className="w-full justify-center bg-laterite hover:bg-laterite-dark text-white gap-2 font-semibold min-h-[44px]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>

            <Button
              href={phoneUrl}
              isExternal
              variant="outline"
              size="md"
              onClick={() => onContact("call")}
              className="w-full justify-center gap-2 border-border-subtle font-semibold min-h-[44px]"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </Button>
          </div>
        )}
      </div>

      <p className="text-xs text-river-silt leading-relaxed">
        Agree the scope and price directly with {firstName}.
      </p>
    </div>
  );
}
