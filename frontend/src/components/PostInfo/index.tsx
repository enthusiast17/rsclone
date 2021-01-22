import React from 'react';
import {
  Avatar, Card, Col, Divider, Row, Space, Typography, Image,
} from 'antd';
import {
  CommentOutlined, HeartFilled, HeartOutlined, UserOutlined,
} from '@ant-design/icons';
import { format } from 'timeago.js';
import { IPost } from '../../utils/interfaces';
import styles from './index.module.scss';

const PostInfo = ({ item }: {item: IPost}) => (
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
      <Row>
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
    <Row>
      <Space split={<Divider type="vertical" />}>
        <Space>
          <Col>
            { item.isUserLiked ? <HeartFilled /> : <HeartOutlined /> }
          </Col>
          <Col>
            <Typography.Text>{ item.likesCount }</Typography.Text>
          </Col>
        </Space>
        <Space>
          <Col>
            <CommentOutlined />
          </Col>
          <Col>
            <Typography.Text>0</Typography.Text>
          </Col>
        </Space>
      </Space>
    </Row>
  </Card>
);

export default PostInfo;
