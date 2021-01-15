import React from 'react';
import {
  Typography, Form, Input, Button, notification,
} from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import api from '../../utils/api';
import { ILoginForm, IResponse } from '../../utils/interfaces';

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (values: ILoginForm) => api.post(
    '/auth/login',
    values,
  ).then((response: { data: IResponse }) => {
    notification.success({
      message: response.data.message,
      description: response.data.description,
    });
    form.resetFields();
    history.go(0);
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
    <div className={styles.container}>
      <Typography.Title level={3}>Log in</Typography.Title>
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
