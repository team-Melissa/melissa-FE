import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

export const ContentBox = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  padding: ${responsiveToPx("80px")} 0px;
  justify-content: space-between;
`;

export const TextBox = styled.View`
  align-self: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${responsiveToPx("340px")};
  gap: ${responsiveToPx("8px")};
`;

export const Image = styled(Img)`
  width: ${responsiveToPx("88px")};
  height: ${responsiveToPx("70px")};
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.deepGreen};
`;

export const MelissaText = styled(TitleText)`
  font-family: ${({ theme }) => theme.fontFamily.poetsenOne};
  font-size: ${({ theme }) => theme.fontSize.xxxxl};
`;

export const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;
