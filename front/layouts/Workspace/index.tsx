import { useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "@hooks/useUser";
import useToast from "@hooks/useToast";
import { logout } from "@apis/auth";
import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "./styles";
import gravatar from "gravatar";

const Workspace = () => {
  const { user, mutate, isLoading } = useUser();
  const { successTopRight } = useToast();

  const onLogout = useCallback(async () => {
    try {
      const res = await logout();
      successTopRight({ message: "로그아웃 되었습니다." });
      if (res.status === 200) {
        mutate(false, { revalidate: false });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg
              src={gravatar.url(user.email, { s: "28px", d: "retro" })}
              alt={user.nickname}
            />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>Workspace</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>Scroll</MenuScroll>
        </Channels>
        <Chats>Chats</Chats>
        <Outlet />
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
