import { FC, useMemo } from 'react';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
// Components
import FiltersForm from './filters-form';
// Types
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineTypes } from '../../../../shared/types/engines.type';
// Styles
import './styles.scss';

interface ReportComponentProps {
  order: string;
  setOrder: (value: string) => void;
  selectedEngineTypes: number[];
  setSelectedEngineTypes: (value: number[]) => void;
  engineTypesList: EngineTypes[];
}

const Filters: FC<ReportComponentProps> = ({
  order,
  setOrder,
  selectedEngineTypes,
  setSelectedEngineTypes,
  engineTypesList,
}) => {
  const myDefaultValues = (): ComplexFormValues => ({
    sort_filter: order,
    engine_types_filter: selectedEngineTypes,
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

  const onSubmit: SubmitHandler<ComplexFormValues> = async (data) => {
    try {
      console.info('je try', data);
    } catch (error) {
      console.info('je error', error);
    } finally {
      console.info('je finally');
    }
  };

  const onError = (errors: FieldErrors<ComplexFormValues>) => {
    console.error('onError', errors);
  };

  const EngineFilterFormProvider = (
    <FormProvider {...form}>
      <form className={`engine__filter`} id="hook-form" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FiltersForm
          order={order}
          setOrder={setOrder}
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
