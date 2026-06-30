import { Control, FieldValues, Path } from 'react-hook-form';

type MaskKeys =
  | 'DATE'
  | 'CPF'
  | 'CNPJ'
  | 'CEP'
  | 'PHONE'
  | 'CELLPHONE'
  | 'NONE';

export const MASK: Record<MaskKeys, string> = {
  DATE: '99/99/9999',
  CPF: '999.999.999-99',
  CNPJ: '99.999.999/9999-99',
  CEP: '99999-999',
  PHONE: '(99) 9999-9999',
  CELLPHONE: '(99) 99999-9999',
  NONE: '',
};

export type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  mask?: MaskKeys;
} & React.InputHTMLAttributes<HTMLInputElement>;