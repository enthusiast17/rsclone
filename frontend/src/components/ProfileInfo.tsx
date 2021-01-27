import React, { useState } from 'react';
import {
  Card, Row, Col, Image, Typography, Divider, Button, Space,
} from 'antd';
import ProfileEdit from './ProfileEdit';

const { Text } = Typography;

const ProfileInfo = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Card
      style={{ border: '1px solid #D9D9D9', borderRadius: 2 }}
      bodyStyle={{ padding: 25 }}
    >
      {isEdit && (
        <ProfileEdit handleCancel={() => setIsEdit(false)} />
      )}

      {!isEdit && (
        <>
          <Row justify="center">
            <Col flex="150px" style={{ marginRight: 25 }}>
              <Space direction="vertical">
                <Row>
                  <Image
                    style={{ width: 150, height: 150, borderRadius: 2 }}
                    src="https://avatars.githubusercontent.com/u/52827869?s=460&u=20a8e5f73382165f5a1ba83e13bf498a1d708756&v=4"
                  />
                </Row>
                <Row>
                  <Button
                    type="default"
                    onClick={() => setIsEdit(true)}
                    block
                  >
                    Edit profile
                  </Button>
                </Row>
              </Space>
            </Col>
            <Col flex="350px">
              <Row><Text strong>Ulan Nurym</Text></Row>
              <Row><Text type="secondary">@enthusiast17</Text></Row>
              <Row><Text type="secondary">ulan@gmail.com</Text></Row>
              <Row><Text>17, January, 1999</Text></Row>
              <Row style={{ width: '100%' }}>
                <Text style={{ width: '100%', wordBreak: 'break-word', overflow: 'hidden' }}>
                  I love programming.
                  Bla bla bla Bla bla blaBla
                  Bla bla bla Bla bla blaBla
                  Bla bla bla Bla bla blaBla
                  Bla bla bla Bla bla blaBla
                  Bla bla bla Bla bla blaBla
                  Bla blaaaaaaaa
                </Text>
              </Row>
            </Col>
          </Row>
          <Divider style={{ margin: '10px 0px 10px 0px' }} />
          <Row justify="space-around">
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>0</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>posts</Text>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>0</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>followers</Text>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>0</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>following</Text>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'center' }} strong>0</Text>
              <Text type="secondary" style={{ textAlign: 'center' }}>groups</Text>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default ProfileInfo;
