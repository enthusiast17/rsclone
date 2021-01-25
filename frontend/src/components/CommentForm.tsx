import React from 'react';
import {
  Card, Row, Col, Avatar, Button, Form, notification, Input,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ICommentResponse, IResponse } from '../utils/interfaces';
import { setCommentsCount, setRefreshComments } from '../slices/postPageSlice';
import { RootState } from '../store/root';
import api from '../utils/api';

const { TextArea } = Input;

const CommentForm = (props: { postId: string }) => {
  const { postId } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { postPageState } = useSelector((state: RootState) => state);

  const onFinish = (values: { contentText: string }) => {
    api.post(
      '/comments',
      { postId, ...values },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((response: { data: ICommentResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      dispatch(setCommentsCount(postPageState.commentsCount + 1));
      dispatch(setRefreshComments(true));
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
      size="small"
      bodyStyle={{ padding: 10, border: '1px solid #D9D9D9', borderRadius: 2 }}
    >
      <Form
        form={form}
        name="comment form"
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Row>
          <Col style={{ marginRight: 10 }} flex="35px">
            <Avatar icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <Row>
              <Form.Item
                style={{ width: '100%' }}
                name="contentText"
              >
                <TextArea showCount autoSize maxLength={500} />
              </Form.Item>
            </Row>
            <Row style={{ position: 'relative' }}>
              <Form.Item
                style={{ margin: '0px 0px 0px auto' }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Comment
                </Button>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CommentForm;
