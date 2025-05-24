import axios from 'axios';

export const signup = async ({ email, nickname, password }: { email: string; nickname: string; password: string }) => {
  try {
    await axios.post('/api/users', {
      email,
      nickname,
      password,
    });
    return true;
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post('/api/users/login', {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};
