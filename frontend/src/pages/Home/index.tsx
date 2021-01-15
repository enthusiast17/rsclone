import React from 'react';
import { Layout, Typography } from 'antd';
import {
  Switch, Route,
} from 'react-router-dom';
import Header from '../../components/Header';
import styles from './index.module.scss';

const { Content } = Layout;

const Home = () => (
  <Layout>
    <Header />
    <Layout className={styles.container}>
      <Content>
        <Switch>
          <Route path="/profile">
            <Typography.Text>MY PROFILE</Typography.Text>
          </Route>
          <Route path="/feed">
            <Typography.Text>Feed</Typography.Text>
          </Route>
        </Switch>
      </Content>
    </Layout>
  </Layout>
);

export default Home;
