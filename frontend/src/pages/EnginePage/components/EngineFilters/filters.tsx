import { FC } from 'react';
import { FormProvider, useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
// Components
import FiltersForm from './filters-form';
// Types
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineModel, EngineTypes } from '../../../../shared/types/engines.type';
// Styles
import './styles.scss';

interface ReportComponentProps {
  order: string;
  selectedEngineTypes: number[];
  selectedEngineModel: number[];
  engineTypesList: EngineTypes[];
  engineModelList: EngineModel[];
  handleFilterChange: (key: 'engineTypes' | 'engineModels' | 'order', value: string | number[]) => void;
}

const Filters: FC<ReportComponentProps> = ({
  order,
  selectedEngineTypes,
  selectedEngineModel,
  engineTypesList,
  engineModelList,
  handleFilterChange,
}) => {
  const myDefaultValues = (): ComplexFormValues => ({
    sort_filter: order,
    engine_types_filter: selectedEngineTypes,
    engine_model_filter: selectedEngineModel,
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
          selectedEngineTypes={selectedEngineTypes}
          selectedEngineModel={selectedEngineModel}
          engineTypesList={engineTypesList}
          engineModelList={engineModelList}
          handleFilterChange={handleFilterChange}
        />
      </form>
    </FormProvider>
  );

  return <>{EngineFilterFormProvider}</>;
};

export default Filters;
