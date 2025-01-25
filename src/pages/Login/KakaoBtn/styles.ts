import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

export const Btn = styled.TouchableOpacity`
  width: 80%;
  background-color: #fee500;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${responsiveToPx("16px")};
  border-radius: ${responsiveToPx("12px")};
  gap: ${({ theme }) => theme.gap.base};
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.appleSdRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.85;
`;

export const Image = styled(Img)`
  width: ${responsiveToPx("20px")};
  height: ${responsiveToPx("20px")};
`;
