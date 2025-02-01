import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const Button = styled.TouchableOpacity`
  width: ${responsiveToPx("101px")};
  height: ${responsiveToPx("29px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.black};
`;
