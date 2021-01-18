import React, { useEffect, useState } from 'react';
import {
  Avatar, Divider, List, notification, Space, Typography,
} from 'antd';
import { CommentOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import api from '../../utils/api';
import {
  IPost, IPostPagination, IPostResponse, IResponse,
} from '../../utils/interfaces';
import styles from './index.module.scss';

const PostList = () => {
  const [data, setData] = useState<IPostPagination>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/post/${page}`)
      .then((response: { data: IPostResponse }) => {
        setData(response.data.data);
      })
      .catch((reason: { response: { data: IResponse } }) => {
        if (!reason.response || !reason.response.data) {
          notification.error({
            message: 'Internal Error.',
            description: 'Upps! Sorry, something went wrong in internal server.',
          });
          return;
        }
        notification.error({
          message: reason.response.data.message,
          description: reason.response.data.description,
        });
      });
  }, [page]);

  return (
    <List
      className={styles.container}
      itemLayout="vertical"
      size="small"
      bordered
      dataSource={data?.posts}
      pagination={{
        onChange: (selectedPage: number) => {
          setPage(selectedPage);
        },
        pageSize: 5,
        total: data?.totalPostCount,
      }}
      renderItem={(item: IPost, index: number) => (
        <List.Item
          key={index}
          actions={[
            <Space>
              <HeartOutlined />
              0
            </Space>,
            <Space>
              <CommentOutlined />
              0
            </Space>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} icon={!item.user.avatar ? <UserOutlined /> : ''} />}
            title={<a href="/">{item.user.fullName}</a>}
            description={`${new Date(item.createdDate).toDateString()}`}
          />
          <Typography.Text>{item.contentText}</Typography.Text>
          {item.contentImage && (
            <>
              <Divider dashed />
              <img
                className={styles.img}
                alt="logo"
                src={`http://localhost:8000/${item.contentImage}`}
              />
            </>
          )}
        </List.Item>
      )}
    />
  );
};

export default PostList;
