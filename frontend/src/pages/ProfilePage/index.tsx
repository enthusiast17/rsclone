import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import ProfileInfo from '../../components/ProfileInfo';

const ProfilePage = () => (
  <>
    <Breadcrumb style={{ marginBottom: 10 }}>
      <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
      <Breadcrumb.Item>
        Profile
      </Breadcrumb.Item>
    </Breadcrumb>
    <ProfileInfo />
  </>
);

export default ProfilePage;
