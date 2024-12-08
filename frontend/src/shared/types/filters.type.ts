export type DropdownOption = {
  value: string;
  label: string;
};

export interface FilterFormValues {
  dropdown1: DropdownOption | null;
  dropdown2: string[] | null;
  dropdown3: string[] | null;
  dropdown4: string[] | null;
}
