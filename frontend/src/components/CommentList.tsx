import React from 'react';
import { List } from 'antd';
import { IComment } from '../utils/interfaces';
import CommentItem from './CommentItem';

const CommentList = (props: { comments: IComment[] }) => {
  const { comments } = props;

  return (
    <List
      itemLayout="vertical"
      header={`${comments.length} comments`}
      dataSource={comments}
      renderItem={(comment: IComment) => (
        <CommentItem item={comment} />
      )}
    />
  );
};

export default CommentList;
