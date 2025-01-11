import { gql } from '@apollo/client';

export const GET_ENGINES = gql`
  query FindAllEngines($query: EngineQueryDto) {
    findAllEngines(query: $query) {
      id
      modelName
      brandName
      conception
      description
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
      engineModel {
        id
        name
        engineType {
          id
          name
        }
      }
    }
  }
`;
