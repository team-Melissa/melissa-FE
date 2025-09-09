import styled from "styled-components/native";
import type { ReactNode } from "react";
import { type GestureResponderEvent, Modal, TouchableWithoutFeedback } from "react-native";

type ModalRootProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const ModalRoot = ({ isOpen, onClose, children }: ModalRootProps) => {
  const handleBackdropPress = () => {
    onClose();
  };

  const handleInnerClick = (e: GestureResponderEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Backdrop>
          <TouchableWithoutFeedback onPress={handleInnerClick}>{children}</TouchableWithoutFeedback>
        </Backdrop>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
