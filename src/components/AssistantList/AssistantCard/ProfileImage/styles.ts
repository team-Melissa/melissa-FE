import { Image as Img } from "expo-image";
import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

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
