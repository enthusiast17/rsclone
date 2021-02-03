import React from 'react';
import {
  Form, Row, Col, Upload, Input, Button, DatePicker, notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { IProfile, IProfileResponse, IResponse } from '../utils/interfaces';
import { updateProfilePageSlice } from '../slices/profilePageSlice';
import { updateAuthSlice } from '../slices/authSlice';
import api from '../utils/api';

const ProfileEdit = (props: { item: IProfile, handleCancel: () => void }) => {
  const { item, handleCancel } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleEdit = (values: {
    fullName: string,
    email: string,
    username: string,
    birthdayDate: Date | null,
    avatar: any | null,
    aboutme: string | null,
  }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (k === 'avatar') return;
      if (k === 'aboutme' && v === '') {
        formData.append(k, 'null');
        return;
      }
      formData.append(k, v);
    });
    if (!values.avatar?.file) {
      if (values.avatar?.name) {
        formData.append('avatar', values.avatar.name);
      }
    } else {
      formData.append('avatar', values.avatar.file.originFileObj);
    }
    api.put(
      `/profile/username/${item.username}`,
      formData,
    ).then((response: { data: IProfileResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      dispatch(updateProfilePageSlice(response.data.data));
      const {
        fullName,
        email,
        username,
        avatar,
      } = response.data.data;
      dispatch(updateAuthSlice({
        fullName,
        email,
        username,
        avatar,
      }));
      handleCancel();
    }).catch((reason: { response: { data: IResponse } }) => {
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
  };

  return (
    <Form
      form={form}
      onFinish={handleEdit}
      initialValues={{
        ...item,
        avatar: {
          uid: '1',
          name: item.avatar as string,
          status: 'done',
          url: `/${item.avatar}`,
          thumbUrl: `/${item.avatar}`,
          type: 'picture',
          size: 0,
        },
        birthdayDate: item.birthdayDate ? moment(item.birthdayDate) : null,
      }}
    >
      <Row justify="center">
        <Col flex="104px" style={{ marginRight: 25 }}>
          <Form.Item
            name="avatar"
          >
            <Upload
              defaultFileList={(item.avatar && [
                {
                  uid: '1',
                  name: item.avatar as string,
                  status: 'done',
                  url: `/${item.avatar}`,
                  thumbUrl: `/${item.avatar}`,
                  type: 'picture',
                  size: 0,
                },
              ]) || []}
              listType="picture-card"
              maxCount={1}
            >
              <PlusOutlined />
            </Upload>
          </Form.Item>
        </Col>
        <Col flex="350px" style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
          <Row>
            <Form.Item name="fullName" style={{ margin: 0, width: '100%' }}>
              <Input placeholder="Full name" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="username" style={{ margin: 0, width: '100%' }}>
              <Input placeholder="Username" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="email" style={{ margin: 0, width: '100%' }}>
              <Input placeholder="E-mail" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="birthdayDate" style={{ margin: 0, width: '100%' }}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Row>
          <Row style={{ height: 76, width: '100%' }}>
            <Form.Item name="aboutme" style={{ margin: 0, width: '100%' }}>
              <Input.TextArea style={{ display: 'block' }} showCount placeholder="About me" maxLength={150} />
            </Form.Item>
          </Row>
          <Row justify="end">
            <Form.Item
              style={{ margin: 0 }}
            >
              <Button
                style={{ marginRight: 10 }}
                type="default"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEdit;
