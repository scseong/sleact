import axios from 'axios';

export const signup = ({ email, nickname, password }: { email: string; nickname: string; password: string }) => {
  try {
    const response = axios.post('/api/users', {
      email,
      nickname,
      password,
    });
    console.log(response);
  } catch (error) {
    throw new Error();
  }
};
