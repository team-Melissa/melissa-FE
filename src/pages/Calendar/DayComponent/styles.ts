import styled from "styled-components/native";
import { Image as Img } from "react-native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const DayBox = styled.TouchableOpacity`
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("96px")};
`;

export const ImageBox = styled.View`
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("54px")};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Image = styled(Img)`
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("54px")};
`;

export const TagBox = styled.View`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  width: ${responsiveToPx("54px")};
  height: ${responsiveToPx("15px")};
  margin-top: ${responsiveToPx("6px")};
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
