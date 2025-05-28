import axios from "axios";

export const signup = async ({
  email,
  nickname,
  password,
}: {
  email: string;
  nickname: string;
  password: string;
}) => {
  try {
    await axios.post("/api/users", {
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
    return await axios.post("/api/users/login", {
      email,
      password,
    });
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};

export const logout = async () => {
  try {
    return axios.post("/api/users/logout", null, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};
