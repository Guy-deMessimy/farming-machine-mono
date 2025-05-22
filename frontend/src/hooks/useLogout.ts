import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../graphql/authentication/mutation/logout.mutation';

export const useLogout = () => {
  const [logoutMutation, { loading, error, data }] = useMutation(LOGOUT_MUTATION);
  return {
    logout: logoutMutation,
    loading,
    error,
    data,
  };
};
