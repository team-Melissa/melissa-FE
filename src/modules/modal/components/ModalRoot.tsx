import {
  type GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';
import { useIsKeyboardOpen } from '@/src/hooks/useIsKeyboardOpen';

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

  // * IOS의 경우, 모달이 열린 상태에서 키보드가 노출되면, 키보드가 모달을 가리는 문제가 존재합니다.
  // * KeyboardAvoidingView를 활용해 키보드가 노출되면, 모달이 키보드 위로 올라가도록 처리합니다.
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={isOpen} animationType="fade" onRequestClose={onClose} transparent>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Backdrop>
              <TouchableWithoutFeedback onPress={handleInnerClick}>{children}</TouchableWithoutFeedback>
            </Backdrop>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

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
