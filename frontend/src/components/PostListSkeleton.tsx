import React from 'react';
import { Skeleton } from 'antd';

const PostListSkeleton = () => (
  <>
    {Array.from(Array(5).keys()).map((_: number, index: number) => (
      <Skeleton key={index.toString()} avatar paragraph={{ rows: 4 }} active />
    ))}
    <Skeleton.Button style={{ width: '100%' }} active size="small" />
  </>
);

export default PostListSkeleton;
