import useSWR from "swr";
import { IChannel, IUser } from "@typings/db";
import fetcher from "@utils/fetcher";

const useChannel = (user: IUser | undefined, workspace?: string) => {
  const { data: channelData, mutate } = useSWR<IChannel[]>(
    user ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  return { channelData, mutate };
};

export default useChannel;
