import React from 'react';
import {
  Typography, Form, Row, Col, Input, notification, Button,
} from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import api from '../../utils/api';
import { IRegisterForm, IResponse } from '../../utils/interfaces';

const Register = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values: IRegisterForm) => {
    api.post(
      '/auth/register',
      Object.fromEntries(
        Object.entries(values)
          .filter(([k]) => k !== 'confirm'),
      ),
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
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={3}>Register</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish} scrollToFirstError>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                { min: 3, message: 'Full name should be at least 3 character long.' },
                { max: 50, message: 'Full name should not be longer than 50 character' },
                { required: true, message: 'Please, input your full name!' },
              ]}
            >
              <Input placeholder="Example Examplevich" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="E-mail Address"
              name="email"
              rules={[
                { type: 'email', message: 'E-mail is not valid' },
                { required: true, message: 'Please, input your e-mail!' },
              ]}
            >
              <Input placeholder="example@email.com" type="email" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              rules={[
                { required: true, message: 'Please, input your password!' },
                { min: 8, message: 'Password should be at least 8 character long.' },
                { max: 26, message: 'Password should not be longer than 26 character.' },
                { pattern: /(?=.*[a-z])/, message: 'Password should contain at least 1 lower-cased letter.' },
                { pattern: /(?=.*[A-Z])/, message: 'Password should contain at least 1 upper-cased letter.' },
                { pattern: /(?=.*\d)/, message: 'Password should contain at least 1 number' },
                { pattern: /(?=.*[@#$%^&+=])/, message: 'Password should contain at least 1 symbol.' },
              ]}
            >
              <Input.Password placeholder="********" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please, input your confirm password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="********" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="100%">
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
