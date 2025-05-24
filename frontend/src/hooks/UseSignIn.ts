import { SIGN_IN } from '../graphql/authentication/mutation/signIn.mutation';
import { useMutation } from '@apollo/client';

type SignInInput = {
  email: string;
  password: string;
};

type SignInResponse = {
  signIn: {
    user: {
      id: string;
      email: string;
    };
  };
};

export const useSignInMutation = () => {
  const [signInMutation, { data, loading, error }] = useMutation<SignInResponse, { input: SignInInput }>(SIGN_IN, {
    fetchPolicy: 'no-cache',
  });

  return {
    signIn: signInMutation,
    data,
    loading,
    error,
  };
};
