import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
// import PostItem from '../../components/PostItem';
import api from '../../utils/api';
import { IPost, IPostResponse, IRouteInfo } from '../../utils/interfaces';

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
    <>
      {isLoading && (
        <Loading />
      )}

      {/* {!isLoading && post !== null && (
        <PostItem
          item={post}
          handleClick={() => {}}
          setRefreshList=(() => {})
        />
      )} */}

      {!isLoading && !post && (
        <NotFound />
      )}
    </>
  );
};

export default PostPage;
