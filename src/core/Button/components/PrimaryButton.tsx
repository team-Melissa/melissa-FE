import type { ReactNode } from "react";
import { Animated, type TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { Body2, Title } from "@/src/core/Txt";
import { useButtonAnimation } from "../hooks/useButtonAnimation";
import { primaryButtonHeight, primaryButtonWidth } from "../constants/buttonConstants";
import type { PrimaryButtonVariant } from "../types/buttonTypes";

type Props = TouchableHighlightProps & {
  variant?: PrimaryButtonVariant;
  icon?: ReactNode;
};

export const PrimaryButton = ({ children, variant = "large", icon, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      variant={variant}
      hitSlop={5}
      {...props}
    >
      <AnimatedView style={{ transform: [{ translateY }] }}>
        {icon}
        {variant === "small" ? (
          <Body2 color="white">{children}</Body2>
        ) : (
          <Title color="white">{children}</Title>
        )}
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ variant: PrimaryButtonVariant }>`
  width: ${({ variant }) => primaryButtonWidth[variant]};
  height: ${({ variant }) => primaryButtonHeight[variant]};
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
