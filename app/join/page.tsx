"use client";

import { useState, useRef, useEffect } from "react";
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

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

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

  const { trigger } = methods;

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
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const _jumpToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 5) {
      setCurrentStep(stepNumber);
    }
  };
  void _jumpToStep;

  return (
    <div className="min-h-screen bg-warm-bone text-deep-slate flex flex-col">
      <OnboardingBanner />
      <Header />

      <main className="flex-1 pb-28 lg:pb-16" id="main-content">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
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
                      {currentStep === 4 && <Step4Photos />}
                    </div>

                    {/* Desktop Step Navigation */}
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

                      {currentStep < 5 && (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-8 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors cursor-pointer shadow-xs"
                        >
                          Next: {STEPS[currentStep].title}
                        </button>
                      )}
                    </div>
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
                <div
                  id="desktop-live-preview"
                  className="rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-warm-bone p-4"
                >
                  <p className="text-xs text-river-silt">
                    Your profile preview updates as you fill in each step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-warm-bone/95 backdrop-blur-md border-t border-border-subtle px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center gap-3 justify-between">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-full border border-border-subtle bg-warm-bone px-4 py-2 text-sm font-semibold text-deep-slate active:bg-sand-dune/60 cursor-pointer"
          >
            Back
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {currentStep < 5 && (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-full bg-laterite px-6 py-2 text-sm font-semibold text-white active:bg-laterite-dark cursor-pointer shadow-xs"
          >
            Next
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
}
