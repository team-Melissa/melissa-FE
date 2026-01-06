import { COLOR } from '@/src/constants/theme';
import { Body1 } from '@/src/core/Txt';
import responsiveToPx from '@/src/utils/responsiveToPx';
import type { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import type { ChatData } from '../types';

type Props = {
  chat: ChatData;
  style?: StyleProp<ViewStyle>;
};

const UserChatBubble = ({ chat, style }: Props) => {
  return (
    <Wrapper style={style}>
      <Body1 color="white">{chat.content}</Body1>
    </Wrapper>
  );
};

export default UserChatBubble;

const Wrapper = styled.View`
  max-width: ${responsiveToPx('250px')};
  align-self: flex-end;
  padding: 10px 12px;
  border-radius: 13px;
  background-color: ${COLOR.main};
`;
