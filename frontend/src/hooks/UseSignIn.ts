import { SIGN_IN } from '../graphql/authentication/mutation/signIn.mutation';
import { useMutation } from '@apollo/client';

// headers: {
//     'AUthorization': 'Bearer ' + getAuthToken()
// }

type SignInInput = {
  email: string;
  password: string;
};

type SignInResponse = {
  signIn: {
    accessToken: string;
    user: {
      id: string;
      email: string;
    };
  };
};

export const useSignInMutation = () => {
  const [signInMutation, { data, loading, error }] = useMutation<SignInResponse, { input: SignInInput }>(SIGN_IN);

  return {
    signIn: signInMutation,
    data,
    loading,
    error,
  };
};
