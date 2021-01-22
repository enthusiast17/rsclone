import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import PostInfo from '../../components/PostInfo';
import CommentForm from '../../components/CommentForm';
import { IPost, IPostResponse, IRouteInfo } from '../../utils/interfaces';
import api from '../../utils/api';
import styles from './index.module.scss';

const PostPage = ({ match }: RouteComponentProps<IRouteInfo>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const { id } = match.params;
    api.get(
      `/posts/id/${id}`,
    )
      .then((response: { data: IPostResponse }) => {
        const { data } = response.data;
        setPost(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && post !== null && (
        <>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              Post
            </Breadcrumb.Item>
          </Breadcrumb>
          <PostInfo
            item={post}
          />
          <CommentForm />
        </>
      )}

      {!isLoading && !post && (
        <NotFound />
      )}
    </div>
  );
};

export default PostPage;
