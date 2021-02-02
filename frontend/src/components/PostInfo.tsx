import React, { useState } from 'react';
import {
  Avatar, Card, Col, Divider, Row, Space, Typography, Image, notification, Popconfirm,
} from 'antd';
import {
  CommentOutlined, DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, UserOutlined,
} from '@ant-design/icons';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IPost, IResponse } from '../utils/interfaces';
import { setIsUserLiked, setLikesCount } from '../slices/postPageSlice';
import { RootState } from '../store/root';
import api from '../utils/api';
import PostEditForm from './PostEditForm';

const PostInfo = ({ item }: {item: IPost}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { authState } = useSelector((state: RootState) => state);

  const handleLike = () => {
    api.post(
      `/likes/?post=${item.id}`,
    )
      .then(() => {
        dispatch(setIsUserLiked(!item.isUserLiked));
        dispatch(setLikesCount(item.isUserLiked ? item.likesCount - 1 : item.likesCount + 1));
      });
  };

  const handleDelete = () => api.delete(
    `/posts/id/${item.id}`,
  ).then((response: { data: IResponse }) => {
    notification.success({
      message: response.data.message,
      description: response.data.description,
    });
    history.push('/');
  }).catch((reason: { response: { data: IResponse } }) => {
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
            <Typography.Text type="secondary">{`${format(item.createdDate)}`}</Typography.Text>
          </Row>
        </Col>
      </Row>
      {isEdit && (
        <PostEditForm item={item} handleCancel={() => setIsEdit(false)} />
      )}
      {!isEdit && (
        <>
          <Row style={{ overflow: 'auto' }}>
            <Row style={{ width: '100%' }}>
              <Typography.Text>{item.contentText}</Typography.Text>
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
              <Space>
                <Col>
                  <CommentOutlined />
                </Col>
                <Col>
                  <Typography.Text>{ item.commentsCount }</Typography.Text>
                </Col>
              </Space>
              {authState.email === item.user.email && (
              <>
                <Col>
                  <EditOutlined onClick={() => setIsEdit(true)} />
                </Col>
                <Col>
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </Col>
              </>
              )}
            </Space>
          </Row>
        </>
      )}
    </Card>
  );
};

export default PostInfo;
