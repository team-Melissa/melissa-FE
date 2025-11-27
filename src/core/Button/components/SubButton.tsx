import { Body2 } from "@/src/core/Txt";
import responsiveToPx from "@/src/utils/responsiveToPx";
import type { ReactNode } from "react";
import { Animated, type TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { useButtonAnimation } from "../hooks/useButtonAnimation";

type Size = "large" | "small";

type Props = TouchableHighlightProps & {
  size?: Size;
  icon?: ReactNode;
};

const WIDTH = {
  large: responsiveToPx("135px"),
  small: responsiveToPx("105px"),
} satisfies Record<Size, string>;

const HEIGHT = responsiveToPx("52px");

export const SubButton = ({ children, size = "large", icon, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      $width={WIDTH[size]}
      underlayColor="#6C5244"
      hitSlop={5}
      {...props}
    >
      <AnimatedView style={{ transform: [{ translateY }] }}>
        {icon}
        <Body2 color="sub2">{children}</Body2>
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ $width: string }>`
  width: ${({ $width }) => $width};
  height: ${HEIGHT};
  background-color: #6c5244;
  border-radius: 99px;
  margin: 1px;
`;

const AnimatedView = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #937261;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  gap: 6px;
`;
