import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/authentication/mutation/signUp.mutation';

type SignUpInput = {
  email: string;
  password: string;
};

type SignUpResponse = {
  signUp: {
    email: string;
    password: string;
  };
};

export const useSignUpMutation = () => {
  const [signUpMutation, { data, loading: loadingSignUp, error }] = useMutation<SignUpResponse, { input: SignUpInput }>(
    SIGN_UP,
  );

  return {
    signUp: signUpMutation,
    data,
    loadingSignUp,
    error,
  };
};
