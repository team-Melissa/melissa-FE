import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { shadowProps } from "@/src/constants/shadowProps";
import type { ReactNode } from "react";
import type { OAuthProvider } from "@/src/types/commonTypes";
import { getOAuthProvider } from "@/src/libs/mmkv";
import PrevLoginBadge from "./PrevLoginBadge";

type LoginButtonProps = {
  provider: OAuthProvider;
  onPress: () => void;
  children: ReactNode;
};

type StyledProps = {
  backgroundColor: string;
  isPrevLoginProvider: boolean;
};

export default function LoginButton({ provider, onPress, children }: LoginButtonProps) {
  const logoPaths = {
    KAKAO: require("@/assets/images/kakao.svg"),
    GOOGLE: require("@/assets/images/google.svg"),
    APPLE: require("@/assets/images/apple.svg"),
  } satisfies Record<OAuthProvider, any>;

  const backgroundColors = {
    KAKAO: "#fee500",
    GOOGLE: "#ffffff",
    APPLE: "#050708",
  } satisfies Record<OAuthProvider, string>;

  const textOpacities = {
    KAKAO: 0.85,
    GOOGLE: 0.54,
    APPLE: 1,
  } satisfies Record<OAuthProvider, number>;

  const textColors = {
    KAKAO: "#000000",
    GOOGLE: "#000000",
    APPLE: "#ffffff",
  } satisfies Record<OAuthProvider, string>;

  const isPrevLoginProvider = getOAuthProvider() === provider;

  return (
    <StyledButton
      style={shadowProps}
      backgroundColor={backgroundColors[provider]}
      isPrevLoginProvider={isPrevLoginProvider}
      onPress={onPress}
    >
      <PrevLoginBadge isPrevLoginProvider={isPrevLoginProvider} />
      <Image source={logoPaths[provider]} contentFit="contain" />
      <StyledText textOpacity={textOpacities[provider]} textColor={textColors[provider]}>
        {children}
      </StyledText>
    </StyledButton>
  );
}

const StyledButton = styled.TouchableOpacity<StyledProps>`
  position: relative;
  width: ${responsiveToPx("340px")};
  height: ${responsiveToPx("50px")};
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${responsiveToPx("12px")};
`;

const StyledText = styled.Text<{ textOpacity: number; textColor: string }>`
  font-family: ${({ theme }) => theme.fontFamily.robotoMedium};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ textColor }) => textColor};
  opacity: ${({ textOpacity }) => textOpacity};
`;

const Image = styled(Img)`
  position: absolute;
  left: ${responsiveToPx("30px")};
  width: ${responsiveToPx("24px")};
  height: ${responsiveToPx("24px")};
`;
