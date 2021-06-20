import React from 'react';
import { List, Skeleton, Progress } from 'antd';
import styled from 'styled-components';
import file from '../images/file.svg';

const FileDescription = styled.div`
  display: flex;
  flex-direction: row;
  color: rgba(0, 0, 0, 0.45);
  span {
    font-weight: bold;
  }

  .description-item {
    margin-right: 40px;
  }
`;

const FileListItem = ({
  id,
  name,
  size,
  uploadedAt,
  isUploading,
  uploadProgress,
  onDelete,
}) => {
  return (
    <List.Item
      actions={
        isUploading
          ? []
          : [
              <a key="list-loadmore-delete" onClick={() => onDelete(id)}>
                Delete
              </a>,
            ]
      }
    >
      <Skeleton avatar title={false} loading={false} active>
        <List.Item.Meta
          avatar={<img alt="file" src={file} />}
          title={name}
          description={
            <div>
              <FileDescription>
                {isUploading ? (
                  <div>
                    Uploading ({uploadProgress ? uploadProgress.toFixed(2) : 0}
                    %)
                  </div>
                ) : (
                  <>
                    <div className="description-item">
                      Uploaded on:
                      <span> {uploadedAt}</span>
                    </div>
                    <div className="description-item">
                      Size:
                      <span> {size}KB</span>
                    </div>
                  </>
                )}
              </FileDescription>
              {isUploading ? (
                <Progress
                  percent={Math.round(uploadProgress || 0)}
                  showInfo={false}
                />
              ) : null}
            </div>
          }
        />
      </Skeleton>
    </List.Item>
  );
};

const UserFileList = ({ items, isLoading, onDelete }) => {
  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={isLoading}
        locale={{
          emptyText: 'You have no files uploaded. Click above to add files.',
        }}
        itemLayout="horizontal"
        dataSource={items.map((item) => ({ ...item, onDelete }))}
        renderItem={FileListItem}
      />
    </div>
  );
};

export default UserFileList;
