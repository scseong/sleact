import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import Modal from "@components/Modal";
import useInput from "@hooks/useInput";
import { Button, Input, Label } from "@pages/SignUp/styles";
import { inviteWorkspace } from "@apis/workspace";
import useToast from "@hooks/useToast";
import useUser from "@hooks/useUser";
import { useMember } from "@hooks/useMember";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const [newMember, onChangeNewMember, setMember] = useInput("");
  const { user } = useUser();
  const { mutate } = useMember(user, workspace!);
  const { errorTopRight } = useToast();

  const onInviteMember = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim() || !workspace) return;

      try {
        await inviteWorkspace(workspace, newMember);
        mutate();
      } catch (error) {
        console.dir(error);
        errorTopRight({ message: (error as any).response?.data });
      } finally {
        setShowInviteWorkspaceModal(false);
        setMember("");
      }
    },
    [newMember, workspace],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
