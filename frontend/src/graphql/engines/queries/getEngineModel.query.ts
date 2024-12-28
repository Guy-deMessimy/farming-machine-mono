import { gql } from '@apollo/client';

export const GET_ENGINES_MODEL = gql`
  query FindAllEngineModel($query: EngineModelQueryDto) {
    findAllEngineModel(query: $query) {
      id
      name
      engineType {
        id
        name
      }
    }
  }
`;
