import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import { Select } from 'antd';
import { DropdownOption, FilterFormValues } from '../../../../shared/types/filters.type';
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
  } = useFormContext<FilterFormValues>();

  const handleChange = (
    selectedValue: string, // La valeur retournée par le Select
    field: ControllerRenderProps<FilterFormValues, 'dropdown1'>,
  ) => {
    console.log('AAA Valeur sélectionnée :', selectedValue);

    // Trouve l'objet correspondant dans les options
    const selectedOption = options.find((option) => option.value === selectedValue) || null;

    // Passe la valeur au parent via onChange (si défini)
    // if (onChange && selectedOption) {
    //   onChange(selectedOption.value); // Appelle avec une string
    // } else {
    //   onChange(null); // Gère le cas où aucune option n'est sélectionnée
    // }

    console.log('Option correspondante :', selectedOption);

    // Met à jour le champ avec l'objet trouvé ou null
    field.onChange(selectedOption);
  };

  const memoizedWatchValues = watch('dropdown1');
  console.log('AAA memoizedWatchValues in comp', memoizedWatchValues);
  useEffect(() => {
    console.log('AAA memoizedWatchValues in use', memoizedWatchValues);
    if (memoizedWatchValues?.value) {
      onChange(memoizedWatchValues.value);
    } else onChange('ASC');
  }, [memoizedWatchValues?.value]);

  return (
    <div className="engine__filter__form">
      <label>Filtrer par marque</label>
      <Controller
        name="dropdown1"
        control={control}
        key="brand"
        rules={{}}
        render={({ field }) => {
          console.log('AAA field value', field);
          return (
            <Select
              {...field}
              options={options}
              style={{ width: 200, borderColor: '#1890ff' }}
              placeholder="Trier par"
              onChange={(value) => handleChange(value, field)}
              value={field.value?.value || null}
            />
          );
        }}
      />
    </div>
  );
};

export default BrandFilterForm;
