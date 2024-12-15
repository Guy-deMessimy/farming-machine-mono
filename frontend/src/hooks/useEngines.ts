import { useQuery } from '@apollo/client';
import { GET_ENGINES } from '../graphql/engines/queries/getEngines.query';
import { EngineQueryDto } from '../shared/types/engines.type';

export const useEngines = <T extends EngineQueryDto>(params: T) => {
  const query = { ...params };
  const { data, loading, error } = useQuery(GET_ENGINES, {
    variables: { query },
  });
  return {
    engines: data?.findAllEngines || [],
    loading,
    error,
  };
};
