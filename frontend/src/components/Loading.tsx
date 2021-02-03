import React from 'react';
import { Spin, Typography } from 'antd';

const Loading = () => (
  <div style={{
    height: 150,
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  }}
  >
    <Spin size="default" />
    <Typography.Text>Loading...</Typography.Text>
  </div>
);

export default Loading;
