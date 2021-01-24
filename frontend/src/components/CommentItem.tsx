import React, { useState } from 'react';
import {
  Comment, Avatar, Typography, Divider, Space, notification,
} from 'antd';
import { format } from 'timeago.js';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IComment, ICommentResponse, IResponse } from '../utils/interfaces';
import { RootState } from '../store/root';
import { setComments, setCommentsCount } from '../slices/postPageSlice';
import CommentEditForm from './CommentEditForm';
import api from '../utils/api';

const CommentItem = (props: { item: IComment }) => {
  const { item } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { authState, postPageState } = useSelector((state: RootState) => state);

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
    <CommentEditForm item={item} handleCancel={() => setIsEdit(false)} />
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
