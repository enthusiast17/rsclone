import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  List, Avatar, Typography, Row, Col, Spin,
} from 'antd';
import { IFollowersResponse, IUser } from '../utils/interfaces';
import api from '../utils/api';

const Followers = (props: { username: string }) => {
  const { username } = props;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [followers, setFollowers] = useState<IUser[]>([]);

  useEffect(() => {
    api.get(
      `/followers/?username=${username}`,
    )
      .then((response: { data: IFollowersResponse }) => {
        setLoading(false);
        setFollowers(response.data.data);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}

      {!isLoading && followers && (
        <>
          <Typography.Title level={3}>Followers</Typography.Title>
          <List
            itemLayout="horizontal"
            dataSource={followers}
            renderItem={(item) => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col style={{ marginRight: 10 }} flex="35px">
                    <Link to={`/profile/${item.username}`}>
                      {item.avatar && (
                        <Avatar
                          size={32}
                          src={`http://localhost:8000/${item.avatar}`}
                        />
                      )}
                      {!item.avatar && (
                        <Avatar
                          size={32}
                          icon={<UserOutlined />}
                        />
                      )}
                    </Link>
                  </Col>
                  <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/profile/${item.username}`}>
                      <Typography.Text strong ellipsis>{item.fullName}</Typography.Text>
                    </Link>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
};

export default Followers;
