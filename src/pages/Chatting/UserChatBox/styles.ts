import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

export const UserChatLayout = styled.View`
  max-width: ${responsiveToPx("290px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  margin-top: ${responsiveToPx("20px")};
  margin-right: ${responsiveToPx("15px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  padding: ${responsiveToPx("20px")} ${responsiveToPx("15px")};
  align-self: flex-end;
`;

export const UserChatText = styled.Text`
  color: ${({ theme }) => theme.colors.userChat};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${responsiveToPx("24px")};
`;
