import React, { useEffect, useState } from 'react';
import {
  Avatar, List, notification, Typography, Image, Card, Space, Divider,
} from 'antd';
import { CommentOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { format } from 'timeago.js';
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
      className={styles.list}
      grid={{ gutter: 10, column: 1 }}
      itemLayout="vertical"
      size="small"
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
          className={styles.listItem}
        >
          <Card
            key={index}
            className={styles.card}
            size="small"
            bordered={false}
          >
            <div className={styles.meta}>
              <div className={styles.avatar}>
                <Avatar className={styles.img} src={item.user.avatar} icon={!item.user.avatar ? <UserOutlined /> : ''} />
              </div>
              <div className={styles.metaContent}>
                <Typography.Text strong>{item.user.fullName}</Typography.Text>
                <Typography.Text type="secondary">{`${format(new Date(item.createdDate))}`}</Typography.Text>
              </div>
            </div>
            <div className={styles.content}>
              <Typography.Text>{item.contentText}</Typography.Text>
              {item.contentImage && (
                <Image
                  className={styles.img}
                  alt="logo"
                  src={`http://localhost:8000/${item.contentImage}`}
                />
              )}
            </div>
            <Divider className={styles.divider} />
            <Space split={<Divider type="vertical" />}>
              <Space>
                <HeartOutlined />
                <Typography.Text>0</Typography.Text>
              </Space>
              <Space>
                <CommentOutlined />
                <Typography.Text>0</Typography.Text>
              </Space>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default PostList;
