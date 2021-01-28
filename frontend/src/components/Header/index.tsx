import React from 'react';
import {
  Layout, Input, Avatar, Dropdown, Menu, Button, notification, Typography, Space,
} from 'antd';
import {
  HomeOutlined,
  LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined,
} from '@ant-design/icons';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import api from '../../utils/api';
import { IResponse } from '../../utils/interfaces';
import { RootState } from '../../store/root';

const Header = () => {
  const { authState } = useSelector((state: RootState) => state);

  const logOut = () => api.get('auth/logout')
    .then((response: { data: IResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      window.location.reload();
    })
    .catch((reason: AxiosError) => {
      notification.error({
        message: reason.response?.data.message,
        description: reason.response?.data.description,
      });
    });

  const menu = (
    <Menu style={{ width: 200 }}>
      <Menu.Item key={0}>
        <Link to="/">
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key={1}>
        <Link to={`/profile/${authState.username}`}>
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
        <Typography.Text className={styles.title}>{authState.fullName}</Typography.Text>

        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <Button className={styles.dropdown} shape="circle" type="default" size="middle">
            {authState.avatar && (
              <Avatar
                size={32}
                src={`http://localhost:8000/${authState.avatar}`}
              />
            )}
            {!authState.avatar && (
              <Avatar
                size={32}
                icon={<UserOutlined />}
              />
            )}
          </Button>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default Header;
