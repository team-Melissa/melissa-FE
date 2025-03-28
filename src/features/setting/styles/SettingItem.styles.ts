import styled from "styled-components/native";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";

export const HeaderBox = styled.View`
  height: ${responsiveToPxByHeight("68px")};
  justify-content: center;
`;

export const PrevButton = styled.TouchableOpacity`
  width: ${responsiveToPx("24px")};
  height: ${responsiveToPx("24px")};
`;

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
