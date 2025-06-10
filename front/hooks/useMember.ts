import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { IUser } from "@typings/db";

export const useMember = (user?: IUser | undefined, workspace?: string) => {
  const { data: memberData, mutate } = useSWR<IUser[]>(
    user && workspace ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  return { memberData, mutate };
};

export const useChannelMember = (user?: IUser, workspace?: string, channel?: string) => {
  const { data: channelMemberData, mutate } = useSWR<IUser[]>(
    user && workspace && channel
      ? `/api/workspaces/${workspace}/channels/${channel}/members`
      : null,
    fetcher,
  );

  return { channelMemberData, mutate };
};

export const useWorkspaceMember = (userId?: string, workspace?: string) => {
  const { data: memberData, mutate } = useSWR<IUser>(
    userId && workspace ? `/api/workspaces/${workspace}/users/${userId}` : null,
    fetcher,
  );

  return { memberData, mutate };
};
