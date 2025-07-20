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
  const [signInMutation, { data, loading: loadingSignIn, error: signInError }] = useMutation<
    SignInResponse,
    { input: SignInInput }
  >(SIGN_IN, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all', // ← essentiel ici
  });

  return {
    signIn: signInMutation,
    data,
    loadingSignIn,
    signInError,
  };
};
