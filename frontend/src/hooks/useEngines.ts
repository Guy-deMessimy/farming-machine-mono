import { useQuery } from '@apollo/client';
import { GET_ENGINES } from '../graphql/engines/queries/getEngines.query';
import { EngineQueryDto } from '../shared/types/engines.type';
import { getAuthToken } from '../shared/utils/auth';

export const useEngines = <T extends EngineQueryDto>(params: T) => {
  const token = getAuthToken();
  const query = { ...params };

  const { data, loading, error } = useQuery(GET_ENGINES, {
    variables: { query },
    // pollInterval: !token ? 0 : 5000,
    // skip: !token,
  });

  return {
    engines: data?.findAllEngines || [],
    enginesLoading: loading,
    enginesError: error,
  };
};
