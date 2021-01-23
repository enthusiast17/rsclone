import React from 'react';
import {
  Card, Row, Col, Avatar, Button, Form,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const CommentForm = () => (
  <Card
    size="small"
    bodyStyle={{ padding: 10, border: '1px solid #D9D9D9', borderRadius: 2 }}
  >
    <Form>
      <Row>
        <Col style={{ marginRight: 10 }} flex="35px">
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col flex="auto">
          <Row>
            <TextArea style={{ width: '100%' }} showCount maxLength={500} />
          </Row>
          <Row style={{ position: 'relative' }}>
            <Form.Item
              style={{ margin: '0px 0px 0px auto' }}
            >
              <Button
                type="primary"
                htmlType="submit"
              >
                Comment
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  </Card>
);

export default CommentForm;
