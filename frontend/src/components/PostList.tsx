import React from 'react';
import { List, Button } from 'antd';
import PostItem from './PostItem';
import { IPost } from '../utils/interfaces';

const PostList = (props: {
  posts: IPost[],
  nextPage: number | null,
  handleLoadMore: () => void,
}) => {
  const { posts, nextPage, handleLoadMore } = props;

  return (
    <List
      style={{ padding: 0 }}
      grid={{ gutter: 10, column: 1 }}
      itemLayout="vertical"
      size="small"
      loadMore={nextPage && (
        <Button type="primary" onClick={() => handleLoadMore()} block>Load more</Button>
      )}
      dataSource={posts}
      renderItem={(item: IPost, index: number) => (
        <List.Item
          style={{ padding: 0, margin: '0px 0px 10px 0px' }}
          key={index}
        >
          <PostItem item={item} />
        </List.Item>
      )}
    />
  );
};

export default PostList;
