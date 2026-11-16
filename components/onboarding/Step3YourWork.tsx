"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Sparkles, Briefcase, Languages, Calendar } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import type { OnboardingFormValues } from "@/lib/onboarding/schema";

const LANGUAGE_OPTIONS = [
  "English",
  "Wolof",
  "Mandinka",
  "Fula",
  "Jola",
  "Serahule",
] as const;

export function Step3YourWork() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const bio = watch("bio") || "";
  const categories = watch("categories") || [];
  const primaryCategory = categories[0] || "";
  const languages = watch("languages") || [];

  const { fields, append, remove } = useFieldArray<OnboardingFormValues>({
    name: "services",
  });

  // Find suggestion services from category popularServices
  const currentCategoryData = CATEGORIES.find(
    (c) => c.slug === primaryCategory
  );
  const suggestionServices = (
    currentCategoryData?.popularServices || []
  ).slice(0, 6);

  const handleAddSuggestion = (suggestionTitle: string) => {
    // Check if suggestion already exists in any row
    const exists = fields.some(
      (_, idx) =>
        (watch(`services.${idx}.title`) || "").trim().toLowerCase() ===
        suggestionTitle.trim().toLowerCase()
    );
    if (exists) return;

    // Find the first row where title is empty
    const firstEmptyIndex = fields.findIndex(
      (_, idx) => !(watch(`services.${idx}.title`) || "").trim()
    );

    if (firstEmptyIndex !== -1) {
      // Fill the service TITLE of the first empty row
      setValue(`services.${firstEmptyIndex}.title`, suggestionTitle, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    // Otherwise add a new row if under 8
    if (fields.length < 8) {
      append({ title: suggestionTitle, description: "" });
    }
  };

  const handleLanguageToggle = (lang: string) => {
    const isChecked = languages.includes(lang);
    const updated = isChecked
      ? languages.filter((l) => l !== lang)
      : [...languages, lang];
    setValue("languages", updated, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      {/* 1. Bio / About Work */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="bio"
            className="text-sm font-semibold text-deep-slate flex items-center gap-1.5"
          >
            <Briefcase className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
            <span>Tell people about your work</span>
            <span className="text-laterite">*</span>
          </label>
          <span
            className={`text-xs ${
              bio.length > 500
                ? "text-laterite font-semibold"
                : bio.length < 40 && bio.length > 0
                ? "text-laterite"
                : "text-river-silt"
            }`}
          >
            {bio.length} / 500
          </span>
        </div>
        <textarea
          id="bio"
          rows={4}
          maxLength={500}
          placeholder="Describe what you do, how you learned your trade, the tools you use, and what kind of jobs you take on across The Gambia..."
          aria-invalid={!!errors.bio}
          aria-describedby={errors.bio ? "bio-error" : "bio-hint"}
          {...register("bio")}
          className="w-full px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors leading-relaxed"
        />
        <div className="flex items-center justify-between">
          <p id="bio-hint" className="text-xs text-river-silt">
            Minimum 40 characters. Plain, honest descriptions build trust with customers.
          </p>
        </div>
        {errors.bio && (
          <p
            id="bio-error"
            className="text-xs font-medium text-laterite pt-0.5"
            role="alert"
          >
            {errors.bio.message}
          </p>
        )}
      </div>

      {/* 2. Services List */}
      <div className="space-y-4 pt-2 border-t border-border-subtle">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-deep-slate">
            Services you offer <span className="text-laterite">*</span>
          </h3>
          <p className="text-xs text-river-silt">
            Add 1 to 8 specific services so customers know exactly what you can handle.
          </p>
        </div>

        {/* Suggestion chips */}
        {suggestionServices.length > 0 && fields.length < 8 && (
          <div className="space-y-2 p-3.5 rounded-[var(--radius-control,0.75rem)] bg-sand-dune/40 border border-border-subtle">
            <div className="flex items-center gap-1.5 text-xs font-medium text-deep-slate">
              <Sparkles className="h-3.5 w-3.5 text-laterite shrink-0" aria-hidden="true" />
              <span>Tap a popular service to add it quickly:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestionServices
                .filter((suggestion) => {
                  const alreadyAdded = fields.some(
                    (_, idx) =>
                      (watch(`services.${idx}.title`) || "").trim().toLowerCase() ===
                      suggestion.trim().toLowerCase()
                  );
                  return !alreadyAdded;
                })
                .map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleAddSuggestion(suggestion)}
                    disabled={fields.length >= 8}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer min-h-[36px] bg-warm-bone border border-border-subtle text-deep-slate hover:border-laterite hover:text-laterite active:bg-sand-dune disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{suggestion}</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Service rows */}
        <div className="space-y-3">
          {fields.map((field, index) => {
            const titleError = errors.services?.[index]?.title;
            const descError = errors.services?.[index]?.description;

            return (
              <div
                key={field.id}
                className="p-4 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-river-silt">
                    Service {index + 1} of {fields.length}
                  </span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="inline-flex items-center gap-1 text-xs text-laterite hover:text-laterite-dark cursor-pointer min-h-[36px] px-2 py-1 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors"
                      aria-label={`Remove service ${index + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Service title */}
                <div className="space-y-1">
                  <label
                    htmlFor={`service-title-${index}`}
                    className="text-xs font-semibold text-deep-slate block"
                  >
                    Service name <span className="text-laterite">*</span>
                  </label>
                  <input
                    type="text"
                    id={`service-title-${index}`}
                    maxLength={60}
                    placeholder="e.g. Solar panel wiring and inverter setup"
                    aria-invalid={!!titleError}
                    aria-describedby={
                      titleError ? `service-title-error-${index}` : undefined
                    }
                    {...register(`services.${index}.title` as const)}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors"
                  />
                  {titleError && (
                    <p
                      id={`service-title-error-${index}`}
                      className="text-xs font-medium text-laterite pt-0.5"
                      role="alert"
                    >
                      {titleError.message}
                    </p>
                  )}
                </div>

                {/* Service description (optional) */}
                <div className="space-y-1">
                  <label
                    htmlFor={`service-desc-${index}`}
                    className="text-xs font-semibold text-deep-slate block"
                  >
                    Details{" "}
                    <span className="text-xs font-normal text-river-silt">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    id={`service-desc-${index}`}
                    maxLength={140}
                    placeholder="e.g. Includes testing battery load and inverter output switch"
                    aria-invalid={!!descError}
                    aria-describedby={
                      descError ? `service-desc-error-${index}` : undefined
                    }
                    {...register(`services.${index}.description` as const)}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors"
                  />
                  {descError && (
                    <p
                      id={`service-desc-error-${index}`}
                      className="text-xs font-medium text-laterite pt-0.5"
                      role="alert"
                    >
                      {descError.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add service button */}
        {fields.length < 8 && (
          <button
            type="button"
            onClick={() => append({ title: "", description: "" })}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-[var(--radius-control,0.75rem)] border-2 border-dashed border-border-subtle bg-warm-bone py-3 text-sm font-semibold text-deep-slate hover:border-laterite hover:text-laterite transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Add another service ({fields.length} of 8)</span>
          </button>
        )}
      </div>

      {/* 3. Years of experience & Languages */}
      <div className="space-y-6 pt-2 border-t border-border-subtle">
        {/* Years of experience */}
        <div className="space-y-1.5">
          <label
            htmlFor="yearsExperience"
            className="text-sm font-semibold text-deep-slate flex items-center gap-1.5"
          >
            <Calendar className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
            <span>Years in this work</span>
            <span className="text-xs font-normal text-river-silt">(optional)</span>
          </label>
          <input
            type="number"
            id="yearsExperience"
            min={0}
            max={60}
            placeholder="e.g. 5"
            aria-invalid={!!errors.yearsExperience}
            aria-describedby={
              errors.yearsExperience
                ? "yearsExperience-error"
                : "yearsExperience-hint"
            }
            {...register("yearsExperience", {
              setValueAs: (v) => {
                if (v === "" || v === null || v === undefined) return undefined;
                const n = Number(v);
                return Number.isNaN(n) ? undefined : n;
              },
            })}
            className="w-full max-w-xs min-h-[44px] px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors"
          />
          <p id="yearsExperience-hint" className="text-xs text-river-silt">
            How many years you have been practicing your trade (0 to 60).
          </p>
          {errors.yearsExperience && (
            <p
              id="yearsExperience-error"
              className="text-xs font-medium text-laterite pt-0.5"
              role="alert"
            >
              {errors.yearsExperience.message}
            </p>
          )}
        </div>

        {/* Languages spoken */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-deep-slate flex items-center gap-1.5">
            <Languages className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
            <span>Languages you speak</span>
            <span className="text-xs font-normal text-river-silt">(optional)</span>
          </legend>
          <p className="text-xs text-river-silt">
            Let customers know which languages you are comfortable speaking.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {LANGUAGE_OPTIONS.map((lang) => {
              const isChecked = languages.includes(lang);

              return (
                <label
                  key={lang}
                  htmlFor={`lang-${lang}`}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-[var(--radius-control,0.75rem)] border min-h-[44px] transition-colors ${
                    isChecked
                      ? "bg-laterite-light border-laterite text-deep-slate font-medium"
                      : "bg-warm-bone border-border-subtle text-deep-slate hover:border-river-silt/40 cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`lang-${lang}`}
                    value={lang}
                    checked={isChecked}
                    onChange={() => handleLanguageToggle(lang)}
                    className="h-4 w-4 shrink-0 rounded text-laterite focus:ring-laterite cursor-pointer"
                  />
                  <span className="text-xs leading-tight break-words">{lang}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
