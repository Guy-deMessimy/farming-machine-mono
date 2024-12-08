import React, { FC, useEffect } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';
import { DropdownOption } from '../../../../shared/types/filters.type';
import { ComplexFormValues } from '../../../../shared/types/forms.type';
import './styles.scss';

interface ReportComponentProps {
  options: DropdownOption[];
  onChange: (value: string | null) => void;
}

const BrandFilterForm: FC<ReportComponentProps> = ({ options, onChange }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ComplexFormValues>();

  const handleChange = (selectedValue: string, field: ControllerRenderProps<ComplexFormValues, 'brand_filter'>) => {
    const selectedOption = options.find((option) => option.value === selectedValue) || null;
    field.onChange(selectedOption);
  };

  const memoizedWatchValues = watch('brand_filter');
  useEffect(() => {
    if (memoizedWatchValues && typeof memoizedWatchValues === 'object' && 'value' in memoizedWatchValues) {
      onChange(memoizedWatchValues.value);
    } else {
      onChange('ASC');
    }
  }, [memoizedWatchValues]);

  return (
    <div className="engine__filter__form">
      <Controller
        name="brand_filter"
        control={control}
        key="brand_filter"
        rules={{}}
        render={({ field }) => {
          return (
            <Select
              {...field}
              // prefix="User"
              options={options}
              placeholder="Trier par"
              onChange={(value) => handleChange(value, field)}
              value={
                typeof field.value === 'object' && field.value !== null && 'value' in field.value
                  ? (field.value as DropdownOption).value
                  : null
              }
            />
          );
        }}
      />
    </div>
  );
};

export default BrandFilterForm;
