import { type GestureResponderEvent, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import type { ReactNode } from "react";
import styled from "styled-components/native";
import { useIsKeyboardOpen } from "@/src/hooks/useIsKeyboardOpen";

type ModalRootProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const ModalRoot = ({ isOpen, onClose, children }: ModalRootProps) => {
  const isKeyboardOpen = useIsKeyboardOpen();

  const handleBackdropPress = () => {
    if (isKeyboardOpen) return Keyboard.dismiss();
    return onClose();
  };

  const handleInnerClick = (e: GestureResponderEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal visible={isOpen} animationType="fade" onRequestClose={onClose} transparent statusBarTranslucent>
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
