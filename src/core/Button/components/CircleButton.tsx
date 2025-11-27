import responsiveToPx from "@/src/utils/responsiveToPx";
import { Animated, type TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { useButtonAnimation } from "../hooks/useButtonAnimation";

type Size = "large" | "medium" | "small";
type Variant = "primary" | "secondary" | "transparent";
type Color = { front: string; back: string };

type Props = TouchableHighlightProps & {
  size: Size;
  variant: Variant;
};

const SIZE = {
  large: responsiveToPx("60px"),
  medium: responsiveToPx("56px"),
  small: responsiveToPx("44px"),
} satisfies Record<Size, string>;

const COLOR = {
  primary: {
    front: "#46C9B0",
    back: "#36A48F",
  },
  secondary: {
    front: "#937261",
    back: "#6C5244",
  },
  transparent: {
    front: "#CCE5E0",
    back: "#B2CFC9",
  },
} satisfies Record<Variant, Color>;

export const CircleButton = ({ size, variant, children, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      $size={SIZE[size]}
      $color={COLOR[variant].back}
      underlayColor={COLOR[variant].back}
      hitSlop={5}
      {...props}
    >
      <AnimatedView style={{ transform: [{ translateY }] }} $color={COLOR[variant].front}>
        {children}
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ $size: string; $color: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
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
