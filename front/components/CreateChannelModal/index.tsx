import { useCallback } from "react";
import Modal from "@components/Modal";
import useInput from "@hooks/useInput";
import { Button, Input, Label } from "@pages/SignUp/styles";

type Props = {
  show: boolean;
  onCloseModal: () => void;
};

const CreateChannelModal = ({ show, onCloseModal }: Props) => {
  const [newChannel, onChangeNewChannel] = useInput("");
  const onCreateChannel = useCallback(() => {}, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="chaennel-label">
          <span>채널</span>
          <Input id="chaennel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button>생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
