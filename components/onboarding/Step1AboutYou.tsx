"use client";

import { useFormContext } from "react-hook-form";
import { User, Building2 } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import type { OnboardingFormValues } from "@/lib/onboarding/schema";

export function Step1AboutYou() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const accountType = watch("accountType");
  const categories = watch("categories") || [];
  const primaryCategory = categories[0] || "";
  const otherCategories = categories.slice(1);

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrimary = e.target.value;
    if (!newPrimary) {
      setValue("categories", [], { shouldValidate: true, shouldDirty: true });
      return;
    }
    // Keep secondary categories that aren't the new primary (up to 2)
    const filteredOthers = otherCategories
      .filter((c) => c !== newPrimary)
      .slice(0, 2);
    setValue("categories", [newPrimary, ...filteredOthers], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleOtherCategoryToggle = (categorySlug: string) => {
    if (!primaryCategory) return;
    const isChecked = otherCategories.includes(categorySlug);
    let updatedOthers: string[];
    if (isChecked) {
      updatedOthers = otherCategories.filter((c) => c !== categorySlug);
    } else {
      if (otherCategories.length >= 2) return;
      updatedOthers = [...otherCategories, categorySlug];
    }
    setValue("categories", [primaryCategory, ...updatedOthers], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Account Type Radio Cards */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-deep-slate block mb-1">
          How do you work? <span className="text-laterite">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Option: Individual */}
          <label
            htmlFor="account-individual"
            className={`flex items-start gap-3 p-4 rounded-[var(--radius-control,0.75rem)] border-2 cursor-pointer transition-all min-h-[56px] ${
              accountType === "individual"
                ? "border-laterite bg-laterite-light/40 ring-1 ring-laterite"
                : "border-border-subtle bg-warm-bone hover:border-river-silt/40"
            }`}
          >
            <input
              type="radio"
              id="account-individual"
              value="individual"
              {...register("accountType")}
              className="mt-0.5 h-4 w-4 text-laterite focus:ring-laterite cursor-pointer"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-medium text-deep-slate text-sm">
                <User className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
                <span>I work on my own</span>
              </div>
              <p className="text-xs text-river-silt leading-relaxed">
                Independent craftsperson or solo professional
              </p>
            </div>
          </label>

          {/* Option: Business */}
          <label
            htmlFor="account-business"
            className={`flex items-start gap-3 p-4 rounded-[var(--radius-control,0.75rem)] border-2 cursor-pointer transition-all min-h-[56px] ${
              accountType === "business"
                ? "border-laterite bg-laterite-light/40 ring-1 ring-laterite"
                : "border-border-subtle bg-warm-bone hover:border-river-silt/40"
            }`}
          >
            <input
              type="radio"
              id="account-business"
              value="business"
              {...register("accountType")}
              className="mt-0.5 h-4 w-4 text-laterite focus:ring-laterite cursor-pointer"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-medium text-deep-slate text-sm">
                <Building2 className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
                <span>I run a business or team</span>
              </div>
              <p className="text-xs text-river-silt leading-relaxed">
                Workshop, agency, or service enterprise
              </p>
            </div>
          </label>
        </div>
        {errors.accountType && (
          <p
            id="accountType-error"
            className="text-xs font-medium text-laterite pt-1"
            role="alert"
          >
            {errors.accountType.message}
          </p>
        )}
      </fieldset>

      {/* 2. Display Name (Label changes by account type) */}
      <div className="space-y-1.5">
        <label
          htmlFor="displayName"
          className="text-sm font-semibold text-deep-slate block"
        >
          {accountType === "business" ? "Business name" : "Your name"}{" "}
          <span className="text-laterite">*</span>
        </label>
        <input
          type="text"
          id="displayName"
          autoComplete="name"
          placeholder={
            accountType === "business"
              ? "e.g. Sunrise Electrical Services"
              : "e.g. Lamin Ceesay"
          }
          aria-invalid={!!errors.displayName}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
          {...register("displayName")}
          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors"
        />
        {errors.displayName && (
          <p
            id="displayName-error"
            className="text-xs font-medium text-laterite pt-0.5"
            role="alert"
          >
            {errors.displayName.message}
          </p>
        )}
      </div>

      {/* 3. Optional Workshop / Trading Name (shown ONLY for individuals) */}
      {accountType === "individual" && (
        <div className="space-y-1.5">
          <label
            htmlFor="businessName"
            className="text-sm font-semibold text-deep-slate block"
          >
            Workshop or business name{" "}
            <span className="text-xs font-normal text-river-silt">(optional)</span>
          </label>
          <input
            type="text"
            id="businessName"
            placeholder="e.g. Lamin Woodcraft Workshop"
            aria-invalid={!!errors.businessName}
            aria-describedby={
              errors.businessName
                ? "businessName-error"
                : "businessName-hint"
            }
            {...register("businessName")}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors"
          />
          <p id="businessName-hint" className="text-xs text-river-silt">
            If customers know your shop or trading name, add it here.
          </p>
          {errors.businessName && (
            <p
              id="businessName-error"
              className="text-xs font-medium text-laterite pt-0.5"
              role="alert"
            >
              {errors.businessName.message}
            </p>
          )}
        </div>
      )}

      {/* 4. Work Chooser */}
      <div className="space-y-4 pt-2 border-t border-border-subtle">
        {/* Main work required select */}
        <div className="space-y-1.5">
          <label
            htmlFor="primaryCategory"
            className="text-sm font-semibold text-deep-slate block"
          >
            Your main work <span className="text-laterite">*</span>
          </label>
          <select
            id="primaryCategory"
            value={primaryCategory}
            onChange={handlePrimaryChange}
            aria-invalid={!!errors.categories}
            aria-describedby={
              errors.categories ? "categories-error" : "primaryCategory-hint"
            }
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-sm text-deep-slate focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite/20 transition-colors cursor-pointer"
          >
            <option value="">Select your main work</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name} ({cat.shortName})
              </option>
            ))}
          </select>
          <p id="primaryCategory-hint" className="text-xs text-river-silt">
            This will be the headline specialty displayed on your profile.
          </p>
          {errors.categories && (
            <p
              id="categories-error"
              className="text-xs font-medium text-laterite pt-0.5"
              role="alert"
            >
              {errors.categories.message}
            </p>
          )}
        </div>

        {/* Other work you do (checkboxes, max 2 more) */}
        {primaryCategory && (
          <fieldset className="space-y-2 pt-2">
            <legend className="text-sm font-semibold text-deep-slate block">
              Other work you do{" "}
              <span className="text-xs font-normal text-river-silt">
                (optional, select up to 2 more)
              </span>
            </legend>
            <p className="text-xs text-river-silt">
              Pick secondary skills you also provide so customers can find you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {CATEGORIES.filter((cat) => cat.slug !== primaryCategory).map(
                (cat) => {
                  const isChecked = otherCategories.includes(cat.slug);
                  const isMaxReached = otherCategories.length >= 2 && !isChecked;

                  return (
                    <label
                      key={cat.slug}
                      htmlFor={`other-cat-${cat.slug}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-control,0.75rem)] border min-h-[44px] transition-colors ${
                        isChecked
                          ? "bg-laterite-light border-laterite text-deep-slate font-medium"
                          : isMaxReached
                          ? "bg-sand-dune/40 border-border-subtle text-river-silt/60 cursor-not-allowed opacity-60"
                          : "bg-warm-bone border-border-subtle text-deep-slate hover:border-river-silt/40 cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`other-cat-${cat.slug}`}
                        value={cat.slug}
                        checked={isChecked}
                        disabled={isMaxReached}
                        onChange={() => handleOtherCategoryToggle(cat.slug)}
                        className="h-4 w-4 shrink-0 rounded text-laterite focus:ring-laterite cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className="text-xs leading-tight break-words">{cat.shortName}</span>
                    </label>
                  );
                }
              )}
            </div>
            {otherCategories.length > 0 && (
              <p className="text-xs text-river-silt pt-1">
                Selected: {otherCategories.length} of 2 additional areas.
              </p>
            )}
          </fieldset>
        )}
      </div>
    </div>
  );
}
