import React, { FC } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';
import { DropdownOption, FilterFormValues } from '../../../../shared/types/filters.type';
import './styles.scss';

interface ReportComponentProps {
  options: DropdownOption[];
  onChange: (value: string) => void;
}

const BrandFilterForm: FC<ReportComponentProps> = ({ options, onChange }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FilterFormValues>();

  const handleChange = (selectedOption: string, field: ControllerRenderProps<FilterFormValues, 'dropdown1'>) => {
    onChange(selectedOption[1]);
    return field.onChange(selectedOption[1]);
  };

  return (
    <div className="engine__filter__form">
      <label>Filtrer par marque</label>
      <Controller
        name="dropdown1"
        control={control}
        key=""
        rules={{}}
        render={({ field }) => {
          return (
            <Select
              {...field}
              options={options}
              style={{ width: 200, borderColor: '#1890ff' }}
              mode="multiple"
              placeholder="Trier par"
              onChange={(selectedOption) => handleChange(selectedOption, field)}
            />
          );
        }}
      />
    </div>
  );
};

export default BrandFilterForm;
