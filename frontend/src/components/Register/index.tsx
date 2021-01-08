import React from 'react';
import {
  Typography, Form, Row, Col, Input, DatePicker, Button,
} from 'antd';
import styles from './index.module.scss';

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
                { type: 'email', message: 'The input is not valid e-mail' },
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
              rules={[
                { required: true, message: 'Please, input your password!' },
              ]}
            >
              <Input.Password placeholder="********" type="password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="100%">
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please, input your comfirm password!' },
              ]}
            >
              <Input.Password placeholder="********" type="password" />
            </Form.Item>
          </Col>
        </Row>
      </>
    ),
  },
];

const MAX_STEP = 2;
const { Title } = Typography;

const Register = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formList, setFormList] = React.useState([{}, {}, {}]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const copyArr = formList;
    copyArr[currentStep] = values;
    setFormList(copyArr);
    if (currentStep === MAX_STEP) console.log(formList);
    if (currentStep < MAX_STEP) setCurrentStep(currentStep + 1);
  };

  return (
    <div className={styles.container}>
      <Title level={2}>Register</Title>
      <Form form={form} layout="vertical" onFinish={onFinish} scrollToFirstError>
        <div className={styles.content}>
          {steps[currentStep].content}
        </div>
        <Form.Item>
          <Row>
            <Col flex="auto">
              {currentStep !== 0 && (
                <Button
                  className={styles.previousBtn}
                  type="primary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
            </Col>
            <Col flex="auto">
              <Button
                className={styles.nextBtn}
                type="primary"
                htmlType="submit"
              >
                {currentStep === MAX_STEP ? 'Register' : 'Next'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
