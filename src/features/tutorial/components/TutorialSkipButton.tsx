import { COLOR } from '@/src/constants/theme';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

const TutorialSkipButton = ({ onClick, children }: Props) => {
  return (
    <StyledButton onPress={onClick} hitSlop={5}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
};

export default TutorialSkipButton;

const StyledButton = styled.TouchableOpacity`
  padding: 8px;
`;

const StyledText = styled.Text`
  font-size: 14px;
  color: ${COLOR.sub1};
`;
