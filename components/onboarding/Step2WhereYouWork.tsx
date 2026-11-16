"use client";

import { useFormContext } from "react-hook-form";
import { MapPin, Clock } from "lucide-react";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import type { OnboardingFormValues } from "@/lib/onboarding/schema";

export function Step2WhereYouWork() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const baseLocation = watch("baseLocation");
  const regularAreas = watch("regularAreas") || [];
  const byArrangementAreas = watch("byArrangementAreas") || [];

  // Filter out the national "all" option
  const selectableLocations = GAMBIAN_LOCATIONS.filter((loc) => loc.id !== "all");

  const handleBaseLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBase = e.target.value;
    setValue("baseLocation", newBase, { shouldValidate: true, shouldDirty: true });

    // Clean up if newBase was in regular or by-arrangement
    if (regularAreas.includes(newBase)) {
      setValue(
        "regularAreas",
        regularAreas.filter((a) => a !== newBase),
        { shouldValidate: true, shouldDirty: true }
      );
    }
    if (byArrangementAreas.includes(newBase)) {
      setValue(
        "byArrangementAreas",
        byArrangementAreas.filter((a) => a !== newBase),
        { shouldValidate: true, shouldDirty: true }
      );
    }
  };

  const handleRegularToggle = (locId: string) => {
    if (locId === baseLocation || byArrangementAreas.includes(locId)) return;
    const isChecked = regularAreas.includes(locId);
    const updated = isChecked
      ? regularAreas.filter((a) => a !== locId)
      : [...regularAreas, locId];
    setValue("regularAreas", updated, { shouldValidate: true, shouldDirty: true });
  };

  const handleByArrangementToggle = (locId: string) => {
    if (locId === baseLocation || regularAreas.includes(locId)) return;
    const isChecked = byArrangementAreas.includes(locId);
    const updated = isChecked
      ? byArrangementAreas.filter((a) => a !== locId)
      : [...byArrangementAreas, locId];
    setValue("byArrangementAreas", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Base Location Select */}
      <div className="space-y-1.5">
        <label
          htmlFor="baseLocation"
          className="text-sm font-semibold text-deep-slate flex items-center gap-1.5"
        >
          <MapPin className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
          <span>Where are you based?</span>
          <span className="text-laterite">*</span>
        </label>
        <select
          id="baseLocation"
          value={baseLocation}
          onChange={handleBaseLocationChange}
          aria-invalid={!!errors.baseLocation}
          aria-describedby={
            errors.baseLocation ? "baseLocation-error" : "baseLocation-hint"
          }
          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors cursor-pointer"
        >
          <option value="">Select your town or area</option>
          {selectableLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} ({loc.region})
            </option>
          ))}
        </select>
        <p id="baseLocation-hint" className="text-xs text-river-silt">
          This is where your workshop, office, or primary home base is located.
        </p>
        {errors.baseLocation && (
          <p
            id="baseLocation-error"
            className="text-xs font-medium text-laterite pt-0.5"
            role="alert"
          >
            {errors.baseLocation.message}
          </p>
        )}
      </div>

      {/* 2. Regular Areas Checkbox Chip Group */}
      <fieldset className="space-y-2 pt-2 border-t border-border-subtle">
        <legend className="text-sm font-semibold text-deep-slate block">
          Other areas you work in regularly{" "}
          <span className="text-xs font-normal text-river-silt">(optional)</span>
        </legend>
        <p className="text-xs text-river-silt">
          Towns and neighbourhoods you travel to frequently without special arrangement.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {selectableLocations.map((loc) => {
            const isBase = loc.id === baseLocation;
            const isInByArr = byArrangementAreas.includes(loc.id);
            const isChecked = regularAreas.includes(loc.id);
            const isDisabled = isBase || isInByArr;

            return (
              <label
                key={loc.id}
                htmlFor={`regular-${loc.id}`}
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-[var(--radius-control,0.75rem)] border min-h-[44px] transition-colors ${
                  isChecked
                    ? "bg-laterite-light border-laterite text-deep-slate font-medium"
                    : isDisabled
                    ? "bg-sand-dune/30 border-border-subtle text-river-silt/40 cursor-not-allowed opacity-60"
                    : "bg-warm-bone border-border-subtle text-deep-slate hover:border-river-silt/40 cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  id={`regular-${loc.id}`}
                  value={loc.id}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleRegularToggle(loc.id)}
                  className="h-4 w-4 shrink-0 rounded text-laterite focus:ring-laterite cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="text-xs leading-tight break-words">
                  {loc.name}
                  {isBase && " (Base)"}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 3. By Arrangement Areas Checkbox Chip Group */}
      <fieldset className="space-y-2 pt-2 border-t border-border-subtle">
        <legend className="text-sm font-semibold text-deep-slate block">
          Areas you can reach if arranged in advance{" "}
          <span className="text-xs font-normal text-river-silt">(optional)</span>
        </legend>
        <p className="text-xs text-river-silt">
          Areas you are willing to travel to when scheduled ahead of time.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {selectableLocations.map((loc) => {
            const isBase = loc.id === baseLocation;
            const isInRegular = regularAreas.includes(loc.id);
            const isChecked = byArrangementAreas.includes(loc.id);
            const isDisabled = isBase || isInRegular;

            return (
              <label
                key={loc.id}
                htmlFor={`byarr-${loc.id}`}
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-[var(--radius-control,0.75rem)] border min-h-[44px] transition-colors ${
                  isChecked
                    ? "bg-sand-dune border-river-silt text-deep-slate font-medium"
                    : isDisabled
                    ? "bg-sand-dune/30 border-border-subtle text-river-silt/40 cursor-not-allowed opacity-60"
                    : "bg-warm-bone border-border-subtle text-deep-slate hover:border-river-silt/40 cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  id={`byarr-${loc.id}`}
                  value={loc.id}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleByArrangementToggle(loc.id)}
                  className="h-4 w-4 shrink-0 rounded text-laterite focus:ring-laterite cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="text-xs leading-tight break-words">
                  {loc.name}
                  {isBase && " (Base)"}
                </span>
              </label>
            );
          })}
        </div>
        {errors.regularAreas && (
          <p className="text-xs font-medium text-laterite pt-1" role="alert">
            {errors.regularAreas.message}
          </p>
        )}
      </fieldset>

      {/* 4. Working Days and Hours */}
      <div className="space-y-1.5 pt-2 border-t border-border-subtle">
        <label
          htmlFor="workingHours"
          className="text-sm font-semibold text-deep-slate flex items-center gap-1.5"
        >
          <Clock className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
          <span>Working days and hours</span>
          <span className="text-xs font-normal text-river-silt">(optional)</span>
        </label>
        <input
          type="text"
          id="workingHours"
          maxLength={80}
          placeholder="Monday to Saturday, 8am to 6pm"
          aria-invalid={!!errors.workingHours}
          aria-describedby={
            errors.workingHours ? "workingHours-error" : "workingHours-hint"
          }
          {...register("workingHours")}
          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors"
        />
        <p id="workingHours-hint" className="text-xs text-river-silt">
          Let customers know when you are open for work or available for calls.
        </p>
        {errors.workingHours && (
          <p
            id="workingHours-error"
            className="text-xs font-medium text-laterite pt-0.5"
            role="alert"
          >
            {errors.workingHours.message}
          </p>
        )}
      </div>
    </div>
  );
}
