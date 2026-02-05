import { Body2, Title } from '@/src/core/Txt';
import responsiveToPx from '@/src/utils/responsiveToPx';
import type { ReactNode } from 'react';
import { Animated, type TouchableHighlightProps } from 'react-native';
import ReAnimated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useButtonAnimation } from '../hooks/useButtonAnimation';

type Size = 'large' | 'medium' | 'small' | 'circle';

type Props = TouchableHighlightProps & {
  size?: Size;
  icon?: ReactNode;
};

const WIDTH = {
  large: responsiveToPx('245px'),
  medium: responsiveToPx('155px'),
  small: responsiveToPx('100px'),
  circle: responsiveToPx('44px'),
} satisfies Record<Size, string>;

const HEIGHT = {
  large: responsiveToPx('60px'),
  medium: responsiveToPx('58px'),
  small: responsiveToPx('52px'),
  circle: responsiveToPx('44px'),
} satisfies Record<Size, string>;

const SPRING_CONFIG = { damping: 15, stiffness: 150 };

export const PrimaryButton = ({ children, size = 'large', icon, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  const Txt = size === 'small' ? Body2 : Title;

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(parseFloat(WIDTH[size]), SPRING_CONFIG),
    height: withSpring(parseFloat(HEIGHT[size]), SPRING_CONFIG),
  }));

  return (
    <ButtonWrapper style={animatedStyle}>
      <StyledButton
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        underlayColor="#36a48f"
        hitSlop={5}
        {...props}
      >
        <AnimatedView style={{ transform: [{ translateY }] }}>
          {icon}
          {children && <Txt color="white">{children}</Txt>}
        </AnimatedView>
      </StyledButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(ReAnimated.View)``;

const StyledButton = styled.TouchableHighlight`
  flex: 1;
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
