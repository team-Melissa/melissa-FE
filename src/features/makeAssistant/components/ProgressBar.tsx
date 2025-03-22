import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import responsiveToPx from "@/src/utils/responsiveToPx";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 300 });
  }, [animatedProgress, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <ProgressBarBox>
      <AnimatedProgressBar style={animatedStyle} />
    </ProgressBarBox>
  );
}

const ProgressBarBox = styled.View`
  width: 60%;
  height: ${responsiveToPx("8px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const AnimatedProgressBar = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.deepGreen};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
