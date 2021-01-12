import React from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header';
import styles from './index.module.scss';

const { Content, Sider } = Layout;

const Home = () => (
  <Layout className={styles.layout}>
    <Header />
    <Layout>
      <Content />
      <Sider />
    </Layout>
  </Layout>
);

export default Home;
