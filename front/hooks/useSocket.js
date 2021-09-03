import io from 'socket.io-client';
import { useCallback } from 'react';
import axios from 'axios';

const backUrl = 'http://localhost:3095';
const sockets = {};

const useSocket = (workspace) => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
    }
  }, []);

  if (!workspace) {
    return [undefined, disconnect];
  }

  sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
    transports: ['websocket'],
  });
  sockets[workspace].emit('hello', 'world');
  sockets[workspace].on('message', (data) => {
    console.log(data);
  });
  sockets[workspace].on('data', (data) => {
    console.log(data);
  });
  sockets[workspace].on('onlineList', (data) => {
    console.log(data);
  });

  return [sockets[workspace], disconnect];
};

export default useSocket;
