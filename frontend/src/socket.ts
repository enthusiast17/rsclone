import React from 'react';
import { io } from 'socket.io-client';

const socketUrl = 'http://localhost:8000/';

const createSocket = () => io(socketUrl, { withCredentials: true, forceNew: true });

export const SocketContext = React.createContext({
  socket: createSocket(), reloadSocket: () => {},
});

export default createSocket;
