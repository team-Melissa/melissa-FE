import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

export const ContentBox = styled.View`
  flex: 1;
  padding: ${responsiveToPx("80px")} 0px;
  justify-content: space-between;
`;

export const TextBox = styled.View`
  align-self: center;
  flex: 1;
  width: 80%;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.title};
  padding-bottom: ${responsiveToPx("16px")};
`;

export const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${responsiveToPx("24px")};
`;
