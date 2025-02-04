import styled from "styled-components/native";
import { Image } from "expo-image";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";

export const Btn = styled.TouchableOpacity`
  width: ${responsiveToPx("60px")};
  height: ${responsiveToPx("60px")};
  position: absolute;
  bottom: ${responsiveToPxByHeight("70px")};
  left: 50%;
  border-radius: 9999px;
  transform: translateX(-${responsiveToPx("30px")});
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ButtonImage = styled(Image)`
  width: 120%;
  height: 120%;
`;
