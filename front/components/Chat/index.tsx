import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import gravatar from "gravatar";
import useUser from "@hooks/useUser";
import { IDM } from "@typings/db";
import { ChatWrapper } from "@components/Chat/styles";

type Props = {
  chat: IDM;
};

const Chat = ({ chat }: Props) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const { user } = useUser();

  if (!user) return null;

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: "36px", d: "retro" })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(chat.createdAt).format("h:mm A")}</span>
        </div>
        <p>{chat.content}</p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
