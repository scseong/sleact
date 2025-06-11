import axios from "axios";

export const inviteWorkspace = async (workspace: string, email: string) => {
  try {
    return await axios.post(`/api/workspaces/${workspace}/members`, {
      email: email,
    });
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};
