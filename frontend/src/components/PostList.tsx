import React from 'react';
import { List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/root';
import PostItem from './PostItem';
import { IPost } from '../utils/interfaces';
import { setCurrentPage } from '../slices/postListSlice';

const PostList = (props: { posts: IPost[] }) => {
  const { posts } = props;
  const dispatch = useDispatch();
  const { postListState } = useSelector((state: RootState) => state);
  const history = useHistory();

  return (
    <List
      style={{ padding: 0 }}
      grid={{ gutter: 10, column: 1 }}
      itemLayout="vertical"
      size="small"
      loadMore={postListState.nextPage && (
        <Button type="primary" onClick={() => dispatch(setCurrentPage(postListState.currentPage + 1))} block>Load more</Button>
      )}
      dataSource={posts}
      renderItem={(item: IPost, index: number) => (
        <List.Item
          style={{ padding: 0, margin: '0px 0px 10px 0px' }}
          key={index}
        >
          <PostItem item={item} handleClick={() => history.push(`/post/${item.id}`)} />
        </List.Item>
      )}
    />
  );
};

export default PostList;
