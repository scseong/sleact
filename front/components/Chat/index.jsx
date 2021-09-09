import React from 'react';
import { ChatWrapper } from '@components/Chat/styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';

const Chat = ({ data }) => {
  const user = data.Sender;

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
          <p>{data.content}</p>
        </div>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
