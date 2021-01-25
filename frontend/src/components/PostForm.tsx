import React from 'react';
import {
  Button, Card, Form, notification, Row, Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { IResponse } from '../utils/interfaces';
import { resetPostListSlice, setCurrentPage } from '../slices/postListSlice';
import api from '../utils/api';

const PostForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values: { contentText: string, contentImage: any }) => {
    const formData = new FormData();
    formData.append('contentText', values.contentText);
    if (values.contentImage) {
      formData.append('contentImage', values.contentImage.file.originFileObj);
    }
    api.post(
      '/posts',
      formData,
    ).then((response: { data: IResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      form.resetFields();
      dispatch(resetPostListSlice());
      dispatch(setCurrentPage(-1));
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
    <Card
      style={{ border: '1px solid #D9D9D9', borderRadius: 2 }}
      bodyStyle={{ padding: 10 }}
    >
      <Form
        form={form}
        name="postform"
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Form.Item
          name="contentText"
        >
          <TextArea showCount autoSize maxLength={1000} />
        </Form.Item>
        <Row style={{ position: 'relative' }}>
          <Form.Item
            style={{ margin: 0, width: '100%' }}
            name="contentImage"
            valuePropName="contentImage"
          >
            <Upload
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload image (Max: 1)</Button>
            </Upload>
          </Form.Item>
          <Form.Item style={{
            margin: 0,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              Post
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default PostForm;
