import React, { FC, ReactNode } from "react";
import { Modal, ViewStyle } from "react-native";

interface Props {
  visible: boolean;
  animation?: "fade" | "none" | "slide";
  modalStyle?: ViewStyle;
  onRequestClose?: () => void | undefined;
  children?: ReactNode;
}

const ModalComponent: FC<Props> = ({
  visible,
  children,
  animation = "slide",
  onRequestClose,
  modalStyle,
}) => {
  return (
    <Modal
      animationType={animation}
      visible={visible}
      transparent={false}
      style={[{ flex: 1}, modalStyle]}
      onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
