import React, { useEffect, useRef } from 'react';
import { List } from 'antd';
import MessageItem from './MessageItem';
import { IMessage } from '../utils/interfaces';

const MessageList = (props: { messages: IMessage[] }) => {
  const { messages } = props;
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div
      style={{
        padding: 20,
        height: 500,
        overflow: 'auto',
      }}
      ref={messagesRef}
    >
      <List
        dataSource={messages}
        renderItem={(item: IMessage) => (
          <MessageItem item={item} />
        )}
      />
    </div>
  );
};

export default MessageList;
