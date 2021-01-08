import React, { useState } from 'react';
import {
  Card, Typography, Modal, Button,
} from 'antd';
import Login from '../../components/Login';
import Register from '../../components/Register';
import styles from './index.module.scss';

const { Title } = Typography;

const Welcome = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const loginModalAction = () => setIsLoginVisible(!isLoginVisible);

  const registerModalAction = () => setIsRegisterVisible(!isRegisterVisible);

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <div>
          <Title className={styles.title} level={3}>Welcome!</Title>
          <Title className={styles.title} level={3}>Nice to meet you again.</Title>
        </div>
        <Button className={styles.loginBtn} type="primary" onClick={loginModalAction} block>
          Log in
        </Button>
        <Modal visible={isLoginVisible} footer={null} onCancel={loginModalAction} centered>
          <Login />
        </Modal>
        <Button className={styles.registerBtn} type="default" onClick={registerModalAction} block>
          Register
        </Button>
        <Modal visible={isRegisterVisible} footer={null} onCancel={registerModalAction} centered>
          <Register />
        </Modal>
      </Card>
    </div>
  );
};

export default Welcome;
