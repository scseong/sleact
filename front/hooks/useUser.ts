import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const useUser = () => {
  const { data, error, isLoading } = useSWR(`/api/users`, fetcher);

  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

export default useUser;
