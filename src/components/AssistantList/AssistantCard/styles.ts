import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const ItemBox = styled.View`
  width: ${responsiveToPx("324px")};
  height: ${responsiveToPx("520px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: space-evenly;
  align-items: center;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
`;

export const Button = styled.TouchableOpacity`
  width: ${responsiveToPx("101px")};
  height: ${responsiveToPx("29px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  align-items: center;
`;
