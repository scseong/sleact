import React, { useCallback } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import {
  Header,
  ProfileImg,
  RightMenu,
  WorkspaceWrapper,
  Workspaces,
  WorkspaceName,
  Channels,
  Chats,
  MenuScroll,
} from './styles';
import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';

const Workspace = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        // revalidate();
        mutate(false, false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, { s: '20px', d: 'retro' })} alt={data.nickname}></ProfileImg>
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>MenuScroll</MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
