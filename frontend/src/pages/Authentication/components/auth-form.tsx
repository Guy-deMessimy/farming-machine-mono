import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// Types
import { LoginFormValues } from '../../../shared/types/forms.type';

import './styles.scss';

interface ReportComponentProps {
  authMode: string;
}

const AuthForm: FC<ReportComponentProps> = ({ authMode }) => {
  const isLogin = authMode === 'signin';
  const { control, formState } = useFormContext<LoginFormValues>();

  return (
    <div className="authentification_form">
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
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
      {!isLogin && (
        <Controller
          name="confirmPassword"
          control={control}
          key="confirmPassword"
          rules={{
            validate: (value, formValues) => value === formValues.password || 'Les mots de passe ne correspondent pas',
          }}
          render={({ field }) => {
            return (
              <>
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <Input.Password
                  placeholder="confirmer le mot de passe"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </>
            );
          }}
        />
      )}
      {formState.errors.confirmPassword && (
        <p style={{ color: 'red', marginTop: '4px' }}>{formState.errors.confirmPassword.message}</p>
      )}
      <div className={''}>
        <Button type="primary" htmlType="submit" disabled={formState.isSubmitting} loading={formState.isSubmitting}>
          {formState.isSubmitting ? 'Submitting...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
