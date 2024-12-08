import { DropdownOption } from '../types/filters.type';

export interface ComplexFormValues {
  [key: string]: string | number | boolean | DropdownOption | (() => void) | string[] | null;
}
