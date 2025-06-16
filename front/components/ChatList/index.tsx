import { IDM } from "@typings/db";
import { ChatZone, Section } from "./styles";
import Chat from "@components/Chat";

type Props = {
  chats: IDM[];
};

const ChatList = ({ chats }: Props) => {
  return (
    <ChatZone>
      <Section>
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </Section>
    </ChatZone>
  );
};

export default ChatList;
