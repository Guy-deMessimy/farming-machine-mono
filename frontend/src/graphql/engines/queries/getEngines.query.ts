import { gql } from '@apollo/client';

export const GET_ENGINES = gql`
  query FindAllEngines($query: EngineQueryDto) {
    findAllEngines(query: $query) {
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
      ref
      imageUrl
    }
  }
`;
