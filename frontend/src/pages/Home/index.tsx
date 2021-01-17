import React from 'react';
import { Layout, Typography } from 'antd';
import {
  Switch, Route,
} from 'react-router-dom';
import Header from '../../components/Header';
import styles from './index.module.scss';
import Post from '../Post';

const { Content } = Layout;

const Home = () => (
  <Layout>
    <Header />
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <Switch>
          <Route exact path="/" component={Post} />
          <Route exact path="/profile">
            <Typography.Text>MY PROFILE</Typography.Text>
          </Route>
        </Switch>
      </Content>
    </Layout>
  </Layout>
);

export default Home;
