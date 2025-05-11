import { useQuery, gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getUser(input: {}) {
      id
      email
    }
  }
`;
