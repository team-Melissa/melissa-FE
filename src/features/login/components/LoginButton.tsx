import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { shadowProps } from "@/src/constants/shadowProps";
import type { ReactNode } from "react";
import type { OAuthProvider } from "@/src/types/commonTypes";
import { backgroundColors, logoPaths, textColors, textOpacities } from "../constants";

type LoginButtonProps = {
  provider: OAuthProvider;
  onPress: () => void;
  children: ReactNode;
};

export default function LoginButton({ provider, onPress, children }: LoginButtonProps) {
  return (
    <StyledButton style={shadowProps} backgroundColor={backgroundColors[provider]} onPress={onPress}>
      <Image source={logoPaths[provider]} contentFit="contain" />
      <StyledText textOpacity={textOpacities[provider]} textColor={textColors[provider]}>
        {children}
      </StyledText>
    </StyledButton>
  );
}

const StyledButton = styled.TouchableOpacity<{ backgroundColor: string }>`
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
