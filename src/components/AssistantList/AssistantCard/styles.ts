import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { ItemBox } from "../styles";

export { ItemBox };

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
