import React from 'react';
import {
  HeartOutlined, CommentOutlined, HeartFilled, UserOutlined,
} from '@ant-design/icons';
import {
  Card, Divider, Space, Image, Typography, Row, Col, Avatar,
} from 'antd';
import { format } from 'timeago.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IPost } from '../utils/interfaces';
import { setPost } from '../slices/postListSlice';
import api from '../utils/api';

const PostItem = (props: {
  item: IPost,
}) => {
  const { item } = props;
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
      style={{ border: '1px solid #D9D9D9', borderRadius: 2 }}
      size="small"
    >
      <Row>
        <Col style={{ marginRight: 10 }} flex="35px">
          <Link to={`/profile/${item.user.username}`}>
            {item.user.avatar && (
              <Avatar
                size={32}
                src={`/${item.user.avatar}`}
              />
            )}
            {!item.user.avatar && (
              <Avatar
                size={32}
                icon={<UserOutlined />}
              />
            )}
          </Link>
        </Col>
        <Col flex="auto">
          <Row>
            <Link to={`/profile/${item.user.username}`}>
              <Typography.Text strong ellipsis>{item.user.fullName}</Typography.Text>
            </Link>
          </Row>
          <Row>
            <Typography.Text type="secondary">{`${format(new Date(item.createdAt))}`}</Typography.Text>
          </Row>
        </Col>
      </Row>
      <Row style={{ overflow: 'auto' }}>
        <Row style={{ width: '100%', cursor: 'pointer' }}>
          <Link style={{ width: '100%' }} to={`/post/${item.id}`}>
            <Typography.Text style={{ width: '100%' }}>{item.contentText}</Typography.Text>
          </Link>
        </Row>
        {item.contentImage && (
          <Row style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <Image
              style={{ maxWidth: '100%' }}
              alt="logo"
              src={`/${item.contentImage}`}
            />
          </Row>
        )}
      </Row>
      <Divider style={{ margin: '10px 0px 10px 0px' }} />
      <Row>
        <Space split={<Divider type="vertical" />}>
          <Space>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={handleLike}
            >
              { item.isUserLiked ? <HeartFilled /> : <HeartOutlined /> }
            </Col>
            <Col>
              <Typography.Text>{ item.likesCount }</Typography.Text>
            </Col>
          </Space>
          <Link to={`/post/${item.id}`}>
            <Space>
              <Col
                style={{ cursor: 'pointer' }}
              >
                <CommentOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
              </Col>
              <Col
                style={{ cursor: 'pointer' }}
              >
                <Typography.Text>{ item.commentsCount }</Typography.Text>
              </Col>
            </Space>
          </Link>
        </Space>
      </Row>
    </Card>
  );
};

export default PostItem;
