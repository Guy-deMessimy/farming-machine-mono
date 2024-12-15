export type DropdownStringOption = {
  value: string;
  label: string;
};

export type DropdownNumberOption = {
  value: number;
  label: string;
};

export interface FilterFormValues {
  dropdown1: DropdownStringOption | null;
  dropdown2: DropdownStringOption[] | null;
  dropdown3: string[] | null;
  dropdown4: string[] | null;
}
