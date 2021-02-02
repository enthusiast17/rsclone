import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
  Row, Col, Avatar, Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import { IMessage } from '../utils/interfaces';

const MessageItem = (props: { item: IMessage }) => {
  const { item } = props;
  return (
    <div>
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
            <Typography.Text type="secondary">{`${new Date(item.createdDate).toLocaleString()}`}</Typography.Text>
          </Row>
        </Col>
      </Row>
      <Row style={{ overflow: 'auto' }}>
        <Row style={{ width: '100%', cursor: 'pointer' }}>
          <Link to={`/post/${'kek'}`}>
            <Typography.Text style={{ width: '100%' }}>{item.contentText}</Typography.Text>
          </Link>
        </Row>
      </Row>
    </div>
  );
};

export default MessageItem;
