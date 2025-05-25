import { useCallback } from 'react';
import { logout } from '@apis/auth';
import useUser from '@hooks/useUser';

const Workspace = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const onLogout = useCallback(async () => {
    const res = await logout();
  }, []);

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
