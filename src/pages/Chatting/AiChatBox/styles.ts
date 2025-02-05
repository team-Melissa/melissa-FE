import { Image as Img } from "react-native";
import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const AiChatLayout = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${responsiveToPx("12px")} ${responsiveToPx("10px")};
  gap: ${({ theme }) => theme.gap.md};
`;

export const Image = styled(Img)`
  width: ${responsiveToPx("36px")};
  height: ${responsiveToPx("36px")};
  border-radius: 9999px;
`;

export const AiChatBox = styled.View`
  max-width: ${responsiveToPx("290px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${responsiveToPx("20px")} ${responsiveToPx("15px")};
  align-self: flex-start;
`;

export const AiChatText = styled.Text`
  color: ${({ theme }) => theme.colors.assistantChat};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${responsiveToPx("24px")};
`;
