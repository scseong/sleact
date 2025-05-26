import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const useUser = () => {
  const { data, error, mutate, isLoading } = useSWR(`/api/users`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
