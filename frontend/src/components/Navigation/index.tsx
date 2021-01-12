import React from 'react';
import { Menu } from 'antd';
import {
  ProfileOutlined, HomeOutlined, MessageOutlined, UserOutlined, TeamOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Navigation = () => (
  <Menu
    className={styles.container}
  >
    <Menu.Item key={1} icon={<ProfileOutlined />}>
      <Link to="/profile">My Profile</Link>
    </Menu.Item>
    <Menu.Item key={2} icon={<HomeOutlined />}>
      <Link to="/">Main</Link>
    </Menu.Item>
    <Menu.Item key={3} icon={<MessageOutlined />}>
      <Link to="/messages">Messages</Link>
    </Menu.Item>
    <Menu.Item key={4} icon={<TeamOutlined />}>
      <Link to="/groups">Groups</Link>
    </Menu.Item>
    <Menu.Item key={5} icon={<UserOutlined />}>
      <Link to="/following">Following</Link>
    </Menu.Item>
  </Menu>
);

export default Navigation;
