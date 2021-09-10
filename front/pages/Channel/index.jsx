import React, { useCallback } from 'react';
import useInput from '@hooks/useInput';
import { Container, Header } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput();

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      setChat('');
    },
    [chat],
  );

  return (
    <Container>
      <Header>채널!!</Header>
      {/* <ChatList /> */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
