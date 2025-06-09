import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import useUser from "@hooks/useUser";
import useToast from "@hooks/useToast";
import useInput from "@hooks/useInput";
import { useChannelMember } from "@hooks/useMember";
import Modal from "@components/Modal";
import { inviateChannel } from "@apis/channel";
import { Button, Input, Label } from "@pages/SignUp/styles";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: FC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [newMember, onChangeNewMember, setNewMember] = useInput("");
  const { user } = useUser();

  const { mutate: memberMutate } = useChannelMember(user, workspace!, channel!);
  const { errorTopRight } = useToast();

  const onInviteMember = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }

      try {
        await inviateChannel(workspace!, channel!, newMember);
        memberMutate();
      } catch (error) {
        console.dir(error);
        errorTopRight({ message: (error as any).response.data });
      } finally {
        setShowInviteChannelModal(false);
        setNewMember("");
      }
    },
    [channel, newMember, workspace],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>채널 멤버 초대</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
