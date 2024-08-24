import { gql } from '@apollo/client';

export const ENGINE_DETAILS_FRAGMENT = gql`
  fragment EngineDetails on Engine {
    id
    name
    type
    power
    fuelCapacity
    workingWidth
  }
`;
