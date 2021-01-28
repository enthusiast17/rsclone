import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../../components/ProfileInfo';
import api from '../../utils/api';
import { IRouteInfo, IProfileResponse } from '../../utils/interfaces';
import { resetProfilePageSlice, updateProfilePageSlice } from '../../slices/profilePageSlice';
import { RootState } from '../../store/root';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const ProfilePage = ({ match }: RouteComponentProps<IRouteInfo>) => {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { profilePageState } = useSelector((state: RootState) => state);

  useEffect(() => {
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
    };
  }, []);

  return (
    <>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && profilePageState.username && (
        <>
          <Breadcrumb style={{ marginBottom: 10 }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              Profile
            </Breadcrumb.Item>
          </Breadcrumb>
          <ProfileInfo item={profilePageState} />
        </>
      )}

      {!isLoading && !profilePageState.username && (
        <NotFound />
      )}
    </>
  );
};

export default ProfilePage;
