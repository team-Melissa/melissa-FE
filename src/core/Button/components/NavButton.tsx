import responsiveToPx from '@/src/utils/responsiveToPx';
import { Animated, type TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';
import { useButtonAnimation } from '../hooks/useButtonAnimation';

type Size = 'large' | 'small';

type Props = TouchableHighlightProps & {
  active?: boolean;
  size?: Size;
};

const WIDTH = {
  large: responsiveToPx('66px'),
  small: responsiveToPx('56px'),
} satisfies Record<Size, string>;

const HEIGHT = responsiveToPx('52px');

export const NavButton = ({ size = 'large', active = false, children, ...props }: Props) => {
  const { translateY: _translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  const shouldAnimate = size === 'small' || (size === 'large' && active);
  const translateY = shouldAnimate ? _translateY : 0;

  const getFrontColor = () => {
    if (size === 'large') {
      if (active) return '#46C9B0';
      return '#FFFFFF';
    }
    return '#937261';
  };

  const getBackColor = () => {
    if (size === 'large') {
      if (active) return '#36A48F';
      return '#FFFFFF';
    }
    return '#6C5244';
  };

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      $width={WIDTH[size]}
      $color={getBackColor()}
      underlayColor={getBackColor()}
      hitSlop={5}
      {...props}
    >
      <AnimatedView style={{ transform: [{ translateY }] }} $color={getFrontColor()}>
        {children}
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ $width: string; $color: string }>`
  width: ${({ $width }) => $width};
  height: ${HEIGHT};
  background-color: ${({ $color }) => $color};
  border-radius: 99px;
  margin: 1px;
`;

const AnimatedView = styled(Animated.View)<{ $color: string }>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ $color }) => $color};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
`;
