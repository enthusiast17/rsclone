import React from 'react';
import {
  UserOutlined, HeartOutlined, CommentOutlined, HeartFilled,
} from '@ant-design/icons';
import {
  Card, Divider, Space, Image, Typography, Row, Col,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { format } from 'timeago.js';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { IPost } from '../../utils/interfaces';
import { setPost } from '../../slices/postListSlice';
import api from '../../utils/api';

const PostItem = (props: {
  item: IPost,
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}) => {
  const { item, handleClick } = props;
  const dispatch = useDispatch();

  const handleLike = () => {
    api.post(
      `/likes/?post=${item.id}`,
    )
      .then(() => {
        dispatch(setPost({
          ...item,
          isUserLiked: !item.isUserLiked,
          likesCount: item.isUserLiked ? item.likesCount - 1 : item.likesCount + 1,
        }));
      });
  };

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
      <Row className={styles.footer}>
        <Space split={<Divider type="vertical" />}>
          <Space>
            <Col
              className={styles.likes}
              onClick={handleLike}
            >
              { item.isUserLiked ? <HeartFilled /> : <HeartOutlined /> }
            </Col>
            <Col>
              <Typography.Text>{ item.likesCount }</Typography.Text>
            </Col>
          </Space>
          <Space>
            <Col
              className={styles.comments}
              onClick={handleClick}
            >
              <CommentOutlined />
            </Col>
            <Col
              className={styles.comments}
              onClick={handleClick}
            >
              <Typography.Text>0</Typography.Text>
            </Col>
          </Space>
        </Space>
      </Row>
    </Card>
  );
};

export default PostItem;
