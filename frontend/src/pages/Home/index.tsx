import React from 'react';
import { Layout, Typography } from 'antd';
import {
  Switch, Route,
} from 'react-router-dom';
import Header from '../../components/Header';
import styles from './index.module.scss';
import Navigation from '../../components/Navigation';

const { Content, Sider } = Layout;

const Home = () => (
  <Layout>
    <Header />
    <Layout className={styles.container}>
      <Content>
        <Switch>
          <Route path="/profile">
            <Typography.Text>MY PROFILE</Typography.Text>
          </Route>
          <Route path="/">
            <Typography.Text>Home</Typography.Text>
          </Route>
        </Switch>
      </Content>
      <Sider className={styles.navigation} width={250}>
        <Navigation />
      </Sider>
    </Layout>
  </Layout>
);

export default Home;
