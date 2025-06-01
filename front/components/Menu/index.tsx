import { CSSProperties, ReactNode, useCallback } from "react";
import { CloseModalButton, CreateMenu } from "./styles";

type Props = {
  children: ReactNode;
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
};

const Menu = ({ children, show, onCloseModal, style, closeButton = true }: Props) => {
  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        menu
      </div>
      <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
      {children}
    </CreateMenu>
  );
};

export default Menu;
