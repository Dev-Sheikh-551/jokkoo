"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OnboardingBanner } from "@/components/onboarding/OnboardingBanner";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { Step1AboutYou } from "@/components/onboarding/Step1AboutYou";
import { Step2WhereYouWork } from "@/components/onboarding/Step2WhereYouWork";
import { Step3YourWork } from "@/components/onboarding/Step3YourWork";
import { Step4Photos } from "@/components/onboarding/Step4Photos";
import { Step5ContactReview } from "@/components/onboarding/Step5ContactReview";
import { OnboardingSuccess } from "@/components/onboarding/OnboardingSuccess";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { Professional } from "@/types/professional";
import { isPublishable, type ProfessionalProfileInput } from "@/lib/profile/schema";
import {
  onboardingFormSchema,
  type OnboardingFormValues,
} from "@/lib/onboarding/schema";

const STEPS = [
  { number: 1, title: "About you" },
  { number: 2, title: "Where you work" },
  { number: 3, title: "Your work" },
  { number: 4, title: "Photos" },
  { number: 5, title: "Contact and review" },
] as const;

const STEP_FIELDS: Record<number, (keyof OnboardingFormValues)[]> = {
  1: ["accountType", "displayName", "businessName", "categories"],
  2: ["baseLocation", "regularAreas", "byArrangementAreas", "workingHours"],
  3: ["bio", "services", "yearsExperience", "languages"],
  4: ["workPhotos", "avatar"],
  5: ["whatsappNumber", "callNumber", "confirmsPhone"],
};

type PreviewFormInput = {
  accountType?: "individual" | "business";
  displayName?: string;
  businessName?: string;
  categories?: string[];
  baseLocation?: string;
  regularAreas?: string[];
  byArrangementAreas?: string[];
  whatsappNumber?: string;
  callNumber?: string;
  useSameNumberForCalls?: boolean;
  bio?: string;
  services?: { title?: string; description?: string }[];
  workPhotos?: { src?: string; caption?: string }[];
  avatar?: string;
  languages?: string[];
  yearsExperience?: number;
  workingHours?: string;
};

function buildPreviewProfessional(values: PreviewFormInput): Professional {
  const primaryCat = values.categories?.[0] || "electrical-work";
  const name = values.displayName?.trim() || "Your Name";
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const validServices = (values.services || [])
    .filter((s) => Boolean(s?.title?.trim()))
    .map((s) => ({
      title: s.title!.trim(),
      description: s.description?.trim() || undefined,
    }));

  const validPhotos = (values.workPhotos || [])
    .filter((p) => Boolean(p?.src))
    .map((p) => ({
      src: p.src!,
      caption: p.caption?.trim() || undefined,
    }));

  return {
    id: "preview-pro",
    slug: slug || "preview",
    accountType: values.accountType || "individual",
    displayName: name,
    businessName: values.businessName?.trim() || undefined,
    categories: (values.categories && values.categories.length > 0
      ? values.categories
      : [primaryCat]) as ProfessionalProfileInput["categories"],
    primaryCategorySlug: primaryCat,
    baseLocation: (values.baseLocation || "serekunda") as ProfessionalProfileInput["baseLocation"],
    regularAreas: (values.regularAreas || []) as ProfessionalProfileInput["regularAreas"],
    byArrangementAreas: (values.byArrangementAreas || []) as ProfessionalProfileInput["byArrangementAreas"],
    whatsappNumber: values.whatsappNumber || "+2200000000",
    callNumber: values.useSameNumberForCalls
      ? values.whatsappNumber || "+2200000000"
      : values.callNumber || undefined,
    bio: values.bio?.trim() || "Your bio and work experience will appear here.",
    services:
      validServices.length > 0
        ? validServices
        : [{ title: "Primary Service" }],
    workPhotos: validPhotos,
    avatar: values.avatar || undefined,
    languages: (values.languages || []) as ProfessionalProfileInput["languages"],
    yearsExperience:
      typeof values.yearsExperience === "number" && !isNaN(values.yearsExperience)
        ? values.yearsExperience
        : undefined,
    workingHours: values.workingHours?.trim() || undefined,
    confirmsPhone: true,
    verification: "none",
    status: "published",
    createdAt: "2026-01-01T00:00:00.000Z",
    isSample: false,
  };
}

