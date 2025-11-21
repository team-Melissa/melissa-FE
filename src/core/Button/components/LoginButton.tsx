import { Animated, type TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { Title } from "@/src/core/Txt";
import type { OAuthProvider } from "@/src/types/commonTypes";
import { useButtonAnimation } from "../hooks/useButtonAnimation";
import {
  loginButtonColor,
  loginButtonHeight,
  loginButtonIcon,
  loginButtonWidth,
} from "../constants/buttonConstants";
import responsiveToPx from "@/src/utils/responsiveToPx";

type Props = TouchableHighlightProps & {
  provider: OAuthProvider;
};

export const LoginButton = ({ children, provider, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  const { front, back, text } = loginButtonColor[provider];
  const Icon = loginButtonIcon[provider];

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      color={back}
      hitSlop={5}
      {...props}
    >
      <AnimatedView color={front} style={{ transform: [{ translateY }] }}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <StyledTitle color={text}>{children}</StyledTitle>
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ color: string }>`
  width: ${loginButtonWidth};
  height: ${loginButtonHeight};
  background-color: ${({ color }) => color};
  border-radius: 99px;
  margin: 1px;
`;

const AnimatedView = styled(Animated.View)<{ color: string }>`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ color }) => color};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  gap: 6px;
`;

const StyledTitle = styled(Title)<{ color: string }>`
  color: ${({ color }) => color};
`;

const IconWrapper = styled.View`
  position: absolute;
  left: ${responsiveToPx("30px")};
`;
