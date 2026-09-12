import {
  DayPeriod,
  IDoctorSlot,
  ISchedulingClinic
} from "@/shared/interfaces/ISchedule";
import { create } from "zustand";

interface SchedulingState {
  currentStep: number;
  totalSteps: number;
  maxStepReached: number;
  clinic: ISchedulingClinic | null;
  /** Especialidade escolhida no mapa, exibida no filtro fixo. */
  specialty: string;
  /** yyyy-MM-dd. Null até o primeiro render no client (evita mismatch de hidratação). */
  selectedDate: string | null;
  selectedPeriods: DayPeriod[];
  selectedSlot: IDoctorSlot | null;
  setClinic: (clinic: ISchedulingClinic | null) => void;
  setSpecialty: (specialty: string) => void;
  setSelectedDate: (date: string) => void;
  togglePeriod: (period: DayPeriod) => void;
  setSelectedSlot: (slot: IDoctorSlot | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetScheduling: () => void;
}

const TOTAL_STEPS = 3;

export const useSchedulingStore = create<SchedulingState>((set) => ({
  currentStep: 1,
  totalSteps: TOTAL_STEPS,
  maxStepReached: 1,
  clinic: null,
  specialty: "",
  selectedDate: null,
  selectedPeriods: ["manha"],
  selectedSlot: null,
  setClinic: (clinic) => set({ clinic }),
  /** Trocar de especialidade invalida o horário escolhido na anterior. */
  setSpecialty: (specialty) => set({ specialty, selectedSlot: null }),
  /** Trocar o dia invalida o horário escolhido no dia anterior. */
  setSelectedDate: (selectedDate) => set({ selectedDate, selectedSlot: null }),
  togglePeriod: (period) =>
    set((state) => {
      const selectedPeriods = state.selectedPeriods.includes(period)
        ? state.selectedPeriods.filter((item) => item !== period)
        : [...state.selectedPeriods, period];

      return { selectedPeriods, selectedSlot: null };
    }),
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
  nextStep: () =>
    set((state) => {
      const next = Math.min(state.currentStep + 1, state.totalSteps);

      return {
        currentStep: next,
        maxStepReached: Math.max(state.maxStepReached, next)
      };
    }),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  goToStep: (step) =>
    set((state) => ({
      currentStep:
        step >= 1 && step <= state.maxStepReached ? step : state.currentStep
    })),
  resetScheduling: () =>
    set({
      currentStep: 1,
      maxStepReached: 1,
      clinic: null,
      specialty: "",
      selectedDate: null,
      selectedPeriods: ["manha"],
      selectedSlot: null
    })
}));
