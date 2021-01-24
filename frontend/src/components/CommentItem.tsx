import React, { useState } from 'react';
import {
  Comment, Avatar, Typography, Divider, Space, Form, Button, Row, notification,
} from 'antd';
import { format } from 'timeago.js';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import { IComment, ICommentResponse, IResponse } from '../utils/interfaces';
import { RootState } from '../store/root';
import { setComment, setComments, setCommentsCount } from '../slices/postPageSlice';
import api from '../utils/api';

const CommentItem = (props: { item: IComment }) => {
  const { item } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { authState, postPageState } = useSelector((state: RootState) => state);

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
      setIsEdit(false);
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

  const handleDelete = () => api.delete(
    `/comments/id/${item.id}`,
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
    dispatch(setComments(postPageState.comments.filter((comment) => comment.id !== item.id)));
    dispatch(setCommentsCount(postPageState.commentsCount - 1));
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

  const content = isEdit ? (
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
            onClick={() => setIsEdit(false)}
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
  ) : (
    <Typography.Text>{item.contentText}</Typography.Text>
  );

  return (
    <Comment
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        border: '1px solid #D9D9D9',
        borderRadius: 2,
      }}
      actions={(!isEdit && authState.email === item.user.email && [
        <Space split={<Divider type="vertical" />}>
          <EditOutlined onClick={() => setIsEdit(true)} />
          <DeleteOutlined onClick={handleDelete} />
        </Space>,
      ]) || []}
      author={<Typography.Text strong>{item.user.fullName}</Typography.Text>}
      avatar={(
        <Avatar src={item.user.avatar} icon={!item.user.avatar ? <UserOutlined /> : ''} />
      )}
      content={content}
      datetime={(
        <Typography.Text type="secondary">{`${format(item.createdDate)}`}</Typography.Text>
      )}
    />
  );
};

export default CommentItem;
