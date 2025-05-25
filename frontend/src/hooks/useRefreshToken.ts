import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN_MUTATION } from '../graphql/authentication/mutation/refresh-token.mutation';

export const useLogout = () => {
  const [refreshTokenMutation, { loading, error, data }] = useMutation(REFRESH_TOKEN_MUTATION);
  return {
    refreshToken: refreshTokenMutation,
    loading,
    error,
    data,
  };
};
