import React, { useState } from 'react';
import {
  Layout, Input, Avatar, Dropdown,
  Menu, Button, notification, Typography,
  Space, AutoComplete, Col, Row,
} from 'antd';
import { SelectProps } from 'antd/lib/select';
import {
  HomeOutlined,
  LogoutOutlined, MessageOutlined, ProfileOutlined, UserOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import api from '../../utils/api';
import { IResponse, ISearchResponse, IUser } from '../../utils/interfaces';
import { RootState } from '../../store/root';

const Header = () => {
  const { authState } = useSelector((state: RootState) => state);
  const history = useHistory();
  const [searchResult, setSearchResult] = useState<SelectProps<object>['options']>([]);

  const logOut = () => api.get('auth/logout')
    .then((response: { data: IResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      localStorage.clear();
      window.location.reload();
    })
    .catch((reason: { response: { data: IResponse } }) => {
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

  const handleSelect = (value: string) => {
    if (value === '') return;
    history.push(`/profile/${value}`);
  };

  const handleSearch = (value: string) => api.get(
    `/search/?value=${value}`,
  )
    .then((response: { data: ISearchResponse }) => {
      if (response.data.data.length === 0) {
        setSearchResult([
          {
            value: '',
            label: (
              <Row style={{ width: '100%' }}>
                <Typography.Text>Not Found</Typography.Text>
              </Row>
            ),
          },
        ]);
      } else {
        setSearchResult(
          response.data.data.map((user: IUser) => ({
            value: user.username,
            label: (
              <Row style={{ width: '100%' }}>
                <Col style={{ marginRight: 10 }} flex="10%">
                  {user.avatar && (
                  <Avatar
                    size={32}
                    src={`/${user.avatar}`}
                  />
                  )}
                  {!user.avatar && (
                  <Avatar
                    size={32}
                    icon={<UserOutlined />}
                  />
                  )}
                </Col>
                <Col flex="70%" style={{ display: 'flex', alignItems: 'center' }}>
                  <Space style={{ width: '100%', overflow: 'hidden' }} direction="vertical" size={0}>
                    <Typography.Text ellipsis>{user.fullName}</Typography.Text>
                    <Typography.Text ellipsis>{`@${user.username}`}</Typography.Text>
                  </Space>
                </Col>
              </Row>
            ),
          })),
        );
      }
    });

  const menu = (
    <Menu style={{ width: 180 }}>
      <Menu.ItemGroup
        key={0}
        title={`Signed as @${authState.username}`}
      />
      <Menu.Item key={1}>
        <Link to="/">
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to={`/profile/${authState.username}`}>
          <ProfileOutlined />
          My profile
        </Link>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to="/messages">
          <MessageOutlined />
          Messages
        </Link>
      </Menu.Item>
      <Menu.Item key={4} onClick={logOut}>
        <Link to="/">
          <LogoutOutlined />
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={styles.container}>
      <AutoComplete
        style={{
          width: 200,
        }}
        options={searchResult}
        onSelect={handleSelect}
      >
        <Input.Search
          placeholder="Search user"
          onSearch={handleSearch}
          allowClear
        />
      </AutoComplete>

      <Row
        className={styles.dropdownContainer}
      >
        <Typography.Text
          className={styles.title}
        >
          {authState.fullName}
        </Typography.Text>

        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <Button className={styles.dropdown} shape="circle" type="default" size="middle">
            {authState.avatar && (
              <Avatar
                size={32}
                src={`/${authState.avatar}`}
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
      </Row>
    </Layout.Header>
  );
};

export default Header;
