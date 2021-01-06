import React from 'react';
import {
  Typography, Form, Row, Col, Input, DatePicker, Upload, Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => console.log(values);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Title level={3}>Register</Title>
        <Form form={form} layout="vertical" onFinish={onFinish} scrollToFirstError>
          <Row gutter={10} wrap>
            <Col flex="auto">
              <Form.Item label="First name" name="firstName" required>
                <Input placeholder="Example" />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Last name" name="lastName" required>
                <Input placeholder="Examplevich" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="auto">
              <Form.Item label="Email Address" name="email" required>
                <Input placeholder="example@email.com" type="email" />
              </Form.Item>
            </Col>
            <Col flex="50%">
              <Form.Item label="Birthday" name="birthday" required>
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="auto">
              <Form.Item label="Password" name="password" required>
                <Input.Password placeholder="********" type="password" />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Confirm Password" name="confirmPassword" required>
                <Input.Password placeholder="********" type="password" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="auto">
              <Form.Item label="Nickname" name="nickname">
                <Input placeholder="example" />
              </Form.Item>
            </Col>
            <Col flex="50%">
              <Form.Item label="Avatar" name="avatar">
                <Upload maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Col>
            <Form.Item label="About me" name="aboutMe">
              <Input.TextArea placeholder="I love programming. Blalabla" maxLength={100} />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
