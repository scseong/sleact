import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { IUser } from "@typings/db";

const useUser = () => {
  const { data, error, mutate, isLoading } = useSWR<IUser | false>("/api/users", fetcher, {
    dedupingInterval: 2000,
  });

  const user = data === false ? undefined : data;

  return {
    user,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