function extractCleanProfile(vals: Partial<OnboardingFormValues>): ProfessionalProfileInput {
  return {
    accountType: vals.accountType ?? "individual",
    displayName: vals.displayName?.trim() ?? "",
    businessName: vals.businessName?.trim() || undefined,
    categories: (vals.categories || []) as ProfessionalProfileInput["categories"],
    baseLocation: (vals.baseLocation || "") as ProfessionalProfileInput["baseLocation"],
    regularAreas: (vals.regularAreas || []) as ProfessionalProfileInput["regularAreas"],
    byArrangementAreas: (vals.byArrangementAreas || []) as ProfessionalProfileInput["byArrangementAreas"],
    whatsappNumber: vals.whatsappNumber ?? "",
    callNumber: vals.useSameNumberForCalls
      ? vals.whatsappNumber
      : vals.callNumber || undefined,
    bio: vals.bio?.trim() ?? "",
    services: (vals.services || [])
      .filter((s) => Boolean(s?.title?.trim()))
      .map((s) => ({
        title: s.title.trim(),
        description: s.description?.trim() || undefined,
      })),
    workPhotos: (vals.workPhotos || []).map((p) => ({
      src: p.src,
      caption: p.caption?.trim() || undefined,
    })),
    avatar: vals.avatar || undefined,
    languages: (vals.languages || []) as ProfessionalProfileInput["languages"],
    yearsExperience:
      typeof vals.yearsExperience === "number" && !isNaN(vals.yearsExperience)
        ? vals.yearsExperience
        : undefined,
    workingHours: vals.workingHours?.trim() || undefined,
    confirmsPhone: vals.confirmsPhone === true ? true : (false as unknown as true),
  };
}

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedDraft, setSubmittedDraft] = useState<Professional | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const createdObjectUrlsRef = useRef<string[]>([]);

  const registerObjectUrl = useCallback((url: string) => {
    if (url.startsWith("blob:")) {
      createdObjectUrlsRef.current.push(url);
    }
  }, []);

  const revokeObjectUrl = useCallback((url: string) => {
    if (url.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
      createdObjectUrlsRef.current = createdObjectUrlsRef.current.filter((u) => u !== url);
    }
  }, []);

  // Revoke all managed object URLs only when JoinPage unmounts completely
  useEffect(() => {
    return () => {
      createdObjectUrlsRef.current.forEach((url) => {
        if (url.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(url);
          } catch {
            // ignore
          }
        }
      });
      createdObjectUrlsRef.current = [];
    };
  }, []);

  const methods = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    mode: "onTouched",
    defaultValues: {
      accountType: "individual",
      displayName: "",
      businessName: "",
      categories: [],
      baseLocation: "",
      regularAreas: [],
      byArrangementAreas: [],
      whatsappNumber: "",
      callNumber: "",
      useSameNumberForCalls: true,
      bio: "",
      services: [{ title: "", description: "" }],
      workPhotos: [],
      avatar: "",
      languages: [],
      yearsExperience: undefined,
      workingHours: "",
      confirmsPhone: false as unknown as true,
    },
  });

  const { trigger, watch } = methods;

  // Debounced live preview state (150ms)
  const initialPreview = useMemo(
    () => buildPreviewProfessional(methods.getValues() as PreviewFormInput),
    [methods]
  );
  const [previewPro, setPreviewPro] = useState<Professional>(initialPreview);

  const [canPublish, setCanPublish] = useState(() =>
    isPublishable(extractCleanProfile(methods.getValues()))
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = watch((values) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setPreviewPro(buildPreviewProfessional(values as PreviewFormInput));
        setCanPublish(isPublishable(extractCleanProfile(values as Partial<OnboardingFormValues>)));
      }, 150);
    });
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [watch]);

  // Move focus and scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [currentStep]);

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      // Focus first invalid field
      const currentErrors = methods.formState.errors;
      const firstErrorField = fieldsToValidate.find(
        (field) => currentErrors[field as keyof typeof currentErrors]
      );
      if (firstErrorField) {
        const element = document.querySelector(
          `[name="${firstErrorField}"], #${firstErrorField}`
        ) as HTMLElement | null;
        if (element) {
          element.focus();
          const behavior = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
          element.scrollIntoView({ behavior, block: "center" });
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const jumpToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 5) {
      setCurrentStep(stepNumber);
    }
  };

  const handleDraftSubmit = (draft: Professional) => {
    setSubmittedDraft(draft);
    const behavior = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  const handlePublish = async () => {
    const valid = await trigger(STEP_FIELDS[5]);
    const cleanInput = extractCleanProfile(methods.getValues());
    const publishable = isPublishable(cleanInput);

    if (!valid || !publishable) {
      const currentErrors = methods.formState.errors;
      const firstErrorField = STEP_FIELDS[5].find(
        (field) => currentErrors[field as keyof typeof currentErrors]
      );
      if (firstErrorField) {
        const element = document.querySelector(
          `[name="${firstErrorField}"], #${firstErrorField}`
        ) as HTMLElement | null;
        if (element) {
          element.focus();
          const behavior = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
          element.scrollIntoView({ behavior, block: "center" });
        }
      }
      return;
    }
    const name = cleanInput.displayName || "Your Name";
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const draft: Professional = {
      ...cleanInput,
      id: `pro-draft-${slug}`,
      slug,
      primaryCategorySlug: cleanInput.categories[0] || "electrical-work",
      verification: "none",
      status: "published",
      createdAt: new Date().toISOString(),
      isSample: false,
    };
    handleDraftSubmit(draft);
  };

  return (
    <div className="min-h-screen bg-warm-bone text-deep-slate flex flex-col">
      <OnboardingBanner />
      <Header />

      <main className="flex-1 pb-28 lg:pb-16" id="main-content">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {submittedDraft ? (
            <OnboardingSuccess draft={submittedDraft} />
          ) : (
            <>
              {/* Header intro */}
              <div className="max-w-[640px] mb-8 space-y-2">
                <h1 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-deep-slate">
                  Let people find you
                </h1>
                <p className="text-base text-river-silt leading-relaxed">
                  Build your profile in about five minutes. You can do it from your phone.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Form Column (max 640px) */}
                <div className="lg:col-span-7 xl:col-span-7 max-w-[640px] w-full">
                  <div className="bg-card-raised/40 rounded-[var(--radius-card,1.5rem)] border border-border-subtle p-5 sm:p-8 space-y-6">
                    <OnboardingStepper currentStep={currentStep} steps={STEPS} />

                    <FormProvider {...methods}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        noValidate
                        className="space-y-6 pt-2"
                      >
                        {/* Step Heading with focus management */}
                        <h2
                          ref={stepHeadingRef}
                          tabIndex={-1}
                          className="font-serif font-medium text-2xl sm:text-3xl tracking-tight text-deep-slate focus:outline-none"
                        >
                          {STEPS[currentStep - 1].title}
                        </h2>

                        {/* Step Containers */}
                        <div id={`step-${currentStep}-panel`}>
                          {currentStep === 1 && <Step1AboutYou />}
                          {currentStep === 2 && <Step2WhereYouWork />}
                          {currentStep === 3 && <Step3YourWork />}
                          {currentStep === 4 && (
                            <Step4Photos
                              onRegisterObjectUrl={registerObjectUrl}
                              onRevokeObjectUrl={revokeObjectUrl}
                            />
                          )}
                          {currentStep === 5 && (
                            <Step5ContactReview
                              onEditStep={jumpToStep}
                              onSubmitDraft={handleDraftSubmit}
                              previewProfessional={previewPro}
                            />
                          )}
                        </div>

                        {/* Desktop Step Navigation (Steps 1-4) */}
                        {currentStep < 5 && (
                          <div className="hidden lg:flex items-center justify-between pt-6 border-t border-border-subtle">
                            {currentStep > 1 ? (
                              <button
                                type="button"
                                onClick={handleBack}
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border-subtle bg-warm-bone px-6 py-2.5 text-sm font-semibold text-deep-slate hover:bg-sand-dune/60 transition-colors cursor-pointer"
                              >
                                Back
                              </button>
                            ) : (
                              <div />
                            )}

                            <button
                              type="button"
                              onClick={handleNext}
                              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-8 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors cursor-pointer shadow-xs"
                            >
                              Next: {STEPS[currentStep].title}
                            </button>
                          </div>
                        )}
                      </form>
                    </FormProvider>
                  </div>
                </div>

                {/* Desktop Sticky Live Preview Column (Task 6) */}
                <div className="hidden lg:block lg:col-span-5 xl:col-span-5">
                  <div className="sticky top-6 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block">
                      Live profile card preview
                    </span>
                    <div id="desktop-live-preview">
                      <ProfessionalCard professional={previewPro} previewMode />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar (Steps 1-5, short labels, 48px buttons, safe area insets) */}
      {!submittedDraft && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-warm-bone/95 backdrop-blur-md border-t border-border-subtle px-4 pl-[calc(1rem+env(safe-area-inset-left,0px))] pr-[calc(1rem+env(safe-area-inset-right,0px))] py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center gap-3 justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              aria-label={`Back: ${STEPS[currentStep - 2].title}`}
              className="shrink-0 min-w-[84px] h-12 min-h-[48px] inline-flex items-center justify-center rounded-full border border-border-subtle bg-warm-bone px-5 text-sm font-semibold text-deep-slate active:bg-sand-dune/60 cursor-pointer whitespace-nowrap transition-colors"
            >
              Back
            </button>
          ) : null}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next: ${STEPS[currentStep].title}`}
              className="flex-1 h-12 min-h-[48px] inline-flex items-center justify-center rounded-full bg-laterite px-6 text-sm font-semibold text-white active:bg-laterite-dark cursor-pointer shadow-xs whitespace-nowrap transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              disabled={!canPublish}
              aria-label="Publish my profile"
              className={`flex-1 h-12 min-h-[48px] inline-flex items-center justify-center rounded-full px-6 text-sm font-semibold shadow-xs whitespace-nowrap transition-all ${
                canPublish
                  ? "bg-laterite text-white active:bg-laterite-dark cursor-pointer"
                  : "bg-sand-dune border border-border-subtle text-river-silt/60 cursor-not-allowed opacity-60"
              }`}
            >
              Publish my profile
            </button>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
