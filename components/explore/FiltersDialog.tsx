"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GAMBIAN_LOCATIONS } from "@/data/locations";

interface FiltersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  draftLocation: string;
  setDraftLocation: (loc: string) => void;
  draftVerified: boolean;
  setDraftVerified: (v: boolean) => void;
  onClearAll: () => void;
  onApply: () => void;
  draftResultsCount: number;
}

export default function FiltersDialog({
  isOpen,
  onClose,
  draftLocation,
  setDraftLocation,
  draftVerified,
  setDraftVerified,
  onClearAll,
  onApply,
  draftResultsCount,
}: FiltersDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      className="w-full max-w-full m-0 mt-auto rounded-t-2xl sm:rounded-2xl sm:max-w-md sm:m-auto p-0 bg-warm-bone border border-border-subtle shadow-2xl backdrop:bg-deep-slate/60 backdrop:backdrop-blur-xs text-deep-slate"
    >
      <div className="flex flex-col max-h-[85vh] overflow-hidden">
        {/* Dialog Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <h2 className="font-serif font-medium text-xl text-deep-slate">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-11 min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-full text-river-silt hover:text-deep-slate hover:bg-sand-dune/40 transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dialog Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Location Filter */}
          <div className="space-y-2">
            <label htmlFor="filter-location" className="block text-sm font-semibold text-deep-slate">
              Location
            </label>
            <select
              id="filter-location"
              value={draftLocation}
              onChange={(e) => setDraftLocation(e.target.value)}
              className="w-full h-11 min-h-[44px] rounded-xl border border-border-subtle bg-white px-3.5 text-sm text-deep-slate focus:border-laterite focus:ring-1 focus:ring-laterite outline-none cursor-pointer"
            >
              <option value="">Anywhere in The Gambia</option>
              {GAMBIAN_LOCATIONS.filter((l) => l.id !== "all").map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-river-silt">
              Matches professionals based here or available to work in this area.
            </p>
          </div>

          {/* Phone Verified Only Switch */}
          <div className="pt-2 border-t border-border-subtle flex items-start gap-3">
            <div className="flex h-6 items-center">
              <input
                id="filter-verified"
                type="checkbox"
                checked={draftVerified}
                onChange={(e) => setDraftVerified(e.target.checked)}
                className="h-5 w-5 rounded border-border-subtle text-laterite focus:ring-laterite cursor-pointer"
              />
            </div>
            <div className="space-y-0.5">
              <label htmlFor="filter-verified" className="text-sm font-semibold text-deep-slate cursor-pointer">
                Phone verified only
              </label>
              <p className="text-xs text-river-silt">
                Only show profiles with a confirmed Gambian phone number.
              </p>
            </div>
          </div>
        </div>

        {/* Dialog Footer Actions */}
        <div className="border-t border-border-subtle px-6 py-4 flex items-center justify-between gap-3 bg-sand-dune/20">
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-[44px] px-4 py-2 text-sm font-medium text-river-silt hover:text-deep-slate transition-colors cursor-pointer"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onApply}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors cursor-pointer shadow-xs"
          >
            Show {draftResultsCount} {draftResultsCount === 1 ? "result" : "results"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
