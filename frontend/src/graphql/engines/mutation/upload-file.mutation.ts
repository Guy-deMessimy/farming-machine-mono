import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation UpoadFile($file: Upload!) {
    uploadFile(file: $file) {
      fileName
    }
  }
`;
