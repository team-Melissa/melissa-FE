import type { ReactNode } from "react";
import { Animated, type TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { Body2 } from "@/src/core/Txt";
import { useButtonAnimation } from "../hooks/useButtonAnimation";
import { subButtonHeight, subButtonWidth } from "../constants/buttonConstants";
import type { SubButtonVariant } from "../types/buttonTypes";
import { COLOR } from "@/src/constants/theme";

type Props = TouchableHighlightProps & {
  variant?: SubButtonVariant;
  icon?: ReactNode;
};

export const SubButton = ({ children, variant = "large", icon, ...props }: Props) => {
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

        <Body2 color="sub2">{children}</Body2>
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ variant: SubButtonVariant }>`
  width: ${({ variant }) => subButtonWidth[variant]};
  height: ${subButtonHeight};
  background-color: ${COLOR.title};
  border-radius: 99px;
  margin: 1px;
`;

const AnimatedView = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.sub1};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  gap: 6px;
`;
