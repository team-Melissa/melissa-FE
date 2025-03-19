import responsiveToPx from "@/src/utils/responsiveToPx";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const ProgressBarBox = styled.View`
  width: 60%;
  height: ${responsiveToPx("8px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const AnimatedProgressBar = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
