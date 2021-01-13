import React from 'react';
import {
  Typography, Form, Row, Col, Button, notification,
} from 'antd';
import { AxiosError } from 'axios';
import styles from './index.module.scss';
import api from '../../utils/api';
import steps from './steps';

const MAX_STEP = 2;

const Register = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formList, setFormList] = React.useState([{}, {}, {}]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const copyArr = formList;
    copyArr[currentStep] = values;
    setFormList(copyArr);
    if (currentStep === MAX_STEP) {
      api.post(
        '/auth/register',
        formList.reduce((object, element) => {
          Object.assign(
            object, Object.fromEntries(
              Object.entries(element).filter(([k]) => k !== 'confirm'),
            ),
          );
          return object;
        }, {}),
      ).then((response) => {
        notification.success({
          message: response.data.message,
          description: response.data.description,
        });
        form.resetFields();
        setTimeout(() => window.location.reload(), 1000);
      }).catch((reason: AxiosError) => {
        notification.error({
          message: reason.response?.data.message,
          description: reason.response?.data.description,
        });
      });
    }
    if (currentStep < MAX_STEP) setCurrentStep(currentStep + 1);
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={2}>Register</Typography.Title>
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
                  type="default"
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
