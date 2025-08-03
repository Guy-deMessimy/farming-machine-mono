import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '../graphql/engines/mutation/upload-file.mutation';

type FileResponse = {
  uploadFile: {
    fileName: string;
    fileUrl: string;
  };
};

export const useUploadFileMutation = () => {
  const [uploadFileMutation, { data, loading, error }] = useMutation<FileResponse, { file: File }>(UPLOAD_FILE);

  return {
    uploadFile: uploadFileMutation,
    data,
    loading,
    error,
  };
};
