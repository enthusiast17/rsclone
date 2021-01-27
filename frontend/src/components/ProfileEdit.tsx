import React from 'react';
import {
  Form, Row, Col, Upload, Input, Button, DatePicker,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ProfileEdit = (props: { handleCancel: () => void }) => {
  const { handleCancel } = props;
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
    >
      <Row justify="center">
        <Col flex="104px" style={{ marginRight: 25 }}>
          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-card"
              maxCount={1}
            >
              <PlusOutlined />
            </Upload>
          </Form.Item>
        </Col>
        <Col flex="350px" style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
          <Row>
            <Form.Item name="fullName" style={{ margin: 0, width: '100%' }}>
              <Input placeholder="Full name" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="username" style={{ margin: 0, width: '100%' }}>
              <Input placeholder="Username" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="email" style={{ margin: 0, width: '100%' }}>
              <Input placeholder="E-mail" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="birthdayDate" style={{ margin: 0, width: '100%' }}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Row>
          <Row style={{ height: 76, width: '100%' }}>
            <Form.Item name="aboutme" style={{ margin: 0, width: '100%' }}>
              <Input.TextArea style={{ display: 'block' }} showCount placeholder="About me" maxLength={150} />
            </Form.Item>
          </Row>
          <Row justify="end">
            <Form.Item
              style={{ margin: 0 }}
            >
              <Button
                style={{ marginRight: 10 }}
                type="default"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEdit;
