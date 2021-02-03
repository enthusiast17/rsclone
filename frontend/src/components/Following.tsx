import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  List, Avatar, Typography, Row, Col, Spin,
} from 'antd';
import { IFollowersResponse, IUser } from '../utils/interfaces';
import api from '../utils/api';

const Following = (props: { username: string }) => {
  const { username } = props;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [following, setFollowing] = useState<IUser[]>([]);

  useEffect(() => {
    setLoading(true);
    api.get(
      `/followers/following/?username=${username}`,
    )
      .then((response: { data: IFollowersResponse }) => {
        setLoading(false);
        setFollowing(response.data.data);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}

      {!isLoading && following && (
        <>
          <Typography.Title level={3}>Following</Typography.Title>
          <List
            itemLayout="horizontal"
            dataSource={following}
            renderItem={(item) => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col style={{ marginRight: 10 }} flex="35px">
                    <Link to={`/profile/${item.username}`}>
                      {item.avatar && (
                        <Avatar
                          size={32}
                          src={`/${item.avatar}`}
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
                      <Typography.Text ellipsis>{item.fullName}</Typography.Text>
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

export default Following;
