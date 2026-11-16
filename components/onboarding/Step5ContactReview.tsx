"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit2,
  Check,
  ShieldCheck,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS, getLocationLabel } from "@/data/locations";
import { Professional } from "@/types/professional";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import {
  isPublishable,
  getCompleteness,
  type ProfessionalProfileInput,
} from "@/lib/profile/schema";
import { normalizeGambianPhone } from "@/lib/onboarding/phone";
import type { OnboardingFormValues } from "@/lib/onboarding/schema";

interface Step5ContactReviewProps {
  onEditStep: (stepNumber: number) => void;
  onSubmitDraft: (draft: Professional) => void;
  previewProfessional: Professional;
}

function createDraftProfessional(input: ProfessionalProfileInput): Professional {
  const slug = input.displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    ...input,
    id: `pro-draft-${slug}`,
    slug,
    primaryCategorySlug: input.categories[0],
    verification: "none",
    status: "published",
    createdAt: new Date().toISOString(),
    isSample: false,
  };
}

export function Step5ContactReview({
  onEditStep,
  onSubmitDraft,
  previewProfessional,
}: Step5ContactReviewProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const formValues = watch();
  const whatsappNumber = formValues.whatsappNumber || "";
  const callNumber = formValues.callNumber || "";
  const useSameNumberForCalls = formValues.useSameNumberForCalls ?? true;
  const confirmsPhone = formValues.confirmsPhone === true;

  const [whatsappLocal, setWhatsappLocal] = useState(() => {
    return normalizeGambianPhone(whatsappNumber).localDigits;
  });

  const [callLocal, setCallLocal] = useState(() => {
    return normalizeGambianPhone(callNumber).localDigits;
  });

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { normalized, localDigits } = normalizeGambianPhone(raw);
    setWhatsappLocal(localDigits);
    setValue("whatsappNumber", normalized, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (useSameNumberForCalls) {
      setValue("callNumber", normalized, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleCallChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { normalized, localDigits } = normalizeGambianPhone(raw);
    setCallLocal(localDigits);
    setValue("callNumber", normalized, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSameNumberToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue("useSameNumberForCalls", checked, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (checked) {
      setValue("callNumber", whatsappNumber, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setCallLocal(whatsappLocal);
    } else {
      setValue("callNumber", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setCallLocal("");
    }
  };

  // Convert current form values into partial profile input for schema checks
  const cleanProfileInput: ProfessionalProfileInput = {
    accountType: formValues.accountType ?? "individual",
    displayName: formValues.displayName?.trim() ?? "",
    businessName: formValues.businessName?.trim() || undefined,
    categories: (formValues.categories && formValues.categories.length > 0
      ? formValues.categories
      : ["electrical-work"]) as ProfessionalProfileInput["categories"],
    baseLocation: (formValues.baseLocation ||
      "serekunda") as ProfessionalProfileInput["baseLocation"],
    regularAreas: (formValues.regularAreas ||
      []) as ProfessionalProfileInput["regularAreas"],
    byArrangementAreas: (formValues.byArrangementAreas ||
      []) as ProfessionalProfileInput["byArrangementAreas"],
    whatsappNumber: formValues.whatsappNumber ?? "",
    callNumber: useSameNumberForCalls
      ? formValues.whatsappNumber
      : formValues.callNumber || undefined,
    bio: formValues.bio?.trim() ?? "",
    services: (formValues.services || [])
      .filter((s) => Boolean(s?.title?.trim()))
      .map((s) => ({
        title: s.title.trim(),
        description: s.description?.trim() || undefined,
      })),
    workPhotos: (formValues.workPhotos || []).map((p) => ({
      src: p.src,
      caption: p.caption?.trim() || undefined,
    })),
    avatar: formValues.avatar || undefined,
    languages: (formValues.languages ||
      []) as ProfessionalProfileInput["languages"],
    yearsExperience:
      typeof formValues.yearsExperience === "number" &&
      !isNaN(formValues.yearsExperience)
        ? formValues.yearsExperience
        : undefined,
    workingHours: formValues.workingHours?.trim() || undefined,
    confirmsPhone: confirmsPhone ? true : (false as unknown as true),
  };

  const publishable = isPublishable(cleanProfileInput);
  const { percent, missing } = getCompleteness(cleanProfileInput);

  const missingLabelsMap: Record<string, string> = {
    accountType: "Account type (Step 1)",
    displayName: "Your name or business name (Step 1)",
    categories: "Main work (Step 1)",
    baseLocation: "Where you are based (Step 2)",
    whatsappNumber: "7-digit WhatsApp number (Step 5)",
    bio: "Tell people about your work (min 40 characters) (Step 3)",
    services: "At least one service (Step 3)",
    workPhotos: "At least one work photo (Step 4)",
    confirmsPhone: "Confirm phone number ownership (Step 5)",
  };

  const handleSubmit = () => {
    if (!publishable) return;
    const draft = createDraftProfessional(cleanProfileInput);
    onSubmitDraft(draft);
  };

  const getLocationName = (slug?: string) =>
    getLocationLabel(slug) || "None";

  const getCategoryName = (slug?: string) =>
    CATEGORIES.find((c) => c.slug === slug)?.name ?? slug ?? "None";

  return (
    <div className="space-y-8">
      {/* 1. WhatsApp Number */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="whatsappNumber"
            className="text-sm font-semibold text-deep-slate flex items-center gap-1.5"
          >
            <MessageSquare className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
            <span>WhatsApp number</span>
            <span className="text-laterite">*</span>
          </label>
          <div className="flex rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone overflow-hidden focus-within:border-laterite focus-within:ring-2 focus-within:ring-laterite/20">
            <span className="inline-flex items-center px-3.5 bg-sand-dune/60 text-xs font-semibold text-deep-slate border-r border-border-subtle select-none">
              +220
            </span>
            <input
              type="text"
              id="whatsappNumber"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={12}
              placeholder="e.g. 1234567"
              value={whatsappLocal}
              onChange={handleWhatsappChange}
              aria-invalid={!!errors.whatsappNumber}
              aria-describedby={
                errors.whatsappNumber
                  ? "whatsappNumber-error"
                  : "whatsappNumber-hint"
              }
              className="flex-1 min-h-[44px] px-3.5 py-2.5 text-sm text-deep-slate placeholder:text-river-silt/60 bg-transparent focus:outline-none"
            />
          </div>
          <p id="whatsappNumber-hint" className="text-xs text-river-silt">
            Enter your 7-digit Gambian phone number. You can paste numbers with +220 or spaces.
          </p>
          {errors.whatsappNumber && (
            <p
              id="whatsappNumber-error"
              className="text-xs font-medium text-laterite pt-0.5"
              role="alert"
            >
              {errors.whatsappNumber.message}
            </p>
          )}
        </div>

        {/* 2. Same number for calls toggle */}
        <div className="space-y-3 pt-1">
          <label
            htmlFor="useSameNumberForCalls"
            className="flex items-center gap-2.5 cursor-pointer min-h-[44px]"
          >
            <input
              type="checkbox"
              id="useSameNumberForCalls"
              checked={useSameNumberForCalls}
              onChange={handleSameNumberToggle}
              className="h-4 w-4 rounded text-laterite focus:ring-laterite cursor-pointer"
            />
            <span className="text-xs font-medium text-deep-slate">
              Use the same number for regular phone calls
            </span>
          </label>

          {/* Optional separate call number field */}
          {!useSameNumberForCalls && (
            <div className="space-y-1.5 pl-6">
              <label
                htmlFor="callNumber"
                className="text-xs font-semibold text-deep-slate flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5 text-laterite shrink-0" aria-hidden="true" />
                <span>Call number</span>
              </label>
              <div className="flex max-w-xs rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone overflow-hidden focus-within:border-laterite focus-within:ring-2 focus-within:ring-laterite/20">
                <span className="inline-flex items-center px-3 bg-sand-dune/60 text-xs font-semibold text-deep-slate border-r border-border-subtle select-none">
                  +220
                </span>
                <input
                  type="text"
                  id="callNumber"
                  inputMode="tel"
                  autoComplete="tel-national"
                  maxLength={12}
                  placeholder="e.g. 7654321"
                  value={callLocal}
                  onChange={handleCallChange}
                  aria-invalid={!!errors.callNumber}
                  aria-describedby={
                    errors.callNumber ? "callNumber-error" : undefined
                  }
                  className="flex-1 min-h-[44px] px-3.5 py-2 text-sm text-deep-slate placeholder:text-river-silt/60 bg-transparent focus:outline-none"
                />
              </div>
              {errors.callNumber && (
                <p
                  id="callNumber-error"
                  className="text-xs font-medium text-laterite pt-0.5"
                  role="alert"
                >
                  {errors.callNumber.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 3. Phone Ownership Confirmation Checkbox */}
        <div className="p-4 rounded-[var(--radius-control,0.75rem)] bg-sand-dune/40 border border-border-subtle space-y-2">
          <label
            htmlFor="confirmsPhone"
            className="flex items-start gap-3 cursor-pointer min-h-[44px]"
          >
            <input
              type="checkbox"
              id="confirmsPhone"
              checked={confirmsPhone}
              onChange={(e) =>
                setValue(
                  "confirmsPhone",
                  e.target.checked ? true : (false as unknown as true),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                )
              }
              aria-invalid={!confirmsPhone && !!errors.confirmsPhone}
              aria-describedby="confirmsPhone-note"
              className="mt-1 h-4 w-4 rounded text-laterite focus:ring-laterite cursor-pointer shrink-0"
            />
            <span className="text-xs font-semibold text-deep-slate leading-relaxed">
              This phone number is mine and I can receive WhatsApp messages and calls.{" "}
              <span className="text-laterite">*</span>
            </span>
          </label>
          <div className="flex items-center gap-1.5 text-[11px] text-river-silt pl-7">
            <ShieldCheck className="h-3.5 w-3.5 text-verified shrink-0" aria-hidden="true" />
            <span id="confirmsPhone-note">
              We confirm your phone number by WhatsApp before your profile gets the Phone verified badge.
            </span>
          </div>
          {errors.confirmsPhone && (
            <p
              id="confirmsPhone-error"
              className="text-xs font-medium text-laterite pl-7 pt-1"
              role="alert"
            >
              {errors.confirmsPhone.message}
            </p>
          )}
        </div>
      </div>

      {/* Task 6: Mobile Profile Card Preview (shown above the review block on mobile) */}
      <div className="lg:hidden space-y-2 pt-4 border-t border-border-subtle">
        <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block">
          Live profile card preview
        </span>
        <ProfessionalCard professional={previewProfessional} previewMode />
      </div>

      {/* 4. Review Block & Completeness Meter */}
      <div className="space-y-6 pt-4 border-t border-border-subtle">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-deep-slate">
              Profile completeness
            </h3>
            <span
              className={`text-xs font-bold ${
                percent === 100 ? "text-verified" : "text-laterite"
              }`}
            >
              {percent}% complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-sand-dune">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                percent === 100 ? "bg-verified" : "bg-laterite"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Missing items checklist */}
          {missing.length > 0 && (
            <div className="p-3.5 rounded-[var(--radius-control,0.75rem)] bg-laterite-light/40 border border-laterite/20 space-y-1.5">
              <span className="text-xs font-semibold text-laterite-dark flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-laterite" aria-hidden="true" />
                <span>Still needed to publish:</span>
              </span>
              <ul className="text-xs text-river-silt space-y-0.5 pl-5 list-disc">
                {missing.map((key) => (
                  <li key={key}>{missingLabelsMap[key] || key}</li>
                ))}
              </ul>
            </div>
          )}

          {missing.length === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-[var(--radius-control,0.75rem)] bg-verified-soft text-verified text-xs font-medium border border-verified/20">
              <Check className="h-4 w-4" aria-hidden="true" />
              <span>All required profile fields are filled in.</span>
            </div>
          )}
        </div>

        {/* Summary Sections with Edit links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-river-silt">
            Summary of your details
          </h4>

          {/* Section 1: About you */}
          <div className="p-3.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone flex items-start justify-between gap-3">
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-deep-slate block">
                1. About you
              </span>
              <p className="text-river-silt">
                <strong className="text-deep-slate">
                  {formValues.displayName || "Name not entered"}
                </strong>
                {formValues.businessName && ` (${formValues.businessName})`} ·{" "}
                {formValues.accountType === "business"
                  ? "Business or team"
                  : "Works on their own"}
              </p>
              <p className="text-river-silt">
                Main work: {getCategoryName(formValues.categories?.[0])}
                {formValues.categories && formValues.categories.length > 1 && (
                  <span>
                    {" "}
                    (+{formValues.categories.length - 1} secondary:{" "}
                    {formValues.categories
                      .slice(1)
                      .map((c) => getCategoryName(c))
                      .join(", ")}
                    )
                  </span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-laterite hover:text-laterite-dark cursor-pointer min-h-[36px] px-2 py-1 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors"
            >
              <Edit2 className="h-3 w-3" aria-hidden="true" />
              <span>Edit</span>
            </button>
          </div>

          {/* Section 2: Where you work */}
          <div className="p-3.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone flex items-start justify-between gap-3">
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-deep-slate block">
                2. Where you work
              </span>
              <p className="text-river-silt">
                Base:{" "}
                <strong className="text-deep-slate">
                  {getLocationName(formValues.baseLocation)}
                </strong>
              </p>
              {formValues.regularAreas && formValues.regularAreas.length > 0 && (
                <p className="text-river-silt">
                  Regular areas:{" "}
                  {formValues.regularAreas
                    .map((l) => getLocationName(l))
                    .join(", ")}
                </p>
              )}
              {formValues.byArrangementAreas &&
                formValues.byArrangementAreas.length > 0 && (
                  <p className="text-river-silt">
                    By arrangement:{" "}
                    {formValues.byArrangementAreas
                      .map((l) => getLocationName(l))
                      .join(", ")}
                  </p>
                )}
              {formValues.workingHours && (
                <p className="text-river-silt">
                  Hours: {formValues.workingHours}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-laterite hover:text-laterite-dark cursor-pointer min-h-[36px] px-2 py-1 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors"
            >
              <Edit2 className="h-3 w-3" aria-hidden="true" />
              <span>Edit</span>
            </button>
          </div>

          {/* Section 3: Your work */}
          <div className="p-3.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone flex items-start justify-between gap-3">
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-deep-slate block">
                3. Your work
              </span>
              <p className="text-river-silt line-clamp-2">
                Bio: {formValues.bio || "None"}
              </p>
              <p className="text-river-silt">
                Services ({(formValues.services || []).filter((s) => s?.title).length}):{" "}
                {(formValues.services || [])
                  .filter((s) => s?.title)
                  .map((s) => s.title)
                  .join(", ") || "None"}
              </p>
              <p className="text-river-silt">
                Years in this work:{" "}
                {typeof formValues.yearsExperience === "number" &&
                !isNaN(formValues.yearsExperience)
                  ? `${formValues.yearsExperience} ${
                      formValues.yearsExperience === 1 ? "year" : "years"
                    }`
                  : "Not provided"}
              </p>
              {formValues.languages && formValues.languages.length > 0 && (
                <p className="text-river-silt">
                  Languages: {formValues.languages.join(", ")}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-laterite hover:text-laterite-dark cursor-pointer min-h-[36px] px-2 py-1 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors"
            >
              <Edit2 className="h-3 w-3" aria-hidden="true" />
              <span>Edit</span>
            </button>
          </div>

          {/* Section 4: Photos */}
          <div className="p-3.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone flex items-start justify-between gap-3">
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-deep-slate block">
                4. Photos
              </span>
              <p className="text-river-silt">
                Work photos: {formValues.workPhotos?.length || 0} uploaded
                {formValues.workPhotos?.[0]?.caption && (
                  <span> (Cover: {formValues.workPhotos[0].caption})</span>
                )}
              </p>
              <p className="text-river-silt">
                Profile photo: {formValues.avatar ? "Provided" : "Not provided"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-laterite hover:text-laterite-dark cursor-pointer min-h-[36px] px-2 py-1 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors"
            >
              <Edit2 className="h-3 w-3" aria-hidden="true" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* 5. Publish Button and Explanatory Text */}
        <div className="pt-4 border-t border-border-subtle space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            <button
              type="button"
              disabled={!publishable}
              onClick={handleSubmit}
              className={`w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                publishable
                  ? "bg-laterite text-white hover:bg-laterite-dark active:scale-[0.99]"
                  : "bg-sand-dune border border-border-subtle text-river-silt/60 cursor-not-allowed opacity-60"
              }`}
            >
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>Publish my profile</span>
            </button>

            {!publishable && (
              <p className="text-xs text-river-silt flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-laterite shrink-0" aria-hidden="true" />
                <span>
                  Complete the missing required fields listed above to enable publishing.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
