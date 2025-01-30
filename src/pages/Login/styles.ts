import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const ContentBox = styled.View`
  flex: 1;
  padding: ${responsiveToPx("80px")} 0px;
  justify-content: space-between;
`;

export const TextBox = styled.View`
  align-self: center;
  flex: 1;
  width: ${responsiveToPx("340px")};
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding-bottom: ${responsiveToPx("16px")};
`;

export const MelissaText = styled(TitleText)`
  font-family: ${({ theme }) => theme.fontFamily.poetsenOne};
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;

export const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;
