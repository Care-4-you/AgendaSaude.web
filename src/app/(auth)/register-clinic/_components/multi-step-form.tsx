"use client";

import { useClinicStore } from "../../../../lib/store/clinic-store";
import { ProgressBar } from "./progress-bar";
import { STEPS_CONFIG } from "./steps-config";

export function MultiStepForm() {
  const { currentStep } = useClinicStore();

  const CurrentStepComponent = STEPS_CONFIG.find(
    (step) => step.id === currentStep
  )?.component;

  return (
    <div className="mx-auto w-full max-w-xl">
      <ProgressBar />

      <div className="mt-6">
        {CurrentStepComponent && <CurrentStepComponent />}
      </div>
    </div>
  );
}
