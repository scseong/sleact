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
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
