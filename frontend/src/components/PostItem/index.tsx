import React from 'react';
import { UserOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import {
  Card, Divider, Space, Image, Typography,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { format } from 'timeago.js';
import { IPost } from '../../utils/interfaces';
import styles from './index.module.scss';

const PostItem = (props: {
  item: IPost,
  hoverable: boolean,
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}) => {
  const { item, hoverable, handleClick } = props;

  return (
    <Card
      className={styles.card}
      size="small"
      bordered={false}
      hoverable={hoverable}
      onClick={handleClick}
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
  );
};

export default PostItem;
