import { create } from "zustand";
import { ClinicaFormData } from "@/shared/interfaces/IClinica";

interface FormState {
  currentStep: number;
  totalSteps: number;
  formData: ClinicaFormData;
  maxStepReached: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  goToStep: (step: number) => void;
  prevStep: () => void;
  updateFormData: (data: Partial<ClinicaFormData>) => void;
  resetForm: () => void;
  isCompleted: boolean;
  onComplete: () => void;
}

const initialFormData: ClinicaFormData = {
  name: "",
  phone: "",
  cellPhone: "",
  whatsapp: "",
  zipcode: "",
  cpf: "",
  cnpj: "",
  address: "",
  state: "",
  houseNumber: "",
  city: "",
  neighborhood: "",
  addressComplement: "",
  specialty: {
    value: "",
    label: "",
  },
  healthInsurance: [],
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerm: false,
  isWhatsapp: false,
  hasNumber: false,
};

export const useClinicStore = create<FormState>((set) => ({
  currentStep: 1,
  totalSteps: 4,
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
    set({ currentStep: 1, maxStepReached: 1, formData: initialFormData, isCompleted: false })
}));
