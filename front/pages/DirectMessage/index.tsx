import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useUser from "@hooks/useUser";
import { useWorkspaceMember } from "@hooks/useMember";
import gravatar from "gravatar";
import { Container, Header } from "./styles";
import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import useInput from "@hooks/useInput";
import { useChat } from "@hooks/useChat";
import { sendChatMessage } from "@apis/chat";

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { user: myData } = useUser();
  const { memberData } = useWorkspaceMember(id, workspace);
  const { chatData } = useChat(workspace, id);
  const [chat, onChangeChat, setChat] = useInput("");

  const onSubmitForm = useCallback(
    (e) => {
      try {
        e.preventDefault();

        if (chat?.trim()) {
          sendChatMessage(workspace!, id!, chat);
        }
      } catch (error) {
        console.dir(error);
      } finally {
        setChat("");
      }
    },
    [chat],
  );

  if (!myData || !memberData) return null;
  if (!chatData) return null;

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(memberData.email, { s: "24px", d: "retro" })}
          alt={memberData.nickname}
        />
        <span>{memberData.nickname}</span>
      </Header>
      <ChatList chats={chatData} />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
        placeholder="채팅을 입력해주세요."
      />
    </Container>
  );
};

export default DirectMessage;
