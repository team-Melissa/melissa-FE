import { COLOR } from '@/src/constants/theme';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const THUMB_SIZE = 28;
const THUMB_OFFSET = 2;
const INACTIVE_BG_COLOR = '#F2F2F2';
const ACTIVE_BG_COLOR = COLOR.main;

export const Switch = ({ checked, onCheckedChange }: Props) => {
  const progress = useSharedValue(checked ? 1 : 0);

  if (checked && progress.value === 0) {
    progress.value = withTiming(1, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  } else if (!checked && progress.value === 1) {
    progress.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [INACTIVE_BG_COLOR, ACTIVE_BG_COLOR]),
  }));
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [THUMB_OFFSET, TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET]) },
    ],
  }));

  const handleSwitchClick = () => {
    onCheckedChange(!checked);
  };

  return (
    <Pressable onPress={handleSwitchClick}>
      <TrackWrapper style={animatedTrackStyle}>
        <ThumbWrapper style={animatedThumbStyle}>
          <Thumb />
        </ThumbWrapper>
      </TrackWrapper>
    </Pressable>
  );
};

const TrackWrapper = styled(Animated.View)`
  width: ${TRACK_WIDTH}px;
  height: ${TRACK_HEIGHT}px;
  border-radius: ${TRACK_HEIGHT / 2}px;
  justify-content: center;
`;

const ThumbWrapper = styled(Animated.View)`
  position: absolute;
`;

const Thumb = styled.View`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border-radius: ${THUMB_SIZE / 2}px;
  background-color: ${COLOR.white};
`;
