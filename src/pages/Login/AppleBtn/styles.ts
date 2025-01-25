import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

export const Btn = styled.TouchableOpacity`
  width: 80%;
  background-color: #050708;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${responsiveToPx("16px")} ${responsiveToPx("80px")};
  border-radius: ${responsiveToPx("12px")};
  gap: ${({ theme }) => theme.gap.lg};
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.robotoMedium};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.white};
`;

export const Image = styled(Img)`
  width: ${responsiveToPx("26px")};
  height: ${responsiveToPx("26px")};
`;
