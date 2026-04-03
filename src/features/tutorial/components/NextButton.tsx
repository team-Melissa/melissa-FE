import { COLOR } from '@/src/constants/theme';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

const NextButton = ({ onClick, children }: Props) => {
  return (
    <StyledButton onPress={onClick} hitSlop={5}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
};

export default NextButton;

const StyledButton = styled.TouchableOpacity`
  flex: 2;
  padding: 16px;
  border-radius: 12px;
  background-color: ${COLOR.main};
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR.white};
`;
