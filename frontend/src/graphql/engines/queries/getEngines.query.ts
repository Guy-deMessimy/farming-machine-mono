import { gql } from '@apollo/client';

export const GET_ENGINES = gql`
  query GetEngines {
    getEngines {
      brandName
      copiesNumber
      id
      maxKmhSpeed
      modelName
      petrolLitreTank
      conception
    }
  }
`;
