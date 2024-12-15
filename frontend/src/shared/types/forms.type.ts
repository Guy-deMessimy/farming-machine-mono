import { DropdownStringOption, DropdownNumberOption } from '../types/filters.type';

export interface ComplexFormValues {
  [key: string]:
    | string
    | number
    | boolean
    | DropdownStringOption
    | DropdownNumberOption
    | (() => void)
    | string[]
    | null;
}
