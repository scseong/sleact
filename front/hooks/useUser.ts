import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const useUser = () => {
  const { data, error, isLoading } = useSWR(`/api/users`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

export default useUser;
