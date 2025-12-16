import { COLOR, SHADOW } from '@/src/constants/theme';
import { Description4 } from '@/src/core/Txt';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Svg, { Ellipse } from 'react-native-svg';
import styled from 'styled-components/native';
import { HASHTAG_BUBBLE_DELAY, HASHTAG_BUBBLE_FADE_DURATION } from '../../constants';

type Props = {
  isVisible: boolean;
  hashtag: string;
};

const HashtagBubble = ({ isVisible, hashtag }: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withDelay(HASHTAG_BUBBLE_DELAY, withTiming(1, { duration: HASHTAG_BUBBLE_FADE_DURATION }));
    } else {
      opacity.value = withTiming(0, { duration: HASHTAG_BUBBLE_FADE_DURATION });
    }
  }, [opacity, isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Wrapper style={[SHADOW, animatedStyle]}>
      <Description4 numberOfLines={1}>{hashtag}</Description4>
      <StyledSvg width="15" height="12" viewBox="0 0 15 12" fill="none">
        <Ellipse cx="10" cy="4" rx="5" ry="4" fill="white" />
        <Ellipse cx="3" cy="9.5" rx="3" ry="2.5" fill="white" />
      </StyledSvg>
    </Wrapper>
  );
};

export default HashtagBubble;

const Wrapper = styled(Animated.View)`
  position: absolute;
  top: ${responsiveToPx('-10px')};
  right: ${responsiveToPx('-20px')};
  width: ${responsiveToPx('50px')};
  justify-content: center;
  align-items: center;
  padding: 6px 3px;
  border-radius: 16px;
  background-color: ${COLOR.white};
`;

const StyledSvg = styled(Svg)`
  position: absolute;
  bottom: -80%;
`;
