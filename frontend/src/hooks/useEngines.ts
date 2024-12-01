import { useQuery } from '@apollo/client';
import { GET_ENGINES } from '../graphql/engines/queries/getEngines.query';
import { EngineQueryDto } from '../graphql/engines/queries/engines.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEngines = (params: any) => {
  const query: EngineQueryDto = {
    orderBy: params,
  };
  const { data, loading, error } = useQuery(GET_ENGINES, {
    variables: { query },
  });
  return {
    engines: data?.getEngines || [],
    loading,
    error,
  };
};
