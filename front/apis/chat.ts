import axios from "axios";

export const sendChatMessage = (workspace: string, id: string, content: string) => {
  try {
    return axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content });
  } catch (error) {
    throw new Error((error as any).response?.data);
  }
};
