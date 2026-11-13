export interface StepInfo {
  number: number;
  title: string;
}

interface OnboardingStepperProps {
  currentStep: number;
  steps: readonly StepInfo[];
}

export function OnboardingStepper({
  currentStep,
  steps,
}: OnboardingStepperProps) {
  const current = steps.find((s) => s.number === currentStep) ?? steps[0];
  const progressPercent = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="space-y-3">
      {/* Hidden live region for screen reader step announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Step ${currentStep} of ${steps.length}: ${current.title}`}
      </div>

      {/* Progress header row */}
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-river-silt">
        <span>
          Step {currentStep} of {steps.length}
        </span>
        <span className="font-medium text-deep-slate">{current.title}</span>
      </div>

      {/* Visual progress bar */}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-sand-dune"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Onboarding progress: step ${currentStep} of ${steps.length}`}
      >
        <div
          className="h-full bg-laterite transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
