// src/graphql/queries/getEngines.query.ts
import { gql } from '@apollo/client';
import { ENGINE_DETAILS_FRAGMENT } from '../fragments/engineDetails.fragment';

export const GET_ENGINES = gql`
  query GetAgriculturalMachines {
    GetAgriculturalMachines {
      ...EngineDetails
    }
  }
  ${ENGINE_DETAILS_FRAGMENT}
`;
