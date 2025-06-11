import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { IDM } from "@typings/db";

export const useChat = (workspace?: string, id?: string) => {
  const { data: chatData, mutate } = useSWR<IDM[]>(
    workspace && id ? `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1` : null,
    fetcher,
  );

  return { chatData, mutate };
};
