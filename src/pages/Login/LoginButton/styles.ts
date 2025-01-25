import { Image as Img } from "expo-image";
import styled from "styled-components/native";
import { Platform } from "react-native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const Btn = styled.TouchableOpacity<{ backgroundColor: string }>`
  width: ${responsiveToPx("340px")};
  height: ${responsiveToPx("50px")};
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${responsiveToPx("12px")};
`;

export const Text = styled.Text<{ textOpacity: number; textColor: string }>`
  font-family: ${({ theme }) => theme.fontFamily.robotoMedium};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ textColor }) => textColor};
  opacity: ${({ textOpacity }) => textOpacity};
`;

export const Image = styled(Img)`
  position: absolute;
  left: ${responsiveToPx("30px")};
  width: ${responsiveToPx("24px")};
  height: ${responsiveToPx("24px")};
`;

export const shadowProps = {
  ...Platform.select({
    ios: {
      shadowColor: "#171717",
      shadowOffset: {
        width: -2,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    android: {
      elevation: 4,
      shadowColor: "#171717",
    },
  }),
};
