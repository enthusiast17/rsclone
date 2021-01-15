import React from 'react';
import {
  Layout, Input, Avatar, Dropdown, Menu, Button, notification, Typography, Space,
} from 'antd';
import {
  HomeOutlined,
  LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined,
} from '@ant-design/icons';
import { AxiosError } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import api from '../../utils/api';
import { IResponse } from '../../utils/interfaces';

const Header = () => {
  const history = useHistory();

  const logOut = () => api.get('auth/logout')
    .then((response: { data: IResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      history.go(0);
    })
    .catch((reason: AxiosError) => {
      notification.error({
        message: reason.response?.data.message,
        description: reason.response?.data.description,
      });
    });

  const menu = (
    <Menu>
      <Menu.Item key={0}>
        <Link to="/">
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key={1}>
        <Link to="/profile">
          <ProfileOutlined />
          My profile
        </Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to="/settings">
          <SettingOutlined />
          Settings
        </Link>
      </Menu.Item>
      <Menu.Item key={3} onClick={logOut}>
        <Link to="/logout">
          <LogoutOutlined />
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={styles.container}>
      <Input.Search className={styles.search} allowClear />

      <Space>
        <Typography.Text className={styles.title}>Full Name</Typography.Text>

        <Dropdown overlay={menu} trigger={['click']} arrow>
          <Button className={styles.dropdown} shape="circle" type="default" size="middle">
            <Avatar
              className={styles.avatar}
              size={30}
              icon={<UserOutlined />}
            />
          </Button>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default Header;
