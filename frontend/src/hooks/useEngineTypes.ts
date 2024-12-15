import { useQuery } from '@apollo/client';
import { GET_ENGINES_TYPES } from '../graphql/engines/queries/getEngineTypes.query';
import { EngineQueryDto } from '../shared/types/engines.type';

export const useEngineTypes = () => {
  const { data, loading, error } = useQuery(GET_ENGINES_TYPES);
  return {
    engineTypes: data?.findAllEngineTypes || [],
    engineTypesLoading: loading,
    engineTypesError: error,
  };
};
