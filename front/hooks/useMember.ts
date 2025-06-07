import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { IUser } from "@typings/db";

export const useMember = (user: IUser | false | undefined, workspace: string) => {
  const { data: memberData, mutate } = useSWR<IUser[]>(
    user ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  return { memberData, mutate };
};

export const useChannelMember = (
  user: IUser | false | undefined,
  workspace: string,
  channel: string,
) => {
  const { data: channelMemberData, mutate } = useSWR<IUser[]>(
    user ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  return { channelMemberData, mutate };
};
