import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const PersonalityBox = styled.View`
  width: 100%;
  padding-left: ${responsiveToPx("20px")};
  padding-right: ${responsiveToPx("20px")};
  background-color: transparent;
  justify-content: center;
  gap: ${({ theme }) => theme.gap.md};
`;

export const LineBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.sm}; /* 요소 간 간격 조정 */
`;

export const Title = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.white};
  margin-right: ${responsiveToPx("2px")}; /* 오른쪽 간격 추가 */
`;

export const Description = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 1; /* 긴 텍스트가 넘치지 않도록 설정 */
`;