import { ISchedulingStep } from "@/shared/interfaces/ISchedule";

export const SCHEDULING_STEPS: ISchedulingStep[] = [
  { id: 1, label: "Data e horário" },
  { id: 2, label: "Resumo" },
  { id: 3, label: "Confirmação" }
];

export const getTotalSchedulingSteps = () => SCHEDULING_STEPS.length;
