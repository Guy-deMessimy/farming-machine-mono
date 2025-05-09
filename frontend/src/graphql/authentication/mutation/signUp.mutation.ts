import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpDto!) {
    signUp(input: $input) {
      email
      id
    }
  }
`;
