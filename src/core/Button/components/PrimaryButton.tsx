import { Body2, Title } from '@/src/core/Txt';
import responsiveToPx from '@/src/utils/responsiveToPx';
import type { ReactNode } from 'react';
import { Animated, type TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';
import { useButtonAnimation } from '../hooks/useButtonAnimation';

type Size = 'large' | 'medium' | 'small';

type Props = TouchableHighlightProps & {
  size?: Size;
  icon?: ReactNode;
};

const WIDTH = {
  large: responsiveToPx('245px'),
  medium: responsiveToPx('155px'),
  small: responsiveToPx('100px'),
} satisfies Record<Size, string>;

const HEIGHT = {
  large: responsiveToPx('60px'),
  medium: responsiveToPx('58px'),
  small: responsiveToPx('52px'),
} satisfies Record<Size, string>;

export const PrimaryButton = ({ children, size = 'large', icon, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  const Txt = size === 'small' ? Body2 : Title;

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      $width={WIDTH[size]}
      $height={HEIGHT[size]}
      underlayColor="#36a48f"
      hitSlop={5}
      {...props}
    >
      <AnimatedView style={{ transform: [{ translateY }] }}>
        {icon}
        <Txt color="white">{children}</Txt>
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: #36a48f;
  border-radius: 99px;
  margin: 1px;
`;

const AnimatedView = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #46c9b0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  gap: 6px;
`;
