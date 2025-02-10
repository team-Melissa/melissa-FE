import styled from "styled-components/native";

export const SafeView = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.lg};
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.black};
`;
