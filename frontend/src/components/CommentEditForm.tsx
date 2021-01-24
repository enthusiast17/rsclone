import React from 'react';
import {
  Row, Button, Form, Input, notification,
} from 'antd';
import { useDispatch } from 'react-redux';
import { IComment, ICommentResponse, IResponse } from '../utils/interfaces';
import { setComment } from '../slices/postPageSlice';
import api from '../utils/api';

const { TextArea } = Input;

const CommentEditForm = (
  props: { item: IComment, handleCancel: () => void },
) => {
  const { item, handleCancel } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleEdit = (values: { contentText: string }) => {
    api.put(
      `/comments/id/${item.id}`,
      { ...values, postId: item.postId },
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
      dispatch(setComment({ ...item, ...values }));
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
      initialValues={{ contentText: item.contentText }}
    >
      <Row>
        <Form.Item
          style={{ width: '100%' }}
          name="contentText"
        >
          <TextArea showCount maxLength={500} />
        </Form.Item>
      </Row>
      <Row style={{ position: 'relative' }}>
        <Form.Item
          style={{ margin: '0px 0px 0px auto' }}
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
    </Form>
  );
};

export default CommentEditForm;
