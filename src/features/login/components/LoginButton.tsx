import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { shadowProps } from "@/src/constants/shadowProps";
import type { ReactNode } from "react";

type LoginButtonProps = {
  provider: "kakao" | "google" | "apple";
  onPress: () => void;
  children: ReactNode;
};

export default function LoginButton({ provider, onPress, children }: LoginButtonProps) {
  const logoPaths = {
    kakao: require("@/assets/images/kakao.svg"),
    google: require("@/assets/images/google.svg"),
    apple: require("@/assets/images/apple.svg"),
  };

  const backgroundColors = {
    kakao: "#fee500",
    google: "#ffffff",
    apple: "#050708",
  };

  const textOpacities = {
    kakao: 0.85,
    google: 0.54,
    apple: 1,
  };

  const textColors = {
    kakao: "#000000",
    google: "#000000",
    apple: "#ffffff",
  };

  return (
    <Btn style={shadowProps} backgroundColor={backgroundColors[provider]} onPress={onPress}>
      <Image source={logoPaths[provider]} contentFit="contain" />
      <Text textOpacity={textOpacities[provider]} textColor={textColors[provider]}>
        {children}
      </Text>
    </Btn>
  );
}

const Btn = styled.TouchableOpacity<{ backgroundColor: string }>`
  width: ${responsiveToPx("340px")};
  height: ${responsiveToPx("50px")};
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${responsiveToPx("12px")};
`;

const Text = styled.Text<{ textOpacity: number; textColor: string }>`
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
