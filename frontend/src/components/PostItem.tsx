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
import { useHistory } from 'react-router-dom';
import { IPost } from '../utils/interfaces';
import { setPost } from '../slices/postListSlice';
import api from '../utils/api';

const PostItem = (props: {
  item: IPost,
}) => {
  const { item } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const redirectPage = () => history.push(`/post/${item.id}`);

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
          <Avatar src={item.user.avatar} icon={!item.user.avatar ? <UserOutlined /> : ''} />
        </Col>
        <Col flex="auto">
          <Row>
            <Typography.Text strong ellipsis>{item.user.fullName}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text type="secondary">{`${format(item.createdDate)}`}</Typography.Text>
          </Row>
        </Col>
      </Row>
      <Row style={{ overflow: 'auto' }}>
        <Row style={{ width: '100%', cursor: 'pointer' }} onClick={redirectPage}>
          <Typography.Text style={{ width: '100%' }}>{item.contentText}</Typography.Text>
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
              src={`http://localhost:8000/${item.contentImage}`}
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
          <Space>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={redirectPage}
            >
              <CommentOutlined />
            </Col>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={redirectPage}
            >
              <Typography.Text>{ item.commentsCount }</Typography.Text>
            </Col>
          </Space>
        </Space>
      </Row>
    </Card>
  );
};

export default PostItem;
