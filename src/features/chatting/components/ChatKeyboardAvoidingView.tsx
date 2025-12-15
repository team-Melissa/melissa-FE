import type { PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const ChatKeyboardAvoidingView = ({ children }: PropsWithChildren) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return <StyledKeyboardAvoidingView behavior={behavior}>{children}</StyledKeyboardAvoidingView>;
};

export default ChatKeyboardAvoidingView;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
