import { ReactNode } from "react";
import * as S from "./styles";

interface Props {
  provider: "kakao" | "google" | "apple";
  onPress: () => void;
  children: ReactNode;
}

function LoginButton({ provider, onPress, children }: Props) {
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
    <S.Btn style={S.shadowProps} backgroundColor={backgroundColors[provider]} onPress={onPress}>
      <S.Image source={logoPaths[provider]} contentFit="contain" />
      <S.Text textOpacity={textOpacities[provider]} textColor={textColors[provider]}>
        {children}
      </S.Text>
    </S.Btn>
  );
}

export default LoginButton;
