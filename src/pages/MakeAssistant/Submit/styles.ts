import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import { InfoText } from "@/src/pages/MakeAssistant/Intro/styles";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const SubmitLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AnimatedView = styled(Animated.View)`
  justify-content: center;
  align-items: start;
`;

export const FinishAnimatedView = styled(AnimatedView)`
  flex: 1;
  align-items: center;
`;

export { InfoText };

export const Image = styled(Img)`
  width: ${responsiveToPx("130px")};
  height: ${responsiveToPx("130px")};
  margin-bottom: ${responsiveToPx("30px")};
`;
