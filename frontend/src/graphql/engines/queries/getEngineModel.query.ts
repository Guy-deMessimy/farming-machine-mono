import { gql } from '@apollo/client';

export const GET_ENGINES_MODEL = gql`
  query FindAllEngineModel {
    findAllEngineModel {
      id
      name
    }
  }
`;
