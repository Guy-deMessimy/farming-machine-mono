import { useQuery } from '@apollo/client';
import { GET_ENGINES_MODEL } from '../graphql/engines/queries/getEngineModel.query';
import { EngineQueryDto } from '../shared/types/engines.type';

export const useEngineModel = <T extends EngineQueryDto>(params: T) => {
  const { data, loading, error } = useQuery(GET_ENGINES_MODEL);
  return {
    engineModel: data?.findAllEngineModel || [],
    engineModelLoading: loading,
    engineModelError: error,
  };
};
