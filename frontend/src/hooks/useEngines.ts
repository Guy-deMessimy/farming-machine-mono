import { useQuery } from '@apollo/client';
import { GET_ENGINES } from '../graphql/engines/queries/getEngines.query';
import { EngineQueryDto, EngineOrderByInput, SortOrder } from '../graphql/engines/queries/engines.interface';

export const useEngines = () => {
  const defaultOrderBy: EngineOrderByInput = { brandName: SortOrder.DESC };
  const query: EngineQueryDto = {
    orderBy: defaultOrderBy,
  };
  console.log('AAA query', query);
  const { data, loading, error } = useQuery(GET_ENGINES, {
    variables: { query },
  });
  console.log('AAA data', data);
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
