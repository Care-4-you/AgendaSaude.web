export type DoctorFormData = {
  name: string;
  phone: string;
  whatsapp: string;
  cellPhone: string;
  councils: {
    value: string;
    label: string;
  };
  councilsUF: {
    value: string;
    label: string;
  };
  councilsNumber: string;
  gender: {
    value: string;
    label: string;
  };
  specialty: {
    value: string;
    label: string;
  };
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptTerm: boolean;
  isWhatsapp: boolean;
  medicalRecord?: Array<{
    councilsNumber: string;
    councils: {
      value: string;
      label: string;
    };
    councilsUF: {
      value: string;
      label: string;
    };
  }>;
};
