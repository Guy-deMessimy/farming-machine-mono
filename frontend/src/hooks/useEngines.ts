import { useQuery } from '@apollo/client';
import { GET_ENGINES } from '../graphql/engines/queries/getEngines.query';
import { EngineQueryDto, EngineOrderByInput, SortOrder } from '../graphql/engines/queries/engines.interface';

export const useEngines = () => {
  const defaultOrderBy: EngineOrderByInput = { brandName: SortOrder.ASC };
  const query: EngineQueryDto = {
    orderBy: defaultOrderBy,
    limit: 10,
    offset: 0,
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

// export const useEngines = () => {
//   const { data, loading, error } = useQuery(GET_ENGINES);
//   return {
//     engines: data?.getEngines || [],
//     loading,
//     error,
//   };
// };
