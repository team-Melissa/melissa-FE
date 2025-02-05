import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  padding: ${responsiveToPx("26px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
`;

export const HeaderBox = styled.View`
  height: ${responsiveToPxByHeight("68px")};
  justify-content: center;
`;

export const PrevButton = styled.TouchableOpacity`
  width: ${responsiveToPx("24px")};
  height: ${responsiveToPx("24px")};
`;

// --------------------------------------------------------------------

export const TitleBox = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${responsiveToPxByHeight("164px")};
  align-items: center;
  gap: ${({ theme }) => theme.gap.base};
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

// --------------------------------------------------------------------

export const SettingBox = styled.View`
  width: 100%;
  padding: ${responsiveToPx("22px")} ${responsiveToPx("33px")};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.xxl};
`;

export const ItemButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItemTitleBox = styled.View`
  gap: ${({ theme }) => theme.gap.sm};
`;

export const ItemTitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.settingText};
`;

export const DeleteAccountText = styled(ItemTitleText)`
  color: ${({ theme }) => theme.colors.deleteAccount};
`;

export const ItemDescriptionText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.settingSubText};
`;

export const ItemValueText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.podkovaRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.settingValueText};
`;
