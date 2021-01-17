import React from 'react';
import {
  Button, Card, Form, Row, Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const PostForm = () => {
  const [form] = Form.useForm();

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
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
