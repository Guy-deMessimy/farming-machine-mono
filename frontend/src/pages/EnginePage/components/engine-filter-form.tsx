import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'antd';

// Components

// Utils

import '../styles.scss';

type DropdownOption = {
  value: string;
  label: string;
};

interface ReportComponentProps {
  options: DropdownOption[];
}

const EngineFilterForm: FC<ReportComponentProps> = ({ options }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="engine__filter__form">
      <Controller
        name="dropdown1"
        control={control}
        key=""
        rules={{}}
        render={({ field, fieldState }) => (
          <Select {...field} options={options} style={{ width: 200, borderColor: '#1890ff' }} placeholder="Trier par" />
        )}
      />
    </div>
  );
};

export default EngineFilterForm;
