import React, { FC, useEffect, useState } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';

// Components

// Utils

import '../styles.scss';
import { useEngines } from '../../../hooks/useEngines';

type DropdownOption = {
  value: string;
  label: string;
};

interface ReportComponentProps {
  options: DropdownOption[];
  onChange: (value: string) => void; // Type correct pour une fonction qui prend une valeur en paramètre
}

interface FilterFormValues {
  dropdown1: string; // Adaptez ce type à vos besoins
}

const EngineFilterForm: FC<ReportComponentProps> = ({ options, onChange }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FilterFormValues>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (selectedOption: string, field: ControllerRenderProps<FilterFormValues, 'dropdown1'>) => {
    console.log('AAA selectedOption', selectedOption);
    onChange(selectedOption);
    return field.onChange(selectedOption);
  };

  return (
    <div className="engine__filter__form">
      <label>Filtrer par marque</label>
      <Controller
        name="dropdown1"
        control={control}
        key=""
        rules={{}}
        render={({ field, fieldState }) => {
          return (
            <Select
              {...field}
              options={options}
              style={{ width: 200, borderColor: '#1890ff' }}
              placeholder="Trier par"
              onChange={(selectedOption) => handleChange(selectedOption, field)}
            />
          );
        }}
      />
    </div>
  );
};

export default EngineFilterForm;
