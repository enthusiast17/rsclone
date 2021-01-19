import React, { useEffect, useState } from 'react';
import {
  Avatar, List, notification, Typography, Image, Card, Space, Divider, Button,
} from 'antd';
import { CommentOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api';
import {
  IPost, IPostResponse, IResponse,
} from '../../utils/interfaces';
import styles from './index.module.scss';
import {
  setCurrentPage, setNextPage, setPageCount, setPosts, setTotalPostCount,
} from '../../slices/postListSlice';
import { RootState } from '../../store/root';

const PostList = () => {
  const dispatch = useDispatch();
  const { postListState } = useSelector((state: RootState) => state);
  const [page, setPage] = useState<string | null>('/post/1');

  useEffect(() => {
    if (!page) return;
    api.get(page)
      .then((response: { data: IPostResponse }) => {
        const {
          posts, currentPage, nextPage, totalPostCount, pageCount,
        } = response.data.data;
        dispatch(setPosts(posts));
        dispatch(setCurrentPage(currentPage));
        dispatch(setNextPage(nextPage));
        dispatch(setTotalPostCount(totalPostCount));
        dispatch(setPageCount(pageCount));
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
      loadMore={postListState.nextPage && (
        <Button type="primary" onClick={() => setPage(postListState.nextPage)} block>Load more</Button>
      )}
      dataSource={postListState.posts}
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
