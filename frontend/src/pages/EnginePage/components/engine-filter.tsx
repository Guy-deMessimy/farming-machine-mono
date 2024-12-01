import React, { FC, useMemo } from 'react';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

// Components
import EngineFilterForm from './engine-filter-form';
import { Button } from 'antd'; // Importation des composants Ant Design

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

interface ReportComponentProps {
  onChange: (value: string) => void; // Type correct pour une fonction qui prend une valeur en paramètre
}

const EngineFilter: FC<ReportComponentProps> = ({ onChange }) => {
  const myDefaultValues = (): FilterFormValues => ({
    dropdown1: ['Marque décroissante'],
    dropdown2: null,
    dropdown3: null,
    dropdown4: null,
  });
  const options: DropdownOption[] = [
    { value: 'ASC', label: 'Marque croissante' },
    { value: 'DESC', label: 'Marque décroissante' },
  ];

  const form = useForm<FilterFormValues>({
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
        <EngineFilterForm options={options} onChange={onChange} />
        <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Soumettre
        </Button>
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default EngineFilter;
