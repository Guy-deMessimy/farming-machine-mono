import React, { Fragment, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useUploadFileMutation } from '../../../hooks/UseUploadFile';

type ChildrenProps = {
  children: () => JSX.Element;
};

const ShareProviderForm: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { uploadFile, loading, error } = useUploadFileMutation();

  const customUpload = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    setIsUploading(true);
    const realFile = file as File;

    try {
      const result = await uploadFile({ variables: { file: realFile } });
      message.success(`${realFile.name} uploaded successfully`);
      onSuccess?.(result, new XMLHttpRequest());
    } catch (error) {
      console.error('Upload failed:', error);
      message.error(`${realFile.name} upload failed`);
      onError?.(new Error('Upload failed'));
    } finally {
      setIsUploading(false);
    }
  };

  const props: UploadProps = {
    name: 'file',
    customRequest: customUpload,
    showUploadList: false,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default ShareProviderForm;
