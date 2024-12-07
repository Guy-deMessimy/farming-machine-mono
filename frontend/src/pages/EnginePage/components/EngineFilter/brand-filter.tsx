import { FC, useMemo } from 'react';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { Button } from 'antd';

// Components
import BrandFilterForm from './brand-filter-form';
// Types
import { DropdownOption, FilterFormValues } from '../../../../shared/types/filters.type';
// Styles
import './styles.scss';

interface ReportComponentProps {
  options: DropdownOption[];
  onChange: (value: string) => void; // Type correct pour une fonction qui prend une valeur en paramètre
}

const BrandFilter: FC<ReportComponentProps> = ({ options, onChange }) => {
  const myDefaultValues = (): FilterFormValues => ({
    dropdown1: 'Marque décroissante',
    dropdown2: null,
    dropdown3: null,
    dropdown4: null,
  });

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
        <BrandFilterForm options={options} onChange={onChange} />
        <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Soumettre
        </Button>
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default BrandFilter;
