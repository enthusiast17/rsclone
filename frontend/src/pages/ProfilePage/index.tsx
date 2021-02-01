import React, { useEffect, useState } from 'react';
import { Breadcrumb, notification, Typography } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../../components/ProfileInfo';
import {
  IRouteInfo, IProfileResponse, IPostListResponse, IResponse,
} from '../../utils/interfaces';
import {
  resetProfilePageSlice, updateProfilePageSlice, updateProfilePostList, resetProfilePostListSlice,
} from '../../slices/profilePageSlice';
import { RootState } from '../../store/root';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import PostList from '../../components/PostList';
import api from '../../utils/api';
import styles from './index.module.scss';

const ProfilePage = ({ match }: RouteComponentProps<IRouteInfo>) => {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { profilePageState } = useSelector((state: RootState) => state);

  const fetchPosts = (currentPage: number) => {
    const url = currentPage === 1
      ? `/posts/?page=${currentPage}&username=${id}`
      : `/posts/?page=${currentPage}&total=${profilePageState.postList.totalPostCount}&username=${id}`;
    api.get(url)
      .then((response: { data: IPostListResponse }) => {
        const {
          posts, nextPage, totalPostCount,
        } = response.data.data;
        if (currentPage === 1) {
          dispatch(updateProfilePostList({
            posts: [...posts],
            currentPage: 1,
            nextPage,
          }));
          dispatch(updateProfilePostList({
            totalPostCount,
          }));
        } else {
          dispatch(updateProfilePostList({
            posts: [...profilePageState.postList.posts, ...posts],
            nextPage,
          }));
        }
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
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPosts(1);
    api.get(`/profile/username/${id}`)
      .then((response: { data: IProfileResponse }) => {
        const { data } = response.data;
        dispatch(updateProfilePageSlice(data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    return () => {
      dispatch(resetProfilePageSlice());
      dispatch(resetProfilePostListSlice());
    };
  }, [id]);

  useEffect(() => {
    if (profilePageState.postList.currentPage > 1) {
      fetchPosts(profilePageState.postList.currentPage);
    }
  }, [profilePageState.postList.currentPage]);

  return (
    <>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && profilePageState.username && (
        <div className={styles.container}>
          <Breadcrumb style={{ marginBottom: 10 }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              Profile
            </Breadcrumb.Item>
          </Breadcrumb>
          <ProfileInfo item={profilePageState} />
          <Typography.Text>
            {`${profilePageState.fullName}'s activity`}
          </Typography.Text>
          <PostList
            posts={profilePageState.postList.posts}
            nextPage={profilePageState.postList.nextPage}
            handleLoadMore={() => dispatch(updateProfilePostList({
              currentPage: profilePageState.postList.currentPage + 1,
            }))}
          />
        </div>
      )}

      {!isLoading && !profilePageState.username && (
        <NotFound />
      )}
    </>
  );
};

export default ProfilePage;
