import { gql } from '@apollo/client';
// import { ENGINE_DETAILS_FRAGMENT } from '../fragments/engineDetails.fragment';

export const GET_ENGINES = gql`
  query GetEngines {
    getEngines {
      brandName
      copiesNumber
      id
      maxKmhSpeed
      modelName
      petrolLitreTank
    }
  }
`;
