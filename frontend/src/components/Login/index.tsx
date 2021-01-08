import React from 'react';
import {
  Typography, Form, Input, Button,
} from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { email: string, password: string }) => console.log(values);

  return (
    <div className={styles.container}>
      <Title level={2}>Log in</Title>
      <Form form={form} name="login" layout="vertical" scrollToFirstError onFinish={onFinish}>
        <Form.Item
          label="E-mail Address"
          name="email"
          rules={[
            { type: 'email', message: 'The input is not valid e-mail' },
            { required: true, message: 'Please, input your e-mail!' },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please, input your password!' },
          ]}
        >
          <Input.Password placeholder="********" type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
