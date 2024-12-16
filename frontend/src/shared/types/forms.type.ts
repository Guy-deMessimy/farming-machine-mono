import { DropdownStringOption } from '../types/filters.type';

export interface ComplexFormValues {
  [key: string]: string | number[] | boolean | DropdownStringOption | (() => void) | string[] | null;
}
