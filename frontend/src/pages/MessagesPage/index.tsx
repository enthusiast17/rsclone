import { notification, Typography, Row } from 'antd';
import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { io } from 'socket.io-client';
import Loading from '../../components/Loading';
import MessageForm from '../../components/MessageForm';
import MessageList from '../../components/MessageList';
import { resetMessagesPageSlice, setMessages, setMessage } from '../../slices/messagesPageSlice';
import { RootState } from '../../store/root';
import api from '../../utils/api';
import {
  IRouteInfo, IMessage, IMessagesResponse, IResponse,
} from '../../utils/interfaces';
import styles from './index.module.scss';

const createSocket = () => io({
  withCredentials: true,
  forceNew: true,
  extraHeaders: {
    Authorization: `Basic ${localStorage.getItem('refresh-token')} ${localStorage.getItem('access-token')}`,
  },
});

let socket = createSocket();

const MessagesPage = ({ match }: RouteComponentProps<IRouteInfo>) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { authState, messagesPageState } = useSelector((state: RootState) => state);

  useEffect(() => {
    setLoading(true);
    api.get(
      `/rooms/messages/?username=${id}`,
    ).then((response: { data: IMessagesResponse }) => {
      dispatch(setMessages(response.data.data));
      setLoading(false);
    })
      .catch((reason: { response: { data: IResponse } }) => {
        if (!reason.response || !reason.response.data) {
          setLoading(false);
          notification.error({
            message: 'Internal Error.',
            description: 'Upps! Sorry, something went wrong in internal server.',
          });
          return;
        }
        notification.error({
          message: reason.response.data.message,
          description: reason.response.data.description,
        });
      });
    socket.connect();
    socket.emit('ROOM:JOIN', { username: id });
    socket.on('ROOM:NEW_MESSAGE', (data: IMessage) => {
      if (!messagesPageState.messages.some((message) => (
        data.id.toString() === message.id.toString()
      ))) {
        dispatch(setMessage(data));
      }
    });
    return () => {
      dispatch(resetMessagesPageSlice());
      socket.emit('ROOM:LEAVE', { username: id });
      socket = createSocket();
    };
  }, [id]);

  return (
    <>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && (
      <div className={styles.container}>
        <Row className={styles.header}>
          <Typography.Text>
            Private message with
            <Typography.Text strong>
              {` @${id}`}
            </Typography.Text>
          </Typography.Text>
        </Row>
        <MessageList messages={messagesPageState.messages} />
        <MessageForm handleSendMessage={(contentText: string) => {
          socket.emit('ROOM:NEW_MESSAGE', { username: id, contentText });
          dispatch(setMessage({
            id: 'by form',
            user: {
              fullName: authState.fullName || '',
              email: authState.email || '',
              username: authState.username || '',
              avatar: authState.avatar || '',
              birthdayDate: null,
              aboutme: null,
            },
            contentText,
            createdAt: new Date(Date.now()).toString(),
          }));
        }}
        />
      </div>
      )}
    </>
  );
};

export default MessagesPage;
