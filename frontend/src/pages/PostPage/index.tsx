import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import CommentForm from '../../components/CommentForm';
import CommentItem from '../../components/CommentItem';
import PostInfo from '../../components/PostInfo';
import { IPostResponse, IRouteInfo } from '../../utils/interfaces';
import {
  resetPostPageSlice,
  setContentImage, setContentText, setCreatedDate, setId, setIsUserLiked, setLikesCount, setUser,
} from '../../slices/postPageSlice';
import { RootState } from '../../store/root';
import api from '../../utils/api';
import styles from './index.module.scss';

const PostPage = ({ match }: RouteComponentProps<IRouteInfo>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { postPageState } = useSelector((state: RootState) => state);

  useEffect(() => {
    const { id } = match.params;
    api.get(
      `/posts/id/${id}`,
    )
      .then((response: { data: IPostResponse }) => {
        const {
          user,
          contentText,
          contentImage,
          createdDate,
          likesCount,
          isUserLiked,
        } = response.data.data;
        dispatch(setUser(user));
        dispatch(setId(id));
        dispatch(setContentText(contentText));
        dispatch(setContentImage(contentImage));
        dispatch(setCreatedDate(createdDate));
        dispatch(setLikesCount(likesCount));
        dispatch(setIsUserLiked(isUserLiked));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    return () => {
      dispatch(resetPostPageSlice());
    };
  }, []);

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
          <CommentForm />
          <CommentItem />
        </>
      )}

      {!isLoading && !postPageState.id && (
        <NotFound />
      )}
    </div>
  );
};

export default PostPage;
