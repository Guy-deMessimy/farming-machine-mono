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
  dropdown1: DropdownOption | null;
  dropdown2: DropdownOption | null;
  dropdown3: DropdownOption | null;
  dropdown4: DropdownOption | null;
}

const EngineFilter: React.FC = () => {
  const myDefaultValues = (): FilterFormValues => ({
    dropdown1: null,
    dropdown2: null,
    dropdown3: null,
    dropdown4: null,
  });

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
      <form className={`engine-filter-form__form`} id="hook-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <EngineFilterForm />
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default EngineFilter;
