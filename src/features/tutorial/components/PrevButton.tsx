import { COLOR } from '@/src/constants/theme';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

const PrevButton = ({ onClick, children }: Props) => {
  return (
    <StyledButton onPress={onClick} hitSlop={5}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
};

export default PrevButton;

const StyledButton = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  background-color: ${COLOR.white};
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR.sub1};
`;
