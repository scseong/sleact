import { useCallback, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
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
import { useParams } from "react-router-dom";
import useChannel from "@hooks/useChannel";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";

const Workspace = () => {
  const { workspace } = useParams();
  const { user, mutate: userMutate, isLoading } = useUser();
  const { channelData, mutate: channelMutate } = useChannel(user, workspace);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput<string>("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput<string>("");
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
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
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
                <h2>Sleact</h2>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((v) => (
              <div>{v.name}</div>
            ))}
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
    </div>
  );
};

export default Workspace;
