import axios from "axios";

export const createChannel = async (workspace: string, newChannel: string) => {
  try {
    await axios.post(
      `/api/workspaces/${workspace}/channels`,
      {
        name: newChannel,
      },
      { withCredentials: true },
    );
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};

export const inviateChannel = async (workspace: string, channel: string, email: string) => {
  try {
    return await axios.post(`/api/workspaces/${workspace}/channels/${channel}/members`, {
      email,
    });
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};
