import React from 'react';
import {
  Layout, Input, Avatar, Dropdown, Menu, Typography, Button, notification,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import styles from './index.module.scss';
import api from '../../utils/api';

const { Search } = Input;
const { Text } = Typography;

const logOut = () => api.get('auth/logout')
  .then(() => window.location.reload())
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
    <Search className={styles.search} allowClear />

    <Dropdown overlay={menu}>
      <Button className={styles.dropdown} type="default" size="large">
        <Text className={styles.title}>Ulan</Text>
        <Avatar
          className={styles.avatar}
          size={30}
          src="https://avatars1.githubusercontent.com/u/52827869?s=460&u=fa49f4c32f3db4a377bbd4dbf9a49099d3f9a34d&v=4"
        />
        <DownOutlined />
      </Button>
    </Dropdown>
  </Layout.Header>
);

export default Header;
