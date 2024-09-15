import { gql } from '@apollo/client';

export const GET_ENGINES = gql`
  query GetEngines {
    getEngines {
      id
      modelName
      brandName
      conception
      engineKwPower
      engineCcPower
      maxKmhSpeed
      petrolLitreTank
      tankLitre
      weightKg
      workingWidth
      copiesNumber
    }
  }
`;
