export interface BaseFormValues {
  [key: string]: any;
}

export interface FilterFormValues extends BaseFormValues {
  dropdown1: string[] | null;
  dropdown2: string[] | null;
}
