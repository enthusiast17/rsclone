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
import ProfilePage from '../ProfilePage';
import RoomListPage from '../RoomListPage';
import MessagesPage from '../MessagesPage';

const { Content, Footer } = Layout;

const HomePage = () => (
  <Layout>
    <Header />
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <Switch>
          <Route exact path="/" component={PostListPage} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route exact path="/profile/:id" component={ProfilePage} />
          <Route exact path="/messages" component={RoomListPage} />
          <Route exact path="/messages/:id" component={MessagesPage} />
          <Route component={NotFound} />
        </Switch>
      </Content>
    </Layout>
    <Footer className={styles.footer}>
      <a href="https://rs.school/">
        <img
          className={styles.logo}
          src="https://rs.school/images/rs_school_js.svg"
          alt="logo"
        />
      </a>

      <Typography.Text>
        <a href="https://github.com/enthusiast17">
          <Typography.Text strong>@enthusiast17</Typography.Text>
        </a>
        {', '}
        2021
      </Typography.Text>
    </Footer>
  </Layout>
);

export default HomePage;
