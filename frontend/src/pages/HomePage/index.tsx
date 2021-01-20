import React from 'react';
import { Layout, Typography } from 'antd';
import {
  Switch, Route,
} from 'react-router-dom';
import Header from '../../components/Header';
import PostListPage from '../PostListPage';
import PostPage from '../PostPage';
import styles from './index.module.scss';
import NotFound from '../../components/NotFound';

const { Content } = Layout;

const HomePage = () => (
  <Layout>
    <Header />
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <Switch>
          <Route exact path="/" component={PostListPage} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route exact path="/profile">
            <Typography.Text>MY PROFILE</Typography.Text>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Content>
    </Layout>
  </Layout>
);

export default HomePage;
