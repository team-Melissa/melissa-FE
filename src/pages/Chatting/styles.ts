import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image as Img } from "expo-image";
import styled from "styled-components/native";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FlexView = styled.View`
  flex: 1;
`;

export const HeaderBox = styled.View`
  width: 100%;
  height: ${responsiveToPxByHeight("110px")};
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  padding: 0px ${responsiveToPx("24px")};
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsiveToPx("28px")};
  height: ${responsiveToPx("28px")};
  justify-content: center;
  align-items: center;
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

export const ScrollBox = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

export const KeyboardAvoidingBox = styled.KeyboardAvoidingView`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ChatInputBox = styled.View`
  width: 100%;
  min-height: ${responsiveToPx("100px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: ${({ theme }) => theme.gap.md};
  padding-bottom: ${responsiveToPx("40px")};
`;

export const ChatInput = styled.TextInput`
  width: ${responsiveToPx("333px")};
  max-height: ${responsiveToPx("100px")};
  padding: ${responsiveToPx("11px")} ${responsiveToPx("16px")};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const ChatButton = styled.TouchableOpacity`
  width: ${responsiveToPx("44px")};
  height: ${responsiveToPx("44px")};
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ButtonImage = styled(Img)`
  width: 120%;
  height: 120%;
`;
