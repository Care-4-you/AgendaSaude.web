"use client";

import { useState } from "react";
import { usePacientStore } from "../../../../lib/store/pacient-store";
import { ProgressBar } from "./progress-bar";
import { STEPS_CONFIG } from "./steps-config";

export function MultiStepForm() {
  const { currentStep } = usePacientStore();

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
