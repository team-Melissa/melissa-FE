import styled from "styled-components/native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";

export const indicatorStyle = {
  backgroundColor: theme.colors.settingSubText,
};

export const bottomSheetShadow = {
  boxShadow: "0 -2 10 0 #ffffff",
  borderRadius: "100%",
};

export const BottomSheetLayout = styled.View`
  flex: 1;
  padding: 0px ${responsiveToPx("25px")};
`;

export const ImageBox = styled.View`
  width: ${responsiveToPx("380px")};
  height: ${responsiveToPx("380px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  overflow: hidden;
`;

export const Image = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

export const ScrollBox = styled(BottomSheetScrollView)``;

export const DateText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.podkovaRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.black};
`;

export const TitleText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.black};
`;

export const ContentText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.diaryText};
  line-height: ${responsiveToPxByHeight("24px")};
`;

export const TagText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.deepGreen};
`;

export const ChatButtonBox = styled.View`
  width: 100%;
  padding: ${responsiveToPxByHeight("26px")};
  justify-content: center;
  align-items: center;
`;

export const ViewChatButton = styled.TouchableOpacity`
  width: ${responsiveToPx("173px")};
  height: ${responsiveToPx("40px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
