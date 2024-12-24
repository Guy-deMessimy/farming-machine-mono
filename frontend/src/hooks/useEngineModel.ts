import { useQuery } from '@apollo/client';
import { GET_ENGINES_MODEL } from '../graphql/engines/queries/getEngineModel.query';
import { EngineModelQueryDto } from '../shared/types/engines.type';

export const useEngineModel = <T extends EngineModelQueryDto>(params: T) => {
  const query = { ...params };
  console.log('AAAquery ', query);
  const { data, loading, error } = useQuery(GET_ENGINES_MODEL, {
    variables: { query },
  });
  return {
    engineModel: data?.findAllEngineModel || [],
    engineModelLoading: loading,
    engineModelError: error,
  };
};
