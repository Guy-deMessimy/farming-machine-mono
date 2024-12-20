import { FC } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';

// Types
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineModel, EngineTypes } from '../../../../shared/types/engines.type';

// Temp
import './styles.scss';

interface ReportComponentProps {
  order: string;
  setOrder: (value: string) => void;
  selectedEngineTypes: number[];
  setSelectedEngineTypes: (value: number[]) => void;
  selectedEngineModel: number[];
  setSelectedEngineModel: (value: number[]) => void;
  engineTypesList: EngineModel[];
  engineModelList: EngineTypes[];
}

const FiltersForm: FC<ReportComponentProps> = ({
  order,
  setOrder,
  selectedEngineTypes,
  setSelectedEngineTypes,
  selectedEngineModel,
  setSelectedEngineModel,
  engineTypesList,
  engineModelList,
}) => {
  const { control } = useFormContext<ComplexFormValues>();

  return (
    <div className="engine__filter__form">
      <Controller
        name="sort_filter"
        control={control}
        key="sort_filter"
        rules={{}}
        render={({ field }) => {
          return (
            <Select
              {...field}
              prefix="Trier par"
              options={[
                { value: 'ASC', label: 'Marque croissante' },
                {
                  value: 'DESC',
                  label: 'Marque décroissante',
                },
              ]}
              placeholder="Trier par"
              onChange={(value: string) => setOrder(value)}
              value={order}
            />
          );
        }}
      />
      <Controller
        name="engine_types_filter"
        control={control}
        key="engine_types_filter"
        rules={{}}
        render={({ field }) => {
          return (
            <Select
              {...field}
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={engineTypesList.map((type) => {
                return {
                  label: type.name,
                  value: Number(type.id),
                };
              })}
              value={selectedEngineTypes}
              placeholder="Trier par"
              mode="multiple"
              onChange={(value: number[]) => setSelectedEngineTypes(value)}
              optionLabelProp="label"
              style={{ width: '100%' }}
            />
          );
        }}
      />
      <Controller
        name="engine_model_filter"
        control={control}
        key="engine_model_filter"
        rules={{}}
        render={({ field }) => {
          return (
            <Select
              {...field}
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={engineModelList.map((type) => {
                return {
                  label: type.name,
                  value: Number(type.id),
                };
              })}
              value={selectedEngineModel}
              placeholder="Trier par"
              mode="multiple"
              onChange={(value: number[]) => setSelectedEngineModel(value)}
              optionLabelProp="label"
              style={{ width: '100%' }}
            />
          );
        }}
      />
    </div>
  );
};

export default FiltersForm;
