import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import React, { useCallback, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ChatList = ({ chatData }) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {chatData?.map((chat) => (
          <Chat key={chat.id} data={chat} />
        ))}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
