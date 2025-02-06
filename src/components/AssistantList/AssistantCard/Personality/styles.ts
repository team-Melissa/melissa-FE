import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const PersonalityBox = styled.View`
  width: ${responsiveToPx("274px")};
  padding: ${responsiveToPx("20px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  gap: ${({ theme }) => theme.gap.md};
`;

export const LineBox = styled.View`
  width: ${responsiveToPx("180px")};
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
`;

export const Title = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.deepGreen};
`;

export const Description = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textGray};
`;
