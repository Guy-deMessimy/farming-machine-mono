import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// Types
import { LoginFormValues } from '../../../shared/types/forms.type';

import './styles.scss';

interface ReportComponentProps {}

const AuthForm: FC<ReportComponentProps> = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const { control, formState } = useFormContext<LoginFormValues>();
  console.log('AAA formstate', formState);

  return (
    <div className="authentification_form">
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
      {/* {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data?.message && <p>{data.message}</p>} */}
      <Controller
        name="email"
        control={control}
        key="email"
        rules={{}}
        render={({ field }) => {
          return (
            <Input
              {...field}
              placeholder="email"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        key="password"
        rules={{}}
        render={({ field }) => {
          return (
            <>
              <label htmlFor="image">Password</label>
              <Input.Password
                placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          );
        }}
      />
      <div className={''}>
        <Button type="primary" htmlType="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Submitting...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
