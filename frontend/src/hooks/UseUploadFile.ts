import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '../graphql/engines/mutation/upload-file.mutation';

type FileInput = {
  file: string;
};

type FileResponse = {};

export const useUploadFileMutation = () => {
  const [uploadFileMutation, { data, loading, error }] = useMutation<any, { input: FileInput }>(UPLOAD_FILE);

  return {
    uploadFile: uploadFileMutation,
    data,
    loading,
    error,
  };
};
