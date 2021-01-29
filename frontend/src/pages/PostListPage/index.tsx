import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList';
import PostListSkeleton from '../../components/PostListSkeleton';
import {
  resetPostListSlice, setCurrentPage, setNextPage, setPosts, setTotalPostCount,
} from '../../slices/postListSlice';
import { RootState } from '../../store/root';
import api from '../../utils/api';
import { IPostListResponse, IResponse } from '../../utils/interfaces';
import styles from './index.module.scss';

const PostListPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { postListState } = useSelector((state: RootState) => state);

  const fetchPosts = () => {
    const url = postListState.currentPage === 1
      ? `/posts/?page=${postListState.currentPage}`
      : `/posts/?page=${postListState.currentPage}&total=${postListState.totalPostCount}`;
    api.get(url)
      .then((response: { data: IPostListResponse }) => {
        const {
          posts, nextPage, totalPostCount,
        } = response.data.data;
        dispatch(setPosts([...postListState.posts, ...posts]));
        dispatch(setNextPage(nextPage));
        if (postListState.currentPage === 1) dispatch(setTotalPostCount(totalPostCount));
        setIsLoading(false);
      })
      .catch((reason: { response: { data: IResponse } }) => {
        setIsLoading(false);
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

  useEffect(() => {
    if (postListState.currentPage < 1) {
      dispatch(setCurrentPage(1));
      setIsLoading(true);
      return;
    }
    fetchPosts();
  }, [postListState.currentPage]);

  useEffect(() => () => {
    dispatch(resetPostListSlice());
  }, []);

  return (
    <div className={styles.container}>
      <PostForm />
      {isLoading && (
        <PostListSkeleton />
      )}
      {!isLoading && (
        <PostList
          posts={postListState.posts}
          nextPage={postListState.nextPage}
          handleLoadMore={() => dispatch(setCurrentPage(postListState.currentPage + 1))}
        />
      )}
    </div>
  );
};

export default PostListPage;
