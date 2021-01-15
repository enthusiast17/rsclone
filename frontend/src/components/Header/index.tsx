import React from 'react';
import {
  Layout, Input, Avatar, Dropdown, Menu, Typography, Button, notification,
} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import styles from './index.module.scss';
import api from '../../utils/api';

const logOut = () => api.get('auth/logout')
  .catch((reason: AxiosError) => {
    notification.error({
      message: reason.response?.data.message,
      description: reason.response?.data.description,
    });
  });

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/settings">Settings</a>
    </Menu.Item>
    <Menu.Item key="1" onClick={logOut}>
      <a href="/">Log out</a>
    </Menu.Item>
  </Menu>
);

const Header = () => (
  <Layout.Header className={styles.container}>
    <Input.Search className={styles.search} allowClear />

    <Dropdown overlay={menu}>
      <Button className={styles.dropdown} type="default" size="large">
        <Typography.Text className={styles.title}>Ulan</Typography.Text>
        <Avatar
          className={styles.avatar}
          size={30}
          icon={<UserOutlined />}
        />
        <DownOutlined />
      </Button>
    </Dropdown>
  </Layout.Header>
);

export default Header;
