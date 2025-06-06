import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { IUser } from "@typings/db";

const useMember = (user: IUser | false | undefined, workspace: string) => {
  const { data: memberData, mutate } = useSWR<IUser[]>(
    user ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  return { memberData, mutate };
};

export default useMember;
