import { DropdownStringOption } from '../types/filters.type';

export interface ComplexFormValues {
  [key: string]: string | number[] | boolean | DropdownStringOption | (() => void) | string[] | null;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
