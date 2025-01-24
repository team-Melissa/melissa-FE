import { Image as Img } from "expo-image";
import styled from "styled-components/native";

export const SplashLayout = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LogoImage = styled(Img)`
  width: 200px;
  height: 200px;
`;
