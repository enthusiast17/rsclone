import React from 'react';
import {
  UserOutlined, HeartOutlined, CommentOutlined,
} from '@ant-design/icons';
import {
  Card, Divider, Space, Image, Typography, Row, Col,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { format } from 'timeago.js';
import styles from './index.module.scss';
import { IPost } from '../../utils/interfaces';

const PostItem = (props: {
  item: IPost,
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}) => {
  const { item, handleClick } = props;

  return (
    <Card
      className={styles.card}
      size="small"
    >
      <Row className={styles.meta}>
        <Col flex="35px" className={styles.avatar}>
          <Avatar className={styles.img} src={item.user.avatar} icon={!item.user.avatar ? <UserOutlined /> : ''} />
        </Col>
        <Col flex="auto">
          <Row>
            <Typography.Text strong ellipsis>{item.user.fullName}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text type="secondary">{`${format(new Date(item.createdDate))}`}</Typography.Text>
          </Row>
        </Col>
      </Row>
      <Row
        className={styles.content}
      >
        <Row onClick={handleClick}>
          <Typography.Text>{item.contentText}</Typography.Text>
        </Row>
        {item.contentImage && (
          <Row>
            <Image
              className={styles.contentImage}
              alt="logo"
              src={`http://localhost:8000/${item.contentImage}`}
            />
          </Row>
        )}
      </Row>
      <Divider className={styles.divider} />
      <Row className={styles.footer} onClick={handleClick}>
        <Space split={<Divider type="vertical" />}>
          <Space>
            <HeartOutlined />
            <Col>
              <Typography.Text>0</Typography.Text>
            </Col>
          </Space>
          <Space>
            <CommentOutlined />
            <Col>
              <Typography.Text>0</Typography.Text>
            </Col>
          </Space>
        </Space>
      </Row>
    </Card>
  );
};

export default PostItem;
