"use client";

import { MessageSquare, Phone } from "lucide-react";
import { Professional } from "@/types/professional";
import { Button } from "@/components/common/Button";

interface MobileContactBarProps {
  professional: Professional;
  onContact?: (kind: "whatsapp" | "call") => void;
}

export function MobileContactBar({
  professional,
  onContact = () => {},
}: MobileContactBarProps) {
  const isSample = professional.isSample;
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
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-warm-bone border-t border-border-subtle px-4 py-3 shadow-lg"
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        {isSample ? (
          <>
            <button
              type="button"
              aria-disabled="true"
              onClick={() => onContact("whatsapp")}
              className="flex-1 min-h-[48px] inline-flex items-center justify-center rounded-full bg-laterite px-4 text-sm font-semibold text-white cursor-not-allowed opacity-60 gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              aria-disabled="true"
              onClick={() => onContact("call")}
              className="flex-1 min-h-[48px] inline-flex items-center justify-center rounded-full border border-border-subtle bg-transparent px-4 text-sm font-semibold text-deep-slate cursor-not-allowed opacity-60 gap-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
          </>
        ) : (
          <>
            <Button
              href={whatsappUrl}
              isExternal
              variant="primary"
              onClick={() => onContact("whatsapp")}
              className="flex-1 min-h-[48px] justify-center bg-laterite hover:bg-laterite-dark text-white gap-2 font-semibold text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
            <Button
              href={phoneUrl}
              isExternal
              variant="outline"
              onClick={() => onContact("call")}
              className="flex-1 min-h-[48px] justify-center border-border-subtle text-deep-slate gap-2 font-semibold text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
