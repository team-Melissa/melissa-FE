import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { shadowProps } from "@/src/constants/shadowProps";

type UserChatBoxProps = {
  input: string;
};

export default function UserChatBox({ input }: UserChatBoxProps) {
  return (
    <UserChatLayout style={shadowProps}>
      <UserChatText>{input}</UserChatText>
    </UserChatLayout>
  );
}

export const UserChatLayout = styled.View`
  max-width: ${responsiveToPx("290px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  margin: ${responsiveToPx("12px")} ${responsiveToPx("10px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  padding: ${responsiveToPx("12px")} ${responsiveToPx("15px")};
  align-self: flex-end;
`;

export const UserChatText = styled.Text`
  color: ${({ theme }) => theme.colors.userChat};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${responsiveToPx("24px")};
`;
