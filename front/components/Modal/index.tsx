import React, { FC, useCallback } from "react";
import { CreateModal, CloseModalButton } from "@components/Modal/styles";

type Props = {
  show: boolean;
  onCloseModal: () => void;
};

const Modal: FC<Props> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
