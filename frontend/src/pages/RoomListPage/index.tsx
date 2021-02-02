import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography, List, Row, Col, Avatar,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/root';
import api from '../../utils/api';
import { IUser, IFollowersResponse } from '../../utils/interfaces';
import styles from './index.module.scss';
import Loading from '../../components/Loading';

const RoomListPage = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [following, setFollowing] = useState<IUser[]>([]);
  const { authState } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!authState.username) return;
    api.get(
      `/followers/following/?username=${authState.username}`,
    )
      .then((response: { data: IFollowersResponse }) => {
        setLoading(false);
        setFollowing(response.data.data);
      });
  }, [authState.username]);

  return (
    <>
      {isLoading && (
        <Loading />
      )}
      {!isLoading && following && (
        <div className={styles.container}>
          <Row className={styles.header}>
            <Typography.Text strong>Select user to open private chat</Typography.Text>
          </Row>
          <List
            style={{
              padding: '10px 20px 20px',
            }}
            itemLayout="horizontal"
            dataSource={following}
            split
            renderItem={(item) => (
              <Link to={`/messages/${item.username}`}>
                <List.Item>
                  <Row style={{ width: '100%' }}>
                    <Col style={{ marginRight: 10 }} flex="35px">
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
                    </Col>
                    <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography.Text ellipsis>{item.fullName}</Typography.Text>
                    </Col>
                  </Row>
                </List.Item>
              </Link>
            )}
          />
        </div>
      )}
    </>
  );
};

export default RoomListPage;
