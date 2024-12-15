import { gql } from '@apollo/client';

export const GET_ENGINES_TYPES = gql`
  query FindAllEngineTypes {
    findAllEngineTypes {
      id
      name
    }
  }
`;
