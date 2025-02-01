import styled from "styled-components/native";
import Carousel from "react-native-reanimated-carousel";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { AiProfile } from "@/src/types/aiProfileTypes";

export const AssistantListLayout = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const CarouselBox = styled(Carousel<AiProfile>)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
