import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ComplexFormValues } from '../../../shared/types/forms.type';
import { Input } from 'antd';
import { Button } from 'antd';

// Types

import './styles.scss';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { control } = useFormContext<ComplexFormValues>();

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

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
            <>
              <label htmlFor="email">Email</label>
              <Input placeholder="Basic usage" />
            </>
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
              <Input placeholder="Basic usage" id="password" type="password" />
            </>
          );
        }}
      />
      <div className={''}>
        <button onClick={switchAuthHandler} type="button">
          {isLogin ? 'Create new user' : 'Login'}
        </button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default AuthForm;
