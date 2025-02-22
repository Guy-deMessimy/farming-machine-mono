import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { LoginFormValues } from '../../../shared/types/forms.type';
import { Input } from 'antd';
import { Button } from 'antd';

// Types

import './styles.scss';

interface ReportComponentProps {}

const AuthForm: FC<ReportComponentProps> = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { control } = useFormContext<LoginFormValues>();

  const switchAuthHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  };

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
              style={{ width: '100%' }}
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
        <Button onClick={switchAuthHandler} type="text">
          {isLogin ? 'Create new user' : 'Login'}
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
