"use client";

import { Progress } from "@/components/ui/progress";
import { useClinicStore } from "@/lib/store/clinic-store";

import { STEPS_CONFIG } from "./steps-config";

export function ProgressBar() {
  const { currentStep } = useClinicStore();

  const progress = (currentStep / STEPS_CONFIG.length) * 100;

  return (
    <div className="mb-8 w-full space-y-4">
      <Progress
        value={progress}
        className="mb-10 mt-12 h-4 w-full bg-agenda-saude-blue-100"
      />
    </div>
  );
}
