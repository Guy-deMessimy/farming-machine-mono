import React, { FC, useEffect, useState } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select, Tag } from 'antd';
import { DropdownStringOption, DropdownNumberOption } from '../../../../shared/types/filters.type';
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import { brandSortOptions, categoryOptions } from './dummy-type-data';
import './styles.scss';
import { EngineOrderByInput } from '../../../../shared/types/engines.type';

interface ReportComponentProps {
  onOrderChange: (value: string | null) => void;
  // onCategoryChange: (value: string | null) => void;
}

const FiltersForm: FC<ReportComponentProps> = ({ onOrderChange }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ComplexFormValues>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  console.log('AAA selectedItems ', selectedItems);

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
              options={filteredOptions}
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
