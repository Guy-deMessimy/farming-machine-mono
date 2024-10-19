import React, { useMemo } from 'react';
import { FormProvider, useForm, UseFormReturn, SubmitHandler, FieldErrors } from 'react-hook-form';

// Components
import EngineFilterForm from './engine-filter-form';

// Actions and Api

// Styles
import '../styles.scss';

type DropdownOption = {
  value: string;
  label: string;
};

interface FilterFormValues {
  dropdown1: string[] | null;
  dropdown2: string[] | null;
  dropdown3: string[] | null;
  dropdown4: string[] | null;
}

const EngineFilter: React.FC = () => {
  const myDefaultValues = (): FilterFormValues => ({
    dropdown1: ['Marque décroissante'],
    dropdown2: null,
    dropdown3: null,
    dropdown4: null,
  });
  const options: DropdownOption[] = [
    { value: 'option1', label: 'Marque croissante' },
    { value: 'option2', label: 'Marque décroissante' },
  ];

  const form: UseFormReturn<FilterFormValues> = useForm<FilterFormValues>({
    shouldUnregister: true,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUseNativeValidation: false,
    defaultValues: myDefaultValues(),
  });

  const memoizedWatchValues = useMemo(() => form.watch(), [form.watch()]);

  const onSubmit: SubmitHandler<FilterFormValues> = async (data) => {
    try {
      console.log('je try', data, memoizedWatchValues);
      // Traitement des données du formulaire
    } catch (error) {
      console.log('je error', error);
    } finally {
      console.log('je finally');
    }
  };

  const onError = (errors: FieldErrors<FilterFormValues>) => {
    console.log('onError', errors);
  };

  const EngineFilterFormProvider = (
    <FormProvider {...form}>
      <form className={`engine__filter`} id="hook-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <EngineFilterForm options={options} />
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default EngineFilter;
