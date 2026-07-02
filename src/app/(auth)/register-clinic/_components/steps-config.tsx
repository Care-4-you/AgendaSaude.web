import { StepOne } from "./step-1";
import { StepTwo } from "./step-2";
import { StepThree } from "./step-3";
import { StepFour } from "./step-4";


export const STEPS_CONFIG = [
  {
    id: 1,
    component: StepOne
  },
  {
    id: 2,
    component: StepTwo
  },
  {
    id: 3,
    component:StepThree
  },
  {
    id: 4,
    component: StepFour
  }
];

export const getTotalSteps = () => STEPS_CONFIG.length;
