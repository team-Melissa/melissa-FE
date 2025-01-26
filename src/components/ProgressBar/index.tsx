import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as S from "./styles";

interface Props {
  progress: number;
}

function ProgressBar({ progress }: Props) {
  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 300 });
  }, [animatedProgress, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <S.ProgressBarBox>
      <S.AnimatedProgressBar style={animatedStyle} />
    </S.ProgressBarBox>
  );
}

export default ProgressBar;
