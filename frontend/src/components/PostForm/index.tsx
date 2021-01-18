import React from 'react';
import {
  Button, Card, Form, notification, Row, Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import api from '../../utils/api';
import { IResponse } from '../../utils/interfaces';

const PostForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { contentText: string, contentImage: any }) => {
    const formData = new FormData();
    formData.append('contentText', values.contentText);
    formData.append('contentImage', values.contentImage.file.originFileObj);
    api.post(
      '/post',
      formData,
    ).then((response: { data: IResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      form.resetFields();
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
      className={styles.container}
      bodyStyle={{ padding: 0 }}
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
          <TextArea showCount maxLength={1000} />
        </Form.Item>
        <Row className={styles.row}>
          <Form.Item
            className={styles.upload}
            name="contentImage"
          >
            <Upload
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload image (Max: 1)</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            className={styles.postBtn}
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
