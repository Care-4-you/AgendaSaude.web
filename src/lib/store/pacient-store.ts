import { PacienteFormData } from "@/shared/interfaces/IPacient";
import { create } from "zustand";

interface FormState {
  currentStep: number;
  totalSteps: number;
  formData: PacienteFormData;
  maxStepReached: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  goToStep: (step: number) => void;
  prevStep: () => void;
  updateFormData: (data: Partial<PacienteFormData>) => void;
  resetForm: () => void;
  isCompleted: boolean;
  onComplete: () => void;
}

const initialFormData: PacienteFormData = {
  name: "",
  date: "",
  gender: {
    value: "",
    label: ""
  },
  zipcode: "",
  state: "",
  address: "",
  city: "",
  neighborhood: "",
  addressComplement: "",
  cellPhone: "",
  whatsapp: "",
  cpf: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerm: false
};

export const usePacientStore = create<FormState>((set) => ({
  currentStep: 1,
  totalSteps: 3,
  maxStepReached: 1,
  isCompleted: false,
  formData: initialFormData,
  onComplete: () => set({ isCompleted: true }),
  setCurrentStep: (step) => set({ currentStep: step }),
  goToStep: (step) =>
    set((state) => ({
      currentStep:
        step >= 1 && step <= state.maxStepReached ? step : state.currentStep
    })),
  nextStep: () =>
    set((state) => {
      const next = Math.min(state.currentStep + 1, state.totalSteps);
      return {
        currentStep: next,
        maxStepReached: Math.max(state.maxStepReached, next)
      };
    }),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1)
    })),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),
  resetForm: () =>
    set({
      currentStep: 1,
      maxStepReached: 1,
      formData: initialFormData,
      isCompleted: false
    })
}));
