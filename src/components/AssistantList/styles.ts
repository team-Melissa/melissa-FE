import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const AssistantListLayout = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const ItemLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ItemBox = styled.View`
  width: ${responsiveToPx("324px")};
  height: ${responsiveToPx("520px")};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  justify-content: space-evenly;
  align-items: center;
`;

export const ImageBox = styled.View`
  width: ${responsiveToPx("210px")};
  height: ${responsiveToPx("210px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled(Img)`
  width: ${responsiveToPx("187px")};
  height: ${responsiveToPx("187px")};
  border-radius: 9999px;
`;

export const TitleTagBox = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap.base};
`;

export const PersonalityBox = styled.View`
  width: ${responsiveToPx("274px")};
  padding: ${responsiveToPx("20px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  gap: ${({ theme }) => theme.gap.md};
`;

export const TextBox = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
`;

export const CardButton = styled.TouchableOpacity`
  width: ${responsiveToPx("101px")};
  height: ${responsiveToPx("29px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
`;

export const Tag = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.white};
`;

export const PersonalityTitle = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.deepGreen};
`;

export const PersonalityContent = styled.Text`
  display: inline;
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textGray};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.black};
`;
