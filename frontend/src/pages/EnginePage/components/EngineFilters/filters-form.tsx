import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'antd';

// Types
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineModel, EngineTypes } from '../../../../shared/types/engines.type';

// Temp
import './styles.scss';

interface ReportComponentProps {
  order: string;
  selectedEngineTypes: number[];
  selectedEngineModel: number[];
  engineTypesList: EngineTypes[];
  engineModelList: EngineModel[];
  handleFilterChange: (key: 'engineTypes' | 'engineModels' | 'order', value: string | number[]) => void;
}

const FiltersForm: FC<ReportComponentProps> = ({
  order,
  selectedEngineTypes,
  selectedEngineModel,
  engineTypesList,
  engineModelList,
  handleFilterChange,
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
              onChange={(value: string) => handleFilterChange('order', value)}
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
              onChange={(value: number[]) => handleFilterChange('engineTypes', value)}
              optionLabelProp="label"
              style={{ width: '100%' }}
              maxTagCount={0}
              tagRender={() => <span>Type de machines ({selectedEngineTypes.length})</span>}
              showSearch={false}
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
              onChange={(value: number[]) => handleFilterChange('engineModels', value)}
              optionLabelProp="label"
              style={{ width: '100%' }}
              maxTagCount={0}
              tagRender={() => <span>Modèle de machines ({selectedEngineModel.length})</span>}
              showSearch={false}
            />
          );
        }}
      />
    </div>
  );
};

export default FiltersForm;
