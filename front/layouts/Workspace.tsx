import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '@hooks/useUser';
import useToast from '@hooks/useToast';
import { logout } from '@apis/auth';

const Workspace = ({ children }: { children: React.ReactNode }) => {
  const { user, mutate } = useUser();
  const { successTopRight } = useToast();

  const onLogout = useCallback(async () => {
    try {
      const res = await logout();
      successTopRight({ message: '로그아웃 되었습니다.' });
      if (res.status === 200) {
        mutate(false, { revalidate: false });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
