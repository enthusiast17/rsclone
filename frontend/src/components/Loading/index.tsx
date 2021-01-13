import React from 'react';
import { Spin, Typography } from 'antd';
import styles from './index.module.scss';

const Loading = () => (
  <div className={styles.container}>
    <Spin size="default" />
    <Typography.Text>Loading...</Typography.Text>
  </div>
);

export default Loading;
