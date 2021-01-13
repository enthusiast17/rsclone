import React from 'react';
import {
  Form, Col, DatePicker, Input, Row,
} from 'antd';

const steps = [
  {
    content: (
      <>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { min: 3, message: 'First name should be at least 3 character long.' },
                { max: 50, message: 'First name should not be longer than 50 character' },
                { required: true, message: 'Please, input your first name!' },
              ]}
            >
              <Input placeholder="Example" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { min: 3, message: 'Last name should be at least 3 character long.' },
                { max: 50, message: 'Last name should not be longer than 50 character' },
                { required: true, message: 'Please, input your last name!' },
              ]}
            >
              <Input placeholder="Examplevich" />
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
  },
  {
    content: (
      <>
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
              label="Birthday Date"
              name="birthdayDate"
              rules={[
                { required: true, message: 'Please, pick your birthday!' },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
  },
  {
    content: (
      <>
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
              <Input.Password />
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
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
  },
];

export default steps;
