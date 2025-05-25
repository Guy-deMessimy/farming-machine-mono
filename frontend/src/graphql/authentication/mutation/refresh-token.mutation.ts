import { gql } from '@apollo/client';

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }
`;
