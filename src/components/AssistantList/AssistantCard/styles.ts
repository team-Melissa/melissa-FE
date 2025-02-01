import styled from "styled-components/native";
import { Image as Img } from "expo-image";
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

export const PlusImage = styled(Img)`
  width: ${responsiveToPx("180px")};
  height: ${responsiveToPx("180px")};
`;

export const GenAiText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
`;
