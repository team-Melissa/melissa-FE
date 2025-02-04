import responsiveToPx from "@/src/utils/responsiveToPx";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FlexView = styled.View`
  flex: 1;
`;

export const HeaderBox = styled.View`
  flex: 0.12;
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  padding: 0px ${responsiveToPx("24px")};
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;

export const HeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
  align-items: center;
`;

export const Image = styled.Image`
  width: ${responsiveToPx("48px")};
  height: ${responsiveToPx("48px")};
  border-radius: 9999px;
`;

export const AiNameText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const ScrollBox = styled.ScrollView`
  flex: 0.75;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

export const TextInputBox = styled.View`
  flex: 0.13;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsiveToPx("28px")};
  height: ${responsiveToPx("28px")};
  justify-content: center;
  align-items: center;
`;
