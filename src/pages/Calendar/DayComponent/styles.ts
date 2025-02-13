import styled from "styled-components/native";
import CachedImage from "@/src/components/ui/CachedImage";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";

export const DayBox = styled.TouchableOpacity`
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("96px")};
`;

export const ImageBox = styled.View`
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("54px")};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Image = styled(CachedImage)`
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("54px")};
`;

export const TagBox = styled.View`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  width: ${responsiveToPxByHeight("54px")};
  height: ${responsiveToPxByHeight("15px")};
  margin-top: ${responsiveToPxByHeight("3px")};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  justify-content: center;
  padding-left: ${responsiveToPx("4px")};
`;

export const DayText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.podkovaRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textGray};
`;

export const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.black};
`;
