import { FC, useEffect, useMemo } from 'react';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
// Components
import FiltersForm from './filters-form';
// Types
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineTypes } from '../../../../shared/types/engines.type';
// Styles
import './styles.scss';
import { DropdownStringOption } from '../../../../shared/types/filters.type';

interface ReportComponentProps {
  onOrderChange: (value: string | null) => void;
  selectedEngineTypes: number[];
  setSelectedEngineTypes: (value: number[]) => void;
  engineTypesList: EngineTypes[];
}

const Filters: FC<ReportComponentProps> = ({
  onOrderChange,
  selectedEngineTypes,
  setSelectedEngineTypes,
  engineTypesList,
}) => {
  const myDefaultValues = (): ComplexFormValues => ({
    sort_filter: { value: 'ASC', label: 'Filtrer par: Marque croissante' },
    engine_types_filter: selectedEngineTypes,
    dropdown3: null,
    dropdown4: null,
  });

  const form = useForm<ComplexFormValues>({
    shouldUnregister: false,
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUseNativeValidation: false,
    defaultValues: myDefaultValues(),
  });

  const memoizedWatchValues = useMemo(() => form.watch('sort_filter'), [form.watch('sort_filter')]);

  const onSubmit: SubmitHandler<ComplexFormValues> = async (data) => {
    try {
      console.log('je try', data, memoizedWatchValues);
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
        <FiltersForm
          onOrderChange={onOrderChange}
          // onEngineTypesChange={onEngineTypesChange}
          selectedEngineTypes={selectedEngineTypes}
          setSelectedEngineTypes={setSelectedEngineTypes}
          engineTypesList={engineTypesList}
        />
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default Filters;
