import { useCallback } from "react";
import Modal from "@components/Modal";
import useInput from "@hooks/useInput";
import { Button, Input, Label } from "@pages/SignUp/styles";
import { createChannel } from "@apis/channel";
import { useParams } from "react-router-dom";
import useToast from "@hooks/useToast";
import useChannel from "@hooks/useChannel";
import { IUser } from "@typings/db";

type Props = {
  user: IUser;
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
};

const CreateChannelModal = ({ user, show, onCloseModal, setShowCreateChannelModal }: Props) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");
  const { workspace = "", channel } = useParams<{ workspace: string; channel: string }>();
  const { mutate } = useChannel(user, workspace);
  const { errorTopRight } = useToast();

  const onCreateChannel = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        await createChannel(workspace, newChannel);
      } catch (error) {
        console.dir(error);
        errorTopRight({ message: (error as any).response.data });
      } finally {
        mutate();
        setShowCreateChannelModal(false);
        setNewChannel("");
      }
    },
    [workspace, newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button>생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
