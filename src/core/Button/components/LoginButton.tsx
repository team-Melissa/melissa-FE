import { Title } from "@/src/core/Txt";
import { IconApple } from "@/src/icons/IconApple";
import { IconGoogle } from "@/src/icons/IconGoogle";
import { IconKakao } from "@/src/icons/IconKakao";
import type { OAuthProvider } from "@/src/types/commonTypes";
import responsiveToPx from "@/src/utils/responsiveToPx";
import type { ReactNode } from "react";
import { Animated, type TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { useButtonAnimation } from "../hooks/useButtonAnimation";

type Props = TouchableHighlightProps & {
  provider: OAuthProvider;
};

type ButtonColor = {
  front: string;
  back: string;
  text: string;
};

const WIDTH = responsiveToPx("245px");

const HEIGHT = responsiveToPx("58px");

const COLOR = {
  KAKAO: {
    front: "#fae100",
    back: "#ccb700",
    text: "#6C5244",
  },
  GOOGLE: {
    front: "#FFFFFF",
    back: "#d2d8dB",
    text: "#6C5244",
  },
  APPLE: {
    front: "#4c4c4c",
    back: "#313131",
    text: "#FFFFFF",
  },
} satisfies Record<OAuthProvider, ButtonColor>;

const ICON = {
  KAKAO: <IconKakao />,
  GOOGLE: <IconGoogle />,
  APPLE: <IconApple />,
} satisfies Record<OAuthProvider, ReactNode>;

export const LoginButton = ({ children, provider, ...props }: Props) => {
  const { translateY, handlePressIn, handlePressOut } = useButtonAnimation();

  const { front, back, text } = COLOR[provider];

  return (
    <StyledButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      color={back}
      hitSlop={5}
      {...props}
    >
      <AnimatedView color={front} style={{ transform: [{ translateY }] }}>
        <IconWrapper>{ICON[provider]}</IconWrapper>
        <StyledTitle color={text}>{children}</StyledTitle>
      </AnimatedView>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableHighlight<{ color: string }>`
  width: ${WIDTH};
  height: ${HEIGHT};
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
