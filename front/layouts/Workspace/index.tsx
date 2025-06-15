import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import useUser from "@hooks/useUser";
import useToast from "@hooks/useToast";
import { logout } from "@apis/auth";
import { Button, Input, Label } from "@pages/SignUp/styles";
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "./styles";
import gravatar from "gravatar";
import Menu from "@components/Menu";
import axios from "axios";
import Modal from "@components/Modal";
import useInput from "@hooks/useInput";
import CreateChannelModal from "@components/CreateChannelModal";
import useChannel from "@hooks/useChannel";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";
import InviteChannelModal from "@components/InviteChannelModal";
import DMList from "@components/DMList";
import ChannelList from "@components/ChannelList";
import useSocket from "@hooks/useSocket";

const Workspace = () => {
  const { workspace } = useParams();
  const { user, mutate: userMutate, isLoading } = useUser();
  const { channelData, mutate: channelMutate } = useChannel(user, workspace);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput<string>("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput<string>("");
  const [socket, disconnect] = useSocket(workspace);
  const { successTopRight } = useToast();

  const onLogout = useCallback(async () => {
    try {
      const res = await logout();
      successTopRight({ message: "로그아웃 되었습니다." });
      if (res.status === 200) {
        userMutate(false, { revalidate: false });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCreateWorkspace = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post("/api/workspaces", {
          workspace: newWorkspace,
          url: newUrl,
        })
        .then(() => {
          setShowCreateWorkspaceModal(false);
          setNewWorkspace("");
          setNewUrl("");
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    [newWorkspace, newUrl],
  );

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (channelData && user && socket) {
      socket.emit("login", { id: user.id, channels: channelData.map((channel) => channel.id) });
    }
  }, [socket, channelData, user]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

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
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(user.email, { s: "28px", d: "retro" })}
              alt={user.nickname}
            />
          </span>
          {showUserMenu && (
            <Menu
              style={{ right: 16, top: 38 }}
              show={showUserMenu}
              onCloseModal={onClickUserProfile}
            >
              <ProfileModal>
                <img
                  src={gravatar.url(user.email, { s: "36px", d: "retro" })}
                  alt={user.nickname}
                />
                <div>
                  <span id="profile-name">{user.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
              </ProfileModal>
              <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
            </Menu>
          )}
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {user.Workspaces.map((workspace) => (
            <Link key={workspace.id} to={`/workspace/${workspace.url}/channel/일반`}>
              <WorkspaceButton>{workspace.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          ))}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 95, left: 80 }}
            >
              <WorkspaceModal>
                <h2>{user.Workspaces.find((v) => v.url === workspace)?.name}</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((v) => (
              <div key={v.id}>{v.name}</div>
            ))}
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Outlet />
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 URL</span>
            <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button>생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal
        user={user}
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </div>
  );
};

export default Workspace;
