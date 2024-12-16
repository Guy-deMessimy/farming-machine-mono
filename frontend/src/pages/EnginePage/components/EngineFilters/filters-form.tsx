import React, { FC, useEffect, useState } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';

// Types
import { DropdownStringOption } from '../../../../shared/types/filters.type';
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { EngineTypes } from '../../../../shared/types/engines.type';

// Temp
import { brandSortOptions, categoryOptions } from './dummy-type-data';
import './styles.scss';

interface ReportComponentProps {
  onOrderChange: (value: string | null) => void;
  engineTypesList: EngineTypes[];
}

const FiltersForm: FC<ReportComponentProps> = ({ onOrderChange, engineTypesList }) => {
  const { control, watch } = useFormContext<ComplexFormValues>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  console.log('AAA selectedItems ', selectedItems);

  console.log('AAA engineTypes', engineTypesList);

  const optionsB = engineTypesList.map((type) => {
    return {
      label: type.name,
      value: type.id,
    };
  });
  console.log('AAA optionsB', optionsB);

  const filteredOptions = categoryOptions.filter((option) => !selectedItems.includes(option.label));
  console.log('AAA filteredOptions ', filteredOptions);

  const handleSortChange = (selectedValue: string, field: ControllerRenderProps<ComplexFormValues, 'sort_filter'>) => {
    const selectedOption = brandSortOptions.find((option) => option.value === selectedValue) || null;
    field.onChange(selectedOption);
  };

  const handleCategoryChange = (
    selectedValue: string[],
    field: ControllerRenderProps<ComplexFormValues, 'category_filter'>,
  ) => {
    console.log('AAA selectedvalue', selectedValue);
    console.log('AAA field', field);
    setSelectedItems(selectedValue);
    field.onChange(selectedValue);
  };

  const memoizedWatchValues = watch('sort_filter');
  useEffect(() => {
    if (
      memoizedWatchValues &&
      typeof memoizedWatchValues === 'object' &&
      'value' in memoizedWatchValues &&
      typeof memoizedWatchValues.value === 'string'
    ) {
      onOrderChange(memoizedWatchValues.value);
    } else {
      onOrderChange('ASC');
    }
  }, [memoizedWatchValues]);

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
              options={brandSortOptions}
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
        name="category_filter"
        control={control}
        key="category_filter"
        rules={{}}
        render={({ field }) => {
          return (
            <Select
              {...field}
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={optionsB}
              value={selectedItems}
              placeholder="Trier par"
              mode="multiple"
              onChange={(value: string[]) => handleCategoryChange(value, field)}
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
