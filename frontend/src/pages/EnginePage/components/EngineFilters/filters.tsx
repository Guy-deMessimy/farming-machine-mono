import { FC, useMemo } from 'react';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
// Components
import FiltersForm from './filters-form';
// Types
import { ComplexFormValues } from '../../../../shared/types/forms.type';
// Styles
import './styles.scss';
import { EngineOrderByInput } from '../../../../shared/types/engines.type';

interface ReportComponentProps {
  onOrderChange: (value: string | null) => void;
  // onCategoryChange: (value: string | null) => void;
}

const Filters: FC<ReportComponentProps> = ({ onOrderChange }) => {
  const myDefaultValues = (): ComplexFormValues => ({
    sort_filter: { value: 'ASC', label: 'Filtrer par: Marque croissante' },
    category_filter: { value: 1, label: 'matériels agricoles' },
    dropdown3: null,
    dropdown4: null,
  });

  const form = useForm<ComplexFormValues>({
    shouldUnregister: true,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUseNativeValidation: false,
    defaultValues: myDefaultValues(),
  });

  const memoizedWatchValues = useMemo(() => form.watch('sort_filter'), [form.watch('sort_filter')]);

  const onSubmit: SubmitHandler<ComplexFormValues> = async (data) => {
    try {
      console.log('je try', data, memoizedWatchValues);
      // Traitement des données du formulaire
    } catch (error) {
      console.log('je error', error);
    } finally {
      console.log('je finally');
    }
  };

  const onError = (errors: FieldErrors<ComplexFormValues>) => {
    console.log('onError', errors);
  };

  const EngineFilterFormProvider = (
    <FormProvider {...form}>
      <form className={`engine__filter`} id="hook-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FiltersForm onOrderChange={onOrderChange} />
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default Filters;
