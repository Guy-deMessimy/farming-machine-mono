import React, { FC, useEffect, useState } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';

// Types
import { DropdownStringOption } from '../../../../shared/types/filters.type';
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineTypes } from '../../../../shared/types/engines.type';

// Temp
import { sortOptions } from './dummy-type-data';
import './styles.scss';

interface ReportComponentProps {
  onOrderChange: (value: string | null) => void;
  selectedEngineTypes: number[];
  setSelectedEngineTypes: (value: number[]) => void;
  engineTypesList: EngineTypes[];
}

const FiltersForm: FC<ReportComponentProps> = ({
  onOrderChange,
  selectedEngineTypes,
  setSelectedEngineTypes,
  engineTypesList,
}) => {
  const { control, watch } = useFormContext<ComplexFormValues>();

  const handleSortChange = (selectedValue: string, field: ControllerRenderProps<ComplexFormValues, 'sort_filter'>) => {
    const selectedOption = sortOptions.find((option) => option.value === selectedValue) || null;
    field.onChange(selectedOption);
  };

  const watchSortValues = watch('sort_filter');

  useEffect(() => {
    if (
      watchSortValues &&
      typeof watchSortValues === 'object' &&
      'value' in watchSortValues &&
      typeof watchSortValues.value === 'string'
    ) {
      onOrderChange(watchSortValues.value);
    } else {
      onOrderChange('ASC');
    }
  }, [watchSortValues]);

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
              options={sortOptions}
              placeholder="Trier par"
              onChange={(value: string) => handleSortChange(value, field)}
              value={
                typeof field.value === 'object' && field.value !== null && 'value' in field.value
                  ? (field.value as DropdownStringOption).value
                  : null
              }
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
    </div>
  );
};

export default FiltersForm;
