import React, { useState } from 'react';
import {
  Card, Row, Col, Image, Avatar, Typography, Divider, Button, Space,
} from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import ProfileEdit from './ProfileEdit';
import { IProfile } from '../utils/interfaces';
import { RootState } from '../store/root';

const { Text } = Typography;

const ProfileInfo = (props: { item: IProfile }) => {
  const { item } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { authState } = useSelector((state: RootState) => state);

  return (
    <Card
      style={{ border: '1px solid #D9D9D9', borderRadius: 2 }}
      bodyStyle={{ padding: 25 }}
    >
      {isEdit && (
        <ProfileEdit item={item} handleCancel={() => setIsEdit(false)} />
      )}

      {!isEdit && (
        <>
          <Row justify="center">
            <Col flex="150px" style={{ marginRight: 25 }}>
              <Space direction="vertical">
                <Row>
                  {item.avatar && (
                    <Image
                      style={{ width: 150, height: 150, borderRadius: 2 }}
                      src={`http://localhost:8000/${item.avatar}`}
                    />
                  )}
                  {!item.avatar && (
                    <Avatar
                      shape="square"
                      style={{
                        height: 150,
                        width: 150,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      icon={<UserOutlined style={{ fontSize: 50 }} />}
                    />
                  )}
                </Row>
                <Row>
                  {authState.username === item.username && (
                    <Button
                      type="default"
                      onClick={() => setIsEdit(true)}
                      block
                    >
                      Edit profile
                    </Button>
                  )}

                  {authState.username !== item.username && (
                    <Button
                      type="primary"
                      block
                    >
                      Follow
                    </Button>
                  )}
                </Row>
              </Space>
            </Col>
            <Col flex="350px">
              <Row><Text strong>{item.fullName}</Text></Row>
              <Row><Text type="secondary">{`@${item.username}`}</Text></Row>
              <Row><Text type="secondary">{item.email}</Text></Row>
              {item.birthdayDate && (
                <Row><Text>{new Date(item.birthdayDate).toDateString()}</Text></Row>
              )}
              {item.aboutme && (
                <Row style={{ width: '100%' }}>
                  <Text style={{ width: '100%', wordBreak: 'break-word', overflow: 'hidden' }}>
                    {item.aboutme}
                  </Text>
                </Row>
              )}
            </Col>
          </Row>
          <Divider style={{ margin: '10px 0px 10px 0px' }} />
          <Row justify="space-around">
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>{item.postsCount}</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>posts</Text>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>{item.followersCount}</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>followers</Text>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>{item.followingCount}</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>following</Text>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>{item.groupsCount}</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>groups</Text>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default ProfileInfo;
