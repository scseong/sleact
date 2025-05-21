import axios from 'axios';

export const signup = async ({ email, nickname, password }: { email: string; nickname: string; password: string }) => {
  try {
    const response = await axios.post('/api/users', {
      email,
      nickname,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};
