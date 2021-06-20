import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FilesApi from '../api/files';
import UserApi from '../api/users';
import UserFileList from './UserFileList';
import UploadUserFiles from './UploadUserFiles';

const Container = styled.div`
  padding: 36px;
`;

function fileRecordToListItem(record) {
  return {
    id: record.id,
    name: record.fileName,
    size: record.size,
    uploadedAt: record.uploadAt,
  };
}

function fileObjectToListItem(file, progress) {
  return {
    id: file.uid,
    name: file.name,
    size: file.size,
    isUploading: true,
    uploadProgress: progress,
  };
}

const MainPage = () => {
  // Uploaded user file records
  const [userFileRecords, setUserFileRecords] = useState([]);
  const [isLoadingFileRecords, setIsLoadingFileRecords] = useState(true);
  // Files to upload
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [fileUploadProgress, setFileUploadProgress] = useState({});

  useEffect(() => {
    async function getFiles() {
      setIsLoadingFileRecords(true);
      const currentUserId = UserApi.getCurrentUserId();
      const files = await FilesApi.getUserFiles(currentUserId);
      setUserFileRecords(files);
      setIsLoadingFileRecords(false);
    }
    getFiles();
  }, []);

  const onAddFiles = async (files) => {
    const userId = UserApi.getCurrentUserId();

    setFilesToUpload((filesToUpload) => [...files, ...filesToUpload]);

    files.forEach(async (file) => {
      const fileRecord = await FilesApi.uploadUserFile(
        userId,
        file,
        (progress) => {
          setFileUploadProgress((fileUploadProgress) => ({
            ...fileUploadProgress,
            [file.name]: progress,
          }));
        }
      );
      setUserFileRecords((userFiles) => {
        return [fileRecord, ...userFiles];
      });
      setFilesToUpload((filesToUpload) =>
        filesToUpload.filter((item) => item.name !== file.name)
      );
    });
  };

  const onDelete = async (recordId) => {
    const userId = UserApi.getCurrentUserId();
    const recordToDelete = userFileRecords.find(
      (record) => record.id === recordId
    );
    if (recordToDelete) {
      await FilesApi.deleteUserFile(userId, recordToDelete);
      setUserFileRecords((userFileRecords) =>
        userFileRecords.filter((record) => record.id !== recordToDelete.id)
      );
    }
  };
  return (
    <Container>
      <UploadUserFiles onChange={onAddFiles} />
      <br />
      <UserFileList
        items={[
          ...filesToUpload.map((file) =>
            fileObjectToListItem(file, fileUploadProgress[file.name])
          ),
          ...userFileRecords.map((record) => fileRecordToListItem(record)),
        ]}
        onDelete={onDelete}
        isLoading={isLoadingFileRecords}
      />
    </Container>
  );
};

export default MainPage;
