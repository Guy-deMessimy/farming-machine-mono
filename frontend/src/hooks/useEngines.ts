import { useQuery } from '@apollo/client';
import { GET_ENGINES } from '../graphql/engines/queries/getEngines.query';

export const useEngines = () => {
  const { data, loading, error } = useQuery(GET_ENGINES);
  return {
    engines: data?.engines || [],
    loading,
    error,
  };
};
