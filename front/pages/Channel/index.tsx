import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useInput from "@hooks/useInput";
import { Container, Header } from "./styles";
import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import { sendChatMessage } from "@apis/chat";

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput("");
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const onSubmitForm = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        if (chat?.trim()) {
          await sendChatMessage(workspace!, id!, chat);
        }
      } catch (error) {
        console.dir(error);
      } finally {
        setChat("");
      }
    },
    [chat],
  );

  return (
    <Container>
      <Header>채널!</Header>
      <ChatList chats={[]} />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
        placeholder="채팅을 입력해주세요."
      />
    </Container>
  );
};

export default Channel;
