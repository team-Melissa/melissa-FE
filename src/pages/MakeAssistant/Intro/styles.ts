import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

export const CenteringBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding-bottom: ${responsiveToPx("30px")};
`;

export const Bold = styled(InfoText)`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
`;
