import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import PostInfo from '../../components/PostInfo';
import { ICommentListResponse, IPostResponse, IRouteInfo } from '../../utils/interfaces';
import {
  resetPostPageSlice, setComments, updatePostPageSlice, setRefreshComments,
} from '../../slices/postPageSlice';
import { RootState } from '../../store/root';
import api from '../../utils/api';
import styles from './index.module.scss';

const PostPage = ({ match }: RouteComponentProps<IRouteInfo>) => {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { postPageState } = useSelector((state: RootState) => state);

  useEffect(() => {
    api.get(
      `/posts/id/${id}`,
    )
      .then((response: { data: IPostResponse }) => {
        const { data } = response.data;
        dispatch(updatePostPageSlice(data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    return () => {
      dispatch(resetPostPageSlice());
    };
  }, []);

  useEffect(() => {
    if (!postPageState.refreshComments) return;
    api.get(
      `/comments/?post=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((response: { data: ICommentListResponse }) => {
      const { data } = response.data;
      dispatch(setComments([...data]));
      dispatch(setRefreshComments(false));
    });
  }, [postPageState.refreshComments]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && postPageState.id && (
        <>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              Post
            </Breadcrumb.Item>
          </Breadcrumb>
          <PostInfo item={postPageState} />
          <CommentForm postId={id} />
          <CommentList comments={postPageState.comments} />
        </>
      )}

      {!isLoading && !postPageState.id && (
        <NotFound />
      )}
    </div>
  );
};

export default PostPage;
