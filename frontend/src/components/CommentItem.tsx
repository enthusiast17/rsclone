import React from 'react';
import {
  Comment, Avatar, Col, Space, Typography,
} from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const CommentItem = () => (
  <Comment
    style={{
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#ffffff',
      border: '1px solid #D9D9D9',
      borderRadius: 2,
    }}
    actions={[(
      <Space>
        <Col
          style={{ cursor: 'pointer' }}
        >
          <HeartOutlined />
        </Col>
        <Col>
          <Typography.Text>0</Typography.Text>
        </Col>
      </Space>
    )]}
    author="Han Solo"
    avatar={(
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    )}
    content={(
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully
        and efficiently.
      </p>
    )}
  />
);

export default CommentItem;
