import { useParams } from "react-router-dom";
import useUser from "@hooks/useUser";
import { useWorkspaceMember } from "@hooks/useMember";
import gravatar from "gravatar";
import { Container, Header } from "./styles";
import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { user: myData } = useUser();
  const { memberData } = useWorkspaceMember(id, workspace);

  if (!myData || !memberData) return null;

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(memberData.email, { s: "24px", d: "retro" })}
          alt={memberData.nickname}
        />
        <span>{memberData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox chat="" />
    </Container>
  );
};

export default DirectMessage;
