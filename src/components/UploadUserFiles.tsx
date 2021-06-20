import React, { useCallback } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const Container = styled.div`
  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    background: #f4faff;
    border-radius: 5px;
    border: ${(props) =>
      props.isDragActive ? '2px dashed #0a448d' : '2px dashed #dedede'};
  }
`;

const UploadUserFiles = ({ onChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container isDragActive={isDragActive}>
      <div {...getRootProps({ className: 'upload-area' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <Button type="primary">Click to upload files</Button>
      </div>
    </Container>
  );
};

export default UploadUserFiles;
