import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/user/queries/getCurrentUser.query';

export const useCurrentUser = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  return {
    user: data?.getUser || null,
    loading,
    error,
  };
};
