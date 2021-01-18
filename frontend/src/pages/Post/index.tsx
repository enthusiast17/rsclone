import React from 'react';
import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList';
import styles from './index.module.scss';

const Post = () => (
  <div className={styles.container}>
    <PostForm />
    <PostList />
  </div>
);

export default Post;
