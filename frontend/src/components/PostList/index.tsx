import React, { useEffect, useState } from 'react';
import { List, notification, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';
import { IPost, IPostListResponse, IResponse } from '../../utils/interfaces';
import styles from './index.module.scss';
import {
  setCurrentPage, setNextPage, setPosts,
} from '../../slices/postListSlice';
import { RootState } from '../../store/root';
import PostItem from '../PostItem';

const PostList = () => {
  const dispatch = useDispatch();
  const { postListState } = useSelector((state: RootState) => state);
  const [page, setPage] = useState<number>(1);
  const history = useHistory();

  useEffect(() => {
    dispatch(setCurrentPage(page));
    api.get(`post/page/${page}`)
      .then((response: { data: IPostListResponse }) => {
        const {
          posts, nextPage,
        } = response.data.data;
        dispatch(setPosts(posts));
        dispatch(setNextPage(nextPage));
      })
      .catch((reason: { response: { data: IResponse } }) => {
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
  }, [page]);

  return (
    <List
      className={styles.list}
      grid={{ gutter: 10, column: 1 }}
      itemLayout="vertical"
      size="small"
      loadMore={postListState.nextPage && (
        <Button type="primary" onClick={() => setPage(page + 1)} block>Load more</Button>
      )}
      dataSource={postListState.posts.slice(0, page).reduce((acc, posts) => [...acc, ...posts], [])}
      renderItem={(item: IPost, index: number) => (
        <List.Item
          key={index}
          className={styles.listItem}
        >
          <PostItem item={item} hoverable handleClick={() => history.push(`/post/${item.id}`)} />
        </List.Item>
      )}
    />
  );
};

export default PostList;
